export type Language = 'tanglish' | 'tamil';

export type AppPage = 'study' | 'pricing' | 'calculator' | 'trust';

export type ClassLevel = '10th' | '11th' | '12th';

export type Subject = 
  | 'Maths' 
  | 'Science' 
  | 'Physics' 
  | 'Chemistry' 
  | 'Biology' 
  | 'Economics'
  | 'Commerce'
  | 'Accountancy'
  | 'Computer Science'
  | 'Social Science' 
  | 'English' 
  | 'Tamil';

export type ExamType = 'Quarterly' | 'Half-Yearly' | 'Public Board' | 'Revision';

export type ResourceCategory = 'formula' | 'two_mark' | 'three_mark' | 'five_mark' | 'mindmap' | 'timetable';

export interface FreeResource {
  id: string;
  reelCode?: string; // e.g. "M10", "T10", "P12", "ECO12"
  title: string;
  tamilTitle?: string;
  tanglishTitle: string;
  classLevel: ClassLevel;
  board: 'Tamil Nadu State Board' | 'CBSE';
  subject: Subject;
  examType?: ExamType;
  category: ResourceCategory;
  chapter: string;
  fileSize: string;
  pageCount: number;
  downloadCount: number;
  rating: number;
  badge?: string;
  description: string;
  driveLink: string; // Direct Google Drive storage link
  relatedBundleId?: string; // Bridges free resource to premium bundle!
  sampleHighlights?: string[];
  isCustom?: boolean;
}

export interface PremiumBundle {
  id: string;
  title: string;
  tamilTitle?: string;
  tagline: string;
  tanglishTagline: string;
  tamilTagline?: string;
  tier: 'pro' | 'ultra_pro';
  classLevel: ClassLevel;
  board: 'Tamil Nadu State Board' | 'CBSE';
  subjects: Subject[];
  examType?: ExamType;
  price: number; // in INR e.g. 49, 99, 149, 199
  originalPrice: number;
  savingsPercent: number;
  popularBadge?: string;
  description: string;
  features: string[];
  samplePreviewPages: string[];
  totalPdfs: number;
  totalQuestions: number;
  targetExamScore: string; // e.g. "95+ Guaranteed" or "Centum Blueprint"
  colorTheme: string;
  driveFolderLink?: string; // Google Drive folder link for unlocked material
  isUnlocked?: boolean;
}

export interface Testimonial {
  id: string;
  studentName: string;
  school: string; // Madurai school e.g. "Mary Ann Matric", "TVS Hr Sec", "CEOA"
  classAndYear: string;
  score: string;
  subjectScore?: string;
  area: string; // e.g. "K.Pudur", "KK Nagar", "Mattuthavani"
  quoteTanglish: string;
  quoteTamil: string;
  avatarSeed: string;
  reelCodeUsed?: string;
}

export interface TutorConfig {
  tutorName: string;
  centreName: string;
  websiteUrl: string;
  foundedYear: number;
  address: string;
  landmark: string;
  city: string;
  upiId: string;
  upiName: string;
  whatsappNumber: string;
  instagramHandle: string;
  googleDriveMasterUrl: string;
}

