"""
아그와헬스 미디어 모니터링 - 주간 정책 브리핑 뉴스레터 발송

최신 weekly_briefing_*.html(또는 .md)을 읽어 Resend Broadcast API로 구독자에게 발송합니다.
필수 환경 변수: RESEND_API_KEY, RESEND_SEGMENT_ID
선택: NEWSLETTER_FROM_EMAIL, NEWSLETTER_FROM_NAME
"""

import glob
import os
import re
import sys
from datetime import datetime

import requests
from dotenv import load_dotenv

# newsletter_gen에서 HTML 변환 재사용
try:
    from newsletter_gen import markdown_to_html, wrap_newsletter_html
except ImportError:
    markdown_to_html = wrap_newsletter_html = None

_script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=os.path.join(_script_dir, ".env"), override=True)

RESEND_BROADCASTS_URL = "https://api.resend.com/broadcasts"


def get_latest_briefing_path() -> tuple[str | None, str | None]:
    """
    scripts/media-bot 내 최신 weekly_briefing_*.md / *.html 경로 반환.
    Returns:
        (md_path or None, html_path or None) — 있으면 해당 경로, 없으면 None
    """
    pattern_md = os.path.join(_script_dir, "weekly_briefing_*.md")
    pattern_html = os.path.join(_script_dir, "weekly_briefing_*.html")

    def _latest(path_pattern: str) -> str | None:
        paths = glob.glob(path_pattern)
        if not paths:
            return None
        # 파일명에 포함된 날짜(YYYYMMDD) 기준 최신
        def date_from_path(p: str) -> str:
            m = re.search(r"weekly_briefing_(\d{8})", p)
            return m.group(1) if m else ""

        paths.sort(key=date_from_path, reverse=True)
        return paths[0]

    return _latest(pattern_md), _latest(pattern_html)


def load_html_for_send(md_path: str | None, html_path: str | None) -> str | None:
    """
    발송용 HTML 문자열 반환.
    html_path가 있으면 해당 파일 사용, 없으면 md_path를 변환하여 래핑.
    """
    if html_path and os.path.exists(html_path):
        with open(html_path, "r", encoding="utf-8") as f:
            return f.read()
    if md_path and os.path.exists(md_path):
        if not markdown_to_html or not wrap_newsletter_html:
            print("오류: HTML 변환을 위해 newsletter_gen 모듈을 사용할 수 없습니다.")
            return None
        with open(md_path, "r", encoding="utf-8") as f:
            md = f.read()
        body = markdown_to_html(md)
        return wrap_newsletter_html(body)
    return None


def create_and_send_broadcast(
    html_body: str,
    subject: str,
    *,
    api_key: str,
    segment_id: str,
    from_email: str,
    from_name: str = "아그와헬스",
    dry_run: bool = False,
) -> dict | None:
    """
    Resend Broadcast 생성 후 즉시 발송합니다.
    Returns:
        성공 시 Resend 응답 body (create 또는 send), 실패 시 None
    """
    if dry_run:
        print("[DRY RUN] Resend API 호출 없이 종료합니다.")
        return {"dry_run": True}

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    from_value = f"{from_name} <{from_email}>"

    create_payload = {
        "segmentId": segment_id,
        "from": from_value,
        "subject": subject,
        "html": html_body,
    }

    create_res = requests.post(
        RESEND_BROADCASTS_URL,
        headers=headers,
        json=create_payload,
        timeout=30,
    )

    if create_res.status_code not in (200, 201):
        print(f"Broadcast 생성 실패: {create_res.status_code} {create_res.text}")
        return None

    data = create_res.json()
    broadcast_id = data.get("id")
    if not broadcast_id:
        print("Broadcast 생성 응답에 id가 없습니다.", data)
        return None

    send_url = f"{RESEND_BROADCASTS_URL}/{broadcast_id}/send"
    send_res = requests.post(send_url, headers=headers, json={}, timeout=30)

    if send_res.status_code not in (200, 201):
        print(f"Broadcast 발송 실패: {send_res.status_code} {send_res.text}")
        return None

    return send_res.json()


def main() -> None:
    api_key = (os.environ.get("RESEND_API_KEY") or "").strip()
    segment_id = (os.environ.get("RESEND_SEGMENT_ID") or "").strip()
    from_email = (
        os.environ.get("NEWSLETTER_FROM_EMAIL") or os.environ.get("CONTACT_FROM_EMAIL") or "onboarding@resend.dev"
    ).strip()
    from_name = (
        os.environ.get("NEWSLETTER_FROM_NAME") or os.environ.get("CONTACT_FROM_NAME") or "아그와헬스"
    ).strip()
    dry_run = os.environ.get("NEWSLETTER_DRY_RUN", "").lower() in ("1", "true", "yes")

    if not api_key or not segment_id:
        print("환경 변수 RESEND_API_KEY, RESEND_SEGMENT_ID 가 필요합니다. .env 또는 환경에 설정해 주세요.")
        sys.exit(1)

    md_path, html_path = get_latest_briefing_path()
    html_body = load_html_for_send(md_path, html_path)

    if not html_body:
        print("발송할 weekly_briefing 파일이 없습니다. newsletter_gen.py를 먼저 실행해 주세요.")
        sys.exit(1)

    if "{{{RESEND_UNSUBSCRIBE_URL}}}" not in html_body:
        print("경고: HTML 본문에 수신거부 링크 {{{RESEND_UNSUBSCRIBE_URL}}} 가 없을 수 있습니다.")

    date_str = datetime.now().strftime("%Y-%m-%d")
    subject = f"주간 정책 브리핑 – {date_str}"

    result = create_and_send_broadcast(
        html_body,
        subject,
        api_key=api_key,
        segment_id=segment_id,
        from_email=from_email,
        from_name=from_name,
        dry_run=dry_run,
    )

    if result is None:
        sys.exit(1)
    if result.get("dry_run"):
        print("DRY RUN 완료. 실제 발송 없음.")
        return
    print("발송 요청이 완료되었습니다.", result)


if __name__ == "__main__":
    main()
