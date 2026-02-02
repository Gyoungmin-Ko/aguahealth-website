/**
 * Contact Us API - Resend를 통해 문의 내용을 이메일로 전송
 * Cloudflare Pages Function (API 키는 서버에서만 사용, 브라우저에 노출되지 않음)
 */
const CONTACT_EMAIL = 'gyoungmin.ko@agua-health.com'

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
    const { name, email, company, phone, message } = body

    if (!name || !email || !message) {
      return jsonResponse(
        { error: '이름, 이메일, 문의 내용은 필수입니다.' },
        400
      )
    }

    const fromEmail = env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
    const fromName = env.CONTACT_FROM_NAME || '아그와헬스 웹사이트'

    const emailHtml = `
      <h2>웹사이트 문의가 도착했습니다</h2>
      <p><strong>이름:</strong> ${name}</p>
      <p><strong>이메일:</strong> ${email}</p>
      <p><strong>회사명:</strong> ${company || '-'}</p>
      <p><strong>연락처:</strong> ${phone || '-'}</p>
      <hr>
      <h3>문의 내용</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `[아그와헬스 문의] ${name}님의 상담 신청`,
        html: emailHtml,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Resend API error:', data)
      return jsonResponse(
        { error: '이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' },
        500
      )
    }

    return jsonResponse({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return jsonResponse(
      { error: '처리 중 오류가 발생했습니다. 다시 시도해주세요.' },
      500
    )
  }
}
