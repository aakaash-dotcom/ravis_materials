import React from 'react';
import { Sparkles, MapPin, Phone, Sliders, BookOpen, Layers, Trophy, Plus } from 'lucide-react';
import { AppPage, Language, TutorConfig } from '../types';

interface NavbarProps {
  config: TutorConfig;
  lang: Language;
  setLang: (l: Language) => void;
  currentPage: AppPage;
  setCurrentPage?: (page: AppPage) => void;
  onNavigate?: (page: AppPage) => void;
  onOpenSettings: () => void;
  onOpenCalculator?: () => void;
  onOpenAddPdf?: () => void;
  unlockedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  lang,
  setLang,
  currentPage,
  setCurrentPage,
  onNavigate,
  onOpenSettings,
  onOpenCalculator,
  onOpenAddPdf,
  unlockedCount,
}) => {
  const navigate = (page: AppPage) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    } else if (onNavigate) {
      onNavigate(page);
    }
  };
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-[#FFBB00] shadow-sm">
      {/* Top micro banner for Madurai Trust */}
      <div className="bg-[#FEF3C7] border-b border-[#FDE68A] px-3 sm:px-4 py-1.5 text-center text-[11px] sm:text-xs font-bold text-[#92400E] flex items-center justify-center gap-1.5 sm:gap-2">
        <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
        <span>
          {lang === 'tanglish' 
            ? 'K.Pudur, Madurai (Opp. Mary Ann School) • 26+ Years Board Exam Trust'
            : 'கே.புதூர், மதுரை (மேரி ஆன் பள்ளி எதிரில்) • 26 ஆண்டு சாதனை'}
        </span>
        <span className="hidden sm:inline-block text-[#D97706]">•</span>
        <span className="hidden sm:inline-block text-[#047857] font-black">5000+ Students Mentored</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand logo & tagline with ravistuition.in badge */}
        <div 
          onClick={() => navigate('study')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF4D00] rounded-2xl flex items-center justify-center rotate-3 shadow-md hover:rotate-6 transition-transform shrink-0 border-2 border-black/10">
            <span className="text-white font-black text-xl sm:text-2xl">R</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-base sm:text-xl tracking-tight leading-none text-[#1F2937]">
                {config.centreName}
              </h1>
              <span className="hidden md:inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-900 border border-yellow-300">
                Since 1999
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-[#FF4D00] tracking-wide mt-0.5 flex items-center gap-1.5">
              <span>ravistuition.in</span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-gray-500 font-semibold hidden sm:inline">10th & 12th Board Hub</span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#FFFBEB] p-1 rounded-2xl border-2 border-amber-200">
          <button
            onClick={() => navigate('study')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              currentPage === 'study'
                ? 'bg-[#FF4D00] text-white shadow-sm'
                : 'text-gray-700 hover:text-black hover:bg-amber-100/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'tanglish' ? 'Free Study Hub' : 'இலவச பாடங்கள்'}</span>
          </button>

          <button
            onClick={() => navigate('pricing')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              currentPage === 'pricing'
                ? 'bg-[#FF4D00] text-white shadow-sm'
                : 'text-gray-700 hover:text-black hover:bg-amber-100/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'tanglish' ? 'Plans & Pricing (₹49+)' : 'கட்டணத் திட்டம்'}</span>
            <span className="bg-[#FFBB00] text-black text-[9px] font-black px-1.5 py-0.2 rounded-md">
              PRO
            </span>
          </button>

          <button
            onClick={() => navigate('calculator')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              currentPage === 'calculator'
                ? 'bg-[#FF4D00] text-white shadow-sm'
                : 'text-gray-700 hover:text-black hover:bg-amber-100/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'tanglish' ? '95+ Marks Calculator' : 'மதிப்பெண் திட்டம்'}</span>
          </button>

          <button
            onClick={() => navigate('trust')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              currentPage === 'trust'
                ? 'bg-[#FF4D00] text-white shadow-sm'
                : 'text-gray-700 hover:text-black hover:bg-amber-100/50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{lang === 'tanglish' ? 'Madurai Results' : 'வெற்றிச் சான்றுகள்'}</span>
          </button>
        </nav>

        {/* Action Controls: 2-Language Toggle strictly + WhatsApp + Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Language Switcher: ONLY TWO LANGUAGES (Tanglish & Tamil) */}
          <div className="flex items-center bg-[#FFFBEB] border-2 border-amber-200 rounded-2xl p-0.5 text-xs font-bold">
            <button
              onClick={() => setLang('tanglish')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all ${
                lang === 'tanglish'
                  ? 'bg-[#FFBB00] text-black shadow font-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Tanglish
            </button>
            <button
              onClick={() => setLang('tamil')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all ${
                lang === 'tamil'
                  ? 'bg-[#FFBB00] text-black shadow font-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* WhatsApp Direct Help */}
          <a
            href={`https://wa.me/${(config?.whatsappNumber || '919842145890').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              "Vanakkam Ravi Sir! I visited ravistuition.in. Need study guidance for board exams."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2 rounded-2xl font-black text-xs shadow-sm hover:scale-105 transition-transform"
          >
            <Phone className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Fast Add PDF for Tutor */}
          {onOpenAddPdf && (
            <button
              onClick={onOpenAddPdf}
              className="flex items-center gap-1 bg-[#0F9D58] hover:bg-[#0c8249] text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-black text-xs shadow-xs transition-colors"
              title="Add New PDF Drive Link"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add PDF</span>
            </button>
          )}

          {/* Settings / Tutor admin */}
          <button
            onClick={onOpenSettings}
            className="p-2 sm:p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-slate-700 hover:text-black transition-colors"
            title="Tutor Control Panel (Change UPI / Phone / Drive links)"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

