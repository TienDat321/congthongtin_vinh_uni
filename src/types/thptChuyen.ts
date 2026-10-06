export interface THPTChuyenClass {
  id: string;
  name: string; // e.g. "Chuyên Toán học", "Chuyên Tiếng Anh"
  code: string; // e.g. "CH-TOAN"
  quota: number; // e.g. 70
  classesCount: number; // e.g. 2
  examSubject: string; // e.g. "Toán chuyên (150 phút, hệ số 2)"
  directAdmissionAvailable: boolean;
  benchmark2025: number; // Điểm chuẩn năm 2025
  benchmark2024: number; // Điểm chuẩn năm 2024
  benchmark2023: number;
  description: string;
  careerFocus: string;
  facultyLead: string;
}

export interface THPTChuyenExamSchedule {
  date: string;
  session: 'Sáng' | 'Chiều';
  subject: string;
  type: 'Chung' | 'Chuyên';
  duration: string;
  startTime: string;
  location: string;
  notes: string;
}

export interface THPTChuyenCandidate {
  id: string;
  registrationNumber: string; // SBD: e.g. "CV26-0182"
  fullName: string;
  dob: string;
  gender: 'Nam' | 'Nữ';
  previousSchool: string;
  province: string;
  targetClass: string;
  mathGeneralScore: number; // Môn thi Vòng I: Toán
  englishGeneralScore: number; // Môn thi Vòng I: Tiếng Anh
  literatureGeneralScore: number; // Môn thi Vòng I: Ngữ văn
  specializedScore: number; // Môn thi chuyên (hệ số 1,5)
  priorityScore: number;
  totalScore: number; // = Điểm chuyên × 1,5 + (Toán + Tiếng Anh + Ngữ văn) + Ưu tiên
  resultStatus: 'Trúng tuyển chính thức' | 'Dự khuyết' | 'Không trúng tuyển' | 'Tuyển thẳng';
  notes?: string;
}

export interface THPTChuyenDirectAdmissionRule {
  category: string;
  conditions: string[];
  eligibleClasses: string[];
  submissionDeadline: string;
}
