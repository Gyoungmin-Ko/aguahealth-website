import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import SEOHead from '../components/SEOHead'
import { getInsightById } from '../data/insightsLoader'
import seoData from '../data/seo.json'

export default function InsightDetail() {
  const { id } = useParams()
  const insight = getInsightById(id)

  if (!insight) {
    return <Navigate to="/insights" replace />
  }

  return (
    <>
      <SEOHead
        title={`${insight.title} | ${seoData.insights.title}`}
        description={insight.summary}
        keywords={seoData.insights.keywords}
      />

      <div className="pt-20 min-h-screen bg-white">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-[#102a43] to-[#1a365d]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Link
                to="/insights"
                className="inline-flex items-center text-blue-200 hover:text-white text-sm mb-6 transition-colors"
              >
                ← 인사이트 목록
              </Link>
              <span className="text-xs font-medium text-[#285BAB] bg-white/20 px-2 py-1 rounded mb-4 inline-block">
                {insight.categoryLabel}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {insight.title}
              </h1>
              <p className="text-blue-100">{insight.date}</p>
            </div>
          </div>
        </section>

        {/* 본문 */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <article className="max-w-3xl mx-auto text-gray-700">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mt-10 mb-4 text-[#285BAB]">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold mt-6 mb-3 text-gray-800">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-800">{children}</strong>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-800 border-b border-gray-200">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                      {children}
                    </td>
                  ),
                  tr: ({ children }) => <tr className="border-b border-gray-100 last:border-0">{children}</tr>,
                }}
              >
                {insight.content}
              </ReactMarkdown>
            </article>

            {/* CTA */}
            <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                마켓 액세스 전략이 궁금하신가요?
              </p>
              <button
                onClick={() => window.openContactModal?.()}
                className="bg-[#285BAB] text-white px-8 py-3 rounded-lg hover:bg-[#1e4580] transition-colors font-medium"
              >
                무료상담신청
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
