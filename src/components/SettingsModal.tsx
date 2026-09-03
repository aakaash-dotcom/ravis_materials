import React, { useState } from 'react';
import { X, Save, Sliders, CheckCircle2, ShieldCheck, Database, HardDrive, CreditCard, RotateCcw } from 'lucide-react';
import { TutorConfig } from '../types';
import { DEFAULT_TUTOR_CONFIG } from '../data/mockData';

interface SettingsModalProps {
  config: TutorConfig;
  onSave: (newConfig: TutorConfig) => void;
  onClose: () => void;
  onResetUnlocked: () => void;
  unlockedCount: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  config,
  onSave,
  onClose,
  onResetUnlocked,
  unlockedCount
}) => {
  const [formData, setFormData] = useState<TutorConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetToDefault = () => {
    setFormData({ ...DEFAULT_TUTOR_CONFIG });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FFFBEB] border-4 border-[#7C3AED] rounded-[2.5rem] shadow-[10px_10px_0px_#7C3AED] overflow-hidden flex flex-col max-h-[90vh] text-[#1F2937]">
        {/* Header */}
        <div className="p-5 border-b-2 border-amber-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border-2 border-[#7C3AED] flex items-center justify-center text-[#7C3AED]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#1F2937]">
                Tutor Control Panel (Ravi Sir)
              </h3>
              <p className="text-xs font-bold text-[#7C3AED]">
                Manage UPI ID, WhatsApp Number & Zero-Cost Architecture
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Zero-Cost Architecture Info Box */}
          <div className="p-4 rounded-3xl bg-emerald-50 border-2 border-emerald-300 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Free Forever Architecture (No Monthly Charges)</span>
            </div>
            <p className="text-xs text-emerald-950 font-bold leading-relaxed">
              This app is architected to cost ₹0 in maintenance:
            </p>
            <ul className="text-xs text-emerald-900 font-semibold space-y-1 pl-4 list-disc">
              <li><strong className="text-emerald-950">Payment:</strong> NPCI Direct UPI Intent & dynamic QR code (0% commission, no Razorpay/Stripe monthly costs).</li>
              <li><strong className="text-emerald-950">Storage:</strong> Google Drive links & instant embedded high-yield PDF renderers.</li>
              <li><strong className="text-emerald-950">Hosting:</strong> Zero-cost static CDN deployment (Cloud Run, GitHub Pages, Vercel).</li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-[#1F2937] mb-1">
                Your Centre Name
              </label>
              <input
                type="text"
                value={formData.centreName}
                onChange={(e) => setFormData({ ...formData, centreName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-[#1F2937] text-xs font-bold focus:border-[#7C3AED] focus:outline-none shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-[#1F2937] mb-1">
                  Tuition UPI ID (for GPay / PhonePe)
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  placeholder="e.g. ravistuition@okhdfcbank"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-[#1F2937] text-xs font-mono font-bold focus:border-[#7C3AED] focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#1F2937] mb-1">
                  WhatsApp Support Phone (with country code)
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="919842145890"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-[#1F2937] text-xs font-mono font-bold focus:border-[#7C3AED] focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-[#1F2937] mb-1">
                  Address & Street
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-[#1F2937] text-xs font-bold focus:border-[#7C3AED] focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#1F2937] mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-[#1F2937] text-xs font-bold focus:border-[#7C3AED] focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-xs font-bold text-gray-500 hover:text-black underline"
              >
                Reset to default Madurai config
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FF4D00] text-white font-black text-xs shadow-[0_3px_0_#991B1B] hover:bg-[#E04400] active:translate-y-0.5 active:shadow-none transition-all"
              >
                {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <Save className="w-4 h-4" />}
                <span>{savedSuccess ? 'Changes Saved!' : 'Save Config'}</span>
              </button>
            </div>
          </form>

          {/* Unlocked Bundles Cache Reset */}
          <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 flex items-center justify-between gap-3 shadow-sm">
            <div>
              <span className="text-xs font-black text-[#1F2937] block">
                Local Device Unlocked Bundles ({unlockedCount})
              </span>
              <span className="text-[11px] font-bold text-gray-500 block">
                Reset to test the purchase flow again like a new student
              </span>
            </div>

            <button
              onClick={onResetUnlocked}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-black text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Purchases</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
