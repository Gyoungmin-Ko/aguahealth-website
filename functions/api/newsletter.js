/**
 * Newsletter API - Resend Contacts에 구독자 등록
 * Cloudflare Pages Function (API 키는 서버에서만 사용, 브라우저에 노출되지 않음)
 */
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

    const contactPayload = {
      email: email.trim(),
      unsubscribed: false,
    }

    // 세그먼트가 설정된 경우 추가 (Resend Segments - Audiences 대체)
    if (env.RESEND_SEGMENT_ID) {
      contactPayload.segments = [{ id: env.RESEND_SEGMENT_ID }]
    }

    const res = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    })

    const data = await res.json()

    if (!res.ok) {
      // 이미 등록된 이메일인 경우 (409 등) 성공으로 처리
      if (res.status === 409 || (data.message && data.message.toLowerCase().includes('already'))) {
        return jsonResponse({ success: true })
      }
      console.error('Resend Contacts API error:', data)
      return jsonResponse(
        { error: '구독 등록에 실패했습니다. 잠시 후 다시 시도해주세요.' },
        500
      )
    }

    return jsonResponse({ success: true })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return jsonResponse(
      { error: '처리 중 오류가 발생했습니다. 다시 시도해주세요.' },
      500
    )
  }
}
