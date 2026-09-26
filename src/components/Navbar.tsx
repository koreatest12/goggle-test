'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Cpu,
  Layers,
  Menu,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { ZeroCostBanner } from './ZeroCostBanner';

const navItems = [
  { href: '#leaderboard', label: '벤치마크', icon: Cpu, color: 'text-emerald-400' },
  { href: '#agents', label: 'Agent Engineering', icon: Sparkles, color: 'text-cyan-400' },
  { href: '#tests', label: '코딩 테스트', icon: Layers, color: 'text-blue-400' },
  { href: '#articles', label: '분석 리포트', icon: BookOpen, color: 'text-amber-400' },
  { href: '#sandbox', label: '테스트기', icon: Sparkles, color: 'text-purple-400' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <ZeroCostBanner />
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/85 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 group min-w-0" onClick={() => setMobileOpen(false)}>
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-white tracking-tight truncate">Goggle-Test</span>
                <span className="hidden sm:inline text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  AI Coding Lab
                </span>
              </div>
              <p className="hidden sm:block text-xs text-neutral-400 -mt-0.5">Coding Benchmark · Agent Engineering</p>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-neutral-300">
            {navItems.map(({ href, label, icon: Icon, color }) => (
              <a key={href} href={href} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Icon className={`w-4 h-4 ${color}`} />
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>정적 배포 · 비용 $0</span>
            </div>
            <a
              href="https://github.com/koreatest12/goggle-test"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all hover:border-neutral-500"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <button
              type="button"
              aria-label={mobileOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="xl:hidden border-t border-neutral-800 bg-neutral-950/95 px-4 py-4">
            <nav className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navItems.map(({ href, label, icon: Icon, color }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-3 text-sm text-neutral-300 hover:text-white hover:border-neutral-700"
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                  {label}
                </a>
              ))}
              <a
                href="https://github.com/koreatest12/goggle-test"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-3 text-sm text-neutral-300"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
