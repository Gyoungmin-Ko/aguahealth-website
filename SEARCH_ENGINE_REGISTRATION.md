# 검색엔진 등록 가이드

**프로젝트**: Agua Health  
**도메인**: https://agua-health.com  
**작성일**: 2026-01-27  
**대상**: Google Search Console, 네이버 서치어드바이저

---

## 📋 목차

1. [Google Search Console 등록](#1-google-search-console-등록)
2. [네이버 서치어드바이저 등록](#2-네이버-서치어드바이저-등록)
3. [Sitemap 제출](#3-sitemap-제출)
4. [색인 요청 및 확인](#4-색인-요청-및-확인)
5. [모니터링 및 최적화](#5-모니터링-및-최적화)

---

## 1. Google Search Console 등록

### 1.1 Google Search Console 접속

1. **https://search.google.com/search-console** 접속
2. Google 계정으로 로그인 (회사 계정 권장)

### 1.2 속성 추가

1. 왼쪽 상단 **속성 검색** 드롭다운 클릭
2. **+ 속성 추가** 선택
3. 속성 유형 선택:
   - **도메인**: `agua-health.com` (권장 - 모든 하위 도메인 및 프로토콜 포함)
   - **URL 접두어**: `https://agua-health.com` (특정 URL만 추적)

**권장**: **도메인** 방식 선택 (www, https, http 모두 포함)

### 1.3 소유권 확인

#### 방법 1: DNS TXT 레코드 (권장 - 도메인 방식 필수)

1. Google이 제공하는 TXT 레코드 복사
   ```
   예시: google-site-verification=ABC123XYZ...
   ```

2. **Cloudflare DNS 설정**:
   - Cloudflare 대시보드 → **DNS** → **Records**
   - **Add record** 클릭
   - Type: **TXT**
   - Name: **@** (또는 루트 도메인)
   - Content: Google이 제공한 verification 코드 전체
   - TTL: **Auto**
   - Proxy status: DNS only (회색 구름)
   - **Save** 클릭

3. Google Search Console로 돌아가서 **확인** 버튼 클릭

4. 전파 대기 (최대 10분)

#### 방법 2: HTML 파일 업로드 (URL 접두어 방식)

1. Google이 제공하는 HTML 파일 다운로드
   ```
   예시: googlef9a8b7c6d5e4f3a2.html
   ```

2. 파일을 `/home/user/webapp/public/` 에 복사
   ```bash
   cp ~/Downloads/googleXXXXXX.html /home/user/webapp/public/
   ```

3. 빌드 및 배포
   ```bash
   cd /home/user/webapp
   npm run build
   npm run deploy:prod
   ```

4. 확인
   ```bash
   curl https://agua-health.com/googleXXXXXX.html
   ```

5. Google Search Console에서 **확인** 클릭

#### 방법 3: HTML 태그 (간단하지만 권장하지 않음)

1. Google이 제공하는 meta 태그 복사
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

2. 모든 HTML 페이지 `<head>` 섹션에 추가 (index.html 등)

3. 배포 후 확인

---

### 1.4 Sitemap 제출

1. Google Search Console 대시보드 접속
2. 왼쪽 메뉴 **Sitemaps** 클릭
3. **새 사이트맵 추가** 입력란에 입력:
   ```
   https://agua-health.com/sitemap.xml
   ```
4. **제출** 클릭

**현재 Sitemap URL 10개**:
- https://agua-health.com/
- https://agua-health.com/about.html
- https://agua-health.com/ai-solutions.html
- https://agua-health.com/services/market-entry.html
- https://agua-health.com/services/economics.html
- https://agua-health.com/services/regulatory.html
- https://agua-health.com/services/claims.html
- https://agua-health.com/insights.html
- https://agua-health.com/contact.html
- https://agua-health.com/case-studies.html

### 1.5 색인 요청

1. 왼쪽 메뉴 **URL 검사** 클릭
2. 주요 페이지 URL 입력 (예: https://agua-health.com/)
3. **색인 생성 요청** 클릭
4. 모든 주요 페이지에 대해 반복

**우선 순위 페이지**:
- 홈페이지 (/)
- 회사소개 (/about.html)
- AI 솔루션 (/ai-solutions.html)
- 시장진입전략 (/services/market-entry.html)
- 경제성평가 (/services/economics.html)

---

## 2. 네이버 서치어드바이저 등록

### 2.1 네이버 서치어드바이저 접속

1. **https://searchadvisor.naver.com** 접속
2. 네이버 계정으로 로그인

### 2.2 사이트 등록

1. 상단 **웹마스터 도구** 메뉴 클릭
2. **사이트 등록** 버튼 클릭
3. URL 입력:
   ```
   https://agua-health.com
   ```
4. **등록** 클릭

### 2.3 소유권 확인

#### 방법 1: HTML 파일 업로드 (권장)

1. 네이버가 제공하는 HTML 파일 다운로드
   ```
   예시: naverXXXXXX.html
   ```

2. 파일을 `/home/user/webapp/public/` 에 복사
   ```bash
   cp ~/Downloads/naverXXXXXX.html /home/user/webapp/public/
   ```

3. 빌드 및 배포
   ```bash
   cd /home/user/webapp
   npm run build
   npm run deploy:prod
   ```

4. 확인
   ```bash
   curl https://agua-health.com/naverXXXXXX.html
   ```

5. 네이버 서치어드바이저에서 **확인** 클릭

#### 방법 2: HTML 메타태그

1. 네이버가 제공하는 meta 태그 복사
   ```html
   <meta name="naver-site-verification" content="ABC123XYZ..." />
   ```

2. `public/index.html` 등 주요 페이지 `<head>` 섹션에 추가

3. 배포 후 **확인** 클릭

### 2.4 사이트 정보 입력

1. **웹마스터 도구** → 등록된 사이트 클릭
2. **사이트 정보** 탭에서 정보 입력:
   - **사이트 이름**: 아그와헬스 (Agua Health)
   - **사이트 설명**: 혁신 의약품과 의료기기의 한국 시장 진입 전문 컨설팅
   - **대표 키워드**: 의약품 시장진입, 경제성평가, 건강보험 등재, 약가산정
   - **업종**: 전문 서비스업 > 컨설팅

### 2.5 Sitemap 제출

1. 왼쪽 메뉴 **요청** → **사이트맵 제출** 클릭
2. Sitemap URL 입력:
   ```
   https://agua-health.com/sitemap.xml
   ```
3. **확인** 클릭

### 2.6 RSS 제출 (선택사항)

현재 RSS 피드가 없으므로 생략 가능

### 2.7 수집 요청

1. 왼쪽 메뉴 **요청** → **수집 요청** 클릭
2. 주요 페이지 URL 입력하여 개별 수집 요청
3. 하루 최대 10개까지 가능

**우선 수집 요청 페이지**:
- https://agua-health.com/
- https://agua-health.com/about.html
- https://agua-health.com/ai-solutions.html
- https://agua-health.com/services/market-entry.html
- https://agua-health.com/services/economics.html

---

## 3. Sitemap 제출

### 3.1 현재 Sitemap 상태

**URL**: https://agua-health.com/sitemap.xml

**포함된 페이지** (10개):

| URL | 우선순위 | 변경빈도 | 최종수정일 |
|-----|----------|----------|------------|
| / | 1.0 | weekly | 2026-01-26 |
| /about.html | 0.8 | monthly | 2026-01-26 |
| /ai-solutions.html | 0.9 | weekly | 2026-01-26 |
| /services/market-entry.html | 0.7 | monthly | 2026-01-26 |
| /services/economics.html | 0.7 | monthly | 2026-01-26 |
| /services/regulatory.html | 0.7 | monthly | 2026-01-26 |
| /services/claims.html | 0.7 | monthly | 2026-01-26 |
| /insights.html | 0.8 | weekly | 2026-01-26 |
| /contact.html | 0.8 | monthly | 2026-01-26 |
| /case-studies.html | 0.8 | monthly | 2026-01-26 |

### 3.2 Sitemap 제출 확인

#### Google Search Console
- **Sitemaps** 메뉴에서 상태 확인
- "성공" 표시 확인
- 발견된 URL 개수 확인 (10개여야 함)

#### 네이버 서치어드바이저
- **요청** → **사이트맵 제출** → 상태 확인
- "수집 완료" 표시 대기

### 3.3 Sitemap 업데이트 알림

콘텐츠 추가/수정 시 Sitemap 업데이트 필요:

1. `public/sitemap.xml` 수정
2. `<lastmod>` 날짜 업데이트
3. 새 URL 추가
4. 배포
5. Google/네이버에 자동 재수집 요청 (또는 수동 Ping)

**자동 Ping 방법** (선택사항):
```bash
# Google
curl "https://www.google.com/ping?sitemap=https://agua-health.com/sitemap.xml"

# Bing (네이버는 자동 수집)
curl "https://www.bing.com/ping?sitemap=https://agua-health.com/sitemap.xml"
```

---

## 4. 색인 요청 및 확인

### 4.1 Google 색인 확인

1. **직접 검색**:
   ```
   site:agua-health.com
   ```

2. **URL 검사 도구**:
   - Google Search Console → **URL 검사**
   - URL 입력 → 엔터
   - "URL이 Google에 등록되어 있음" 확인

3. **색인 생성 요청**:
   - "색인 생성 요청" 버튼 클릭
   - 1-2분 대기
   - "색인 생성 요청됨" 확인

### 4.2 네이버 색인 확인

1. **직접 검색**:
   ```
   site:agua-health.com
   ```

2. **수집 현황 확인**:
   - 네이버 서치어드바이저 → **통계** → **수집 현황**
   - 수집된 페이지 수 확인

3. **개별 페이지 수집 요청**:
   - **요청** → **수집 요청**
   - URL 입력 후 제출
   - 하루 최대 10개

### 4.3 색인 소요 시간

| 검색엔진 | 소요 시간 | 비고 |
|----------|-----------|------|
| Google | 몇 시간 ~ 며칠 | 신규 사이트는 1-2주 소요 가능 |
| 네이버 | 며칠 ~ 1주일 | 수집 요청 시 빠름 |

---

## 5. 모니터링 및 최적화

### 5.1 Google Search Console 모니터링

#### 주요 확인 지표:

1. **실적 (Performance)**:
   - 총 클릭수
   - 총 노출수
   - 평균 CTR (클릭률)
   - 평균 게재순위

2. **적용 범위 (Coverage)**:
   - 유효한 페이지 수
   - 오류 페이지
   - 경고 페이지

3. **개선사항**:
   - **Core Web Vitals**: 페이지 경험 점수
   - **모바일 사용성**: 모바일 친화성
   - **보안 문제**: HTTPS, 악성코드 등

4. **링크**:
   - 외부 링크 수
   - 내부 링크 구조

#### 주간 확인 사항:
- [ ] 색인 페이지 수 (목표: 10개)
- [ ] 평균 게재순위 변화
- [ ] 오류/경고 페이지 해결
- [ ] Core Web Vitals 점수

### 5.2 네이버 서치어드바이저 모니터링

#### 주요 확인 지표:

1. **통계** → **검색 통계**:
   - 유입 검색어
   - 클릭수
   - 노출수

2. **통계** → **수집 현황**:
   - 수집된 페이지 수
   - 수집 오류

3. **최적화** → **사이트 간단 체크**:
   - SEO 점수
   - 개선 권장사항

#### 주간 확인 사항:
- [ ] 수집 페이지 수 (목표: 10개)
- [ ] 유입 검색어 Top 10
- [ ] SEO 최적화 점수
- [ ] robots.txt 차단 여부

### 5.3 검색 순위 모니터링

#### 목표 키워드:

| 키워드 | 우선순위 | 목표 순위 |
|--------|----------|-----------|
| 의약품 시장진입 | 높음 | Top 10 |
| 건강보험 등재 | 높음 | Top 10 |
| 경제성평가 | 높음 | Top 10 |
| 약가산정 | 높음 | Top 10 |
| 의료기기 인허가 | 중간 | Top 20 |
| 요양급여비용청구 | 중간 | Top 20 |
| 아그와헬스 | 높음 | Top 3 |
| Agua Health | 높음 | Top 3 |

#### 무료 순위 체크 도구:
- **Google**: 직접 검색 (시크릿 모드)
- **네이버**: 직접 검색 (로그아웃 상태)
- **Ubersuggest**: https://neilpatel.com/ubersuggest/ (무료 3회/일)
- **SerpWatcher** (Mangools): 유료 추천

### 5.4 SEO 개선 체크리스트

#### 완료 항목 ✅:
- [x] Canonical 태그 (11개 페이지)
- [x] Meta Description 50-160자 (10개 페이지)
- [x] Open Graph & Twitter Card (11개 페이지)
- [x] JSON-LD 구조화 데이터 (9종)
- [x] robots.txt (Googlebot, Yeti 허용)
- [x] Sitemap.xml (10개 URL)
- [x] Image Alt 태그 (22개 이미지)
- [x] 모바일 반응형 (Tailwind)
- [x] HTTPS (Cloudflare SSL)

#### 향후 개선 항목 📋:
- [ ] OG 이미지 생성 (1200x630, /static/og-image.png)
- [ ] Image 파일명 최적화 (한글 → 영문)
- [ ] Image WebP 변환 (성능 개선)
- [ ] Lazy Loading 적용
- [ ] 내부 링크 구조 강화
- [ ] FAQ 페이지 추가 (실제 FAQ 섹션)
- [ ] 블로그/인사이트 콘텐츠 확대
- [ ] Backlink 확보 전략
- [ ] 소셜 미디어 연동

---

## 6. 빠른 시작 가이드

### 🚀 오늘 당장 할 일 (30분):

1. **Google Search Console 등록**:
   - DNS TXT 레코드 추가 (Cloudflare)
   - Sitemap 제출
   - URL 색인 요청 (홈, 회사소개, AI솔루션, 서비스 2개)

2. **네이버 서치어드바이저 등록**:
   - HTML 파일 업로드 (또는 meta 태그)
   - Sitemap 제출
   - 수집 요청 5개

### 📊 1주일 후 확인 (10분):

1. Google Search Console:
   - 색인 페이지 수 확인
   - 오류 페이지 수정

2. 네이버 서치어드바이저:
   - 수집 페이지 수 확인
   - SEO 점수 확인

### 🎯 1개월 후 최적화 (1시간):

1. 검색 유입 키워드 분석
2. 게재순위 낮은 페이지 개선
3. 콘텐츠 추가 (Insights, Case Studies)
4. Backlink 전략 수립

---

## 7. 문제 해결 (Troubleshooting)

### 7.1 소유권 확인 실패

**증상**: DNS TXT 레코드 추가했는데 확인 실패

**해결**:
```bash
# DNS 전파 확인
nslookup -type=TXT agua-health.com

# 또는 온라인 도구
https://dnschecker.org
```

- Cloudflare에서 Proxy 상태를 **DNS only**로 변경
- 10-30분 대기 후 재시도

### 7.2 Sitemap 제출 실패

**증상**: "Sitemap을 가져올 수 없습니다"

**해결**:
```bash
# Sitemap 접근 확인
curl https://agua-health.com/sitemap.xml

# robots.txt 확인
curl https://agua-health.com/robots.txt
```

- robots.txt에 `Sitemap: https://agua-health.com/sitemap.xml` 있는지 확인
- XML 형식 오류 검증: https://www.xml-sitemaps.com/validate-xml-sitemap.html

### 7.3 색인이 안됨

**증상**: 1-2주 지나도 `site:agua-health.com` 검색 시 0건

**원인**:
1. robots.txt에서 차단됨
2. Canonical 태그 오류
3. 사이트 품질 이슈

**해결**:
```bash
# robots.txt 확인
curl https://agua-health.com/robots.txt

# Google 크롤러 테스트
# Search Console → URL 검사 → "실시간 테스트"
```

- `Disallow: /` 없는지 확인
- Canonical 태그가 올바른 URL인지 확인
- Google Search Console에서 "색인 생성 요청" 재시도

### 7.4 네이버 수집 안됨

**증상**: 네이버 수집 페이지 0개

**해결**:
1. robots.txt에 `User-agent: Yeti` 허용 확인
2. 사이트맵 재제출
3. 수집 요청 10개 모두 사용
4. 1-2주 대기 (네이버는 수집이 느림)

---

## 8. 연락처 및 참고자료

### Google Search Console
- **대시보드**: https://search.google.com/search-console
- **헬프센터**: https://support.google.com/webmasters
- **커뮤니티**: https://support.google.com/webmasters/community

### 네이버 서치어드바이저
- **대시보드**: https://searchadvisor.naver.com
- **가이드**: https://searchadvisor.naver.com/guide
- **고객센터**: https://help.naver.com

### SEO 도구
- **Google PageSpeed Insights**: https://pagespeed.web.dev
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org
- **Screaming Frog** (무료 500 URL): https://www.screamingfrogseotool.com

---

## 📝 완료 체크리스트

### Google Search Console
- [ ] 속성 추가 (agua-health.com)
- [ ] 소유권 확인 (DNS TXT 또는 HTML 파일)
- [ ] Sitemap 제출 (sitemap.xml)
- [ ] 주요 페이지 색인 요청 (5개 이상)
- [ ] 실적 대시보드 확인

### 네이버 서치어드바이저
- [ ] 사이트 등록
- [ ] 소유권 확인 (HTML 파일 또는 meta 태그)
- [ ] Sitemap 제출
- [ ] 수집 요청 (5개 이상)
- [ ] 사이트 정보 입력

### 모니터링
- [ ] 주간 색인 페이지 수 확인
- [ ] 주간 검색 유입 키워드 분석
- [ ] 월간 게재순위 추적
- [ ] 분기별 SEO 개선 계획

---

**작성자**: Claude Code Agent  
**최종 수정**: 2026-01-27  
**버전**: 1.0
