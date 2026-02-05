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

        {/* Features by domain */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                의약품·의료기기 전용 AI 워크플로우
              </h2>
              <p className="text-lg text-gray-600">
                Market Access 실무에서 반복되는 리서치·분석 업무를 워크플로우 단위로 묶어, 클릭 몇 번으로 실행할 수 있습니다.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="text-2xl font-semibold mb-4">의약품용 AI 모듈</h3>
                <p className="text-sm text-gray-600 mb-4">
                  새로운 약제를 한국 시장에 런칭할 때 필요한 분석을 한 번에.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li>· 예상 보험가격 시나리오 생성</li>
                  <li>· 교과서 및 의약품집 수재내역 스크리닝</li>
                  <li>· 학술지 수재내역 및 근거 정리</li>
                  <li>· 예상 대체가능약제 후보 탐색</li>
                  <li>· 체계적 문헌고찰 프로토콜 제안</li>
                  <li>· 경제성평가(CEA/CUA) AI 시뮬레이터</li>
                  <li>· 재정영향분석(BIA) 자동 계산</li>
                  <li>· 건강보험 등재 전략 옵션 비교</li>
                  <li>· 주요 국가 외국 현황 리포트 생성</li>
                  <li>· 퇴장방지의약품 지정 및 원가보전 분석</li>
                  <li>· 약가협상 전략 시나리오 설계</li>
                  <li>· 위험분담제 적용 시뮬레이션</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="text-2xl font-semibold mb-4">의료기기용 AI 모듈</h3>
                <p className="text-sm text-gray-600 mb-4">
                  의료기기 특성에 맞춘 인허가·급여 전략 지원.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li>· 기존기술 여부 평가 지원</li>
                  <li>· 선진입의료기술 평가 준비</li>
                  <li>· 신의료기술 평가 전략 제안</li>
                  <li>· 행위 및 치료재료 등재 시나리오 설계</li>
                  <li>· 치료재료 등재 사례 분석</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Module gallery (wireframes) */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                AI 모듈 미리보기 (화면 구조)
              </h2>
              <p className="text-lg text-gray-600">
                각 모듈은 “입력 → 결과물(리포트/표/슬라이드)” 흐름으로 설계합니다.
                먼저 화면 구조를 잡고, 이후 기능을 붙여 빠르게 제품화합니다.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {['의약품', '의료기기'].map((group) => (
                <div key={group} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-900">{group} 모듈</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {aiModules
                      .filter((m) => m.category === group)
                      .map((m) => (
                        <Link
                          key={m.id}
                          to={`/ai-solutions/${m.id}`}
                          className="group block rounded-xl border border-slate-200 bg-white p-4 hover:border-[#285BAB]/40 hover:shadow-md transition"
                        >
                          <div className="text-sm font-semibold text-slate-900 group-hover:text-[#285BAB]">
                            {m.title}
                          </div>
                          <div className="text-xs text-slate-500 mt-1 line-clamp-2">{m.tagline}</div>
                          <div className="mt-3 text-xs font-medium">
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
