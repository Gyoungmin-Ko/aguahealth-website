import SEOHead from '../components/SEOHead'
import companyData from '../data/company.json'
import seoData from '../data/seo.json'

export default function Contact() {
  return (
    <>
      <SEOHead 
        title={seoData.contact.title}
        description={seoData.contact.description}
        keywords={seoData.contact.keywords}
      />
      
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center mb-12">문의하기</h1>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-6">연락처 정보</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-medium">전화</p>
                    <p className="text-gray-600">{companyData.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-medium">이메일</p>
                    <p className="text-gray-600">{companyData.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium">주소</p>
                    <p className="text-gray-600">
                      {companyData.address.region} {companyData.address.city}<br />
                      {companyData.address.street}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">빠른 상담 신청</h2>
              <button
                onClick={() => window.openContactModal()}
                className="w-full bg-[#285BAB] text-white py-4 rounded-lg hover:bg-[#1e4580] transition-all font-medium"
              >
                상담 신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
