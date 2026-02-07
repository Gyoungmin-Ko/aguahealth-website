import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import servicesData from '../../data/services.json'
import seoData from '../../data/seo.json'
import { aiModules } from '../../data/aiModules'

const MARKET_ENTRY_AI_MODULES = [
  'drug-expected-price',
  'drug-listing-evidence',
  'drug-journal-indexing',
  'drug-substitutes',
  'drug-listing-strategy',
  'drug-foreign-landscape',
  'drug-withdrawal-prevention',
  'drug-pricing-strategy',
]

export default function MarketEntry() {
  const service = servicesData.marketEntry
  const seoInfo = seoData.services.marketEntry

  const openContactModal = () => window.openContactModal?.()

  const processSteps = [
    {
      title: '시장 환경 분석',
      items: ['시장 규모 및 동향 분석', '경쟁 구도 및 시장 지형 분석', '규제 환경 및 정책 분석', '주요 이해관계자 식별']
    },
    {
      title: '진입 전략 수립',
      items: ['목표 시장 선정', '차별화된 가치 제안', '진입 모델 (JV, 라이선스, 직접 등)', '핵심 성공 요소 식별']
    },
    {
      title: '규제 대응 계획',
      items: ['필수 인허가 요구사항 분석', '허가 심사 전략 수립', '제품 등록 및 인허가 지원', '규제 자문 및 교육 제공']
    },
    {
      title: '건강보험 통제 전략',
      items: ['보험 등재 전략 계획', '약가 및 급여 기준 협상', '위험 분담 계약 설계', '사후 관리 및 재평가 대응']
    },
    {
      title: '실행 지원',
      items: ['핵심 파트너 발굴 및 협력', '임상 및 RWD 활용 전략 지원', '마케팅 및 영업 전략 자문', '전담 인력 교육 및 배치 지원']
    },
    {
      title: '사후관리',
      items: ['시장 성과 모니터링', '성과 지표 분석', '전략 수정 및 최적화', '경쟁사 동향 및 시장 변화 대응']
    }
  ]

  const deliverables = [
    { title: '시장진입 전략서', desc: '한국 시장 진입을 위한 전체적인 전략 방향과 세부 실행 계획을 포함한 종합 보고서' },
    { title: '규제 대응 가이드', desc: '제품별 필수 인허가 절차, 제출 서류 및 예상 기간 안내' },
    { title: '마스터 타임라인', desc: '각 단계별 예상 소요 기간, 주요 마일스톤 및 담당자 명시' },
    { title: '가격 전략 보고서', desc: '경쟁 제품 분석을 통한 최적의 가격 책정 방안 제시' },
    { title: '리스크 관리 계획', desc: '시장 진입 과정에서 발생 가능한 리스크 식별 및 대응 전략' },
    { title: '장기 진행 리포트', desc: '시장 진입 후, 주요 성과 지표 (KPI) 모니터링 및 분석 보고서' }
  ]

  const whyChooseUs = [
    { title: '전문 인력', desc: '평균 20년 이상의 실무 경험과 전문성을 갖춘 팀' },
    { title: '데이터 기반', desc: '객관적 데이터 분석을 통해 정확하고 신뢰할 수 있는 전략 수립' },
    { title: '100건 이상의 프로젝트 경험', desc: '' },
    { title: '네트워크', desc: '정부 기관, 학계, 산업계 등 광범위한 네트워크 활용' },
    { title: '신축성', desc: '고객의 특정 요구에 맞춰 맞춤형 솔루션 제공' },
    { title: '시장 진입 기간 20% 단축', desc: '' }
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
                시장진입전략
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                혁신 의약품과 의료기기의 한국 시장 성공적 진입을 위한 End-to-End 전략 수립 및 실행 지원
              </p>
              <button
                onClick={openContactModal}
                className="inline-flex items-center px-8 py-4 bg-[#285BAB] text-white font-semibold rounded-lg hover:bg-[#1e4580] transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                무료 상담 신청
              </button>
            </div>
          </div>
        </section>

        {/* 한국 시장 진입, 철저한 준비가 성공을 결정합니다 */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  한국 시장 진입, 철저한 준비가 성공을 결정합니다
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  한국의 헬스케어 시장은 강력한 규제 환경과 복잡한 건강보험 제도로 인해 진입 장벽이 높습니다. 식약처 허가, 건강보험 등재, 약가 협상 등 각 단계마다 전문적인 전략이 필요합니다. 아그와헬스는 체계적인 준비와 검증된 프로세스를 통해 전체 시장진입 프로세스를 설계하고 실행합니다.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {service.kpis.map((kpi, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <p className="text-3xl md:text-4xl font-bold text-[#285BAB]">{kpi.value}</p>
                    <p className="text-gray-600 mt-2">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 시장진입 프로세스 */}
        <section className="py-16 lg:py-20 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                시장진입 프로세스
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-6 bg-white">
                    <h3 className="text-xl font-bold text-[#285BAB] mb-4">{step.title}</h3>
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

        {/* 주요 산출물 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                주요 산출물
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {deliverables.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-[#285BAB] mb-4">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 아그와헬스를 선택해야 하는 이유 */}
        <section className="py-16 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                아그와헬스를 선택해야 하는 이유
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-6 bg-white">
                    <h3 className="text-xl font-bold text-[#285BAB] mb-4">{item.title}</h3>
                    {item.desc && <p className="text-gray-600">{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI 모듈 연결 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                시장진입 AI 모듈
              </h2>
              <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                시장진입과 연계된 AI 분석 모듈로 빠르게 전략을 수립하세요.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MARKET_ENTRY_AI_MODULES.map((id) => {
                  const m = aiModules.find((x) => x.id === id)
                  if (!m) return null
                  return (
                    <Link
                      key={m.id}
                      to={`/ai-solutions/${m.id}`}
                      className="group block border border-gray-200 rounded-xl p-5 hover:border-[#285BAB]/40 hover:shadow-md transition bg-white"
                    >
                      <div className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#285BAB]">{m.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-2">{m.tagline}</div>
                      <div className="mt-3 text-sm text-[#285BAB] font-medium">AI 모듈 바로가기 →</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#102a43] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">시장진입전략이 궁금하신가요?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              전문가와 상담하세요. 귀사의 성공적인 시장 진입을 위해 최선을 다하겠습니다.
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
