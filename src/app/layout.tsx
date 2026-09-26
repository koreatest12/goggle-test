import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://koreatest12.github.io/goggle-test/'),
  title: 'Goggle-Test | AI Coding Benchmark & Agent Engineering Lab',
  description: 'AI 코딩 벤치마크, 시스템 설계, 동시성 테스트와 Tool/Router/Handoff/Incident Agent 패턴을 직접 실습하는 엔지니어링 랩',
  keywords: ['AI Agent Engineering', 'OpenAI Codex', 'Claude', 'Antigravity', 'AI 코딩 테스트', 'Next.js', 'Agent Handoff'],
  authors: [{ name: 'Goggle-Test' }],
  creator: 'Goggle-Test',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Goggle-Test | AI Coding Benchmark & Agent Engineering Lab',
    description: 'AI 코딩 테스트와 Agent Engineering 패턴을 브라우저에서 비교하고 실습합니다.',
    url: 'https://koreatest12.github.io/goggle-test/',
    siteName: 'Goggle-Test',
    locale: 'ko_KR',
    type: 'website',
  },
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
