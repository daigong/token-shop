import { useCallback, useEffect, useRef, useState } from 'react';

type SlideTheme = {
  glowClass: string;
  badgeClass: string;
  badgeDotClass: string;
  highlightClass: string;
  primaryCtaClass: string;
  secondaryCtaClass: string;
  panelClass: string;
  terminalLabelClass: string;
  statCardClass: string;
  statusLabelClass: string;
  progressTrackClass: string;
  progressBarClass: string;
  codePanelClass: string;
  indicatorActiveClass: string;
  statusBarWidthClass: string;
};

type BaseSlide = {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  theme: SlideTheme;
};

type ControlsSlide = BaseSlide & {
  panelVariant: 'controls';
  panel: {
    cards: Array<{ label: string; value: string }>;
    steps: string[];
    command: string;
  };
};

type KpiSlide = BaseSlide & {
  panelVariant: 'kpi';
  panel: {
    metrics: Array<{ label: string; value: string; note: string }>;
    lanes: Array<{ label: string; value: string; widthClass: string }>;
    signals: string[];
  };
};

type GovernanceSlide = BaseSlide & {
  panelVariant: 'governance';
  panel: {
    policies: Array<{ label: string; value: string }>;
    matrix: Array<{ role: string; scope: string; state: string }>;
    events: string[];
  };
};

type Slide = ControlsSlide | KpiSlide | GovernanceSlide;

const slides: Slide[] = [
  {
    id: 'slide-1',
    tag: '平台管控',
    title: '部署生成式 AI',
    highlight: '全程可控',
    description: '面向企业的模型推理基础设施，兼顾部署、治理与算力管理，帮助团队稳步推进 AI 落地。',
    primaryCta: '开始接入',
    primaryHref: '#products',
    secondaryCta: '查看平台概览',
    secondaryHref: '#capabilities',
    panelVariant: 'controls',
    panel: {
      cards: [
        { label: '网络边界', value: 'VPC 隔离' },
        { label: '工作空间', value: '按团队划分' },
        { label: '发布模式', value: '灰度可回滚' },
      ],
      steps: ['接入资源', '配置路由', '校验上线'],
      command: 'deploy --workspace production --policy guarded',
    },
    theme: {
      glowClass: 'from-cyan-500/25 via-blue-500/10 to-transparent',
      badgeClass: 'border border-cyan-400/30 bg-cyan-500/10 text-cyan-200',
      badgeDotClass: 'bg-cyan-400',
      highlightClass: 'from-cyan-300 via-sky-400 to-blue-500',
      primaryCtaClass: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_32px_rgba(34,211,238,0.45)]',
      secondaryCtaClass: 'bg-slate-900/80 text-cyan-100 border border-cyan-400/20 hover:bg-slate-800',
      panelClass: 'border border-cyan-500/15 bg-slate-900/60 shadow-[0_30px_80px_rgba(14,116,144,0.22)]',
      terminalLabelClass: 'text-cyan-200',
      statCardClass: 'bg-slate-900/70 border border-cyan-500/10',
      statusLabelClass: 'text-cyan-200',
      progressTrackClass: 'bg-slate-900',
      progressBarClass: 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500',
      codePanelClass: 'bg-slate-950 border border-cyan-500/10',
      indicatorActiveClass: 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.65)]',
      statusBarWidthClass: 'w-2/3',
    },
  },
  {
    id: 'slide-2',
    tag: '生产级推理',
    title: '支撑 AI 负载',
    highlight: '稳定上线',
    description: '优化后的推理引擎兼顾高吞吐与低时延，能够应对企业级 SLA 要求与持续增长的生产流量。',
    primaryCta: '查看能力',
    primaryHref: '#capabilities',
    secondaryCta: '查看场景',
    secondaryHref: '#use-cases',
    panelVariant: 'kpi',
    panel: {
      metrics: [
        { label: '吞吐能力', value: '92K req/min', note: '高峰可扩展' },
        { label: 'P95 延迟', value: '148ms', note: '持续优化' },
      ],
      lanes: [
        { label: 'GPU 池利用率', value: '78%', widthClass: 'w-[78%]' },
        { label: '请求队列', value: '稳定', widthClass: 'w-[56%]' },
        { label: '自动扩容', value: '已启用', widthClass: 'w-[88%]' },
      ],
      signals: ['SLA 达标', '突发流量已吸收', '多区域可调度'],
    },
    theme: {
      glowClass: 'from-emerald-500/25 via-teal-500/10 to-transparent',
      badgeClass: 'border border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
      badgeDotClass: 'bg-emerald-400',
      highlightClass: 'from-emerald-300 via-teal-300 to-cyan-400',
      primaryCtaClass: 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_0_22px_rgba(16,185,129,0.35)] hover:shadow-[0_0_34px_rgba(16,185,129,0.45)]',
      secondaryCtaClass: 'bg-emerald-500/10 text-emerald-100 border border-emerald-400/25 hover:bg-emerald-500/20',
      panelClass: 'border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-900/85 to-slate-950 shadow-[0_30px_90px_rgba(6,95,70,0.28)]',
      terminalLabelClass: 'text-emerald-200',
      statCardClass: 'bg-emerald-500/10 border border-emerald-400/15',
      statusLabelClass: 'text-emerald-300',
      progressTrackClass: 'bg-emerald-950/50',
      progressBarClass: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400',
      codePanelClass: 'bg-slate-950/90 border border-emerald-500/20',
      indicatorActiveClass: 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.65)]',
      statusBarWidthClass: 'w-4/5',
    },
  },
  {
    id: 'slide-3',
    tag: '治理与安全',
    title: '治理 AI 模型',
    highlight: '默认零信任',
    description: '内置安全控制、细粒度 RBAC 与审计日志，帮助 AI 系统满足合规、权限与审查要求。',
    primaryCta: '了解安全能力',
    primaryHref: '#trust',
    secondaryCta: '联系商务',
    secondaryHref: '#contact',
    panelVariant: 'governance',
    panel: {
      policies: [
        { label: '访问控制', value: '细粒度 RBAC' },
        { label: '数据边界', value: '租户级隔离' },
        { label: '审批门禁', value: '上线前审查' },
      ],
      matrix: [
        { role: '平台管理员', scope: '生产模型', state: '允许' },
        { role: '业务团队', scope: '推理调用', state: '受策略约束' },
        { role: '审计角色', scope: '日志只读', state: '持续保留' },
      ],
      events: ['策略校验已通过', '访问申请已记录', '审计日志持续同步'],
    },
    theme: {
      glowClass: 'from-violet-500/20 via-indigo-500/10 to-transparent',
      badgeClass: 'border border-violet-400/30 bg-violet-500/10 text-violet-200',
      badgeDotClass: 'bg-violet-400',
      highlightClass: 'from-violet-300 via-indigo-300 to-fuchsia-400',
      primaryCtaClass: 'bg-violet-500 text-white hover:bg-violet-400 shadow-[0_0_18px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]',
      secondaryCtaClass: 'bg-slate-900/80 text-violet-100 border border-violet-400/25 hover:bg-violet-500/10',
      panelClass: 'border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-slate-950/90 to-slate-950 shadow-[0_30px_80px_rgba(76,29,149,0.32)]',
      terminalLabelClass: 'text-violet-200',
      statCardClass: 'bg-violet-500/10 border border-violet-400/15',
      statusLabelClass: 'text-violet-300',
      progressTrackClass: 'bg-violet-950/40',
      progressBarClass: 'bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400',
      codePanelClass: 'bg-black/40 border border-violet-500/20',
      indicatorActiveClass: 'bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.65)]',
      statusBarWidthClass: 'w-3/5',
    },
  },
];

function renderPanelBody(slide: Slide) {
  const theme = slide.theme;

  switch (slide.panelVariant) {
    case 'controls':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {slide.panel.cards.map((card) => (
              <div key={card.label} className={`rounded-lg p-4 transition-all duration-500 ${theme.statCardClass}`}>
                <div className="text-xs text-slate-400 mb-2">{card.label}</div>
                <div className="text-sm font-semibold text-white leading-snug">{card.value}</div>
              </div>
            ))}
          </div>

          <div className={`rounded-lg p-4 transition-all duration-500 ${theme.statCardClass}`}>
            <div className="text-xs text-slate-400 mb-3">部署流程</div>
            <div className="flex items-center justify-between gap-2 text-sm text-white">
              {slide.panel.steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2 flex-1 last:flex-none">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-slate-200">
                    {index + 1}
                  </div>
                  <div className="text-slate-200 whitespace-nowrap">{step}</div>
                  {index < slide.panel.steps.length - 1 ? (
                    <div className={`h-px flex-1 ${theme.progressBarClass}`}></div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto transition-all duration-500 ${theme.codePanelClass}`}>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">执行命令</div>
            <pre className="text-slate-300 m-0 whitespace-pre-wrap break-all"><code>{slide.panel.command}</code></pre>
          </div>
        </div>
      );
    case 'kpi':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {slide.panel.metrics.map((metric) => (
              <div key={metric.label} className={`rounded-xl p-5 transition-all duration-500 ${theme.statCardClass}`}>
                <div className="text-sm text-slate-400 mb-2">{metric.label}</div>
                <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                <div className={`text-xs ${theme.statusLabelClass}`}>{metric.note}</div>
              </div>
            ))}
          </div>

          <div className={`rounded-lg p-4 transition-all duration-500 ${theme.statCardClass}`}>
            <div className="text-xs text-slate-400 mb-4">运行负载分布</div>
            <div className="space-y-3">
              {slide.panel.lanes.map((lane) => (
                <div key={lane.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{lane.label}</span>
                    <span className={`${theme.statusLabelClass}`}>{lane.value}</span>
                  </div>
                  <div className={`h-2 w-full rounded-full overflow-hidden ${theme.progressTrackClass}`}>
                    <div className={`h-full rounded-full ${theme.progressBarClass} ${lane.widthClass}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {slide.panel.signals.map((signal) => (
              <div key={signal} className={`rounded-lg px-3 py-2 text-center text-xs font-medium transition-all duration-500 ${theme.statCardClass} ${theme.statusLabelClass}`}>
                {signal}
              </div>
            ))}
          </div>
        </div>
      );
    case 'governance':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {slide.panel.policies.map((policy) => (
              <div key={policy.label} className={`rounded-lg p-4 transition-all duration-500 ${theme.statCardClass}`}>
                <div className="text-xs text-slate-400 mb-2">{policy.label}</div>
                <div className="text-sm font-semibold text-white leading-snug">{policy.value}</div>
              </div>
            ))}
          </div>

          <div className={`rounded-lg p-4 transition-all duration-500 ${theme.codePanelClass}`}>
            <div className="grid grid-cols-[1.1fr_1fr_auto] gap-3 text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-3">
              <span>角色</span>
              <span>范围</span>
              <span>状态</span>
            </div>
            <div className="space-y-3">
              {slide.panel.matrix.map((row) => (
                <div key={`${row.role}-${row.scope}`} className="grid grid-cols-[1.1fr_1fr_auto] gap-3 items-center text-sm">
                  <span className="text-slate-200">{row.role}</span>
                  <span className="text-slate-400">{row.scope}</span>
                  <span className={`text-xs px-2 py-1 rounded-full border ${theme.statusLabelClass} border-current/20 bg-white/5`}>
                    {row.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-lg p-4 transition-all duration-500 ${theme.statCardClass}`}>
            <div className="text-xs text-slate-400 mb-3">审计事件</div>
            <div className="space-y-2">
              {slide.panel.events.map((event) => (
                <div key={event} className="flex items-center gap-3 text-sm text-slate-200">
                  <span className={`w-2 h-2 rounded-full ${theme.badgeDotClass}`}></span>
                  <span>{event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
  }
}

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  const timeoutsRef = useRef<number[]>([]);
  const currentSlideRef = useRef(0);
  const animationPhaseRef = useRef<'idle' | 'exit' | 'enter'>('idle');

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    animationPhaseRef.current = animationPhase;
  }, [animationPhase]);

  const clearPendingTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => {
      window.clearTimeout(timeout);
    });
    timeoutsRef.current = [];
  }, []);

  const handleSlideChange = useCallback((index: number) => {
    if (animationPhaseRef.current !== 'idle' || index === currentSlideRef.current) return;

    clearPendingTimeouts();
    setAnimationPhase('exit');

    const switchTimeout = window.setTimeout(() => {
      setCurrentSlide(index);
      setAnimationPhase('enter');

      const settleTimeout = window.setTimeout(() => {
        setAnimationPhase('idle');
      }, 320);

      timeoutsRef.current.push(settleTimeout);
    }, 260);

    timeoutsRef.current.push(switchTimeout);
  }, [clearPendingTimeouts]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      handleSlideChange((currentSlideRef.current + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [handleSlideChange]);

  useEffect(() => {
    return clearPendingTimeouts;
  }, [clearPendingTimeouts]);

  const slide = slides[currentSlide];
  const slideTheme = slide.theme;

  const contentAnimationClass =
    animationPhase === 'exit'
      ? 'opacity-0 translate-y-4'
      : animationPhase === 'enter'
        ? 'opacity-100 translate-y-0'
        : 'opacity-100 translate-y-0';

  const panelAnimationClass =
    animationPhase === 'exit'
      ? 'opacity-0 scale-95'
      : animationPhase === 'enter'
        ? 'opacity-100 scale-100'
        : 'opacity-100 scale-100 hover:-translate-y-2';

  return (
    <section id="start" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-slate-950 text-white min-h-[85vh] flex items-center">
      <div className={`absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-bl ${slideTheme.glowClass} rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-in-out`}></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[400px]">
          <div className="lg:w-1/2 text-left relative h-full flex flex-col justify-center">
            <div className={`transition-all duration-300 transform ${contentAnimationClass}`}>
              <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium mb-6 backdrop-blur-sm transition-all duration-500 ${slideTheme.badgeClass}`}>
                <span className={`flex h-2 w-2 rounded-full mr-2 animate-pulse ${slideTheme.badgeDotClass}`}></span>
                {slide.tag}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white h-[120px] md:h-[140px] lg:h-[160px]">
                {slide.title} <br className="hidden lg:block" />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${slideTheme.highlightClass}`}>
                  {slide.highlight}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed font-light h-[110px] md:h-[80px]">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a href={slide.primaryHref} className={`w-full sm:w-auto px-8 py-3.5 rounded-md font-medium text-lg transition-all text-center ${slideTheme.primaryCtaClass}`}>
                  {slide.primaryCta}
                </a>
                <a href={slide.secondaryHref} className={`w-full sm:w-auto px-8 py-3.5 rounded-md font-medium text-lg transition-colors text-center ${slideTheme.secondaryCtaClass}`}>
                  {slide.secondaryCta}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-2xl lg:max-w-none perspective-1000">
            <div className={`relative rounded-xl p-4 backdrop-blur-sm transform transition-all duration-500 ${slideTheme.panelClass} ${panelAnimationClass}`}>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className={`text-xs font-mono transition-colors duration-500 ${slideTheme.terminalLabelClass}`}>终端：运行中</div>
              </div>

              {renderPanelBody(slide)}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-16 lg:mt-12 relative z-20">
          {slides.map((s, index) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSlideChange(index)}
              className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                index === currentSlide
                  ? `w-8 h-2.5 ${slideTheme.indicatorActiveClass}`
                  : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400 hover:scale-110 border border-slate-500/30'
              }`}
              aria-current={index === currentSlide ? 'true' : 'false'}
              aria-label={`切换到第 ${index + 1} 张幻灯片`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
