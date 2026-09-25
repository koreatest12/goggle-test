'use client';

import React from 'react';
import { BlogArticle } from '@/types';
import { X, Clock, Calendar, CheckCircle2, Share2, BookOpen } from 'lucide-react';

interface ArticleModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-neutral-400 pb-4 border-b border-neutral-800">
              <span className="font-semibold text-neutral-200">{article.author.name}</span>
              <span>•</span>
              <span>{article.author.role}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
          </div>

          {/* Key Findings Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-neutral-900 border border-blue-800/40">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 주요 분석 핵심 요약 (Key Takeaways)
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-200">
              {article.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Markdown Body */}
          <div className="prose prose-invert prose-neutral max-w-none text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg sm:text-xl font-bold text-white mt-6 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('#### ')) {
                return (
                  <h4 key={index} className="text-base sm:text-lg font-semibold text-neutral-100 mt-4 mb-1">
                    {paragraph.replace('#### ', '')}
                  </h4>
                );
              }
              return (
                <p key={index} className="whitespace-pre-line text-neutral-300">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
