'use client';

import React from 'react';
import { CodingTestItem } from '@/types';
import { AI_MODELS } from '@/data/models';
import { ArrowRight, Trophy, Code2, Cpu } from 'lucide-react';

interface TestCardProps {
  test: CodingTestItem;
  onSelect: (test: CodingTestItem) => void;
}

export const TestCard: React.FC<TestCardProps> = ({ test, onSelect }) => {
  const winner = AI_MODELS[test.winnerModelId];

  return (
    <div
      onClick={() => onSelect(test)}
      className="group relative rounded-2xl p-6 bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
              {test.category}
            </span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                test.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : test.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {test.difficulty}
            </span>
          </div>

          {/* Winner badge */}
          <div
            className="flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-md border"
            style={{
              backgroundColor: winner.accentBg,
              borderColor: winner.accentBorder,
              color: winner.color,
            }}
          >
            <Trophy className="w-3 h-3" />
            <span>최적: {winner.name}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {test.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
          {test.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {test.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer info & CTA */}
      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-neutral-400 font-mono text-[11px]">
          <span>3 Models Tested</span>
          <span>•</span>
          <span className="text-emerald-400">100% Pass</span>
        </div>

        <span className="flex items-center gap-1 text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
          코드 비교 보기
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
