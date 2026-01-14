
import React from 'react';

export const LandingHero: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-32 bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 mb-6 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-full">
            Citizen Empowerment Platform
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Law-Abiding India</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Stay informed about illegal activities, learn Indian laws, and safely document incidents. 
            Empowering every citizen to be the change they wish to see.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-xl hover:bg-indigo-700 transition-all scale-100 hover:scale-105"
            >
              Start Learning
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-bold border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all">
              Watch Video Guide
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 glass rounded-2xl">
              <div className="text-3xl font-bold text-indigo-600 mb-1">500+</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Legal Insights</div>
            </div>
            <div className="p-6 glass rounded-2xl">
              <div className="text-3xl font-bold text-indigo-600 mb-1">24/7</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Available</div>
            </div>
            <div className="p-6 glass rounded-2xl">
              <div className="text-3xl font-bold text-indigo-600 mb-1">Secure</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Encryption</div>
            </div>
            <div className="p-6 glass rounded-2xl">
              <div className="text-3xl font-bold text-indigo-600 mb-1">Private</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Local Storage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
