
import React, { useState } from 'react';
import { getLegalInsights } from '../services/geminiService';

export const LegalGuide: React.FC = () => {
  const [query, setQuery] = useState('');
  const [insight, setInsight] = useState<{ text: string, sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const result = await getLegalInsights(query);
      setInsight(result);
    } catch (err) {
      alert("Search failed. Verify connectivity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-16">
        <h2 className="text-xs font-black text-emerald-600 uppercase tracking-[0.4em] mb-4">Legal Research Hub</h2>
        <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Command Intelligence</h1>
        <p className="text-slate-500 mt-4 text-lg">Direct access to Indian Penal Code insights and procedural guidelines.</p>
      </header>

      <form onSubmit={handleSearch} className="mb-20">
        <div className="relative security-border bg-white p-2 flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ENTER LEGAL QUERY (e.g. Traffic Violations, Public Rights...)"
            className="flex-grow px-6 py-4 text-lg font-bold uppercase tracking-tight outline-none"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent"></span> : 'Execute'}
          </button>
        </div>
      </form>

      {insight ? (
        <div className="bg-white border-2 border-slate-900 p-10 relative animate-in slide-in-from-bottom-5 duration-500">
          <div className="absolute -top-3 -left-3 bg-emerald-600 text-white px-4 py-1 text-xs font-black uppercase tracking-widest shadow-md">
            Verified Insight
          </div>
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium text-lg mb-10">
              {insight.text}
            </div>
            
            {insight.sources.length > 0 && (
              <div className="mt-12 pt-8 border-t-2 border-slate-100 flex flex-col gap-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documented Sources</p>
                <div className="flex flex-wrap gap-4">
                  {insight.sources.map((source: any, idx: number) => (
                    <a 
                      key={idx} 
                      href={source.web?.uri} 
                      target="_blank" 
                      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-900 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                    >
                      {source.web?.title || 'Resource'}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: 'IPC 268', d: 'Public Nuisance & Rights' },
            { t: 'MV ACT', d: 'Road Safety Protocols' },
            { t: 'CONSUMER', d: 'Protection Laws' },
            { t: 'IT ACT', d: 'Cyber Security & Fraud' }
          ].map((topic, i) => (
            <button 
              key={i}
              onClick={() => setQuery(`What is the law regarding ${topic.d} in India?`)}
              className="p-8 bg-slate-50 border border-slate-200 hover:border-slate-900 transition-all text-left group flex flex-col justify-between h-48"
            >
              <h4 className="font-black text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-widest text-xs">{topic.t}</h4>
              <p className="font-bold text-slate-800 text-lg leading-tight group-hover:text-emerald-600 transition-colors">{topic.d}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
