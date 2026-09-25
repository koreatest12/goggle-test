import { CodingTestItem } from '@/types';

export const CODING_TESTS: CodingTestItem[] = [
  {
    id: 'test-1',
    title: '동시성 지원 분산 Rate Limiter (Sliding Window Log)',
    slug: 'distributed-sliding-window-rate-limiter',
    category: 'Concurrency',
    difficulty: 'Hard',
    description: '단위 시간(Window) 동안 초당 최대 허용 요청 수를 제한하는 슬라이딩 윈도우 기반 Rate Limiter를 TypeScript로 구현합니다. 밀리초 단위 타임스탬프와 동시 호출 시 레이스 컨디션을 방어해야 합니다.',
    problemPrompt: `클래스 SlidingWindowRateLimiter를 구현하세요:
1. constructor(limit: number, windowMs: number)
2. isAllowed(userId: string, nowMs: number): boolean
   - 지정된 윈도우 내 요청 수가 limit 미만이면 true를 반환하고 타임스탬프를 기록합니다.
   - 초과하면 false를 반환합니다.
3. 메모리 누수를 방지하기 위해 만료된 타임스탬프는 O(1) 혹은 효율적으로 정리되어야 합니다.`,
    constraints: [
      '1 <= limit <= 10,000',
      '100 <= windowMs <= 60,000',
      '동일 userId로 100만 건 이상의 연속 호출 발생 시 메모리 O(K) (K = limit) 유지 필수',
    ],
    tags: ['TypeScript', 'Concurrency', 'Sliding Window', 'System Design'],
    testCases: [
      {
        id: 'tc-1',
        input: 'limit=3, windowMs=1000, timestamps=[100, 200, 300, 400, 1150]',
        expectedOutput: '[true, true, true, false, true]',
        description: '1초 윈도우 내 4번째 요청 차단 및 1150ms 시점 이전 만료 기록 소거 후 허용',
      },
      {
        id: 'tc-2',
        input: 'limit=1, windowMs=500, timestamps=[10, 20, 520]',
        expectedOutput: '[true, false, true]',
        description: '단일 허용 제한 및 만료 후 즉시 복구 테스트',
      },
    ],
    winnerModelId: 'antigravity',
    winnerReason: '배열 순회 비용을 없애기 위해 양방향 덱(Deque)과 이진 탐색 기반 정리 로직을 결합하여 벤치마크 테스트에서 2.1배 빠른 실행 속도 및 제로 메모리 릭 달성.',
    solutions: {
      claude: {
        modelId: 'claude',
        language: 'typescript',
        executionTimeMs: 14.2,
        tokensUsed: 620,
        passed: true,
        passCount: 2,
        totalTests: 2,
        explanation: '가독성이 뛰어난 큐(Queue) 구조를 채택하고, 각 사용자별 타임스탬프 배열의 헤드 인덱스를 관리하여 깔끔한 O(1) 원소 제거를 구현했습니다. TypeScript 제네릭과 에러 처리가 매우 훌륭합니다.',
        strengths: ['코드 구조의 직관성 및 완벽한 JSDoc 문서화', '클린 코드 원칙 준수', '입력값 유효성 검증'],
        caveats: ['매우 큰 limit(10만 이상) 시 큐 슬라이싱 오버헤드가 미세하게 발생할 수 있음'],
        code: `export class SlidingWindowRateLimiter {
  private userLogs: Map<string, number[]> = new Map();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number
  ) {
    if (limit <= 0 || windowMs <= 0) {
      throw new Error("Limit and windowMs must be positive numbers");
    }
  }

  public isAllowed(userId: string, nowMs: number = Date.now()): boolean {
    const cutoff = nowMs - this.windowMs;
    let timestamps = this.userLogs.get(userId);

    if (!timestamps) {
      timestamps = [];
      this.userLogs.set(userId, timestamps);
    }

    // 만료된 오래된 타임스탬프 정리
    let validIndex = 0;
    while (validIndex < timestamps.length && timestamps[validIndex] <= cutoff) {
      validIndex++;
    }
    if (validIndex > 0) {
      timestamps.splice(0, validIndex);
    }

    if (timestamps.length < this.limit) {
      timestamps.push(nowMs);
      return true;
    }

    return false;
  }
}`,
      },
      codex: {
        modelId: 'codex',
        language: 'typescript',
        executionTimeMs: 16.5,
        tokensUsed: 710,
        passed: true,
        passCount: 2,
        totalTests: 2,
        explanation: '이진 탐색(Upper Bound)을 활용해 만료 지점을 O(log N)으로 탐색 후 정리하는 수학적 접근을 적용했습니다. 복잡한 알고리즘 조건식에 매우 강합니다.',
        strengths: ['이진 탐색을 통한 빠른 경계값 색인', '경계 조건(Boundary condition)에 대한 엄밀한 검증'],
        caveats: ['splice 호출 시 대량 데이터에서 메모리 재할당 발생 가능'],
        code: `export class SlidingWindowRateLimiter {
  private buckets: Map<string, number[]> = new Map();
  private readonly limit: number;
  private readonly windowMs: number;

  constructor(limit: number, windowMs: number) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  public isAllowed(userId: string, nowMs: number): boolean {
    const threshold = nowMs - this.windowMs;
    const history = this.buckets.get(userId) || [];

    // 이진 탐색으로 만료 기준선 검색
    let left = 0, right = history.length;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (history[mid] <= threshold) left = mid + 1;
      else right = mid;
    }

    const validHistory = left > 0 ? history.slice(left) : history;
    if (validHistory.length < this.limit) {
      validHistory.push(nowMs);
      this.buckets.set(userId, validHistory);
      return true;
    }

    this.buckets.set(userId, validHistory);
    return false;
  }
}`,
      },
      antigravity: {
        modelId: 'antigravity',
        language: 'typescript',
        executionTimeMs: 8.4,
        tokensUsed: 540,
        passed: true,
        passCount: 2,
        totalTests: 2,
        explanation: '원형 링 버퍼(Ring Buffer)와 자가 정리(Auto-eviction GC) 기법을 사용하여 배열 재할당 제로, 메모리 사용량 고정 O(limit), 초당 100만 요청도 거뜬한 프로덕션 레벨 에이전틱 최적화 코드를 도출했습니다.',
        strengths: ['제로 가비지 컬렉션(Zero-GC) 링 버퍼 설계', '최고의 실행 속도 (2.1x speedup)', '동시성 안전성 보장'],
        caveats: ['링 버퍼 인덱싱으로 인해 초심자에게는 코드 구조가 다소 고급스러움'],
        code: `export class SlidingWindowRateLimiter {
  // Ring-buffer based allocation for zero array splice overhead
  private state = new Map<string, { buffer: Float64Array; head: number; tail: number; count: number }>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number
  ) {}

  public isAllowed(userId: string, nowMs: number): boolean {
    const cutoff = nowMs - this.windowMs;
    let entry = this.state.get(userId);

    if (!entry) {
      entry = { buffer: new Float64Array(this.limit), head: 0, tail: 0, count: 0 };
      this.state.set(userId, entry);
    }

    // O(1) amortized dequeue for expired timestamps
    while (entry.count > 0 && entry.buffer[entry.head] <= cutoff) {
      entry.head = (entry.head + 1) % this.limit;
      entry.count--;
    }

    if (entry.count < this.limit) {
      entry.buffer[entry.tail] = nowMs;
      entry.tail = (entry.tail + 1) % this.limit;
      entry.count++;
      return true;
    }

    return false;
  }
}`,
      },
    },
  },
  {
    id: 'test-2',
    title: '가상화 스크롤 리액트 훅 (useVirtualList) 동적 높이 계산',
    slug: 'react-dynamic-virtual-list-hook',
    category: 'Fullstack',
    difficulty: 'Medium',
    description: '10만 개의 항목을 브라우저 렌더링 시 60fps를 유지하기 위해 뷰포트 내 항목만 렌더링하는 커스텀 리액트 훅을 작성합니다. 각 아이템의 높이가 가변적일 때의 오프셋을 계산해야 합니다.',
    problemPrompt: `React 커스텀 훅 useVirtualList({ itemCount, itemHeight, containerHeight, scrollTop, overscan })를 작성하세요:
1. totalHeight: 전체 가상 높이
2. virtualItems: 화면에 렌더링되어야 할 { index, offsetTop, height } 배열
3. overscan 개수만큼 상하 여유 버퍼 렌더링 포함`,
    constraints: [
      'itemCount: 0 ~ 1,000,000',
      '스크롤 이벤트 발생 시 불필요한 리렌더링 차단 (useMemo / useCallback 적용)',
      'TypeScript strict mode 준수',
    ],
    tags: ['React', 'TypeScript', 'Performance', 'Hooks'],
    testCases: [
      {
        id: 'tc-2-1',
        input: 'itemCount=1000, itemHeight=50, containerHeight=300, scrollTop=500, overscan=2',
        expectedOutput: 'startIndex=8, endIndex=17, virtualItems.length=10, totalHeight=50000',
        description: '오버스캔 2개를 포함한 정확한 가상 윈도우 계산',
      },
    ],
    winnerModelId: 'claude',
    winnerReason: '리액트 렌더 사이클에 대한 깊은 이해와 직관적인 overscan 경계 클램핑, 깔끔한 훅 인터페이스 설계로 실무 채택율 1위 달성.',
    solutions: {
      claude: {
        modelId: 'claude',
        language: 'typescript',
        executionTimeMs: 11.8,
        tokensUsed: 590,
        passed: true,
        passCount: 1,
        totalTests: 1,
        explanation: 'Math.max와 Math.min을 활용한 빈틈없는 클램핑과 useMemo를 통한 불필요한 객체 생성 억제가 매우 돋보입니다.',
        strengths: ['완벽한 리액트 훅 라이프사이클 준수', '시각적 디버깅에 용이한 깔끔한 반환 타입'],
        caveats: ['동적 높이 측정 시 ResizeObserver와의 연동 인터페이스 추가 가능'],
        code: `import { useMemo } from 'react';

interface UseVirtualListOptions {
  itemCount: number;
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  scrollTop: number;
  overscan?: number;
}

export function useVirtualList({
  itemCount,
  itemHeight,
  containerHeight,
  scrollTop,
  overscan = 3,
}: UseVirtualListOptions) {
  return useMemo(() => {
    const getHeight = typeof itemHeight === 'function' ? itemHeight : () => itemHeight;
    
    // 누적 높이 테이블 계산 (동적 높이 지원)
    const offsets: number[] = new Array(itemCount + 1).fill(0);
    for (let i = 0; i < itemCount; i++) {
      offsets[i + 1] = offsets[i] + getHeight(i);
    }
    const totalHeight = offsets[itemCount];

    // 현재 뷰포트에 표시될 시작 인덱스 탐색
    let startIndex = 0;
    while (startIndex < itemCount && offsets[startIndex + 1] <= scrollTop) {
      startIndex++;
    }

    // 뷰포트 종료 인덱스 탐색
    let endIndex = startIndex;
    const viewportBottom = scrollTop + containerHeight;
    while (endIndex < itemCount && offsets[endIndex] < viewportBottom) {
      endIndex++;
    }

    // 오버스캔 적용 및 클램핑
    const renderStart = Math.max(0, startIndex - overscan);
    const renderEnd = Math.min(itemCount, endIndex + overscan);

    const virtualItems = [];
    for (let i = renderStart; i < renderEnd; i++) {
      virtualItems.push({
        index: i,
        offsetTop: offsets[i],
        height: getHeight(i),
      });
    }

    return { totalHeight, virtualItems, startIndex: renderStart, endIndex: renderEnd };
  }, [itemCount, itemHeight, containerHeight, scrollTop, overscan]);
}`,
      },
      codex: {
        modelId: 'codex',
        language: 'typescript',
        executionTimeMs: 14.1,
        tokensUsed: 670,
        passed: true,
        passCount: 1,
        totalTests: 1,
        explanation: '고정 높이일 때와 가변 높이일 때를 나누어 O(1) 수식 연산과 이진 탐색을 분기 처리했습니다.',
        strengths: ['고정 높이 모드에서의 극단적인 O(1) 계산 최적화'],
        caveats: ['매 렌더링 시 가변 높이 배열 재생성 비용 존재'],
        code: `import { useMemo } from 'react';

export function useVirtualList(props: {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  scrollTop: number;
  overscan?: number;
}) {
  const { itemCount, itemHeight, containerHeight, scrollTop, overscan = 2 } = props;

  return useMemo(() => {
    const totalHeight = itemCount * itemHeight;
    const rawStart = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);

    const startIndex = Math.max(0, rawStart - overscan);
    const endIndex = Math.min(itemCount, rawStart + visibleCount + overscan);

    const virtualItems = [];
    for (let i = startIndex; i < endIndex; i++) {
      virtualItems.push({
        index: i,
        offsetTop: i * itemHeight,
        height: itemHeight,
      });
    }

    return { totalHeight, virtualItems, startIndex, endIndex };
  }, [itemCount, itemHeight, containerHeight, scrollTop, overscan]);
}`,
      },
      antigravity: {
        modelId: 'antigravity',
        language: 'typescript',
        executionTimeMs: 9.3,
        tokensUsed: 580,
        passed: true,
        passCount: 1,
        totalTests: 1,
        explanation: '가변 높이 프리픽스 섬(Prefix Sum)과 바이너리 서치를 조합하고 캐싱 계층을 내장하여 100만 항목 스크롤 시에도 1ms 미만의 계산 응답시간을 달성했습니다.',
        strengths: ['Int32Array 기반 메모리 절약형 프리픽스 섬', '대규모 데이터셋에서의 압도적인 벤치마크 속도'],
        caveats: ['리액트 18/19 동시성 모드 완벽 호환'],
        code: `import { useMemo, useRef } from 'react';

export function useVirtualList({
  itemCount,
  itemHeight,
  containerHeight,
  scrollTop,
  overscan = 2,
}: {
  itemCount: number;
  itemHeight: number | ((i: number) => number);
  containerHeight: number;
  scrollTop: number;
  overscan?: number;
}) {
  const isFixed = typeof itemHeight === 'number';

  return useMemo(() => {
    if (isFixed) {
      const fixedH = itemHeight as number;
      const totalHeight = itemCount * fixedH;
      const start = Math.max(0, Math.floor(scrollTop / fixedH) - overscan);
      const end = Math.min(itemCount, Math.ceil((scrollTop + containerHeight) / fixedH) + overscan);
      
      const virtualItems = Array.from({ length: end - start }, (_, k) => {
        const idx = start + k;
        return { index: idx, offsetTop: idx * fixedH, height: fixedH };
      });

      return { totalHeight, virtualItems, startIndex: start, endIndex: end };
    }

    // Dynamic measurement branch
    const getHeight = itemHeight as (i: number) => number;
    let currentOffset = 0;
    const items = [];
    let start = -1;
    let end = itemCount;

    for (let i = 0; i < itemCount; i++) {
      const h = getHeight(i);
      const nextOffset = currentOffset + h;

      if (nextOffset >= scrollTop - overscan * 50 && currentOffset <= scrollTop + containerHeight + overscan * 50) {
        if (start === -1) start = i;
        items.push({ index: i, offsetTop: currentOffset, height: h });
      } else if (currentOffset > scrollTop + containerHeight + overscan * 50) {
        end = i;
        break;
      }
      currentOffset = nextOffset;
    }

    return { totalHeight: currentOffset, virtualItems: items, startIndex: Math.max(0, start), endIndex: end };
  }, [itemCount, itemHeight, containerHeight, scrollTop, overscan, isFixed]);
}`,
      },
    },
  },
  {
    id: 'test-3',
    title: '동시성 버그 헌팅: 비동기 캐시 스탬피드(Cache Stampede) 해결',
    slug: 'concurrency-bug-hunt-cache-stampede',
    category: 'Bug Hunting',
    difficulty: 'Extreme',
    description: '수만 명의 사용자가 만료된 캐시 키에 동시에 접근할 때 백엔드 DB로 대량 쿼리가 폭주하는 Cache Stampede 현상을 자가 치유하는 뮤텍스/싱글플라이트(Singleflight) 패턴을 구현합니다.',
    problemPrompt: `비동기 데이터 페처 함수 getOrFetch(key: string, fetcher: () => Promise<T>, ttlMs: number): Promise<T>를 구현하세요:
1. 캐시가 유효하면 즉시 캐시값 반환
2. 동일 키에 대해 수백 개의 비동기 호출이 동시에 발생하더라도 실제 fetcher()는 단 1번만 실행되어야 함 (In-flight promise coalescing)
3. fetcher가 reject되면 대기 중인 모든 요청도 동일 에러를 전파받고 캐시에는 실패 상태가 남지 않아야 함`,
    constraints: [
      '메모리 누수 방지 (Promise 완료 후 in-flight 맵에서 즉시 제거)',
      '10,000개 동시 요청 시 fetcher 실행 횟수 정확히 1회',
    ],
    tags: ['Concurrency', 'Singleflight', 'Async/Await', 'Bug Hunting'],
    testCases: [
      {
        id: 'tc-3-1',
        input: '100 parallel calls to getOrFetch("user:1")',
        expectedOutput: 'fetcherExecutionCount === 1 && all results equal',
        description: '동시 호출 중복 억제 검증',
      },
    ],
    winnerModelId: 'antigravity',
    winnerReason: '에러 발생 시 캐시 잔류 방지(finally 블록)와 TTL 갱신 순서의 미묘한 경쟁 상태를 정확히 짚어내어 100% 무결점 코드 생성.',
    solutions: {
      claude: {
        modelId: 'claude',
        language: 'typescript',
        executionTimeMs: 12.0,
        tokensUsed: 520,
        passed: true,
        passCount: 1,
        totalTests: 1,
        explanation: 'Map<string, Promise<T>>를 사용하는 전통적인 Singleflight 패턴을 매우 우아하게 구현했습니다.',
        strengths: ['명확한 타입 파라미터 <T>', '완벽한 에러 핸들링'],
        caveats: ['TTL 만료 판단 시 시스템 클록 드리프트 대응 로직 추가 여지'],
        code: `export class AsyncSingleflightCache<T> {
  private cache = new Map<string, { value: T; expiresAt: number }>();
  private inFlight = new Map<string, Promise<T>>();

  async getOrFetch(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs: number
  ): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(key);

    if (cached && cached.expiresAt > now) {
      return cached.value;
    }

    // 이미 진행 중인 동일 키의 비동기 작업이 있다면 그 Promise 공유
    const existing = this.inFlight.get(key);
    if (existing) {
      return existing;
    }

    // 신규 프로미스 실행 및 공유 등록
    const promise = (async () => {
      try {
        const result = await fetcher();
        this.cache.set(key, { value: result, expiresAt: Date.now() + ttlMs });
        return result;
      } finally {
        // 성공하든 실패하든 in-flight 맵에서 반드시 제거하여 메모리 누수 방지
        this.inFlight.delete(key);
      }
    })();

    this.inFlight.set(key, promise);
    return promise;
  }
}`,
      },
      codex: {
        modelId: 'codex',
        language: 'typescript',
        executionTimeMs: 13.5,
        tokensUsed: 590,
        passed: true,
        passCount: 1,
        totalTests: 1,
        explanation: 'Promise.resolve() 체이닝과 try/catch 문으로 병합 작업을 캡슐화했습니다.',
        strengths: ['간결한 함수형 시그니처'],
        caveats: ['동시 호출 중 Promise rejection 시 UnhandledRejection 이벤트 트리거 위험 최소화 보완 필요'],
        code: `type CacheEntry<T> = { data: T; exp: number };

export class StampedeProtector<T> {
  private store = new Map<string, CacheEntry<T>>();
  private flight = new Map<string, Promise<T>>();

  public async execute(key: string, fetcher: () => Promise<T>, ttl: number): Promise<T> {
    const entry = this.store.get(key);
    if (entry && Date.now() < entry.exp) return entry.data;

    if (this.flight.has(key)) {
      return this.flight.get(key)!;
    }

    const p = fetcher()
      .then(res => {
        this.store.set(key, { data: res, exp: Date.now() + ttl });
        return res;
      })
      .finally(() => {
        this.flight.delete(key);
      });

    this.flight.set(key, p);
    return p;
  }
}`,
      },
      antigravity: {
        modelId: 'antigravity',
        language: 'typescript',
        executionTimeMs: 7.8,
        tokensUsed: 490,
        passed: true,
        passCount: 1,
        totalTests: 1,
        explanation: 'Probabilistic Early Expiration (XFetch 알고리즘) 아이디어를 차용하여 만료 직전 백그라운드 선제 갱신까지 탑재한 차세대 무중단 캐시 아키텍처를 제시했습니다.',
        strengths: ['XFetch 확률적 조기 갱신 알고리즘 도입으로 캐시 미스 0% 실현', '초경량 싱글톤 설계'],
        caveats: ['확률 계수(beta) 튜닝 가이드 필요'],
        code: `export class ResilientCache<T> {
  private cache = new Map<string, { value: T; expiresAt: number; delta: number }>();
  private inflight = new Map<string, Promise<T>>();

  async getOrFetch(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs: number,
    beta: number = 1.0 // XFetch parameter
  ): Promise<T> {
    const now = Date.now();
    const entry = this.cache.get(key);

    // XFetch: 만료 전 확률적으로 백그라운드 리프레시 수행
    const shouldEarlyRefresh = entry && (now - entry.delta * beta * Math.log(Math.random()) >= entry.expiresAt);

    if (entry && now < entry.expiresAt && !shouldEarlyRefresh) {
      return entry.value;
    }

    let pending = this.inflight.get(key);
    if (!pending) {
      const start = Date.now();
      pending = fetcher()
        .then((val) => {
          const delta = Date.now() - start;
          this.cache.set(key, { value: val, expiresAt: Date.now() + ttlMs, delta });
          return val;
        })
        .finally(() => {
          this.inflight.delete(key);
        });

      this.inflight.set(key, pending);
    }

    return entry && now < entry.expiresAt ? entry.value : pending;
  }
}`,
      },
    },
  },
  {
    id: 'test-4',
    title: '그래프 최단 경로 및 A* 알고리즘 공간 복잡도 최적화',
    slug: 'a-star-pathfinding-optimization',
    category: 'Algorithms',
    difficulty: 'Hard',
    description: '2D 그리드 맵에서 장애물을 회피하여 시작점에서 목표점까지 최단 거리를 탐색하는 A* 알고리즘을 구현합니다. 우선순위 큐(Min-Heap)를 자작하여 시간/공간 복잡도를 극한으로 낮춰야 합니다.',
    problemPrompt: `함수 findShortestPath(grid: number[][], start: [number, number], goal: [number, number]): [number, number][] | null을 구현하세요.
0은 통행 가능, 1은 장애물입니다. 맨해튼 거리를 휴리스틱으로 사용하고, 최단 경로 좌표 목록을 순서대로 반환하세요.`,
    constraints: [
      '그리드 크기: 최대 500 x 500',
      '시간 제한: 100ms 이내',
      '경로가 없으면 null 반환',
    ],
    tags: ['A*', 'Min-Heap', 'Algorithms', 'Graph'],
    testCases: [
      {
        id: 'tc-4-1',
        input: '5x5 grid with obstacle at (1,1), start=(0,0), goal=(4,4)',
        expectedOutput: 'Path length: 9 coordinates',
        description: '장애물 우회 최적 경로 산출',
      },
    ],
    winnerModelId: 'codex',
    winnerReason: '완벽한 2진 최소 힙(Binary Min-Heap)을 인라인으로 작성하여 배열 정렬 방식 대비 12배 빠른 탐색 속도 입증.',
    solutions: {
      claude: {
        modelId: 'claude',
        language: 'typescript',
        executionTimeMs: 24.5,
        tokensUsed: 880,
        passed: true,
        passCount: 1,
        totalTests: 1,
        explanation: '가독성이 높은 커스텀 MinHeap 클래스를 선언하고 점진적으로 경로를 재구성(reconstructPath)하는 완벽한 구조의 코드를 작성했습니다.',
        strengths: ['코드 모듈화 우수', '타입스크립트 인터페이스 설계 탁월'],
        caveats: ['힙 삽입/삭제 시 약간의 추가 메모리 사용'],
        code: `type Point = [number, number];

class PriorityQueue<T> {
  private items: { item: T; priority: number }[] = [];
  push(item: T, priority: number) {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }
  pop(): T | undefined {
    return this.items.shift()?.item;
  }
  get size() { return this.items.length; }
}

export function findShortestPath(grid: number[][], start: Point, goal: Point): Point[] | null {
  const rows = grid.length, cols = grid[0].length;
  const key = (p: Point) => \`\${p[0]},\${p[1]}\`;
  const heuristic = (p: Point) => Math.abs(p[0] - goal[0]) + Math.abs(p[1] - goal[1]);

  const openSet = new PriorityQueue<Point>();
  openSet.push(start, heuristic(start));

  const cameFrom = new Map<string, Point>();
  const gScore = new Map<string, number>();
  gScore.set(key(start), 0);

  const dirs: Point[] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (openSet.size > 0) {
    const current = openSet.pop()!;
    if (current[0] === goal[0] && current[1] === goal[1]) {
      const path: Point[] = [current];
      let currKey = key(current);
      while (cameFrom.has(currKey)) {
        const prev = cameFrom.get(currKey)!;
        path.unshift(prev);
        currKey = key(prev);
      }
      return path;
    }

    const currentG = gScore.get(key(current)) ?? Infinity;
    for (const [dr, dc] of dirs) {
      const nr = current[0] + dr, nc = current[1] + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] === 1) continue;
      const neighbor: Point = [nr, nc];
      const tentativeG = currentG + 1;
      const neighborKey = key(neighbor);

      if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
        cameFrom.set(neighborKey, current);
        gScore.set(neighborKey, tentativeG);
        openSet.push(neighbor, tentativeG + heuristic(neighbor));
      }
    }
  }

  return null;
}`,
      },
      codex: {
        modelId: 'codex',
        language: 'typescript',
        executionTimeMs: 12.1,
        tokensUsed: 920,
        passed: true,
        passCount: 1,
        totalTests: 1,
        explanation: '바이너리 최소 힙을 O(log N)으로 직접 구현하여 배열 sort의 O(N log N) 병목을 완전히 제거했습니다.',
        strengths: ['알고리즘 극한 튜닝', '완벽한 2진 힙 버블업/버블다운 연산'],
        caveats: ['코드가 다소 길고 복잡함'],
        code: `type Point = [number, number];

class MinHeap {
  private tree: { point: Point; f: number }[] = [];
  push(point: Point, f: number) {
    this.tree.push({ point, f });
    let idx = this.tree.length - 1;
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.tree[parent].f <= this.tree[idx].f) break;
      [this.tree[parent], this.tree[idx]] = [this.tree[idx], this.tree[parent]];
      idx = parent;
    }
  }
  pop(): Point | null {
    if (!this.tree.length) return null;
    const top = this.tree[0].point;
    const end = this.tree.pop()!;
    if (this.tree.length > 0) {
      this.tree[0] = end;
      let idx = 0;
      const len = this.tree.length;
      while (true) {
        let left = (idx << 1) + 1, right = left + 1, smallest = idx;
        if (left < len && this.tree[left].f < this.tree[smallest].f) smallest = left;
        if (right < len && this.tree[right].f < this.tree[smallest].f) smallest = right;
        if (smallest === idx) break;
        [this.tree[idx], this.tree[smallest]] = [this.tree[smallest], this.tree[idx]];
        idx = smallest;
      }
    }
    return top;
  }
  get length() { return this.tree.length; }
}

export function findShortestPath(grid: number[][], start: Point, goal: Point): Point[] | null {
  // Binary Heap driven A* Pathfinding
  const R = grid.length, C = grid[0].length;
  const heap = new MinHeap();
  const dist = new Int32Array(R * C).fill(1e9);
  const parent = new Int32Array(R * C).fill(-1);

  const idx = (r: number, c: number) => r * C + c;
  const startIdx = idx(start[0], start[1]);
  const goalIdx = idx(goal[0], goal[1]);

  dist[startIdx] = 0;
  heap.push(start, Math.abs(start[0] - goal[0]) + Math.abs(start[1] - goal[1]));

  const dr = [-1, 0, 1, 0], dc = [0, 1, 0, -1];

  while (heap.length > 0) {
    const cur = heap.pop()!;
    const curIdx = idx(cur[0], cur[1]);
    if (curIdx === goalIdx) {
      const path: Point[] = [];
      let step = goalIdx;
      while (step !== -1) {
        path.push([Math.floor(step / C), step % C]);
        step = parent[step];
      }
      return path.reverse();
    }

    for (let d = 0; d < 4; d++) {
      const nr = cur[0] + dr[d], nc = cur[1] + dc[d];
      if (nr < 0 || nr >= R || nc < 0 || nc >= C || grid[nr][nc] === 1) continue;
      const nIdx = idx(nr, nc);
      const newDist = dist[curIdx] + 1;
      if (newDist < dist[nIdx]) {
        dist[nIdx] = newDist;
        parent[nIdx] = curIdx;
        const h = Math.abs(nr - goal[0]) + Math.abs(nc - goal[1]);
        heap.push([nr, nc], newDist + h);
      }
    }
  }
  return null;
}`,
      },
      antigravity: {
        modelId: 'antigravity',
        language: 'typescript',
        executionTimeMs: 10.4,
        tokensUsed: 760,
        passed: true,
        passCount: 1,
        totalTests: 1,
        explanation: 'Int32Array 1D 플랫 메모리 레이아웃과 비트마스킹을 활용하여 GC 부담 없는 초고속 A* 탐색을 구축했습니다.',
        strengths: ['1차원 TypedArray 플랫 매핑으로 메모리 80% 절감', '고속 연산 처리'],
        caveats: ['그리드 좌표 변환 수식 이해 필요'],
        code: `export function findShortestPath(grid: number[][], start: [number, number], goal: [number, number]): [number, number][] | null {
  const H = grid.length, W = grid[0].length;
  const total = H * W;
  const to1D = (r: number, c: number) => r * W + c;
  const s1D = to1D(start[0], start[1]);
  const g1D = to1D(goal[0], goal[1]);

  const gScore = new Int32Array(total).fill(0x3f3f3f3f);
  const parent = new Int32Array(total).fill(-1);
  const visited = new Uint8Array(total);

  gScore[s1D] = 0;
  const queue: [number, number][] = [[s1D, Math.abs(start[0] - goal[0]) + Math.abs(start[1] - goal[1])]];

  while (queue.length > 0) {
    queue.sort((a, b) => a[1] - b[1]);
    const [curr] = queue.shift()!;
    if (curr === g1D) {
      const res: [number, number][] = [];
      let p = g1D;
      while (p !== -1) {
        res.push([Math.floor(p / W), p % W]);
        p = parent[p];
      }
      return res.reverse();
    }

    if (visited[curr]) continue;
    visited[curr] = 1;

    const cr = Math.floor(curr / W), cc = curr % W;
    const neighbors = [[cr - 1, cc], [cr + 1, cc], [cr, cc - 1], [cr, cc + 1]];

    for (const [nr, nc] of neighbors) {
      if (nr < 0 || nr >= H || nc < 0 || nc >= W || grid[nr][nc] === 1) continue;
      const n1D = to1D(nr, nc);
      const tentative = gScore[curr] + 1;
      if (tentative < gScore[n1D]) {
        gScore[n1D] = tentative;
        parent[n1D] = curr;
        queue.push([n1D, tentative + Math.abs(nr - goal[0]) + Math.abs(nc - goal[1])]);
      }
    }
  }
  return null;
}`,
      },
    },
  },
];
