
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
          // Fixed property 'type' access on File object
          type: file.type.startsWith('video') ? 'video' : 'image',
          url: reader.result as string,
          // Fixed property 'name' access on File object
          name: file.name
        }]);
      };
      // Explicitly using the File object which is a valid Blob
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || media.length === 0) {
      alert("Please provide a description and at least one media file.");
      return;
    }

    setLoading(true);
    try {
      const category = await categorizeIncident(description);
      
      // Get location
      navigator.geolocation.getCurrentPosition((pos) => {
        const report = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          description,
          category,
          media,
          location: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        };
        onSubmit(report);
        setDescription('');
        setMedia([]);
        setLoading(false);
      }, (err) => {
        const report = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          description,
          category,
          media,
          location: { lat: 0, lng: 0 }
        };
        onSubmit(report);
        setDescription('');
        setMedia([]);
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Report Incident</h2>
        <p className="text-slate-500">Document illegal activity safely. All data is stored locally for your privacy.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you witnessed. Include time, date, and specific details..."
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-2">Media Evidence (Photos/Videos)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all"
          >
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-slate-500 font-medium">Click to upload or capture media</p>
            <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, MP4</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </div>

          {media.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-6">
              {media.map((item, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-100">
                  {item.type === 'image' ? (
                    <img src={item.url} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    </div>
                  )}
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setMedia(prev => prev.filter((_, i) => i !== idx)); }}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          )}
          {loading ? 'Processing...' : 'Securely Save Evidence'}
        </button>
      </form>
    </div>
  );
};
