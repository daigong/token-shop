

const reliabilities = [
  '部署边界清晰可控',
  '访问流程可治理',
  '负载隔离有保障',
  '基础设施弹性扩展'
];

export const Architecture = () => {
  return (
    <section id="capabilities" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-6">
            能力验证
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-slate-900 leading-tight tracking-tight">
            面向生产环境的 <br /> <span className="text-blue-600">控制与安全</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            从原型验证走向生产落地时，企业真正关心的是治理能力、部署弹性与运行韧性。我们的架构围绕这些核心要求设计。
          </p>
          <ul className="space-y-6">
            {reliabilities.map((item) => (
              <li key={item} className="flex items-center text-slate-700 text-lg font-medium">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Checkmark icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="lg:w-1/2 w-full">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-xs font-mono text-slate-400">安全策略矩阵</div>
            </div>
            <div className="p-6 md:p-8">
               <div className="space-y-6">
                 {[
                    { name: '数据保护', status: '可配置' },
                    { name: '审计准备度', status: '集中管理' },
                    { name: '负载隔离', status: '范围受控' },
                    { name: '访问治理', status: '策略驱动' }
                  ].map((row) => (
                   <div key={row.name} className="flex justify-between items-center border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                     <span className="text-slate-600 font-medium">{row.name}</span>
                     <span className="text-sm font-mono text-slate-800 bg-slate-100 px-2 py-1 rounded">{row.status}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
