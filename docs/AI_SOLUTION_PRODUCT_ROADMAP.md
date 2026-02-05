# AI 솔루션 제품 개발 로드맵

> 미디어모니터링, 뉴스레터, AI 모듈을 통합한 아그와헬스 제품 생태계 개발 가이드

---

## 0. 확정된 설계 사항

### 인증
- **선택**: Option 2 (Clerk 또는 Auth0)
- 컨설팅 회사 B2B 이미지를 위해 전문적인 회원가입·로그인·역할 관리 체계 적용
- 우선 Clerk으로 시작, 필요 시 Auth0로 확장

### 결제/구독
- **국내 B2B 고객**: 토스페이먼츠 (법인 카드, 세금계산서 등 국내 PG 통합)
- **글로벌/해외 지사 고객**: Stripe (구독·반복 결제 강화)

### 모듈 개발 순서
1. **1순위**: 퇴장방지의약품 지정 및 원가보전 (진행 중인 프로젝트에 맞춰 개발)
2. **2순위**: 예상 보험가격 산정
3. 그 다음: 교과서·의약품집 수재, 학술지 수재 등

### 인프라
- **현재**: Cloudflare (Pages, Functions, R2)
- **전환 옵션**: AWS로 이전 가능 (S3+CloudFront/Amplify, Lambda, S3, RDS 등)
- **하이브리드**: 프론트/CDN Cloudflare 유지, AI·무거운 처리만 AWS Lambda/SageMaker 사용도 가능
- AWS 미팅 시 전면 이전 vs 하이브리드 전략 협의 권장

---

## 1. 현재 상태 정리

### 이미 구현된 것
| 구성요소 | 상태 | 비고 |
|---------|------|------|
| 마케팅 사이트 | ✅ | React + Vite + Cloudflare Pages |
| AI 모듈 목록 페이지 | ✅ | `/ai-solutions` |
| 모듈 상세 페이지 | ⚠️ 와이어프레임 | `/ai-solutions/:moduleId` - 입력 폼·출력 구조만, 실행 버튼 비활성 |
| aiModules.js | ✅ | 입력 필드·출력 정의 이미 설계됨 |
| Contact Us | ✅ | Cloudflare Functions + Resend |
| Newsletter 구독 | ✅ | Google Sheets / Resend |
| 인사이트 블로그 | ✅ | JSON 기반 콘텐츠 |

### 개발 예정
- AI 모듈 실제 실행 (입력 → 처리 → 결과 반환)
- 파일 업로드
- 구독/원타임 서비스 이용 제어
- 미디어모니터링 시스템
- 통합 포털/대시보드

---

## 2. 아키텍처 권장 방향

### Option A: 단일 앱 + 백엔드 API (권장)

```
[agua-health.com]
├── /                    마케팅
├── /ai-solutions        AI 모듈 목록
├── /ai-solutions/:id    모듈 실행 (로그인 필요)
├── /insights            블로그
├── /media-monitoring    미디어모니터링 (향후)
└── /dashboard           구독자 대시보드 (향후)

[Cloudflare]
├── Pages (프론트엔드)
├── Functions (API: /api/contact, /api/newsletter, /api/ai-module/*)
├── R2 (파일 업로드)
├── D1 (구독/사용이력 DB, 선택)
└── Workers (큰 작업·AI 처리 큐, 선택)

[외부]
├── Resend (이메일)
├── OpenAI / Anthropic (LLM, 필요 시)
└── Stripe (결제, 구독 관리)
```

**장점**
- 하나의 도메인·하나의 브랜드 경험
- Cloudflare 생태계만으로 대부분 구현 가능
- 미디어모니터링·뉴스레터를 같은 앱 안의 다른 라우트로 자연스럽게 통합

---

## 3. 단계별 개발 가이드

### Phase 0: 준비 (1–2주)

1. **인증 설계** ✅ 확정
   - **Option 2**: Clerk / Auth0 (회원가입·로그인·역할 관리)

2. **결제/구독 설계** ✅ 확정
   - 국내 B2B: 토스페이먼츠
   - 글로벌: Stripe
   - 구독 플랜(Basic/Standard/Pro)과 모듈별 이용 권한 매핑

3. **모듈 우선순위** ✅ 확정
   - **1순위**: 퇴장방지의약품 (진행 중인 프로젝트에 맞춰 먼저 개발)
   - **2순위**: 예상 보험가격 산정
   - 그 다음: 교과서·의약품집 수재, 학술지 수재 등

---

### Phase 1: 퇴장방지의약품 모듈 End-to-End (2–3주)

**목표**: 퇴장방지의약품 1개 모듈을 입력 → API → 결과까지 완성 (진행 중인 프로젝트에 맞춰 개발)

1. **inputs 정의**
   - `aiModules.js`의 `drug-withdrawal-prevention`에 `inputs` 배열 추가
   - 예: 제품명, 원가자료(파일 업로드), 지정희망시점 등

2. **파일 업로드**
   - Cloudflare R2 (또는 AWS S3 전환 시 대비)
   - `functions/api/upload.js` – presigned URL 또는 direct upload
   - 프론트엔드: 드래그 앤 드롭, 파일 타입·용량 제한

3. **모듈 페이지 활성화**
   - `AIModule.jsx`의 "AI 실행(준비 중)" 버튼 활성화
   - 클릭 시 `POST /api/ai-module/drug-withdrawal-prevention` 호출

4. **Cloudflare Function**
   - `functions/api/ai-module/ai-module.js` (moduleId 파라미터)
   - 입력·파일 검증 → 처리 로직 → JSON 응답

5. **처리 로직**
   - 원가산정 템플릿 + 업로드 파일 분석 (규칙 기반 또는 LLM)

6. **결과 표시**
   - 응답 JSON을 `AIModule.jsx`에서 표시
   - 테이블·요약 카드·PDF 다운로드(선택) UI

---

### Phase 2: 예상 보험가격 산정 + 기타 모듈 (2–3주)

1. **예상 보험가격 산정 모듈**
   - Phase 1과 동일한 패턴으로 구현
   - 규칙 기반 또는 LLM 기반 시나리오 생성

2. **기타 모듈**
   - 교과서·의약품집 수재, 학술지 수재 등 순차 확장

---

### Phase 3: 인증 + 구독 제어 (2–3주)

1. **인증**
   - Clerk 또는 Auth0 도입
   - `/ai-solutions/:id` 접근 시 로그인 필수
   - 미로그인 시: 로그인 유도 또는 “데모/견적 문의”로 연결

2. **구독/사용량**
   - DB(D1 또는 Supabase)에 사용자·구독플랜·모듈별 사용 횟수 저장
   - API에서 호출 전 플랜/쿼터 체크

3. **결제 연동**
   - 토스페이먼츠 (국내) / Stripe (글로벌) Checkout으로 구독 생성
   - Webhook으로 구독 상태 동기화

---

### Phase 4: 미디어모니터링 + 통합 (3–4주)

1. **미디어모니터링**
   - 뉴스/소셜 크롤링·수집 → DB 저장
   - 알림(이메일/뉴스레터) 연동
   - 별도 라우트 `/media-monitoring` 또는 대시보드 내 탭

2. **통합 대시보드**
   - `/dashboard`
   - AI 모듈 실행 이력, 미디어모니터링 요약, 뉴스레터 관리

3. **뉴스레터 통합**
   - 기존 Newsletter를 대시보드에서 구독 관리
   - 미디어모니터링 키워드·알림 설정 연동

---

## 4. 기술 선택 가이드

### 인증
| 도구 | 적합한 경우 |
|------|-------------|
| **Clerk** | 회원가입·로그인·팀 관리 필요, 빠른 도입 |
| **Auth0** | 엔터프라이즈 요구사항, SSO |
| **이메일 + OTP** | 단순 B2B, 개발 부담 최소 |

### AI 처리
| 방식 | 적합한 경우 |
|------|-------------|
| **Cloudflare Workers + OpenAI API** | LLM 기반 분석, 짧은 실행 시간 |
| **Cloudflare Queues + Worker** | 긴 작업, 배치 처리 |
| **별도 Python 서버** | 전용 모델, 복잡한 경제성평가 로직 |

### DB
| 도구 | 적합한 경우 |
|------|-------------|
| **Cloudflare D1** | Cloudflare만 사용, SQL |
| **Supabase** | 실시간·권한·스토리지 함께 사용 |
| **PlanetScale** | MySQL, 서버리스 |

### 파일 스토리지
- **Cloudflare R2**: 이그레스 비용 없음, S3 호환 → 현재 권장
- **AWS S3**: 인프라 AWS 전환 시 사용

---

## 5. 개발 순서 체크리스트

```
[ ] Phase 0 ✅ 일부 확정
    [x] 인증 방식 확정 (Clerk/Auth0)
    [x] 결제/구독 구조 설계 (토스/Stripe)
    [x] 모듈 우선순위 확정 (퇴장방지의약품 → 예상보험가격)
    [ ] 인증·결제 실제 연동

[ ] Phase 1 - 퇴장방지의약품
    [ ] 퇴장방지의약품 inputs 정의
    [ ] R2 설정 + 업로드 API
    [ ] AIModule.jsx "AI 실행" 버튼 활성화
    [ ] POST /api/ai-module/:id 구현
    [ ] 퇴장방지의약품 처리 로직
    [ ] 결과 UI 표시

[ ] Phase 2 - 예상 보험가격 산정 등
    [ ] 예상 보험가격 산정 모듈 구현
    [ ] 기타 모듈 순차 확장

[ ] Phase 3
    [ ] 인증 연동
    [ ] 구독·쿼터 체크
    [ ] Stripe 연동(선택)

[ ] Phase 4
    [ ] 미디어모니터링 기능
    [ ] 통합 대시보드
    [ ] 뉴스레터·미디어 알림 연동
```

---

## 6. 즉시 시작할 수 있는 작업

1. **퇴장방지의약품 모듈 (1순위)**
   - `aiModules.js`의 `drug-withdrawal-prevention`에 `inputs` 배열 추가
   - 예: 제품명, 원가자료(파일), 지정희망시점 등
   - `comingSoon: true` 제거

2. **모듈 페이지 + API 플로우**
   - `AIModule.jsx`에서 "AI 실행" 버튼 활성화
   - `functions/api/ai-module.js` 생성
   - MVP: 입력을 그대로 반환하는 더미 응답으로 플로우 검증

3. **Coming Soon vs 실행 가능 구분**
   - `comingSoon: true`인 모듈: "데모/견적 문의" 유도
   - `inputs` 있는 모듈: 실행 버튼 표시

---

## 7. 통합 시 고려사항

- **단일 인증**: AI 모듈·미디어모니터링·대시보드가 같은 계정 사용
- **공통 API 레이어**: `/api/*` 하나의 패턴으로 확장
- **결제 통합**: 구독 플랜에 따라 모듈·미디어모니터링 접근 제어
- **이메일 통일**: Resend로 Contact, Newsletter, 미디어 알림 모두 처리

이 로드맵대로 단계를 나누어 진행하면, 기존 사이트 구조를 유지하면서 점진적으로 제품을 완성할 수 있습니다.
