'use client';

import React, { useState } from 'react';
import { AI_MODELS } from '@/data/models';
import { AIModelId } from '@/types';
import { Trophy, Zap, CheckCircle2, ShieldAlert, Sparkles, Award } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'passRate' | 'speed' | 'tokenEfficiency' | 'codeQuality'>('passRate');

  const modelsList = Object.values(AI_MODELS).sort((a, b) => {
    if (selectedMetric === 'passRate') return b.passRate - a.passRate;
    if (selectedMetric === 'speed') return a.avgSpeedSeconds - b.avgSpeedSeconds;
    if (selectedMetric === 'tokenEfficiency') return b.tokenEfficiency - a.tokenEfficiency;
    return b.codeQualityScore - a.codeQualityScore;
  });

  return (
    <section id="leaderboard" className="py-12 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5" />
              2026 AI Coding Benchmark Scoreboard
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              모델별 종합 성능 벤치마크
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              실무 100여 개 코딩 테스트 케이스(알고리즘, 프론트엔드, 동시성, 버그 픽스)를 기반으로 집계된 데이터입니다.
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-medium self-start md:self-auto">
            <button
              onClick={() => setSelectedMetric('passRate')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedMetric === 'passRate'
                  ? 'bg-neutral-800 text-white shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              테스트 통과율
            </button>
            <button
              onClick={() => setSelectedMetric('speed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedMetric === 'speed'
                  ? 'bg-neutral-800 text-white shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              추론 속도
            </button>
            <button
              onClick={() => setSelectedMetric('tokenEfficiency')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedMetric === 'tokenEfficiency'
                  ? 'bg-neutral-800 text-white shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              토큰 효율성
            </button>
            <button
              onClick={() => setSelectedMetric('codeQuality')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedMetric === 'codeQuality'
                  ? 'bg-neutral-800 text-white shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              코드 품질
            </button>
          </div>
        </div>

        {/* 3 Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modelsList.map((model, index) => {
            const isRankOne = index === 0;
            return (
              <div
                key={model.id}
                className={`relative rounded-2xl p-6 bg-gradient-to-b from-neutral-900 to-neutral-950 border transition-all duration-300 hover:translate-y-[-2px] ${
                  isRankOne
                    ? 'border-blue-500/50 shadow-xl shadow-blue-500/10'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Ranking Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: model.accentBg,
                        color: model.color,
                        border: `1px solid ${model.accentBorder}`,
                      }}
                    >
                      #{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-neutral-400">{model.provider}</span>
                  </div>
                  {isRankOne && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                      <Award className="w-3 h-3" />
                      Leader
                    </span>
                  )}
                </div>

                {/* Model Title */}
                <h3 className="text-lg font-bold text-white mb-1">{model.name}</h3>
                <p className="text-xs text-neutral-400 mb-4">{model.version}</p>

                {/* Metric Bars */}
                <div className="space-y-3.5 mb-6 pt-3 border-t border-neutral-800/80">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-400">테스트 통과율</span>
                      <span className="font-semibold text-white">{model.passRate}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${model.passRate}%`,
                          backgroundColor: model.color,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-400">평균 생성 속도</span>
                      <span className="font-semibold text-white">{model.avgSpeedSeconds}s</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 bg-emerald-400"
                        style={{ width: `${Math.max(10, 100 - model.avgSpeedSeconds * 15)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-400">토큰 효율 지수</span>
                      <span className="font-semibold text-white">{model.tokenEfficiency}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 bg-amber-400"
                        style={{ width: `${model.tokenEfficiency}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-400">코드 가독성/품질</span>
                      <span className="font-semibold text-white">{model.codeQualityScore}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 bg-indigo-400"
                        style={{ width: `${model.codeQualityScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Strong Point */}
                <div
                  className="rounded-xl p-3 text-xs border"
                  style={{
                    backgroundColor: model.accentBg,
                    borderColor: model.accentBorder,
                  }}
                >
                  <p className="font-semibold mb-1" style={{ color: model.color }}>
                    강점 분석
                  </p>
                  <p className="text-neutral-300 leading-relaxed">{model.strongPoint}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
