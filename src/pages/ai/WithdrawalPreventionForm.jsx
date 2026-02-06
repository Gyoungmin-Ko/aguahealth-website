/**
 * 퇴방(퇴장방지의약품) 전용 입력 폼
 * 엑셀 비목계산처럼 원료비·재료비 등을 항목별로 한 줄씩 입력.
 */
import { useState } from 'react'

const inputClass =
  'w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#285BAB]/25'

function RepeatableCostTable({ title, rows, onChange, columns, unitLabel, approvedProduction }) {
  const addRow = () => onChange([...rows, { name: '', unitPrice: '', quantity: '' }])
  const removeRow = (index) => onChange(rows.filter((_, i) => i !== index))
  const updateRow = (index, field, value) => {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    onChange(next)
  }

  const totalAmount = rows.reduce((sum, r) => {
    const u = Number(String(r.unitPrice).replace(/,/g, '')) || 0
    const q = Number(String(r.quantity).replace(/,/g, '')) || 0
    return sum + u * q
  }, 0)
  const approved = Number(String(approvedProduction).replace(/,/g, '')) || 1
  const perUnit = approved > 0 ? totalAmount / approved : 0

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden">
      <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
        <span className="font-semibold text-slate-900">{title}</span>
        <button
          type="button"
          onClick={addRow}
          className="text-sm text-[#285BAB] font-medium hover:underline"
        >
          + 행 추가
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-600 border-b border-slate-200">
              {columns.map((col) => (
                <th key={col.id} className="text-left py-2 pr-2 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="text-right py-2 w-20">삭제</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-slate-100">
                {columns.map((col) => (
                  <td key={col.id} className="py-1.5 pr-2">
                    {col.id === 'amount' ? (
                      <span className="text-slate-700">
                        {(
                          (Number(String(row.unitPrice).replace(/,/g, '')) || 0) *
                          (Number(String(row.quantity).replace(/,/g, '')) || 0)
                        ).toLocaleString()}
                      </span>
                    ) : (
                      <input
                        type="text"
                        className={inputClass}
                        placeholder={col.placeholder}
                        value={row[col.id] ?? ''}
                        onChange={(e) => updateRow(index, col.id, e.target.value)}
                      />
                    )}
                  </td>
                ))}
                <td className="py-1.5 text-right">
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className="text-slate-400 hover:text-red-600 text-xs"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <span className="text-slate-600">합계(금액): {totalAmount.toLocaleString()}원</span>
          {approvedProduction != null && approvedProduction !== '' && (
            <span className="text-[#285BAB] font-medium">
              1{unitLabel}당: {perUnit.toFixed(2)}원
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const rawMaterialColumns = [
  { id: 'name', label: '원료명(선택)', placeholder: '예: 스테아르산마그네슘' },
  { id: 'unitPrice', label: '구입단가(원)', placeholder: '예: 6.37' },
  { id: 'quantity', label: '제조투입량', placeholder: '예: 375' },
  { id: 'amount', label: '금액', placeholder: '-' },
]
const materialColumns = [
  { id: 'name', label: '재료명(선택)', placeholder: '예: 공용박스' },
  { id: 'unitPrice', label: '단가(원)', placeholder: '예: 481.35' },
  { id: 'quantity', label: '수량', placeholder: '예: 488' },
  { id: 'amount', label: '금액', placeholder: '-' },
]

export default function WithdrawalPreventionForm({ onRun, loading, onReset }) {
  const [productType, setProductType] = useState('product')
  const [productName, setProductName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [drugCode, setDrugCode] = useState('')
  const [unitSpec, setUnitSpec] = useState('')
  const [targetTiming, setTargetTiming] = useState('')
  const [approvedProduction, setApprovedProduction] = useState('')
  const [rawMaterials, setRawMaterials] = useState([{ name: '', unitPrice: '', quantity: '' }])
  const [materials, setMaterials] = useState([{ name: '', unitPrice: '', quantity: '' }])
  const [productLaborHours, setProductLaborHours] = useState('')
  const [totalLaborHours, setTotalLaborHours] = useState('')
  const [totalLaborCost, setTotalLaborCost] = useState('')
  const [totalOverhead, setTotalOverhead] = useState('')
  const [sellingAdminPerUnit, setSellingAdminPerUnit] = useState('')
  const [nonOperatingPerUnit, setNonOperatingPerUnit] = useState('')
  const [profitRatePercent, setProfitRatePercent] = useState('')
  const [costData, setCostData] = useState(null)
  const [notes, setNotes] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      productType,
      productName,
      companyName,
      drugCode,
      unitSpec,
      targetTiming,
      approvedProduction: approvedProduction.replace(/,/g, '').trim() || null,
      rawMaterials: rawMaterials.map((r) => ({
        name: r.name?.trim() || null,
        unitPrice: Number(String(r.unitPrice).replace(/,/g, '')) || 0,
        quantity: Number(String(r.quantity).replace(/,/g, '')) || 0,
      })),
      materials: materials.map((r) => ({
        name: r.name?.trim() || null,
        unitPrice: Number(String(r.unitPrice).replace(/,/g, '')) || 0,
        quantity: Number(String(r.quantity).replace(/,/g, '')) || 0,
      })),
      labor: {
        productLaborHours: Number(String(productLaborHours).replace(/,/g, '')) || 0,
        totalLaborHours: Number(String(totalLaborHours).replace(/,/g, '')) || 0,
        totalLaborCost: Number(String(totalLaborCost).replace(/,/g, '')) || 0,
      },
      totalOverhead: Number(String(totalOverhead).replace(/,/g, '')) || 0,
      sellingAdminPerUnit: sellingAdminPerUnit ? Number(String(sellingAdminPerUnit).replace(/,/g, '')) : null,
      nonOperatingPerUnit: nonOperatingPerUnit ? Number(String(nonOperatingPerUnit).replace(/,/g, '')) : null,
      profitRatePercent: profitRatePercent ? Number(String(profitRatePercent).replace(/,/g, '')) : null,
      notes: notes?.trim() || '',
    }
    const formData = new FormData()
    formData.append('payload', JSON.stringify(payload))
    if (costData instanceof File) formData.append('costData', costData)
    onRun(formData)
  }

  const handleReset = () => {
    setProductName('')
    setCompanyName('')
    setDrugCode('')
    setUnitSpec('')
    setTargetTiming('')
    setApprovedProduction('')
    setRawMaterials([{ name: '', unitPrice: '', quantity: '' }])
    setMaterials([{ name: '', unitPrice: '', quantity: '' }])
    setProductLaborHours('')
    setTotalLaborHours('')
    setTotalLaborCost('')
    setTotalOverhead('')
    setSellingAdminPerUnit('')
    setNonOperatingPerUnit('')
    setProfitRatePercent('')
    setCostData(null)
    setNotes('')
    onReset?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">구분 · 기본 정보</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">구분</label>
            <select
              className={inputClass}
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="product">제품 (국내제조)</option>
              <option value="commodity">상품 (수입의약품)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">제품/상품명</label>
            <input
              type="text"
              className={inputClass}
              placeholder="예: 모비졸로정 1mg"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">업소명</label>
            <input
              type="text"
              className={inputClass}
              placeholder="예: (주)한국팜비오"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">약가코드</label>
            <input
              type="text"
              className={inputClass}
              placeholder="예: 659901440"
              value={drugCode}
              onChange={(e) => setDrugCode(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">규격단위</label>
            <input
              type="text"
              className={inputClass}
              placeholder="예: 300정, 1병"
              value={unitSpec}
              onChange={(e) => setUnitSpec(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">지정 희망 시점</label>
            <input
              type="text"
              className={inputClass}
              placeholder="예: 2026년 상반기"
              value={targetTiming}
              onChange={(e) => setTargetTiming(e.target.value)}
            />
          </div>
        </div>
      </div>

      {productType === 'product' && (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">인정총생산량(규격단위)</label>
            <input
              type="text"
              className={inputClass}
              placeholder="예: 13510500"
              value={approvedProduction}
              onChange={(e) => setApprovedProduction(e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">원료비·재료비 1단위당 계산 시 사용합니다.</p>
          </div>

          <RepeatableCostTable
            title="1. 원료비 (원료별 구입단가 × 제조투입량)"
            rows={rawMaterials}
            onChange={setRawMaterials}
            columns={rawMaterialColumns}
            unitLabel={unitSpec || '단위'}
            approvedProduction={approvedProduction}
          />

          <RepeatableCostTable
            title="2. 재료비 (재료별 단가 × 수량)"
            rows={materials}
            onChange={setMaterials}
            columns={materialColumns}
            unitLabel={unitSpec || '단위'}
            approvedProduction={approvedProduction}
          />

          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
            <h3 className="font-semibold text-slate-900">3. 노무비 (신청제품 노무시간 / 총생산 노무시간 × 노무비 ÷ 인정총생산량)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">신청제품 노무시간</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="예: 1711.93"
                  value={productLaborHours}
                  onChange={(e) => setProductLaborHours(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">총생산 노무시간</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="예: 71040"
                  value={totalLaborHours}
                  onChange={(e) => setTotalLaborHours(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">노무비(총액, 원)</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="예: 5054810631"
                  value={totalLaborCost}
                  onChange={(e) => setTotalLaborCost(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <h3 className="font-semibold text-slate-900 mb-3">4. 제조경비 (연구개발비·무형자산상각비 제외 총액)</h3>
            <div className="max-w-xs">
              <label className="block text-sm font-medium text-slate-700 mb-1">제조경비 총액(원)</label>
              <input
                type="text"
                className={inputClass}
                placeholder="예: 5536912435"
                value={totalOverhead}
                onChange={(e) => setTotalOverhead(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">1단위당 판매 및 일반관리비(원)</label>
              <input
                type="text"
                className={inputClass}
                placeholder="예: 1.03"
                value={sellingAdminPerUnit}
                onChange={(e) => setSellingAdminPerUnit(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">1단위당 영업외 손익(원)</label>
              <input
                type="text"
                className={inputClass}
                placeholder="예: 0.47 또는 -0.05"
                value={nonOperatingPerUnit}
                onChange={(e) => setNonOperatingPerUnit(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">적정이윤률(%)</label>
              <input
                type="text"
                className={inputClass}
                placeholder="예: 10.712"
                value={profitRatePercent}
                onChange={(e) => setProfitRatePercent(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {productType === 'commodity' && (
        <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
          상품(수입의약품) 입력 항목은 추후 표 60·별지 5 기준으로 추가됩니다. 현재는 제품(국내제조)만 세부 입력이 가능합니다.
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">원가자료(첨부, 선택)</label>
          <input
            type="file"
            className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#285BAB]/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#285BAB]"
            accept=".pdf,.xlsx,.xls,.csv"
            onChange={(e) => setCostData(e.target.files?.[0] ?? null)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">추가 메모</label>
          <textarea
            className={`${inputClass} min-h-[80px]`}
            placeholder="가정/제약사항/특이사항"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-lg bg-[#285BAB] text-white font-semibold hover:bg-[#1e4580] disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {loading ? '처리 중…' : '원가 계산'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition font-medium"
        >
          초기화
        </button>
      </div>
    </form>
  )
}
