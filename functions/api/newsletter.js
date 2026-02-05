/**
 * Newsletter API - 뉴스레터 구독 처리
 * 1) Resend Contacts API 시도 (Audiences/Segments 등록)
 * 2) 실패 시 Google Sheets 웹훅 호출 (구독자 자동 저장)
 * 3) 둘 다 실패 시 Resend Emails API로 관리자에게 전송 (백업)
 */
const ADMIN_EMAIL = 'gyoungmin.ko@agua-health.com'

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

function corsResponse() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function onRequestOptions() {
  return corsResponse()
}

export async function onRequestPost(context) {
  const { request, env } = context
  const apiKey = env.RESEND_API_KEY

  if (!apiKey) {
    return jsonResponse(
      { error: '서버 설정 오류가 있습니다. 관리자에게 문의해주세요.' },
      500
    )
  }

  try {
    const body = await request.json()
    const { email } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        400
      )
    }

    const trimmedEmail = email.trim()

    // 1) Google Sheets 웹훅 우선 시도 (설정된 경우)
    const webhookUrl = env.GOOGLE_SHEETS_WEBHOOK_URL
    const webhookSecret = env.GOOGLE_SHEETS_SECRET
    if (webhookUrl && webhookSecret) {
      try {
        const gsRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, secret: webhookSecret }),
        })
        const gsData = await gsRes.json().catch(() => ({}))
        if (gsRes.ok && gsData.success) {
          return jsonResponse({ success: true })
        }
      } catch (gsErr) {
        console.error('Newsletter: Google Sheets webhook error', gsErr)
      }
    }

    // 2) Resend Contacts API 시도
    const contactPayload = {
      email: trimmedEmail,
      unsubscribed: false,
    }
    if (env.RESEND_SEGMENT_ID) {
      contactPayload.segments = [{ id: env.RESEND_SEGMENT_ID }]
    }

    const contactRes = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    })

    if (contactRes.ok) {
      return jsonResponse({ success: true })
    }

    const contactData = await contactRes.json()
    if (contactRes.status === 409 || (contactData.message && contactData.message.toLowerCase().includes('already'))) {
      return jsonResponse({ success: true })
    }

    // 3) Contacts 실패 시 Emails API로 관리자에게 구독 알림 전송 (백업)
    const fromEmail = env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
    const fromName = env.CONTACT_FROM_NAME || '아그와헬스 웹사이트'

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: [ADMIN_EMAIL],
        subject: `[아그와헬스 뉴스레터] 구독 신청: ${trimmedEmail}`,
        html: `
          <h2>뉴스레터 구독 신청</h2>
          <p><strong>이메일:</strong> ${trimmedEmail}</p>
          <p><em>Google Sheets 연동이 설정되지 않았거나 실패했습니다. 구독자 정보를 수동으로 기록해주세요.</em></p>
        `,
      }),
    })

    if (emailRes.ok) {
      return jsonResponse({ success: true })
    }

    const emailData = await emailRes.json()
    console.error('Newsletter: Contacts 및 Emails API 모두 실패', { contactData, emailData })
    return jsonResponse(
      { error: '구독 등록에 실패했습니다. 잠시 후 다시 시도해주세요.' },
      500
    )
  } catch (error) {
    console.error('Newsletter API error:', error)
    return jsonResponse(
      { error: '처리 중 오류가 발생했습니다. 다시 시도해주세요.' },
      500
    )
  }
}
