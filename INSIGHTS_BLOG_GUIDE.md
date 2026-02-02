# 인사이트 블로그 작성 가이드

인사이트 페이지는 **Markdown 기반 내부 블로그**로 구현되어 있습니다.  
"자세히 보기" 클릭 시 `/insights/:id` 상세 페이지에서 전문을 확인할 수 있습니다.

---

## 현재 구조

- **목록**: `src/pages/Insights.jsx` — 인사이트 그리드 + 필터 + 뉴스레터 구독
- **상세**: `src/pages/InsightDetail.jsx` — `/insights/1`, `/insights/2` 등
- **콘텐츠**: `src/content/insights/*.md` — Markdown 파일이 단일 출처

---

## 새 글 추가하기

1. `src/content/insights/` 폴더에 새 파일 생성 (예: `11.md`)
2. 아래 형식으로 frontmatter와 본문 작성

```markdown
---
id: "11"
title: "글 제목"
category: economics
categoryLabel: 경제성평가
date: 2025년 2월
summary: "카드에 보일 요약 2~3줄을 입력합니다."
---

본문 내용을 마크다운으로 작성합니다.

## 소제목

문단, 목록, 표 등 일반 마크다운 문법을 사용할 수 있습니다.
```

3. `npm run build` 후 배포

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

## 마크다운 지원

- 제목 (h2, h3)
- 문단, **굵게**, *기울임*
- 목록 (ul, ol)
- 표 (table)
- 링크, 이미지

---

## 상세 설계

[docs/INSIGHTS_BLOG_DESIGN.md](docs/INSIGHTS_BLOG_DESIGN.md) 참고
