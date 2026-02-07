import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import servicesData from '../../data/services.json'
import seoData from '../../data/seo.json'
import { aiModules } from '../../data/aiModules'

const MEDICAL_DEVICE_AI_MODULES = [
  'device-existing-tech',
  'device-early-entry',
  'device-nhta',
  'device-reimbursement',
]

export default function MedicalDevice() {
  const service = servicesData.medicalDevice
  const seoInfo = seoData.services?.medicalDevice || {
    title: '의료기기 - 아그와헬스',
    description: '의료기기 시장 진입을 위한 기존기술 여부 평가, 선진입 의료기술 평가, 신의료기술평가 준비, 행위·치료재료 등재 전략 지원',
    keywords: '의료기기, 기존기술 평가, 선진입, 신의료기술평가, 행위 등재',
  }

  const openContactModal = () => window.openContactModal?.()

  const moduleCards = [
    {
      id: 'device-existing-tech',
      title: '기존기술 여부 평가',
      desc: '기존기술 해당 여부와 근거를 빠르게 정리합니다.',
    },
    {
      id: 'device-early-entry',
      title: '선진입 의료기술 평가',
      desc: '선진입 가능성 체크와 준비 자료 리스트를 제안합니다.',
    },
    {
      id: 'device-nhta',
      title: '신의료기술평가 준비',
      desc: '요구 근거와 문서 구조를 빠르게 잡아드립니다.',
    },
    {
      id: 'device-reimbursement',
      title: '행위·치료재료 등재 전략',
      desc: '행위/치료재료 포지셔닝과 시나리오를 설계합니다.',
    },
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
                의료기기
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                의료기기 시장 진입을 위한 기존기술 평가, 선진입, 신의료기술평가, 등재 전략 지원
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

        {/* 제공 서비스 개요 */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                의료기기 시장 진입, 전문 전략이 필요합니다
              </h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-12">
                의료기기는 기존기술 여부, 선진입 가능성, 신의료기술평가 요건, 행위·치료재료 등재 전략까지 단계별로 체계적인 준비가 필요합니다. 아그와헬스는 각 단계에 맞는 AI 모듈과 전문 컨설팅으로 성공적인 시장 진입을 지원합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {moduleCards.map((card) => {
                  const m = aiModules.find((x) => x.id === card.id)
                  if (!m) return null
                  return (
                    <div key={card.id} className="border border-gray-200 rounded-xl p-6 bg-white">
                      <h3 className="text-xl font-bold text-[#285BAB] mb-3">{card.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{card.desc}</p>
                      <Link
                        to={`/ai-solutions/${m.id}`}
                        className="inline-flex items-center text-sm font-medium text-[#285BAB] hover:underline"
                      >
                        AI 모듈로 바로가기 →
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 의료기기 AI 모듈 그리드 */}
        <section className="py-16 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                의료기기 AI 모듈
              </h2>
              <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                각 단계별 AI 모듈로 빠르게 결과를 확인하세요.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MEDICAL_DEVICE_AI_MODULES.map((id) => {
                  const m = aiModules.find((x) => x.id === id)
                  if (!m) return null
                  return (
                    <Link
                      key={m.id}
                      to={`/ai-solutions/${m.id}`}
                      className="block border border-gray-200 rounded-xl p-5 hover:border-[#285BAB]/40 hover:shadow-md transition bg-white"
                    >
                      <div className="text-base font-bold text-slate-900 mb-1">{m.title}</div>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">의료기기 시장 진입이 궁금하신가요?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              전문가와 상담하세요. 귀사의 성공적인 의료기기 시장 진입을 위해 최선을 다하겠습니다.
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
