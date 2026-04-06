export const UseCases = () => {
  const cases = [
    {
      industry: '金融服务',
      title: '自动化合规与风险分析',
      desc: '通过 AI 系统支持高审查密度流程，帮助团队处理制度内容、汇总风险信号并提升决策支持效率。',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <title>金融行业图标</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      industry: '医疗与生命科学',
      title: '医学资料整合与洞察',
      desc: '帮助专业团队整理高密度研究知识，快速定位相关上下文，提升复杂信息流转中的协作与效率。',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <title>医疗行业图标</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      industry: '软件工程',
      title: '企业级代码生成',
      desc: '通过 AI 辅助研发流程提升工程效率，支持内部工具建设、系统现代化与团队生产力提升。',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <title>工程行业图标</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 tracking-tight">
            为企业关键场景而生
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            以针对高价值、高要求 AI 负载优化过的基础设施，加快组织从试点到实际产出的速度。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((useCase) => (
            <div key={useCase.industry} className="border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 bg-white group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {useCase.icon}
                </div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{useCase.industry}</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">{useCase.title}</h3>
              <p className="text-slate-600 leading-relaxed">{useCase.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
