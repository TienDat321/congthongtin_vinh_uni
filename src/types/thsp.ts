export type THSPGradeLevel = 'mam-non' | 'lop-1' | 'lop-6' | 'lop-10-11' | 'all';

export interface THSPQuotaInfo {
  gradeLevel: 'mam-non' | 'lop-1' | 'lop-6' | 'lop-10-11';
  gradeName: string;
  ageRequirement: string;
  birthYear: string;
  targetQuota: number;
  classCount: number;
  campus1Quota: number; // Cơ sở 1: Lê Duẩn
  campus2Quota: number; // Cơ sở 2: Nghi Ân
  method: string;
  englishFloorScore?: number;
  scoringFormula?: string;
  priorityCriteria: string[];
  lotteryRule?: string; // Quy định bốc thăm nếu quá chỉ tiêu
  tuitionFeePerMonth: number;
  boardingFeePerMonth: number;
  status: 'active' | 'closed' | 'upcoming';
}

export interface THSPTimelineItem {
  id: string;
  title: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  description: string;
  status: 'past' | 'current' | 'upcoming';
  highlight?: boolean;
}

export interface THSPApplicantRecord {
  id: string;
  applicationCode: string; // e.g. THSP2026-6-88392
  rollNumber?: string; // SBD e.g. THSP-06-1024
  studentName: string;
  birthDate: string;
  gender: 'Nam' | 'Nữ';
  gradeLevel: 'mam-non' | 'lop-1' | 'lop-6' | 'lop-10-11';
  targetGradeName: string;
  campusPreference: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  currentSchool: string;
  registrationDate: string;
  feeAmount: number;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  paymentRef?: string;
  documents: {
    avatarUrl?: string;
    birthCertUrl?: string;
    transcriptUrl?: string;
    priorityProofUrl?: string;
  };
  examScores?: {
    math: number;
    vietnamese: number;
    english: number;
    priorityBonus: number;
    totalScore: number;
    standardCutoff: number;
  };
  admissionStatus: 'ADMITTED' | 'WAITLIST' | 'NOT_ADMITTED' | 'PENDING_EXAM';
  waitlistRank?: number;
}

export interface THSPExtractedDocument {
  id: string;
  fileName: string;
  officialNumber: string; // e.g. 52/TB-THSP hoặc 02/TB-THSP
  docType: 'ADMISSION_NOTICE' | 'REPLACEMENT_NOTICE' | 'EXAM_RESULT' | 'TUITION_POLICY';
  issuer: string; // Trường Thực hành Sư phạm - Trường Đại học Vinh
  signer: string; // TS. Phan Xuân Phồn - Hiệu trưởng
  issueDate: string;
  effectiveDate: string;
  replacesDocId?: string; // e.g. doc-52-thsp
  replacesOfficialNumber?: string; // 52/TB-THSP
  summary: string;
  keyChangesHighlight?: string;
  applicationDeadline: string;
  surveyExamDate: string;
  resultDate: string;
  registrationFee: number;
  bankAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    qrPrefix: string;
  };
  isPublished: boolean;
  isRegistrationFormOpen: boolean;
}
