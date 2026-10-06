export interface VLVHMajor {
  id: string;
  order: number;
  name: string;
  code: string;
  category: 'teacher' | 'other'; // Đào tạo giáo viên vs Ngành khác
  quota: number;
  programs: {
    tcToDh: boolean;    // Liên thông TC lên ĐH
    cdToDh: boolean;    // Liên thông CĐ lên ĐH
    secondDegree: boolean; // Liên thông bằng ĐH thứ hai
    thpt: boolean;      // Tốt nghiệp THPT
  };
  durationNote: string;
  entryRequirement: string;
}

export interface VLVHConsultant {
  role: string;
  name: string;
  phone: string;
  email: string;
  zalo: string;
}

export interface VLVHApplicationRecord {
  id: string;
  applicationCode: string; // VLVH2026-XXXXX
  studentName: string;
  birthDate: string;
  gender: 'Nam' | 'Nữ';
  idCardNumber: string;
  idCardDate?: string;
  idCardPlace?: string;
  phoneNumber: string;
  email: string;
  address: string;
  majorCode: string;
  majorName: string;
  programType: 'tcToDh' | 'cdToDh' | 'secondDegree' | 'thpt';
  graduatedLevel: string;
  graduatedMajor: string;
  graduatedYear: string;
  graduatedSchool: string;
  workplace?: string;
  workPosition?: string;
  workYears?: number;
  feeAmount: number;
  paymentStatus: 'PAID' | 'PENDING';
  paymentRef?: string;
  status: 'SUBMITTED' | 'VERIFIED' | 'ADMITTED' | 'NEEDS_SUPPLEMENT';
  registrationDate: string;
  documents: {
    birthCert?: string;
    highSchoolDiploma?: string;
    gradDiploma?: string;
    transcripts?: string;
    idCardScan?: string;
    workConfirmation?: string;
    avatar?: string;
  };
}
