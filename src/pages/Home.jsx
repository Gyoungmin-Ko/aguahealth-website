import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import companyData from '../data/company.json'
import servicesData from '../data/services.json'
import seoData from '../data/seo.json'

export default function Home() {
  const services = Object.values(servicesData)

  return (
    <>
      <SEOHead 
        title={seoData.home.title}
        description={seoData.home.description}
        keywords={seoData.home.keywords}
        ogImage={seoData.home.ogImage}
      />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                혁신 의약품과 의료기기의<br />
                <span className="text-[#285BAB]">성공적인 한국 시장 진입 파트너</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                아그와헬스는 시장진입전략부터 요양급여비용청구까지,<br />
                보건학 전문성과 70개 이상의 전문 서비스로<br />
                귀사의 혁신 제품이 환자에게 빠르게 도달하도록 지원합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.openContactModal()}
                  className="bg-[#285BAB] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#1e4580] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  무료 상담 신청
                </button>
                <Link
                  to="/services/market-entry"
                  className="bg-white text-[#285BAB] border-2 border-[#285BAB] px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#285BAB] hover:text-white transition-all duration-300"
                >
                  서비스 알아보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#285BAB] mb-2">{companyData.stats.services}</div>
                <div className="text-gray-600">전문 서비스</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#285BAB] mb-2">{companyData.stats.successRate}</div>
                <div className="text-gray-600">등재 성공률</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#285BAB] mb-2">{companyData.stats.reviews}</div>
                <div className="text-gray-600">심사 경험</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#285BAB] mb-2">AI</div>
                <div className="text-gray-600">예측 모델</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                전문 서비스
              </h2>
              <p className="text-xl text-gray-600">
                시장 진입부터 보험 등재까지, 모든 과정을 함께합니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 5).map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.subtitle}</p>
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-[#285BAB] font-medium hover:underline inline-flex items-center"
                  >
                    자세히 보기
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#285BAB] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              귀사의 혁신 제품을 한국 시장에 성공적으로 진입시키세요
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              {companyData.ceo.experience}을 보유한 전문가가 함께합니다
            </p>
            <button
              onClick={() => window.openContactModal()}
              className="bg-white text-[#285BAB] px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              무료 상담 신청하기
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
