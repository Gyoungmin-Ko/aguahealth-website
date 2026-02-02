# 인사이트 내부 블로그 설계 문서

## 개요

인사이트 페이지는 **Markdown 기반 내부 블로그**로 구현되어 있습니다.  
글 목록은 메타데이터를 기반으로 표시되고, "자세히 보기" 클릭 시 `/insights/:id` 상세 페이지에서 전문을 확인할 수 있습니다.

---

## 디렉터리 구조

```
src/
├── content/
│   └── insights/           # 인사이트 Markdown 원본
│       ├── 1.md
│       ├── 2.md
│       └── ...
├── data/
│   ├── insightsLoader.js   # Markdown 파싱 및 데이터 제공
│   └── insights.json       # (레거시, 참고용)
└── pages/
    ├── Insights.jsx        # 목록 페이지
    └── InsightDetail.jsx   # 상세 페이지
```

---

## Markdown 파일 형식

각 `.md` 파일은 **YAML frontmatter**와 **마크다운 본문**으로 구성됩니다.

```markdown
---
id: "1"
title: "글 제목"
category: economics
categoryLabel: 경제성평가
date: 2025년 1월
summary: "카드에 보일 요약 2~3줄"
---

본문 마크다운...
```

| 필드 | 필수 | 설명 |
|------|------|------|
| `id` | O | 고유 ID (파일명과 일치 권장: `1.md` → `"1"`) |
| `title` | O | 제목 |
| `category` | O | 분류 코드: `economics`, `market-entry`, `regulatory`, `claims`, `ai` |
| `categoryLabel` | O | 화면 표시 분류명 |
| `date` | O | 표시 날짜 |
| `summary` | O | 목록 카드용 요약 |

---

## 데이터 흐름

1. **빌드 시**: `import.meta.glob`으로 `src/content/insights/*.md` 로드
2. **파싱**: `gray-matter`로 frontmatter와 본문 분리
3. **제공**: `insightsLoader.js`가 `getInsightsList()`, `getInsightById(id)` export
4. **렌더링**: `react-markdown`으로 본문을 HTML로 변환

---

## 새 글 작성 절차

1. `src/content/insights/`에 새 파일 생성 (예: `11.md`)
2. frontmatter와 본문 작성
3. 저장 후 `npm run build` → 배포

파일명(`11.md`)과 frontmatter의 `id`(`"11"`)가 일치하면 `/insights/11`에서 접근 가능합니다.

---

## 지원 마크다운 요소

- 제목 (h2, h3)
- 문단, 굵게, 기울임
- 목록 (ul, ol)
- 표 (table)
- 링크, 이미지

`InsightDetail.jsx`의 `ReactMarkdown` components로 스타일이 적용됩니다.

---

## 유지보수

- **글 수정**: 해당 `.md` 파일 편집 후 재배포
- **글 삭제**: `.md` 파일 삭제 후 재배포
- **스타일 변경**: `InsightDetail.jsx`의 `ReactMarkdown` components 수정
- **목록 UI 변경**: `Insights.jsx` 수정

---

## 의존성

- `react-markdown`: 마크다운 → React 컴포넌트 렌더링
- `gray-matter`: frontmatter 파싱
