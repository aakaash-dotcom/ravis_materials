import React from 'react';
import { Sparkles, MapPin, BookOpen, Layers, Clock, Lock, MessageCircle, ShoppingBag, GraduationCap } from 'lucide-react';
import { AppPage, ClassLevel, Language, TutorConfig } from '../types';

interface NavbarProps {
  config: TutorConfig;
  lang: Language;
  setLang: (l: Language) => void;
  currentPage: AppPage;
  setCurrentPage?: (page: AppPage) => void;
  onNavigate?: (page: AppPage) => void;
  onOpenSettings?: () => void;
  onOpenTutorAdmin?: () => void;
  unlockedCount?: number;
  selectedClass?: ClassLevel | null;
  onChangeClass?: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  lang,
  setLang,
  currentPage,
  setCurrentPage,
  onNavigate,
  onOpenTutorAdmin,
  selectedClass,
  onChangeClass,
  cartCount = 0,
  onOpenCart,
}) => {
  const navigate = (page: AppPage) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    } else if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b-2 border-amber-300 shadow-xs">
      {/* Micro Madurai Top Strip */}
      <div className="bg-[#FEF3C7] border-b border-[#FDE68A] px-3 py-1 text-center text-[10px] sm:text-xs font-bold text-[#92400E] flex items-center justify-center gap-2">
        <MapPin className="w-3 h-3 text-[#D97706] shrink-0" />
        <span>K.Pudur, Madurai • 26+ Years Board Exam Trust</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline text-emerald-800 font-black">5000+ Centum Mentored</span>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <div 
            onClick={() => navigate('study')}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-[#FF4D00] rounded-xl flex items-center justify-center font-black text-white text-base shadow-xs cursor-pointer select-none"
          >
            R
          </div>
          <div 
            onClick={() => navigate('study')}
            className="cursor-pointer select-none"
          >
            <h1 className="font-black text-xs sm:text-sm text-slate-900 leading-tight">
              {config.centreName}
            </h1>
            <p className="text-[10px] font-bold text-[#FF4D00] leading-none">
              ravistuition.in
            </p>
          </div>

          {/* Current Class Badge / Switcher */}
          {selectedClass && onChangeClass && (
            <button
              onClick={onChangeClass}
              className="ml-1 px-2 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-[10px] sm:text-xs font-black flex items-center gap-1 transition-colors"
              title="Click to change class"
            >
              <GraduationCap className="w-3 h-3 text-amber-700" />
              <span>{selectedClass} Std</span>
              <span className="text-[9px] text-amber-700 font-bold hidden sm:inline">(Change)</span>
            </button>
          )}
        </div>

        {/* Clean Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
          <button
            onClick={() => navigate('study')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              currentPage === 'study'
                ? 'bg-[#0F9D58] text-white shadow-xs'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            Free PDFs
          </button>

          <button
            onClick={() => navigate('pricing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
              currentPage === 'pricing'
                ? 'bg-[#FF4D00] text-white shadow-xs'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            <span>Centum Store</span>
            <span className="text-[9px] bg-yellow-300 text-yellow-950 px-1 rounded font-black">
              ₹49
            </span>
          </button>

          <button
            onClick={() => navigate('tools')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              currentPage === 'tools' || currentPage === 'calculator'
                ? 'bg-[#FF4D00] text-white shadow-xs'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            Exam Tools
          </button>
        </nav>

        {/* Right Actions: Cart + WhatsApp + Tutor Admin */}
        <div className="flex items-center gap-1.5">
          {/* E-Commerce Cart Icon Button */}
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-slate-800 border border-amber-300 transition-colors flex items-center gap-1 text-xs font-black"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF4D00] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${(config.whatsappNumber || '919842145890').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              "Vanakkam Ravi Sir! I visited ravistuition.in and have a study question."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-[11px] font-black transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Discreet Tutor Portal Link */}
          <button
            onClick={() => navigate('tutor')}
            title="Tutor Admin Portal (Private)"
            className="p-1.5 rounded-xl text-gray-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
