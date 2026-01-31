import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import insightsData from '../data/insights.json'
import seoData from '../data/seo.json'

export default function Insights() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  const categoryColors = {
    economics: 'from-[#667eea] to-[#764ba2]',
    'market-entry': 'from-[#f093fb] to-[#f5576c]',
    regulatory: 'from-[#4facfe] to-[#00f2fe]',
    claims: 'from-[#43e97b] to-[#38f9d7]',
    ai: 'from-[#a8edea] to-[#fed6e3]'
  }

  return (
    <>
      <SEOHead 
        title={seoData.insights.title}
        description={seoData.insights.description}
        keywords={seoData.insights.keywords}
      />
      
      <div className="pt-20 min-h-screen">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-[#102a43] to-[#1a365d]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                인사이트
              </h1>
              <p className="text-xl text-blue-100">
                헬스케어 마켓 액세스 분야의 최신 동향과 전문 분석
              </p>
            </div>
          </div>
        </section>

        {/* 인사이트 그리드 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {insightsData.map((insight, i) => (
                  <article 
                    key={insight.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-pro border border-slate-100 hover:shadow-pro-lg transition-shadow"
                  >
                    <div 
                      className={`h-40 bg-gradient-to-br ${categoryColors[insight.category] || 'from-gray-400 to-gray-600'}`} 
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-[#285BAB] bg-blue-50 px-2 py-1 rounded">
                          {insight.categoryLabel}
                        </span>
                        <span className="text-sm text-gray-500">{insight.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {insight.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {insight.summary}
                      </p>
                      <a 
                        href={insight.link} 
                        className="inline-flex items-center text-[#285BAB] font-medium hover:underline"
                      >
                        자세히 보기 →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 뉴스레터 구독 */}
        <section className="py-20 bg-[#102a43] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">월간 인사이트 뉴스레터 구독</h2>
                  <p className="text-blue-100 mb-6">
                    건강보험 정책, 약가제도, 급여등재 동향 등 마켓 액세스 분야의 최신 소식을 매월 받아보세요.
                  </p>
                  {subscribed ? (
                    <p className="text-green-300 font-medium">구독해 주셔서 감사합니다!</p>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일 주소를 입력하세요"
                        required
                        className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 border-0"
                      />
                      <button 
                        type="submit" 
                        className="px-6 py-3 bg-[#285BAB] text-white font-semibold rounded-lg hover:bg-[#1e4580] transition-colors"
                      >
                        구독하기
                      </button>
                    </form>
                  )}
                  <p className="text-sm text-blue-200 mt-4">
                    언제든지 구독을 취소할 수 있습니다. 개인정보는 안전하게 보호됩니다.
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
