'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Sparkles, Cpu, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { ZeroCostBanner } from './ZeroCostBanner';

export const Navbar: React.FC = () => {
  return (
    <>
      <ZeroCostBanner />
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight">Goggle-Test</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                AI Coding Lab
              </span>
            </div>
            <p className="text-xs text-neutral-400 -mt-0.5">Claude · Codex · Antigravity</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a href="#leaderboard" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Cpu className="w-4 h-4 text-emerald-400" />
            벤치마크 리더보드
          </a>
          <a href="#tests" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Layers className="w-4 h-4 text-blue-400" />
            코딩 테스트 비교
          </a>
          <a href="#articles" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <BookOpen className="w-4 h-4 text-amber-400" />
            분석 리포트
          </a>
          <a href="#sandbox" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Sparkles className="w-4 h-4 text-purple-400" />
            인터랙티브 테스트기
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>비용 $0.00 (무과금)</span>
          </div>

          <a
            href="https://github.com/koreatest12/goggle-test"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all hover:border-neutral-500"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
    </>
  );
};
