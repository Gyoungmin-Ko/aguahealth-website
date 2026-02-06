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

/** 숫자 파싱 (빈값/비숫자 시 0) */
function num(v) {
  if (v == null || v === '') return 0
  const n = Number(String(v).replace(/,/g, '').trim())
  return Number.isFinite(n) ? n : 0
}

/** 제품(국내제조) 원가계산 - 퇴방 원가계산 수식 정리 기준 (임시) */
function calcProductCost(body) {
  const rawMaterialPerUnit = num(body.rawMaterialPerUnit)
  const materialPerUnit = num(body.materialPerUnit)
  const laborPerUnit = num(body.laborPerUnit)
  const overheadPerUnit = num(body.overheadPerUnit)
  const sellingAdminPerUnit = num(body.sellingAdminPerUnit)
  const nonOperatingPerUnit = num(body.nonOperatingPerUnit)
  const profitRatePercent = num(body.profitRatePercent) || 10.712

  const manufacturingSubtotal = rawMaterialPerUnit + materialPerUnit + laborPerUnit + 0 + overheadPerUnit // 외주가공 0
  const subtotalBeforeProfit = manufacturingSubtotal + sellingAdminPerUnit + nonOperatingPerUnit
  const profitAmount = subtotalBeforeProfit * (profitRatePercent / 100)
  const totalBeforeTax = subtotalBeforeProfit + profitAmount
  const vat = totalBeforeTax * 0.1
  const distributionMargin = totalBeforeTax * 0.0515
  const adjustmentRequestAmount = totalBeforeTax + vat + distributionMargin

  return {
    manufacturingSubtotal,
    subtotalBeforeProfit,
    profitAmount,
    totalBeforeTax,
    vat,
    distributionMargin,
    adjustmentRequestAmount,
    profitRatePercent,
  }
}

/** 퇴장방지의약품 모듈 처리: 제품(국내제조) 원가계산 적용, 상품(수입)은 안내 */
async function processDrugWithdrawalPrevention(body) {
  const productType = (body.productType || 'product').toLowerCase()
  const productName = body.productName || '(미입력)'
  const companyName = body.companyName || '(미입력)'
  const unitSpec = body.unitSpec || '(미입력)'
  const targetTiming = body.targetTiming || '(미입력)'
  const notes = body.notes || ''
  const hasFile = body.costDataFileName != null && body.costDataFileName !== ''

  if (productType === 'commodity') {
    return {
      summary: '【상품(수입의약품) 원가산정】\n수입의약품 원가산정은 최종보고서 표 60(p.115) 및 [별지 5] 상품별 상세내역서 기준으로 별도 구현 예정입니다. 현재는 제품(국내제조)만 원가계산이 가능합니다.',
      risks: '· 상품(수입의약품) 전용 입력 항목·수식은 추후 보완 시 반영됩니다.\n· 문의가 필요하시면 데모/견적 문의를 이용해 주세요.',
      sections: [
        { title: '원가산정 방식', content: '수입의약품은 표 60(상품 원가산정방식 및 적용기준)에 따라 산정하며, 상품 구매 단가·판매 및 일반관리비·영업외 손익·적정이윤·유통거래폭 등을 반영합니다. 웹 입력·계산 기능은 준비 중입니다.' },
      ],
      assumptions: [
        { 항목: '구분', 내용: '상품(수입의약품)', 비고: '표 60·별지 5 반영 예정' },
        { 항목: '상품명', 내용: productName, 비고: '입력값' },
      ],
      adjustmentRequestAmount: null,
      productType: 'commodity',
    }
  }

  const cost = calcProductCost(body)
  const summary = [
    '【제품(국내제조) 원가산정 결과 요약】',
    `제품명: ${productName}`,
    `업소명: ${companyName}`,
    `규격단위: ${unitSpec}`,
    `지정 희망 시점: ${targetTiming}`,
    `원가자료: ${hasFile ? '제출됨' : '미제출'}`,
    '',
    `규격단위당 조정신청금액: ${cost.adjustmentRequestAmount.toFixed(2)}원 (참고용, 반올림 규칙 미적용)`,
    '실제 제출 시에는 [별지 4] 제품별 상세내역서·원가계산서 등 HIRA 안내 서식을 준비해 주세요.',
  ].join('\n')

  return {
    summary,
    risks: '· 본 산출은 임시 수식 기준이며, 보완 후 정확도를 높일 예정입니다.\n· 반올림·단위 규칙은 공식 기준으로 별도 적용이 필요할 수 있습니다.\n· 최종 원가산정은 공식 심사 절차를 따릅니다.',
    sections: [
      {
        title: '원가산정 방식·근거 요약',
        content: '퇴장방지의약품 국내제조 제품 원가산정방식(최종보고서 표 59)을 적용했습니다. 제조원가(원료·재료·노무·제조경비) + 판매 및 일반관리비 + 영업외 손익 후 적정이윤을 더하고, 부가가치세 10%, 유통거래폭 5.15%를 적용해 조정신청금액을 산출했습니다.',
      },
      {
        title: '추가 제출 자료·리스크 포인트',
        content: notes
          ? `추가 메모: ${notes}\n\n실제 제출 시 [별지 4] 제품별 상세내역서, 원가계산서, 노무시간·인원현황 등 HIRA 퇴장방지의약품 안내를 참고해 주세요.`
          : '실제 제출 시 원가명세서, 유통단계 서류 등 HIRA 안내에 따른 서류를 준비해 주세요.',
      },
    ],
    assumptions: [
      { 항목: '구분', 내용: '제품(국내제조)', 비고: '표 59 기준' },
      { 항목: '제조원가 소계', 내용: `${cost.manufacturingSubtotal.toFixed(2)}원`, 비고: '1규격단위당' },
      { 항목: '판관비+영업외 소계', 내용: `${(cost.subtotalBeforeProfit - cost.manufacturingSubtotal).toFixed(2)}원`, 비고: '1규격단위당' },
      { 항목: '적정이윤률', 내용: `${cost.profitRatePercent}%`, 비고: '입력값' },
      { 항목: '부가세(10%)', 내용: `${cost.vat.toFixed(2)}원`, 비고: '' },
      { 항목: '유통거래폭(5.15%)', 내용: `${cost.distributionMargin.toFixed(2)}원`, 비고: '' },
      { 항목: '조정신청금액', 내용: `${cost.adjustmentRequestAmount.toFixed(2)}원`, 비고: '규격단위당' },
    ],
    adjustmentRequestAmount: cost.adjustmentRequestAmount,
    productType: 'product',
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
