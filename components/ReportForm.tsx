
import React, { useState, useRef } from 'react';
import { categorizeIncident } from '../services/geminiService';

interface ReportFormProps {
  onSubmit: (report: any) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia(prev => [...prev, {
          type: file.type.startsWith('video') ? 'video' : 'image',
          url: reader.result as string,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || media.length === 0) {
      alert("MISSING DATA: Description and Media are mandatory for evidence.");
      return;
    }

    setLoading(true);
    try {
      const category = await categorizeIncident(description);
      navigator.geolocation.getCurrentPosition((pos) => {
        const report = {
          id: `CASE-${Date.now()}`,
          timestamp: Date.now(),
          description,
          category,
          media,
          location: { lat: pos.coords.latitude, lng: pos.coords.longitude }
        };
        onSubmit(report);
      }, () => {
        const report = {
          id: `CASE-${Date.now()}`,
          timestamp: Date.now(),
          description,
          category,
          media,
          location: { lat: 0, lng: 0 }
        };
        onSubmit(report);
      });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900 text-white p-12 security-border border-emerald-600">
        <div className="mb-12 border-b border-slate-700 pb-8">
          <div className="inline-block px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Security Clearance Active
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Submit Evidence</h2>
          <p className="text-slate-400 mt-2 font-medium">Capture and categorize illegal activity with GPS timestamps.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Incident Log Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="DETAILS OF THE OBSERVED ACTIVITY..."
              rows={4}
              className="w-full px-6 py-4 bg-slate-800 border-2 border-slate-700 focus:border-emerald-500 outline-none transition-all font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Media Attachment System</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 p-12 text-center cursor-pointer hover:border-emerald-500 hover:bg-slate-800 transition-all"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-600">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
              </div>
              <p className="font-black uppercase tracking-widest text-sm text-slate-300">Initialize Media Upload</p>
              <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*,video/*" onChange={handleFileChange} />
            </div>

            {media.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-8">
                {media.map((item, idx) => (
                  <div key={idx} className="relative aspect-square border-2 border-slate-700 group overflow-hidden">
                    <img src={item.url} className="w-full h-full object-cover" alt="prev" />
                    <button 
                      type="button"
                      onClick={() => setMedia(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute inset-0 bg-red-600/90 text-white font-black opacity-0 group-hover:opacity-100 transition-opacity uppercase text-[10px]"
                    >
                      Purge
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all flex items-center justify-center gap-4 text-lg emerald-pulse"
          >
            {loading ? <span className="animate-spin h-6 w-6 border-4 border-white border-t-transparent"></span> : 'Authenticate & Save Evidence'}
          </button>
        </form>
      </div>
    </div>
  );
};
