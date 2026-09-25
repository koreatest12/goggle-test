export type AIModelId = 'claude' | 'codex' | 'antigravity';

export interface AIModelInfo {
  id: AIModelId;
  name: string;
  version: string;
  provider: string;
  color: string;
  accentBg: string;
  accentBorder: string;
  badgeText: string;
  description: string;
  passRate: number; // percentage
  avgSpeedSeconds: number;
  tokenEfficiency: number; // rating / 100
  codeQualityScore: number; // rating / 100
  strongPoint: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface ModelCodeSolution {
  modelId: AIModelId;
  code: string;
  language: string;
  executionTimeMs: number;
  tokensUsed: number;
  explanation: string;
  strengths: string[];
  caveats: string[];
  passCount: number;
  totalTests: number;
  passed: boolean;
}

export interface CodingTestItem {
  id: string;
  title: string;
  slug: string;
  category: 'Algorithms' | 'System Design' | 'Fullstack' | 'Refactoring' | 'Bug Hunting' | 'Concurrency';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  description: string;
  problemPrompt: string;
  constraints: string[];
  tags: string[];
  testCases: TestCase[];
  solutions: Record<AIModelId, ModelCodeSolution>;
  winnerModelId: AIModelId;
  winnerReason: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  content: string;
  keyFindings: string[];
  modelsEvaluated: AIModelId[];
}
