import React, { useState, useEffect } from 'react';
import { Clock, Target, Award, Sparkles, TrendingUp } from 'lucide-react';
import { BOARD_EXAM_DATE } from '../data/mockData';
import { Language } from '../types';

interface ExamCountdownProps {
  onOpenCalculator: () => void;
  lang: Language;
}

export const ExamCountdown: React.FC<ExamCountdownProps> = ({ onOpenCalculator, lang }) => {

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 180, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = BOARD_EXAM_DATE.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-[2rem] border-4 border-[#FFBB00] bg-white p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[6px_6px_0px_#F59E0B]">
      {/* Exam context */}
      <div className="flex items-center gap-3.5 w-full md:w-auto">
        <div className="w-12 h-12 rounded-2xl bg-yellow-100 border-2 border-[#FFBB00] flex items-center justify-center text-[#B45309] shrink-0 shadow-sm">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-black text-[#1F2937] tracking-wide uppercase">
              Tamil Nadu Public Exam 2026 Countdown
            </h3>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-700 border border-red-300">
              Live
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-600">
            {lang === 'tanglish'
              ? 'Doubt iruntha tension aagathinga, step marks thaan secret!'
              : lang === 'tamil'
              ? 'படிப்பு நேரத்தை முறையாக திட்டமிடுங்கள், சென்டம் உறுதி!'
              : 'Every single mark counts. Focus on compulsory numericals & derivations!'}
          </p>
        </div>
      </div>

      {/* Countdown Digits */}
      <div className="flex items-center gap-2 text-center w-full md:w-auto justify-center">
        <div className="px-3.5 py-2 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] min-w-[58px] shadow-sm">
          <span className="text-xl sm:text-2xl font-black text-[#FF4D00] font-mono">
            {timeLeft.days}
          </span>
          <span className="block text-[10px] font-black text-gray-500 uppercase">Days</span>
        </div>
        <span className="text-[#FFBB00] font-black text-xl">:</span>
        <div className="px-3.5 py-2 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] min-w-[58px] shadow-sm">
          <span className="text-xl sm:text-2xl font-black text-[#1F2937] font-mono">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="block text-[10px] font-black text-gray-500 uppercase">Hours</span>
        </div>
        <span className="text-[#FFBB00] font-black text-xl">:</span>
        <div className="px-3.5 py-2 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] min-w-[58px] shadow-sm">
          <span className="text-xl sm:text-2xl font-black text-[#1F2937] font-mono">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="block text-[10px] font-black text-gray-500 uppercase">Mins</span>
        </div>
        <span className="text-[#FFBB00] font-black text-xl">:</span>
        <div className="px-3.5 py-2 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] min-w-[58px] shadow-sm">
          <span className="text-xl sm:text-2xl font-black text-[#059669] font-mono">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="block text-[10px] font-black text-gray-500 uppercase">Secs</span>
        </div>
      </div>

      {/* CTA to Target Planner */}
      <div className="w-full md:w-auto">
        <button
          onClick={onOpenCalculator}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs sm:text-sm shadow-[0_4px_0_#4C1D95] active:translate-y-1 active:shadow-none transition-all"
        >
          <Target className="w-4 h-4" />
          <span>Plan My 95+ Score Blueprint</span>
        </button>
      </div>
    </div>
  );
};
