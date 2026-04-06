

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <div className="font-bold text-xl text-slate-900 mb-4 tracking-tight">AI Infra</div>
            <p className="text-slate-500 max-w-xs leading-relaxed">
              以智能、安全、可扩展的基础设施能力，支持企业推进 AI 落地。
            </p>
          </div>
          <div>
            <div className="font-semibold text-slate-900 mb-5 text-sm uppercase tracking-wider">产品</div>
            <ul className="space-y-3 text-slate-600">
              <li><Link href="/#products" className="hover:text-blue-600 transition-colors">推理 API</Link></li>
              <li><Link href="/models" className="hover:text-blue-600 transition-colors">模型定价</Link></li>
              <li><a href="#products" className="hover:text-blue-600 transition-colors">私有化部署</a></li>
            </ul>
          </div>
          <div id="docs">
            <div className="font-semibold text-slate-900 mb-5 text-sm uppercase tracking-wider">资源</div>
            <ul className="space-y-3 text-slate-600">
              <li><Link href="/#products" className="hover:text-blue-600 transition-colors">平台概览</Link></li>
              <li><Link href="/models" className="hover:text-blue-600 transition-colors">模型目录</Link></li>
              <li><Link href="/#use-cases" className="hover:text-blue-600 transition-colors">应用场景</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900 mb-5 text-sm uppercase tracking-wider">公司</div>
            <ul className="space-y-3 text-slate-600">
              <li><a href="#start" className="hover:text-blue-600 transition-colors">关于我们</a></li>
              <li><a href="#contact" className="hover:text-blue-600 transition-colors">联系我们</a></li>
              <li><a href="#demo" className="hover:text-blue-600 transition-colors">部署评估</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
          <div>&copy; {new Date().getFullYear()} AI Infra。保留所有权利。</div>
          <div className="flex gap-6">
            <a href="#contact" className="hover:text-slate-900 transition-colors">商务咨询</a>
            <a href="#demo" className="hover:text-slate-900 transition-colors">预约演示</a>
            <a href="#use-cases" className="hover:text-slate-900 transition-colors">查看场景</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
