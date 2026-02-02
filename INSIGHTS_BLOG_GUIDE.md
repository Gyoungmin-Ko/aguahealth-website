# 인사이트 블로그 글 작성 가이드

인사이트 메뉴는 **내부 블로그**로, "자세히 보기" 클릭 시 상세 페이지(`/insights/1` 등)에서 전문을 볼 수 있습니다.

---

## 현재 구조 (2025년 2월 기준)

| 파일 | 역할 |
|------|------|
| `src/data/insightsWithContent.js` | **단일 출처** — 목록 + 상세 콘텐츠 모두 포함 |
| `src/pages/Insights.jsx` | 목록 페이지 (그리드, 필터, 뉴스레터) |
| `src/pages/InsightDetail.jsx` | 상세 페이지 |

**변경 사항**: 이전 Markdown(`.md`) 방식은 제거되었습니다. 모든 콘텐츠는 `insightsWithContent.js`에서 관리합니다.

---

## 새 글 추가하기

1. `src/data/insightsWithContent.js` 파일을 엽니다.

2. `INSIGHTS` 배열 **맨 앞**에 새 객체를 추가합니다 (최신 글이 위로 오도록).

```javascript
{
  id: "11",   // 기존 최대 번호 + 1
  title: "글 제목",
  category: "economics",   // 아래 표 참고
  categoryLabel: "경제성평가",
  date: "2025년 3월",
  summary: "카드에 보일 요약 2~3줄",
  content: `본문을 마크다운으로 작성합니다.

## 소제목

- 목록
- 항목

**굵게**, *기울임*, 표 등도 사용 가능합니다.`
}
```

3. `insights.json`도 함께 수정합니다 (목록과 동기화를 위해).  
   - 또는 `insightsWithContent.js`만 수정해도 됩니다. (Insights 페이지는 `getInsightsList()`를 사용하므로 `insightsWithContent.js`만 수정하면 됨)

4. 저장 후 `npm run build` → 배포

---

## category 값

| 값 | 화면 표시 |
|----|-----------|
| `market-entry` | 시장진입전략 |
| `economics` | 경제성평가 |
| `regulatory` | 인허가지원 |
| `claims` | 요양급여비용청구 |
| `ai` | AI 솔루션 |

---

## content에서 사용 가능한 마크다운

- `##`, `###` 소제목
- `**굵게**`, `*기울임*`
- `-` 목록, `1.` 번호 목록
- 표 (`| 열1 | 열2 |`)
- 링크 `[텍스트](url)`

---

## 요약

- **수정 파일**: `src/data/insightsWithContent.js`
- **추가 위치**: `INSIGHTS` 배열 맨 앞
- **id**: 문자열 숫자 (예: `"11"`)
- **content**: 백틱(\`)으로 감싼 마크다운 문자열
