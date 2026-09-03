import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Download, 
  FileText, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Search, 
  Share2, 
  ExternalLink,
  Flame,
  Star,
  Award,
  Plus,
  BookOpen,
  X
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FilterBar } from './components/FilterBar';
import { FreeResourceCard } from './components/FreeResourceCard';
import { PremiumBundleCard } from './components/PremiumBundleCard';
import { PricingPlansView } from './components/PricingPlansView';
import { ScoreCalculatorView } from './components/ScoreCalculatorView';
import { PdfViewerModal } from './components/PdfViewerModal';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { MaduraiTrustSection } from './components/MaduraiTrustSection';
import { MarksCalculatorModal } from './components/MarksCalculatorModal';
import { SettingsModal } from './components/SettingsModal';
import { AddPdfModal } from './components/AddPdfModal';
import { Footer } from './components/Footer';

import { FREE_RESOURCES, PREMIUM_BUNDLES, DEFAULT_TUTOR_CONFIG } from './data/mockData';
import { AppPage, FreeResource, PremiumBundle, ClassLevel, Subject, ExamType, TutorConfig, Language } from './types';
import { triggerConfetti } from './utils/payment';

export default function App() {
  // Config & Localization (Strictly Tanglish and Tamil)
  const [config, setConfig] = useState<TutorConfig>(() => {
    try {
      const saved = localStorage.getItem('ravis_tuition_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_TUTOR_CONFIG, ...parsed };
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TUTOR_CONFIG;
  });

  const [lang, setLang] = useState<Language>('tanglish');
  const [currentPage, setCurrentPage] = useState<AppPage>('study');

  // Custom resources added by tutor via Google Drive link modal
  const [customResources, setCustomResources] = useState<FreeResource[]>(() => {
    try {
      const saved = localStorage.getItem('ravis_custom_resources');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter States
  const [selectedClass, setSelectedClass] = useState<'All' | ClassLevel>('All');
  const [selectedSubject, setSelectedSubject] = useState<'All' | Subject>('All');
  const [selectedExam, setSelectedExam] = useState<'All' | ExamType>('All');
  const [viewMode, setViewMode] = useState<'all' | 'free_only' | 'premium_only'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReelCode, setActiveReelCode] = useState('');

  // Unlocked bundles
  const [unlockedBundleIds, setUnlockedBundleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ravis_tuition_unlocked');
    return saved ? JSON.parse(saved) : [];
  });

  // Modals & Active Selections
  const [activePreviewResource, setActivePreviewResource] = useState<FreeResource | null>(null);
  const [activePreviewBundle, setActivePreviewBundle] = useState<PremiumBundle | null>(null);
  const [activeBuyBundle, setActiveBuyBundle] = useState<PremiumBundle | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddPdfOpen, setIsAddPdfOpen] = useState(false);
  const [highlightedBundleId, setHighlightedBundleId] = useState<string | null>(null);

  // Conversion Toast Trigger
  const [conversionToast, setConversionToast] = useState<{
    resource: FreeResource;
    bundle: PremiumBundle;
  } | null>(null);

  // Combine custom resources with default mock data
  const allFreeResources = useMemo(() => {
    return [...customResources, ...FREE_RESOURCES];
  }, [customResources]);

  // Parse URL search params (e.g. ?subject=Economics&class=12th&exam=Quarterly or ?pdf=res-eco12 or ?code=ECO12)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('pdf') || params.get('code');
    const page = params.get('page') || params.get('tab');
    const cls = params.get('class');
    const sub = params.get('subject');
    const ex = params.get('exam');

    if (code) {
      setActiveReelCode(code.toUpperCase());
    }
    if (page && (page === 'study' || page === 'pricing' || page === 'calculator' || page === 'trust')) {
      setCurrentPage(page as AppPage);
    }
    if (cls) {
      if (cls === '10' || cls === '10th') setSelectedClass('10th');
      else if (cls === '11' || cls === '11th') setSelectedClass('11th');
      else if (cls === '12' || cls === '12th') setSelectedClass('12th');
    }
    if (sub) {
      const matchSub = allFreeResources.find(r => r.subject.toLowerCase() === sub.toLowerCase());
      if (matchSub) setSelectedSubject(matchSub.subject);
    }
    if (ex) {
      if (ex.toLowerCase().includes('quarter')) setSelectedExam('Quarterly');
      else if (ex.toLowerCase().includes('half')) setSelectedExam('Half-Yearly');
      else if (ex.toLowerCase().includes('public') || ex.toLowerCase().includes('board')) setSelectedExam('Public Board');
    }
  }, [allFreeResources]);

  // Matching resource for active Reel Code / URL parameter (From Auto DM)
  const matchingReelResource = useMemo(() => {
    if (!activeReelCode) return undefined;
    return allFreeResources.find(
      (r) => r.id.toLowerCase() === activeReelCode.toLowerCase() ||
             r.reelCode?.toUpperCase() === activeReelCode.toUpperCase()
    );
  }, [activeReelCode, allFreeResources]);

  const relatedReelBundle = useMemo(() => {
    if (!matchingReelResource?.relatedBundleId) return undefined;
    return PREMIUM_BUNDLES.find((b) => b.id === matchingReelResource.relatedBundleId);
  }, [matchingReelResource]);

  // Save config changes
  const handleSaveConfig = (newConfig: TutorConfig) => {
    setConfig(newConfig);
    localStorage.setItem('ravis_tuition_config', JSON.stringify(newConfig));
  };

  // Reset unlocked purchases for testing
  const handleResetUnlocked = () => {
    setUnlockedBundleIds([]);
    localStorage.removeItem('ravis_tuition_unlocked');
  };

  // Handle successful purchase/unlock
  const handlePaymentSuccess = (bundleId: string) => {
    if (!unlockedBundleIds.includes(bundleId)) {
      const updated = [...unlockedBundleIds, bundleId];
      setUnlockedBundleIds(updated);
      localStorage.setItem('ravis_tuition_unlocked', JSON.stringify(updated));
    }
    setActiveBuyBundle(null);
  };

  // Filtered Free Resources
  const filteredFreeResources = useMemo(() => {
    return allFreeResources.filter((res) => {
      // Reel code match
      if (activeReelCode && res.reelCode?.toUpperCase() !== activeReelCode.toUpperCase() && res.id !== activeReelCode) {
        return false;
      }
      // Class filter
      if (selectedClass !== 'All' && res.classLevel !== selectedClass) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== 'All' && res.subject !== selectedSubject) {
        return false;
      }
      // Exam filter
      if (selectedExam !== 'All' && res.examType && res.examType !== selectedExam) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = res.title.toLowerCase().includes(q) || res.tanglishTitle.toLowerCase().includes(q);
        const matchChapter = res.chapter.toLowerCase().includes(q);
        const matchCode = res.reelCode?.toLowerCase().includes(q);
        if (!matchTitle && !matchChapter && !matchCode) return false;
      }
      return true;
    });
  }, [allFreeResources, selectedClass, selectedSubject, selectedExam, searchQuery, activeReelCode]);

  // Filtered Premium Bundles
  const filteredPremiumBundles = useMemo(() => {
    return PREMIUM_BUNDLES.filter((bundle) => {
      // Class filter
      if (selectedClass !== 'All' && bundle.classLevel !== selectedClass) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== 'All' && !bundle.subjects.includes(selectedSubject as Subject)) {
        return false;
      }
      // Exam filter
      if (selectedExam !== 'All' && bundle.examType && bundle.examType !== selectedExam) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = bundle.title.toLowerCase().includes(q) || bundle.tagline.toLowerCase().includes(q);
        if (!matchTitle) return false;
      }
      return true;
    });
  }, [selectedClass, selectedSubject, selectedExam, searchQuery]);

  // Handle Free Download with the Natural Bridge trigger
  const handleDownloadFreeResource = (resource: FreeResource) => {
    triggerConfetti();
    const related = PREMIUM_BUNDLES.find((b) => b.id === resource.relatedBundleId);
    if (related && !unlockedBundleIds.includes(related.id)) {
      setConversionToast({ resource, bundle: related });
      setTimeout(() => {
        setConversionToast((prev) => (prev?.resource.id === resource.id ? null : prev));
      }, 8000);
    }
  };

  // Bridge action: jump to bundle smoothly
  const handleJumpToBundle = (bundle: PremiumBundle) => {
    if (currentPage !== 'study') {
      setCurrentPage('study');
    }
    setHighlightedBundleId(bundle.id);
    setTimeout(() => {
      const element = document.getElementById(bundle.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    setTimeout(() => {
      setHighlightedBundleId(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1F2937] flex flex-col font-sans selection:bg-[#FFBB00] selection:text-black">
      {/* Top Navbar with Tab Navigation and Strict 2-Language Toggle */}
      <Navbar
        config={config}
        lang={lang}
        setLang={setLang}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onNavigate={setCurrentPage}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenCalculator={() => setCurrentPage('calculator')}
        onOpenAddPdf={() => setIsAddPdfOpen(true)}
        unlockedCount={unlockedBundleIds.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 py-3.5 sm:py-6 space-y-4 sm:space-y-6 pb-24 md:pb-10">
        {/* PAGE 1: STUDY MATERIAL & FREE PDFS */}
        {currentPage === 'study' && (
          <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
            
            {/* INSTAGRAM REEL / AUTO DM DIRECT MATCH CARD (Compact, at top only if reel matched) */}
            {matchingReelResource && (
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border-2 border-amber-400 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FF4D00] text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4D00] bg-white px-2 py-0.5 rounded-md border border-amber-300">
                        Instagram Reel Match: {matchingReelResource.reelCode || matchingReelResource.subject}
                      </span>
                      <span className="text-[10px] font-bold text-gray-600">
                        {matchingReelResource.classLevel} • {matchingReelResource.examType || 'Quarterly'}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight mt-0.5">
                      {matchingReelResource.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end">
                  <a
                    href={matchingReelResource.driveLink || 'https://drive.google.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDownloadFreeResource(matchingReelResource)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F9D58] hover:bg-[#0c8249] text-white text-xs font-black shadow-xs transition-transform active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Google Drive (Free)</span>
                  </a>

                  {relatedReelBundle && (
                    <button
                      onClick={() => setActivePreviewBundle(relatedReelBundle)}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-black shadow-xs transition-transform active:scale-95"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>3-Page Sample (₹{relatedReelBundle.price})</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveReelCode('')}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-black hover:bg-white/50"
                    title="View All Material"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* COMPACT FILTER BAR */}
            <FilterBar
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedExam={selectedExam}
              setSelectedExam={setSelectedExam}
              viewMode={viewMode}
              setViewMode={setViewMode}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              freeCount={filteredFreeResources.length}
              premiumCount={filteredPremiumBundles.length}
            />

            {/* QUICK ACTIONS STRIP: Count + Add PDF for Tutor */}
            <div className="flex items-center justify-between gap-2 px-1 text-xs">
              <span className="font-extrabold text-slate-700">
                {viewMode === 'premium_only' ? (
                  <span>Centum Booster Packs ({filteredPremiumBundles.length})</span>
                ) : (
                  <span>Free Study Material ({filteredFreeResources.length} PDFs)</span>
                )}
              </span>

              <button
                onClick={() => setIsAddPdfOpen(true)}
                className="flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg transition-colors border border-emerald-300"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Drive Link (Tutor)</span>
              </button>
            </div>

            {/* FREE RESOURCES SECTION (Compact Cards for High Mobile Screen Density) */}
            {(viewMode === 'all' || viewMode === 'free_only') && (
              <section className="space-y-3">
                {filteredFreeResources.length === 0 ? (
                  <div className="p-6 text-center bg-white rounded-2xl border-2 border-amber-200 text-gray-500 text-xs font-bold shadow-xs">
                    {lang === 'tanglish'
                      ? 'No material found for this filter. Try selecting "All" or adding a PDF.'
                      : 'தேர்வு செய்த பாடப்பிரிவில் கையேடுகள் இல்லை. வகுப்பை மாற்றி முயற்சிக்கவும்.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {filteredFreeResources.map((res) => {
                      const relatedBundle = PREMIUM_BUNDLES.find((b) => b.id === res.relatedBundleId);
                      return (
                        <FreeResourceCard
                          key={res.id}
                          resource={res}
                          relatedBundle={relatedBundle}
                          onPreview={(r) => setActivePreviewResource(r)}
                          onDownload={handleDownloadFreeResource}
                          onSelectBundle={(bundle) => setActiveBuyBundle(bundle)}
                          onPreviewSample={(bundle) => setActivePreviewBundle(bundle)}
                          lang={lang}
                        />
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* PREMIUM CENTUM BUNDLES SECTION */}
            {(viewMode === 'all' || viewMode === 'premium_only') && (
              <section className="space-y-3 pt-2">
                <div className="flex items-center justify-between gap-2 border-t-2 border-amber-200/80 pt-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#1F2937] tracking-tight">
                      {lang === 'tanglish'
                        ? 'Centum Booster Bundles (₹49 Pro)'
                        : 'சென்டம் பூஸ்டர் வினா தொகுப்புகள் (₹49)'}
                    </h2>
                    <p className="text-[11px] text-gray-600 font-semibold">
                      Twist questions + step marks + lifetime Google Drive complete folder.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentPage('pricing')}
                    className="text-xs font-black text-[#FF4D00] hover:underline shrink-0"
                  >
                    Compare Tiers →
                  </button>
                </div>

                {filteredPremiumBundles.length === 0 ? (
                  <div className="p-6 text-center bg-white rounded-2xl border-2 border-amber-200 text-gray-500 text-xs font-bold shadow-xs">
                    No bundles match this filter. Check all classes for complete packs!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPremiumBundles.map((bundle) => {
                      const isUnlocked = unlockedBundleIds.includes(bundle.id);
                      return (
                        <PremiumBundleCard
                          key={bundle.id}
                          bundle={bundle}
                          isUnlocked={isUnlocked}
                          onPreviewSample={(b) => setActivePreviewBundle(b)}
                          onBuy={(b) => setActiveBuyBundle(b)}
                          lang={lang}
                          isHighlighted={highlightedBundleId === bundle.id}
                        />
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* Madurai Trust Strip */}
            <div className="pt-2">
              <MaduraiTrustSection config={config} lang={lang} />
            </div>
          </div>
        )}

        {/* PAGE 2: PRICING & TIERS (Free vs Pro vs Ultra Pro) */}
        {currentPage === 'pricing' && (
          <div className="animate-in fade-in duration-200">
            <PricingPlansView
              bundles={PREMIUM_BUNDLES}
              unlockedBundleIds={unlockedBundleIds}
              onSelectBundle={(bundle) => setActiveBuyBundle(bundle)}
              onPreviewSample={(bundle) => setActivePreviewBundle(bundle)}
              lang={lang}
              config={config}
              onGoToStudy={() => setCurrentPage('study')}
            />
          </div>
        )}

        {/* PAGE 3: SCORE CALCULATOR (Dedicated View with Exam Countdown) */}
        {currentPage === 'calculator' && (
          <div className="animate-in fade-in duration-200">
            <ScoreCalculatorView
              lang={lang}
              bundles={PREMIUM_BUNDLES}
              onSelectBundle={(bundleId) => {
                const b = PREMIUM_BUNDLES.find((p) => p.id === bundleId);
                if (b) setActiveBuyBundle(b);
              }}
            />
          </div>
        )}

        {/* PAGE 4: RESULTS & TRUST (Dedicated View) */}
        {currentPage === 'trust' && (
          <div className="animate-in fade-in duration-200 space-y-6">
            <MaduraiTrustSection config={config} lang={lang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer config={config} lang={lang} />

      {/* MOBILE BOTTOM NAVIGATION (Sticky on mobile, 1-tap switching) */}
      <MobileBottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onNavigate={setCurrentPage}
        lang={lang}
        unlockedCount={unlockedBundleIds.length}
      />

      {/* NATURAL CONVERSION TOAST (Triggered when a free PDF is downloaded) */}
      {conversionToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-5 right-4 left-4 sm:left-auto sm:right-5 z-40 max-w-sm bg-white border-4 border-[#7C3AED] rounded-3xl p-5 shadow-[8px_8px_0px_#7C3AED] animate-in fade-in slide-in-from-bottom-6 duration-300 text-[#1F2937]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0 font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-emerald-800 block">
                {lang === 'tanglish' ? 'Free PDF Google Drive-la Ready! 🚀' : 'இலவச பிடிஎப் கூகுள் டிரைவில் தயார்! 🚀'}
              </span>
              <p className="text-xs text-gray-700 font-semibold mt-1 leading-snug">
                {lang === 'tanglish' ? (
                  <>
                    Exam hall-la twist question vantha? Ravi Sir's <strong className="text-black">{conversionToast.bundle.title}</strong> has all 25 hidden twist models for just <strong className="text-[#FF4D00]">₹{conversionToast.bundle.price}</strong>!
                  </>
                ) : (
                  <>
                    கட்டாய வினாக்களுக்கு Ravi Sir-ன் <strong className="text-black">{conversionToast.bundle.title}</strong> தொகுப்பை பெறுங்கள் (மட்டும் <span className="text-[#FF4D00] font-black">₹{conversionToast.bundle.price}</span>).
                  </>
                )}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveBuyBundle(conversionToast.bundle);
                    setConversionToast(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#FF4D00] hover:bg-[#E04400] text-white font-black text-xs shadow-md active:scale-95 transition-all"
                >
                  Inspect Pack (₹{conversionToast.bundle.price})
                </button>
                <button
                  onClick={() => setConversionToast(null)}
                  className="px-2.5 py-2 text-xs font-bold text-gray-500 hover:text-black transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
            <button
              onClick={() => setConversionToast(null)}
              className="text-gray-400 hover:text-gray-700 p-1"
            >
              <span className="sr-only">Close</span>
              &times;
            </button>
          </div>
        </aside>
      )}

      {/* PDF SNEAK PEEK & 3-PAGE SAMPLE VIEWER */}
      {(activePreviewResource || activePreviewBundle) && (
        <PdfViewerModal
          resource={activePreviewResource}
          bundle={activePreviewBundle}
          isUnlocked={activePreviewBundle ? unlockedBundleIds.includes(activePreviewBundle.id) : false}
          onClose={() => {
            setActivePreviewResource(null);
            setActivePreviewBundle(null);
          }}
          onUpgradeToBundle={(target) => {
            setActivePreviewResource(null);
            setActivePreviewBundle(null);
            setActiveBuyBundle(target);
          }}
          relatedBundle={
            activePreviewResource
              ? PREMIUM_BUNDLES.find((b) => b.id === activePreviewResource.relatedBundleId)
              : null
          }
        />
      )}

      {/* ZERO-FEE UPI PAYMENT MODAL */}
      {activeBuyBundle && (
        <UpiPaymentModal
          bundle={activeBuyBundle}
          config={config}
          onClose={() => setActiveBuyBundle(null)}
          onPaymentSuccess={handlePaymentSuccess}
          lang={lang}
        />
      )}

      {/* 95+ MARKS CALCULATOR MODAL */}
      {isCalculatorOpen && (
        <MarksCalculatorModal
          onClose={() => setIsCalculatorOpen(false)}
          onSelectBundle={(bundleId) => {
            const b = PREMIUM_BUNDLES.find((p) => p.id === bundleId);
            if (b) handleJumpToBundle(b);
          }}
          lang={lang}
        />
      )}

      {/* TUTOR CONTROL SETTINGS MODAL */}
      {isSettingsOpen && (
        <SettingsModal
          config={config}
          onSave={handleSaveConfig}
          onClose={() => setIsSettingsOpen(false)}
          onResetUnlocked={handleResetUnlocked}
          unlockedCount={unlockedBundleIds.length}
        />
      )}

      {/* ADD NEW PDF MODAL FOR TUTOR */}
      {isAddPdfOpen && (
        <AddPdfModal
          onClose={() => setIsAddPdfOpen(false)}
          onAddResource={(newRes) => {
            const updated = [newRes, ...customResources];
            setCustomResources(updated);
            localStorage.setItem('ravis_custom_resources', JSON.stringify(updated));
          }}
          bundles={PREMIUM_BUNDLES}
          lang={lang}
        />
      )}
    </div>
  );
}
