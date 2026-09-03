import React, { useState } from 'react';
import { Target, Sparkles, ArrowRight, CheckCircle2, TrendingUp, ShieldAlert, Award, ChevronRight } from 'lucide-react';
import { ClassLevel, Language, PremiumBundle, Subject } from '../types';
import { ExamCountdown } from './ExamCountdown';

interface ScoreCalculatorViewProps {
  lang: Language;
  onSelectBundle: (bundleId: string) => void;
  bundles: PremiumBundle[];
}

export const ScoreCalculatorView: React.FC<ScoreCalculatorViewProps> = ({
  lang,
  onSelectBundle,
  bundles,
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('10th');
  const [selectedSubject, setSelectedSubject] = useState<string>('Maths');
  const [currentScore, setCurrentScore] = useState<number>(65);
  const [targetScore, setTargetScore] = useState<number>(95);

  const scoreGap = Math.max(0, targetScore - currentScore);

  // Mark breakdown to win back those marks
  const oneMarksNeeded = Math.min(6, Math.ceil(scoreGap * 0.25));
  const twoMarksNeeded = Math.min(5, Math.ceil((scoreGap * 0.35) / 2));
  const fiveMarksNeeded = Math.max(1, Math.ceil((scoreGap - (oneMarksNeeded + twoMarksNeeded * 2)) / 5));

  // Find corresponding Pro Bundle
  const matchedBundle = bundles.find(
    (b) => b.classLevel === selectedClass && b.subjects.some((s) => s.toLowerCase().includes(selectedSubject.toLowerCase()))
  ) || bundles.find((b) => b.classLevel === selectedClass) || bundles[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Board Exam Countdown & Time Budget */}
      <ExamCountdown lang={lang} />

      {/* Header Banner */}
      <div className="bg-white border-4 border-[#7C3AED] rounded-[2.5rem] p-6 sm:p-8 shadow-[8px_8px_0px_#7C3AED] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-yellow-100 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-300 text-xs font-black text-[#7C3AED]">
            <Target className="w-4 h-4" />
            <span>
              {lang === 'tanglish'
                ? 'Ravi Sir’s 26-Year Centum Diagnostic Tool'
                : 'ரவி சாரின் 26 ஆண்டு சாதனை மதிப்பீட்டு கருவி'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#1F2937]">
            {lang === 'tanglish' ? (
              <>
                Unoda <span className="text-[#FF4D00]">Target Marks</span> Enna? Centum Blueprint Ingaye Calculate Pannu! 🎯
              </>
            ) : (
              <>
                உங்கள் <span className="text-[#FF4D00]">இலக்கு மதிப்பெண்</span> என்ன? சென்டம் திட்டத்தை உடனே கணக்கிடுங்கள்!
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm font-semibold text-gray-600 max-w-2xl leading-relaxed">
            {lang === 'tanglish'
              ? 'Board exam-la marks engayo loose aagala! Most students lose 10-15 marks only in compulsory twist questions and step formatting. Calculate your exact deficit below.'
              : 'பொதுத்தேர்வில் பெரும்பாலான மாணவர்கள் கட்டாய வினாக்கள் மற்றும் படிநிலை அமைப்பிலேயே 10-15 மதிப்பெண்களை இழக்கிறார்கள். உங்களுக்கான இழப்பை உடனே திட்டமிடுங்கள்.'}
          </p>
        </div>
      </div>

      {/* Main Interactive Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Sliders & Selectors (7 cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          {/* Class Level Selection */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2.5">
              1. {lang === 'tanglish' ? 'Select Board Class' : 'வகுப்பைத் தேர்ந்தெடுக்கவும்'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedClass('10th')}
                className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                  selectedClass === '10th'
                    ? 'bg-[#FFBB00] text-black shadow-md border-2 border-[#B45309]'
                    : 'bg-amber-50/50 text-gray-600 border-2 border-slate-200 hover:border-amber-300'
                }`}
              >
                <span>10th Board (SSLC)</span>
              </button>
              <button
                onClick={() => setSelectedClass('12th')}
                className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                  selectedClass === '12th'
                    ? 'bg-[#FFBB00] text-black shadow-md border-2 border-[#B45309]'
                    : 'bg-amber-50/50 text-gray-600 border-2 border-slate-200 hover:border-amber-300'
                }`}
              >
                <span>12th Board (HSE)</span>
              </button>
            </div>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2.5">
              2. {lang === 'tanglish' ? 'Select Focus Subject' : 'பாடத்தைத் தேர்ந்தெடுக்கவும்'}
            </label>
            <div className="flex flex-wrap gap-2">
              {(selectedClass === '10th' 
                ? ['Maths', 'Science', 'Social Science', 'Tamil', 'English']
                : ['Maths', 'Physics', 'Chemistry', 'Biology']
              ).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                    selectedSubject === sub
                      ? 'bg-[#FF4D00] text-white shadow-sm'
                      : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders: Current Score vs Target Score */}
          <div className="space-y-5 pt-2 border-t border-amber-100">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-gray-700">
                  {lang === 'tanglish' ? 'Current Score (Quarterly / Mid-Term):' : 'தற்போதைய மதிப்பெண்:'}
                </span>
                <span className="text-xl font-black text-[#1F2937] bg-yellow-100 px-2.5 py-0.5 rounded-lg border border-yellow-300">
                  {currentScore} / 100
                </span>
              </div>
              <input
                type="range"
                min="35"
                max="90"
                value={currentScore}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCurrentScore(val);
                  if (val >= targetScore) setTargetScore(Math.min(100, val + 10));
                }}
                className="w-full accent-[#FF4D00] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1">
                <span>35 (Pass)</span>
                <span>65 (Average)</span>
                <span>90 (Distinction)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-gray-700">
                  {lang === 'tanglish' ? 'Your Desired Public Exam Target:' : 'பொதுத்தேர்வு இலக்கு மதிப்பெண்:'}
                </span>
                <span className="text-xl font-black text-[#FF4D00] bg-orange-100 px-2.5 py-0.5 rounded-lg border border-orange-300">
                  {targetScore} / 100 {targetScore === 100 ? '👑 CENTUM' : ''}
                </span>
              </div>
              <input
                type="range"
                min={Math.max(currentScore + 5, 75)}
                max="100"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full accent-[#7C3AED] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1">
                <span>80+ (Very Good)</span>
                <span>95+ (Topper Zone)</span>
                <span>100/100 (Centum)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Instant Diagnostic Gap & Action Plan (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#FFFBEB] border-4 border-[#FFBB00] rounded-3xl p-5 sm:p-6 shadow-md space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3">
              <div>
                <span className="text-xs font-black text-amber-900 uppercase tracking-wider block">
                  {lang === 'tanglish' ? 'Calculated Mark Deficit' : 'தேவையான கூடுதல் மதிப்பெண்கள்'}
                </span>
                <span className="text-3xl font-black text-[#FF4D00]">
                  +{scoreGap} Marks Needed
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFBB00] flex items-center justify-center text-black font-black text-xl shadow-xs">
                🎯
              </div>
            </div>

            {/* Exactly where to recover these marks */}
            <div className="space-y-2.5">
              <span className="text-xs font-black text-[#1F2937] block">
                {lang === 'tanglish' 
                  ? 'Ravi Sir’s Exact Step-Wise Recovery Breakdown:' 
                  : 'மதிப்பெண்களை மீட்கும் படிநிலைகள்:'}
              </span>

              <div className="p-3 bg-white rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-gray-700">1-Mark Book-back & Interior:</span>
                </div>
                <span className="font-black text-[#1F2937]">+{oneMarksNeeded} Marks</span>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF4D00] shrink-0" />
                  <span className="font-bold text-gray-700">2-Mark Compulsory Twist:</span>
                </div>
                <span className="font-black text-[#1F2937]">+{twoMarksNeeded * 2} Marks</span>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                  <span className="font-bold text-gray-700">5-Mark Derivations & Theorems:</span>
                </div>
                <span className="font-black text-[#1F2937]">+{fiveMarksNeeded * 5} Marks</span>
              </div>
            </div>

            {/* Tutor Advice in Tanglish / Tamil */}
            <div className="p-3.5 bg-yellow-50 rounded-2xl border border-yellow-300 text-xs text-yellow-950 font-bold leading-snug">
              {lang === 'tanglish' ? (
                <>
                  💡 <strong>Ravi Sir Advice:</strong> "Regular book problems ella student-um potturvaanga. But question paper compulsory question-la twist veppaanga. Athula mark pogama paathukitaa unaku {targetScore}+ confirm!"
                </>
              ) : (
                <>
                  💡 <strong>ரவி சாரின் ஆலோசனை:</strong> "வழக்கமான வினாக்களை அனைவரும் எழுதுவார்கள். ஆனால் கட்டாய வினாக்களில் ட்விஸ்ட் இருக்கும். அதற்கான மாதிரிகளைத் தயார் செய்தால் {targetScore}+ உறுதி!"
                </>
              )}
            </div>
          </div>

          {/* High Converting Direct CTA */}
          {matchedBundle && (
            <div className="pt-3 border-t-2 border-amber-200 space-y-2">
              <div className="text-[11px] font-black text-gray-600 flex items-center justify-between">
                <span>Recommended Solution:</span>
                <span className="text-[#FF4D00] font-black">₹{matchedBundle.price} Only</span>
              </div>

              <button
                onClick={() => onSelectBundle(matchedBundle.id)}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FF4D00] hover:bg-[#E04400] text-white font-black text-xs sm:text-sm shadow-[0_4px_0_#991B1B] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <span>Unlock {matchedBundle.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-gray-500 font-bold">
                🍧 Less than 1 plate Madurai Jigarthanda price • Instant Google Drive Access
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
