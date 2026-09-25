import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Goggle-Test | Claude · Codex · Antigravity AI 코딩 테스트 블로그',
  description: 'Claude, Codex, Antigravity 모델의 알고리즘, 시스템 설계, 동시성, 풀스택 코딩 테스트 벤치마크 및 비교 분석 플랫폼',
  keywords: ['Claude 3.7', 'OpenAI Codex', 'Google Antigravity', 'AI 코딩 테스트', '코딩 테스트 벤치마크', 'LeetCode AI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 antialiased selection:bg-blue-500/30 selection:text-blue-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
