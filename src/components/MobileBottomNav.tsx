import React from 'react';
import { BookOpen, Layers, Clock, ShoppingBag } from 'lucide-react';
import { AppPage, Language } from '../types';

interface MobileBottomNavProps {
  currentPage: AppPage;
  setCurrentPage?: (page: AppPage) => void;
  onNavigate?: (page: AppPage) => void;
  lang: Language;
  unlockedCount?: number;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  setCurrentPage,
  onNavigate,
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

  const tabs = [
    {
      id: 'study' as AppPage,
      icon: BookOpen,
      label: 'Free PDFs',
    },
    {
      id: 'pricing' as AppPage,
      icon: Layers,
      label: 'Centum Store',
      badge: '₹49',
    },
    {
      id: 'tools' as AppPage,
      icon: Clock,
      label: 'Exam Tools',
    },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200 shadow-lg px-2 py-1.5">
      <div className="grid grid-cols-4 gap-1 max-w-sm mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.id || (tab.id === 'tools' && currentPage === 'calculator');
          return (
            <button
              key={tab.id}
              onClick={() => {
                navigate(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                isActive
                  ? 'bg-amber-100 text-slate-900 font-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#FF4D00]' : 'text-gray-500'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-3 text-[9px] font-black px-1 rounded-full bg-[#FF4D00] text-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 font-bold">
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* 4th Tab: Shopping Cart */}
        <button
          onClick={() => {
            if (onOpenCart) onOpenCart();
          }}
          className="relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-gray-500 hover:text-black transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2.5 text-[9px] font-black px-1 rounded-full bg-[#FF4D00] text-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-bold">
            Cart {cartCount > 0 ? `(${cartCount})` : ''}
          </span>
        </button>
      </div>
    </div>
  );
};
