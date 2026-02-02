# Resend API 설정 가이드 (Contact Us + Newsletter)

## 중요: .env vs Cloudflare

`.env` 파일의 `RESEND_API_KEY`는 **로컬 개발**에만 사용됩니다.  
**Cloudflare Pages 프로덕션**에서는 `.env`를 읽지 않으므로, 아래 설정이 필요합니다.

---

## 1. Cloudflare 대시보드에서 API 키 설정

1. [Cloudflare Dashboard](https://dash.cloudflare.com) 로그인
2. **Workers & Pages** → **aguahealth-website** 프로젝트 선택
3. **Settings** → **Functions** → **Variables and Secrets**
4. **Add variable** 클릭
5. 이름: `RESEND_API_KEY`, 값: `.env` 또는 `resend.txt`에 있는 API 키 입력
6. **Encrypt** 선택 후 저장

---

## 2. 로컬 테스트용 (.dev.vars)

```bash
# .dev.vars 파일 생성 (프로젝트 루트)
echo "RESEND_API_KEY=re_여기에_실제_키" > .dev.vars

# 빌드 후 로컬 실행
npm run build
wrangler pages dev dist --compatibility-flag=nodejs_compat
```

브라우저에서 `http://localhost:8788` 접속 후 Contact Us 폼 테스트

---

## 3. Newsletter 구독

뉴스레터 구독은 다음 순서로 동작합니다:
1. **Resend Contacts API** 시도 → Audiences/Segments에 등록
2. **실패 시** Resend Emails API로 관리자(gyoungmin.ko@agua-health.com)에게 구독자 이메일 전송

Contacts API가 플랜 제한 등으로 실패해도, 이메일 백업으로 구독 정보가 전달됩니다.

---

## 4. Resend 도메인 인증

- 기본 발신: `onboarding@resend.dev` (테스트용)
- 본인 도메인(`@agua-health.com`) 사용 시: Resend 대시보드에서 도메인 인증 후  
  `CONTACT_FROM_EMAIL`, `CONTACT_FROM_NAME` 환경 변수로 설정 가능
