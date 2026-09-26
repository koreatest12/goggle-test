'use client';

import React, { useMemo, useState } from 'react';
import {
  Boxes,
  CheckCircle2,
  Clipboard,
  CloudUpload,
  Code2,
  ExternalLink,
  FileCheck2,
  PlayCircle,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
} from 'lucide-react';

type BuildProfile = 'validate' | 'build' | 'security' | 'full';

const PROFILES = {
  validate: {
    label: 'Validate',
    description: 'TypeScript 정적 검증만 수행',
    command: 'npm run check',
    steps: ['npm ci', 'tsc --noEmit', '결과 확인'],
  },
  build: {
    label: 'Build',
    description: 'Next.js 정적 export + 산출물 검증',
    command: 'npm run build && npm run verify:build',
    steps: ['npm ci', 'next build', 'out/ 검증', 'artifact 생성'],
  },
  security: {
    label: 'Security',
    description: 'TypeScript 검증 + production dependency critical audit',
    command: 'npm run check && npm audit --omit=dev --audit-level=critical',
    steps: ['npm ci', 'tsc --noEmit', 'npm audit', '보안 결과 확인'],
  },
  full: {
    label: 'Full Build',
    description: '타입 검사부터 정적 빌드·검증까지 전체 수행',
    command: 'npm run build:manual',
    steps: ['npm ci', 'tsc --noEmit', 'next build', 'out/ 검증', 'artifact 생성'],
  },
} as const;

export const ManualBuildCenter: React.FC = () => {
  const [profile, setProfile] = useState<BuildProfile>('full');
  const [copied, setCopied] = useState(false);
  const selected = PROFILES[profile];

  const pipeline = useMemo(
    () => [
      { label: 'Checkout', detail: 'actions/checkout@v7', icon: Code2 },
      { label: 'Node Runtime', detail: 'Node.js 24 / npm 11', icon: ServerCog },
      { label: 'Validation', detail: profile === 'build' ? '선택적' : 'tsc --noEmit', icon: ShieldCheck },
      { label: 'Security', detail: profile === 'security' || profile === 'full' ? 'npm audit critical' : '선택적', icon: ShieldCheck },
      { label: 'Static Build', detail: profile === 'validate' || profile === 'security' ? '생략' : 'Next.js export', icon: Boxes },
      { label: 'Verify', detail: profile === 'validate' || profile === 'security' ? '생략' : 'out/index.html · .nojekyll · _next', icon: FileCheck2 },
      { label: 'Deploy', detail: '선택 시 GitHub Pages', icon: CloudUpload },
    ],
    [profile]
  );

  const copyCommand = async () => {
    await navigator.clipboard.writeText(selected.command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="build-center" className="py-16 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <TerminalSquare className="w-3.5 h-3.5" />
            Manual Build Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            수동 빌드 · 검증 · 배포 파이프라인
          </h2>
          <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
            로컬 PowerShell/터미널 실행과 GitHub Actions 수동 실행을 같은 빌드 프로필로 맞췄습니다.
            검증 전용, 정적 빌드, 전체 빌드를 선택해 필요한 단계만 수행할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-3">
            {(Object.keys(PROFILES) as BuildProfile[]).map((key) => {
              const item = PROFILES[key];
              const active = key === profile;
              return (
                <button
                  key={key}
                  onClick={() => setProfile(key)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all ${
                    active
                      ? 'border-indigo-500/50 bg-indigo-500/10'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-white text-sm">{item.label}</div>
                  <div className="text-xs text-neutral-400 mt-1">{item.description}</div>
                  <div className="mt-3 text-[11px] font-mono text-neutral-500">
                    {item.steps.join(' → ')}
                  </div>
                </button>
              );
            })}

            <a
              href="https://github.com/koreatest12/goggle-test/actions/workflows/manual-build.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-center justify-between gap-3 hover:bg-emerald-500/10 transition-colors"
            >
              <div>
                <div className="text-sm font-bold text-emerald-300">GitHub에서 수동 빌드 실행</div>
                <div className="text-xs text-neutral-500 mt-1">Run workflow → profile/deploy 선택</div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-400 shrink-0" />
            </a>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-white">{selected.label} 명령어</div>
                  <div className="text-xs text-neutral-500 mt-1">Windows PowerShell에서도 동일하게 실행할 수 있습니다.</div>
                </div>
                <button
                  onClick={copyCommand}
                  className="px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-xs text-neutral-300 hover:text-white flex items-center gap-2"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  {copied ? '복사 완료' : '명령어 복사'}
                </button>
              </div>
              <pre className="p-5 overflow-x-auto text-sm font-mono text-cyan-300 bg-black/30">
                <code>{selected.command}</code>
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {pipeline.map(({ label, detail, icon: Icon }, index) => (
                <div key={label} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-indigo-300" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-600">STEP {index + 1}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white">{label}</div>
                  <div className="mt-1 text-xs text-neutral-500 leading-relaxed">{detail}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Build Verification Checklist
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  'TypeScript compile error 없음',
                  'production dependency critical audit 지원',
                  'out/index.html 생성',
                  'out/.nojekyll 생성',
                  'out/_next 정적 자산 생성',
                  'Manual Build metadata artifact 생성',
                  '선택 시 GitHub Pages 배포 가능',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-neutral-400 leading-relaxed">
              <span className="font-semibold text-amber-300">CodeQL 연동:</span>{' '}
              JavaScript/TypeScript는 현재 CodeQL의 <code className="text-neutral-300">build-mode: none</code>을 유지합니다.
              향후 compiled language를 추가해 <code className="text-neutral-300">manual</code> 빌드가 필요해질 경우에도
              placeholder가 아니라 실제 <code className="text-neutral-300">npm ci → check → build → verify</code> 체인이 실행되도록 준비했습니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
