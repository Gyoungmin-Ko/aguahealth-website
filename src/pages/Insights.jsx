import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import insightsData from '../data/insights.json'
import seoData from '../data/seo.json'

const insightsWithLinks = insightsData.map((i) => ({ ...i, link: `/insights/${i.id}` }))

const FILTER_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'market-entry', label: '시장진입전략' },
  { value: 'economics', label: '경제성평가' },
  { value: 'regulatory', label: '인허가지원' },
  { value: 'claims', label: '요양급여비용청구' },
  { value: 'ai', label: 'AI 솔루션' }
]

export default function Insights() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      })

      const data = await response.json().catch(() => ({}))
      
      if (response.ok && data.success) {
        setSubscribed(true)
      } else {
        setError(data.error || '구독 등록에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (err) {
      setError('처리 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredInsights = activeFilter === 'all'
    ? insightsWithLinks
    : insightsWithLinks.filter(item => item.category === activeFilter)

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
              {/* 필터 버튼 */}
              <div className="flex flex-wrap gap-2 mb-10">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setActiveFilter(opt.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === opt.value
                        ? 'bg-[#285BAB] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredInsights.length === 0 ? (
                  <div className="col-span-full py-16 text-center text-gray-500">
                    해당 분류의 인사이트가 없습니다.
                  </div>
                ) : filteredInsights.map((insight) => (
                  <article 
                    key={insight.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-pro border border-slate-100 hover:shadow-pro-lg transition-shadow"
                  >
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
                      <Link 
                        to={`/insights/${insight.id}`} 
                        className="inline-flex items-center text-[#285BAB] font-medium hover:underline"
                      >
                        자세히 보기 →
                      </Link>
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
                        onChange={(e) => { setEmail(e.target.value); setError('') }}
                        placeholder="이메일 주소를 입력하세요"
                        required
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 border-0 disabled:opacity-70"
                      />
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-[#285BAB] text-white font-semibold rounded-lg hover:bg-[#1e4580] transition-colors disabled:opacity-70"
                      >
                        {isSubmitting ? '처리 중...' : '구독하기'}
                      </button>
                      {error && <p className="text-red-300 text-sm w-full">{error}</p>}
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
