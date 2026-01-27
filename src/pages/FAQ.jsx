import SEOHead from '../components/SEOHead'
import seoData from '../data/seo.json'

export default function FAQ() {
  const faqs = [
    {
      category: "시장진입전략",
      questions: [
        {
          q: "한국 시장 진입에 얼마나 걸리나요?",
          a: "일반적으로 18-36개월이 소요됩니다. 제품 특성과 전략에 따라 기간이 달라질 수 있습니다."
        },
        {
          q: "급여등재 성공률은 얼마나 되나요?",
          a: "아그와헬스는 95%의 높은 성공률을 보이고 있습니다. 2,000건 이상의 심사 경험과 AI 예측 모델을 기반으로 합니다."
        }
      ]
    },
    {
      category: "경제성평가",
      questions: [
        {
          q: "경제성평가가 왜 필요한가요?",
          a: "건강보험 등재를 위해서는 비용-효과성을 입증해야 합니다. 적정 가격 산정에도 필수적입니다."
        },
        {
          q: "ICER는 무엇인가요?",
          a: "Incremental Cost-Effectiveness Ratio의 약자로, 추가 비용 대비 추가 효과를 나타내는 지표입니다."
        }
      ]
    }
  ]

  return (
    <>
      <SEOHead 
        title={seoData.faq.title}
        description={seoData.faq.description}
        keywords={seoData.faq.keywords}
      />
      
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center mb-12">자주 묻는 질문</h1>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((category, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-4 text-[#285BAB]">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, qIdx) => (
                    <div key={qIdx} className="bg-white rounded-lg p-6 shadow">
                      <h3 className="font-bold text-lg mb-2">Q. {faq.q}</h3>
                      <p className="text-gray-600">A. {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
