
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
      alert("Error fetching insights. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Legal Knowledge Hub</h2>
        <p className="text-slate-600">Search for any activity to understand its legal status in India.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-12">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Is public smoking illegal? | IPC for Bribery"
            className="w-full px-6 py-5 bg-white border-2 border-slate-100 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-lg outline-none"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-3 top-3 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            )}
            Search
          </button>
        </div>
      </form>

      {insight && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="prose prose-slate max-w-none">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.994 7.994 0 0112 5a7.994 7.994 0 013 4.196c.589-.334 1.25-.536 1.94-.582.593-.04 1.157.172 1.564.555.407.382.596.936.536 1.528l-.164 1.637A5.996 5.996 0 0115 17h-1a3 3 0 11-6 0H7a5.996 5.996 0 01-3.876-4.666l-.164-1.637c-.06-.592.13-1.146.536-1.528.407-.383.97-.595 1.564-.555.69.046 1.35.248 1.94.582A7.994 7.994 0 019 4.804zM10 17a1 1 0 100-2 1 1 0 000 2z" /></svg>
              Legal Insight
            </h3>
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed mb-8">
              {insight.text}
            </div>
            
            {insight.sources.length > 0 && (
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Verified Sources</h4>
                <div className="flex flex-wrap gap-3">
                  {insight.sources.map((source: any, idx: number) => (
                    <a 
                      key={idx} 
                      href={source.web?.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      {source.web?.title || 'External Resource'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommended Topics */}
      {!insight && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-70">
          <TopicCard 
            title="Public Nuisance" 
            desc="Littering, noise pollution, and obstruction of public paths."
            onClick={() => setQuery('What are the laws against public nuisance in India?')}
          />
          <TopicCard 
            title="Road Safety" 
            desc="Helmet laws, red light jumping, and drunk driving penalties."
            onClick={() => setQuery('Motor Vehicles Act penalties for traffic violations')}
          />
          <TopicCard 
            title="Cyber Crime" 
            desc="Online harassment, identity theft, and financial fraud."
            onClick={() => setQuery('Legal protection against online identity theft in India')}
          />
          <TopicCard 
            title="Consumer Rights" 
            desc="Protection against unfair trade and misleading ads."
            onClick={() => setQuery('How to file a consumer court complaint for faulty products')}
          />
        </div>
      )}
    </div>
  );
};

const TopicCard: React.FC<{ title: string; desc: string; onClick: () => void }> = ({ title, desc, onClick }) => (
  <button 
    onClick={onClick}
    className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-left group"
  >
    <h4 className="font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h4>
    <p className="text-sm text-slate-500">{desc}</p>
  </button>
);
