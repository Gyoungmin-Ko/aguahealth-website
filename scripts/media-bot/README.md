# media-bot

아그와헬스 미디어 모니터링 및 주간 정책 브리핑 뉴스레터 생성 스크립트.

## 설치

```bash
cd scripts/media-bot
pip install -r requirements.txt
playwright install chromium
```

## 환경 변수

`.env.example`을 복사하여 `.env`를 만들고 필요한 값을 설정하세요.

```bash
cp .env.example .env
# OPENAI_API_KEY (뉴스레터 생성), RESEND_API_KEY, RESEND_SEGMENT_ID (발송) 입력
```

## 실행 순서

1. **미디어 수집**: `python media_scraper.py`
2. **뉴스레터 생성**: `python newsletter_gen.py`
3. **발송 (선택)**: `python send_newsletter.py` — 최신 `weekly_briefing_*.html`을 Resend Broadcast로 구독자에게 발송

발송 테스트(실제 메일 안 보냄): `NEWSLETTER_DRY_RUN=1 python send_newsletter.py`

## 출력

- `scraped_news.json`: 수집된 기사 목록
- `weekly_briefing_YYYYMMDD.md`: 생성된 주간 브리핑 (Markdown)
- `weekly_briefing_YYYYMMDD.html`: 발송용 HTML (수신거부 링크 포함)

## 상세 가이드

`docs/MEDIA_BOT_IMPLEMENTATION_GUIDE.md` 참고.
