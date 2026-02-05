# 배포 후 테스트 가이드

배포된 사이트에서 **퇴장방지의약품 AI 모듈**을 확인하는 방법입니다.

---

## 1. 브라우저에서 UI 테스트

### 접속 URL
- **프로덕션**: `https://aguahealth-website.pages.dev` (또는 커스텀 도메인 `https://agua-health.com`)
- Cloudflare 대시보드 → Workers & Pages → **aguahealth-website** → 배포된 URL 확인

### 테스트 순서

1. **AI 솔루션 목록**
   - 사이트 접속 → 상단 메뉴에서 **AI 솔루션** 클릭  
   - 또는 직접 이동: `https://aguahealth-website.pages.dev/ai-solutions`

2. **퇴장방지의약품 모듈 진입**
   - 목록에서 **「퇴장방지의약품 지정 및 원가보전」** 카드 클릭  
   - 또는 직접 이동: `https://aguahealth-website.pages.dev/ai-solutions/drug-withdrawal-prevention`

3. **입력 후 실행**
   - **제품명(가칭)**: 예) ABC-101
   - **적응증**: 예) 퇴장방지 대상 적응증
   - **원가자료**: (선택) PDF/Excel/CSV 파일 업로드
   - **지정 희망 시점**: 예) 2026년 상반기
   - **추가 메모**: (선택)
   - **「AI 실행」** 버튼 클릭

4. **결과 확인**
   - 오른쪽 **출력** 영역에 다음이 표시되면 성공:
     - **요약**: 제품명·적응증·지정 시점·원가자료 제출 여부 반영
     - **신뢰도/리스크**: 참고용 초안 안내
     - **원가산정 방식·근거 요약**, **추가 제출 자료·리스크 포인트** 섹션
     - **핵심 가정값 및 산출 근거** 표

5. **에러 시**
   - 빨간색 에러 메시지가 나오면 네트워크/API 오류 가능성
   - 브라우저 개발자 도구(F12) → **Network** 탭에서 `ai-module/drug-withdrawal-prevention` 요청 상태 코드 확인

---

## 2. API 직접 호출 (curl)

폼 없이 API만 검증할 때:

```bash
# JSON으로 입력 전송
curl -X POST "https://aguahealth-website.pages.dev/api/ai-module/drug-withdrawal-prevention" \
  -H "Content-Type: application/json" \
  -d '{"productName":"테스트제품","indication":"테스트 적응증","targetTiming":"2026년"}' 
```

- **200 OK** + JSON(`summary`, `risks`, `sections`, `assumptions` 포함) → 정상
- **400** → 모듈 ID 오류 또는 지원하지 않는 모듈
- **500** → 서버 오류 (Cloudflare 대시보드에서 Functions 로그 확인)

---

## 3. 로컬에서 풀스택 테스트 (배포 전 검증)

배포 전에 API까지 함께 확인하려면:

```bash
# 1. 빌드
npm run build

# 2. Cloudflare Pages 로컬 서버 (Functions 포함)
npx wrangler pages dev dist
```

- 브라우저에서 `http://localhost:8788` (또는 터미널에 표시된 URL) 접속
- 위와 동일하게 `/ai-solutions/drug-withdrawal-prevention`에서 입력 후 **AI 실행** 테스트

---

## 4. 체크리스트

| 항목 | 확인 |
|------|------|
| AI 솔루션 목록에 퇴장방지의약품 카드 노출 | ☐ |
| 모듈 상세 페이지에서 입력 폼 5개 + 파일 업로드 노출 | ☐ |
| 「AI 실행」 버튼 활성(클릭 가능) | ☐ |
| 실행 후 요약·리스크·섹션·가정값 표 표시 | ☐ |
| 초기화 버튼으로 입력/결과 초기화 | ☐ |

위 항목이 모두 통과하면 배포 테스트 완료로 보시면 됩니다.
