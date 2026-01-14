
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DATA = [
  { name: 'TRAFFIC', count: 420 },
  { name: 'NUISANCE', count: 350 },
  { name: 'ENVIRO', count: 280 },
  { name: 'CORRUPT', count: 150 },
  { name: 'CYBER', count: 310 },
];

const COLORS = ['#0f172a', '#0f172a', '#0f172a', '#059669', '#0f172a'];

export const SearchInsights: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <h2 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Forensic Overview</h2>
            <h3 className="text-4xl font-black text-slate-900 mb-8 leading-tight tracking-tighter uppercase">
              National Activity <br/>Insights
            </h3>
            <div className="space-y-10">
              <div className="border-l-4 border-slate-900 pl-6">
                <p className="text-3xl font-black text-slate-900">40.2%</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Growth in Legal Literacy Queries</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-6">
                <p className="text-3xl font-black text-emerald-600">Secure</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Local Encrypted Evidence Storage</p>
              </div>
            </div>
          </div>
          
          <div className="flex-grow bg-slate-50 p-10 border-2 border-slate-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-slate-400">REPORT_ID: SV-2024-X</div>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA}>
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 'bold'}} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '0px', border: '2px solid #0f172a', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="count" radius={0}>
                    {DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-slate-200 pt-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Citizen Report Metrics</span>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-slate-900"></span>
                <span className="w-3 h-3 bg-emerald-600"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
