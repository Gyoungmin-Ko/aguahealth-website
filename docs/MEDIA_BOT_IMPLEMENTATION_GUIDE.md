# 미디어 모니터링 & 뉴스레터 구현 가이드

> 아그와헬스 서비스 관련 미디어 수집 → 뉴스레터 생성 → 고객 배포 파이프라인

---

## 1. 현재 media-bot 구조

| 파일 | 역할 |
|------|------|
| `media_scraper.py` | Playwright로 히트뉴스 정책/제도 섹션 스크래핑, 키워드(약가, 급여, RSA, 제네릭) 필터 |
| `newsletter_gen.py` | scraped_news.json → OpenAI로 주간 정책 브리핑 인사이트(Markdown) 생성, Markdown→HTML 변환 및 `weekly_briefing_*.html` 저장 |
| `send_newsletter.py` | 최신 weekly_briefing HTML을 Resend Broadcast API로 구독자(Segment)에게 발송 |
| `scraped_news.json` | 수집 기사 저장 |
| `weekly_briefing_YYYYMMDD.md` / `.html` | 생성된 브리핑 및 발송용 HTML |

**장점**: 수집·생성·배포 파이프라인 구축 완료  
**다음 단계**: 스케줄링(GitHub Actions 등), 수집 소스 확대(RSS 등)

---

## 2. 미디어 수집 최신 트렌드 (2025)

### 권장: 하이브리드 방식

| 방식 | 적합한 경우 | 장점 | 비용 |
|------|-------------|------|------|
| **RSS/API** | 뉴스사가 제공하는 경우 | 안정적, 법적 리스크 낮음 | 무료~저렴 |
| **스크래핑** (Playwright) | API가 없는 국내 매체 | 커버리지 확대 | 개발/유지비 |
| **뉴스 API** (ScrapingBee, Datastreamer 등) | 대량·다소스 필요 시 | 빠르고 안정적 | 월 $29~49+ |

### 아그와헬스 추천 조합

1. **유지**: 히트뉴스 Playwright 스크래핑 (국내 제약·정책 뉴스)
2. **추가**: RSS 피드 구독
   - 보건복지부, 건보공단, 식약처 보도자료 RSS
   - 의료/제약 관련 언론사 RSS (가능한 곳)
3. **선택**: 뉴스 API 1개 도입
   - ScrapingBee, Scrappey 등으로 추가 소스 확대 시 고려

### 수집 키워드 확장 제안

현재: `약가`, `급여`, `RSA`, `제네릭`  
추가 권장: `건강보험`, `급여등재`, `경제성평가`, `인허가`, `의료기기`, `치료재료`, `퇴장방지`, `원가`

---

## 3. 배포 방식: 뉴스레터 vs 콜드메일

### 역할 구분

| 용도 | 대상 | 도구 | 특징 |
|------|------|------|------|
| **뉴스레터** | 구독 신청한 고객 | Resend Broadcast / Audiences | 도달률·신뢰 높음, 정기 발행 |
| **콜드메일** | 신규 리드 타겟팅 | Lemlist, Instantly, Apollo 등 | 1:1 톤, 영업/프로스펙팅용 |

### 아그와헬스 권장

- **1차**: **뉴스레터** 중심
  - 이미 사이트에 구독 폼 있고, Resend Audiences 사용 중
  - “주간 정책 브리핑” 형태에 가장 적합
- **2차**: 콜드메일
  - 특정 기업·담당자 타겟 영업 시 별도 도구로 운영

---

## 4. 뉴스레터 배포 최신 트렌드 (2025)

### 핵심 사항

- **SPF, DKIM, DMARC** 설정 필수 (Gmail/Yahoo/MS 정책)
- **일클릭 수신거부** 링크 포함
- **구독 해제율·스팸 신고율** 모니터링 (스팸 신고 0.3% 초과 시 위험)

### Resend Broadcast API (2025년 3월 출시)

- 이미 Resend 사용 중 → Broadcast로 뉴스레터 발송 적합
- Audiences(Segments) 대상으로 일괄 발송
- HTML/React/Plain 텍스트 지원, `{{{FIRST_NAME}}}` 등 개인화 가능

### B2B 뉴스레터 가이드

- **빈도**: 주 1회(월요일·화요일 권장)
- **길이**: 핵심만 3~5개 이슈, 상세는 링크로
- **톤**: 전문적이면서도 읽기 쉬운 문체

---

## 5. 구현 아키텍처 제안

```
[미디어 수집]                    [뉴스레터 생성]              [배포]
                                                             
히트뉴스 (Playwright)  ──┐                                    
RSS 피드 (추가)       ──┼──► scraped_news.json ──► newsletter_gen.py
뉴스 API (선택)       ──┘         │                      │
                                  │                      ▼
                                  │              weekly_briefing.md
                                  │                      │
                                  │                      ▼
                                  │              Markdown → HTML 변환
                                  │                      │
                                  │                      ▼
                                  └──────────────► Resend Broadcast API
                                                          │
                                                          ▼
                                                  Audiences (구독자)
```

### aguahealth-website 통합

1. **media-bot 코드**: `aguahealth-website` 안으로 이동  
   - 예: `scripts/media-bot/` 또는 `tools/media-bot/`
2. **스케줄링**
   - **옵션 A**: GitHub Actions (주 1회 cron)
   - **옵션 B**: Cloudflare Workers Cron
   - **옵션 C**: 로컬/서버 cron (직접 호스팅 시)
3. **배포**
   - Cloudflare Function 또는 외부 서버에서 Resend Broadcast API 호출

---

## 6. 단계별 구현 로드맵

### Phase 1: 배포 파이프라인 연결 (1~2주) ✅ 완료

- [x] media-bot 파일들을 `aguahealth-website/scripts/media-bot/`로 이동
- [x] Markdown → HTML 변환 (뉴스레터 본문용) — `newsletter_gen.py`에 `markdown_to_html`, `wrap_newsletter_html` 추가, `weekly_briefing_*.html` 저장
- [x] Resend Broadcast API로 발송 — `send_newsletter.py` 추가 (Create Broadcast → Send Broadcast)
- [x] Audiences(Segments)와 연동 — `RESEND_SEGMENT_ID`로 발송 대상 지정, 수신거부 `{{{RESEND_UNSUBSCRIBE_URL}}}` 포함

### Phase 2: 스케줄링 & 자동화 (1주)

- [ ] 주 1회 실행 스케줄 설정 (GitHub Actions 또는 Cloudflare Cron)
- [ ] media_scraper → newsletter_gen → Resend 발송 자동 파이프라인

### Phase 3: 수집 소스 확대 (1~2주)

- [ ] RSS 피드 추가 (보건복지부, 건보공단 등)
- [ ] 키워드 확장
- [ ] 중복/품질 필터링 로직 개선

### Phase 4: 웹 대시보드 (선택, 2~3주)

- [ ] `/media-monitoring` 페이지
- [ ] 수집 기사·뉴스레터 이력 조회
- [ ] 수동 발송·미리보기 기능

---

## 7. 콜드메일이 필요할 때

- **도구**: Lemlist, Instantly, Apollo, Woodpecker 등
- **원칙**: 개인화, 짧은 본문(100~120단어), 1일 50통 이하, 도메인 워밍업
- **사용 시점**: 특정 제약사/바이오 담당자에게 맞춤 제안을 보낼 때
- **뉴스레터와 구분**: 뉴스레터 = 정기 인사이트, 콜드메일 = 타겟 영업

---

## 8. Phase 2–4 상세 설정 가이드

### Phase 2: Resend Broadcast 연동

#### 2-1. Resend 설정

1. [Resend 대시보드](https://resend.com/overview) 로그인
2. **Audiences**에서 뉴스레터 구독자 목록 확인 (인사이트 페이지 구독 폼에서 수집된 이메일)
3. **API Keys**에서 키 발급 (브로드캐스트 발송 권한 필요)
4. 도메인 인증(SPF, DKIM, DMARC) 완료 여부 확인

#### 2-2. Broadcast API 연동

- **문서**: https://resend.com/docs/api-reference/broadcasts/send-broadcast
- **필요 환경 변수**: `RESEND_API_KEY` (이미 Contact/Newsletter에 사용 중)
- **흐름**:
  1. `newsletter_gen.py`로 Markdown 생성
  2. Markdown → HTML 변환 (예: `markdown` Python 패키지 또는 `marked` JS)
  3. Resend Broadcast API 호출
    - `audience_id`: 구독자 Audiences ID
    - `from`: `아그와헬스 <newsletter@agua-health.com>` 등
    - `subject`: "주간 정책 브리핑 - YYYY-MM-DD"
    - `html`: 변환된 HTML 본문
    - 수신거부 링크 `{{{RESEND_UNSUBSCRIBE_URL}}}` 포함 필수

#### 2-3. Markdown → HTML 변환

```bash
pip install markdown
```

```python
import markdown
html_body = markdown.markdown(markdown_text, extensions=['extra', 'nl2br'])
```

---

### Phase 3: 스케줄링 & 자동화

#### 3-1. GitHub Actions (권장)

`.github/workflows/weekly-newsletter.yml`:

```yaml
name: Weekly Newsletter
on:
  schedule:
    - cron: '0 0 * * 1'  # 매주 월요일 09:00 KST (00:00 UTC = 09:00 KST)
  workflow_dispatch:  # 수동 실행 가능
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - name: Install deps
        run: |
          pip install -r scripts/media-bot/requirements.txt
          playwright install chromium --with-deps
      - name: Run scraper
        run: python scripts/media-bot/media_scraper.py
      - name: Run newsletter gen
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: python scripts/media-bot/newsletter_gen.py
      # 여기에 Resend Broadcast 호출 스텝 추가
```

**필요 Secrets**: `OPENAI_API_KEY`, `RESEND_API_KEY` (선택)

#### 3-2. Cloudflare Workers Cron

- Python은 Workers에서 직접 실행 불가 → **GitHub Actions 권장**
- 또는 별도 서버(VPS, Railway, Render)에서 cron으로 실행

#### 3-3. 로컬/서버 cron

```bash
# crontab -e
0 9 * * 1 cd /path/to/aguahealth-website/scripts/media-bot && python media_scraper.py && python newsletter_gen.py
```

---

### Phase 4: 수집 소스 확대

#### 4-1. RSS 피드 추가

`media_scraper.py`에 RSS 수집 함수 추가:

```python
import feedparser

RSS_FEEDS = [
    "https://www.mohw.go.kr/rss/...",  # 보건복지부 (실제 URL 확인 필요)
    # 건보공단, 식약처 등 RSS URL 추가
]

def scrape_rss_feeds() -> list[dict]:
    articles = []
    for url in RSS_FEEDS:
        feed = feedparser.parse(url)
        for entry in feed.entries[:5]:
            if _matches_keywords(entry.get("title", "")):
                articles.append({
                    "title": entry.title,
                    "url": entry.link,
                    "date": entry.get("published", "")[:10],
                    "source": feed.feed.get("title", "RSS"),
                })
    return articles
```

`main()`에서 `scrape_hit_news_policy()` 결과와 `scrape_rss_feeds()` 결과 병합.

#### 4-2. 키워드 확장

`media_scraper.py`의 `KEYWORDS` 수정:

```python
KEYWORDS = [
    "약가", "급여", "RSA", "제네릭",
    "건강보험", "급여등재", "경제성평가", "인허가",
    "의료기기", "치료재료", "퇴장방지", "원가"
]
```

---

### Phase 5: 웹 대시보드 (선택)

- `/media-monitoring` 라우트 추가
- `scraped_news.json` 또는 DB에 저장된 기사 목록 표시
- 수동 발송 버튼: Cloudflare Function 호출 → Resend Broadcast 트리거

---

## 9. 즉시 착수 가능한 작업

1. **media-bot → aguahealth-website 이동** ✅ 완료
   - `scripts/media-bot/` 에 `media_scraper.py`, `newsletter_gen.py`, `requirements.txt` 배치됨
2. **Resend Broadcast 연동** ✅ 완료
   - `send_newsletter.py`: 최신 `weekly_briefing_*.html`(또는 .md)을 Resend Broadcast로 발송. `.env`에 `RESEND_API_KEY`, `RESEND_SEGMENT_ID` 설정 후 `python send_newsletter.py`
3. **스케줄링** → Phase 3 상세 가이드 참고 (GitHub Actions 등)
4. **수집 확대** → Phase 4 상세 가이드 참고

미디어·뉴스레터 작업은 **새 Cursor 창**에서 `aguahealth-website` 프로젝트를 열고 `docs/MEDIA_BOT_IMPLEMENTATION_GUIDE.md`를 참고해 진행하세요.
