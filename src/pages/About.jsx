import SEOHead from '../components/SEOHead'
import companyData from '../data/company.json'
import seoData from '../data/seo.json'

export default function About() {

  const credentials = [
    '고려대학교 보건학 박사',
    '등록약사',
    '전문 건강경제학자 (Professional Health Economist)',
    '100+ 전문 컨설팅 서비스 제공',
    '(전)동아제약, (전)건강보험심사평가원, (전)한국존슨앤존슨메디칼, (전)한국아스텔라스제약, (전)Insightec'
  ]

  return (
    <>
      <SEOHead 
        title={seoData.about.title}
        description={seoData.about.description}
        keywords={seoData.about.keywords}
      />
      
      <div className="pt-20">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-[#285BAB] to-[#1E4A8A] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                아그와헬스를 소개합니다
              </h1>
              <p className="text-xl text-blue-100">
                혁신 의약품과 의료기기의 성공적인 한국 시장 진입을 위한 전문 파트너
              </p>
            </div>
          </div>
        </section>

        {/* 대표이사 프로필 */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <img 
                    src="/static/ceo-profile.jpg" 
                    alt={`${companyData.ceo.name} 대표이사`}
                    className="w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-full shadow-xl"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#285BAB] mb-2">
                    {companyData.ceo.name} 대표이사
                  </h2>
                  <p className="text-gray-600 mb-6">
                    등록 약사 | 보건학 박사 | 전문 건강경제학자
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    아그와헬스의 대표이사인 고경민 박사는 의약품과 의료기기의 인허가 및 건강보험 관리 분야의 전문가이며, 전문 컨설팅 서비스를 제공하고 있습니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    초기 계획 단계부터 사후 관리까지 헬스케어 제품 개발 로드맵을 제공하고, 경제성 평가 및 가격 협상 전략을 통해 기업의 시장 접근성을 극대화하며, 의료기술의 가치 입증에 헌신하고 있습니다.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-[#285BAB] mb-4">학력 및 경력</h3>
                    <ul className="space-y-2">
                      {credentials.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <span className="text-[#285BAB]">◆</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 비전 & 미션 */}
        <section className="py-16 lg:py-20 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                비전 & 미션
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-pro border border-slate-100 text-center">
                  <h3 className="text-xl font-bold text-[#285BAB] mb-4">비전</h3>
                  <p className="text-gray-700 leading-relaxed">
                    혁신 의료기술이 환자에게 빠르게 도달하도록 지원하여, 한국 헬스케어 산업의 글로벌 경쟁력을 강화합니다.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-pro border border-slate-100 text-center">
                  <h3 className="text-xl font-bold text-[#285BAB] mb-4">미션</h3>
                  <p className="text-gray-700 leading-relaxed">
                    데이터 기반 의사결정과 AI 기술을 활용하여, 고객의 시장 진입 성공률을 극대화하고 지속가능한 성장을 지원합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
