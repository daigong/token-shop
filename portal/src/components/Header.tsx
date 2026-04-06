
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 hover:text-blue-600 transition-colors">
            AI Infra
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <Link href="/#products" className="hover:text-slate-900 transition-colors">产品矩阵</Link>
            <Link href="/models" className="hover:text-slate-900 transition-colors">模型定价</Link>
            <Link href="/#capabilities" className="hover:text-slate-900 transition-colors">平台能力</Link>
            <Link href="/#use-cases" className="hover:text-slate-900 transition-colors">应用场景</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/#contact" className="hidden sm:block text-slate-600 hover:text-slate-900 transition-colors">联系我们</Link>
          <Link href="/#demo" className="bg-slate-900 text-white px-5 py-2 rounded-md hover:bg-slate-800 transition-colors shadow-sm">
            预约演示
          </Link>
        </div>
      </div>
    </header>
  );
};
