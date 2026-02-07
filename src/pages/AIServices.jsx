import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import servicesData from '../data/services.json'
import { aiModules } from '../data/aiModules'
import aiPricing from '../data/aiPricing.json'

export default function AIServices() {
  const ai = servicesData.aiServices

  return (
    <>
      <SEOHead title="AI 솔루션 - 아그와헬스" description={ai.description} />
      <div className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                국내 제약·바이오를 위한<br />
                <span className="text-sky-300">AI Market Access Co-pilot</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                경쟁업체 수준의 분석과 전략이 필요하지만, 그만한 예산은 부담스러우신가요?<br />
                반복적이고 시간이 많이 드는 리서치·분석은 AI가 먼저 처리하고,<br />
                사람은 전략과 의사결정에 집중할 수 있도록 설계했습니다.
              </p>
              <p className="text-sm text-sky-200 mb-10">
                * 실제 전략 수립·의사결정은 항상 사람의 책임 하에 이뤄지며, AI는 의사결정을 보조하는 도구입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Market Access AI Intelligence */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Market Access AI Intelligence
              </h2>
              <p className="text-lg text-gray-600">
                각 모듈은 “입력 → 결과물(리포트/표/슬라이드)” 흐름으로 설계합니다.
                시장진입전략, 경제성평가, 의료기기 서비스에서 해당 AI 모듈로 바로 이동할 수 있습니다.
              </p>
            </div>

            <div className="flex flex-col gap-12 max-w-5xl mx-auto">
              {['의약품', '의료기기'].map((group) => (
                <div key={group} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{group} 모듈</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {aiModules
                      .filter((m) => m.category === group)
                      .map((m) => (
                        <Link
                          key={m.id}
                          to={`/ai-solutions/${m.id}`}
                          className="group block rounded-xl border border-slate-200 bg-slate-50/50 p-6 hover:border-[#285BAB]/40 hover:shadow-lg hover:bg-white transition min-h-[140px] flex flex-col"
                        >
                          <div className="text-base font-bold text-slate-900 group-hover:text-[#285BAB] mb-2">
                            {m.title}
                          </div>
                          <div className="text-sm text-slate-600 flex-1 line-clamp-3">{m.tagline}</div>
                          <div className="mt-4 text-sm font-medium">
                            {m.inputs?.length && !m.comingSoon ? (
                              <span className="text-[#285BAB]">바로가기 →</span>
                            ) : (
                              <span className="text-slate-400">Coming Soon</span>
                            )}
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => window.openContactModal?.()}
                className="inline-flex items-center px-8 py-3 bg-[#285BAB] text-white rounded-lg font-semibold hover:bg-[#1e4580] transition"
              >
                원하는 모듈 우선순위 정하기(문의)
              </button>
            </div>
          </div>
        </section>

        {/* Pricing: 구독 + 원타임, 클릭 유도 */}
        <section className="py-20 bg-slate-900 text-white" id="pricing">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {aiPricing.sectionTitle}
              </h2>
              <p className="text-lg text-slate-200">
                {aiPricing.sectionSubtitle}
              </p>
            </div>

            {/* 원타임 단품: 한 건만 써보기 */}
            <div className="max-w-5xl mx-auto mb-14">
              <h3 className="text-xl font-bold text-sky-200 mb-2">{aiPricing.oneTime.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{aiPricing.oneTime.subtitle}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {aiPricing.oneTime.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => window.openContactModal?.({ presetMessage: `【AI 솔루션 원타임 신청】\n관심 서비스: ${item.label}\n결과물: ${item.outcome}\n\n(위 서비스 1건 견적·진행 문의드립니다.)\n\n` })}
                    className="group text-left rounded-xl border border-slate-600 bg-slate-800/80 p-4 hover:border-sky-400 hover:bg-slate-800 transition"
                  >
                    <div className="font-semibold text-white group-hover:text-sky-300 mb-1">{item.label}</div>
                    <div className="text-xs text-slate-400 mb-3 line-clamp-2">{item.outcome}</div>
                    <span className="text-xs font-medium text-sky-400">1건 신청 →</span>
                  </button>
                ))}
              </div>
              {aiPricing.oneTime.priceHint && (
                <p className="text-center text-xs text-slate-500 mt-3">{aiPricing.oneTime.priceHint}</p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {aiPricing.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-2xl p-6 flex flex-col relative ${
                    tier.recommended
                      ? 'bg-slate-800 border-2 border-sky-400'
                      : 'bg-slate-800/60 border border-slate-700'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-6 bg-sky-400 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {tier.badge}
                    </div>
                  )}
                  <div className="text-sm font-semibold text-sky-300 mb-2">{tier.name}</div>
                  <h3 className="text-xl font-bold mb-1">{tier.tagline}</h3>
                  {tier.priceHint && (
                    <p className="text-sm font-medium text-sky-200/90 mb-2">{tier.priceHint}</p>
                  )}
                  <p className="text-sm text-slate-200 mb-4">{tier.description}</p>
                  <ul className="text-sm text-slate-100 space-y-2 mb-6 flex-1">
                    {tier.features.map((f, i) => (
                      <li key={i}>· {f}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-300 mb-4">{tier.footer}</p>
                  <button
                    type="button"
                    onClick={() => window.openContactModal?.({
                      presetMessage: `【AI 솔루션 플랜 문의】\n관심 플랜: ${tier.name} (${tier.tagline})\n\n(위 플랜 견적·맞춤 제안 요청드립니다.)\n\n`
                    })}
                    className={`w-full py-3 rounded-lg font-semibold transition ${tier.recommended ? 'bg-sky-400 text-slate-900 hover:bg-sky-300' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* 티어 비교표 */}
            {aiPricing.comparisonTable && (
              <div className="max-w-5xl mx-auto mt-14">
                <h3 className="text-xl font-bold text-sky-200 mb-2 text-center">{aiPricing.comparisonTable.title}</h3>
                <p className="text-sm text-slate-400 mb-6 text-center">{aiPricing.comparisonTable.subtitle}</p>
                <div className="overflow-x-auto rounded-xl border border-slate-600 bg-slate-800/60">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-slate-600">
                        {aiPricing.comparisonTable.headers.map((h, i) => (
                          <th
                            key={i}
                            className={`px-4 py-3 font-semibold ${i === 0 ? 'text-slate-300 w-1/5' : 'text-sky-200'}`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {aiPricing.comparisonTable.rows.map((row, i) => (
                        <tr key={i} className="border-b border-slate-700 last:border-0">
                          <td className="px-4 py-3 text-slate-300 font-medium">{row.label}</td>
                          <td className="px-4 py-3 text-slate-200">{row.starter}</td>
                          <td className="px-4 py-3 text-slate-200 bg-sky-900/20">{row.growth}</td>
                          <td className="px-4 py-3 text-slate-200">{row.scale}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <p className="text-center text-sm text-slate-400 mt-8 max-w-2xl mx-auto">
              {aiPricing.trustNote}
            </p>
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => window.openContactModal?.()}
                className="inline-flex items-center px-6 py-2.5 rounded-lg border border-slate-500 text-slate-200 hover:bg-slate-700 transition text-sm font-medium"
              >
                플랜 비교·맞춤 상담 요청
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
