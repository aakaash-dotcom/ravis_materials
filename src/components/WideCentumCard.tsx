import React from 'react';
import { ShoppingCart, Zap, Eye, CheckCircle2, Star, BookOpen, ShieldCheck, FileText } from 'lucide-react';
import { PremiumBundle, Language } from '../types';

interface WideCentumCardProps {
  bundle: PremiumBundle;
  lang: Language;
  onPreviewSample: (bundle: PremiumBundle) => void;
  onAddToCart: (bundle: PremiumBundle) => void;
  onBuyNow: (bundle: PremiumBundle) => void;
  isInCart: boolean;
  isUnlocked: boolean;
}

export const WideCentumCard: React.FC<WideCentumCardProps> = ({
  bundle,
  lang,
  onPreviewSample,
  onAddToCart,
  onBuyNow,
  isInCart,
  isUnlocked,
}) => {
  const titleText = lang === 'tamil' && bundle.tamilTitle 
    ? bundle.tamilTitle 
    : bundle.title;

  // Clean 3 high-impact points (Strictly points 1, 2, and 3 only - left-aligned)
  const getThreePoints = () => {
    if (bundle.features && bundle.features.length >= 3) {
      return bundle.features.slice(0, 3);
    }
    // Fallback specific points if not enough features
    return [
      'Top solved Compulsory 2-Mark & 5-Mark questions with step marking rubrics',
      'Repeated 10-year public exam twist models with presentation tips',
      'Complete formula handbook & examiner key points for Centum (100/100)'
    ];
  };

  const points = getThreePoints();

  // Color theme for A4 sample sheet top header accent based on subject
  const getSubjectColor = () => {
    if (bundle.subjects.includes('Maths')) return {
      primary: '#1D4ED8', // Royal Blue
      headerBg: 'bg-blue-700',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
      borderAccent: 'border-blue-500',
    };
    if (bundle.subjects.includes('Science') || bundle.subjects.includes('Biology')) return {
      primary: '#047857', // Emerald
      headerBg: 'bg-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      borderAccent: 'border-emerald-500',
    };
    if (bundle.subjects.includes('Physics') || bundle.subjects.includes('Chemistry')) return {
      primary: '#7C3AED', // Violet/Purple
      headerBg: 'bg-violet-800',
      badgeBg: 'bg-violet-50 text-violet-800 border-violet-200',
      borderAccent: 'border-violet-500',
    };
    if (bundle.subjects.includes('Economics') || bundle.subjects.includes('Commerce')) return {
      primary: '#B45309', // Amber/Teal
      headerBg: 'bg-teal-800',
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
      borderAccent: 'border-teal-500',
    };
    return {
      primary: '#DC2626', // Crimson/Red
      headerBg: 'bg-rose-800',
      badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
      borderAccent: 'border-rose-500',
    };
  };

  const subjectStyle = getSubjectColor();
  const savingsAmount = bundle.originalPrice - bundle.price;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all p-3.5 sm:p-4 my-2.5">
      <div className="flex flex-col md:flex-row items-start gap-4 lg:gap-5">
        
        {/* =========================================================
            LEFT: AUTHENTIC A4 SIZE SAMPLE PAGE (ISO 216 RATIO 1:1.414)
            ========================================================= */}
        <div className="shrink-0 flex flex-col items-center self-center md:self-start">
          <div
            onClick={() => onPreviewSample(bundle)}
            title="Click to view full A4 sample page"
            className="cursor-pointer group relative w-32 sm:w-36 aspect-[1/1.414] bg-white rounded-md border border-slate-300 shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition-all overflow-hidden flex flex-col justify-between p-2 select-none"
          >
            {/* Real Paper Binding & Spine Shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-slate-400/30 via-slate-200/20 to-transparent pointer-events-none" />

            {/* A4 Top Header Strip */}
            <div>
              <div className={`${subjectStyle.headerBg} text-white rounded px-1.5 py-0.5 flex items-center justify-between`}>
                <span className="text-[7.5px] font-black tracking-wider uppercase">
                  TN BOARD 2026
                </span>
                <span className="text-[7px] font-bold bg-white/20 px-1 rounded">
                  {bundle.classLevel}
                </span>
              </div>
              <div className="text-[7px] text-slate-500 font-bold uppercase tracking-tight text-center mt-1 border-b border-slate-200 pb-0.5">
                Ravi's Tuition • Madurai
              </div>
            </div>

            {/* A4 Document Body: Authentic Academic Content Snippet */}
            <div className="my-auto px-1 text-left space-y-1">
              <div className="text-[8.5px] font-black text-slate-900 leading-tight line-clamp-2">
                {titleText}
              </div>
              
              {/* Mock solved question lines (looks like real printed A4 sample) */}
              <div className="space-y-0.5 pt-0.5 border-t border-dashed border-slate-200">
                <div className="h-1 bg-slate-300 rounded w-full" />
                <div className="h-1 bg-slate-200 rounded w-5/6" />
                <div className="flex items-center gap-1 pt-0.5">
                  <span className="text-[6.5px] font-extrabold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    Step Mark: 5/5
                  </span>
                </div>
                <div className="h-1 bg-slate-200 rounded w-4/6" />
              </div>
            </div>

            {/* A4 Document Footer with Gold Centum Seal & Page Indicator */}
            <div className="pt-1 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[7px] font-black text-slate-600">
                📄 A4 Guide ({bundle.totalPdfs} PDFs)
              </span>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 border border-amber-400 text-stone-900 flex flex-col items-center justify-center text-[5px] font-black leading-none shadow-xs">
                <span>100</span>
              </div>
            </div>

            {/* Hover overlay with Look Inside */}
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-1 text-center">
              <Eye className="w-5 h-5 text-amber-300 mb-1" />
              <span className="text-[10px] font-black leading-tight">
                Look Inside
              </span>
              <span className="text-[8px] text-slate-200 font-medium">
                A4 Sample Page
              </span>
            </div>
          </div>

          {/* Quick preview trigger link */}
          <button
            onClick={() => onPreviewSample(bundle)}
            className="mt-1.5 text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <BookOpen className="w-3 h-3 text-blue-600" />
            <span>Preview Sample</span>
          </button>
        </div>

        {/* =========================================================
            MIDDLE: STRICTLY LEFT-ALIGNED DETAILS & POINTS 1, 2, 3
            ========================================================= */}
        <div className="flex-1 w-full text-left space-y-2">
          
          {/* Top Badges & Ratings: Professional E-Commerce Hierarchy */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${subjectStyle.badgeBg}`}>
              Centum Booster Guide
            </span>
            <div className="flex items-center gap-1 text-slate-700 text-xs font-semibold">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              </div>
              <span className="font-black text-slate-900 text-xs">4.9</span>
              <span className="text-slate-500 text-[11px]">(1,240+ students)</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified by Ravi Sir
            </span>
          </div>

          {/* Book Title */}
          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {titleText}
          </h3>

          {/* STRICTLY POINTS 1, 2, AND 3 ONLY (Clean, Left-Aligned, No Unwanted Paragraphs) */}
          <div className="space-y-1.5 pt-0.5">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2 text-left">
                <span className="w-4 h-4 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>

          {/* Format indicator */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3 text-slate-400" /> Printable A4 PDF Format
            </span>
            <span>•</span>
            <span>Instant Google Drive Access</span>
            <span>•</span>
            <span>Lifetime Validity</span>
          </div>
        </div>

        {/* =========================================================
            RIGHT: PROFESSIONAL E-COMMERCE PRICING & OFFER BOX
            ========================================================= */}
        <div className="shrink-0 w-full md:w-56 flex flex-col justify-between self-stretch bg-slate-50/70 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-left">
          
          {/* Price & Offer Breakdown */}
          <div className="space-y-1 pb-2 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wide">
                Special Offer
              </span>
              <span className="text-xs font-black bg-rose-500 text-white px-2 py-0.5 rounded shadow-2xs animate-pulse">
                {bundle.savingsPercent}% OFF
              </span>
            </div>

            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                ₹{bundle.price}
              </span>
              <span className="text-xs text-slate-400 line-through font-bold">
                ₹{bundle.originalPrice}
              </span>
            </div>

            <p className="text-[11px] font-bold text-emerald-700">
              You Save ₹{savingsAmount} ({bundle.savingsPercent}% Discount)
            </p>
          </div>

          {/* Delivery & Security Note */}
          <div className="py-2 text-[10.5px] text-slate-600 font-medium space-y-0.5">
            <div className="flex items-center gap-1 text-emerald-700 font-bold">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>Instant Digital Delivery</span>
            </div>
            <p className="text-slate-500">
              Direct Drive Folder link sent on payment
            </p>
          </div>

          {/* Action Buttons: E-Commerce Style */}
          <div className="pt-1 space-y-2">
            {isUnlocked ? (
              <button
                onClick={() => window.open(bundle.driveFolderLink || 'https://drive.google.com', '_blank')}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-98"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Unlocked! Open Drive</span>
              </button>
            ) : (
              <>
                {/* Buy Now (High Intent Button) */}
                <button
                  onClick={() => onBuyNow(bundle)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Buy Now • ₹{bundle.price}</span>
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(bundle)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-black border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isInCart
                      ? 'bg-amber-100 text-amber-950 border-amber-400'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-slate-600" />
                  <span>{isInCart ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                </button>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
