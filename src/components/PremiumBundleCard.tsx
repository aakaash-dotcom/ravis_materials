import React from 'react';
import { Check, Sparkles, BookOpen, ExternalLink, Zap } from 'lucide-react';
import { Language, PremiumBundle } from '../types';

interface PremiumBundleCardProps {
  bundle: PremiumBundle;
  isUnlocked: boolean;
  onPreviewSample: (bundle: PremiumBundle) => void;
  onBuy: (bundle: PremiumBundle) => void;
  lang: Language;
  isHighlighted?: boolean;
}

export const PremiumBundleCard: React.FC<PremiumBundleCardProps> = ({
  bundle,
  isUnlocked,
  onPreviewSample,
  onBuy,
  isHighlighted,
}) => {
  return (
    <div
      id={bundle.id}
      className={`rounded-2xl border-2 transition-all p-3.5 sm:p-4 flex flex-col justify-between text-[#1F2937] bg-white gap-3 ${
        isHighlighted
          ? 'border-[#FF4D00] ring-4 ring-[#FF4D00]/20 shadow-md'
          : 'border-amber-300 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Top badges & Title */}
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-[#FF4D00] text-white uppercase tracking-wider">
              {bundle.classLevel} PRO
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
              {bundle.subjects.join(', ')}
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-yellow-100 text-yellow-900 border border-yellow-300">
            {bundle.targetExamScore}
          </span>
        </div>

        {/* Short, bold Title */}
        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {bundle.title}
        </h3>

        {/* Price Row: Big, clear price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl sm:text-3xl font-black text-[#FF4D00] tracking-tight">
            ₹{bundle.price}
          </span>
          <span className="text-xs font-bold text-gray-400 line-through">
            ₹{bundle.originalPrice}
          </span>
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            {bundle.savingsPercent}% OFF
          </span>
        </div>
      </div>

      {/* Visual 3-Item Features List (No long text) */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-black text-slate-800">
          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>Top 25 Twist Questions + Solved Steps</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-black text-slate-800">
          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>Examiner Step-Marking Blueprint</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-black text-slate-800">
          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>Instant Google Drive Lifetime Folder</span>
        </div>
      </div>

      {/* Action Buttons: 3-Page Sample + Buy */}
      <div className="grid grid-cols-2 gap-2 pt-0.5">
        <button
          onClick={() => onPreviewSample(bundle)}
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black border border-slate-300 transition-colors active:scale-95"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-600" />
          <span>3-Page Sample</span>
        </button>

        {isUnlocked ? (
          <a
            href={bundle.driveFolderLink || 'https://drive.google.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#0F9D58] hover:bg-[#0c8249] text-white text-xs font-black shadow-xs transition-transform active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Folder</span>
          </a>
        ) : (
          <button
            onClick={() => onBuy(bundle)}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-black shadow-xs transition-transform active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Buy for ₹{bundle.price}</span>
          </button>
        )}
      </div>
    </div>
  );
};
