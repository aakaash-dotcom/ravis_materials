import React, { useState } from 'react';
import { X, Plus, Link, CheckCircle2, Copy, Sparkles, FolderDown, FileText } from 'lucide-react';
import { ClassLevel, Subject, ExamType, FreeResource, Language, PremiumBundle } from '../types';

interface AddPdfModalProps {
  onClose: () => void;
  onAddResource: (resource: FreeResource) => void;
  bundles: PremiumBundle[];
  lang: Language;
}

export const AddPdfModal: React.FC<AddPdfModalProps> = ({
  onClose,
  onAddResource,
  bundles,
  lang
}) => {
  const [title, setTitle] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [classLevel, setClassLevel] = useState<ClassLevel>('12th');
  const [subject, setSubject] = useState<Subject>('Economics');
  const [examType, setExamType] = useState<ExamType>('Quarterly');
  const [reelCode, setReelCode] = useState('');
  const [selectedBundleId, setSelectedBundleId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [createdResource, setCreatedResource] = useState<FreeResource | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !driveLink.trim()) return;

    // Default to matching bundle if not explicitly picked
    const matchedBundle = bundles.find(b => b.classLevel === classLevel && b.subjects.includes(subject)) || bundles[0];

    const newResource: FreeResource = {
      id: `custom-${Date.now()}`,
      reelCode: reelCode.trim().toUpperCase() || `${subject.substring(0, 3).toUpperCase()}${classLevel.substring(0, 2)}`,
      title: title.trim(),
      tanglishTitle: title.trim(),
      tamilTitle: title.trim(),
      classLevel,
      board: 'Tamil Nadu State Board',
      subject,
      examType,
      category: 'two_mark',
      chapter: `${examType} Exam High-Yield Material`,
      fileSize: '1.5 MB',
      pageCount: 6,
      downloadCount: 1,
      rating: 5.0,
      badge: `⚡ Reel Auto DM: ${reelCode.trim().toUpperCase() || subject}`,
      description: `Direct Google Drive access for ${classLevel} ${subject}.`,
      driveLink: driveLink.trim(),
      relatedBundleId: selectedBundleId || matchedBundle?.id || 'bundle-12-economics-centum',
      sampleHighlights: [
        'Quarterly & Board exam repeated question models',
        'Direct answer key format with step marking guidance'
      ],
      isCustom: true
    };

    onAddResource(newResource);
    setCreatedResource(newResource);
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ravistuition.in';
  const autoDmLink = createdResource 
    ? `${currentUrl}/?pdf=${createdResource.id}` 
    : '';

  const handleCopyLink = () => {
    if (!autoDmLink) return;
    navigator.clipboard.writeText(autoDmLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border-4 border-[#FFBB00] rounded-3xl shadow-[8px_8px_0px_#F59E0B] overflow-hidden text-[#1F2937] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FFFBEB] border-b-2 border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0F9D58] flex items-center justify-center text-white font-black shadow-xs">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                Add New PDF Link (Ravi Sir)
              </h3>
              <p className="text-[11px] font-bold text-gray-500">
                Put your Google Drive link & Topic. Instant live in web app!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 font-bold border border-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          {createdResource ? (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-black text-emerald-950">
                  PDF Added Live Successfully! 🚀
                </h4>
                <p className="text-xs font-semibold text-emerald-800">
                  "{createdResource.title}" is now active in the web app for students.
                </p>
              </div>

              {/* Auto DM Link Generator */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
                <span className="text-[11px] font-black text-amber-950 uppercase tracking-wider block">
                  Copy Link for Instagram Auto DM:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={autoDmLink}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs font-mono text-slate-800 focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF4D00] text-white text-xs font-black shrink-0 hover:bg-[#E04400] transition-colors"
                  >
                    {copiedLink ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-gray-600 font-medium">
                  💡 Paste this into ManyChat / Instagram Auto DM response when students comment "{createdResource.subject}". They will directly open this exact PDF!
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    setCreatedResource(null);
                    setTitle('');
                    setDriveLink('');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-black text-slate-800 hover:bg-slate-200"
                >
                  Add Another PDF
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-[#0F9D58] text-white text-xs font-black hover:bg-[#0c8249]"
                >
                  Done & View App
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Topic / Title */}
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1">
                  1. Topic / Name of the PDF *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 12th Economics Quarterly Exam Top 25 Questions"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#0F9D58] focus:outline-none transition-colors"
                />
              </div>

              {/* Google Drive Link */}
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1">
                  2. Google Drive Download / View Link *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/file/d/..."
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-[#0F9D58] focus:outline-none transition-colors"
                  />
                  <Link className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                </div>
                <span className="text-[10px] text-gray-500 font-semibold block mt-0.5">
                  Make sure Google Drive link sharing is set to "Anyone with the link can view".
                </span>
              </div>

              {/* Class & Exam Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-900 mb-1">
                    Class
                  </label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="12th">12th Standard</option>
                    <option value="11th">11th Standard</option>
                    <option value="10th">10th Standard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 mb-1">
                    Exam Type
                  </label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value as ExamType)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Quarterly">Quarterly Exam</option>
                    <option value="Half-Yearly">Half-Yearly Exam</option>
                    <option value="Public Board">Public Board Exam</option>
                    <option value="Revision">Revision Exam</option>
                  </select>
                </div>
              </div>

              {/* Subject & Reel Keyword */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-900 mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as Subject)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Economics">Economics</option>
                    <option value="Maths">Maths</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Accountancy">Accountancy</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Science">Science (10th)</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Tamil">Tamil</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 mb-1">
                    Instagram Comment Keyword
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ECO12 or MATHS"
                    value={reelCode}
                    onChange={(e) => setReelCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-mono font-bold text-slate-900 uppercase focus:outline-none"
                  />
                </div>
              </div>

              {/* Link to Pro Centum Pack */}
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1">
                  Connect to Pro Booster Pack (Upsell)
                </label>
                <select
                  value={selectedBundleId}
                  onChange={(e) => setSelectedBundleId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                >
                  <option value="">Auto-match with subject pack</option>
                  {bundles.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.title} (₹{b.price}) - {b.classLevel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0F9D58] hover:bg-[#0c8249] text-white text-xs font-black shadow-[0_3px_0_#065F46] active:translate-y-0.5 active:shadow-none transition-all min-h-[46px]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish PDF to Web App</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
