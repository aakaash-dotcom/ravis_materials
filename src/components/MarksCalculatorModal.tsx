import React, { useState } from 'react';
import { X, Target, Sparkles, ArrowRight, CheckCircle2, TrendingUp, BookOpen } from 'lucide-react';
import { ClassLevel, Language, PremiumBundle } from '../types';

interface MarksCalculatorModalProps {
  onClose: () => void;
  onSelectBundle: (bundleId: string) => void;
  lang: Language;
}

export const MarksCalculatorModal: React.FC<MarksCalculatorModalProps> = ({

  onClose,
  onSelectBundle,
  lang
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('10th');
  const [currentScore, setCurrentScore] = useState<number>(65);
  const [targetScore, setTargetScore] = useState<number>(95);

  const scoreGap = Math.max(0, targetScore - currentScore);

  // Calculate question breakdown to win back those marks
  const oneMarksNeeded = Math.min(6, Math.ceil(scoreGap * 0.2));
  const twoMarksNeeded = Math.min(5, Math.ceil(scoreGap * 0.35 / 2));
  const fiveMarksNeeded = Math.max(1, Math.ceil((scoreGap - (oneMarksNeeded + twoMarksNeeded * 2)) / 5));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FFFBEB] border-4 border-[#7C3AED] rounded-[2.5rem] shadow-[10px_10px_0px_#7C3AED] overflow-hidden flex flex-col text-[#1F2937]">
        {/* Header */}
        <div className="p-5 border-b-2 border-amber-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border-2 border-[#7C3AED] flex items-center justify-center text-[#7C3AED] font-black shadow-xs">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#1F2937]">
                {lang === 'tanglish' ? '95+ Score Blueprint Planner' : 'Board Exam Target Marks Calculator'}
              </h3>
              <p className="text-xs font-bold text-[#7C3AED]">
                Ravi Sir’s 26-Year Formula for Public Exam Centum
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 font-bold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Class Selector */}
          <div>
            <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-wider">
              Select Your Class:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedClass('10th')}
                className={`py-2.5 rounded-2xl text-xs font-black transition-all ${
                  selectedClass === '10th'
                    ? 'bg-[#FFBB00] text-black shadow-md border-2 border-[#B45309]'
                    : 'bg-white text-gray-600 border-2 border-slate-200 hover:border-amber-300'
                }`}
              >
                10th Board (SSLC)
              </button>
              <button
                onClick={() => setSelectedClass('12th')}
                className={`py-2.5 rounded-2xl text-xs font-black transition-all ${
                  selectedClass === '12th'
                    ? 'bg-[#FFBB00] text-black shadow-md border-2 border-[#B45309]'
                    : 'bg-white text-gray-600 border-2 border-slate-200 hover:border-amber-300'
                }`}
              >
                12th Board (HSE)
              </button>
            </div>
          </div>

          {/* Current vs Target Sliders */}
          <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-3xl border-2 border-amber-200 shadow-sm">
            <div>
              <span className="text-xs font-black text-gray-500 block">
                Current Marks (Quarterly):
              </span>
              <span className="text-2xl font-black text-[#1F2937]">{currentScore}/100</span>
              <input
                type="range"
                min="35"
                max="90"
                value={currentScore}
                onChange={(e) => setCurrentScore(Number(e.target.value))}
                className="w-full mt-2 accent-[#FF4D00] cursor-pointer"
              />
            </div>

            <div>
              <span className="text-xs font-black text-[#FF4D00] block">
                Target Public Score:
              </span>
              <span className="text-2xl font-black text-[#059669]">{targetScore}/100</span>
              <input
                type="range"
                min="80"
                max="100"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full mt-2 accent-[#059669] cursor-pointer"
              />
            </div>
          </div>

          {/* Diagnosis & Exact Gap Breakdown */}
          <div className="p-4 rounded-3xl bg-amber-100/70 border-2 border-amber-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1F2937] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#059669]" />
                Score Jump Needed: +{scoreGap} Marks
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black border border-emerald-300">
                100% Achievable in 25 Days
              </span>
            </div>

            <p className="text-xs font-bold text-gray-700">
              {lang === 'tanglish'
                ? `Ravi Sir analysis: Inga +${scoreGap} marks edukka ithu thaan exact checklist:`
                : `To bridge the +${scoreGap} marks gap, focus exclusively on these sections:`}
            </p>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-3 rounded-2xl bg-white border-2 border-amber-200 shadow-xs">
                <span className="text-lg font-black text-[#B45309]">+{oneMarksNeeded}</span>
                <span className="block text-[10px] font-bold text-gray-600 mt-0.5">1-Mark Book Back</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border-2 border-amber-200 shadow-xs">
                <span className="text-lg font-black text-[#7C3AED]">+{twoMarksNeeded * 2}</span>
                <span className="block text-[10px] font-bold text-gray-600 mt-0.5">2-Mark Compulsory</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border-2 border-amber-200 shadow-xs">
                <span className="text-lg font-black text-[#059669]">+{fiveMarksNeeded * 5}</span>
                <span className="block text-[10px] font-bold text-gray-600 mt-0.5">5-Mark Derivations</span>
              </div>
            </div>
          </div>

          {/* Recommended Solution / Bundle Bridge */}
          <div className="p-4 rounded-3xl bg-white border-2 border-[#FFBB00] flex items-center justify-between gap-3 shadow-md">
            <div>
              <span className="text-xs font-black text-[#FF4D00] block uppercase tracking-wider">
                Recommended Solution:
              </span>
              <span className="text-sm font-black text-[#1F2937] block">
                {selectedClass === '10th' ? '10th Maths Centum Booster (₹49)' : '12th Physics & Chem Combo (₹99)'}
              </span>
              <span className="text-[11px] font-bold text-gray-500 block mt-0.5">
                Has all compulsory models & twist questions
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectBundle(selectedClass === '10th' ? 'bundle-10-maths-centum' : 'bundle-12-physics-chemistry');
              }}
              className="px-4 py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#E04400] text-white font-black text-xs shrink-0 flex items-center gap-1 shadow-md active:scale-95 transition-all"
            >
              <span>View Pack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
