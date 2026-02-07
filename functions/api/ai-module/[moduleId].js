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

  // 전용 폼(payload)에서 원료비·재료비 배열이 오면 1단위당 산출
  let calcBody = { ...body }
  const approved = num(body.approvedProduction) || 1
  if (Array.isArray(body.rawMaterials) && body.rawMaterials.length > 0) {
    const rawTotal = body.rawMaterials.reduce((s, r) => s + (num(r.unitPrice) * num(r.quantity)), 0)
    calcBody.rawMaterialPerUnit = approved > 0 ? rawTotal / approved : 0
  }
  if (Array.isArray(body.materials) && body.materials.length > 0) {
    const matTotal = body.materials.reduce((s, r) => s + (num(r.unitPrice) * num(r.quantity)), 0)
    calcBody.materialPerUnit = approved > 0 ? matTotal / approved : 0
  }
  if (body.labor && typeof body.labor === 'object' && approved > 0) {
    const L = body.labor
    const productH = num(L.productLaborHours)
    const totalH = num(L.totalLaborHours)
    const totalCost = num(L.totalLaborCost)
    calcBody.laborPerUnit = totalH > 0 ? (productH / totalH) * totalCost / approved : 0
  }
  if (num(body.totalOverhead) > 0 && approved > 0 && body.labor && typeof body.labor === 'object') {
    const productH = num(body.labor.productLaborHours)
    const totalH = num(body.labor.totalLaborHours)
    const ratio = totalH > 0 ? productH / totalH : 0
    calcBody.overheadPerUnit = (num(body.totalOverhead) * ratio) / approved
  }
  if (body.sellingAdminPerUnit != null) calcBody.sellingAdminPerUnit = body.sellingAdminPerUnit
  if (body.nonOperatingPerUnit != null) calcBody.nonOperatingPerUnit = body.nonOperatingPerUnit
  if (body.profitRatePercent != null) calcBody.profitRatePercent = body.profitRatePercent

  const cost = calcProductCost(calcBody)
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

/** 외국 현황 리포트 모듈: 주요 국가 등재·가격·제도 비교 목업 */
async function processDrugForeignLandscape(body) {
  const product = (body.product || '(미입력)').trim() || '(제품/성분명 미입력)'
  const indication = (body.indication || '(미입력)').trim() || '(적응증 미입력)'
  const countriesRaw = (body.countries || '미국, 독일, 일본').trim()
  const countries = countriesRaw ? countriesRaw.split(/[,，、]/).map((c) => c.trim()).filter(Boolean) : ['미국', '독일', '일본']
  const focus = (body.focus || '').trim()
  const notes = (body.notes || '').trim()

  const summary = [
    `【외국 현황 리포트 요약】`,
    `제품/성분: ${product} | 적응증: ${indication}`,
    `대상 국가: ${countries.join(', ')}`,
    '',
    '아래는 데모용 목업입니다. 실제 서비스에서는 주요 국가의 등재·약가·급여 제도 데이터를 반영한 리포트를 생성합니다.',
  ].join('\n')

  const risks = [
    '· 본 결과는 데모용 목업이며, 실제 등재·약가·제도는 최신 자료로 확인이 필요합니다.',
    '· 국가별 공식 HTA/가격 DB·보고서를 반영한 정식 리포트는 데모/견적 문의 후 제공 가능합니다.',
  ].join('\n')

  // 국가별 등재·약가 요약 표 (assumptions 테이블로 표시)
  const allCountryRows = [
    { 국가: '미국', 등재여부: '상업보험/Medicare B', 약가수준: '참고가/ASP 기반', 급여범위: '적응증·라인별 상이', 비고: 'RSA 다수' },
    { 국가: '독일', 등재여부: 'G-BA 급여', 약가수준: 'AMNOG 협상가', 급여범위: '협상 결과에 따라', 비고: '얼마치·보충 등' },
    { 국가: '일본', 등재여부: 'NDB 등재', 약가수준: '약가기준·감액', 급여범위: '적응증·용법', 비고: '재평가·특례' },
    { 국가: '영국', 등재여부: 'NICE 추천', 약가수준: 'PPRS/VPAG', 급여범위: 'NHS 지침', 비고: 'CDF 등' },
    { 국가: '프랑스', 등재여부: 'ASMR/CT', 약가수준: 'SMR 협상', 급여범위: 'CT 범위', 비고: 'MEA 가능' },
  ]
  let countryTable = allCountryRows.filter((row) =>
    countries.some((c) => row.국가 === c || String(c).includes(row.국가) || row.국가.includes(String(c)))
  )
  if (countryTable.length === 0) {
    countryTable = allCountryRows.slice(0, 3)
  }

  const sections = [
    {
      title: '국가별 등재 여부 및 약가 요약',
      content: '아래 표를 참조하세요. 실제 서비스에서는 입력하신 국가·제품에 맞춘 최신 등재·약가·제도 정보를 반영합니다.',
    },
    {
      title: '제도/급여 범위 차이',
      content: [
        '· 미국: Medicare Part B/상업보험, ASP·AWP 참고, 약가 협상·RSA 활용이 일반적입니다.',
        '· 독일: G-BA 급여·AMNOG에 따른 추가효과 증명·가격 협상, 얼마치·보충급여 등이 중요합니다.',
        '· 일본: 약가기준·감액, 적응증·용법에 따른 급여 범위, 재평가·신약특례를 고려합니다.',
        '· 영국: NICE 추천·CDF, PPRS/VPAG 하 가격, NHS 지침 내 급여 범위를 확인합니다.',
        '· 프랑스: ASMR/CT, SMR 협상, MEA(약정) 가능 여부가 전략에 영향을 줍니다.',
      ].join('\n'),
    },
    {
      title: '전략 수립 시 고려 시사점',
      content: [
        '1. 선진 시장(미·독·일 등)의 등재·약가·급여 범위를 먼저 정리하면 국내 포지셔닝·가격 협상 시 참고가 됩니다.',
        '2. 위험분담제(RSA/MEA) 적용 여부와 조건을 국가별로 비교하면 재정 리스크 관리에 도움이 됩니다.',
        '3. 적응증·치료 라인별 급여 범위 차이를 파악해 국내 제출 시 차별화 포인트를 설계할 수 있습니다.',
        '4. 각국 HTA 기관의 최신 가이드·재평가 일정을 반영해 타임라인을 잡는 것이 좋습니다.',
        '5. 실제 정식 리포트는 공식 DB·보고서 기반으로 작성해 드리며, 데모/견적 문의를 이용해 주세요.',
      ].join('\n'),
    },
    {
      title: '슬라이드/리포트 초안 구조',
      content: [
        '1. Executive summary (제품·적응증·대상 국가 요약)',
        '2. 국가별 등재·약가·급여 요약 표',
        '3. 국가별 제도 개요 (미국·독일·일본·영국·프랑스 등)',
        '4. 제도·급여 범위 차이 및 시사점',
        '5. 전략 수립 시 권장 사항 3~5가지',
        '6. 데이터 소스·한계·추가 검토 항목',
      ].join('\n'),
    },
  ]

  if (focus) {
    sections.unshift({
      title: '관심 항목 반영',
      content: `요청하신 관심 항목: ${focus}\n\n정식 리포트 시 해당 항목을 우선 반영해 구성할 수 있습니다.`,
    })
  }
  if (notes) {
    sections.push({
      title: '추가 메모',
      content: notes,
    })
  }

  return {
    summary,
    risks,
    sections,
    assumptions: countryTable,
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

  const allowedModules = ['drug-withdrawal-prevention', 'drug-foreign-landscape']
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
        } else if (typeof value === 'string') {
          if (key === 'payload') {
            try {
              const parsed = JSON.parse(value)
              Object.assign(body, parsed)
            } catch (e) {
              console.warn('payload JSON parse failed', e)
            }
          } else {
            body[key] = value
          }
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
    } else if (moduleId === 'drug-foreign-landscape') {
      result = await processDrugForeignLandscape(body)
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
