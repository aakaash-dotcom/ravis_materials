import React from 'react';
import { ShoppingCart, Zap, Eye, Star, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { PremiumBundle, Language } from '../types';

interface EcommerceProductCardProps {
  bundle: PremiumBundle;
  lang: Language;
  onPreviewSample: (bundle: PremiumBundle) => void;
  onAddToCart: (bundle: PremiumBundle) => void;
  onBuyNow: (bundle: PremiumBundle) => void;
  isInCart: boolean;
  isUnlocked: boolean;
}

export const EcommerceProductCard: React.FC<EcommerceProductCardProps> = ({
  bundle,
  lang,
  onPreviewSample,
  onAddToCart,
  onBuyNow,
  isInCart,
  isUnlocked,
}) => {
  // Generate realistic book cover themes based on subject
  const getCoverGradient = () => {
    if (bundle.subjects.includes('Economics')) {
      return 'from-emerald-800 via-teal-900 to-slate-900 border-emerald-500';
    }
    if (bundle.subjects.includes('Maths') && bundle.classLevel === '10th') {
      return 'from-amber-700 via-orange-800 to-stone-900 border-amber-500';
    }
    if (bundle.subjects.includes('Maths')) {
      return 'from-blue-900 via-indigo-950 to-slate-900 border-blue-500';
    }
    if (bundle.subjects.includes('Physics') || bundle.subjects.includes('Chemistry')) {
      return 'from-purple-900 via-violet-950 to-slate-900 border-purple-500';
    }
    return 'from-red-800 via-amber-900 to-stone-900 border-yellow-500';
  };

  const titleText = lang === 'tamil' && bundle.tamilTitle 
    ? bundle.tamilTitle 
    : bundle.title;

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex flex-col justify-between gap-3 text-[#1F2937]">
      {/* Visual Product Display (Realistic Book Mockup) */}
      <div className="relative group">
        {/* Book Container with 3D spine and shadow */}
        <div
          onClick={() => onPreviewSample(bundle)}
          className={`cursor-pointer w-full h-44 sm:h-48 rounded-xl bg-gradient-to-br ${getCoverGradient()} p-3 text-white border-2 shadow-md relative overflow-hidden flex flex-col justify-between select-none transition-transform group-hover:scale-[1.02]`}
        >
          {/* Simulated Left Book Spine Crease */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-white/15 border-r border-black/30 pointer-events-none" />

          {/* Top Header of the Book */}
          <div className="pl-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-wider bg-black/40 px-1.5 py-0.5 rounded text-amber-300 border border-amber-400/30">
                TN BOARD 2026
              </span>
              <span className="text-[9px] font-black bg-white/20 px-1.5 py-0.5 rounded">
                {bundle.classLevel}
              </span>
            </div>
            <div className="text-[10px] font-bold text-amber-200 tracking-tight">
              RAVI'S TUITION CENTRE • MADURAI
            </div>
          </div>

          {/* Middle Title Graphic */}
          <div className="pl-3 my-auto">
            <h3 className="text-sm sm:text-base font-black text-white leading-tight drop-shadow-sm line-clamp-2">
              {titleText}
            </h3>
            <p className="text-[10px] text-amber-100/90 font-bold mt-0.5">
              {bundle.tagline}
            </p>
          </div>

          {/* Bottom Book Badges & Examiner Seal */}
          <div className="pl-3 flex items-end justify-between">
            <div className="space-y-0.5">
              <span className="inline-block text-[9px] font-black bg-amber-400 text-stone-950 px-1.5 py-0.5 rounded">
                {bundle.totalPdfs} High-Yield PDFs
              </span>
              <div className="text-[9px] text-white/80 font-bold">
                {bundle.totalQuestions}+ Golden Questions
              </div>
            </div>

            {/* Gold Seal Graphic */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 border border-yellow-200 text-stone-900 flex flex-col items-center justify-center text-[7px] font-black leading-none shadow-xs text-center p-0.5">
              <Sparkles className="w-2.5 h-2.5 text-stone-900 mb-0.5" />
              <span>CENTUM</span>
              <span>KEY</span>
            </div>
          </div>

          {/* Quick Look Inside Overlay Banner on Hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white text-slate-900 px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md">
              <Eye className="w-4 h-4 text-[#FF4D00]" />
              <span>Click to Look Inside</span>
            </div>
          </div>
        </div>

        {/* Look Inside link below cover for mobile visibility */}
        <div className="mt-1.5 flex items-center justify-between text-[11px]">
          <button
            onClick={() => onPreviewSample(bundle)}
            className="text-amber-800 font-extrabold flex items-center gap-1 hover:underline"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Look Inside Sample</span>
          </button>
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-black text-slate-700">4.9 (380+ sold)</span>
          </div>
        </div>
      </div>

      {/* Product Title & Features */}
      <div className="space-y-1.5">
        <h4 className="text-sm font-black text-slate-900 leading-snug">
          {bundle.title}
        </h4>
        <p className="text-[11px] text-gray-600 font-medium line-clamp-2">
          {bundle.description}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {bundle.features.slice(0, 2).map((feat, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold bg-amber-50 text-amber-900 px-1.5 py-0.5 rounded border border-amber-200"
            >
              ✓ {feat.split('with')[0]}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing and E-Commerce CTA Buttons */}
      <div className="space-y-2 pt-1 border-t border-gray-100">
        {/* Price Row */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-[#FF4D00]">
              ₹{bundle.price}
            </span>
            <span className="text-xs text-gray-400 line-through font-bold">
              ₹{bundle.originalPrice}
            </span>
          </div>
          <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded">
            {bundle.savingsPercent}% OFF
          </span>
        </div>

        {/* E-Commerce Buttons */}
        {isUnlocked ? (
          <button
            onClick={() => window.open(bundle.driveFolderLink || 'https://drive.google.com', '_blank')}
            className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Unlocked! Open Google Drive</span>
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onAddToCart(bundle)}
              className={`py-2 px-2 rounded-xl text-xs font-black border transition-all flex items-center justify-center gap-1 ${
                isInCart
                  ? 'bg-amber-100 text-amber-900 border-amber-400'
                  : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-700" />
              <span>{isInCart ? 'In Cart ✓' : 'Add to Cart'}</span>
            </button>

            <button
              onClick={() => onBuyNow(bundle)}
              className="py-2 px-2 rounded-xl bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-black flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
