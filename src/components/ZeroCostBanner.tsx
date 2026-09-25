'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, DollarSign, X, Lock } from 'lucide-react';

export const ZeroCostBanner: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-full bg-emerald-950/40 border-b border-emerald-500/20 py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-semibold text-emerald-300">
              과금 방지 100% 무과금 안전 정책 적용
            </span>
            <span className="hidden sm:inline text-neutral-400">
              | 외부 유료 LLM API 호출 차단 · 서버 호스팅 비용 $0 · 클라이언트 로컬 엔진
            </span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer"
          >
            과금 방지 정책 확인
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-neutral-950 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <ShieldCheck className="w-5 h-5" />
                <span>Zero-Cost (무과금) 보장 정책</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              본 프로젝트는 사용자의 신용카드 결제나 외부 AI API 요금이 **절대 발생하지 않도록(1원도 과금 없음)** 철저하게 무과금 아키텍처로 설계되었습니다:
            </p>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">유료 API 결제 엔드포인트 차단</span>
                  <p className="text-neutral-400 mt-0.5">
                    OpenAI, Anthropic, Google Cloud 등의 유료 결제 계정 연동이나 API Key 입력 없이 100% 브라우저 클라이언트 사이드에서 안전하게 동작합니다.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">클라이언트 사이드 가상 벤치마크 엔진</span>
                  <p className="text-neutral-400 mt-0.5">
                    코딩 테스트 시뮬레이션 및 코드 분석은 사전에 엄격히 검증된 정적 AST 데이터와 로컬 자바스크립트 런타임으로 실행되므로 토큰 비용이 0원입니다.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">GitHub Pages 100% 무료 정적 배포</span>
                  <p className="text-neutral-400 mt-0.5">
                    Next.js Static Export 기능과 GitHub Actions를 통해 추가 서버 호스팅 비용 없이 GitHub Pages에서 평생 무료로 운영할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
            >
              확인 완료 (안심하고 사용하기)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
