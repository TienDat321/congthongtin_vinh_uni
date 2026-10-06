export type PostgraduateDegree = 'master' | 'doctoral';

export interface PostgraduateMajor {
  id: string;
  code: string;
  name: string;
  degree: PostgraduateDegree;
  quotaRound1: number;
  quotaRound2?: number; // Chỉ tiêu tiếp tục thu hồ sơ đợt 2 (TB 136/TB-ĐHV đối với TS, TB bổ sung đối với ThS)
  cutoffScoreRound1?: number; // Điểm chuẩn trúng tuyển đợt 1 (thang điểm 10)
  dean89?: boolean; // Ngành đào tạo theo Đề án 89
  governmentScholarship?: boolean; // Ngành đào tạo có học bổng Chính phủ
  admissionMethod: 'XÉT_HỒ_SƠ_PHỎNG_VẤN' | 'XÉT_HỒ_SƠ_BÀI_LUẬN' | 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG';
  faculty: string;
  durationMonths: number; // 18 - 24 tháng cho ThS; 36 - 48 tháng cho TS
  supplementaryCoursesRequired?: boolean; // Cần học bổ sung kiến thức
  tuitionPerCredit?: number; // 748.000đ - 940.000đ / tín chỉ (ThS)
  tuitionPerYear?: number; // 23.000.000đ - 40.000.000đ / năm (TS)
}

export interface ForeignLanguageRequirement {
  id: string;
  language: string;
  certificateName: string;
  minScoreOrLevel: string;
  issuingBody?: string;
  note?: string;
}

export interface PostgraduateApplicant {
  applicationCode: string; // Vd: SDH-2026-8812
  fullName: string;
  dateOfBirth: string;
  gender: 'Nam' | 'Nữ';
  idNumber: string; // CCCD
  phoneNumber: string;
  email: string;
  degreeLevel: PostgraduateDegree;
  majorCode: string;
  majorName: string;
  round: 1 | 2;
  undergraduateDegree: {
    institution: string;
    major: string;
    graduationYear: number;
    classification: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình khá';
    isForeignDegree?: boolean;
  };
  masterDegree?: {
    institution: string;
    major: string;
    graduationYear: number;
  };
  foreignLanguageCert: {
    type: string;
    scoreOrLevel: string;
    issueDate: string;
    examRequired?: boolean; // Đăng ký thi ĐGNL ngoại ngữ ĐH Vinh
  };
  needKnowledgeSupplement?: boolean; // Cần học bổ sung kiến thức (03 môn hoặc 07 môn)
  supplementSubjectCount?: 3 | 7;
  researchTopicOrEssayTitle?: string; // Tên đề cương hoặc bài luận
  paymentStatus: 'PAID' | 'PENDING';
  feeAmount: number;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'INTERVIEW_SCHEDULED' | 'ADMITTED' | 'REJECTED';
  examScore?: {
    essayOrInterviewScore: number;
    languageScore?: number;
    totalScore: number;
    rank?: number;
  };
  admissionNotice?: {
    officialNumber: string;
    cutoffScore: number;
    enrollmentDeadline: string;
    registrationLocation: string;
  };
}
