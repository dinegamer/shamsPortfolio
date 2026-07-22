'use client';

export default function HeroShaderBg() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.26),transparent_30%),radial-gradient(circle_at_82%_32%,rgba(249,115,22,0.18),transparent_28%),linear-gradient(135deg,#020617_0%,#000_48%,#111827_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      <div className="absolute bottom-8 right-8 z-30 pointer-events-none hidden sm:block">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full border border-brand-400/40 bg-black/40" />
          <svg
            className="absolute inset-0 w-full h-full slow-spin"
            viewBox="0 0 100 100"
            style={{ transform: 'scale(1.6)' }}
          >
            <defs>
              <path
                id="hero-circle"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text className="text-[9px] fill-white/80 font-medium tracking-widest">
              <textPath href="#hero-circle" startOffset="0%">
                SHAMSI DIGITAL · SOFTWARE · DATA · AI ·
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
