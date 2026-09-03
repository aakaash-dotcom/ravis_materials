import React from 'react';
import { Instagram, Sparkles, ExternalLink, Eye, ArrowRight, Check, Zap } from 'lucide-react';
import { FreeResource, Language, PremiumBundle } from '../types';

interface ReelBannerProps {
  activeCode: string;
  onSelectCode: (code: string) => void;
  lang: Language;
  matchingResource?: FreeResource;
  relatedBundle?: PremiumBundle;
  onPreviewResource?: (res: FreeResource) => void;
  onSelectBundle?: (bundle: PremiumBundle) => void;
}

const POPULAR_CODES = [
  { code: 'M10', label: '10th Maths Top 25', badge: '🔥 Viral' },
  { code: 'T10', label: '10th Tamil Neduvina', badge: 'Hot' },
  { code: 'S10', label: '10th Science Compulsory', badge: '95+' },
  { code: 'P12', label: '12th Physics 35 Derivations', badge: 'Centum' },
  { code: 'C12', label: '12th Chem Name Reactions', badge: 'Top' },
  { code: 'M12', label: '12th Maths Pocket Formulas', badge: 'Must' },
];

export const ReelBanner: React.FC<ReelBannerProps> = ({
  activeCode,
  onSelectCode,
  lang,
  matchingResource,
  relatedBundle,
  onPreviewResource,
  onSelectBundle,
}) => {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border-4 border-[#7C3AED] bg-white p-5 sm:p-7 shadow-[8px_8px_0px_#7C3AED]">
      {/* Playful background decorative spots */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-yellow-200/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-indigo-100/60 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-200 text-yellow-900 border border-yellow-300 text-xs font-black uppercase tracking-wider">
              <Instagram className="w-3.5 h-3.5 text-[#FF4D00]" />
              <span>@ravistuition_madurai</span>
            </div>
            <span className="bg-[#0F9D58] text-white px-2.5 py-0.5 text-[11px] font-black rounded-full shadow-xs flex items-center gap-1">
              <span>Google Drive Direct Links</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
            <span>{lang === 'tanglish' ? '26+ Years Trust in Madurai' : 'மதுரையில் 26 ஆண்டு சாதனை'}</span>
          </div>
        </div>

        {/* If user landed from Auto DM link with a specific PDF (e.g. ?pdf=M10) */}
        {matchingResource ? (
          <div className="bg-[#FFFBEB] border-3 border-[#FFBB00] rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-amber-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#FF4D00] text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                    CODE: {matchingResource.reelCode}
                  </span>
                  <span className="text-xs font-black text-amber-900">
                    {lang === 'tanglish' ? '🎯 Requested Reel PDF Ready!' : '🎯 ரீல்ஸ் PDF தயார்!'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#1F2937] mt-1">
                  {lang === 'tanglish' 
                    ? matchingResource.tanglishTitle 
                    : (matchingResource.tamilTitle || matchingResource.title)}
                </h3>
              </div>

              {/* 1-Tap Actions for the requested PDF */}
              <div className="flex items-center gap-2 shrink-0">
                {onPreviewResource && (
                  <button
                    onClick={() => onPreviewResource(matchingResource)}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-blue-700 text-xs font-black border-2 border-amber-200 shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{lang === 'tanglish' ? 'Read Online' : 'பார்வையிடு'}</span>
                  </button>
                )}
                <a
                  href={matchingResource.driveDownloadUrl || "https://drive.google.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#0F9D58] hover:bg-[#0c8249] text-white text-xs font-black shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Drive (Free)</span>
                </a>
              </div>
            </div>

            {/* High Converting Free vs Pro Comparison Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white border border-amber-200">
                <span className="text-[10px] font-black uppercase text-gray-400 block">
                  {lang === 'tanglish' ? 'What you get in this Free PDF (₹0):' : 'இந்த இலவச பிடிஎப்-ல் உள்ளவை (₹0):'}
                </span>
                <p className="text-xs font-bold text-gray-800 mt-1">
                  • 25 Standard Questions & Chapter Formulas
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Great for general practice, but doesn't include hidden twists.
                </p>
              </div>

              {relatedBundle && onSelectBundle && (
                <div 
                  onClick={() => onSelectBundle(relatedBundle)}
                  className="p-3.5 rounded-2xl bg-purple-50 hover:bg-purple-100/80 border-2 border-[#7C3AED] cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#7C3AED]">
                        ⚡ {lang === 'tanglish' ? 'Upgrade to Pro Booster:' : 'ப்ரோ தொகுப்பாக மாற்றுங்கள்:'}
                      </span>
                      <span className="text-xs font-black px-2 py-0.5 bg-[#FF4D00] text-white rounded-md">
                        ₹{relatedBundle.price} Only
                      </span>
                    </div>
                    <p className="text-xs font-black text-[#1F2937] mt-1">
                      + 25 Hidden Board Twist Models & Step-by-Step Marking
                    </p>
                    <p className="text-[11px] font-bold text-purple-900 mt-0.5">
                      🍧 Less than 1 plate Jigarthanda! Instant Google Drive Folder.
                    </p>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-black text-[#7C3AED]">
                      <span>Get Pro Booster</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Default Instant Tap Hub (No code typing needed!) */
          <div className="space-y-3">
            <div>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-[#1F2937] leading-snug">
                {lang === 'tanglish' ? (
                  <>
                    Reel-la paatha <span className="text-[#FF4D00]">Free Board PDF</span> inga 1-tap download! ⚡
                  </>
                ) : (
                  <>
                    ரீல்ஸில் பார்த்த <span className="text-[#FF4D00]">இலவச பாடக் குறிப்புகள்</span> 1-க்ளிக் கூகுள் டிரைவ்!
                  </>
                )}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
                {lang === 'tanglish'
                  ? 'Code enter panna kooda thevailla! Keela iruka Reel code-ah 1-tap pannunga, direct-ah Google Drive-la padikalam.'
                  : 'எந்த குறியீடும் தட்டச்சு செய்ய வேண்டாம்! கீழே உள்ள பாடத்தைத் தொட்டாலே நேரடியாக கூகுள் டிரைவில் படிக்கலாம்.'}
              </p>
            </div>

            {/* 1-Tap Quick Reel Chips (No input box needed!) */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                <span className="flex items-center gap-1.5 text-gray-800 font-black">
                  <Zap className="w-3.5 h-3.5 text-[#FF4D00] fill-[#FF4D00]" />
                  {lang === 'tanglish' ? '1-Tap to Open Reel Material:' : 'விரைவாக திறக்க தேர்வு செய்க:'}
                </span>
                {activeCode && (
                  <button
                    onClick={() => onSelectCode('')}
                    className="text-[#FF4D00] hover:underline font-black text-[11px]"
                  >
                    Clear filter
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {POPULAR_CODES.map((item) => {
                  const isSelected = activeCode.toUpperCase() === item.code;
                  return (
                    <button
                      key={item.code}
                      onClick={() => onSelectCode(item.code)}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
                        isSelected
                          ? 'bg-[#FF4D00] text-white border-[#B45309] shadow-md scale-105'
                          : 'bg-[#FFFBEB] text-slate-800 border-amber-200 hover:border-[#FF4D00] hover:bg-white active:scale-95'
                      }`}
                    >
                      <span className="font-extrabold">{item.code}</span>
                      <span className="text-gray-400 font-normal">|</span>
                      <span className="font-bold">{item.label}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-md font-black ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-yellow-200 text-yellow-950'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

