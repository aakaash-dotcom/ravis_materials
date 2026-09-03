import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { PremiumBundle, TutorConfig } from '../types';

export function buildUpiDeepLink(bundle: PremiumBundle, config: TutorConfig): string {
  const cleanId = (config?.upiId || '9842145890@okaxis').trim();
  const cleanName = encodeURIComponent((config?.upiName || "Ravi's Tuition Centre").trim());
  const note = encodeURIComponent(`${bundle.title} - Ravis Tuition Madurai`);
  const amount = bundle.price.toFixed(2);
  
  return `upi://pay?pa=${cleanId}&pn=${cleanName}&am=${amount}&cu=INR&tn=${note}`;
}

export async function generateUpiQrCode(upiString: string): Promise<string> {
  try {
    return await QRCode.toDataURL(upiString, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    });
  } catch (err) {
    console.error('Failed to render QR Code', err);
    return '';
  }
}

export function buildWhatsAppVerificationLink(
  bundle: PremiumBundle, 
  config: TutorConfig, 
  utrRef: string = ''
): string {
  const rawPhone = config?.whatsappNumber || '919842145890';
  const phone = rawPhone.replace(/[^0-9]/g, '');
  const refText = utrRef ? `\nMy UPI Ref/UTR: ${utrRef}` : '';
  const message = `Vanakkam Ravi Sir! 🙏\nI want to get: *${bundle.title}* (₹${bundle.price})\nFrom: Madurai Student Web App${refText}\nPlease send my download access / verify!`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) {
    // ignore
  }
}
