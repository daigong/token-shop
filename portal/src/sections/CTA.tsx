

export const CTA = () => {
  return (
    <section id="demo" className="py-24 bg-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500 opacity-50 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">加速企业 AI 转型落地</h2>
        <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light leading-relaxed">
          以可扩展、安全、面向生产环境的生成式 AI 基础设施，支撑企业级业务持续演进。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-md font-medium text-lg hover:bg-slate-50 transition-all shadow-lg text-center">
            申请部署评估
          </a>
          <a href="#use-cases" className="w-full sm:w-auto bg-transparent text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-700 transition-colors border border-blue-400 text-center">
            查看企业场景
          </a>
        </div>
      </div>
    </section>
  );
};
