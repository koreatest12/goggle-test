'use client';

import React from 'react';
import { BlogArticle } from '@/types';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: BlogArticle;
  onSelect: (article: BlogArticle) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(article)}
      className="group rounded-2xl p-6 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
          <span className="font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            {article.category}
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-xs sm:text-sm text-neutral-400 line-clamp-3 mb-4 leading-relaxed">
          {article.summary}
        </p>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
        <span className="text-neutral-400 font-mono text-[11px]">{article.date}</span>
        <span className="flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
          전문 읽기
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
