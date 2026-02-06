import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import { getAiModuleById } from '../../data/aiModules'

function Field({ field, value, onChange }) {
  const base =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#285BAB]/25'

  if (field.type === 'textarea') {
    return (
      <textarea
        className={`${base} min-h-[110px]`}
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(field.id, e.target.value)}
      />
    )
  }

  if (field.type === 'select') {
    const opts = field.options || []
    return (
      <select className={base} value={value} onChange={(e) => onChange(field.id, e.target.value)}>
        {opts.map((opt) => {
          const val = typeof opt === 'object' && opt !== null ? opt.value : opt
          const label = typeof opt === 'object' && opt !== null ? opt.label : opt
          return (
            <option key={val} value={val}>
              {label}
            </option>
          )
        })}
      </select>
    )
  }

  if (field.type === 'file') {
    return (
      <div>
        <input
          type="file"
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#285BAB]/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#285BAB] hover:file:bg-[#285BAB]/20"
          accept={field.accept}
          onChange={(e) => onChange(field.id, e.target.files?.[0] ?? null)}
        />
        {field.description && (
          <p className="mt-1 text-xs text-slate-500">{field.description}</p>
        )}
      </div>
    )
  }

  return (
    <input
      className={base}
      type="text"
      value={value}
      placeholder={field.placeholder}
      onChange={(e) => onChange(field.id, e.target.value)}
    />
  )
}

const API_BASE = import.meta.env.VITE_API_BASE || ''

export default function AIModule() {
  const { moduleId } = useParams()
  const module = useMemo(() => getAiModuleById(moduleId), [moduleId])
  const [values, setValues] = useState(() => ({}))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const update = (id, next) => setValues((v) => ({ ...v, [id]: next }))

  // 퇴방 모듈: 제품/상품 구분에 따라 표시할 입력만 필터 (미선택 시 제품으로 간주)
  const visibleInputs = useMemo(() => {
    if (!module?.inputs) return []
    const productType = values.productType || 'product'
    return module.inputs.filter(
      (f) => f.showWhen == null || f.showWhen === productType
    )
  }, [module?.inputs, values.productType])

  const inputsToUse = module?.id === 'drug-withdrawal-prevention' ? visibleInputs : (module?.inputs || [])
  const canRun = inputsToUse.length > 0 && !module?.comingSoon

  const handleRun = async () => {
    if (!canRun || !module) return
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const formData = new FormData()
      const fieldsToSend = module.id === 'drug-withdrawal-prevention' ? visibleInputs : (module.inputs || [])
      for (const field of fieldsToSend) {
        const val = values[field.id]
        if (field.type === 'file') {
          if (val instanceof File) formData.append(field.id, val)
        } else if (val != null && val !== '') {
          formData.append(field.id, String(val))
        }
      }
      const res = await fetch(`${API_BASE}/api/ai-module/${moduleId}`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || '처리 중 오류가 발생했습니다.')
        return
      }
      setResult(data)
    } catch (e) {
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  if (!module) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">모듈을 찾을 수 없어요</h1>
          <p className="text-slate-600 mb-6">요청하신 AI 모듈이 아직 준비 중이거나 주소가 잘못되었을 수 있어요.</p>
          <Link to="/ai-solutions" className="text-[#285BAB] font-medium hover:underline">
            AI 솔루션으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead title={`${module.title} - AI 솔루션 | 아그와헬스`} description={module.tagline} />
      <div className="pt-20">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold text-[#285BAB] mb-2">{module.category} · AI 모듈</div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{module.title}</h1>
                <p className="text-slate-600 mt-3 max-w-3xl">{module.tagline}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/ai-solutions"
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
                >
                  전체 모듈 보기
                </Link>
                <button
                  onClick={() => window.openContactModal?.()}
                  className="px-4 py-2 rounded-lg bg-[#285BAB] text-white hover:bg-[#1e4580] transition text-sm font-semibold"
                >
                  데모/견적 문의
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Wireframe */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Inputs */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900">입력</h2>
                </div>
                <div className="p-6 space-y-5">
                  {inputsToUse.map((field) => {
                    const defaultVal = field.type === 'select' && field.options?.[0] != null
                      ? (typeof field.options[0] === 'object' ? field.options[0].value : field.options[0])
                      : ''
                    return (
                      <div key={field.id}>
                        <label className="block text-sm font-medium text-slate-800 mb-2">{field.label}</label>
                        <Field field={field} value={values[field.id] ?? defaultVal} onChange={update} />
                      </div>
                    )
                  })}

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    {canRun ? (
                      <button
                        disabled={loading}
                        onClick={handleRun}
                        className="flex-1 px-4 py-3 rounded-lg bg-[#285BAB] text-white font-semibold hover:bg-[#1e4580] disabled:opacity-60 disabled:cursor-not-allowed transition"
                      >
                        {loading ? '처리 중…' : 'AI 실행'}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 px-4 py-3 rounded-lg bg-slate-200 text-slate-500 font-semibold cursor-not-allowed"
                      >
                        AI 실행(준비 중)
                      </button>
                    )}
                    <button
                      onClick={() => { setValues({}); setResult(null); setError(null); }}
                      className="px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition font-medium"
                    >
                      초기화
                    </button>
                  </div>

                  <div className="text-xs text-slate-500">
                    입력은 예시이며, 실제 제품에서는 회사 템플릿/데이터 소스에 맞춰 항목을 커스터마이즈합니다.
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900">출력</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {result ? 'AI 실행 결과입니다.' : '입력 후 "AI 실행"을 누르면 결과가 여기에 표시됩니다.'}
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {error && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-800 text-sm">
                      {error}
                    </div>
                  )}
                  {result ? (
                    <>
                      {result.adjustmentRequestAmount != null && result.productType === 'product' && (
                        <div className="rounded-xl bg-[#285BAB]/10 border border-[#285BAB]/30 p-5">
                          <div className="text-xs font-semibold text-[#285BAB] mb-1">규격단위당 조정신청금액</div>
                          <div className="text-2xl font-bold text-slate-900">{Number(result.adjustmentRequestAmount).toFixed(2)}원</div>
                          <p className="text-xs text-slate-600 mt-1">참고용 산출이며, 반올림 규칙은 미적용입니다.</p>
                        </div>
                      )}
                      {result.summary && (
                        <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                          <div className="text-xs font-semibold text-[#285BAB] mb-2">요약</div>
                          <p className="text-sm text-slate-800 whitespace-pre-wrap">{result.summary}</p>
                        </div>
                      )}
                      {result.risks && (
                        <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                          <div className="text-xs font-semibold text-[#285BAB] mb-2">신뢰도/리스크</div>
                          <p className="text-sm text-slate-800 whitespace-pre-wrap">{result.risks}</p>
                        </div>
                      )}
                      {result.sections?.length > 0 && (
                        <div className="space-y-4">
                          {result.sections.map((sec, i) => (
                            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
                              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-medium text-slate-900">
                                {sec.title}
                              </div>
                              <div className="p-4 bg-white text-sm text-slate-800 whitespace-pre-wrap">
                                {sec.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {result.assumptions?.length > 0 && (
                        <div className="rounded-xl border border-slate-200 overflow-hidden">
                          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-medium text-slate-900">
                            핵심 가정값 및 산출 근거
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                              <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                  {result.assumptions[0] && Object.keys(result.assumptions[0]).map((k) => (
                                    <th key={k} className="px-4 py-2 font-medium text-slate-700">{k}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {result.assumptions.map((row, i) => (
                                  <tr key={i} className="border-b border-slate-100">
                                    {Object.values(row).map((cell, j) => (
                                      <td key={j} className="px-4 py-2 text-slate-800">{String(cell)}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        <button type="button" className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700" disabled>PDF(예정)</button>
                        <button type="button" className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700" disabled>PPT(예정)</button>
                        <button type="button" className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700" disabled>Excel(예정)</button>
                      </div>
                    </>
                  ) : (
                    <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                      <div className="text-xs font-semibold text-[#285BAB] mb-2">요약</div>
                      <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-slate-200 rounded w-1/2" />
                      <div className="mt-3 text-xs text-slate-500">예: 핵심 결론 2~3줄</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                      <div className="text-xs font-semibold text-[#285BAB] mb-2">신뢰도/리스크</div>
                      <div className="h-3 bg-slate-200 rounded w-2/3 mb-2" />
                      <div className="h-3 bg-slate-200 rounded w-5/6" />
                      <div className="mt-3 text-xs text-slate-500">예: 데이터 공백/추가 확인 항목</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900">결과물 구성</div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition">
                          PDF(예정)
                        </button>
                        <button className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition">
                          PPT(예정)
                        </button>
                        <button className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition">
                          Excel(예정)
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50">
                      <ul className="space-y-2 text-sm text-slate-800">
                        {(module.outputs || []).map((o, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 text-[#285BAB]">●</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-900 text-white p-5">
                    <div className="text-sm font-semibold mb-2">프로덕트 방향</div>
                    <p className="text-sm text-slate-200">
                      사람이 개입해서 비싸지거나, AI가 더 잘할 수 있는 반복 작업은 모듈로 제품화합니다.
                      실제 전략 수립은 “빠르게 정리된 결과물”을 바탕으로 팀이 결정합니다.
                    </p>
                  </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 text-sm text-slate-600">
              다음 단계: 이 모듈에서 실제로 필요한 입력 항목(필수/선택)과 결과물 템플릿(슬라이드/엑셀)을 확정하면,
              화면은 그대로 두고 기능만 붙이면 됩니다.
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

