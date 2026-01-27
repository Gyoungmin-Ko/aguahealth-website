import SEOHead from '../components/SEOHead'
import companyData from '../data/company.json'
import seoData from '../data/seo.json'

export default function About() {
  return (
    <>
      <SEOHead 
        title={seoData.about.title}
        description={seoData.about.description}
        keywords={seoData.about.keywords}
      />
      
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">
              아그와헬스를 소개합니다
            </h1>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
              {companyData.description}
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">대표 소개</h2>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {companyData.ceo.name} {companyData.ceo.title}
                </h3>
                <div className="space-y-2 mb-4">
                  {companyData.ceo.credentials.map((credential, index) => (
                    <p key={index} className="text-gray-700">• {credential}</p>
                  ))}
                </div>
                <p className="text-gray-600">{companyData.ceo.experience}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
