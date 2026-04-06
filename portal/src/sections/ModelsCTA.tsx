export const ModelsCTA = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.6),_transparent_40%)]" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            模型选型支持
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">选型先清楚，落地才更快</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300 md:text-xl">
            如果你已经缩小了候选范围，我们可以进一步结合业务场景、调用规模、合规要求与部署方式，帮助你确定更合适的模型组合与接入方案。
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="w-full rounded-md bg-white px-8 py-4 text-center text-lg font-medium text-slate-950 transition-all hover:bg-slate-100 sm:w-auto"
          >
            申请模型选型评估
          </a>
          <a
            href="#contact"
            className="w-full rounded-md border border-white/15 bg-white/5 px-8 py-4 text-center text-lg font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            联系商务获取报价
          </a>
        </div>
      </div>
    </section>
  );
};
