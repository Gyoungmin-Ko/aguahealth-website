import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import servicesData from '../../data/services.json'
import seoData from '../../data/seo.json'

export default function Economics() {
  const service = servicesData.economics
  const seoInfo = seoData.services.economics

  return (
    <>
      <SEOHead 
        title={seoInfo.title}
        description={seoInfo.description}
        keywords={seoInfo.keywords}
      />
      
      <div className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-4">{service.icon}</div>
              <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-gray-600 mb-2">{service.subtitle}</p>
              <p className="text-lg text-gray-700">{service.description}</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">주요 서비스</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow">
                    <span className="text-[#285BAB] font-bold text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">기대 효과</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">전문가와 상담하세요</h2>
            <p className="text-xl text-gray-600 mb-8">
              귀사의 성공적인 시장 진입을 위해 최선을 다하겠습니다
            </p>
            <button
              onClick={() => window.openContactModal()}
              className="bg-[#285BAB] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#1e4580] transition-all transform hover:-translate-y-1 hover:shadow-xl"
            >
              무료 상담 신청
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
