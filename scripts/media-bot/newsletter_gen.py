"""
아그와헬스 미디어 모니터링 - 주간 정책 브리핑 뉴스레터 생성

scraped_news.json을 읽어, 수집된 기사 전체를 바탕으로 아그와헬스 사업 관점의
'주간 정책 브리핑 인사이트'를 작성합니다. 제약사 등 고객사에 보낼 수 있는 Markdown 리포트로 출력합니다.
Markdown → HTML 변환하여 뉴스레터 발송용 HTML 파일도 저장합니다.
"""

import json
import os
from datetime import datetime
from openai import OpenAI
from dotenv import load_dotenv

try:
    import markdown
    HAS_MARKDOWN = True
except ImportError:
    HAS_MARKDOWN = False

# .env 로드 (스크립트 위치 기준)
_script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=os.path.join(_script_dir, ".env"), override=True)

SCRAPED_NEWS_PATH = os.path.join(_script_dir, "scraped_news.json")
OUTPUT_DIR = _script_dir

# 아그와헬스 사업 아이템 (agua-health.com 기반)
AGWA_BUSINESS = """
아그와헬스(Agua Health)는 의약·의료기기 기업을 위한 다음 사업을 제공합니다.
- 시장진입전략: 혁신 의약품·의료기기의 한국 시장 진입 End-to-End 전략 수립 및 실행 지원
- 경제성평가: 비용효과성 입증, 건강보험 등재 승인 가능성 극대화 (CEA/CUA, BIA, RSA 설계)
- 인허가지원: 식약처 허가 전략 수립부터 실행까지 전 과정 지원
- 요양급여비용청구 최적화: AI·빅데이터 기반 청구 심사 통과율 향상, 반송 감소 및 재정손실 최소화
고객은 주로 제약사·바이오벤처이며, MA(Market Access)·규제·급여·청구 이슈에 대한 인사이트를 제공합니다.
"""


def load_scraped_news() -> list[dict]:
    """scraped_news.json을 읽어 리스트로 반환. 없거나 비어 있으면 빈 리스트."""
    if not os.path.exists(SCRAPED_NEWS_PATH):
        return []
    try:
        with open(SCRAPED_NEWS_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, list) else []
    except (json.JSONDecodeError, IOError):
        return []


def build_articles_text(articles: list[dict]) -> str:
    """AI에 넘길 기사 목록 텍스트 생성."""
    lines = []
    for i, a in enumerate(articles, 1):
        title = (a.get("title") or "").strip().replace("\n", " ")
        url = a.get("url", "")
        date = a.get("date", "")
        source = a.get("source", "")
        lines.append(f"{i}. [{date}] [{source}] {title}\n   URL: {url}")
    return "\n".join(lines)


def generate_newsletter(articles: list[dict]) -> str:
    """수집된 기사를 바탕으로 주간 정책 브리핑 인사이트(Markdown)를 생성합니다."""
    api_key = (os.environ.get("OPENAI_API_KEY") or "").strip()
    if not api_key:
        return "# 오류\n\nOPENAI_API_KEY가 설정되지 않았습니다. .env 파일을 확인해 주세요."

    articles_text = build_articles_text(articles)

    system_content = f"""당신은 아그와헬스(Agua Health)의 정책·시장 분석가입니다.

{AGWA_BUSINESS}

주어진 뉴스 기사 목록을 모두 반영하여, **주간 정책 브리핑 인사이트**를 작성해 주세요.
- 고객사(제약사·바이오벤처)에 바로 보낼 수 있는 **Markdown 형식**의 리포트로 작성합니다.
- 구성 예: 표지(제목·발행일), Executive Summary, 이번 주 핵심 이슈, MA/급여/규제 관점 인사이트, 참고 기사 목록(제목·URL).
- 한국어로 작성하고, 전문적이면서도 읽기 쉬운 톤을 유지합니다.
- 기사 제목·URL을 인용할 때는 정확히 포함해 주세요."""

    user_content = f"""아래는 이번 주 수집된 뉴스 기사 목록입니다. 이 기사들을 바탕으로 **주간 정책 브리핑 인사이트**를 Markdown 리포트로 작성해 주세요.

---
{articles_text}
---
"""

    try:
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_content},
                {"role": "user", "content": user_content},
            ],
            temperature=0.4,
        )
        return (response.choices[0].message.content or "").strip()
    except Exception as e:
        return f"# 오류\n\n인사이트 생성 중 오류가 발생했습니다.\n\n```\n{e}\n```"


def markdown_to_html(markdown_text: str) -> str:
    """Markdown 문자열을 뉴스레터용 HTML로 변환합니다. (본문만, 수신거부 링크는 발송 시 삽입)"""
    if not HAS_MARKDOWN:
        return f"<pre>{markdown_text}</pre>"
    return markdown.markdown(
        markdown_text,
        extensions=["extra", "nl2br", "sane_lists"],
    )


def wrap_newsletter_html(body_html: str) -> str:
    """
    뉴스레터 본문 HTML을 이메일 래퍼로 감쌉니다.
    Resend 발송 시 {{{RESEND_UNSUBSCRIBE_URL}}}가 수신거부 링크로 치환됩니다.
    """
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>주간 정책 브리핑</title>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 640px; margin: 0 auto; padding: 24px; }}
    h1 {{ font-size: 1.5rem; border-bottom: 2px solid #0ea5e9; padding-bottom: 8px; }}
    h2 {{ font-size: 1.25rem; margin-top: 24px; }}
    a {{ color: #0ea5e9; }}
    ul, ol {{ padding-left: 1.5rem; }}
    .footer {{ margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 0.875rem; color: #6b7280; }}
  </style>
</head>
<body>
{body_html}
<div class="footer">
  <p>아그와헬스(Agua Health) · 의약·의료기기 시장진입 및 급여·청구 전문</p>
  <p>수신 거부: <a href="{{{{{{RESEND_UNSUBSCRIBE_URL}}}}}}">여기를 클릭하면 뉴스레터 수신을 중단합니다</a></p>
</div>
</body>
</html>"""


def main() -> None:
    articles = load_scraped_news()
    if not articles:
        print("scraped_news.json이 비어 있거나 없습니다. media_scraper.py를 먼저 실행해 주세요.")
        return

    print(f"수집 기사 {len(articles)}건을 바탕으로 주간 정책 브리핑 인사이트를 생성합니다...\n")
    markdown = generate_newsletter(articles)

    print(markdown)

    # 파일로 저장 (Markdown + HTML)
    today = datetime.now().strftime("%Y%m%d")
    md_path = os.path.join(OUTPUT_DIR, f"weekly_briefing_{today}.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(markdown)
    print(f"\n---\n저장 완료: {md_path}")

    if HAS_MARKDOWN:
        body_html = markdown_to_html(markdown)
        full_html = wrap_newsletter_html(body_html)
        html_path = os.path.join(OUTPUT_DIR, f"weekly_briefing_{today}.html")
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(full_html)
        print(f"HTML 저장 완료: {html_path}")


if __name__ == "__main__":
    main()
