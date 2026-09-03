import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem, PremiumBundle } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (bundleId: string) => void;
  onCheckout: (bundles: PremiumBundle[], totalAmount: number) => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onCheckout,
  onExplore,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.bundle.price, 0);
  const discountAmount = discountApplied ? Math.min(20, Math.floor(subtotal * 0.2)) : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'CENTUM' || code === 'MADURAI' || code === 'RAVISIR') {
      setDiscountApplied(true);
    } else {
      setCouponError('Invalid code. Try "CENTUM" or "MADURAI"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200 text-[#1F2937]">
        {/* Header */}
        <div className="p-4 border-b border-amber-200 bg-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF4D00] text-white flex items-center justify-center font-black">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900">
                Your Study Cart
              </h3>
              <p className="text-[10px] text-gray-500 font-bold">
                {items.length} {items.length === 1 ? 'item' : 'items'} ready for instant access
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-black hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-base text-slate-800">
                  Your cart is empty
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Add 95+ Centum study packs starting at just ₹49 to prepare with confidence.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="mt-2 py-2 px-4 rounded-xl bg-[#FF4D00] text-white text-xs font-black shadow-xs"
              >
                Browse Centum Packs
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-2">
                {items.map(({ bundle }) => (
                  <div
                    key={bundle.id}
                    className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] font-black bg-[#FF4D00] text-white px-1.5 py-0.2 rounded">
                          {bundle.classLevel}
                        </span>
                        <span className="text-[10px] font-bold text-gray-500">
                          {bundle.subjects.join(', ')}
                        </span>
                      </div>
                      <h5 className="text-xs font-black text-slate-900 truncate">
                        {bundle.title}
                      </h5>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xs font-black text-[#FF4D00]">
                          ₹{bundle.price}
                        </span>
                        <span className="text-[10px] text-gray-400 line-through">
                          ₹{bundle.originalPrice}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(bundle.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo Code Strip */}
              <div className="pt-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. CENTUM)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 text-xs font-bold border border-amber-300 rounded-xl px-2.5 py-2 bg-white uppercase"
                  />
                  <button
                    type="submit"
                    className="py-2 px-3 rounded-xl bg-slate-900 text-white text-xs font-black shrink-0"
                  >
                    Apply
                  </button>
                </form>
                {discountApplied && (
                  <p className="text-[11px] font-black text-emerald-700 mt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Coupon applied! Saved ₹{discountAmount}
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] font-bold text-red-600 mt-1">
                    {couponError}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 border-t border-amber-200 bg-white space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-gray-500 font-bold">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{subtotal}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-700 font-black">
                  <span>Student Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-gray-100">
                <span>Total Payable</span>
                <span className="text-[#FF4D00] text-base">₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => onCheckout(items.map((i) => i.bundle), totalAmount)}
              className="w-full py-3 px-4 rounded-xl bg-[#FF4D00] hover:bg-[#E04400] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <span>Pay ₹{totalAmount} via UPI (GPay / PhonePe)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Google Drive Access • Verified by Ravi Sir</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
