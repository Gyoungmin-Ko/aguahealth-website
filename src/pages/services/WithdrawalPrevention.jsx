import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import seoData from '../../data/seo.json'
import { getAiModuleById } from '../../data/aiModules'

export default function WithdrawalPrevention() {
  const seoInfo = seoData.services?.withdrawalPrevention || {
    title: '퇴장방지의약품 및 약가조정 - 아그와헬스',
    description: '퇴장방지의약품 원가보전 및 약가조정(재산정·인하 등)을 지원합니다. 제품/상품 구분 원가산정과 심평원 약가조정 제도 대응을 돕습니다.',
    keywords: '퇴장방지의약품, 약가조정, 원가보전, 원가산정, 국내제조, 수입의약품',
  }
  const moduleInfo = getAiModuleById('drug-withdrawal-prevention')
  const openContactModal = () => window.openContactModal?.()

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
                퇴장방지의약품 및 약가조정
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                퇴장방지의약품 원가보전 및 약가조정(재산정·인하 등) 전략을 지원합니다. 제품/상품 구분 원가산정과 심평원 약가조정 제도 대응을 돕습니다.
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

        {/* 개요 */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                퇴장방지의약품 및 약가조정
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong>퇴장방지의약품</strong>은 의약품 시장에서 공급이 부족하거나 단절될 우려가 있는 필수 의약품을 지정하여 원가를 보전하는 제도입니다. 제품(국내제조)과 상품(수입의약품)으로 구분되며, 각각에 맞는 원가산정 방식이 적용됩니다.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong>약가조정</strong>은 심평원이 실시하는 재산정·인하·상한가 재설정 등으로, 시장 가격·경쟁 구조·역학·R&D 비용 등을 반영합니다. 아그와헬스는 퇴장방지의약품 원가산정과 약가조정 관련 자료 검토·산정·전략 수립을 지원합니다.
              </p>
            </div>
          </div>
        </section>

        {/* AI 모듈 연결 */}
        <section className="py-16 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                AI 모듈로 원가산정 지원
              </h2>
              <p className="text-gray-600 mb-8">
                퇴장방지의약품 원가산정 AI 모듈을 활용해 제품/상품별 원가를 산정하고 결과를 확인할 수 있습니다.
              </p>
              {moduleInfo && (
                <Link
                  to={`/ai-solutions/${moduleInfo.id}`}
                  className="inline-flex items-center px-8 py-4 bg-[#285BAB] text-white font-semibold rounded-lg hover:bg-[#1e4580] transition-all transform hover:-translate-y-0.5"
                >
                  퇴장방지의약품 지정 및 원가보전 AI 모듈 바로가기 →
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#102a43] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">퇴장방지의약품 및 약가조정이 궁금하신가요?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              전문가와 상담하세요. 귀사의 퇴장방지의약품 원가보전 및 약가조정 전략을 지원합니다.
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
