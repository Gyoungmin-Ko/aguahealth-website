"""
아그와헬스 미디어 모니터링 - 히트뉴스(HIT News) 정책/제도 섹션 스크래퍼

히트뉴스 '정책/제도' 섹션에서 키워드(약가, 급여, RSA, 제네릭)가 포함된 기사를 수집하고
scraped_news.json에 리스트 형태로 저장합니다. 기존 파일이 있으면 병합(업데이트)합니다.
"""

import asyncio
import json
import os
from datetime import datetime
from playwright.async_api import async_playwright

# 스크립트 위치 기준 경로
_script_dir = os.path.dirname(os.path.abspath(__file__))
SCRAPED_NEWS_PATH = os.path.join(_script_dir, "scraped_news.json")

# 히트뉴스 정책/제도 섹션 URL (sc_section_code=S1N1)
HIT_NEWS_POLICY_URL = "https://www.hitnews.co.kr/news/articleList.html?sc_section_code=S1N1"
MAX_ARTICLES = 5
SOURCE_NAME = "HitNews"

# 수집 대상 키워드 (하나라도 제목에 포함된 기사만 수집)
KEYWORDS = ["약가", "급여", "RSA", "제네릭"]


def _matches_keywords(title: str) -> bool:
    """제목에 키워드가 하나라도 포함되어 있으면 True"""
    return any(kw in title for kw in KEYWORDS)


async def scrape_hit_news_policy() -> list[dict]:
    """
    히트뉴스 정책/제도 섹션에서 키워드가 포함된 최신 기사를 수집합니다.
    각 기사에 source, date 필드를 포함합니다.

    Returns:
        [{"title", "url", "date", "source"}, ...] 형태의 리스트 (최대 MAX_ARTICLES)
    """
    articles = []
    scraped_date = datetime.now().strftime("%Y-%m-%d")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()

        try:
            await page.goto(HIT_NEWS_POLICY_URL, wait_until="networkidle", timeout=15000)
            await page.wait_for_load_state("domcontentloaded")

            selector = 'a[href*="articleView.html"]'
            await page.wait_for_selector(selector, timeout=10000)

            links = await page.query_selector_all(selector)
            seen_urls = set()

            for elem in links:
                href = await elem.get_attribute("href")
                if not href or "articleView.html" not in href:
                    continue

                base = "https://www.hitnews.co.kr"
                url = href if href.startswith("http") else (base + href if href.startswith("/") else base + "/news/" + href)

                if url in seen_urls:
                    continue
                seen_urls.add(url)

                title = (await elem.text_content() or "").strip()
                if not title or len(title) < 2:
                    continue

                # 키워드 필터: 약가, 급여, RSA, 제네릭 중 하나라도 포함된 기사만 수집
                if not _matches_keywords(title):
                    continue

                if len(articles) >= MAX_ARTICLES:
                    break

                articles.append({
                    "title": title,
                    "url": url,
                    "date": scraped_date,
                    "source": SOURCE_NAME,
                })

        finally:
            await browser.close()

    return articles[:MAX_ARTICLES]


def load_existing_news() -> list[dict]:
    """기존 scraped_news.json이 있으면 로드, 없으면 빈 리스트."""
    if not os.path.exists(SCRAPED_NEWS_PATH):
        return []
    try:
        with open(SCRAPED_NEWS_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, list) else []
    except (json.JSONDecodeError, IOError):
        return []


def merge_and_save(existing: list[dict], new_articles: list[dict]) -> list[dict]:
    """
    기존 리스트와 새 기사를 병합합니다. URL 기준 중복은 새 데이터로 갱신하고,
    날짜 기준 최신이 앞에 오도록 정렬한 뒤 저장합니다.
    """
    by_url = {e["url"]: e for e in existing}
    for a in new_articles:
        by_url[a["url"]] = a
    merged = list(by_url.values())
    merged.sort(key=lambda x: x.get("date", "") or "", reverse=True)

    with open(SCRAPED_NEWS_PATH, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    return merged


def print_articles(articles: list[dict]) -> None:
    """수집한 기사 목록을 콘솔에 출력합니다."""
    if not articles:
        print("키워드에 해당하는 수집된 기사가 없습니다.")
        return

    print(f"\n[{SOURCE_NAME} 정책/제도] 키워드 필터 통과 기사 {len(articles)}건\n")
    print("-" * 60)
    for i, art in enumerate(articles, 1):
        print(f"{i}. {art['title']}")
        print(f"   {art['url']}")
        print(f"   날짜: {art.get('date', '-')} | 출처: {art.get('source', SOURCE_NAME)}")
        print()
    print("-" * 60)


async def main() -> None:
    print("히트뉴스 정책/제도 섹션 스크래핑 중... (키워드: 약가, 급여, RSA, 제네릭)")
    new_articles = await scrape_hit_news_policy()

    print_articles(new_articles)

    existing = load_existing_news()
    merged = merge_and_save(existing, new_articles)
    print(f"\nscraped_news.json 저장 완료. 총 {len(merged)}건 (이번 수집: {len(new_articles)}건)")


if __name__ == "__main__":
    asyncio.run(main())
