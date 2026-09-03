import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Link, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Save,
  ArrowLeft
} from 'lucide-react';
import { ClassLevel, Subject, ExamType, FreeResource, PremiumBundle, TutorConfig } from '../types';
import { PREMIUM_BUNDLES } from '../data/mockData';

interface TutorAdminViewProps {
  config: TutorConfig;
  onSaveConfig: (config: TutorConfig) => void;
  customResources: FreeResource[];
  onAddResource: (resource: FreeResource) => void;
  onDeleteResource: (id: string) => void;
  bundles?: PremiumBundle[];
  onBackToStudentView?: () => void;
}

const SUBJECTS: Subject[] = [
  'Economics',
  'Maths',
  'Physics',
  'Chemistry',
  'Biology',
  'Commerce',
  'Accountancy',
  'Computer Science',
  'Social Science',
  'Science',
  'Tamil',
  'English'
];

export const TutorAdminView: React.FC<TutorAdminViewProps> = ({
  config,
  onSaveConfig,
  customResources,
  onAddResource,
  onDeleteResource,
  bundles = PREMIUM_BUNDLES,
  onBackToStudentView = () => {}
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('ravis_tutor_auth') === 'true';
  });
  const [pinError, setPinError] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [classLevel, setClassLevel] = useState<ClassLevel>('12th');
  const [subject, setSubject] = useState<Subject>('Economics');
  const [examType, setExamType] = useState<ExamType>('Quarterly');
  const [reelCode, setReelCode] = useState('');
  const [createdResource, setCreatedResource] = useState<FreeResource | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Config State
  const [tutorUpi, setTutorUpi] = useState(config.upiId);
  const [tutorWhatsapp, setTutorWhatsapp] = useState(config.whatsappNumber);
  const [configSaved, setConfigSaved] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '1999' || pin.trim() === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ravis_tutor_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleAddPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !driveLink.trim()) return;

    const matchedBundle = bundles.find(b => b.classLevel === classLevel && b.subjects.includes(subject)) || bundles[0];

    const newRes: FreeResource = {
      id: `res-${Date.now()}`,
      reelCode: reelCode.trim().toUpperCase() || `${subject.substring(0, 3).toUpperCase()}${classLevel.substring(0, 2)}`,
      title: title.trim(),
      tanglishTitle: title.trim(),
      tamilTitle: title.trim(),
      classLevel,
      board: 'Tamil Nadu State Board',
      subject,
      examType,
      category: 'two_mark',
      chapter: `${examType} Exam High-Yield PDF`,
      fileSize: '1.8 MB',
      pageCount: 5,
      downloadCount: 0,
      rating: 5.0,
      description: `Official PDF for ${classLevel} ${subject}.`,
      driveLink: driveLink.trim(),
      relatedBundleId: matchedBundle?.id,
      isCustom: true
    };

    onAddResource(newRes);
    setCreatedResource(newRes);
    setTitle('');
    setDriveLink('');
    setReelCode('');
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ravistuition.in';
  const autoDmLink = createdResource ? `${currentUrl}/?pdf=${createdResource.id}` : '';

  const handleCopyLink = () => {
    if (!autoDmLink) return;
    navigator.clipboard.writeText(autoDmLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSaveTutorConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      upiId: tutorUpi.trim(),
      whatsappNumber: tutorWhatsapp.trim()
    });
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  // PIN Protection Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-2xl border-2 border-amber-300 shadow-md text-[#1F2937] space-y-4">
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-slate-900">Ravi Sir's Private Admin Portal</h2>
          <p className="text-xs text-gray-500 font-bold">
            Enter your 4-digit PIN to upload Drive links and manage student materials.
          </p>
        </div>

        <form onSubmit={handlePinSubmit} className="space-y-3">
          <div>
            <input
              type="password"
              placeholder="Enter PIN (Default: 1999)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={6}
              className="w-full text-center tracking-widest text-lg font-black bg-amber-50 border border-amber-300 rounded-xl py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]"
            />
            {pinError && (
              <p className="text-xs font-bold text-red-600 mt-1 text-center">
                Incorrect PIN. Please use default 1999.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#E04400] text-white font-black text-xs shadow-xs transition-colors"
          >
            Unlock Admin Panel
          </button>

          <button
            type="button"
            onClick={onBackToStudentView}
            className="w-full py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-black"
          >
            ← Return to Student Hub
          </button>
        </form>
      </div>
    );
  }

  // Authenticated Admin Panel
  return (
    <div className="max-w-3xl mx-auto space-y-6 text-[#1F2937]">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
            Authenticated Admin
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
            Tutor Source & Google Drive Manager
          </h2>
        </div>

        <button
          onClick={onBackToStudentView}
          className="flex items-center gap-1 text-xs font-black text-gray-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Student View</span>
        </button>
      </div>

      {/* Upload New Google Drive PDF */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-300 shadow-xs space-y-4">
        <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#FF4D00]" />
          <span>Publish New Study Material (Google Drive Link)</span>
        </h3>

        <form onSubmit={handleAddPdf} className="space-y-3">
          <div>
            <label className="block text-[11px] font-black text-gray-600 mb-1">
              Topic / Chapter Name
            </label>
            <input
              type="text"
              placeholder="e.g. 12th Economics: Top 25 Important Questions"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full text-xs font-bold bg-amber-50/70 border border-amber-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-600 mb-1">
              Google Drive Link (Viewer / Anyone with link)
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/file/d/..."
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              required
              className="w-full text-xs font-bold bg-amber-50/70 border border-amber-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-black text-gray-600 mb-1">
                Class
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                className="w-full text-xs font-black bg-amber-50 border border-amber-300 rounded-xl p-2"
              >
                <option value="12th">12th</option>
                <option value="11th">11th</option>
                <option value="10th">10th</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-600 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="w-full text-xs font-black bg-amber-50 border border-amber-300 rounded-xl p-2"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-600 mb-1">
                Exam
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as ExamType)}
                className="w-full text-xs font-black bg-amber-50 border border-amber-300 rounded-xl p-2"
              >
                <option value="Quarterly">Quarterly</option>
                <option value="Half-Yearly">Half-Yearly</option>
                <option value="Public Board">Public Board</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-600 mb-1">
              Instagram Reel Code (Optional - for Auto DM)
            </label>
            <input
              type="text"
              placeholder="e.g. ECO12, MATH10"
              value={reelCode}
              onChange={(e) => setReelCode(e.target.value)}
              className="w-full text-xs font-bold bg-amber-50/70 border border-amber-300 rounded-xl p-2.5 uppercase"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#0F9D58] hover:bg-[#0c8249] text-white font-black text-xs shadow-xs transition-colors"
          >
            Publish Study PDF Instantly
          </button>
        </form>

        {/* Generated Instagram Reel Link Box */}
        {createdResource && (
          <div className="p-3 bg-emerald-50 border-2 border-emerald-300 rounded-xl space-y-2">
            <span className="text-xs font-black text-emerald-900 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Published Live! Here is your Instagram Auto DM Link:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={autoDmLink}
                className="flex-1 bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-black shrink-0"
              >
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            <p className="text-[10px] font-bold text-gray-600">
              Paste this link into ManyChat or Instagram DMs. Students who tap it will land directly on this PDF.
            </p>
          </div>
        )}
      </div>

      {/* Tutor Payment & WhatsApp Settings */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-300 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-900">
          Ravi Sir Direct Account Details
        </h3>
        <form onSubmit={handleSaveTutorConfig} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">
                Direct UPI ID (e.g. GPay/PhonePe)
              </label>
              <input
                type="text"
                value={tutorUpi}
                onChange={(e) => setTutorUpi(e.target.value)}
                className="w-full text-xs font-black bg-amber-50 border border-amber-300 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={tutorWhatsapp}
                onChange={(e) => setTutorWhatsapp(e.target.value)}
                className="w-full text-xs font-black bg-amber-50 border border-amber-300 rounded-xl p-2.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF4D00] text-white text-xs font-black shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{configSaved ? 'Saved Successfully!' : 'Save Account Settings'}</span>
          </button>
        </form>
      </div>

      {/* List of Custom Added Materials */}
      {customResources.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-xs space-y-3">
          <h3 className="text-sm font-black text-slate-900">
            Custom Materials Uploaded ({customResources.length})
          </h3>
          <div className="space-y-2">
            {customResources.map((res) => (
              <div
                key={res.id}
                className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              >
                <div>
                  <span className="font-black text-slate-900">{res.title}</span>
                  <span className="text-gray-500 ml-2">({res.classLevel} • {res.subject})</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={res.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Test Link</span>
                  </a>
                  <button
                    onClick={() => onDeleteResource(res.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete Resource"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
