/**
 * AI 모듈 실행 API - 퇴장방지의약품 등 모듈별 입력 처리 및 결과 반환
 * POST /api/ai-module/:moduleId (FormData: 텍스트 필드 + 선택적 파일)
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

/** 퇴장방지의약품 모듈 처리 (MVP: 규칙 기반 더미 결과, 추후 원가산정·LLM 연동) */
async function processDrugWithdrawalPrevention(body) {
  const productName = body.productName || '(미입력)'
  const indication = body.indication || '(미입력)'
  const targetTiming = body.targetTiming || '(미입력)'
  const notes = body.notes || ''
  const hasFile = body.costDataFileName != null && body.costDataFileName !== ''

  return {
    summary: `【퇴장방지의약품 원가산정 결과 요약】\n제품명: ${productName}\n적응증: ${indication}\n지정 희망 시점: ${targetTiming}\n원가자료: ${hasFile ? '제출됨' : '미제출'}\n\n입력하신 정보를 바탕으로 퇴장방지의약품 원가산정방식 적용 시 원가 보전 가능성을 검토한 결과입니다. 실제 산정 시에는 업로드하신 원가자료와 보건복지부·HIRA 가이드라인을 반영해 상세 산출이 진행됩니다.`,
    risks: '· 업로드된 원가자료가 있을 경우 추후 실제 분석 단계에서 반영됩니다.\n· 지정 희망 시점에 따른 제도 변경 가능성은 별도 확인이 필요합니다.\n· 본 결과는 참고용 초안이며, 최종 원가산정은 공식 심사 절차를 따릅니다.',
    sections: [
      {
        title: '원가산정 방식·근거 요약',
        content: '퇴장방지의약품에 적용되는 원가산정 방식(원가조사·산정 기준)을 적용한 결과입니다. 제출 원가자료가 있는 경우 해당 자료를 기반으로 단위원가·산출근거가 정리됩니다.',
      },
      {
        title: '추가 제출 자료·리스크 포인트',
        content: notes
          ? `추가 메모: ${notes}\n\n실제 제출 시 필요한 서류(원가명세서, 유통단계 서류 등)는 HIRA 퇴장방지의약품 안내를 참고해 주세요.`
          : '추가 메모 없음. 실제 제출 시 원가명세서, 유통단계 서류 등 HIRA 안내에 따른 서류를 준비해 주세요.',
      },
    ],
    assumptions: [
      { 항목: '적용 방식', 내용: '퇴장방지의약품 원가산정방식', 비고: '현행 제도 기준' },
      { 항목: '제품', 내용: productName, 비고: '입력값 반영' },
      { 항목: '지정 희망 시점', 내용: targetTiming, 비고: '제도 시점 확인 필요' },
    ],
  }
}

export async function onRequestOptions() {
  return corsResponse()
}

export async function onRequestPost(context) {
  const { request, params } = context
  const moduleId = params?.moduleId

  if (!moduleId) {
    return jsonResponse({ error: '모듈 ID가 없습니다.' }, 400)
  }

  const allowedModules = ['drug-withdrawal-prevention']
  if (!allowedModules.includes(moduleId)) {
    return jsonResponse(
      { error: '해당 모듈은 아직 지원되지 않습니다.' },
      400
    )
  }

  try {
    const contentType = request.headers.get('Content-Type') || ''
    let body = {}

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      for (const [key, value] of formData.entries()) {
        if (value instanceof Blob && value.size > 0) {
          body[`${key}FileName`] = value.name || '(파일)'
          body[`${key}Size`] = value.size
          // MVP에서는 파일 내용은 저장/분석하지 않고 "제출됨" 여부만 반영
        } else if (typeof value === 'string') {
          body[key] = value
        }
      }
    } else {
      try {
        body = await request.json()
      } catch {
        return jsonResponse({ error: '잘못된 요청 형식입니다.' }, 400)
      }
    }

    let result
    if (moduleId === 'drug-withdrawal-prevention') {
      result = await processDrugWithdrawalPrevention(body)
    } else {
      return jsonResponse({ error: '지원하지 않는 모듈입니다.' }, 400)
    }

    return jsonResponse(result)
  } catch (error) {
    console.error('AI module API error:', error)
    return jsonResponse(
      { error: '처리 중 오류가 발생했습니다. 다시 시도해주세요.' },
      500
    )
  }
}
