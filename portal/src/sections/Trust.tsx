import Image from 'next/image';

type LogoItem = {
  id: string;
  src: string;
};

export const Trust = () => {
  const row1Logos: LogoItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: `r1-${i}`,
    src: `/logos/siliconflow/row1/${String(i + 1).padStart(2, '0')}.png`,
  }));
  const row2Logos: LogoItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: `r2-${i}`,
    src: `/logos/siliconflow/row2/${String(i + 1).padStart(2, '0')}.png`,
  }));
  const row3Logos: LogoItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: `r3-${i}`,
    src: `/logos/siliconflow/row3/${String(i + 1).padStart(2, '0')}.png`,
  }));

  const MarqueeRow = ({ logos, reverse = false }: { logos: LogoItem[]; reverse?: boolean }) => {
    const marqueeLogos = [...logos, ...logos].map((logo, duplicateIndex) => ({
      ...logo,
      marqueeId: `${logo.id}-${duplicateIndex < logos.length ? 'a' : 'b'}`,
    }));

    return (
    <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center mb-8`}>
      {marqueeLogos.map((logo) => (
        <div 
          key={logo.marqueeId} 
          className="mx-6 md:mx-10 flex-shrink-0 flex items-center justify-center motion-reduce:mb-6 w-28 md:w-40 h-16 relative"
        >
          <div className="relative w-full h-full rounded-xl border border-slate-700/80 bg-white p-1 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
            <Image 
              src={logo.src} 
                alt="生态伙伴标识" 
              fill
              className="object-contain p-0"
              sizes="(max-width: 768px) 112px, 160px"
            />
          </div>
        </div>
      ))}
    </div>
    );
  };

  return (
    <section id="trust" className="py-20 bg-slate-900 border-b border-slate-800 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
          生态伙伴与行业覆盖
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          展示平台在企业场景中的生态协作范围与行业覆盖方向。
        </p>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex flex-col items-center">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling Rows */}
        <MarqueeRow logos={row1Logos} />
        <MarqueeRow logos={row2Logos} reverse={true} />
        <MarqueeRow logos={row3Logos} />

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};
