import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { FreeResource, Language } from '../types';

interface FreeResourceCardProps {
  resource: FreeResource;
  onDownload: (resource: FreeResource) => void;
  lang: Language;
}

// Subject colors for crisp badges and borders
const SUBJECT_COLORS: Record<string, { badge: string; border: string; bg: string }> = {
  Maths: { badge: 'bg-blue-600 text-white', border: 'border-blue-300 hover:border-blue-400', bg: 'bg-blue-50/30' },
  Economics: { badge: 'bg-emerald-600 text-white', border: 'border-emerald-300 hover:border-emerald-400', bg: 'bg-emerald-50/30' },
  Physics: { badge: 'bg-violet-600 text-white', border: 'border-violet-300 hover:border-violet-400', bg: 'bg-violet-50/30' },
  Chemistry: { badge: 'bg-pink-600 text-white', border: 'border-pink-300 hover:border-pink-400', bg: 'bg-pink-50/30' },
  Biology: { badge: 'bg-teal-600 text-white', border: 'border-teal-300 hover:border-teal-400', bg: 'bg-teal-50/30' },
  Science: { badge: 'bg-cyan-600 text-white', border: 'border-cyan-300 hover:border-cyan-400', bg: 'bg-cyan-50/30' },
  Tamil: { badge: 'bg-amber-600 text-white', border: 'border-amber-300 hover:border-amber-400', bg: 'bg-amber-50/30' },
  English: { badge: 'bg-indigo-600 text-white', border: 'border-indigo-300 hover:border-indigo-400', bg: 'bg-indigo-50/30' },
  'Social Science': { badge: 'bg-orange-600 text-white', border: 'border-orange-300 hover:border-orange-400', bg: 'bg-orange-50/30' },
  Commerce: { badge: 'bg-amber-600 text-white', border: 'border-amber-300 hover:border-amber-400', bg: 'bg-amber-50/30' },
};

// Strips out redundant "12th Economics: " or "10th Maths: " prefixes to show only the main topic
function cleanTitle(rawTitle: string, subject: string, classLevel: string): string {
  if (!rawTitle) return '';
  // Pattern to match e.g. "12th Economics: ", "10th Maths - ", "12th Standard Maths: ", "11th Physics: "
  const prefixRegex = new RegExp(`^(\\d+(?:th|ஆம்\\s*வகுப்பு)?\\s*(?:Standard)?\\s*)?(${subject})?[:\\-\\s]+`, 'i');
  const cleaned = rawTitle.replace(prefixRegex, '').trim();
  return cleaned || rawTitle;
}

export const FreeResourceCard: React.FC<FreeResourceCardProps> = ({
  resource,
  onDownload,
  lang,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleOpenPdf = () => {
    setClicked(true);
    onDownload(resource);
    window.open(resource.driveLink || 'https://drive.google.com', '_blank', 'noopener,noreferrer');
    setTimeout(() => setClicked(false), 2000);
  };

  const rawTitle = lang === 'tamil' && resource.tamilTitle 
    ? resource.tamilTitle 
    : (resource.tanglishTitle || resource.title);

  const displayTitle = cleanTitle(rawTitle, resource.subject, resource.classLevel);

  const colors = SUBJECT_COLORS[resource.subject] || {
    badge: 'bg-slate-700 text-white',
    border: 'border-slate-300 hover:border-slate-400',
    bg: 'bg-slate-50',
  };

  return (
    <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-2.5 sm:p-3 flex flex-col justify-between transition-all hover:shadow-sm bg-white text-[#1F2937] h-full`}>
      {/* Top Row: FREE PDF at Left, Subject at Right */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-1">
          <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-[#0F9D58] text-white uppercase tracking-tight">
            FREE PDF
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${colors.badge}`}>
            {resource.subject}
          </span>
        </div>

        {/* Crisp Main Topic Title */}
        <h4 className="text-xs font-black text-slate-900 leading-snug line-clamp-2 min-h-[2.4em]">
          {displayTitle}
        </h4>
      </div>

      {/* Direct Clean Green Button: "Open PDF" */}
      <div className="mt-2 pt-1 border-t border-slate-100">
        <button
          onClick={handleOpenPdf}
          className={`w-full py-1.5 px-2 rounded-lg text-xs font-black transition-all shadow-xs active:scale-95 flex items-center justify-center gap-1 ${
            clicked
              ? 'bg-emerald-800 text-white'
              : 'bg-[#0F9D58] hover:bg-[#0c8249] text-white'
          }`}
        >
          {clicked ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Opened!</span>
            </>
          ) : (
            <span>Open PDF</span>
          )}
        </button>
      </div>
    </div>
  );
};
