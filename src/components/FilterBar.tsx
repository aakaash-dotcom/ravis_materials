import React from 'react';
import { Search, Sparkles, Download, Layers } from 'lucide-react';
import { ClassLevel, Subject, ExamType } from '../types';

interface FilterBarProps {
  selectedClass: 'All' | ClassLevel;
  setSelectedClass: (c: 'All' | ClassLevel) => void;
  selectedSubject: 'All' | Subject;
  setSelectedSubject: (s: 'All' | Subject) => void;
  selectedExam?: 'All' | ExamType;
  setSelectedExam?: (e: 'All' | ExamType) => void;
  viewMode: 'all' | 'free_only' | 'premium_only';
  setViewMode: (v: 'all' | 'free_only' | 'premium_only') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  freeCount: number;
  premiumCount: number;
}

const SUBJECT_OPTIONS: ('All' | Subject)[] = [
  'All',
  'Economics',
  'Maths',
  'Physics',
  'Chemistry',
  'Biology',
  'Commerce',
  'Science',
  'Social Science',
  'Tamil',
  'English'
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  selectedExam = 'All',
  setSelectedExam,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  freeCount,
  premiumCount
}) => {
  return (
    <div className="bg-white p-3 sm:p-3.5 rounded-2xl border-2 border-amber-300 shadow-xs space-y-2.5 text-[#1F2937]">
      {/* Top Row: Quick View Toggle & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        {/* Toggle: All / Free PDFs / Centum Packs */}
        <div className="flex items-center bg-amber-50 p-0.5 rounded-xl border border-amber-200">
          <button
            onClick={() => setViewMode('all')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              viewMode === 'all'
                ? 'bg-[#FFBB00] text-black shadow-xs'
                : 'text-gray-600 hover:text-black font-bold'
            }`}
          >
            All ({freeCount + premiumCount})
          </button>

          <button
            onClick={() => setViewMode('free_only')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              viewMode === 'free_only'
                ? 'bg-[#0F9D58] text-white shadow-xs'
                : 'text-gray-600 hover:text-black font-bold'
            }`}
          >
            Free PDFs ({freeCount})
          </button>

          <button
            onClick={() => setViewMode('premium_only')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              viewMode === 'premium_only'
                ? 'bg-[#FF4D00] text-white shadow-xs'
                : 'text-gray-600 hover:text-black font-bold'
            }`}
          >
            Centum Packs ({premiumCount})
          </button>
        </div>

        {/* Search Bar (Compact) */}
        <div className="relative flex-1 sm:max-w-xs">
          <input
            type="text"
            placeholder="Search e.g. Economics, Maths..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Second Row: Class & Exam & Subject Pills (Horizontal Scrollable) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-slate-100">
        {/* Class Pills */}
        <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[10px] font-black uppercase text-gray-400 mr-0.5">Class:</span>
          {(['All', '12th', '11th', '10th'] as const).map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
                selectedClass === cls
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* Exam Type Pills */}
        {setSelectedExam && (
          <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-1 sm:pb-0 border-l sm:border-l sm:pl-2 border-slate-200">
            <span className="text-[10px] font-black uppercase text-gray-400 mr-0.5">Exam:</span>
            {(['All', 'Quarterly', 'Half-Yearly', 'Public Board'] as const).map((exam) => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
                  selectedExam === exam
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>
        )}

        {/* Subject Pills (Scrollable) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 border-l sm:border-l sm:pl-2 border-slate-200 no-scrollbar">
          <span className="text-[10px] font-black uppercase text-gray-400 mr-0.5">Subject:</span>
          {SUBJECT_OPTIONS.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                selectedSubject === sub
                  ? 'bg-[#FF4D00] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
