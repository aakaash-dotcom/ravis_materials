import React, { useState } from 'react';
import { Target, Clock, Calculator, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { ClassLevel, Language, PremiumBundle, Subject } from '../types';
import { ExamCountdown } from './ExamCountdown';

interface ExamToolsViewProps {
  lang: Language;
  onSelectBundle: (bundle: PremiumBundle) => void;
  bundles: PremiumBundle[];
}

export const ExamToolsView: React.FC<ExamToolsViewProps> = ({
  lang,
  onSelectBundle,
  bundles,
}) => {
  const [activeTool, setActiveTool] = useState<'countdown' | 'marks' | 'time'>('countdown');

  // Calculator State
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('12th');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Economics');
  const [currentScore, setCurrentScore] = useState<number>(65);
  const [targetScore, setTargetScore] = useState<number>(95);

  const scoreGap = Math.max(0, targetScore - currentScore);
  const oneMarks = Math.min(5, Math.ceil(scoreGap * 0.25));
  const twoMarks = Math.min(4, Math.ceil((scoreGap * 0.35) / 2));
  const fiveMarks = Math.max(1, Math.ceil((scoreGap - (oneMarks + twoMarks * 2)) / 5));

  const matchedBundle = bundles.find(
    (b) => b.classLevel === selectedClass && b.subjects.includes(selectedSubject)
  ) || bundles.find((b) => b.classLevel === selectedClass) || bundles[0];

  return (
    <div className="max-w-3xl mx-auto space-y-4 text-[#1F2937]">
      {/* Visual Tool Switcher Tabs */}
      <div className="bg-white p-1.5 rounded-2xl border-2 border-amber-300 shadow-xs flex items-center justify-between gap-1">
        <button
          onClick={() => setActiveTool('countdown')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black transition-all ${
            activeTool === 'countdown'
              ? 'bg-[#FF4D00] text-white shadow-xs'
              : 'text-gray-700 hover:bg-amber-50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Exam Countdown</span>
        </button>

        <button
          onClick={() => setActiveTool('marks')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black transition-all ${
            activeTool === 'marks'
              ? 'bg-[#FF4D00] text-white shadow-xs'
              : 'text-gray-700 hover:bg-amber-50'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>95+ Target Calculator</span>
        </button>

        <button
          onClick={() => setActiveTool('time')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black transition-all ${
            activeTool === 'time'
              ? 'bg-[#FF4D00] text-white shadow-xs'
              : 'text-gray-700 hover:bg-amber-50'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>3-Hour Exam Timer</span>
        </button>
      </div>

      {/* Tool 1: Countdown */}
      {activeTool === 'countdown' && (
        <div className="space-y-3">
          <ExamCountdown lang={lang} />
        </div>
      )}

      {/* Tool 2: 95+ Marks Target Calculator */}
      {activeTool === 'marks' && (
        <div className="bg-white rounded-2xl border-2 border-amber-300 p-4 sm:p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Board Exam Marks Target Planner
            </h3>
            <p className="text-xs text-gray-500 font-bold">
              Enter current marks to see how to recover marks in twist questions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value as ClassLevel)}
                className="w-full text-xs font-black bg-amber-50 border border-amber-300 rounded-xl p-2"
              >
                <option value="12th">12th Standard</option>
                <option value="11th">11th Standard</option>
                <option value="10th">10th Standard</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as Subject)}
                className="w-full text-xs font-black bg-amber-50 border border-amber-300 rounded-xl p-2"
              >
                <option value="Economics">Economics</option>
                <option value="Maths">Maths</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 bg-amber-50/70 p-3 rounded-xl border border-amber-200">
            <div>
              <div className="flex justify-between text-xs font-black mb-1">
                <span>Current Marks: {currentScore} / 100</span>
              </div>
              <input
                type="range"
                min="35"
                max="90"
                value={currentScore}
                onChange={(e) => setCurrentScore(Number(e.target.value))}
                className="w-full accent-[#FF4D00] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-black mb-1">
                <span>Target Marks: {targetScore} / 100</span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full accent-[#0F9D58] cursor-pointer"
              />
            </div>
          </div>

          {/* Result Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
            <span className="text-xs font-black text-slate-800">
              Gap: +{scoreGap} Marks Needed for Centum
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="block font-black text-[#FF4D00]">+{oneMarks}</span>
                <span className="text-[10px] text-gray-500">1-Marks</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="block font-black text-[#FF4D00]">+{twoMarks * 2}</span>
                <span className="text-[10px] text-gray-500">2-Mark Twists</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="block font-black text-[#FF4D00]">+{fiveMarks * 5}</span>
                <span className="text-[10px] text-gray-500">5-Mark Steps</span>
              </div>
            </div>

            {matchedBundle && (
              <button
                onClick={() => onSelectBundle(matchedBundle)}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-[#FF4D00] text-white text-xs font-black shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Get {selectedClass} {selectedSubject} Centum Pack (₹{matchedBundle.price})</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tool 3: 3-Hour Exam Time Budget */}
      {activeTool === 'time' && (
        <div className="bg-white rounded-2xl border-2 border-amber-300 p-4 sm:p-5 shadow-xs space-y-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              180-Minute Exam Hall Time Strategy
            </h3>
            <p className="text-xs text-gray-500 font-bold">
              How toppers complete paper with 15 minutes left for checking.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-black">
              <span>Part A: 1-Mark Objective Questions</span>
              <span className="text-[#FF4D00]">20 Minutes</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-black">
              <span>Part B: 2-Mark Short Answers</span>
              <span className="text-[#FF4D00]">40 Minutes</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-black">
              <span>Part C: 3-Mark Questions</span>
              <span className="text-[#FF4D00]">45 Minutes</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-black">
              <span>Part D: 5-Mark Detailed Answers</span>
              <span className="text-[#FF4D00]">60 Minutes</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-300 text-xs font-black text-emerald-900">
              <span>Final Revision & Checking Step Marks</span>
              <span className="text-emerald-700">15 Minutes Buffer</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
