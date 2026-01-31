import SEOHead from '../../components/SEOHead'
import servicesData from '../../data/services.json'
import seoData from '../../data/seo.json'

export default function Economics() {
  const service = servicesData.economics
  const seoInfo = seoData.services.economics

  const openContactModal = () => window.openContactModal?.()

  const serviceColumns = [
    {
      title: '비용효과성 분석 (CEA/CUA)',
      sub: 'GALY',
      items: ['Decision tree', 'Markov model', 'Discrete event simulation', 'Cost-Effectiveness and Effectiveness', 'ICER', 'One-way & Probabilistic Sensitivity Analysis']
    },
    {
      title: '예산영향분석 (BIA)',
      items: ['신약의 건보재정 영향 분석', '역학 기반 예산 모형 개발', '5개년 관점 예산 모형', '다양한 시나리오별 영향 분석']
    },
    {
      title: '위험분담제 (RSA) 설계',
      items: ['성과 기반 RSA', '환자 기반 RSA', 'Outcome guarantee', '재정적 RSA', '가치 기반 RSA', '심평원 합의서']
    }
  ]

  const reportItems = [
    '가이드라인 기반 작성',
    '체계적 문헌고찰 및 메타분석',
    '통계 분석',
    '보고서 품질 보증 및 검토'
  ]

  const processSteps = [
    {
      title: 'Scoping 및 자료 수집',
      items: ['문헌고찰', '실제 임상 자료 수집', '비교대상 선정']
    },
    {
      title: '모델 구축',
      items: ['의사결정 나무/Markov 모델', '코호트 모델 개발', '기본 시나리오/CE 모델 개발']
    },
    {
      title: '분석 수행',
      items: ['One-way & Probabilistic SA', '시나리오 분석', 'BIA 모델 수행']
    },
    {
      title: '보고서 작성',
      items: ['보고서 작성', '제출 및 심사 지원', '협상 지원']
    }
  ]

  return (
    <>
      <SEOHead title={seoInfo.title} description={seoInfo.description} keywords={seoInfo.keywords} />
      
      <div className="pt-20">
        {/* Hero */}
        <section className="relative py-24 lg:py-28 bg-[#102a43] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#102a43] to-[#1a365d]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50/20 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                경제성평가
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                신약과 의료기기의 비용효과성을 입증하고 건강보험 등재 승인 가능성을 극대화합니다
              </p>
              <button
                onClick={openContactModal}
                className="inline-flex items-center px-8 py-4 bg-[#285BAB] text-white font-semibold rounded-lg hover:bg-[#1e4580] transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                무료상담 신청
              </button>
            </div>
          </div>
        </section>

        {/* 경제성평가, 등재의 핵심 관문입니다 */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  경제성평가, 등재의 핵심 관문입니다
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  한국에서 신약과 의료기기가 건강보험에 등재되기 위해서는 비용효과성을 입증해야 합니다. ICER(증분비용효과비), 예산영향분석(BIA), 위험분담제(RSA) 등 복잡한 경제성평가를 통과해야만 급여 적용이 가능합니다. 아그와헬스는 보건학 박사와 건강경제학 전문가가 직접 수행하는 고품질 경제성평가로 등재 성공률을 높입니다.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {service.kpis.map((kpi, i) => (
                  <div key={i} className="bg-white border-2 border-blue-100 rounded-xl p-6 shadow-sm">
                    <p className="text-3xl md:text-4xl font-bold text-[#285BAB]">{kpi.value}</p>
                    <p className="text-gray-600 mt-2">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 제공 서비스 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                제공 서비스
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {serviceColumns.map((col, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-[#285BAB] mb-2">{col.title}</h3>
                    {col.sub && <p className="text-sm text-gray-500 mb-3">{col.sub}</p>}
                    <ul className="space-y-2">
                      {col.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-700 text-sm">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 경제성평가 보고서 작성 */}
        <section className="py-16 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                경제성평가 보고서 작성
              </h2>
              <ul className="space-y-3">
                {reportItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 경제성평가 프로세스 */}
        <section className="py-16 lg:py-20 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                경제성평가 프로세스
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-pro border border-slate-100">
                    <h3 className="text-lg font-bold text-[#285BAB] mb-4 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {step.title}
                    </h3>
                    <ul className="space-y-2">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 제품 및 회사별 / 정보 지속 지원 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#285BAB] mb-4">제품 및 회사별</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span> 신약/의료기기 전략 컨설팅</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span> 근거 기반 분석</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span> 제품별 비용효과성 분석 설계</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span> 건강보험 등재 지원</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#285BAB] mb-4">정보 지속 지원</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span> 최신 정책 정보 제공</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span> 학술대회 정보 제공</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span> 최신 가이드라인 및 방법론 동향 제공</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 산출물 */}
        <section className="py-16 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                주요 산출물
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>경제성평가 보고서</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>BIA 보고서</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#102a43] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">전문가와 상담하세요</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              귀사의 성공적인 시장 진입을 위해 최선을 다하겠습니다
            </p>
            <button
              onClick={openContactModal}
              className="inline-flex items-center px-8 py-4 bg-[#285BAB] text-white font-semibold rounded-lg hover:bg-[#1e4580] transition-all transform hover:-translate-y-0.5"
            >
              무료 상담 신청
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
