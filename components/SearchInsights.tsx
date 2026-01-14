
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DATA = [
  { name: 'Traffic', count: 420 },
  { name: 'Public Nuisance', count: 350 },
  { name: 'Environment', count: 280 },
  { name: 'Corruption', count: 150 },
  { name: 'Cyber Crime', count: 310 },
];

const COLORS = ['#4f46e5', '#3b82f6', '#0ea5e9', '#6366f1', '#8b5cf6'];

export const SearchInsights: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">National Awareness Trends</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Based on common legal queries and reported categories, we visualize what Indian citizens are most concerned about. 
              Our goal is to provide transparency and actionable legal data for a better society.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Traffic awareness is rising</h4>
                  <p className="text-sm text-slate-500">Queries about Motor Vehicle Act amendments have increased by 40% this year.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Privacy First</h4>
                  <p className="text-sm text-slate-500">We do not store your reports on our servers. Your vault is 100% private.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-xs text-slate-400 mt-4 uppercase tracking-widest font-semibold">Common Legal Query Volumes</p>
          </div>
        </div>
      </div>
    </section>
  );
};
