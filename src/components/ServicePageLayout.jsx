import SEOHead from './SEOHead'
import seoData from '../data/seo.json'

export default function ServicePageLayout({ 
  serviceKey, 
  service, 
  children,
  heroExtra,
  beforeFeatures,
  afterFeatures 
}) {
  const seoInfo = seoData.services?.[serviceKey] || { title: service.title, description: service.description }

  const openContactModal = () => {
    const modal = document.getElementById('contactModal')
    if (modal) modal.classList.add('active')
  }

  return (
    <>
      <SEOHead 
        title={seoInfo.title}
        description={seoInfo.description}
        keywords={seoInfo.keywords}
      />
      
      <div className="pt-20">
        {/* Hero - 전문성 강조 다크 배너 */}
        <section className="relative py-24 lg:py-28 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 to-primary opacity-95" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                {service.heroSubtitle || service.subtitle || service.description}
              </p>
              <button
                onClick={openContactModal}
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-blue-50 transition-all transform hover:-translate-y-0.5 shadow-pro-lg"
              >
                무료상담 신청
              </button>
              {heroExtra}
            </div>
          </div>
        </section>

        {/* KPI 카드 - 수치로 전문성 입증 */}
        {service.kpis && service.kpis.length > 0 && (
          <section className="py-16 lg:py-20 -mt-12 relative z-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.kpis.map((kpi, i) => (
                  <div 
                    key={i}
                    className="bg-white rounded-xl shadow-pro-lg p-8 text-center border border-slate-100 hover:shadow-pro-xl transition-shadow"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-primary mb-2">{kpi.value}</p>
                    <p className="text-slate-600 font-medium">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 서비스 핵심 내용 문구 */}
        {service.processTitle && (
          <section className="py-12 lg:py-16 bg-slate-50/80">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
                  {service.processTitle}
                </h2>
                {beforeFeatures}
              </div>
            </div>
          </section>
        )}

        {/* 메인 콘텐츠 (children) */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </div>
        </section>

        {afterFeatures}

        {/* CTA - 전문가 상담 */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">전문가와 상담하세요</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              귀사의 성공적인 시장 진입을 위해 최선을 다하겠습니다
            </p>
            <button
              onClick={openContactModal}
              className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-blue-50 transition-all transform hover:-translate-y-0.5"
            >
              무료 상담 신청
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
