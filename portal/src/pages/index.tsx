
import Head from 'next/head';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Architecture } from '../sections/Architecture';
import { Capabilities } from '../sections/Capabilities';
import { UseCases } from '../sections/UseCases';
import { CTA } from '../sections/CTA';
import { Hero } from '../sections/Hero';
import { Trust } from '../sections/Trust';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <Head>
        <title>AI Infra - 企业级 AI 基础设施平台</title>
        <meta name="description" content="面向现代企业的高性能、安全、可扩展模型部署与推理平台。" />
      </Head>

      <Header />

      <main>
        <Hero />
        <Capabilities />
        <Architecture />
        <UseCases />
        <Trust />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
