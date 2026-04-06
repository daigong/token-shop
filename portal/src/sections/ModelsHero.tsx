interface ModelsHeroProps {
  modelCount: number;
  vendorCount: number;
  tagCount: number;
  defaultGroup: string;
  fetchedAt: string;
  hasError: boolean;
}

const formatFetchedAt = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '刚刚';
  }

  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const ModelsHero = ({
  modelCount,
  vendorCount,
  tagCount,
  defaultGroup,
  fetchedAt,
  hasError,
}: ModelsHeroProps) => {
  const metrics = [
    { label: '已接入模型', value: `${modelCount}+` },
    { label: '覆盖厂商', value: `${vendorCount}` },
    { label: '热门场景标签', value: `${tagCount}` },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.24),_transparent_28%),radial-gradient(circle_at_left,_rgba(148,163,184,0.15),_transparent_22%)]" />
      <div className="container relative mx-auto px-4 py-24 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              模型中心｜企业级选型与价格参考
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              帮助企业团队更快缩小模型选择范围
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              集中查看平台已接入模型、适用场景与价格口径，帮助技术、产品与采购团队在同一页面开展模型初筛与预算参考。
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">默认分组价格参考：{defaultGroup}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">最近同步：{formatFetchedAt(fetchedAt)}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">支持按厂商、标签与计费方式筛选</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="text-3xl font-semibold text-white">{metric.value}</div>
                  <div className="mt-2 text-sm text-slate-400">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5 text-sm leading-7 text-slate-200">
              <div className="mb-2 font-semibold text-white">价格说明</div>
              <p>
                本页价格默认展示为平台默认分组下的参考口径。按量计费模型展示输入 / 输出单价；按次计费模型展示固定单价。
              </p>
              <p className="mt-3 text-slate-300">
                如需专属分组价格、私有化部署方案或大规模调用报价，可联系商务获取评估。
              </p>
              {hasError ? (
                <p className="mt-3 text-amber-200">当前接口读取异常，页面已切换为兜底提示模式。</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
