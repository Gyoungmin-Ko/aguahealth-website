import SEOHead from '../../components/SEOHead'
import servicesData from '../../data/services.json'
import seoData from '../../data/seo.json'

export default function Regulatory() {
  const service = servicesData.regulatory
  const seoInfo = seoData.services.regulatory

  const openContactModal = () => window.openContactModal?.()

  const supportAreas = [
    {
      title: '신약 (NDA)',
      items: ['CTD (Common Technical Document) 작성', '임상시험 계획서 작성', '의약품 인허가', '기타 필요한 자료 작성 및 제출 지원']
    },
    {
      title: '바이오시밀러',
      items: ['유사성 평가 전략 수립', '비교동등성 시험 설계 및 수행 지원', '임상시험 계획서 작성', '허가 관련 자료 작성 및 제출 지원']
    },
    {
      title: '의료기기',
      items: ['기술문서 작성 (STED, STED-Lite)', '임상시험 계획서 작성', 'GMP 심사 지원', '체외진단의료기기 (하위 카테고리)']
    },
    {
      title: '체외진단의료기기',
      items: ['기술문서 작성', '임상 성능 시험 계획서 작성', '허가 및 사후 관리 지원', '임상시험 및 비임상시험 계획서 작성', '허가 및 사후관리']
    }
  ]

  const processSteps = [
    {
      title: '규제 환경 분석',
      items: ['법규 및 인허가 제도 분석', '유사제품 해외 동향 분석', '경쟁사 제품 분석', '시장성 및 리스크 분석']
    },
    {
      title: '허가 전략 수립',
      items: ['허가 목표 및 일정 수립', '제품 특성에 따른 최적의 허가 경로 제시', '필요한 자료 및 시험 항목 도출', '비용 및 기간 예측']
    },
    {
      title: '제출 자료 작성',
      items: ['CTD, STED 문서 작성', '임상/비임상 시험 계획서 및 보고서 작성', '제품 설명서 및 포장재 작성', '제조 및 품질관리 자료 작성']
    },
    {
      title: '허가 신청',
      items: ['온라인 시스템을 통한 허가 신청', '필요한 서류 제출', '신속 심사 신청 지원', '해외 대리인 서비스 제공']
    },
    {
      title: '심사 대응',
      items: ['식약처 질의응답 대응', '현장 실사 지원', '전문가 의견서 작성', '불가 통보 시 재심사 지원']
    },
    {
      title: '허가 취득 및 사후관리',
      items: ['허가증 수령 및 배포 지원', '변경 허가 및 갱신 지원', '품목 허가 유지 관리', '광고 심의 및 표시 기준 지원']
    }
  ]

  return (
    <>
      <SEOHead title={seoInfo.title} description={seoInfo.description} keywords={seoInfo.keywords} />
      
      <div className="pt-20">
        {/* Hero */}
        <section className="relative py-24 lg:py-28 bg-[#102a43] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#102a43] to-[#1a365d]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50/20 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                인허가지원
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                의약품과 의료기기의 식약처 허가 취득을 위한 전략 수립부터 실행까지 전 과정 지원
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

        {/* 한국 식약처 허가, 전문성이 성패를 좌우합니다 */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  한국 식약처 허가, 전문성이 성패를 좌우합니다
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  한국 식약처(MFDS)는 까다로운 심사 기준과 엄격한 규제 환경으로 잘 알려져 있습니다. 신약, 바이오시밀러, 의료기기 모두 복잡한 허가 절차와 방대한 제출 자료를 요구합니다. 아그와헬스는 등록 약사와 규제 전문가가 식약처 허가 전략 수립부터 서류 작성, 심사 대응까지 전 과정을 지원합니다.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {service.kpis.map((kpi, i) => (
                  <div key={i} className="bg-white border-2 border-blue-100 rounded-xl p-6 shadow-sm">
                    <p className="text-3xl md:text-4xl font-bold text-[#285BAB]">{kpi.value}</p>
                    <p className="text-gray-600 mt-2">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 인허가 지원 분야 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                인허가 지원 분야
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {supportAreas.map((area, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-[#285BAB] mb-4">{area.title}</h3>
                    <ul className="space-y-2">
                      {area.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-700">
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

        {/* 인허가 프로세스 */}
        <section className="py-16 lg:py-20 bg-slate-50/80">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                인허가 프로세스
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-pro border border-slate-100">
                    <h3 className="text-lg font-bold text-[#285BAB] mb-4 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {step.title}
                    </h3>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">전문가와 상담하세요</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              귀사의 성공적인 시장 진입을 위해 최선을 다하겠습니다
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
