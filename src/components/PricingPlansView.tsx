import React, { useState } from 'react';
import { Check, X, Sparkles, ShieldCheck, Zap, ArrowRight, Star, HelpCircle, Phone, Award, BookOpen } from 'lucide-react';
import { ClassLevel, Language, PremiumBundle, TutorConfig } from '../types';
import { DEFAULT_TUTOR_CONFIG } from '../data/mockData';

interface PricingPlansViewProps {
  lang: Language;
  bundles: PremiumBundle[];
  onSelectBundle: (bundle: PremiumBundle) => void;
  config?: TutorConfig;
  onGoToStudy?: () => void;
  unlockedBundleIds?: string[];
  onPreviewSample?: (bundle: PremiumBundle) => void;
}

export const PricingPlansView: React.FC<PricingPlansViewProps> = ({
  lang,
  bundles,
  onSelectBundle,
  config = DEFAULT_TUTOR_CONFIG,
  onGoToStudy,
  unlockedBundleIds = [],
  onPreviewSample,
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('10th');

  // Filter bundles by class
  const classBundles = bundles.filter((b) => b.classLevel === selectedClass);
  const proBundle = classBundles.find((b) => b.tier === 'pro') || classBundles[0];
  const ultraBundle = classBundles.find((b) => b.tier === 'ultra_pro') || classBundles[classBundles.length - 1];

  const comparisonFeatures = [
    {
      title: lang === 'tanglish' ? 'Basic Chapter Formula Sheets' : 'அடிப்படை சூத்திரத் தாள்கள்',
      free: true,
      pro: true,
      ultra: true,
    },
    {
      title: lang === 'tanglish' ? '1 Previous Year Question Paper' : '1 முந்தைய ஆண்டு வினாத்தாள்',
      free: true,
      pro: true,
      ultra: true,
    },
    {
      title: lang === 'tanglish' ? 'Direct Google Drive 1-Tap Download' : 'கூகுள் டிரைவ் நேரடி பதிவிறக்கம்',
      free: true,
      pro: true,
      ultra: true,
    },
    {
      title: lang === 'tanglish' ? '25 Hidden Board Twist Questions' : '25 ரகசிய ட்விஸ்ட் வினாக்கள் & தீர்வுகள்',
      free: false,
      pro: true,
      ultra: true,
      highlight: true,
    },
    {
      title: lang === 'tanglish' ? 'Examiner Step Marking Blueprint' : 'மதிப்பெண் வழங்கும் வழிகாட்டி (Step Marks)',
      free: false,
      pro: true,
      ultra: true,
      highlight: true,
    },
    {
      title: lang === 'tanglish' ? 'Guaranteed Compulsory 2M & 5M Models' : 'கட்டாய 2 & 5 மதிப்பெண் மாதிரி வினாக்கள்',
      free: false,
      pro: true,
      ultra: true,
    },
    {
      title: lang === 'tanglish' ? 'All-Subjects Master Question Bank' : 'அனைத்து பாடங்கள் வினா வங்கி',
      free: false,
      pro: false,
      ultra: true,
    },
    {
      title: lang === 'tanglish' ? '5 Predicted Model Papers with Solutions' : '5 கணிக்கப்பட்ட மாதிரி வினாத்தாள்கள்',
      free: false,
      pro: false,
      ultra: true,
    },
    {
      title: lang === 'tanglish' ? 'Direct WhatsApp Doubt Help with Ravi Sir' : 'ரவி சாரின் நேரடி வாட்ஸ்அப் உதவி',
      free: false,
      pro: false,
      ultra: true,
      highlight: true,
    },
    {
      title: lang === 'tanglish' ? 'Complete Google Drive VIP Vault' : 'முழுமையான கூகுள் டிரைவ் வி.ஐ.பி போல்டர்',
      free: false,
      pro: true,
      ultra: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 animate-in fade-in duration-300">
      {/* Header & Marketing Hook */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-200 text-yellow-900 border border-yellow-300 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4D00]" />
          <span>{lang === 'tanglish' ? 'Simple, Transparent & Fair Pricing' : 'வெளிப்படையான கட்டணத் திட்டங்கள்'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1F2937]">
          {lang === 'tanglish' ? (
            <>
              Jigarthanda Vilaila <span className="text-[#FF4D00]">Centum Blueprint!</span> 🍧
            </>
          ) : (
            <>
              ஒரு தட்டு ஜிகர்தண்டா விலையில் <span className="text-[#FF4D00]">சென்டம் ப்ளூபிரிண்ட்!</span>
            </>
          )}
        </h2>

        <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed">
          {lang === 'tanglish'
            ? 'No subscriptions. No recurring fees. One-time Google Drive access directly on WhatsApp & phone via instant UPI.'
            : 'மாதக் கட்டணம் எதுவும் இல்லை. ஒரு முறை கூகுள் டிரைவ் நேரடி அனுமதி.'}
        </p>

        {/* Class Filter Toggle */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex bg-white p-1 rounded-2xl border-2 border-amber-200 shadow-sm">
            <button
              onClick={() => setSelectedClass('10th')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                selectedClass === '10th'
                  ? 'bg-[#FFBB00] text-black shadow-md border-2 border-[#B45309]'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              10th Board (SSLC)
            </button>
            <button
              onClick={() => setSelectedClass('12th')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                selectedClass === '12th'
                  ? 'bg-[#FFBB00] text-black shadow-md border-2 border-[#B45309]'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              12th Board (HSE)
            </button>
          </div>
        </div>
      </div>

      {/* 3 Tier Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {/* TIER 1: FREE FOREVER */}
        <div className="bg-white border-2 border-slate-300 rounded-[2.5rem] p-6 sm:p-7 flex flex-col justify-between shadow-sm relative hover:border-amber-400 transition-colors">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-black tracking-wider uppercase text-gray-500 block">
                {lang === 'tanglish' ? 'Tier 1' : 'நிலை 1'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] mt-0.5">
                Free Forever
              </h3>
              <p className="text-xs text-gray-600 font-medium mt-1">
                {lang === 'tanglish'
                  ? 'Basic formulas & 1 model question paper to start your preparation.'
                  : 'அடிப்படை சூத்திரங்கள் மற்றும் 1 மாதிரி வினாத்தாள்.'}
              </p>
            </div>

            <div className="py-2 border-y border-slate-100 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#1F2937]">₹0</span>
              <span className="text-xs font-bold text-emerald-600">/ 100% Free Forever</span>
            </div>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-gray-700 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Single Chapter Formula Sheets</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 Previous Year Public Exam Paper</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant Google Drive Direct Links</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-gray-300 shrink-0" />
                <span className="line-through">Hidden Twist Questions</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-gray-300 shrink-0" />
                <span className="line-through">Examiner Step-Marking Scheme</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-gray-300 shrink-0" />
                <span className="line-through">WhatsApp Doubt Support</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              onClick={onGoToStudy}
              className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#1F2937] font-black text-xs transition-colors"
            >
              {lang === 'tanglish' ? 'Browse Free Material (₹0)' : 'இலவச பாடங்கள் பதிவிறக்குங்கள்'}
            </button>
          </div>
        </div>

        {/* TIER 2: PRO BOOSTER (HIGH CONVERSION BESTSELLER) */}
        <div className="bg-[#FFFBEB] border-4 border-[#FF4D00] rounded-[2.5rem] p-6 sm:p-7 flex flex-col justify-between shadow-[8px_8px_0px_#FF4D00] relative scale-100 md:scale-105 z-10">
          {/* Most Popular Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF4D00] text-white px-4 py-1 rounded-full text-xs font-black shadow-md uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
            <Star className="w-3.5 h-3.5 fill-white" />
            <span>{lang === 'tanglish' ? '🔥 Madurai Bestseller' : 'அதிகம் விரும்பப்படும் திட்டம்'}</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-black tracking-wider uppercase text-[#FF4D00] block">
                {lang === 'tanglish' ? 'Tier 2 • Pro Centum' : 'நிலை 2 • ப்ரோ சென்டம்'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] mt-0.5">
                {proBundle?.title || 'Pro Booster Pack'}
              </h3>
              <p className="text-xs text-gray-700 font-bold mt-1">
                {lang === 'tanglish'
                  ? 'All 25 Hidden Twist questions + Step-by-step marking rubrics.'
                  : '25 முக்கிய ட்விஸ்ட் வினாக்கள் + விடை குறிப்புகள்.'}
              </p>
            </div>

            <div className="py-2 border-y-2 border-amber-200 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#FF4D00]">
                ₹{proBundle?.price || 49}
              </span>
              <span className="text-sm font-bold text-gray-400 line-through">
                ₹{proBundle?.originalPrice || 199}
              </span>
              <span className="text-xs font-black px-2 py-0.5 bg-yellow-200 text-yellow-900 rounded-md">
                SAVE 75%
              </span>
            </div>

            {/* Price Anchor */}
            <div className="p-2.5 bg-white/80 rounded-xl border border-amber-300 text-[11px] font-black text-amber-900 flex items-center gap-2">
              <span>🍧</span>
              <span>
                {lang === 'tanglish'
                  ? 'Madurai Jigarthanda-va vida kuraivaana vilai!'
                  : 'ஒரு முறை ஜிகர்தண்டா சாப்பிடும் செலவு மட்டுமே!'}
              </span>
            </div>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-gray-900 font-black">
                <Check className="w-4 h-4 text-[#FF4D00] shrink-0 stroke-[3px]" />
                <span>25 Hidden Board Exam "Twist" Questions</span>
              </li>
              <li className="flex items-center gap-2 text-gray-900 font-black">
                <Check className="w-4 h-4 text-[#FF4D00] shrink-0 stroke-[3px]" />
                <span>Examiner Step-by-Step Marking Rubric</span>
              </li>
              <li className="flex items-center gap-2 text-gray-900 font-bold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All 8 Guaranteed Geometry & Graph Models</span>
              </li>
              <li className="flex items-center gap-2 text-gray-900 font-bold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant Google Drive Complete Folder</span>
              </li>
              <li className="flex items-center gap-2 text-gray-900 font-bold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Storage / App Cost (Printable PDFs)</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              onClick={() => proBundle && onSelectBundle(proBundle)}
              className="w-full py-4 px-4 rounded-2xl bg-[#FF4D00] hover:bg-[#E04400] text-white font-black text-sm shadow-[0_4px_0_#991B1B] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <span>Unlock Pro Booster (₹{proBundle?.price || 49})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TIER 3: ULTRA PRO CENTUM VIP */}
        <div className="bg-white border-2 border-purple-300 rounded-[2.5rem] p-6 sm:p-7 flex flex-col justify-between shadow-sm relative hover:border-purple-500 transition-colors">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-black tracking-wider uppercase text-[#7C3AED] block">
                {lang === 'tanglish' ? 'Tier 3 • VIP Master Pass' : 'நிலை 3 • வி.ஐ.பி மாஸ்டர் பாஸ்'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] mt-0.5">
                {ultraBundle?.title || 'Ultra Pro Centum Pass'}
              </h3>
              <p className="text-xs text-gray-600 font-medium mt-1">
                {lang === 'tanglish'
                  ? 'All subjects included + Direct WhatsApp Doubt Help with Ravi Sir till exam!'
                  : 'அனைத்து பாடங்களும் + தேர்வு முடியும் வரை ரவி சாரின் நேரடி வாட்ஸ்அப் உதவி.'}
              </p>
            </div>

            <div className="py-2 border-y border-slate-100 flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#7C3AED]">
                ₹{ultraBundle?.price || 99}
              </span>
              <span className="text-sm font-bold text-gray-400 line-through">
                ₹{ultraBundle?.originalPrice || 399}
              </span>
              <span className="text-xs font-black px-2 py-0.5 bg-purple-100 text-purple-900 rounded-md">
                VIP COMBO
              </span>
            </div>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-purple-950 font-black">
                <Check className="w-4 h-4 text-[#7C3AED] shrink-0 stroke-[3px]" />
                <span>All Subjects Full Question Bank</span>
              </li>
              <li className="flex items-center gap-2 text-purple-950 font-black">
                <Check className="w-4 h-4 text-[#7C3AED] shrink-0 stroke-[3px]" />
                <span>5 Predicted Full Model Question Papers</span>
              </li>
              <li className="flex items-center gap-2 text-purple-950 font-black">
                <Check className="w-4 h-4 text-[#7C3AED] shrink-0 stroke-[3px]" />
                <span>Direct WhatsApp Voice Doubt Help with Ravi Sir</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Weekly Assessment Tests via Google Drive</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complete Google Drive VIP Master Vault</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              onClick={() => ultraBundle && onSelectBundle(ultraBundle)}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Get Ultra Pro VIP (₹{ultraBundle?.price || 99})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-amber-200 pb-4">
          <div>
            <h3 className="text-lg sm:text-2xl font-black text-[#1F2937]">
              {lang === 'tanglish' ? 'Feature-by-Feature Comparison Matrix' : 'முழுமையான ஒப்பீட்டு அட்டவணை'}
            </h3>
            <p className="text-xs text-gray-600 font-semibold">
              {lang === 'tanglish' ? 'Why Pro gives you the winning edge over regular textbooks' : 'ப்ரோ திட்டம் ஏன் மிக முக்கியமானது?'}
            </p>
          </div>
          <span className="text-xs font-black text-[#047857] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 self-start sm:self-auto">
            100% Zero Gateway Extra Charges
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-xs font-black text-gray-500 uppercase">
                <th className="py-3 px-3">Feature</th>
                <th className="py-3 px-3 text-center">Free (₹0)</th>
                <th className="py-3 px-3 text-center bg-amber-50/80 rounded-t-xl text-[#FF4D00]">Pro Booster (₹49)</th>
                <th className="py-3 px-3 text-center text-purple-700">Ultra Pro VIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {comparisonFeatures.map((item, idx) => (
                <tr key={idx} className={item.highlight ? 'bg-amber-50/40 font-bold' : ''}>
                  <td className="py-3 px-3 text-gray-800 font-semibold">{item.title}</td>
                  <td className="py-3 px-3 text-center">
                    {item.free ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-3 text-center bg-amber-50/80">
                    {item.pro ? (
                      <Check className="w-4 h-4 text-[#FF4D00] stroke-[3px] mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {item.ultra ? (
                      <Check className="w-4 h-4 text-purple-600 stroke-[3px] mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust & Zero Friction Guarantee */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-black text-[#1F2937]">Direct UPI (0% Fee)</h4>
            <p className="text-[11px] text-gray-600 font-medium mt-0.5">
              GPay, PhonePe, Paytm, QR. No extra internet banking charges.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 flex items-start gap-3 shadow-xs">
          <Zap className="w-6 h-6 text-[#FF4D00] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-black text-[#1F2937]">Instant Google Drive Link</h4>
            <p className="text-[11px] text-gray-600 font-medium mt-0.5">
              Access directly on phone and Google Drive. Print anytime for exam revision.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 flex items-start gap-3 shadow-xs">
          <Phone className="w-6 h-6 text-[#7C3AED] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-black text-[#1F2937]">Madurai Center WhatsApp</h4>
            <p className="text-[11px] text-gray-600 font-medium mt-0.5">
              <a 
                href={`https://wa.me/${(config?.whatsappNumber || DEFAULT_TUTOR_CONFIG.whatsappNumber).replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#7C3AED] hover:underline"
              >
                +{config?.whatsappNumber || DEFAULT_TUTOR_CONFIG.whatsappNumber}
              </a>{' '}
              • Personal help directly from Ravi Sir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
