import React from 'react';
import { Sparkles, Check, Eye, Zap, ArrowRight, Unlock, ExternalLink } from 'lucide-react';
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
  lang,
  isHighlighted,
}) => {
  const title = lang === 'tamil' && bundle.tamilTitle ? bundle.tamilTitle : bundle.title;
  const tagline = lang === 'tanglish' 
    ? bundle.tanglishTagline 
    : (bundle.tamilTagline || bundle.tagline);

  return (
    <div
      id={bundle.id}
      className={`relative rounded-[2.5rem] border-4 transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 overflow-hidden text-white ${
        isHighlighted
          ? 'border-[#FFBB00] ring-8 ring-[#FFBB00]/30 bg-[#7C3AED] shadow-[10px_10px_0px_#B45309] scale-[1.01]'
          : 'border-[#5B21B6] bg-[#7C3AED] shadow-2xl hover:shadow-[8px_8px_0px_#5B21B6]'
      }`}
    >
      {/* Decorative top-right circle */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#9333EA] rounded-full opacity-30 pointer-events-none" />

      {/* Popular or Savings Badge */}
      {bundle.popularBadge && (
        <div className="absolute -top-3 left-6 z-20">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-[#FFBB00] text-black shadow-md flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            {bundle.popularBadge}
          </span>
        </div>
      )}

      <div className="relative z-10">
        {/* Class and Tier Badges */}
        <div className="flex items-center justify-between gap-2 mb-3 mt-1 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-white text-[#7C3AED] shadow-sm">
              {bundle.classLevel} BOARD
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-[#5B21B6] text-indigo-100 border border-white/20">
              {bundle.tier === 'ultra_pro' ? '👑 ULTRA PRO VIP' : '⚡ PRO BOOSTER'}
            </span>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-black bg-yellow-300 text-yellow-950 shadow-xs">
            {bundle.targetExamScore}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
          {title}
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-bold text-indigo-200 mt-1.5 leading-relaxed">
          {tagline}
        </p>

        {/* Price Box with Tanglish / Tamil anchor */}
        <div className="mt-4 p-4 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-sm flex items-baseline justify-between shadow-inner">
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                ₹{bundle.price}
              </span>
              <span className="text-sm font-bold text-indigo-300 line-through">
                ₹{bundle.originalPrice}
              </span>
              <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#FF4D00] text-white shadow-xs">
                {bundle.savingsPercent}% OFF
              </span>
            </div>
            <span className="text-xs text-yellow-200 font-bold block mt-1">
              {lang === 'tanglish'
                ? (bundle.price <= 49 ? '🍧 Less than 1 plate Madurai Famous Jigarthanda!' : '👑 All Subjects Pass + Direct Doubt Help')
                : (bundle.price <= 49 ? '🍧 ஒரு தட்டு ஜிகர்தண்டா செலவு மட்டுமே!' : '👑 அனைத்து பாடங்கள் + நேரடி உதவி')}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-black text-yellow-300 block">
              1-Time UPI
            </span>
            <span className="text-[10px] font-bold text-indigo-200 block">
              Google Drive
            </span>
          </div>
        </div>

        {/* Feature List */}
        <div className="mt-4 space-y-2">
          {bundle.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-indigo-100">
              <div className="w-5 h-5 rounded-full bg-yellow-300 text-black flex items-center justify-center shrink-0 mt-0.5 font-black shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="leading-snug">{feat}</span>
            </div>
          ))}
        </div>

        {/* Bundle Meta Numbers */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-indigo-200">
          <span>📁 {bundle.totalPdfs} Drive PDFs</span>
          <span>🎯 {bundle.totalQuestions}+ Solved Questions</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative z-10 mt-5 space-y-2.5">
        {isUnlocked ? (
          <div className="p-3.5 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-yellow-300 font-black text-xs">
              <Unlock className="w-4 h-4 shrink-0" />
              <span>Unlocked!</span>
            </div>
            <a
              href={bundle.driveFolderLink || "https://drive.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-yellow-300 text-black font-black text-xs hover:bg-yellow-200 shadow-sm flex items-center gap-1.5"
            >
              <span>Open Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <>
            {/* Primary Buy Button */}
            <button
              onClick={() => onBuy(bundle)}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl bg-[#FFBB00] hover:bg-[#F59E0B] text-black font-black text-sm shadow-[0_4px_0_#B45309] active:translate-y-1 active:shadow-none transition-all min-h-[48px]"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>
                {lang === 'tanglish'
                  ? `Unlock ${bundle.tier === 'ultra_pro' ? 'Ultra Pro VIP' : 'Pro Booster'} • ₹${bundle.price}`
                  : `ப்ரோ தொகுப்பை பெறுக • ₹${bundle.price}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Sneak Peek Button */}
            <button
              onClick={() => onPreviewSample(bundle)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/30 min-h-[42px]"
            >
              <Eye className="w-3.5 h-3.5 text-yellow-300" />
              <span>
                {lang === 'tanglish'
                  ? 'Free Sneak-Peek (Inspect 3 Sample Pages)'
                  : 'இலவச மாதிரி பக்கங்களை பாருங்கள் (3 பக்கங்கள்)'}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

