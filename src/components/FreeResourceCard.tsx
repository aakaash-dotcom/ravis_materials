import React, { useState } from 'react';
import { Eye, ExternalLink, CheckCircle2, Sparkles, Copy, BookOpen } from 'lucide-react';
import { FreeResource, Language, PremiumBundle } from '../types';

interface FreeResourceCardProps {
  resource: FreeResource;
  relatedBundle?: PremiumBundle;
  onPreview: (resource: FreeResource) => void;
  onDownload: (resource: FreeResource) => void;
  onSelectBundle: (bundle: PremiumBundle) => void;
  onPreviewSample?: (bundle: PremiumBundle) => void;
  lang: Language;
}

export const FreeResourceCard: React.FC<FreeResourceCardProps> = ({
  resource,
  relatedBundle,
  onPreview,
  onDownload,
  onSelectBundle,
  onPreviewSample,
  lang,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDriveClick = () => {
    setDownloaded(true);
    onDownload(resource);
    window.open(resource.driveLink || 'https://drive.google.com', '_blank', 'noopener,noreferrer');
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleCopyLink = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ravistuition.in';
    const link = `${currentUrl}/?pdf=${resource.id}&subject=${encodeURIComponent(resource.subject)}&class=${encodeURIComponent(resource.classLevel)}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const title = lang === 'tanglish' 
    ? resource.tanglishTitle 
    : (resource.tamilTitle || resource.title);

  return (
    <div className="rounded-2xl border-2 border-amber-200/90 bg-white p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-[#1F2937] gap-3">
      {/* Top micro badges */}
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-600 text-white uppercase tracking-wider">
              Free PDF
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-100 text-slate-800 border border-slate-200">
              {resource.classLevel}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-200">
              {resource.subject}
            </span>
            {resource.examType && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                {resource.examType}
              </span>
            )}
          </div>

          <button
            onClick={handleCopyLink}
            title="Copy Auto DM Link"
            className="text-[10px] font-bold text-gray-500 hover:text-[#FF4D00] flex items-center gap-1 bg-slate-50 hover:bg-amber-50 px-1.5 py-0.5 rounded-md border border-slate-200 transition-colors"
          >
            <Copy className="w-3 h-3" />
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Short, crisp Title */}
        <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
          {title}
        </h3>
        
        {/* Subtle chapter line */}
        <p className="text-[11px] font-semibold text-gray-500 mt-0.5 line-clamp-1">
          {resource.chapter}
        </p>
      </div>

      {/* Action Buttons: 1-Tap Google Drive & Online Preview */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDriveClick}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all shadow-xs active:scale-95 ${
              downloaded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#0F9D58] hover:bg-[#0c8249] text-white'
            }`}
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Opening Drive...</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google Drive</span>
              </>
            )}
          </button>

          <button
            onClick={() => onPreview(resource)}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition-all active:scale-95 border border-slate-200"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>{lang === 'tanglish' ? 'Read Online' : 'பார்வையிடு'}</span>
          </button>
        </div>

        {/* High-Converting Compact Pro Upgrade Box (with 3-Page Sample) */}
        {relatedBundle && (
          <div className="rounded-xl p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-1 text-[11px]">
              <span className="font-black text-amber-950 flex items-center gap-1 truncate">
                <Sparkles className="w-3 h-3 text-[#FF4D00] shrink-0" />
                <span>{relatedBundle.title}</span>
              </span>
              <span className="text-xs font-black text-[#FF4D00] shrink-0">
                ₹{relatedBundle.price}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <button
                onClick={() => {
                  if (onPreviewSample) onPreviewSample(relatedBundle);
                  else onSelectBundle(relatedBundle);
                }}
                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-black transition-colors"
              >
                <BookOpen className="w-3 h-3 text-amber-600" />
                <span>3-Page Sample</span>
              </button>

              <button
                onClick={() => onSelectBundle(relatedBundle)}
                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#FF4D00] hover:bg-[#E04400] text-white text-[11px] font-black shadow-xs transition-colors"
              >
                <span>Unlock for ₹{relatedBundle.price}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
