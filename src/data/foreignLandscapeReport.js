/**
 * 외국현황 리포트 화면 구성 데이터 (캡처 기준)
 * 1) 제외국 허가 사항, 2) 허가사항 비교, 3) 제외국 약가, 4) 제외국 평가 현황
 */

// 2) 허가사항 비교: 행(기준) × 열(국가)
export const approvalComparisonRows = [
  '허가 함량',
  '국내와 동일한 적응증',
  '기타 적응증',
  '급여 여부',
  '급여 제한',
  '허가 연도',
]
export const approvalComparisonCountries = [
  '미국',
  '일본',
  '프랑스',
  '독일',
  '이탈리아',
  '스위스',
  '영국',
  '호주',
  '캐나다',
  '기타국',
]

// 3) 제외국 약가: 행 × 열(등재국가 통화)
export const foreignPriceRows = [
  { id: 'foreignPrice', label: '외국약가 (해당국 화폐단위)' },
  { id: 'exchangeRate', label: '적용환율 (연월)' },
  { id: 'convertedPrice', label: '환산가(원)' },
  { id: 'adjustedPrice', label: '조정가(원)' },
  { id: 'domesticRatio', label: '국내신청 가격비율 (%)' },
  { id: 'source', label: '근거 (출처)' },
]
export const foreignPriceCountries = [
  { key: 'usa', label: '미국', currency: '$' },
  { key: 'uk', label: '영국', currency: '£' },
  { key: 'germany', label: '독일', currency: '€' },
  { key: 'france', label: '프랑스', currency: '€' },
  { key: 'italy', label: '이탈리아', currency: '€' },
  { key: 'switzerland', label: '스위스', currency: 'Fr.' },
  { key: 'japan', label: '일본', currency: '¥' },
  { key: 'canada', label: '캐나다', currency: 'C$' },
  { key: 'avg', label: '평균', currency: '' },
]

// 4) 제외국 평가 현황: 국가(기관) × 평가일자, 평가결과
export const evaluationStatusRows = [
  { country: '영국', org: 'NICE' },
  { country: '영국', org: 'SMC' },
  { country: '호주', org: 'PBAC' },
  { country: '캐나다', org: 'CADTH' },
  { country: '기타', org: 'HAS, AIFA, G-BA 등' },
]

// 작성 방법
export const writingMethods = {
  section1: {
    title: '제외국 허가 사항',
    description: 'FDA, EMA, TGA 등 허가 기관의 제외국 허가 내역을 기재하고, 원문은 별도 제출합니다.',
  },
  section2: {
    title: '허가사항 비교',
    items: [
      '(1) 허가 함량: 동일 성분·함량·포장단위 제품의 함량단위·포장단위를 각국별로 기재. 근거자료(약가책자 해당 페이지 사본 등) 별도 제출. 임상적 필요함량 신청 여부 및 확인 가능 근거 제출.',
      '(2) 국내와 동일한 적응증: 동일 여부를 O/X로 표시.',
      '(3) 기타 적응증: 국내 미허가·외국 허가 적응증이 있으면 O/X 표시, 세부 내역·국내 미허가 사유·향후 계획 별도 기재.',
      '(4) 급여 여부 및 제한: 각국 보험 급여의 조건·제한 기준이 있으면 기재하고, 세부 내역·근거자료 별도 제출.',
    ],
  },
  section3: {
    title: '제외국 약가',
    items: [
      '1. 외국약가: 동일 성분·제형·함량·회사명 또는 제품명 제품 중 최대 포장단위 최고가. (동일 회사/제품명 없으면 동일 성분·제형·함량 중 최대 포장 최고가.) 미국은 FUL, Repack, Unit Dose 제외.',
      '2. 적용 환율: 결정/조정 신청월 전월 포함 최근 36개월 평균 최종 발표 매매기준율 적용.',
      '3. 환산가(원): 적용 환율 × 외국약가 (원단위 미만 절사).',
      '4. 조정가(원): 공장도출하가에 환율·부가가치세(10%)·유통거래폭을 가산한 금액의 평균 (원단위 미만 절사). 공식: {[(각국 공장도출하가)×환율]×(1+부가가치세율)}×(1+유통거래폭).',
    ],
  },
  section4: {
    title: '제외국 평가 현황',
    items: [
      '제외국 급여평가위원회의 급여 평가 결과를 확인하여 기재.',
      '제외국 급여 사례 참고를 위해, 경제성 평가를 수행하고 급여 여부 또는 평가 결과를 공개하는 국가(호주, 캐나다, 영국 등)의 급여 여부 평가 결과(요약)를 작성하고, 원문은 별도 제출.',
    ],
  },
}

// 4) 관련 홈페이지
export const relatedWebsites = [
  {
    name: '호주 (PBAC)',
    description: 'PBAC outcomes에는 회의별 평가결과가 간략히 작성되어 있으며, Public Summary Documents에는 약제명별로 수록되어 있음.',
    url: 'http://www.health.gov.au/internet/wcms/publishing.nsf/Content/pbac-outcomes-and-public-summary-documents',
  },
  {
    name: '캐나다 (CADTH)',
    description: '약물명으로 평가결과를 검색할 수 있음.',
    url: 'http://www.cadth.ca/index.php/en/cdr/search',
  },
  {
    name: '영국 (NICE)',
    description: '기술평가결과 등을 확인할 수 있음.',
    url: 'http://www.nice.org.uk/guidance/index.jsp?action=byType&type=6&status=3',
  },
  {
    name: '영국 (SMC)',
    description: '스코틀랜드 의약품 평가.',
    url: 'http://www.scottishmedicines.org.uk/Home',
  },
]

// (참고) 국가별 공장도 출하가격 산출식 및 인정 자료원
export const exFactoryPriceTable = [
  { country: '미국', ratio: '약가 책자 금액 × 0.74', source: 'Redbook(도매가)', remark: 'WAC' },
  { country: '영국', ratio: '약가 책자 금액 × 0.73', source: 'MIMS(약국판매가)', remark: 'NHS List Price' },
  { country: '독일', ratio: '약가 책자 금액 - 부가세(19%), 약국마진(3%+€8.35), 도매마진(3.15%+€0.7), 환급률(7%)', source: 'Rote Liste(약국판매가)', remark: '' },
  { country: '프랑스', ratio: '약가 책자 금액 × 0.77', source: '프랑스 공공의약품 DB(공장도 출하가)', remark: 'Base de medicament et informations tarifaires' },
  { country: '이탈리아', ratio: '약가 책자 금액 × 0.93', source: 'Codifa(공장도 출하가)', remark: 'AIFA 목록 활용 가능' },
  { country: '스위스', ratio: '약가 책자 금액 × 0.73', source: 'Specialties List(공장도 출하가)', remark: 'Spezialitätenliste (SL), GGSL' },
  { country: '일본', ratio: '약가 책자 금액 × 0.79', source: '후생노동성 의약품 관보 건강보험등재약가목록(약국판매가)', remark: '' },
  { country: '캐나다', ratio: '약가 책자 금액 × 0.81', source: 'PMPRB & Ontario Drug Benefit Formulary(공장도 출하가)', remark: '' },
]

// 약가 인정 자료원 (확인 사이트)
export const priceSourceWebsites = [
  { country: '미국', url: 'https://www.micromedexsolutions.com/home/dispatch', note: '-' },
  { country: '영국', url: 'http://www.mims.co.uk', note: '기타 인정 자료원: BNF' },
  { country: '독일', url: 'https://www.rote-liste.de/', note: '-' },
  { country: '프랑스', url: 'http://www.codage.ext.cnamts.fr/codif/bdm_it/index.php?p_site=AMELI', note: 'Vidal, evidal.vidal.fr 등' },
  { country: '이탈리아', url: 'https://www.codifa.it/', note: 'Class C 비급여 인정하지 않음. AIFA 목록 활용 가능' },
  { country: '스위스', url: 'https://www.xn--spezialittenliste-yqb.ch/', note: 'compendium.ch' },
  { country: '일본', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000078916.html', note: '-' },
  { country: '캐나다', url: 'https://www.formulary.health.gov.on.ca/formulary/', note: 'pmprb-cepmb.gc.ca' },
]
