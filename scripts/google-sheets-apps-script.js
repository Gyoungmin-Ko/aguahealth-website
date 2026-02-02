/**
 * 구글 시트 뉴스레터 구독자 저장 - Apps Script
 *
 * 설정 방법:
 * 1. 구글 시트 생성 (예: "아그와헬스 뉴스레터 구독자")
 * 2. 확장 프로그램 > Apps Script 열기
 * 3. 이 코드 전체 붙여넣기
 * 4. 1행에 헤더 추가: "날짜" | "이메일"
 * 5. 파일 > 프로젝트 속성 > 스크립트 속성에서 추가:
 *    - SECRET: 임의의 긴 문자열 (예: abc123xyz789...)
 * 6. 배포 > 새 배포 > 유형: 웹 앱
 *    - 실행 사용자: 나
 *    - 액세스 권한: 모든 사용자
 * 7. 배포 URL 복사
 * 8. Cloudflare 환경변수에 추가:
 *    - GOOGLE_SHEETS_WEBHOOK_URL: 배포 URL
 *    - GOOGLE_SHEETS_SECRET: 스크립트 속성과 동일한 SECRET
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const { email, secret } = body;

    const propSecret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!propSecret || secret !== propSecret) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([new Date(), email]);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
