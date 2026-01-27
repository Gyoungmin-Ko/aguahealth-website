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
                국내 제약·바이오와 의료기기를 위한<br />
                <span className="text-[#285BAB]">AI 기반 Market Access 파트너</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                아그와헬스는 보건학·보건경제 전문성과 AI를 결합한 Market Access 파트너입니다.<br />
                예상 보험가격 산정부터 경제성평가, 요양급여비용청구까지<br />
                경쟁업체 대비 합리적인 비용으로 실무에 바로 쓰이는 솔루션을 제공합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.openContactModal()}
                  className="bg-[#285BAB] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#1e4580] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  무료 상담 신청
                </button>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ai-solutions"
                    className="bg-white text-[#285BAB] border-2 border-[#285BAB] px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#285BAB] hover:text-white transition-all duration-300"
                  >
                    AI 솔루션 보기
                  </Link>
                  <Link
                    to="/services/market-entry"
                    className="bg-white/0 text-[#285BAB] px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-50 transition-all duration-300"
                  >
                    컨설팅 서비스 보기
                  </Link>
                </div>
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

        {/* About Preview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {companyData.name}는 이런 파트너입니다
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  {companyData.tagline}
                </p>
                <p className="text-gray-600 mb-6">
                  보건학·보건경제 전문성과 2,000건 이상의 심사 경험을 바탕으로,
                  시장 진입부터 요양급여비용청구까지 전 과정을 함께합니다.
                </p>
                <ul className="space-y-2 mb-6">
                  {companyData.ceo.credentials.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-700">
                      <span className="mt-1 text-[#285BAB]">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/about"
                  className="inline-flex items-center text-[#285BAB] font-medium hover:underline"
                >
                  회사소개 자세히 보기
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="bg-blue-50 rounded-2xl p-8 md:p-10">
                <h3 className="text-xl font-semibold text-[#285BAB] mb-4">
                  왜 아그와헬스인가요?
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-[#285BAB] mb-1">
                      {companyData.stats.services}
                    </div>
                    <div className="text-sm text-gray-600">전문 서비스</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#285BAB] mb-1">
                      {companyData.stats.successRate}
                    </div>
                    <div className="text-sm text-gray-600">등재 성공률</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#285BAB] mb-1">
                      {companyData.stats.reviews}
                    </div>
                    <div className="text-sm text-gray-600">심사 경험</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#285BAB] mb-1">
                      {companyData.stats.aiPrediction}
                    </div>
                    <div className="text-sm text-gray-600">AI 예측 모델</div>
                  </div>
                </div>
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
                시장 진입부터 보험 등재까지, 핵심 4대 서비스로 전 과정을 지원합니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services
                .filter((service) => service.id !== 'ai-services')
                .map((service) => (
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

        {/* AI Solutions Section */}
        <section className="py-20 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  사람 대신 반복 작업은 AI에게,
                  전략과 의사결정은 팀에게.
                </h2>
                <p className="text-lg text-gray-200 mb-6">
                  국내 제약바이오·의료기기 회사가 Market Access를 준비할 때 필요한 대부분의 리서치와 분석을
                  AI가 먼저 처리합니다. 팀은 더 빠르게, 더 전략적인 결정에 집중할 수 있습니다.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-xs font-semibold text-sky-300 mb-1">의약품</div>
                    <ul className="space-y-1 text-gray-100">
                      <li>· 예상 보험가격 산정</li>
                      <li>· 교과서·의약품집 수재내역 스크리닝</li>
                      <li>· 학술지 수재내역 분석</li>
                      <li>· 예상 대체가능약제 탐색</li>
                      <li>· 체계적 문헌고찰 지원</li>
                      <li>· 경제성평가 AI 시뮬레이터</li>
                      <li>· 재정영향분석 자동화</li>
                      <li>· 건강보험 등재 전략 수립 지원</li>
                      <li>· 외국 현황 리서치</li>
                      <li>· 퇴장방지의약품 지정·원가보전 분석</li>
                      <li>· 약가협상 전략 수립</li>
                      <li>· 위험분담제 적용 시뮬레이터</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-xs font-semibold text-sky-300 mb-1">의료기기</div>
                    <ul className="space-y-1 text-gray-100">
                      <li>· 기존기술 여부 평가 지원</li>
                      <li>· 선진입 의료기술 평가</li>
                      <li>· 신의료기술 평가 준비</li>
                      <li>· 행위·치료재료 등재 전략</li>
                      <li>· 치료재료 등재 분석</li>
                    </ul>
                  </div>
                </div>
                <Link
                  to="/ai-solutions"
                  className="inline-flex items-center bg-white text-[#0f172a] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  AI 솔루션 자세히 보기
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
                <h3 className="text-xl font-semibold mb-4">
                  이런 질문에 답해드립니다
                </h3>
                <ul className="space-y-3 text-gray-100">
                  <li>· 이 제품이 현재 조건에서 보험 등재될 가능성은 어느 정도인가요?</li>
                  <li>· 어떤 가격 전략이 가장 현실적인 시나리오인가요?</li>
                  <li>· 경쟁 제품 대비 시장 진입 시점과 리스크는 어떻게 다른가요?</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Insights Preview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  인사이트
                </h2>
                <p className="text-lg text-gray-600">
                  건강보험 제도·경제성평가·시장진입 전략에 대한 인사이트를 공유합니다.
                </p>
              </div>
              <div className="hidden md:block">
                <Link
                  to="/insights"
                  className="inline-flex items-center text-[#285BAB] font-medium hover:underline"
                >
                  전체 보기
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="text-sm text-[#285BAB] font-medium mb-2">Market Access</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  한국 건강보험 제도에서 혁신 의약품이 시장에 진입하는 3단계
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  허가, 급여 등재, 요양급여비용청구까지 이어지는 전체 여정을 한눈에 정리합니다.
                </p>
                <span className="text-xs text-gray-400">인사이트 페이지에서 곧 공개 예정</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="text-sm text-[#285BAB] font-medium mb-2">Health Economics</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  경제성평가에서 자주 발생하는 오류와 피해야 할 리스크
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  2,000건 이상의 심사 경험을 기반으로, 실제 심사에서 문제가 되었던 사례를 공유합니다.
                </p>
                <span className="text-xs text-gray-400">인사이트 페이지에서 곧 공개 예정</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="text-sm text-[#285BAB] font-medium mb-2">Claims</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  요양급여비용청구 데이터가 말해주는 것들
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  청구 데이터 분석을 통해 드러나는 패턴과, 이를 기반으로 한 개선 전략을 소개합니다.
                </p>
                <span className="text-xs text-gray-400">인사이트 페이지에서 곧 공개 예정</span>
              </div>
            </div>

            <div className="mt-8 md:hidden text-center">
              <Link
                to="/insights"
                className="inline-flex items-center text-[#285BAB] font-medium hover:underline"
              >
                인사이트 더 보기
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
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
