

const products = [
  { title: '高性能推理', desc: '以面向生产环境的可扩展推理层承接模型请求，兼顾稳定性、效率与可预期运维。', tag: 'API' },
  { title: '模型定制', desc: '通过可控的托管流程让模型贴合业务语境，满足企业交付对安全与流程的要求。', tag: '平台' },
  { title: '私有化部署', desc: '为需要更强隔离与基础设施掌控力的组织提供可控的部署路径。', tag: '企业级' },
  { title: '知识集成', desc: '通过灵活的集成方式连接内部知识与业务系统，让应用更快获得可用上下文。', tag: '集成' },
  { title: '安全与治理', desc: '建立具备策略感知的访问控制、可审查流程与企业级运行防护。', tag: '安全' },
  { title: '可观测与运维', desc: '帮助平台团队持续掌握使用情况、稳定性表现与生命周期决策依据。', tag: '运维' }
];

export const Capabilities = () => {
  return (
    <section id="products" className="py-24 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 tracking-tight">
            完整产品能力矩阵
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            以统一、可扩展的平台能力覆盖从模型定制到生产部署的全流程，加速企业 AI 建设与落地。
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((feature) => (
            <div key={feature.title} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{feature.tag}</span>
              </div>
              <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center mb-6 text-slate-700 shadow-sm group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>{feature.title} 图标</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
