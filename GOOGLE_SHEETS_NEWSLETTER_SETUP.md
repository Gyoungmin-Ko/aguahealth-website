# 구글 시트 뉴스레터 구독자 저장 설정

뉴스레터 구독 시 구독자 이메일을 **구글 시트에 자동으로 저장**합니다.

---

## 1. 구글 시트 생성

1. [Google Sheets](https://sheets.google.com) 접속
2. **빈 스프레드시트** 생성
3. 1행에 헤더 입력:
   - A1: `날짜`
   - B1: `이메일`

---

## 2. Apps Script 설정

1. 시트에서 **확장 프로그램** → **Apps Script** 클릭
2. `Code.gs` 내용을 아래 코드로 **전체 교체**:

```javascript
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
```

3. **프로젝트 설정** (왼쪽 메뉴 톱니바퀴 아이콘) → **스크립트 속성**
4. **스크립트 속성 추가** 클릭
   - 속성: `SECRET`
   - 값: 임의의 긴 문자열 (예: `aguahealth_newsletter_2024_secret_xyz123`)

---

## 3. 웹 앱으로 배포

1. **배포** → **새 배포** 클릭
2. 유형: **웹 앱** 선택
3. 설정:
   - **설명**: `뉴스레터 구독 웹훅`
   - **실행 사용자**: 나
   - **액세스 권한**: 모든 사용자
4. **배포** 클릭
5. **웹 앱 URL** 복사 (예: `https://script.google.com/macros/s/xxxxx/exec`)

---

## 4. Cloudflare 환경 변수 설정

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **aguahealth-website**
2. **Settings** → **Functions** → **Variables and Secrets**
3. 변수 추가:
   - `GOOGLE_SHEETS_WEBHOOK_URL`: 위에서 복사한 웹 앱 URL
   - `GOOGLE_SHEETS_SECRET`: 스크립트 속성에 입력한 SECRET과 **동일한 값**

---

## 5. 로컬 테스트 (.dev.vars)

로컬에서 테스트할 경우 `.dev.vars`에 추가:

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/xxxxx/exec
GOOGLE_SHEETS_SECRET=aguahealth_newsletter_2024_secret_xyz123
```

---

## 동작 순서

1. **Resend Contacts** 시도 (Audiences/Segments 등록)
2. 실패 시 **Google Sheets** 웹훅 호출 → 구독자 이메일 시트에 자동 저장
3. 둘 다 실패 시 관리자 이메일로 전송 (백업)

Google Sheets 설정 후에는 구독자가 인사이트 페이지에서 구독하면 시트에 날짜와 이메일이 자동으로 추가됩니다.
