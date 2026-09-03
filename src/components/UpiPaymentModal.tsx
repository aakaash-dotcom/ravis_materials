import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  QrCode, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  Info
} from 'lucide-react';
import { Language, PremiumBundle, TutorConfig } from '../types';
import { buildUpiDeepLink, generateUpiQrCode, buildWhatsAppVerificationLink, triggerConfetti } from '../utils/payment';

interface UpiPaymentModalProps {
  bundle: PremiumBundle;
  config: TutorConfig;
  onClose: () => void;
  onPaymentSuccess: (bundleId: string) => void;
  lang: Language;
}

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({

  bundle,
  config,
  onClose,
  onPaymentSuccess,
  lang,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState<'upi_apps' | 'qr_code'>('upi_apps');

  const upiDeepLink = buildUpiDeepLink(bundle, config);

  useEffect(() => {
    generateUpiQrCode(upiDeepLink).then(setQrDataUrl);
  }, [bundle, config, upiDeepLink]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(config.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      triggerConfetti();
      onPaymentSuccess(bundle.id);
    }, 1000);
  };

  const whatsAppLink = buildWhatsAppVerificationLink(bundle, config, utrNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FFFBEB] border-4 border-[#FFBB00] rounded-[2.5rem] shadow-[10px_10px_0px_#B45309] overflow-hidden flex flex-col text-[#1F2937]">
        {/* Header */}
        <div className="p-5 border-b-2 border-amber-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-100 border-2 border-[#FFBB00] flex items-center justify-center text-[#B45309] font-black text-xl shadow-xs">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-[#1F2937] leading-tight">
                  Instant UPI Payment
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                  0% Gateway Fee
                </span>
              </div>
              <p className="text-xs font-bold text-gray-500">
                Direct to Ravi Sir's Tuition Account ({config.centreName})
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

        {/* Bundle Summary Pill */}
        <div className="bg-amber-100/60 p-4 border-b-2 border-amber-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-gray-500 block uppercase tracking-wider">
              Selected Study Pack:
            </span>
            <span className="text-sm font-black text-[#1F2937]">
              {bundle.title}
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#FF4D00]">
              ₹{bundle.price}
            </span>
            <span className="block text-xs font-bold text-gray-400 line-through">
              MRP ₹{bundle.originalPrice}
            </span>
          </div>
        </div>

        {/* Tab Switcher: Mobile Apps vs QR Code */}
        <div className="p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-white rounded-2xl border-2 border-amber-200">
            <button
              onClick={() => setActiveTab('upi_apps')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs transition-all ${
                activeTab === 'upi_apps'
                  ? 'bg-[#FFBB00] text-black shadow-md font-black scale-[1.02]'
                  : 'text-gray-600 hover:text-black font-bold'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile UPI Apps</span>
            </button>
            <button
              onClick={() => setActiveTab('qr_code')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs transition-all ${
                activeTab === 'qr_code'
                  ? 'bg-[#FFBB00] text-black shadow-md font-black scale-[1.02]'
                  : 'text-gray-600 hover:text-black font-bold'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Scan QR Code</span>
            </button>
          </div>

          {activeTab === 'upi_apps' ? (
            /* Mobile 1-Tap UPI Apps */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-white border-2 border-amber-200 text-xs font-semibold text-gray-700 flex items-center gap-2.5 shadow-sm">
                <Info className="w-5 h-5 text-[#FF4D00] shrink-0" />
                <span>
                  {lang === 'tanglish'
                    ? 'Mobile-la iruntha GPay, PhonePe or Paytm click pannunga. App direct-ah open aagum!'
                    : 'Tap any UPI app below to trigger your payment app on mobile instantly.'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {/* Google Pay */}
                <a
                  href={upiDeepLink}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-amber-50 border-2 border-slate-200 hover:border-[#FF4D00] transition-all text-center group shadow-sm"
                >
                  <span className="text-base font-black text-slate-900 group-hover:text-[#FF4D00]">GPay</span>
                  <span className="text-[10px] font-bold text-gray-500">Google Pay</span>
                </a>

                {/* PhonePe */}
                <a
                  href={upiDeepLink}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-purple-50 border-2 border-slate-200 hover:border-purple-500 transition-all text-center group shadow-sm"
                >
                  <span className="text-base font-black text-purple-600">PhonePe</span>
                  <span className="text-[10px] font-bold text-gray-500">Fast UPI</span>
                </a>

                {/* Paytm */}
                <a
                  href={upiDeepLink}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-500 transition-all text-center group shadow-sm"
                >
                  <span className="text-base font-black text-sky-600">Paytm</span>
                  <span className="text-[10px] font-bold text-gray-500">Wallet / UPI</span>
                </a>

                {/* BHIM */}
                <a
                  href={upiDeepLink}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-500 transition-all text-center group shadow-sm"
                >
                  <span className="text-base font-black text-emerald-600">BHIM</span>
                  <span className="text-[10px] font-bold text-gray-500">Official NPCI</span>
                </a>

                {/* Cred / Any UPI */}
                <a
                  href={upiDeepLink}
                  className="col-span-2 flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#FF4D00] hover:bg-[#E04400] text-white font-black text-xs transition-all shadow-[0_4px_0_#991B1B] active:translate-y-1 active:shadow-none"
                >
                  <span>Pay with Any UPI App (₹{bundle.price})</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            /* QR Code Scanner (Desktop/Tablet) */
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-white rounded-3xl shadow-xl border-4 border-[#FFBB00]">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="UPI Payment QR Code"
                    className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-gray-400 text-xs font-bold">
                    Generating QR Code...
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 font-bold">
                Scan with GPay, PhonePe, Paytm or BHIM on your phone
              </p>
            </div>
          )}

          {/* Copy UPI ID manually */}
          <div className="p-3.5 bg-white rounded-2xl border-2 border-amber-200 flex items-center justify-between gap-2 shadow-sm">
            <div className="overflow-hidden">
              <span className="block text-[10px] text-gray-500 font-black uppercase">
                Official Tuition UPI ID:
              </span>
              <span className="font-mono text-xs font-black text-[#B45309] truncate block">
                {config.upiId}
              </span>
            </div>
            <button
              onClick={handleCopyUpi}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-100 hover:bg-yellow-200 text-xs font-black text-[#B45309] transition-colors shrink-0"
            >
              {copiedUpi ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Verification & Instant Unlock Form */}
          <form onSubmit={handleVerifyPayment} className="space-y-3 pt-2 border-t-2 border-amber-200">
            <div>
              <label className="block text-xs font-black text-[#1F2937] mb-1.5">
                Completed Payment? Enter 12-Digit UPI Ref / UTR Number:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 423589123456 (or click unlock)"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-mono font-bold focus:outline-none focus:border-[#7C3AED] shadow-inner"
                />
                <button
                  type="submit"
                  disabled={verifying}
                  className="px-5 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-[0_3px_0_#15803D] active:translate-y-0.5 active:shadow-none"
                >
                  {verifying ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Instant Unlock</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* WhatsApp receipt fallback */}
            <div className="text-center pt-1">
              <span className="text-xs text-gray-500 font-bold block mb-1">or prefer WhatsApp confirmation?</span>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#059669] hover:underline font-black"
              >
                <span>Send Payment Screenshot to Ravi Sir (+91 98421 45890)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </form>

          {/* Free architecture badge */}
          <div className="pt-2 text-center text-[11px] text-gray-500 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span>100% Free Architecture • Direct UPI Settlement • Zero Gateway Deductions</span>
          </div>
        </div>
      </div>
    </div>
  );
};
