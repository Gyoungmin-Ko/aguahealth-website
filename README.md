# 아그와헬스 웹사이트

혁신 의약품과 의료기기의 성공적인 한국 시장 진입 파트너

## 🌐 배포 URL

- **샌드박스 개발**: https://3000-igrnq95kr41pe3q7tqa7i-0e616f0a.sandbox.novita.ai
- **프로덕션** (예정): https://aguahealth-website.pages.dev
- **도메인** (예정): https://agua-health.com

## 📁 프로젝트 구조

```
aguahealth-website/
├── public/                 # 소스 파일
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   └── main.js
│   │   └── 로고만.png
│   ├── services/           # 서비스 상세 페이지
│   │   ├── market-entry.html
│   │   ├── economics.html
│   │   ├── regulatory.html
│   │   ├── claims.html
│   │   └── ai-solutions.html
│   ├── index.html          # 홈페이지
│   ├── about.html          # 회사소개
│   ├── contact.html        # 문의하기
│   ├── case-studies.html   # 성공사례
│   └── insights.html       # 인사이트
├── dist/                   # 빌드 출력
├── package.json
├── wrangler.jsonc          # Cloudflare Pages 설정
└── README.md
```

## ✨ 완성된 기능

### 페이지
✅ **index.html** - 홈페이지
- Hero 섹션
- 신뢰 지표 (보건학 박사, 70+ 서비스, AI 예측, 98% 성공률)
- 5개 핵심 서비스 소개
- 4단계 컨설팅 프로세스
- 최신 인사이트 프리뷰
- CTA 섹션
- 푸터

✅ **about.html** - 회사소개
- 고경민 대표 프로필
- 학력 및 경력
- 비전 & 미션

✅ **contact.html** - 문의하기
- 문의 폼
- 연락처 정보
- 오시는 길

✅ **case-studies.html** - 성공사례
- 프로젝트 사례 목록

✅ **insights.html** - 인사이트
- 블로그 포스트

✅ **services/** - 5개 서비스 상세 페이지
- 시장진입전략
- 경제성평가
- 인허가지원
- 요양급여비용청구
- AI솔루션

### 디자인
✅ 완전한 반응형 디자인 (Desktop/Tablet/Mobile)
✅ 네비게이션 (모바일 메뉴 포함)
✅ 애니메이션 효과
✅ SEO 최적화

## 🚀 개발 환경

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 또는 PM2로 시작
pm2 start ecosystem.config.cjs

# 빌드
npm run build
```

### Cloudflare Pages 배포

```bash
# 프로덕션 배포
npm run deploy:prod

# 또는 수동으로
npm run build
npx wrangler pages deploy dist --project-name aguahealth-website
```

## 🎨 디자인 시스템

### 색상
- **Primary**: #0066CC (파란색)
- **Secondary**: #00B8A9 (청록색)
- **Text**: #1A2332
- **Background**: #F8F9FA

### 타이포그래피
- **Font**: Noto Sans KR
- **Heading**: 700 (Bold)
- **Body**: 400 (Regular)

### 반응형 브레이크포인트
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 📞 연락처

- **대표**: 고경민
- **전화**: 010-5435-2687
- **이메일**: gyoungmin.ko@agua-health.com
- **주소**: 경기도 과천시 과천대로7길65 B동126

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript
- **Fonts**: Noto Sans KR (Google Fonts)
- **Deployment**: Cloudflare Pages
- **Version Control**: Git, GitHub
- **Dev Server**: Python SimpleHTTPServer / PM2

## 📋 배포 체크리스트

- [x] 정적 파일 구조 재구성
- [x] 경로 수정 (/static/*)
- [x] 반응형 디자인 적용
- [x] SEO 메타태그 추가
- [ ] Cloudflare Pages 배포
- [ ] 커스텀 도메인 연결 (agua-health.com)
- [ ] Google Analytics 설치
- [ ] 문의 폼 이메일 연동

## 📝 업데이트 로그

### 2026-01-25
- ✅ GitHub 레포지토리 연동
- ✅ 정적 사이트 구조로 재구성
- ✅ 모든 HTML 파일 경로 수정
- ✅ 로컬 개발 서버 설정 (PM2)
- ✅ Cloudflare Pages 배포 준비 완료

---

© 2026 Agua Health (아그와헬스). All rights reserved.
