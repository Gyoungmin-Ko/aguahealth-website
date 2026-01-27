export const aiModules = [
  // 의약품
  {
    id: 'drug-expected-price',
    category: '의약품',
    title: '예상 보험가격 산정',
    tagline: '레퍼런스 약제·가정값을 바탕으로 예상 보험가격(약가)을 빠르게 산출합니다.',
    inputs: [
      { id: 'productName', label: '제품명(가칭)', type: 'text', placeholder: '예: ABC-101' },
      { id: 'indication', label: '적응증', type: 'text', placeholder: '예: 전이성 비소세포폐암' },
      { id: 'dosage', label: '용법·용량(요약)', type: 'text', placeholder: '예: 1일 1회, 8주 투여' },
      { id: 'comparator', label: '주요 비교약(예상)', type: 'text', placeholder: '예: XYZ, DEF' },
      { id: 'launchTiming', label: '희망 등재 시점', type: 'text', placeholder: '예: 2026년 하반기' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '가정/제약사항/특이사항' },
    ],
    outputs: [
      '예상 보험가격 범위(낮음/기준/높음)',
      '레퍼런스 약제 리스트 및 근거 요약',
      '핵심 가정값 표(환산 단위/투여량/기간 등)',
      '리스크·대응 포인트 3가지',
    ],
  },
  {
    id: 'drug-listing-evidence',
    category: '의약품',
    title: '교과서·의약품집 수재내역',
    tagline: '수재 여부/인용 문구/근거를 자동으로 모아 정리해요.',
    inputs: [
      { id: 'productName', label: '제품명(가칭)', type: 'text', placeholder: '예: ABC-101' },
      { id: 'keywords', label: '검색 키워드', type: 'text', placeholder: '예: 성분명, 질환명, 기전' },
      { id: 'sources', label: '대상 자료(선택)', type: 'text', placeholder: '예: 교과서, 의약품집, 가이드라인' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '우선순위/제외 조건' },
    ],
    outputs: ['수재 여부 요약', '인용 문구 후보', '출처 목록', '증빙 리포트(초안)'],
  },
  {
    id: 'drug-journal-indexing',
    category: '의약품',
    title: '학술지 수재내역',
    tagline: '키 논문/저널 등재 정보와 근거를 빠르게 큐레이션해요.',
    inputs: [
      { id: 'topic', label: '주제/질환/기전', type: 'text', placeholder: '예: PD-1, NSCLC' },
      { id: 'timeRange', label: '기간', type: 'text', placeholder: '예: 최근 5년' },
      { id: 'mustHave', label: '필수 포함(옵션)', type: 'text', placeholder: '예: RCT, real-world' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '포함/제외 기준' },
    ],
    outputs: ['핵심 논문 리스트', '저널 정보 요약', '근거 요약(표)', '인용 문장 후보'],
  },
  {
    id: 'drug-substitutes',
    category: '의약품',
    title: '예상 대체가능약제 탐색',
    tagline: '대체가능 후보와 유사성 근거를 빠르게 정리해요.',
    inputs: [
      { id: 'indication', label: '적응증', type: 'text', placeholder: '예: 류마티스 관절염' },
      { id: 'moa', label: '작용기전(MoA)', type: 'text', placeholder: '예: JAK inhibitor' },
      { id: 'line', label: '치료 라인', type: 'text', placeholder: '예: 2L' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '제외 후보/특이사항' },
    ],
    outputs: ['대체가능 후보 리스트', '후보별 유사성 근거', '리스크 체크(대체성)', '추가 조사 항목'],
  },
  {
    id: 'drug-slr',
    category: '의약품',
    title: '체계적 문헌고찰(SLR) 지원',
    tagline: 'PICO부터 검색식·스크리닝 표까지, 초안을 빠르게 만들어요.',
    inputs: [
      { id: 'pico', label: 'PICO(초안)', type: 'textarea', placeholder: 'Population/Intervention/Comparator/Outcome' },
      { id: 'databases', label: 'DB 범위', type: 'text', placeholder: '예: PubMed, Embase' },
      { id: 'timeRange', label: '기간', type: 'text', placeholder: '예: 2015-현재' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '포함/제외 기준, 우선순위' },
    ],
    outputs: ['검색식 후보', '스크리닝 체크리스트', 'PRISMA 흐름도(초안)', '근거 테이블(초안)'],
  },
  {
    id: 'drug-hee-sim',
    category: '의약품',
    title: '경제성평가 AI 시뮬레이터',
    tagline: 'CEA/CUA를 빠르게 돌려 민감도까지 한 번에 보고 싶을 때.',
    inputs: [
      { id: 'modelType', label: '모델 유형', type: 'select', options: ['Markov', 'Partitioned Survival', 'Decision Tree'] },
      { id: 'horizon', label: '분석 기간', type: 'text', placeholder: '예: 10년' },
      { id: 'discount', label: '할인율(%)', type: 'text', placeholder: '예: 3' },
      { id: 'comparator', label: '비교군', type: 'text', placeholder: '예: SOC' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '데이터/가정/제약' },
    ],
    outputs: ['ICER 결과(초안)', '민감도 분석(토네이도/시나리오)', '가정값 테이블', '요약 슬라이드(초안)'],
  },
  {
    id: 'drug-bia',
    category: '의약품',
    title: '재정영향분석(BIA)',
    tagline: '대상 환자수·침투율 가정으로 재정 영향 시나리오를 만듭니다.',
    inputs: [
      { id: 'population', label: '대상 환자수(연)', type: 'text', placeholder: '예: 5,000' },
      { id: 'uptake', label: '침투율(%)', type: 'text', placeholder: '예: 5/10/15' },
      { id: 'unitCost', label: '단가(가정)', type: 'text', placeholder: '예: 1회 투여 비용' },
      { id: 'years', label: '분석 연수', type: 'text', placeholder: '예: 5' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '비용 항목/제외 항목' },
    ],
    outputs: ['연도별 재정영향 표', '시나리오 비교', '핵심 드라이버(민감도)', '리스크 및 보완 데이터 제안'],
  },
  {
    id: 'drug-listing-strategy',
    category: '의약품',
    title: '건강보험 등재 전략 수립',
    tagline: '가격·근거·포지셔닝을 한 장으로 정리해 건강보험 등재 전략 옵션을 비교합니다.',
    inputs: [
      { id: 'product', label: '제품/적응증', type: 'text', placeholder: '예: ABC-101 / NSCLC' },
      { id: 'value', label: '핵심 가치(Value)', type: 'textarea', placeholder: '임상적 차별점/환자 혜택' },
      { id: 'comparators', label: '경쟁/비교', type: 'text', placeholder: '예: SOC, 기존 약제' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '협상 이슈/리스크' },
    ],
    outputs: ['전략 옵션 2~3개', '옵션별 장단점', '필요 근거/추가 데이터', '타임라인 초안'],
  },

  {
    id: 'drug-foreign-landscape',
    category: '의약품',
    title: '외국 현황 리포트',
    tagline: '주요 국가의 등재·가격·제도 현황을 한 번에 비교합니다.',
    inputs: [
      { id: 'product', label: '제품/성분명', type: 'text', placeholder: '예: ABC-101 또는 성분명' },
      { id: 'indication', label: '적응증(요약)', type: 'text', placeholder: '예: 2L NSCLC' },
      { id: 'countries', label: '대상 국가', type: 'text', placeholder: '예: 미국, 독일, 일본' },
      { id: 'focus', label: '관심 항목', type: 'textarea', placeholder: '예: 약가 수준, 급여 범위, 위험분담제 여부' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '특히 알고 싶은 포인트/비교 기준' },
    ],
    outputs: [
      '국가별 등재 여부 및 약가 요약 표',
      '제도/급여 범위 차이 정리',
      '전략 수립 시 고려해야 할 시사점 3~5가지',
      '슬라이드/리포트 초안 구조',
    ],
  },

  // 의료기기
  {
    id: 'device-existing-tech',
    category: '의료기기',
    title: '기존기술 여부 평가',
    tagline: '기존기술 해당 여부와 근거를 빠르게 정리합니다.',
    inputs: [
      { id: 'deviceName', label: '제품명(가칭)', type: 'text', placeholder: '예: Device-X' },
      { id: 'intendedUse', label: '사용 목적', type: 'text', placeholder: '예: 비침습 진단' },
      { id: 'novelty', label: '차별점(요약)', type: 'textarea', placeholder: '기술적 차별 포인트' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '유사 제품/키워드' },
    ],
    outputs: ['기존기술 해당 가능성(초안)', '유사 기술/사례 리스트', '근거 요약', '다음 단계 제안'],
  },
  {
    id: 'device-early-entry',
    category: '의료기기',
    title: '선진입 의료기술 평가',
    tagline: '선진입 가능성 체크와 준비 자료 리스트를 제안합니다.',
    inputs: [
      { id: 'deviceName', label: '제품명(가칭)', type: 'text', placeholder: '예: Device-X' },
      { id: 'clinicalNeed', label: '임상적 필요', type: 'textarea', placeholder: '해결하려는 문제/현장 니즈' },
      { id: 'evidence', label: '보유 근거(요약)', type: 'textarea', placeholder: '임상/비임상/실사용 데이터' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '적용 환경/대상' },
    ],
    outputs: ['선진입 적합성 체크(초안)', '필수 준비 자료 체크리스트', '리스크/보완 제안', '타임라인 초안'],
  },
  {
    id: 'device-nhta',
    category: '의료기기',
    title: '신의료기술평가 준비',
    tagline: '요구 근거와 문서 구조를 빠르게 잡아드립니다.',
    inputs: [
      { id: 'technology', label: '기술/행위(요약)', type: 'textarea', placeholder: '핵심 기술/행위 설명' },
      { id: 'outcomes', label: '주요 평가 변수', type: 'text', placeholder: '예: safety, effectiveness' },
      { id: 'comparators', label: '비교 기술', type: 'text', placeholder: '예: 기존 표준 치료' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '규제/임상 계획' },
    ],
    outputs: ['필요 근거 맵(초안)', '문서 목차(초안)', '주요 쟁점/질의 예상', '보완 실험/연구 제안'],
  },
  {
    id: 'device-reimbursement',
    category: '의료기기',
    title: '행위·치료재료 등재 전략',
    tagline: '행위/치료재료 포지셔닝과 시나리오를 설계합니다.',
    inputs: [
      { id: 'deviceName', label: '제품명(가칭)', type: 'text', placeholder: '예: Device-X' },
      { id: 'setting', label: '사용 환경', type: 'text', placeholder: '예: 외래/입원/수술' },
      { id: 'costDrivers', label: '비용 드라이버', type: 'textarea', placeholder: '소모품/시간/인력 등' },
      { id: 'notes', label: '추가 메모', type: 'textarea', placeholder: '유사 사례/코드 힌트' },
    ],
    outputs: ['등재 시나리오 2~3개', '필요 자료 체크리스트', '리스크/대응', '예상 타임라인'],
  },
]

export function getAiModuleById(id) {
  return aiModules.find((m) => m.id === id)
}
