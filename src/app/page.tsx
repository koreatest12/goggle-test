'use client';

import React, { useMemo, useState } from 'react';
import { Leaderboard } from '@/components/Leaderboard';
import { TestCard } from '@/components/TestCard';
import { TestDetailModal } from '@/components/TestDetailModal';
import { ArticleCard } from '@/components/ArticleCard';
import { ArticleModal } from '@/components/ArticleModal';
import { CustomTestSandbox } from '@/components/CustomTestSandbox';
import { AgentEngineeringLab } from '@/components/AgentEngineeringLab';
import { CODING_TESTS } from '@/data/codingTests';
import { BLOG_ARTICLES } from '@/data/articles';
import { CodingTestItem, BlogArticle } from '@/types';
import {
  Sparkles,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Search,
  CheckCircle2,
  TrendingUp,
  Zap,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'difficulty' | 'speed'>('default');
  const [activeTest, setActiveTest] = useState<CodingTestItem | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(CODING_TESTS.map((test) => test.category)))],
    []
  );
  const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Extreme'];
  const difficultyRank: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3, Extreme: 4 };

  const filteredTests = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = CODING_TESTS.filter((test) => {
      const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === 'All' || test.difficulty === selectedDifficulty;
      const matchesSearch =
        !query ||
        test.title.toLowerCase().includes(query) ||
        test.description.toLowerCase().includes(query) ||
        test.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesDifficulty && matchesSearch;
    });

    if (sortBy === 'difficulty') {
      return [...result].sort(
        (a, b) => (difficultyRank[b.difficulty] ?? 0) - (difficultyRank[a.difficulty] ?? 0)
      );
    }

    if (sortBy === 'speed') {
      return [...result].sort((a, b) => {
        const aFastest = Math.min(...Object.values(a.solutions).map((solution) => solution.executionTimeMs));
        const bFastest = Math.min(...Object.values(b.solutions).map((solution) => solution.executionTimeMs));
        return aFastest - bFastest;
      });
    }

    return result;
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSortBy('default');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 border-b border-neutral-800 bg-gradient-to-b from-neutral-900/50 via-neutral-950 to-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>2026 AI Coding Test Evaluation Benchmark</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-500">
              Claude · Codex · Antigravity
            </span>
            <br />
            AI 코딩 테스트 블로그 & 벤치마크
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-400 mb-10 leading-relaxed">
            최고 성능을 자랑하는 3대 프론티어 AI의 알고리즘 풀이, 동시성 시스템 제어, 가상화 렌더링 최적화 코드를 실시간으로 비교하고 직접 검증해보세요.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#tests"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              코딩 테스트 문제 비교하기
            </a>
            <a
              href="#leaderboard"
              className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold text-sm border border-neutral-700 transition-all flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              모델 리더보드 순위
            </a>
            <a
              href="#sandbox"
              className="px-6 py-3.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-semibold text-sm border border-purple-500/30 transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-purple-400" />
              직접 테스트 실행
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">97.4%</div>
              <div className="text-xs text-neutral-400 mt-0.5">최고 벤치마크 통과율</div>
            </div>
            <div className="p-3 border-l border-neutral-800">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">2.1s</div>
              <div className="text-xs text-neutral-400 mt-0.5">평균 추론 응답 속도</div>
            </div>
            <div className="p-3 border-l border-neutral-800">
              <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">100+</div>
              <div className="text-xs text-neutral-400 mt-0.5">실전 코딩 테스트 셋</div>
            </div>
            <div className="p-3 border-l border-neutral-800">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono">100%</div>
              <div className="text-xs text-neutral-400 mt-0.5">자율 자가 치유(Self-Healing)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <Leaderboard />

      {/* AI Agent Engineering Lab */}
      <AgentEngineeringLab />

      {/* Coding Tests Comparison Section */}
      <section id="tests" className="py-16 border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
                <Layers className="w-3.5 h-3.5" />
                Curated Challenge Suite
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                실전 코딩 테스트 문제 & 모델별 솔루션
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                문제를 선택하면 Claude, Codex, Antigravity의 실제 소스 코드와 실행 벤치마크를 상호 비교할 수 있습니다.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="문제명, 알고리즘, 태그 검색..."
                  aria-label="코딩 테스트 검색"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'difficulty' | 'speed')}
                aria-label="정렬 기준"
                className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-blue-500/50"
              >
                <option value="default">기본 정렬</option>
                <option value="difficulty">난이도 높은 순</option>
                <option value="speed">최고 실행속도 순</option>
              </select>
            </div>
          </div>

          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span>카테고리</span>
              <span className="ml-auto font-mono text-neutral-500">{filteredTests.length}개 결과</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat === 'All' ? '전체 문제' : cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedDifficulty === difficulty
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {difficulty === 'All' ? '모든 난이도' : difficulty}
                </button>
              ))}
              <button
                onClick={resetFilters}
                className="ml-auto px-3 py-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                필터 초기화
              </button>
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} onSelect={(t) => setActiveTest(t)} />
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-16 text-neutral-400 text-sm">
              검색 조건에 맞는 코딩 테스트 문제가 없습니다.
            </div>
          )}
        </div>
      </section>

      {/* Model Spec Comparison Table */}
      <section className="py-16 border-b border-neutral-800 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              3대 AI 코딩 엔진 스펙 비교표
            </h2>
            <p className="text-neutral-400 text-sm">
              2026년 기준 공식 지원 컨텍스트, 도구 호출, 추론 아키텍처 사양입니다.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950">
            <table className="w-full text-left text-xs sm:text-sm text-neutral-300">
              <thead className="bg-neutral-900 text-neutral-400 font-semibold border-b border-neutral-800">
                <tr>
                  <th className="p-4">항목</th>
                  <th className="p-4 text-amber-400">Claude 3.7 Sonnet</th>
                  <th className="p-4 text-emerald-400">OpenAI Codex / o3-mini</th>
                  <th className="p-4 text-blue-400">Google Antigravity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono text-xs">
                <tr>
                  <td className="p-4 font-sans font-semibold text-white">최대 컨텍스트 윈도우</td>
                  <td className="p-4">200K Tokens</td>
                  <td className="p-4">200K Tokens</td>
                  <td className="p-4 font-bold text-blue-400">1M ~ 2M Tokens (대용량)</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-white">추론 방식</td>
                  <td className="p-4">Hybrid Thinking (동적 토큰)</td>
                  <td className="p-4">Chain-of-Thought High</td>
                  <td className="p-4 font-bold text-blue-400">Multi-Agent Agentic Loop</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-white">실시간 자가 치유(Self-healing)</td>
                  <td className="p-4">프롬프트 재질의 필요</td>
                  <td className="p-4">추론 단계 내부 검증</td>
                  <td className="p-4 font-bold text-blue-400">네이티브 서브에이전트 자동 패치</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-white">IDE & 도구 호출 속도</td>
                  <td className="p-4">우수 (3.4s)</td>
                  <td className="p-4">양호 (4.8s)</td>
                  <td className="p-4 font-bold text-blue-400">초고속 병렬 (2.1s)</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-white">추천 사용처</td>
                  <td className="p-4 font-sans">실무 코드 리팩토링 및 클린 코드</td>
                  <td className="p-4 font-sans">대회 알고리즘 & 복잡 수학 문제</td>
                  <td className="p-4 font-sans font-bold text-blue-400">전체 워크스페이스 풀스택 구축</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox */}
      <CustomTestSandbox />

      {/* Blog & Articles Section */}
      <section id="articles" className="py-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                Technical Articles & Research
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                AI 코딩 벤치마크 심층 연구 리포트
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                각 모델의 내부 추론 메커니즘과 프롬프트 최적화 기법을 다룬 기술 아티클입니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_ARTICLES.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={(art) => setActiveArticle(art)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <TestDetailModal test={activeTest} onClose={() => setActiveTest(null)} />
      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
    </div>
  );
}
