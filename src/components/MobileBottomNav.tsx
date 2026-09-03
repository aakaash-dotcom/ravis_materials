import React from 'react';
import { BookOpen, Layers, Sparkles, Trophy } from 'lucide-react';
import { AppPage, Language } from '../types';

interface MobileBottomNavProps {
  currentPage: AppPage;
  setCurrentPage?: (page: AppPage) => void;
  onNavigate?: (page: AppPage) => void;
  lang: Language;
  unlockedCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  setCurrentPage,
  onNavigate,
  lang,
}) => {
  const navigate = (page: AppPage) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    } else if (onNavigate) {
      onNavigate(page);
    }
  };
  const tabs = [
    {
      id: 'study' as AppPage,
      icon: BookOpen,
      labelTanglish: 'Study Hub',
      labelTamil: 'பாடங்கள்',
      badge: 'Free',
    },
    {
      id: 'pricing' as AppPage,
      icon: Layers,
      labelTanglish: 'Plans & Pro',
      labelTamil: 'திட்டங்கள்',
      badge: '₹49',
    },
    {
      id: 'calculator' as AppPage,
      icon: Sparkles,
      labelTanglish: 'Calculator',
      labelTamil: '95+ திட்டம்',
    },
    {
      id: 'trust' as AppPage,
      icon: Trophy,
      labelTanglish: 'Results',
      labelTamil: 'சான்றுகள்',
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-amber-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-2 py-1.5 safe-area-pb">
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                navigate(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 min-h-[50px] ${
                isActive
                  ? 'bg-[#FFBB00] text-black font-black shadow-sm'
                  : 'text-gray-600 hover:text-black active:bg-amber-50'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span
                    className={`absolute -top-1.5 -right-3 text-[9px] font-black px-1 py-0 rounded-full leading-tight shadow-xs ${
                      isActive
                        ? 'bg-[#FF4D00] text-white'
                        : 'bg-yellow-200 text-yellow-900 border border-yellow-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 leading-none font-bold">
                {lang === 'tanglish' ? tab.labelTanglish : tab.labelTamil}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
