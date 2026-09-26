# Goggle-Test (AI Coding Test & Benchmark Lab)

> **Claude · Codex · Antigravity** 에 있는 모든 코딩 테스트를 비교, 분석, 검증할 수 있는 모던 AI 코딩 테스트 블로그 & 인터랙티브 벤치마크 플랫폼입니다.

---

## 🚀 프로젝트 개요 (Overview)

2026년 기준 최고 성능을 자랑하는 3대 프론티어 AI 코딩 엔진의 실전 코딩 테스트 풀이 역량을 다각도로 측정하고 공유합니다.

- **Anthropic Claude 3.7 Sonnet** (Thinking Extended)
- **OpenAI Codex / o3-mini** (Reasoning High)
- **Google Antigravity Agent** (Gemini 2.5 Pro Agentic Engine)

단순한 텍스트 답변 비교를 넘어, **실제 시간/공간 복잡도(Big-O)**, **실행 속도(ms)**, **토큰 효율성**, **동시성 안전성 및 메모리 누수 방지 기법**을 웹상에서 직접 실행해보고 검증할 수 있습니다.

---

## 🛡️ 과금 방지 무과금(Zero-Cost) 안전 정책 & 아키텍처

본 프로젝트는 **사용자 비용 $0.00(완전 무료)** 로 운영되도록 아키텍처 레벨에서 과금 요소를 원천 차단했습니다:

1. **외부 유료 API 연동 차단 ($0.00)**
   - Anthropic, OpenAI, Google Cloud 등의 유료 결제 계정 연동이나 신용카드 등록이 전혀 필요하지 않습니다.
   - 모든 AI 모델의 코드 비교, 벤치마크 점수, 알고리즘 분석은 사전 검증된 고정밀 데이터셋과 브라우저 클라이언트 사이드 가상 시뮬레이터로 구동됩니다.
2. **평생 무료 GitHub Pages 정적 배포 지원**
   - Next.js의 `output: 'export'` 정적 사이트 생성(SSG) 기능과 `.github/workflows/deploy.yml` GitHub Actions를 통해, Vercel 유료 플랜이나 유료 서버 호스팅 없이 **GitHub Pages에서 100% 무료로 배포/호스팅**됩니다.
3. **API Key 불필요 & 개인정보 보호**
   - 어떠한 API Key도 브라우저나 로컬 스토리지에 요구하거나 외부로 전송하지 않습니다.

---

## 🆕 v1.2 프로덕션 서버 업그레이드

- **Node.js 24 네이티브 고성능 정적 웹서버 탑재 (`scripts/server.mjs`)**: 외부 의존성 없는 가볍고 빠른 서버 스크립트 제공
- **Next.js 정적 내보내기(`output: export`) `npm start` 충돌 해결**: `next start` 미지원 문제를 해결하고 즉시 `npm start` 또는 `npm run serve`로 배포 가능
- **실시간 헬스체크 엔드포인트 지원**: `/api/health` 및 `/healthz`를 통한 서버 가동 상태, 업타임, Node.js 런타임 정보 JSON 제공
- **압축 및 보안 최적화**: 텍스트 리소스 Gzip/Deflate 자동 압축, 불변 정적 에셋 장기 캐싱(`immutable`), 보안 헤더(No-Sniff, Same-Origin) 적용
- **Turbopack / outputFileTracing 루트 설정**: `next.config.mjs`에 `outputFileTracingRoot` 및 `turbopack.root`를 명시하여 빌드 경고 제거
- **런타임 의존성 최신화**: `@types/node` 26.6.3 업그레이드

---

## 🆕 v1.1 업그레이드

- Node.js 24 / npm 11 런타임 기준 고정
- GitHub Actions Ubuntu 24.04 고정 및 TypeScript 사전 검증 추가
- 코딩 테스트 동적 카테고리, 난이도 필터, 검색, 정렬, 결과 수 표시
- 모바일 내비게이션 추가
- Agent Engineering Lab에 Trace Console, 진행률, 실행시간, Tool Call 메트릭, 실행 취소 기능 추가
- 커스텀 샌드박스가 프롬프트 내용과 선택 언어를 분석해 결과를 동적으로 생성
- 테스트 실행기가 모든 Test Case를 순차 검증하고 실제 passCount/totalTests를 표시
- SEO/Open Graph 메타데이터 개선

---

## ✨ 핵심 기능 (Features)

1. **2026 AI Coding Benchmark Scoreboard**
   - 테스트 통과율(Pass Rate), 평균 추론 속도(s), 토큰 효율 지수, 코드 품질/가독성 지수 실시간 랭킹
   - 각 모델별 강점 및 실무 채택 추천 영역 시각화

2. **실전 코딩 테스트 문제 & 모델별 솔루션 비교**
   - **동시성 제어 분산 Rate Limiter** (Sliding Window Log & 링 버퍼 최적화)
   - **동적 높이 가상화 스크롤 리액트 훅 (`useVirtualList`)**
   - **동시성 버그 헌팅: 비동기 캐시 스탬피드(Cache Stampede) 해결** (Singleflight & XFetch)
   - **그래프 A\* 최단 경로 알고리즘 공간 복잡도 최적화** (Min-Heap & TypedArray 플랫 매핑)

3. **인터랙티브 테스트 케이스 시뮬레이터 (Test Runner)**
   - 브라우저 상에서 각 모델의 코드를 가상 컴파일 및 테스트 케이스 검증 실행
   - 실시간 실행 콘솔 로그 및 100% 통과 축하 애니메이션 제공

4. **심층 기술 분석 리포트 (Technical Research)**
   - *2026 AI 코딩 테스트 심층 벤치마크 리포트*
   - *Antigravity 멀티에이전트 시스템: 자가 치유(Self-Healing) 코딩 메커니즘*
   - *프롬프트 엔지니어링 2026: Reasoning 모델 최적 코드 추출 5대 원칙*

5. **AI Agent Engineering Lab**
   - Tool Agent, Router Agent, Multi-Agent Handoff, Incident Ops Agent 패턴을 브라우저에서 단계별 시뮬레이션
   - 외부 API 호출 없이 에이전트 오케스트레이션 흐름과 운영 자동화 구조를 학습
   - 인프라 장애 대응 시나리오를 통해 알람 → 지표 → 로그 → 원인 후보 → Runbook 흐름 확인

6. **인터랙티브 커스텀 프롬프트 샌드박스**
   - 사용자가 직접 코딩 테스트 프롬프트를 입력하고 3대 모델의 예상 접근법과 아키텍처를 비교 분석

---

## 🛠 기술 스택 (Tech Stack)

- **Runtime**: Node.js 24 / npm 11
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Modern Color Scheme (Dark Mode first)
- **Icons & Animation**: Lucide Icons, Canvas-Confetti

---

## 💻 로컬 실행 방법 (Getting Started)

### 1. 저장소 클론 및 패키지 설치

```bash
git clone https://github.com/koreatest12/goggle-test.git
cd goggle-test
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속하여 확인할 수 있습니다.

### 3. 프로덕션 빌드

```bash
npm run build
npm run start
```

---

## 📂 디렉터리 구조 (Project Structure)

```text
goggle-test/
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind v4 & 글로벌 다크 테마 스타일
│   │   ├── layout.tsx          # 루트 레이아웃 & 메타데이터
│   │   └── page.tsx            # 메인 대시보드 (Hero, 리더보드, 테스트 뷰어, 아티클)
│   ├── components/
│   │   ├── Navbar.tsx          # 내비게이션 바
│   │   ├── Footer.tsx          # 푸터
│   │   ├── Leaderboard.tsx     # 3대 모델 성능 벤치마크 리더보드
│   │   ├── TestCard.tsx        # 코딩 테스트 문제 카드
│   │   ├── TestDetailModal.tsx # 인터랙티브 코드 뷰어 & 테스트 실행 모달
│   │   ├── ArticleCard.tsx     # 기술 블로그 아티클 카드
│   │   ├── ArticleModal.tsx    # 블로그 전문 리딩 모달
│   │   ├── AgentEngineeringLab.tsx # Tool/Router/Handoff/Incident Agent 시뮬레이터
│   │   ├── CustomTestSandbox.tsx # 실시간 프롬프트 샌드박스
│   │   └── GithubIcon.tsx      # SVG GitHub 아이콘
│   ├── data/
│   │   ├── models.ts           # Claude, Codex, Antigravity 모델 스펙 데이터
│   │   ├── codingTests.ts      # 실전 테스트 문제 및 3사 모델 풀이 코드
│   │   └── articles.ts         # 심층 벤치마크 리포트 아티클
│   └── types/
│       └── index.ts            # TypeScript 인터페이스 정의
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── next.config.mjs
```

---

## 📄 라이선스 (License)

본 프로젝트는 [MIT License](LICENSE)에 따라 배포됩니다.
