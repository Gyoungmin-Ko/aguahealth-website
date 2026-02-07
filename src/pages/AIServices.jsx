import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import servicesData from '../data/services.json'
import { aiModules } from '../data/aiModules'

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

        {/* Pricing */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                구독형 + 원타임 솔루션 가격 구조
              </h2>
              <p className="text-lg text-slate-200">
                중소 제약사와 국내 지사도 부담 없이 쓸 수 있는 가격대를 목표로 설계했습니다.<br />
                구체적인 금액은 제품 포트폴리오와 데이터 환경을 확인한 뒤, 투명하게 제안드립니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col">
                <div className="text-sm font-semibold text-sky-300 mb-2">Basic</div>
                <h3 className="text-xl font-bold mb-4">입문형 플랜</h3>
                <p className="text-sm text-slate-200 mb-4">
                  소수의 브랜드를 운영하는 국내 제약·바이오, 의료기기 회사에 적합합니다.
                </p>
                <ul className="text-sm text-slate-100 space-y-2 mb-6">
                  <li>· 핵심 AI 모듈 일부 사용</li>
                  <li>· 월간 구독 또는 프로젝트 단위 원타임 선택</li>
                  <li>· 이메일 기반 서포트</li>
                </ul>
                <div className="mt-auto text-xs text-slate-300">
                  경쟁업체 대비 체감 비용을 확실히 낮춘 플랜입니다.
                </div>
              </div>

              <div className="bg-slate-800 border-2 border-sky-400 rounded-2xl p-6 flex flex-col relative">
                <div className="absolute -top-3 left-6 bg-sky-400 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                  가장 많이 선택하는 플랜
                </div>
                <div className="text-sm font-semibold text-sky-300 mb-2">Standard</div>
                <h3 className="text-xl font-bold mb-4">성장형 플랜</h3>
                <p className="text-sm text-slate-200 mb-4">
                  여러 제품 라인을 운영하는 국내 제약사·바이오 기업의 Market Access 팀에 추천드립니다.
                </p>
                <ul className="text-sm text-slate-100 space-y-2 mb-6">
                  <li>· 의약품·의료기기 AI 모듈 대부분 사용</li>
                  <li>· 팀 단위 구독 + 주요 프로젝트 원타임 옵션</li>
                  <li>· 온보딩 세션 및 정기 리포트</li>
                </ul>
                <div className="mt-auto text-xs text-slate-300">
                  프로젝트 수와 복잡도에 맞춰, 예산 범위 안에서 설계해드립니다.
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col">
                <div className="text-sm font-semibold text-sky-300 mb-2">Pro</div>
                <h3 className="text-xl font-bold mb-4">확장형 플랜</h3>
                <p className="text-sm text-slate-200 mb-4">
                  다수의 브랜드와 고난도 Market Access 프로젝트를 동시에 운영하는 경우를 위해 설계되었습니다.
                </p>
                <ul className="text-sm text-slate-100 space-y-2 mb-6">
                  <li>· 모든 AI 모듈 및 커스텀 워크플로우</li>
                  <li>· 글로벌 본사와 한국 지사 통합 활용 설계</li>
                  <li>· 전담 컨설턴트 및 커스텀 리포트</li>
                </ul>
                <div className="mt-auto text-xs text-slate-300">
                  장기 파트너십 기준으로 개별 협의합니다.
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => window.openContactModal()}
                className="inline-flex items-center px-8 py-3 bg-sky-400 text-slate-900 rounded-lg font-semibold hover:bg-sky-300 transition"
              >
                우리 팀에 맞는 플랜 상담하기
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
