
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="hidden md:flex items-center justify-between px-10 py-4 glass border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">SENTINEL INDIA</span>
      </div>
      
      <div className="flex items-center gap-8">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`font-medium transition-colors ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setActiveTab('learn')} 
          className={`font-medium transition-colors ${activeTab === 'learn' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
        >
          Legal Guide
        </button>
        <button 
          onClick={() => setActiveTab('report')} 
          className={`font-medium transition-colors ${activeTab === 'report' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
        >
          Report Incident
        </button>
        <button 
          onClick={() => setActiveTab('vault')} 
          className={`px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md ${activeTab === 'vault' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
        >
          Evidence Vault
        </button>
      </div>
    </nav>
  );
};
