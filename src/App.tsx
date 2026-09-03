import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  BookOpen, 
  X, 
  ShoppingBag, 
  GraduationCap, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ClassSelectionView } from './components/ClassSelectionView';
import { FreeResourceCard } from './components/FreeResourceCard';
import { WideCentumCard } from './components/WideCentumCard';
import { EcommerceProductCard } from './components/EcommerceProductCard';
import { CartDrawer } from './components/CartDrawer';
import { PricingPlansView } from './components/PricingPlansView';
import { ExamToolsView } from './components/ExamToolsView';
import { TutorAdminView } from './components/TutorAdminView';
import { PdfViewerModal } from './components/PdfViewerModal';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { MaduraiTrustSection } from './components/MaduraiTrustSection';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';

import { FREE_RESOURCES, PREMIUM_BUNDLES, DEFAULT_TUTOR_CONFIG } from './data/mockData';
import { AppPage, FreeResource, PremiumBundle, ClassLevel, Subject, ExamType, TutorConfig, Language, CartItem } from './types';
import { triggerConfetti } from './utils/payment';

export default function App() {
  // Config & Localization
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

  // Selected Class: Can be null on initial load so students select their standard first!
  const [selectedClass, setSelectedClass] = useState<ClassLevel | null>(() => {
    try {
      const saved = localStorage.getItem('ravis_selected_class');
      if (saved && ['9th', '10th', '11th', '12th'].includes(saved)) {
        return saved as ClassLevel;
      }
    } catch {}
    return null;
  });

  // Filter States
  const [selectedSubject, setSelectedSubject] = useState<'All' | Subject>('All');
  const [selectedExam, setSelectedExam] = useState<'All' | ExamType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [splitMode, setSplitMode] = useState<'split' | 'free_only' | 'premium_only'>('split');
  const [activeReelCode, setActiveReelCode] = useState('');

  // Cart Management
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ravis_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Unlocked bundles
  const [unlockedBundleIds, setUnlockedBundleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ravis_tuition_unlocked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom resources added by tutor
  const [customResources, setCustomResources] = useState<FreeResource[]>(() => {
    try {
      const saved = localStorage.getItem('ravis_custom_resources');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Active Selections
  const [activePreviewBundle, setActivePreviewBundle] = useState<PremiumBundle | null>(null);
  const [activeBuyBundle, setActiveBuyBundle] = useState<PremiumBundle | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persistence effects
  useEffect(() => {
    if (selectedClass) {
      localStorage.setItem('ravis_selected_class', selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    localStorage.setItem('ravis_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddResource = (resource: FreeResource) => {
    const updated = [resource, ...customResources];
    setCustomResources(updated);
    localStorage.setItem('ravis_custom_resources', JSON.stringify(updated));
  };

  const handleDeleteResource = (id: string) => {
    const updated = customResources.filter((r) => r.id !== id);
    setCustomResources(updated);
    localStorage.setItem('ravis_custom_resources', JSON.stringify(updated));
  };

  const handleSaveConfig = (newConfig: TutorConfig) => {
    setConfig(newConfig);
    localStorage.setItem('ravis_tuition_config', JSON.stringify(newConfig));
  };

  // Combine custom resources with mock resources
  const allFreeResources = useMemo(() => {
    return [...customResources, ...FREE_RESOURCES];
  }, [customResources]);

  // URL query parameter parsing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('pdf') || params.get('code');
    const page = params.get('page') || params.get('tab');
    const cls = params.get('class');
    const sub = params.get('subject');

    if (code) {
      setActiveReelCode(code.toUpperCase());
    }
    if (page && ['study', 'pricing', 'tools', 'calculator', 'trust', 'tutor'].includes(page)) {
      setCurrentPage(page as AppPage);
    }
    if (cls) {
      if (cls === '9' || cls === '9th') setSelectedClass('9th');
      else if (cls === '10' || cls === '10th') setSelectedClass('10th');
      else if (cls === '11' || cls === '11th') setSelectedClass('11th');
      else if (cls === '12' || cls === '12th') setSelectedClass('12th');
    }
    if (sub) {
      const match = allFreeResources.find((r) => r.subject.toLowerCase() === sub.toLowerCase());
      if (match) setSelectedSubject(match.subject);
    }
  }, [allFreeResources]);

  // Matching reel resource
  const matchingReelResource = useMemo(() => {
    if (!activeReelCode) return undefined;
    return allFreeResources.find(
      (r) => r.id.toLowerCase() === activeReelCode.toLowerCase() ||
             r.reelCode?.toUpperCase() === activeReelCode.toUpperCase()
    );
  }, [activeReelCode, allFreeResources]);

  // Available subjects for the selected class
  const availableSubjects = useMemo(() => {
    if (!selectedClass) return [];
    const subs = new Set<Subject>();
    allFreeResources
      .filter((r) => r.classLevel === selectedClass)
      .forEach((r) => subs.add(r.subject));
    return Array.from(subs);
  }, [selectedClass, allFreeResources]);

  // Display sections: Group free resources into 4-packs per subject with their matching Centum bundle
  const displaySections = useMemo(() => {
    if (!selectedClass) return [];

    const subjectsToProcess = selectedSubject === 'All'
      ? availableSubjects
      : [selectedSubject];

    return subjectsToProcess.map((subj) => {
      const resources = allFreeResources.filter(
        (r) => r.classLevel === selectedClass && r.subject === subj
      );
      // Find matching bundle for this subject and class
      const bundle = PREMIUM_BUNDLES.find(
        (b) => b.classLevel === selectedClass && b.subjects.includes(subj)
      ) || PREMIUM_BUNDLES.find((b) => b.classLevel === selectedClass);

      return {
        subject: subj,
        resources,
        bundle,
      };
    }).filter((s) => s.resources.length > 0);
  }, [selectedClass, selectedSubject, availableSubjects, allFreeResources]);

  // Filtered resources for the selected class and subject
  const filteredFreeResources = useMemo(() => {
    return allFreeResources.filter((res) => {
      if (selectedClass && res.classLevel !== selectedClass) return false;
      if (selectedSubject !== 'All' && res.subject !== selectedSubject) return false;
      return true;
    });
  }, [allFreeResources, selectedClass, selectedSubject]);

  // Filtered bundles for the selected class and subject
  const filteredPremiumBundles = useMemo(() => {
    return PREMIUM_BUNDLES.filter((bundle) => {
      if (selectedClass && bundle.classLevel !== selectedClass) return false;
      if (selectedSubject !== 'All' && !bundle.subjects.includes(selectedSubject)) return false;
      return true;
    });
  }, [selectedClass, selectedSubject]);

  // Free PDF Download Tracker
  const handleDownloadFreeResource = (resource: FreeResource) => {
    resource.downloadCount += 1;
    // triggerConfetti for fun student delight
    triggerConfetti();
  };

  // Cart actions
  const handleAddToCart = (bundle: PremiumBundle) => {
    const exists = cartItems.some((i) => i.bundle.id === bundle.id);
    if (!exists) {
      setCartItems((prev) => [...prev, { bundle, addedAt: Date.now() }]);
      triggerConfetti();
    }
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (bundleId: string) => {
    setCartItems((prev) => prev.filter((i) => i.bundle.id !== bundleId));
  };

  // Cart checkout via UPI
  const handleCartCheckout = (bundles: PremiumBundle[], totalAmount: number) => {
    setIsCartOpen(false);
    if (bundles.length === 1) {
      setActiveBuyBundle(bundles[0]);
    } else {
      // Composite bundle representing the cart
      const combo: PremiumBundle = {
        ...bundles[0],
        id: bundles.map((b) => b.id).join('_'),
        title: `Study Cart (${bundles.length} Centum Books)`,
        price: totalAmount,
        originalPrice: bundles.reduce((s, b) => s + b.originalPrice, 0),
        savingsPercent: 75,
        tagline: `${bundles.map((b) => b.title).join(' + ')}`,
        tanglishTagline: 'Complete Cart Pack with Google Drive Master Folders',
      };
      setActiveBuyBundle(combo);
    }
  };

  // Payment success handler
  const handlePaymentSuccess = (bundleId: string) => {
    // If it's a composite combo, unlock all constituent bundles
    const idsToUnlock = bundleId.includes('_') ? bundleId.split('_') : [bundleId];
    const newUnlocked = Array.from(new Set([...unlockedBundleIds, ...idsToUnlock]));
    setUnlockedBundleIds(newUnlocked);
    localStorage.setItem('ravis_tuition_unlocked', JSON.stringify(newUnlocked));

    // Clear matching items from cart
    setCartItems((prev) => prev.filter((i) => !idsToUnlock.includes(i.bundle.id)));

    // Open Google Drive folder for student
    const purchased = PREMIUM_BUNDLES.find((b) => idsToUnlock.includes(b.id));
    if (purchased && purchased.driveFolderLink) {
      window.open(purchased.driveFolderLink, '_blank');
    }

    setActiveBuyBundle(null);
  };

  const cartItemIds = useMemo(() => cartItems.map((i) => i.bundle.id), [cartItems]);

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1F2937] flex flex-col font-sans selection:bg-[#FFBB00] selection:text-black">
      {/* Top Navbar with Class Switcher and Cart Drawer Trigger */}
      <Navbar
        config={config}
        lang={lang}
        setLang={setLang}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onNavigate={setCurrentPage}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenTutorAdmin={() => setCurrentPage('tutor')}
        unlockedCount={unlockedBundleIds.length}
        selectedClass={selectedClass}
        onChangeClass={() => setSelectedClass(null)}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-2.5 sm:px-4 py-3 sm:py-6 space-y-4 pb-24 md:pb-10">
        
        {/* STEP 1: INITIAL CLASS SELECTION SCREEN (When no class is selected yet) */}
        {!selectedClass && currentPage === 'study' && (
          <div className="animate-in fade-in duration-200">
            <ClassSelectionView
              onSelectClass={(cls) => setSelectedClass(cls)}
              lang={lang}
              config={config}
            />
          </div>
        )}

        {/* STEP 2: CLASSROOM DASHBOARD (When student selects 9th, 10th, 11th, or 12th) */}
        {selectedClass && currentPage === 'study' && (
          <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-200">
            
            {/* MINIMAL TOP BAR: Back Button + Standard Title + Subject Dropdown Filter */}
            <div className="flex items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border-2 border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setSelectedClass(null);
                    setSelectedSubject('All');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <h2 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                  {selectedClass} Standard
                </h2>
              </div>

              {/* Subject Dropdown Filter (The ONLY filter needed) */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <label htmlFor="subject-select" className="text-xs font-black text-slate-600 hidden sm:inline">
                  Subject:
                </label>
                <select
                  id="subject-select"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value as Subject | 'All')}
                  aria-label="Filter by subject"
                  className="text-xs font-black bg-white border-2 border-slate-300 rounded-xl px-2.5 sm:px-3 py-1.5 text-slate-800 focus:border-[#FF4D00] focus:outline-none cursor-pointer"
                >
                  <option value="All">All Subjects</option>
                  {availableSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* INSTAGRAM REEL MATCH BANNER (If opened from reel URL) */}
            {matchingReelResource && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Sparkles className="w-4 h-4 text-[#FF4D00] shrink-0" />
                  <div className="truncate text-xs font-black text-slate-900">
                    <span className="text-[#FF4D00]">Reel {matchingReelResource.reelCode}:</span> {matchingReelResource.title}
                  </div>
                </div>
                <button
                  onClick={() => handleDownloadFreeResource(matchingReelResource)}
                  className="px-3 py-1 rounded-lg bg-[#0F9D58] text-white text-xs font-black shrink-0 shadow-xs cursor-pointer"
                >
                  Open PDF
                </button>
              </div>
            )}

            {/* 4 FREE BOXES + 1 WIDE CENTUM CARD FOR EVERY 4 BOXES */}
            {displaySections.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 text-xs font-bold">
                No study material found for this subject.
              </div>
            ) : (
              <div className="space-y-4">
                {displaySections.map((section) => {
                  const chunks: FreeResource[][] = [];
                  for (let i = 0; i < section.resources.length; i += 4) {
                    chunks.push(section.resources.slice(i, i + 4));
                  }

                  return (
                    <div key={section.subject} className="space-y-3">
                      {chunks.map((chunk, chunkIdx) => (
                        <React.Fragment key={`${section.subject}-chunk-${chunkIdx}`}>
                          {/* 4 Free PDF boxes side by side (2x2 on mobile, 4 in a row on desktop) */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
                            {chunk.map((resource) => (
                              <FreeResourceCard
                                key={resource.id}
                                resource={resource}
                                onDownload={handleDownloadFreeResource}
                                lang={lang}
                              />
                            ))}
                          </div>

                          {/* 5th Box: Big Wide Centum Box covering all 4 boxes at the bottom */}
                          {section.bundle && chunkIdx === 0 && (
                            <WideCentumCard
                              bundle={section.bundle}
                              lang={lang}
                              isUnlocked={unlockedBundleIds.includes(section.bundle.id)}
                              isInCart={cartItemIds.includes(section.bundle.id)}
                              onPreviewSample={(b) => setActivePreviewBundle(b)}
                              onAddToCart={handleAddToCart}
                              onBuyNow={(b) => setActiveBuyBundle(b)}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* PAGE 2: DEDICATED CENTUM PACKS STORE (Full E-Commerce Catalog) */}
        {currentPage === 'pricing' && (
          <div className="animate-in fade-in duration-200">
            <PricingPlansView
              lang={lang}
              bundles={PREMIUM_BUNDLES}
              onSelectBundle={(bundle) => setActiveBuyBundle(bundle)}
              config={config}
              unlockedBundleIds={unlockedBundleIds}
              onPreviewSample={(bundle) => setActivePreviewBundle(bundle)}
              onAddToCart={handleAddToCart}
              cartItemIds={cartItemIds}
              initialClass={selectedClass || '12th'}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </div>
        )}

        {/* PAGE 3: EXAM TOOLS (Countdown + 95+ Calculator + 180-min Exam Strategy) */}
        {(currentPage === 'tools' || currentPage === 'calculator') && (
          <div className="animate-in fade-in duration-200">
            <ExamToolsView
              lang={lang}
              bundles={PREMIUM_BUNDLES}
              onSelectBundle={(bundle) => setActiveBuyBundle(bundle)}
            />
          </div>
        )}

        {/* PAGE 4: RESULTS & TRUST */}
        {currentPage === 'trust' && (
          <div className="animate-in fade-in duration-200 space-y-6">
            <MaduraiTrustSection config={config} lang={lang} />
          </div>
        )}

        {/* PAGE 5: TUTOR ADMIN PORTAL (PIN Protected: 1999 or 1234) */}
        {currentPage === 'tutor' && (
          <div className="animate-in fade-in duration-200">
            <TutorAdminView
              config={config}
              onSaveConfig={handleSaveConfig}
              customResources={customResources}
              onAddResource={handleAddResource}
              onDeleteResource={handleDeleteResource}
              bundles={PREMIUM_BUNDLES}
              onBackToStudentView={() => setCurrentPage('study')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        config={config}
        lang={lang}
        onOpenTutorAdmin={() => setCurrentPage('tutor')}
      />

      {/* MOBILE BOTTOM NAVIGATION */}
      <MobileBottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onNavigate={setCurrentPage}
        lang={lang}
        unlockedCount={unlockedBundleIds.length}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* E-COMMERCE CART SLIDE-OVER DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCartCheckout}
        onExplore={() => {
          setIsCartOpen(false);
          setCurrentPage('pricing');
        }}
      />

      {/* PDF SAMPLE PREVIEW MODAL */}
      {activePreviewBundle && (
        <PdfViewerModal
          bundle={activePreviewBundle}
          isOpen={true}
          onClose={() => setActivePreviewBundle(null)}
          onUnlock={() => {
            const bundle = activePreviewBundle;
            setActivePreviewBundle(null);
            setActiveBuyBundle(bundle);
          }}
          isUnlocked={unlockedBundleIds.includes(activePreviewBundle.id)}
          lang={lang}
        />
      )}

      {/* UPI PAYMENT MODAL WITH INSTANT GOOGLE DRIVE UNLOCK */}
      {activeBuyBundle && (
        <UpiPaymentModal
          bundle={activeBuyBundle}
          config={config}
          onClose={() => setActiveBuyBundle(null)}
          onPaymentSuccess={handlePaymentSuccess}
          lang={lang}
        />
      )}

      {/* SETTINGS MODAL */}
      {isSettingsOpen && (
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          config={config}
          onSave={handleSaveConfig}
          onSaveConfig={handleSaveConfig}
          unlockedCount={unlockedBundleIds.length}
          onResetUnlocked={() => {
            setUnlockedBundleIds([]);
            localStorage.removeItem('ravis_tuition_unlocked');
          }}
        />
      )}
    </div>
  );
}
