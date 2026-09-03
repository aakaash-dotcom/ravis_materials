import React, { useState } from 'react';
import { MapPin, ShieldCheck, Star, CheckCircle, Pause, Play, Phone } from 'lucide-react';
import { MADURAI_TESTIMONIALS } from '../data/mockData';
import { Language, TutorConfig } from '../types';

interface MaduraiTrustSectionProps {
  config: TutorConfig;
  lang: Language;
}

export const MaduraiTrustSection: React.FC<MaduraiTrustSectionProps> = ({ config, lang }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleVoiceNote = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section className="space-y-6 pt-4 border-t-2 border-amber-200">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-200 border border-yellow-300 text-yellow-900 text-xs font-black uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-[#FF4D00]" />
            <span>Madurai's Most Trusted Board Exam Centre Since 1999</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F2937] tracking-tight">
            {lang === 'tanglish' ? (
              <>26 Varusham Madurai Students Nambikkai 🏆</>
            ) : (
              <>26 ஆண்டுகளாக மதுரை மாணவர்களின் நம்பிக்கை மையம் 🏆</>
            )}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1 max-w-2xl leading-relaxed">
            {lang === 'tanglish'
              ? 'Govindhan Street, K.Pudur (Opp. Mary Ann School). 5,000+ Students trained across K.Pudur, Anna Nagar, KK Nagar & Mattuthavani.'
              : 'மேரி ஆன் பள்ளி எதிரில், கோவிந்தன் தெரு, கே.புதூர். 5,000+ க்கும் மேற்பட்ட 10 மற்றும் 12 ஆம் வகுப்பு சென்டம் சாதனையாளர்கள்.'}
          </p>
        </div>

        {/* Location badge with Maps link */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="https://maps.google.com/?q=K.Pudur+Madurai+Mary+Ann+School"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-300 hover:border-[#FF4D00] text-xs font-black text-slate-800 hover:text-[#FF4D00] transition-all shrink-0 shadow-sm"
          >
            <MapPin className="w-4 h-4 text-[#FF4D00]" />
            <span>K.Pudur (Opp. Mary Ann)</span>
          </a>

          <a
            href={`https://wa.me/${(config?.whatsappNumber || '919842145890').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              "Vanakkam Ravi Sir! I want to visit K.Pudur tuition center."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#25D366] text-white text-xs font-black shadow-sm"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Direct WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 4 Pillar Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 sm:p-5 rounded-[2rem] bg-white border-4 border-[#FFBB00] shadow-[4px_4px_0px_#F59E0B]">
          <span className="text-3xl sm:text-4xl font-black text-[#FF4D00] font-mono">26+</span>
          <span className="block text-xs font-black text-[#1F2937] mt-1 uppercase tracking-wide">Years Since 1999</span>
          <span className="block text-[11px] font-semibold text-gray-500">Board exam focus</span>
        </div>

        <div className="p-4 sm:p-5 rounded-[2rem] bg-white border-4 border-[#22C55E] shadow-[4px_4px_0px_#16A34A]">
          <span className="text-3xl sm:text-4xl font-black text-[#16A34A] font-mono">5,000+</span>
          <span className="block text-xs font-black text-[#1F2937] mt-1 uppercase tracking-wide">Madurai Students</span>
          <span className="block text-[11px] font-semibold text-gray-500">Alumni network</span>
        </div>

        <div className="p-4 sm:p-5 rounded-[2rem] bg-white border-4 border-[#7C3AED] shadow-[4px_4px_0px_#5B21B6]">
          <span className="text-3xl sm:text-4xl font-black text-[#7C3AED] font-mono">380+</span>
          <span className="block text-xs font-black text-[#1F2937] mt-1 uppercase tracking-wide">Centum Scorers</span>
          <span className="block text-[11px] font-semibold text-gray-500">100/100 in Maths/Sci</span>
        </div>

        <div className="p-4 sm:p-5 rounded-[2rem] bg-white border-4 border-[#3B82F6] shadow-[4px_4px_0px_#2563EB]">
          <span className="text-3xl sm:text-4xl font-black text-[#2563EB] font-mono">Weekly</span>
          <span className="block text-xs font-black text-[#1F2937] mt-1 uppercase tracking-wide">WhatsApp Reports</span>
          <span className="block text-[11px] font-semibold text-gray-500">Direct to parents</span>
        </div>
      </div>

      {/* Audio Voice Note & Peer Proof Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Interactive WhatsApp Voice Note Mockup */}
        <div className="p-6 rounded-[2.5rem] bg-[#064E3B] border-4 border-[#047857] text-white flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-sm">
                  KS
                </div>
                <div>
                  <span className="text-xs font-black block leading-tight">Karthik S. (TVS School)</span>
                  <span className="text-[10px] text-emerald-200 font-bold">Centum in 10th Maths (100/100)</span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-300 font-bold">Yesterday</span>
            </div>

            {/* Voice note bubble */}
            <div className="p-3.5 bg-[#047857]/60 rounded-2xl rounded-tl-none flex items-center gap-3 border border-emerald-400/30">
              <button
                onClick={toggleVoiceNote}
                className="w-10 h-10 rounded-full bg-yellow-300 text-slate-950 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform shadow-sm"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <div className="flex-1">
                {/* Visualizer bars */}
                <div className="flex items-center gap-1 h-6">
                  {[40, 60, 25, 90, 45, 80, 70, 30, 95, 60, 40, 75, 50, 85, 30].map((h, idx) => (
                    <span
                      key={idx}
                      style={{ height: `${isPlayingAudio ? (idx % 2 === 0 ? 85 : 35) : h}%` }}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlayingAudio ? 'bg-yellow-300 animate-pulse' : 'bg-emerald-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] text-emerald-200 mt-1 font-mono font-bold">
                  <span>{isPlayingAudio ? '0:24' : '0:42'}</span>
                  <span>Voice Note</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-emerald-50 italic mt-3 bg-black/20 p-3 rounded-2xl border border-white/10">
              {lang === 'tanglish'
                ? '"Sir ungala nambi M10 and ₹49 booster padichen. Exact same algebra compulsory problem quarterly-la vanthuchu sir! 100/100 guaranteed."'
                : '"ஐயா, உங்கள் M10 மற்றும் ₹49 ப்ரோ தொகுப்பை படித்தேன். அதே கட்டாய வினா தேர்வில் வந்தது! 100/100 மதிப்பெண் எளிதாக கிடைத்தது."'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-500/40 flex items-center justify-between text-xs text-yellow-300 font-black">
            <span>Verified Madurai Student</span>
            <CheckCircle className="w-4 h-4 text-yellow-300" />
          </div>
        </div>

        {/* Middle & Right: Student Testimonial Cards */}
        {MADURAI_TESTIMONIALS.slice(1, 3).map((test) => (
          <div
            key={test.id}
            className="p-6 rounded-[2.5rem] bg-white border-4 border-amber-200 shadow-[4px_4px_0px_#FCD34D] flex flex-col justify-between text-[#1F2937]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#FF4D00] flex items-center justify-center font-black text-xs text-white shadow-sm">
                    {test.studentName[0]}
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#1F2937] block">
                      {test.studentName}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 block">
                      {test.school}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-yellow-200 text-yellow-950 border border-yellow-300">
                  {test.score}
                </span>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#FFBB00] fill-[#FFBB00]" />
                ))}
                {test.subjectScore && (
                  <span className="text-xs font-black text-[#16A34A] ml-1.5">
                    {test.subjectScore}
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold text-gray-700 leading-relaxed">
                "{lang === 'tanglish' ? test.quoteTanglish : (test.quoteTamil || test.quoteTanglish)}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] font-bold text-gray-500">
              <span>{test.area}</span>
              {test.reelCodeUsed && (
                <span className="text-[#FF4D00] font-black">Reel Code: {test.reelCodeUsed}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

