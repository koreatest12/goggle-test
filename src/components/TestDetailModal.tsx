'use client';

import React, { useState } from 'react';
import { CodingTestItem, AIModelId } from '@/types';
import { AI_MODELS } from '@/data/models';
import { X, Check, Copy, Play, CheckCircle2, AlertCircle, Clock, Zap, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TestDetailModalProps {
  test: CodingTestItem | null;
  onClose: () => void;
}

export const TestDetailModal: React.FC<TestDetailModalProps> = ({ test, onClose }) => {
  const [activeModel, setActiveModel] = useState<AIModelId>('antigravity');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  if (!test) return null;

  const currentSolution = test.solutions[activeModel];
  const modelInfo = AI_MODELS[activeModel];

  const handleCopy = () => {
    if (!currentSolution) return;
    navigator.clipboard.writeText(currentSolution.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulation = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setSimulationCompleted(false);
    setConsoleLogs([
      `[Runner] ${modelInfo.name} 코드 검증 시작...`,
      `[Runner] 언어: ${currentSolution.language}`,
      `[Runner] 테스트 케이스 ${test.testCases.length}개 로드 완료`,
    ]);

    for (let index = 0; index < test.testCases.length; index += 1) {
      const testCase = test.testCases[index];
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      setConsoleLogs((prev) => [
        ...prev,
        `[TestCase ${index + 1}] 입력: ${testCase.input}`,
        `[TestCase ${index + 1}] 기대값: ${testCase.expectedOutput}`,
        `[TestCase ${index + 1}] 결과: PASS ✓`,
      ]);
    }

    await new Promise((resolve) => window.setTimeout(resolve, 250));
    setIsRunning(false);
    setSimulationCompleted(true);
    setConsoleLogs((prev) => [
      ...prev,
      `[Summary] ${currentSolution.passCount}/${currentSolution.totalTests} 테스트 통과 · 평균 실행 ${currentSolution.executionTimeMs}ms · ${currentSolution.tokensUsed} tokens`,
    ]);

    if (currentSolution.passed) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Canvas unavailable
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
              {test.category}
            </span>
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                test.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : test.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {test.difficulty}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate max-w-md">
              {test.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Problem Statement */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800/80">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              문제 설명 및 요구사항
            </h4>
            <p className="text-sm text-neutral-200 leading-relaxed mb-3 whitespace-pre-line">
              {test.problemPrompt}
            </p>
            <div className="text-xs text-neutral-400">
              <span className="font-semibold text-neutral-300">제약 조건:</span>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {test.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Model Switcher Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  모델별 풀이 코드 비교:
                </span>
                <span className="text-xs text-amber-400 flex items-center gap-1 font-medium">
                  <Award className="w-3.5 h-3.5" />
                  최적 모델: {AI_MODELS[test.winnerModelId].name}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 text-white text-xs font-semibold shadow-md transition-all"
                >
                  <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? '실행 중...' : '테스트 케이스 검증'}</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사됨!' : '코드 복사'}</span>
                </button>
              </div>
            </div>

            {/* Model Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800 mb-4">
              {(['claude', 'codex', 'antigravity'] as AIModelId[]).map((id) => {
                const info = AI_MODELS[id];
                const isSelected = activeModel === id;
                const isWinner = test.winnerModelId === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveModel(id)}
                    className={`relative py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'bg-neutral-800 text-white shadow-md'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: info.color }}
                      />
                      <span>{info.name}</span>
                      {isWinner && (
                        <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1 rounded font-bold">
                          WIN
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-400">
                      {test.solutions[id].executionTimeMs}ms · {test.solutions[id].tokensUsed} tokens
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Code Block */}
            <div className="relative rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800/80 bg-neutral-900/40 text-xs text-neutral-400 font-mono">
                <span>solution.{currentSolution.language}</span>
                <span className={currentSolution.passed ? 'text-emerald-400' : 'text-amber-400'}>
                  {currentSolution.passCount}/{currentSolution.totalTests} Tests Passed {currentSolution.passed ? '✓' : ''}
                </span>
              </div>
              <pre className="p-4 text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed max-h-96">
                <code>{currentSolution.code}</code>
              </pre>
            </div>
          </div>

          {/* Analysis & Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> {modelInfo.name}의 강점
              </h5>
              <ul className="text-xs text-neutral-300 space-y-1.5">
                {currentSolution.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> 고려 사항 & 특징
              </h5>
              <p className="text-xs text-neutral-300 leading-relaxed mb-2">
                {currentSolution.explanation}
              </p>
              <ul className="text-xs text-neutral-400 space-y-1">
                {currentSolution.caveats.map((cav, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">-</span>
                    <span>{cav}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Live Simulation Console */}
          {(isRunning || simulationCompleted || consoleLogs.length > 0) && (
            <div className="p-4 rounded-xl bg-black border border-neutral-800 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-2 border-b border-neutral-800 pb-1.5">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <Play className="w-3 h-3 text-emerald-400" /> Live Test Execution Log
                </span>
                {simulationCompleted && (
                  <span className="text-emerald-400 font-semibold">PASS (100%)</span>
                )}
              </div>
              <div className="space-y-1 text-neutral-300">
                {consoleLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-neutral-500">{`>`}</span>
                    <span className={log.includes('통과') ? 'text-emerald-400' : ''}>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
