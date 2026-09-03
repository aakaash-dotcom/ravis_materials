import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Star, MessageCircle, ShoppingBag } from 'lucide-react';
import { ClassLevel, Language, PremiumBundle, TutorConfig } from '../types';
import { DEFAULT_TUTOR_CONFIG } from '../data/mockData';
import { EcommerceProductCard } from './EcommerceProductCard';

interface PricingPlansViewProps {
  lang: Language;
  bundles: PremiumBundle[];
  onSelectBundle: (bundle: PremiumBundle) => void;
  config?: TutorConfig;
  unlockedBundleIds?: string[];
  onPreviewSample?: (bundle: PremiumBundle) => void;
  onAddToCart?: (bundle: PremiumBundle) => void;
  cartItemIds?: string[];
  initialClass?: ClassLevel;
  onOpenCart?: () => void;
}

export const PricingPlansView: React.FC<PricingPlansViewProps> = ({
  lang,
  bundles,
  onSelectBundle,
  config = DEFAULT_TUTOR_CONFIG,
  unlockedBundleIds = [],
  onPreviewSample,
  onAddToCart,
  cartItemIds = [],
  initialClass = '12th',
  onOpenCart,
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(initialClass);

  // Filter bundles for selected class
  const classBundles = bundles.filter((b) => b.classLevel === selectedClass);

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 text-[#1F2937]">
      {/* Header Banner: Clean, high-impact, visual */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4 sm:p-5 text-center shadow-xs space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#FF4D00] text-xs font-black uppercase tracking-wider border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 fill-[#FF4D00]" />
          <span>Centum Booster Store • From ₹39</span>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Score 95+ with Ravi Sir's Special Centum Books
        </h2>
        
        <p className="text-xs sm:text-sm font-bold text-gray-600 max-w-xl mx-auto">
          Exam hall-la twist questions vantha enna panrathu? Download model answers + examiner step marking blueprints.
        </p>

        {/* Class Switcher Tabs (9th, 10th, 11th, 12th) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-2 flex-wrap">
          {(['12th', '11th', '10th', '9th'] as ClassLevel[]).map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                selectedClass === cls
                  ? 'bg-[#FF4D00] text-white shadow-xs scale-105'
                  : 'bg-amber-50 text-gray-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {cls} Standard
            </button>
          ))}
        </div>
      </div>

      {/* Visual E-Commerce Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {classBundles.map((bundle) => {
          const isUnlocked = unlockedBundleIds.includes(bundle.id);
          const isInCart = cartItemIds.includes(bundle.id);
          return (
            <EcommerceProductCard
              key={bundle.id}
              bundle={bundle}
              lang={lang}
              isUnlocked={isUnlocked}
              isInCart={isInCart}
              onPreviewSample={onPreviewSample || (() => {})}
              onAddToCart={onAddToCart || (() => {})}
              onBuyNow={onSelectBundle}
            />
          );
        })}
      </div>

      {/* Empty State if no bundles for that class */}
      {classBundles.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-amber-300 p-8 text-center space-y-2">
          <p className="text-sm font-black text-slate-800">
            More Centum Packs for {selectedClass} Standard coming soon!
          </p>
          <p className="text-xs text-gray-500">
            Check out 10th and 12th standard packs or open free PDFs.
          </p>
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <div className="bg-white rounded-2xl border-2 border-emerald-300 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-sm">
              100% Verified by Ravi Sir (26+ Years Experience)
            </h4>
            <p className="text-gray-600 font-bold">
              Instant Google Drive folder access directly to your phone + direct WhatsApp support.
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/${(config.whatsappNumber || '919842145890').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            "Vanakkam Ravi Sir! I have a question about Centum Packs on ravistuition.in"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black shrink-0 flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask Ravi Sir on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
