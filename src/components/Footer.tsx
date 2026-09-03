import React from 'react';
import { MapPin, Phone, Instagram, ShieldCheck, Heart } from 'lucide-react';
import { Language, TutorConfig } from '../types';

interface FooterProps {
  config: TutorConfig;
  lang: Language;
  onOpenTutorAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, lang, onOpenTutorAdmin }) => {

  return (
    <footer className="border-t-4 border-[#FFBB00] bg-white text-[#1F2937] text-xs py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand & Legacy */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FF4D00] flex items-center justify-center text-white font-black text-xl shadow-md rotate-[-4deg]">
              R
            </div>
            <div>
              <span className="text-lg font-black text-[#1F2937] block leading-tight">
                {config.centreName}
              </span>
              <span className="text-[11px] font-bold text-[#7C3AED]">
                Madurai's Board Exam Speciality Since 1999
              </span>
            </div>
          </div>
          <p className="text-xs font-semibold text-gray-600 max-w-md leading-relaxed">
            Helping Tamil Nadu 10th & 12th students crack public exams with high confidence, weekly assessments, and examiner blueprint study notes since 1999.
          </p>
          <div className="flex items-center gap-3 pt-1 flex-wrap">
            <a
              href={`https://instagram.com/${(config?.instagramHandle || '@ravis_tuition_madurai').replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300 text-xs font-black transition-colors shadow-xs"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>{config?.instagramHandle || '@ravis_tuition_madurai'}</span>
            </a>

            <a
              href={`https://wa.me/${(config?.whatsappNumber || '919842145890').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 text-xs font-black transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Doubt Line</span>
            </a>
          </div>
        </div>

        {/* Col 2: Madurai Address */}
        <div className="space-y-2">
          <span className="text-xs font-black text-[#1F2937] uppercase tracking-wider block">
            Classroom Location
          </span>
          <div className="space-y-1 text-gray-600 text-xs font-medium">
            <p className="flex items-start gap-1.5 text-gray-900 font-bold">
              <MapPin className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" />
              <span>{config.address}</span>
            </p>
            <p className="pl-5 text-[#B45309] font-bold">{config.landmark}</p>
            <p className="pl-5">{config.city}</p>
          </div>
          <a
            href="https://maps.google.com/?q=K.Pudur+Madurai+Mary+Ann+School"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#FF4D00] hover:underline inline-block pt-1 font-black"
          >
            Open in Google Maps →
          </a>
        </div>

        {/* Col 3: Programs & Trust */}
        <div className="space-y-2">
          <span className="text-xs font-black text-[#1F2937] uppercase tracking-wider block">
            Subjects Offered
          </span>
          <ul className="space-y-1.5 text-gray-600 text-xs font-semibold">
            <li>• 10th SSLC All Subjects Board Batch</li>
            <li>• 11th & 12th HSE Maths, Physics, Chem, Bio</li>
            <li>• Sunday Test Series & Rapid Question Bank</li>
            <li>• WhatsApp Progress Updates to Parents</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-gray-500">
        <div>
          © 1999 – 2026 {config.centreName}, Madurai. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span>Crafted for Madurai Students with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF4D00] fill-[#FF4D00]" />
          </div>
          {onOpenTutorAdmin && (
            <button
              onClick={onOpenTutorAdmin}
              className="text-gray-400 hover:text-slate-800 underline text-[11px]"
            >
              Tutor Login
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
