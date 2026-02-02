/**
 * 인사이트 Markdown 콘텐츠 로더
 * src/content/insights/*.md 파일을 파싱하여 리스트/상세 데이터 제공
 */
import matter from 'gray-matter'

const mdModules = import.meta.glob('../content/insights/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseInsight(path, raw) {
  const { data, content } = matter(raw)
  const id = path.replace(/^.*\/|\\.md$/g, '')
  return {
    id,
    ...data,
    content,
    link: `/insights/${id}`,
  }
}

const insightsMap = Object.fromEntries(
  Object.entries(mdModules).map(([path, raw]) => {
    const insight = parseInsight(path, raw)
    return [insight.id, insight]
  })
)

const insightsList = Object.values(insightsMap).sort(
  (a, b) => Number(b.id) - Number(a.id)
)

/**
 * 인사이트 목록 조회 (그리드용 메타데이터)
 */
export function getInsightsList() {
  return insightsList.map(({ id, title, category, categoryLabel, date, summary }) => ({
    id,
    title,
    category,
    categoryLabel,
    date,
    summary,
    link: `/insights/${id}`,
  }))
}

/**
 * ID로 인사이트 상세 조회 (제목, 메타, 본문)
 */
export function getInsightById(id) {
  return insightsMap[id] || null
}
