export type InternationalDegreeLevel = 'undergraduate' | 'master' | 'doctoral' | 'vietnamese-prep';

export type LanguageMode = 'vi' | 'en' | 'lao';

export interface InternationalMajor {
  no: number;
  code: string;
  nameVi: string;
  nameEn: string;
  nameLao: string;
  level: 'undergraduate' | 'master' | 'doctoral';
  durationYears: string;
  facultyGroup: string;
}

export interface InternationalScholarship {
  id: string;
  titleVi: string;
  titleEn: string;
  titleLao: string;
  fundingBody: string;
  coverage: string[];
  targetAudience: string;
  notes: string;
}

export interface InternationalFeeStructure {
  itemVi: string;
  itemEn: string;
  itemLao: string;
  amountUsd: number;
  period: string;
  details: string;
}

export interface InternationalDocumentItem {
  id: string;
  sectionNumber: string;
  titleVi: string;
  titleEn: string;
  titleLao: string;
  requiredFor: ('undergraduate' | 'master' | 'doctoral')[];
  isMandatory: boolean;
  notes: string;
}

export interface InternationalApplicant {
  id: string;
  applicationCode: string;
  passportNumber: string;
  fullName: string;
  gender: 'male' | 'female';
  dob: string;
  nationality: string;
  countryCode: string;
  email: string;
  phone: string;
  appliedDegree: 'undergraduate' | 'master' | 'doctoral';
  appliedMajorCode: string;
  appliedMajorName: string;
  needsVietnamesePrep: boolean;
  vietnameseCertificate: string;
  scholarshipType: 'agreement' | 'province' | 'self-funded';
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'ACCEPTED' | 'NEED_MORE_DOCS';
  offerLetterIssued: boolean;
  offerLetterCode?: string;
  submissionDate: string;
  reviewerNotes?: string;
}
