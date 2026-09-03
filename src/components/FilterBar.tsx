import React from 'react';
import { Search, RotateCcw, Sparkles } from 'lucide-react';
import { ClassLevel, Subject, ExamType } from '../types';

interface FilterBarProps {
  selectedClass: 'All' | ClassLevel;
  setSelectedClass: (c: 'All' | ClassLevel) => void;
  selectedSubject: 'All' | Subject;
  setSelectedSubject: (s: 'All' | Subject) => void;
  selectedExam?: 'All' | ExamType;
  setSelectedExam?: (e: 'All' | ExamType) => void;
  viewMode?: 'all' | 'free_only' | 'premium_only';
  setViewMode?: (v: 'all' | 'free_only' | 'premium_only') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  freeCount: number;
  premiumCount: number;
}

const COMMON_SUBJECTS: { name: Subject; color: string }[] = [
  { name: 'Economics', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { name: 'Maths', color: 'bg-blue-100 text-blue-900 border-blue-300' },
  { name: 'Physics', color: 'bg-violet-100 text-violet-900 border-violet-300' },
  { name: 'Chemistry', color: 'bg-pink-100 text-pink-900 border-pink-300' },
  { name: 'Biology', color: 'bg-teal-100 text-teal-900 border-teal-300' },
  { name: 'Science', color: 'bg-cyan-100 text-cyan-900 border-cyan-300' },
  { name: 'Social Science', color: 'bg-orange-100 text-orange-900 border-orange-300' },
  { name: 'Tamil', color: 'bg-amber-100 text-amber-900 border-amber-300' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  selectedExam = 'All',
  setSelectedExam,
  searchQuery,
  setSearchQuery,
}) => {
  const isFiltered = selectedClass !== 'All' || selectedSubject !== 'All' || selectedExam !== 'All' || searchQuery.trim() !== '';

  const handleReset = () => {
    setSelectedClass('All');
    setSelectedSubject('All');
    if (setSelectedExam) setSelectedExam('All');
    setSearchQuery('');
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-300 p-2.5 sm:p-3 shadow-xs space-y-2">
      {/* 1-Tap Subject Chips Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setSelectedSubject('All')}
          className={`px-2.5 py-1 rounded-lg font-black shrink-0 transition-all border ${
            selectedSubject === 'All'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
          }`}
        >
          All Subjects
        </button>

        {COMMON_SUBJECTS.map((sub) => {
          const isSelected = selectedSubject === sub.name;
          return (
            <button
              key={sub.name}
              onClick={() => setSelectedSubject(isSelected ? 'All' : sub.name)}
              className={`px-2.5 py-1 rounded-lg font-black shrink-0 transition-all border ${
                isSelected
                  ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-xs scale-105'
                  : `${sub.color} hover:opacity-90`
              }`}
            >
              {sub.name}
            </button>
          );
        })}
      </div>

      {/* Dropdown Filters & Search in 1 Compact Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
        {/* Class Dropdown */}
        <div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value as 'All' | ClassLevel)}
            className="w-full bg-amber-50/80 border border-amber-300 rounded-xl px-2.5 py-1.5 text-xs font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF4D00] cursor-pointer"
          >
            <option value="All">All Classes</option>
            <option value="12th">12th Standard</option>
            <option value="11th">11th Standard</option>
            <option value="10th">10th Standard</option>
            <option value="9th">9th Standard</option>
          </select>
        </div>

        {/* Exam Dropdown */}
        <div>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam && setSelectedExam(e.target.value as 'All' | ExamType)}
            className="w-full bg-amber-50/80 border border-amber-300 rounded-xl px-2.5 py-1.5 text-xs font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF4D00] cursor-pointer"
          >
            <option value="All">All Exams</option>
            <option value="Quarterly">Quarterly Special</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Public Board">Public Board Exam</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative col-span-2 sm:col-span-2 flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search chapters (e.g. Economics, Matrices)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs font-bold text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:bg-white transition-all"
            />
          </div>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] font-black text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 px-2 py-1.5 rounded-xl transition-colors shrink-0"
              title="Reset filter"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
