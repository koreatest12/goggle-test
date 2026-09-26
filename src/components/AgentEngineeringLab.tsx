'use client';

import React, { useMemo, useRef, useState } from 'react';
import {
  Activity,
  Bot,
  Boxes,
  CheckCircle2,
  Clock3,
  GitBranch,
  Play,
  RefreshCcw,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
  Wrench,
} from 'lucide-react';

type AgentPatternId = 'tool' | 'router' | 'handoff' | 'incident';

type AgentPattern = {
  id: AgentPatternId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  goal: string;
  steps: string[];
  prompt: string;
  result: string;
  toolCalls: number;
};

type TraceLine = {
  id: number;
  time: string;
  message: string;
};

const PATTERNS: AgentPattern[] = [
  {
    id: 'tool',
    title: 'Tool Agent',
    subtitle: '도구 호출형 에이전트',
    icon: Wrench,
    goal: '사용자 요청을 판단하고 필요한 도구만 선택해 실행하는 기본 에이전트 패턴',
    steps: ['요청 분석', '도구 선택', '도구 실행', '결과 검증', '최종 응답'],
    prompt: '서버 디스크 사용률을 확인하고 85% 이상인 볼륨만 정리해줘.',
    result: 'disk_usage 도구를 호출해 임계치 초과 볼륨만 추려낸 뒤, 정리 전 확인 항목을 생성합니다.',
    toolCalls: 2,
  },
  {
    id: 'router',
    title: 'Router Agent',
    subtitle: '전문 에이전트 라우팅',
    icon: GitBranch,
    goal: '요청 유형을 분류해 가장 적합한 전문 에이전트로 전달하는 오케스트레이션 패턴',
    steps: ['의도 분류', '라우트 결정', '전문 Agent 실행', '응답 병합', '품질 검사'],
    prompt: '배치 실패 원인과 네트워크 지연 여부를 같이 확인해줘.',
    result: 'Batch Agent와 Network Agent를 선택하고 두 결과를 Incident Summary로 병합합니다.',
    toolCalls: 4,
  },
  {
    id: 'handoff',
    title: 'Multi-Agent Handoff',
    subtitle: '전문가 간 제어권 전달',
    icon: Boxes,
    goal: '한 에이전트가 다른 전문 에이전트에 제어권을 넘기며 복합 작업을 처리하는 패턴',
    steps: ['Manager 시작', 'Batch Agent handoff', 'Log Agent handoff', '검증 Agent', '보고서 생성'],
    prompt: '야간 배치 실패를 분석하고 근본 원인과 재발 방지안을 작성해줘.',
    result: '배치 상태 → 로그 상관분석 → 원인 검증 → 재발 방지 체크리스트 순으로 handoff가 진행됩니다.',
    toolCalls: 5,
  },
  {
    id: 'incident',
    title: 'Incident Ops Agent',
    subtitle: '인프라 장애 대응 시뮬레이션',
    icon: ServerCog,
    goal: '모니터링·로그·배치 정보를 결합해 장애 대응 절차를 만드는 운영 자동화 패턴',
    steps: ['알람 수집', '지표 상관분석', '로그 분석', '원인 후보 정렬', 'Runbook 제안'],
    prompt: 'CPU 급증과 배치 지연이 동시에 발생했다. 영향도와 조치 순서를 정리해줘.',
    result: 'CPU/메모리/배치 지표를 함께 비교하고 서비스 영향도 기준으로 Runbook 실행 순서를 제안합니다.',
    toolCalls: 6,
  },
];

export const AgentEngineeringLab: React.FC = () => {
  const [activeId, setActiveId] = useState<AgentPatternId>('incident');
  const [running, setRunning] = useState(false);
  const [completedStep, setCompletedStep] = useState(-1);
  const [trace, setTrace] = useState<TraceLine[]>([]);
  const [elapsedMs, setElapsedMs] = useState(0);
  const runIdRef = useRef(0);

  const active = useMemo(
    () => PATTERNS.find((item) => item.id === activeId) ?? PATTERNS[0],
    [activeId]
  );

  const appendTrace = (message: string, id: number) => {
    setTrace((lines) => [
      ...lines,
      {
        id,
        time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
        message,
      },
    ]);
  };

  const runSimulation = async () => {
    if (running) return;

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    setRunning(true);
    setCompletedStep(-1);
    setElapsedMs(0);
    setTrace([]);
    const start = performance.now();
    appendTrace(`RUN #${runId} 시작 · ${active.title}`, runId * 100);

    for (let index = 0; index < active.steps.length; index += 1) {
      await new Promise((resolve) => window.setTimeout(resolve, 320 + index * 55));
      if (runIdRef.current !== runId) return;

      setCompletedStep(index);
      setElapsedMs(Math.round(performance.now() - start));
      appendTrace(`STEP ${index + 1}/${active.steps.length} · ${active.steps[index]} 완료`, runId * 100 + index + 1);
    }

    if (runIdRef.current === runId) {
      setRunning(false);
      setElapsedMs(Math.round(performance.now() - start));
      appendTrace('검증 완료 · 최종 결과 생성', runId * 100 + 99);
    }
  };

  const resetSimulation = () => {
    runIdRef.current += 1;
    setRunning(false);
    setCompletedStep(-1);
    setElapsedMs(0);
    setTrace([]);
  };

  const changePattern = (id: AgentPatternId) => {
    runIdRef.current += 1;
    setActiveId(id);
    setRunning(false);
    setCompletedStep(-1);
    setElapsedMs(0);
    setTrace([]);
  };

  const progress = Math.max(0, ((completedStep + 1) / active.steps.length) * 100);

  return (
    <section id="agents" className="py-16 border-b border-neutral-800 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
            <Bot className="w-3.5 h-3.5" />
            AI Agent Engineering Lab
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            에이전트 아키텍처 + Trace Viewer
          </h2>
          <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
            Tool 호출, Router, Handoff, Incident 대응을 실행하고 단계별 Trace, 예상 Tool Call 수,
            실행시간과 진행률을 함께 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {PATTERNS.map((pattern) => {
              const Icon = pattern.icon;
              const selected = pattern.id === activeId;
              return (
                <button
                  key={pattern.id}
                  onClick={() => changePattern(pattern.id)}
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    selected
                      ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                      : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      selected ? 'bg-cyan-500/15 text-cyan-300' : 'bg-neutral-900 text-neutral-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white text-sm">{pattern.title}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">{pattern.subtitle}</div>
                      <p className="text-xs text-neutral-500 leading-relaxed mt-2">{pattern.goal}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Metric icon={Activity} label="진행률" value={`${Math.round(progress)}%`} />
              <Metric icon={Clock3} label="실행시간" value={`${elapsedMs} ms`} />
              <Metric icon={Wrench} label="Tool Calls" value={String(active.toolCalls)} />
              <Metric icon={ShieldCheck} label="실행모드" value="LOCAL" />
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden">
              <div className="p-5 border-b border-neutral-800 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {active.title} 실행 흐름
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">{active.prompt}</p>
                </div>
                <div className="text-[10px] px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold whitespace-nowrap">
                  NO API COST
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 xl:grid-cols-2 gap-5">
                <div>
                  <div className="space-y-3">
                    {active.steps.map((step, index) => {
                      const done = completedStep >= index;
                      const current = running && completedStep + 1 === index;
                      return (
                        <div key={step} className="flex items-center gap-3">
                          <div className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center text-xs font-mono ${
                            done
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : current
                              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 animate-pulse'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                          }`}>
                            {done ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${done ? 'text-neutral-200' : 'text-neutral-400'}`}>
                              {step}
                            </div>
                            <div className="h-1.5 mt-2 rounded-full bg-neutral-900 overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  done ? 'w-full bg-emerald-500' : current ? 'w-1/2 bg-cyan-500' : 'w-0'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {completedStep === active.steps.length - 1 && !running && (
                    <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <div className="text-xs font-bold text-emerald-400 mb-1">시뮬레이션 결과</div>
                      <p className="text-xs text-neutral-300 leading-relaxed">{active.result}</p>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={runSimulation}
                      disabled={running}
                      className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      {running ? 'Agent 실행 중...' : 'Agent 흐름 실행'}
                    </button>
                    <button
                      onClick={resetSimulation}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      실행 취소 / 초기화
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-black/40 overflow-hidden min-h-72">
                  <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-2 text-xs font-semibold text-neutral-300">
                    <TerminalSquare className="w-4 h-4 text-cyan-400" />
                    Agent Trace Console
                  </div>
                  <div className="p-4 font-mono text-[11px] leading-6 max-h-80 overflow-y-auto">
                    {trace.length === 0 ? (
                      <div className="text-neutral-600">
                        실행 버튼을 누르면 Agent orchestration trace가 표시됩니다.
                      </div>
                    ) : (
                      trace.map((line) => (
                        <div key={line.id} className="text-neutral-400">
                          <span className="text-neutral-600">[{line.time}]</span>{' '}
                          <span className="text-cyan-300">{line.message}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-neutral-800 text-[11px] text-neutral-500">
                프로덕션 적용 시 RBAC, 승인 단계, Secret 관리, audit log, timeout/retry, idempotency와 rollback 정책을 추가해야 합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Metric: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}> = ({ icon: Icon, label, value }) => (
  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3">
    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
    <div className="mt-1 text-sm font-mono font-bold text-neutral-200">{value}</div>
  </div>
);
