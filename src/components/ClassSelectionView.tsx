import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ClassLevel } from '../types';

interface ClassSelectionViewProps {
  onSelectClass: (c: ClassLevel) => void;
}

export const ClassSelectionView: React.FC<ClassSelectionViewProps> = ({
  onSelectClass,
}) => {
  const classes: {
    level: ClassLevel;
    title: string;
    gradient: string;
    border: string;
  }[] = [
    {
      level: '12th',
      title: '12th Standard',
      gradient: 'from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600',
      border: 'border-violet-400',
    },
    {
      level: '10th',
      title: '10th Standard',
      gradient: 'from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500',
      border: 'border-orange-400',
    },
    {
      level: '9th',
      title: '9th Standard',
      gradient: 'from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600',
      border: 'border-emerald-400',
    },
    {
      level: '11th',
      title: '11th Standard',
      gradient: 'from-blue-600 to-cyan-700 hover:from-blue-500 hover:to-cyan-600',
      border: 'border-blue-400',
    },
  ];

  return (
    <div className="max-w-md mx-auto py-2 sm:py-6 px-3 flex flex-col justify-center min-h-[calc(100vh-140px)]">
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 text-center mb-4 sm:mb-6">
        Select Your Standard
      </h2>

      {/* 4 Clean Boxes in a Single Screen (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {classes.map((c) => (
          <button
            key={c.level}
            onClick={() => onSelectClass(c.level)}
            className={`group rounded-2xl bg-gradient-to-br ${c.gradient} p-4 sm:p-6 text-white shadow-md hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5 active:scale-95 flex flex-col items-center justify-center text-center border-2 ${c.border} min-h-[110px] sm:min-h-[140px]`}
          >
            <span className="text-2xl sm:text-3xl font-black leading-none mb-1">
              {c.level}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white/90">
              Standard
            </span>
            <div className="mt-2.5 flex items-center gap-1 text-[11px] font-black bg-white/20 px-2.5 py-0.5 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-colors">
              <span>Enter</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
