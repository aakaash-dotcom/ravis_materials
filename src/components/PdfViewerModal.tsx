import React, { useState } from 'react';
import { X, Download, Printer, ChevronLeft, ChevronRight, Sparkles, BookOpen, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { FreeResource, PremiumBundle } from '../types';
import { SAMPLE_STUDY_MATERIALS } from '../data/studyContent';

interface PdfViewerModalProps {
  resource?: FreeResource | null;
  bundle?: PremiumBundle | null;
  onClose: () => void;
  onUpgradeToBundle: (bundle: PremiumBundle) => void;
  relatedBundle?: PremiumBundle | null;
  isUnlocked?: boolean;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  resource,
  bundle,
  onClose,
  onUpgradeToBundle,
  relatedBundle,
  isUnlocked = false
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Look up study material or create dynamic mock material
  const resourceKey = resource?.id || (bundle?.id === 'bundle-10-maths-centum' ? 'res-m10' : 'res-p12');
  const sampleDoc = SAMPLE_STUDY_MATERIALS[resourceKey] || SAMPLE_STUDY_MATERIALS['res-m10'];
  
  const title = resource ? resource.title : bundle ? `${bundle.title} (Sneak Peek)` : 'Study Material';
  const subtitle = resource ? resource.chapter : bundle ? bundle.tagline : "Ravi's Tuition Centre, Madurai";
  const totalPages = sampleDoc?.pages?.length || 3;
  const activePageData = sampleDoc?.pages?.find(p => p.pageNumber === currentPage) || sampleDoc?.pages?.[0];

  const targetBundle = bundle || relatedBundle;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FFFBEB] border-4 border-[#7C3AED] rounded-[2.5rem] shadow-[10px_10px_0px_#7C3AED] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Toolbar */}
        <div className="p-4 sm:p-5 border-b-2 border-amber-200 bg-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-yellow-100 border-2 border-[#FFBB00] flex items-center justify-center text-[#B45309] shrink-0 font-black shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h2 className="text-base sm:text-lg font-black text-[#1F2937] truncate">
                {title}
              </h2>
              <p className="text-xs font-bold text-[#7C3AED] truncate">
                {subtitle} • Ravi's Tuition Centre, K.Pudur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(resource?.driveDownloadUrl || bundle?.driveFolderLink) && (
              <a
                href={resource?.driveDownloadUrl || bundle?.driveFolderLink || "https://drive.google.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F9D58] hover:bg-[#0c8249] text-white text-xs font-black transition-colors shadow-xs"
              >
                <span>Google Drive</span>
              </a>
            )}

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print/Save</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 font-bold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* PDF Document Canvas / Reader Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-amber-50/50 font-sans">
          <div className="max-w-3xl mx-auto bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-md border-2 border-amber-200">
            {/* Document Header (Authentic Board Exam / Tuition Header) */}
            <div className="border-b-4 border-slate-900 pb-4 mb-6 text-center">
              <div className="inline-block px-3.5 py-1 mb-2 rounded-full bg-yellow-200 text-yellow-950 font-black text-xs tracking-wider uppercase border border-yellow-300">
                {sampleDoc?.headerTag || "CONFIDENTIAL BOARD EXAM RESOURCE"}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                RAVI'S TUITION CENTRE • MADURAI
              </h1>
              <p className="text-xs text-slate-600 font-bold mt-1">
                Govindhan Street, K.Pudur (Opp. Mary Ann School) • Ph: +91 98421 45890
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-black text-slate-700 border-t-2 border-slate-200 pt-2 flex-wrap gap-2">
                <span>Class: 10th / 12th Board Exam Revision</span>
                <span>Examiner Blueprint Edition</span>
                <span>Page {currentPage} of {totalPages}</span>
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-6">
              <h2 className="text-base font-black text-indigo-950 border-l-4 border-amber-500 pl-3 py-0.5">
                {activePageData?.title}
              </h2>

              {activePageData?.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg">
                    {section.heading}
                  </h3>

                  <div className="space-y-4">
                    {section.items.map((item, iIdx) => (
                      <div key={iIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                        {item.question && (
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-bold text-slate-900 leading-relaxed">
                              {item.question}
                            </p>
                            {item.marks && (
                              <span className="shrink-0 px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-[10px] font-black">
                                {item.marks}
                              </span>
                            )}
                          </div>
                        )}

                        {item.formula && (
                          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg font-mono text-xs font-bold text-indigo-900">
                            {item.formula}
                          </div>
                        )}

                        {item.answer && (
                          <div className="text-xs text-slate-700 leading-relaxed pl-3 border-l-2 border-emerald-500">
                            <span className="font-bold text-emerald-800">Answer: </span>
                            {item.answer}
                          </div>
                        )}

                        {item.examTip && (
                          <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{item.examTip}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Watermark / Sneak peek alert if on last page */}
              {currentPage === totalPages && !isUnlocked && (
                <div className="p-5 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 text-amber-950 space-y-2 text-center">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                    🔒 Premium Twist Questions & Full Answer Keys
                  </span>
                  <p className="text-xs text-slate-700 max-w-md mx-auto">
                    The remaining 125 questions, complete step marking schemes, and Ravi Sir's voice notes are included in the complete Centum Pack.
                  </p>
                  {targetBundle && (
                    <button
                      onClick={() => onUpgradeToBundle(targetBundle)}
                      className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md"
                    >
                      <span>Unlock Complete Pack for ₹{targetBundle.price}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer page stamp */}
            <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-500 font-medium">
              Ravi's Tuition Centre • Madurai • K.Pudur • Opp. Mary Ann School • Since 1999 • All Rights Reserved
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Natural Upgrade CTA Bar */}
        <div className="p-3 sm:p-4 border-t-2 border-amber-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Page controls */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 disabled:opacity-30 hover:bg-slate-200 text-xs font-bold transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black text-[#1F2937] px-2 font-mono">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 disabled:opacity-30 hover:bg-slate-200 text-xs font-bold transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Natural Upsell trigger */}
          {targetBundle && !isUnlocked && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-600 hidden md:inline">
                Want all chapters + twist questions?
              </span>
              <button
                onClick={() => onUpgradeToBundle(targetBundle)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF4D00] hover:bg-[#E04400] text-white font-black text-xs shadow-md transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                <span>Get Full {targetBundle.classLevel} Bundle (₹{targetBundle.price})</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
