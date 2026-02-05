import SEOHead from '../../components/SEOHead'
import servicesData from '../../data/services.json'
import seoData from '../../data/seo.json'

export default function Claims() {
  const service = servicesData.claims
  const seoInfo = seoData.services.claims

  const openContactModal = () => window.openContactModal?.()

  const solutions = [
    {
      num: '01',
      title: 'AI 기반 청구심사 예측',
      desc: '2,000+ 심사 사례 빅데이터를 학습한 AI 모델이 청구 전 반송 가능성을 사전 예측합니다.',
      items: ['청구 항목별 반송 위험도 점수 산출', '심사 기준 위배 여부 자동 검토', '과거 유사 사례 기반 통과 확률 예측', '반송 방지를 위한 개선 권고사항 제시']
    },
    {
      num: '02',
      title: '요양급여기준 준수 검토',
      desc: '복잡한 요양급여기준을 전문가가 직접 검토하여 오류를 사전 차단합니다.',
      items: ['약제/치료재료 급여기준 적합성 검토', '진료내역 및 처방전 검증', '고시·세부인정기준 위배 여부 점검', '산정 특례 및 본인부담 경감 대상 확인']
    },
    {
      num: '03',
      title: '청구 데이터 분석',
      desc: '기존 청구 데이터를 분석하여 반송 패턴과 개선 포인트를 도출합니다.',
      items: ['청구 항목별 반송률 및 원인 분석', '심사 조정 금액 및 비율 트렌드 분석', '요양기관·제조사별 벤치마킹', '월별/분기별 청구 성과 리포트']
    },
    {
      num: '04',
      title: '전문인력 및 심사 조정 대응',
      desc: '반송된 청구에 대한 이의신청 및 심사 조정 청구를 지원합니다.',
      items: ['반송 사유 분석 및 이의신청 전략 수립', '심사 조정 청구서 작성 및 제출', '증빙 자료 준비 및 법적 근거 제시', '심사 조정위원회 대응 지원']
    }
  ]

  const processSteps = [
    { title: '현황 진단', items: ['과거 청구 데이터 수집 (6-12개월)', '반송률 및 반송 사유 분석', '청구 프로세스 및 시스템 점검', '개선 포인트 도출'] },
    { title: 'AI 모델 구축', items: ['고객사 청구 데이터 학습', '반송 예측 모델 훈련', '정확도 검증 및 모델 최적화', '예측 대시보드 구축'] },
    { title: '사전 검토', items: ['청구 전 AI 모델로 오류 검출', '전문가의 수동 검토 (Double-check)', '개선 권고사항 제시', '청구 승인 또는 수정 권고'] },
    { title: '청구 제출', items: ['최적화된 청구 데이터 제출', '심사 진행 상황 모니터링', '심사 결과 자동 알림', '반송 시 즉시 대응'] },
    { title: '사후 분석', items: ['심사 결과 상세 분석', '반송 원인 피드백', 'AI 모델 재학습 및 개선', '월간 성과 리포트 제공'] },
    { title: '지속적 개선', items: ['청구 프로세스 최적화', '담당자 교육 및 가이드 제공', '정책 변화 모니터링 및 대응', '분기별 전략 회의'] }
  ]

  return (
    <>
      <SEOHead title={seoInfo.title} description={seoInfo.description} keywords={seoInfo.keywords} />
      
      <div className="pt-20">
        {/* Hero - 다크 블루 배경 */}
        <section className="relative py-24 lg:py-28 bg-[#102a43] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#102a43] to-[#1a365d]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50/20 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                요양급여비용청구 최적화
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                AI와 빅데이터 기반 청구 심사 오류율 향상, 반송을 감소 및 재정 손실 최소화
              </p>
              <button
                onClick={openContactModal}
                className="inline-flex items-center px-8 py-4 bg-[#285BAB] text-white font-semibold rounded-lg hover:bg-[#1e4580] transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                무료상담신청
              </button>
            </div>
          </div>
        </section>

        {/* 청구 심사 반송, 예방이 최선입니다 */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  청구 심사 반송, 예방이 최선입니다
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  건강보험 급여 청구는 복잡한 심사 기준과 엄격한 요양급여기준으로 인해 평균 20~30%의 반송률을 보입니다. 반송된 청구는 재청구 비용 발생, 현금 흐름 악화, 행정 부담 증가로 이어집니다.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  아그와헬스는 <strong className="text-gray-900">2,000+ 청구 심사 사례</strong>, <strong className="text-gray-900">반송률 20~30% 감소</strong>, <strong className="text-gray-900">연간 3억원 이상의 재정 손실 절감</strong>을 경험했습니다.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {service.kpis.map((kpi, i) => (
                  <div key={i} className="bg-white border-2 border-blue-100 rounded-xl p-6 shadow-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-[#285BAB]">{kpi.value}</span>
                      {kpi.suffix && <span className="text-sm text-gray-500">{kpi.suffix}</span>}
                    </div>
                    <p className="text-gray-600 mt-2">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 청구 반송으로 인한 손실 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
                청구 반송으로 인한 손실
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.lossPoints.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-6 bg-white">
                    <h3 className="text-xl font-bold text-[#285BAB] mb-4">{item}</h3>
                    <p className="text-gray-600 text-sm">
                      {item === '재정 손실' && '반송된 청구는 평균 60-90일의 현금 흐름 지연을 초래하며, 재청구 비용이 추가로 발생합니다.'}
                      {item === '행정 부담' && '반송 사유 분석, 재청구 서류 작성, 이의신청 등 행정 업무가 2배 이상 증가합니다.'}
                      {item === '매출 감소' && '높은 반송률은 연간 매출의 5-10% 손실로 이어져 기업 재무에 큰 영향을 미칩니다.'}
                      {item === '규제 리스크' && '반복적인 청구 오류는 심평원의 현지 조사 및 과징금 대상이 될 수 있습니다.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 아그와헬스의 솔루션 - 청구 최적화 프로세스와 동일한 박스형태 */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                아그와헬스의 솔루션
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutions.map((sol, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-[#285BAB] mb-4">{sol.num} {sol.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{sol.desc}</p>
                    <ul className="space-y-2">
                      {sol.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 청구 최적화 프로세스 */}
        <section className="py-16 lg:py-20 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                청구 최적화 프로세스
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-6 bg-white">
                    <h3 className="text-xl font-bold text-[#285BAB] mb-4">{step.title}</h3>
                    <ul className="space-y-2">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#102a43] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">요양급여비용청구 전략이 궁금하신가요?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              전문가와 상담하세요. 귀사의 성공적인 시장 진입을 위해 최선을 다하겠습니다.
            </p>
            <button
              onClick={openContactModal}
              className="inline-flex items-center px-8 py-4 bg-[#285BAB] text-white font-semibold rounded-lg hover:bg-[#1e4580] transition-all transform hover:-translate-y-0.5"
            >
              무료 상담 신청
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
