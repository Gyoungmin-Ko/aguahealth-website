import { useState, useMemo } from 'react'

/** AI 도입 시 1건당 소요 시간(분) 가정 */
const MINUTES_PER_CASE = 10

function formatNumber(n) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`
  return n.toLocaleString()
}

export default function ROICalculator({ config }) {
  const [productsPerMonth, setProductsPerMonth] = useState('')
  const [hoursPerCase, setHoursPerCase] = useState('')
  const [hourlyCost, setHourlyCost] = useState('')

  const result = useMemo(() => {
    const n = Number(productsPerMonth) || 0
    const h = Number(hoursPerCase) || 0
    const c = Number(hourlyCost) || 0
    if (n <= 0 || h <= 0 || c <= 0) return null
    const hoursSavedPerMonth = n * (h - MINUTES_PER_CASE / 60)
    const costSaved = hoursSavedPerMonth * c
    const strategyValue = costSaved * 1.2
    return {
      hoursSaved: Math.round(hoursSavedPerMonth * 10) / 10,
      costSaved: Math.round(costSaved),
      strategyValue: Math.round(strategyValue),
    }
  }, [productsPerMonth, hoursPerCase, hourlyCost])

  if (!config) return null

  return (
    <div className="rounded-2xl border border-slate-600 bg-slate-800/80 p-6">
      <h3 className="text-xl font-bold text-sky-200 mb-1">{config.title}</h3>
      <p className="text-sm text-slate-400 mb-6">{config.subtitle}</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">{config.inputs?.[0]?.label}</label>
          <input
            type="number"
            min="1"
            placeholder={config.inputs?.[0]?.placeholder}
            value={productsPerMonth}
            onChange={(e) => setProductsPerMonth(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">{config.inputs?.[1]?.label}</label>
          <input
            type="number"
            min="0.5"
            step="0.5"
            placeholder={config.inputs?.[1]?.placeholder}
            value={hoursPerCase}
            onChange={(e) => setHoursPerCase(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">{config.inputs?.[2]?.label}</label>
          <input
            type="number"
            min="0"
            placeholder={config.inputs?.[2]?.placeholder}
            value={hourlyCost}
            onChange={(e) => setHourlyCost(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>
      {result && (
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div className="rounded-xl bg-sky-900/30 border border-sky-700/50 p-4">
            <div className="text-xs font-medium text-sky-300 mb-1">{config.outputs?.timeSavedLabel}</div>
            <div className="text-2xl font-bold text-white">{result.hoursSaved}시간</div>
            <div className="text-xs text-slate-400 mt-1">/월</div>
          </div>
          <div className="rounded-xl bg-sky-900/30 border border-sky-700/50 p-4">
            <div className="text-xs font-medium text-sky-300 mb-1">{config.outputs?.opportunityLabel}</div>
            <div className="text-2xl font-bold text-white">{formatNumber(result.costSaved)}원</div>
            <div className="text-xs text-slate-400 mt-1">/월</div>
          </div>
          <div className="rounded-xl bg-sky-900/30 border border-sky-700/50 p-4">
            <div className="text-xs font-medium text-sky-300 mb-1">{config.outputs?.scenarioLabel}</div>
            <div className="text-2xl font-bold text-white">{formatNumber(result.strategyValue)}원</div>
            <div className="text-xs text-slate-400 mt-1">참고용</div>
          </div>
        </div>
      )}
      {config.assumptionNote && (
        <p className="text-xs text-slate-500">{config.assumptionNote}</p>
      )}
    </div>
  )
}
