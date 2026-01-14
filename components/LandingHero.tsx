
import React from 'react';

export const LandingHero: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <section className="relative hero-gradient pt-24 pb-32 text-white border-b-4 border-emerald-600 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 py-1.5 px-3 mb-8 text-xs font-black uppercase tracking-[0.2em] text-emerald-400 border border-emerald-400/30 bg-emerald-400/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            System Live: Active Monitoring
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
            Uphold <br/>The <span className="text-emerald-500 underline decoration-4 underline-offset-8">Constitution</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-light">
            An intelligence-driven legal portal for Indian citizens. <br/>
            Know the law. Document the truth. Protect the nation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-5 bg-emerald-600 text-white font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 security-border-sm"
            >
              Start Intelligence Search
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7" /></svg>
            </button>
            <div className="flex -space-x-3 overflow-hidden">
              {[1,2,3,4].map(i => (
                <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold">
                  {i}0k+
                </div>
              ))}
              <span className="pl-6 text-sm font-bold text-slate-500 uppercase flex items-center">Join Active Contributors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
