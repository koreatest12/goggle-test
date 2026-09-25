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

5. **인터랙티브 커스텀 프롬프트 샌드박스**
   - 사용자가 직접 코딩 테스트 프롬프트를 입력하고 3대 모델의 예상 접근법과 아키텍처를 비교 분석

---

## 🛠 기술 스택 (Tech Stack)

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
