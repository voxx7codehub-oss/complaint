
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LegalGuide } from './components/LegalGuide';
import { ReportForm } from './components/ReportForm';
import { EvidenceVault } from './components/EvidenceVault';
import { LandingHero } from './components/LandingHero';
import { SearchInsights } from './components/SearchInsights';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'learn' | 'report' | 'vault'>('home');
  const [reports, setReports] = useState<any[]>(() => {
    const saved = localStorage.getItem('sentinel_reports');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sentinel_reports', JSON.stringify(reports));
  }, [reports]);

  const addReport = (newReport: any) => {
    setReports(prev => [newReport, ...prev]);
    setActiveTab('vault');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pb-20 md:pb-0">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-500">
            <LandingHero onGetStarted={() => setActiveTab('learn')} />
            <SearchInsights />
          </div>
        )}
        
        {activeTab === 'learn' && (
          <div className="container mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">
            <LegalGuide />
          </div>
        )}
        
        {activeTab === 'report' && (
          <div className="container mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">
            <ReportForm onSubmit={addReport} />
          </div>
        )}
        
        {activeTab === 'vault' && (
          <div className="container mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">
            <EvidenceVault reports={reports} />
          </div>
        )}
      </main>

      {/* Mobile Sticky Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200 z-50 px-6 py-3 flex justify-between items-center">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </button>
        <button onClick={() => setActiveTab('learn')} className={`flex flex-col items-center ${activeTab === 'learn' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <span className="text-[10px] mt-1 font-medium">Learn</span>
        </button>
        <button onClick={() => setActiveTab('report')} className={`flex flex-col items-center p-3 bg-indigo-600 text-white rounded-full -mt-10 shadow-lg border-4 border-slate-50 ${activeTab === 'report' ? 'bg-indigo-700' : ''}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
        </button>
        <button onClick={() => setActiveTab('vault')} className={`flex flex-col items-center ${activeTab === 'vault' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1a2 2 0 01-2 2H5" /></svg>
          <span className="text-[10px] mt-1 font-medium">Vault</span>
        </button>
        <button onClick={() => window.location.reload()} className="flex flex-col items-center text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="text-[10px] mt-1 font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
