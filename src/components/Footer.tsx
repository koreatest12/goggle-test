import React from 'react';
import { Terminal, Heart } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 py-12 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-white">Goggle-Test Lab</p>
              <p className="text-xs text-neutral-400">Claude, Codex, Antigravity AI 코딩 테스트 벤치마크 & 아카이브</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <a href="https://github.com/koreatest12/goggle-test" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <GithubIcon className="w-4 h-4" /> GitHub Repository
            </a>
            <span>MIT License</span>
            <span className="flex items-center gap-1">
              Built with Next.js & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
