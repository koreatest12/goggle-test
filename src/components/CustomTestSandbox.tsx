'use client';

import React, { useState } from 'react';
import { AI_MODELS } from '@/data/models';
import { AIModelId } from '@/types';
import { Sparkles, Play, CheckCircle2, Terminal, Code2, ShieldAlert } from 'lucide-react';

export const CustomTestSandbox: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'TypeScript로 지수 백오프(Exponential Backoff) 및 지터(Jitter)를 적용한 fetchWithRetry 함수를 구현하고 최대 재시도 횟수 초과 시 커스텀 예외를 발생시키세요.'
  );
  const [selectedLanguage, setSelectedLanguage] = useState('TypeScript');
  const [isSimulating, setIsSimulating] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [activeTab, setActiveTab] = useState<AIModelId>('antigravity');

  const presetPrompts = [
    { label: '지수 백오프 fetchWithRetry', text: 'TypeScript로 지수 백오프(Exponential Backoff) 및 지터(Jitter)를 적용한 fetchWithRetry 함수를 구현하고 최대 재시도 횟수 초과 시 커스텀 예외를 발생시키세요.' },
    { label: 'LRU 캐시 O(1) 구현', text: 'JavaScript/TypeScript로 get과 put 연산이 모두 평균 O(1) 시간 복잡도를 만족하는 LRU(Least Recently Used) Cache 클래스를 이중 연결 리스트(Doubly Linked List)로 작성하세요.' },
    { label: '리액트 useDebounce 훅', text: '지정된 지연 시간 동안 입력값 변경을 지연시키며 컴포넌트 언마운트 시 보류 중인 타이머를 완전히 정리하는 React 커스텀 훅 useDebounce를 작성하세요.' },
  ];

  const handleRunSimulation = () => {
    if (!prompt.trim()) return;
    setIsSimulating(true);
    setResultReady(false);

    setTimeout(() => {
      setIsSimulating(false);
      setResultReady(true);
    }, 1200);
  };

  return (
    <section id="sandbox" className="py-16 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive AI Coding Sandbox
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            직접 코딩 테스트 프롬프트 시험하기
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            원하는 알고리즘이나 기능 요구사항을 입력하여 Claude, Codex, Antigravity 모델의 처리 방식과 아키텍처 특성을 가상 테스트해보세요.
          </p>
        </div>

        {/* Editor Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {presetPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(p.text)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-neutral-300">코딩 테스트 프롬프트</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1 text-neutral-200 text-xs focus:outline-none"
                >
                  <option value="TypeScript">TypeScript</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Rust">Rust</option>
                </select>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs sm:text-sm text-neutral-200 font-mono focus:outline-none focus:border-blue-500/50 resize-none"
                placeholder="코딩 문제나 알고리즘 요구사항을 입력하세요..."
              />

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all cursor-pointer"
              >
                <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? '3대 모델 동시 분석 중...' : '3대 모델 비교 분석 실행'}</span>
              </button>
            </div>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-6">
            <div className="h-full rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      모델별 분석 및 생성 프리뷰
                    </span>
                  </div>
                  {resultReady && (
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      분석 완료
                    </span>
                  )}
                </div>

                {isSimulating ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                    <p className="text-xs text-neutral-400">
                      Claude, Codex, Antigravity 모델의 코드 AST와 복잡도를 분석하고 있습니다...
                    </p>
                  </div>
                ) : resultReady ? (
                  <div className="space-y-4">
                    {/* Tabs */}
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                      {(['antigravity', 'claude', 'codex'] as AIModelId[]).map((mId) => (
                        <button
                          key={mId}
                          onClick={() => setActiveTab(mId)}
                          className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                            activeTab === mId
                              ? 'bg-neutral-800 text-white shadow-sm'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          {AI_MODELS[mId].name}
                        </button>
                      ))}
                    </div>

                    {/* Result Content */}
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 space-y-2">
                      <div className="text-emerald-400 font-bold mb-1">
                        ✓ {AI_MODELS[activeTab].name} 제안 아키텍처
                      </div>
                      <p className="text-neutral-400 text-[11px] leading-relaxed">
                        {activeTab === 'antigravity'
                          ? '• 자가 치유(Self-healing) 루프가 내장된 Full Jitter 알고리즘 적용 (Math.random() * backoffMs)\n• AbortController 지원 및 네트워크 연결 끊김 자동 폴백 핸들링'
                          : activeTab === 'claude'
                          ? '• 커스텀 MaxRetriesExceededError 에러 클래스 상속 및 완벽한 JSDoc 문서화\n• Promise 레이스 컨디션을 방지하는 우아한 클린 함수 설계'
                          : '• 최소 토큰 사용량과 극한의 O(1) 인라인 계산 최적화\n• 수학적 지수 곱셈 오버플로우 방지 (Math.min(maxBackoff, base * 2**attempt))'}
                      </p>
                      <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                        <span>예상 복잡도: O(1) Memory</span>
                        <span className="text-blue-400">추천도: 98%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center text-neutral-400 space-y-2">
                    <Code2 className="w-10 h-10 text-neutral-600 mb-1" />
                    <p className="text-xs text-neutral-300 font-semibold">프롬프트를 입력하고 분석을 실행해보세요</p>
                    <p className="text-[11px] text-neutral-400 max-w-xs">
                      각 AI 모델이 동일한 요구사항에 대해 어떤 알고리즘과 코드 패턴을 선택하는지 한눈에 비교할 수 있습니다.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
                <span>Multi-Model Parallel Inference Engine</span>
                <span>Powered by Goggle-Test</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
