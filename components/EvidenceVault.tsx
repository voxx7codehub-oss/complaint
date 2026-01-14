
import React from 'react';

interface EvidenceVaultProps {
  reports: any[];
}

export const EvidenceVault: React.FC<EvidenceVaultProps> = ({ reports }) => {
  if (reports.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1a2 2 0 01-2 2H5" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Vault is Empty</h3>
        <p className="text-slate-500">You haven't documented any incidents yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Evidence Vault</h2>
          <p className="text-slate-500">Securely stored incidents on this device.</p>
        </div>
        <div className="px-4 py-2 bg-green-50 text-green-700 text-sm font-bold rounded-full border border-green-100 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          End-to-End Local Storage
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-all group">
            <div className="relative h-48 bg-slate-900">
              {report.media[0].type === 'image' ? (
                <img src={report.media[0].url} alt="incident" className="w-full h-full object-cover opacity-80" />
              ) : (
                <video src={report.media[0].url} className="w-full h-full object-cover opacity-80" />
              )}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-slate-800 rounded-full shadow-sm">
                  {report.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 text-white text-xs font-medium">
                {new Date(report.timestamp).toLocaleString()}
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-slate-700 text-sm line-clamp-3 mb-6">
                {report.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="text-xs font-medium truncate max-w-[100px]">
                    {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
                  </span>
                </div>
                
                <button className="text-indigo-600 text-sm font-bold hover:text-indigo-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Case
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
