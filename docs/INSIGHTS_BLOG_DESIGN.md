# 인사이트 내부 블로그 설계 문서

## 개요

인사이트 페이지는 **JSON 기반 내부 블로그**로 구현되어 있습니다.  
글 목록과 상세 콘텐츠는 `src/data/insightsWithContent.js` 한 파일에서 관리하며, "자세히 보기" 클릭 시 `/insights/:id` 상세 페이지에서 전문을 확인할 수 있습니다.

---

## 디렉터리 구조 (2025년 2월)

```
src/
├── data/
│   ├── insightsWithContent.js   # 목록 + 상세 콘텐츠 (단일 출처)
│   └── insights.json            # (레거시, 미사용)
├── content/insights/            # (레거시 .md 파일, 참고용)
└── pages/
    ├── Insights.jsx             # 목록 페이지
    └── InsightDetail.jsx        # 상세 페이지
```

---

## 데이터 구조 (insightsWithContent.js)

각 항목은 다음 필드를 가집니다:

| 필드 | 필수 | 설명 |
|------|------|------|
| `id` | O | 고유 ID (문자열, 예: `"1"`) |
| `title` | O | 제목 |
| `category` | O | 분류 코드 |
| `categoryLabel` | O | 화면 표시 분류명 |
| `date` | O | 표시 날짜 |
| `summary` | O | 목록 카드용 요약 |
| `content` | O | 상세 페이지 본문 (마크다운 문자열) |

---

## SPA 라우팅

`public/_redirects`에 다음 규칙이 있습니다:

```
/insights/*  /index.html  200
```

이를 통해 `/insights/1` 등 직접 URL 접근 시에도 `index.html`이 서빙되어 React Router가 동작합니다.

---

## 새 글 추가

`src/data/insightsWithContent.js`의 `INSIGHTS` 배열 맨 앞에 새 객체를 추가합니다.  
자세한 절차는 [INSIGHTS_BLOG_GUIDE.md](../INSIGHTS_BLOG_GUIDE.md)를 참고하세요.
