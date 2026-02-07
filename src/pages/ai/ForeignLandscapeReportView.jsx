import { useState } from 'react'
import {
  approvalComparisonRows,
  approvalComparisonCountries,
  foreignPriceRows,
  foreignPriceCountries,
  evaluationStatusRows,
  writingMethods,
  relatedWebsites,
  exFactoryPriceTable,
  priceSourceWebsites,
} from '../../data/foreignLandscapeReport'

const TableCell = ({ children, className = '' }) => (
  <td className={`px-3 py-2 border-b border-slate-100 text-slate-800 text-sm ${className}`}>
    {children ?? '-'}
  </td>
)

/** API result로부터 2) 허가사항 비교 셀 맵 생성 (키: rowIndex_countryIndex) */
function mapApprovalFromResult(result) {
  const map = {}
  if (!result?.assumptions?.length) return map
  const rows = ['허가 함량', '국내와 동일한 적응증', '기타 적응증', '급여 여부', '급여 제한', '허가 연도']
  const countryKeys = ['미국', '일본', '프랑스', '독일', '이탈리아', '스위스', '영국', '호주', '캐나다']
  result.assumptions.forEach((row, i) => {
    const country = row.국가
    const colIdx = countryKeys.indexOf(country)
    if (colIdx < 0) return
    rows.forEach((r, ri) => {
      const val = row[r] ?? row['등재여부'] ?? row['약가수준'] ?? row['급여범위'] ?? row['비고']
      if (val != null && val !== '') map[`${ri}_${colIdx}`] = val
    })
    if (row.등재여부 != null) map[`1_${colIdx}`] = row.등재여부
    if (row.급여범위 != null) map[`3_${colIdx}`] = row.급여범위
  })
  return map
}

export default function ForeignLandscapeReportView({ result = {}, className = '' }) {
  const [domesticPrice, setDomesticPrice] = useState('')
  const [showRef, setShowRef] = useState(false)
  const approvalCellMap = mapApprovalFromResult(result)

  return (
    <div className={`space-y-8 ${className}`}>
      {/* 1) 제외국 허가 사항 */}
      <section className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
          1) 제외국 허가 사항
        </div>
        <div className="p-4">
          <p className="text-sm text-slate-700 mb-4">
            FDA, EMA, TGA 등 허가 기관의 제외국 허가 내역을 기재하고, 원문은 별도 제출합니다.
          </p>
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <span className="text-slate-400">□</span>
            <div>
              <span className="font-medium text-slate-700">작성 방법</span>
              <p className="mt-1">{writingMethods.section1.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2) 허가사항 비교 */}
      <section className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
          2) 허가사항 비교
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-3 py-2.5 font-semibold text-slate-700 w-36 sticky left-0 bg-slate-100">등재 국가</th>
                {approvalComparisonCountries.map((c) => (
                  <th key={c} className="px-3 py-2.5 font-semibold text-slate-700 whitespace-nowrap">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approvalComparisonRows.map((row, ri) => (
                <tr key={ri} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-3 py-2 font-medium text-slate-800 bg-slate-50/80 sticky left-0">{row}</td>
                  {approvalComparisonCountries.map((_, ci) => (
                    <TableCell key={ci}>{approvalCellMap[`${ri}_${ci}`]}</TableCell>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <span className="text-slate-400">□</span>
            <div>
              <span className="font-medium text-slate-700">작성 방법</span>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {writingMethods.section2.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3) 제외국 약가 */}
      <section className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-3">
          <span className="font-semibold text-slate-900">3) 제외국 약가</span>
          <span className="text-sm text-slate-600">
            (국내 신청가격 :
            <input
              type="text"
              value={domesticPrice}
              onChange={(e) => setDomesticPrice(e.target.value)}
              placeholder=" ___ "
              className="mx-1 w-28 inline-block rounded border border-slate-200 px-2 py-1 text-slate-900 text-center"
            />
            원)
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-3 py-2.5 font-semibold text-slate-700 w-44 sticky left-0 bg-slate-100">
                  등재국가 (통화)
                </th>
                {foreignPriceCountries.map((c) => (
                  <th key={c.key} className="px-3 py-2.5 font-semibold text-slate-700 whitespace-nowrap">
                    {c.label} {c.currency ? `(${c.currency})` : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {foreignPriceRows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-3 py-2 font-medium text-slate-800 bg-slate-50/80 sticky left-0">{row.label}</td>
                  {foreignPriceCountries.map((c) => (
                    <TableCell key={c.key} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <span className="text-slate-400">□</span>
            <div>
              <span className="font-medium text-slate-700">작성 방법</span>
              <ul className="mt-2 space-y-1 list-decimal list-inside">
                {writingMethods.section3.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4) 제외국 평가 현황 */}
      <section className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
          4) 제외국 평가 현황
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-3 py-2.5 font-semibold text-slate-700 w-40">국가명</th>
                <th className="px-3 py-2.5 font-semibold text-slate-700">평가일자</th>
                <th className="px-3 py-2.5 font-semibold text-slate-700">평가결과</th>
              </tr>
            </thead>
            <tbody>
              {evaluationStatusRows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-3 py-2 font-medium text-slate-800 bg-slate-50/80">
                    {row.country} ({row.org})
                  </td>
                  <TableCell />
                  <TableCell />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 space-y-4">
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <span className="text-slate-400">□</span>
            <div>
              <span className="font-medium text-slate-700">작성 방법</span>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {writingMethods.section4.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <span className="text-slate-400">□</span>
            <div className="flex-1">
              <span className="font-medium text-slate-700">관련 홈페이지</span>
              <ul className="mt-2 space-y-2">
                {relatedWebsites.map((site, i) => (
                  <li key={i}>
                    <span className="font-medium text-slate-800">{site.name}:</span>{' '}
                    {site.description}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-[#285BAB] hover:underline break-all"
                    >
                      {site.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 참고: 공장도 출하가격·인정 자료원 (접기) */}
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setShowRef((v) => !v)}
          className="w-full px-4 py-3 bg-slate-50 border-b border-slate-200 font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-between"
        >
          참고: 국가별 공장도 출하가격 산출식 및 약가 인정 자료원
          <span className="text-slate-400">{showRef ? '▲' : '▼'}</span>
        </button>
        {showRef && (
          <div className="p-4 space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#285BAB] mb-2">공장도 출하가격 산출식 및 자료원</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="px-3 py-2 font-semibold text-slate-700">국가</th>
                      <th className="px-3 py-2 font-semibold text-slate-700">산출 비율</th>
                      <th className="px-3 py-2 font-semibold text-slate-700">자료원</th>
                      <th className="px-3 py-2 font-semibold text-slate-700">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exFactoryPriceTable.map((row, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="px-3 py-2 font-medium text-slate-800">{row.country}</td>
                        <td className="px-3 py-2 text-slate-700">{row.ratio}</td>
                        <td className="px-3 py-2 text-slate-700">{row.source}</td>
                        <td className="px-3 py-2 text-slate-600">{row.remark || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#285BAB] mb-2">약가 확인 인정 자료원 (사이트)</div>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {priceSourceWebsites.map((row, i) => (
                  <li key={i}>
                    <span className="font-medium">{row.country}:</span>{' '}
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-[#285BAB] hover:underline break-all">
                      {row.url}
                    </a>
                    {row.note && row.note !== '-' && <span className="text-slate-500 ml-1">({row.note})</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
