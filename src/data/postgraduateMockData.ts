import { 
  PostgraduateMajor, 
  ForeignLanguageRequirement, 
  PostgraduateApplicant 
} from '../types/postgraduate';

// ==========================================
// 1. DANH MỤC 30 NGÀNH ĐÀO TẠO TRÌNH ĐỘ THẠC SĨ (NĂM 2026)
// Trích xuất nguyên văn từ Thông báo 39/TB-ĐHV, QĐ 2246/QĐ-ĐHV (Điểm chuẩn) & TB Tiếp tục thu hồ sơ đợt 2
// ==========================================
export const masterMajorsList: PostgraduateMajor[] = [
  {
    id: 'thac-si-01',
    code: '8140101',
    name: 'Giáo dục học (bậc tiểu học)',
    degree: 'master',
    quotaRound1: 30,
    quotaRound2: 0,
    cutoffScoreRound1: 7.88,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Khoa Sư phạm',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-02',
    code: '8140101',
    name: 'Giáo dục học (Giáo dục thể chất)',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 0,
    cutoffScoreRound1: 7.39,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Khoa Giáo dục Thể chất',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-03',
    code: '8140114',
    name: 'Quản lý giáo dục',
    degree: 'master',
    quotaRound1: 45,
    quotaRound2: 0,
    cutoffScoreRound1: 6.26,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Khoa Sư phạm',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-04',
    code: '8140111',
    name: 'Lý luận và PPDH bộ môn Tiếng Anh',
    degree: 'master',
    quotaRound1: 30,
    quotaRound2: 0,
    cutoffScoreRound1: 7.90,
    admissionMethod: 'XÉT_HỒ_SƠ_PHỎNG_VẤN',
    faculty: 'Trường Ngoại ngữ & Xã hội Nhân văn',
    durationMonths: 24,
    tuitionPerCredit: 790000
  },
  {
    id: 'thac-si-05',
    code: '8140111',
    name: 'Lý luận và PPDH bộ môn Hóa học',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 6,
    cutoffScoreRound1: 7.39,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Công nghệ Hóa sinh - Môi trường',
    durationMonths: 24,
    tuitionPerCredit: 820000
  },
  {
    id: 'thac-si-06',
    code: '8140111',
    name: 'Lý luận và PPDH bộ môn Sinh học',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 6,
    cutoffScoreRound1: 6.91,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Công nghệ Hóa sinh - Môi trường',
    durationMonths: 24,
    tuitionPerCredit: 820000
  },
  {
    id: 'thac-si-07',
    code: '8140111',
    name: 'Lý luận và PPDH bộ môn Toán',
    degree: 'master',
    quotaRound1: 20,
    quotaRound2: 0,
    cutoffScoreRound1: 7.35,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Toán học & CNTT',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-08',
    code: '8340101',
    name: 'Quản trị kinh doanh',
    degree: 'master',
    quotaRound1: 15,
    quotaRound2: 14,
    cutoffScoreRound1: 5.00,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Trường Kinh tế',
    durationMonths: 24,
    tuitionPerCredit: 880000
  },
  {
    id: 'thac-si-09',
    code: '8340301',
    name: 'Kế toán',
    degree: 'master',
    quotaRound1: 15,
    quotaRound2: 6,
    cutoffScoreRound1: 7.04,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Trường Kinh tế',
    durationMonths: 24,
    tuitionPerCredit: 880000
  },
  {
    id: 'thac-si-10',
    code: '8340201',
    name: 'Tài chính - Ngân hàng',
    degree: 'master',
    quotaRound1: 15,
    quotaRound2: 17,
    cutoffScoreRound1: 6.68,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Trường Kinh tế',
    durationMonths: 24,
    tuitionPerCredit: 880000
  },
  {
    id: 'thac-si-11',
    code: '8380106',
    name: 'Lý luận và lịch sử nhà nước và pháp luật',
    degree: 'master',
    quotaRound1: 50,
    quotaRound2: 66,
    cutoffScoreRound1: 6.35,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Khoa Luật',
    durationMonths: 24,
    tuitionPerCredit: 850000
  },
  {
    id: 'thac-si-12',
    code: '8420114',
    name: 'Sinh học thực nghiệm',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 10,
    cutoffScoreRound1: 7.20,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Công nghệ Sinh học',
    durationMonths: 24,
    tuitionPerCredit: 850000
  },
  {
    id: 'thac-si-13',
    code: '8420111',
    name: 'Thực vật học',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 4,
    cutoffScoreRound1: 7.65,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Công nghệ Sinh học',
    durationMonths: 24,
    tuitionPerCredit: 850000
  },
  {
    id: 'thac-si-14',
    code: '8420103',
    name: 'Động vật học',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 10,
    cutoffScoreRound1: 7.15,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Công nghệ Sinh học',
    durationMonths: 24,
    tuitionPerCredit: 850000
  },
  {
    id: 'thac-si-15',
    code: '8440118',
    name: 'Hoá phân tích',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 5,
    cutoffScoreRound1: 7.03,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Hóa học',
    durationMonths: 24,
    tuitionPerCredit: 880000
  },
  {
    id: 'thac-si-16',
    code: '8440114',
    name: 'Hoá hữu cơ',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 9,
    cutoffScoreRound1: 7.86,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Hóa học',
    durationMonths: 24,
    tuitionPerCredit: 880000
  },
  {
    id: 'thac-si-17',
    code: '8440110',
    name: 'Quang học',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 5,
    cutoffScoreRound1: 7.01,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Vật lý Kỹ thuật',
    durationMonths: 24,
    tuitionPerCredit: 880000
  },
  {
    id: 'thac-si-18',
    code: '8440113',
    name: 'Hoá vô cơ',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 7,
    cutoffScoreRound1: 7.38,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Hóa học',
    durationMonths: 24,
    tuitionPerCredit: 880000
  },
  {
    id: 'thac-si-19',
    code: '8460104',
    name: 'Đại số và lý thuyết số',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 0,
    cutoffScoreRound1: 7.15,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Toán học & CNTT',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-20',
    code: '8460102',
    name: 'Toán giải tích',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 0,
    cutoffScoreRound1: 7.12,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Toán học & CNTT',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-21',
    code: '8460106',
    name: 'Lý thuyết xác suất và thống kê toán học',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 5,
    cutoffScoreRound1: 7.25,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Toán học & CNTT',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-22',
    code: '8480201',
    name: 'Công nghệ thông tin',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 11,
    cutoffScoreRound1: 6.35,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Toán học & CNTT',
    durationMonths: 24,
    tuitionPerCredit: 940000
  },
  {
    id: 'thac-si-23',
    code: '8580201',
    name: 'Kỹ thuật xây dựng',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 25,
    cutoffScoreRound1: 6.80,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Viện Kỹ thuật & Công nghệ',
    durationMonths: 24,
    tuitionPerCredit: 940000
  },
  {
    id: 'thac-si-24',
    code: '8229013',
    name: 'Lịch sử Việt Nam',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 0,
    cutoffScoreRound1: 7.40,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Trường Ngoại ngữ & XHNV',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-25',
    code: '8229011',
    name: 'Lịch sử thế giới',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 0,
    cutoffScoreRound1: 7.10,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Trường Ngoại ngữ & XHNV',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-26',
    code: '8220102',
    name: 'Ngôn ngữ Việt Nam',
    degree: 'master',
    quotaRound1: 20,
    quotaRound2: 0,
    cutoffScoreRound1: 6.53,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Trường Ngoại ngữ & XHNV',
    durationMonths: 24,
    tuitionPerCredit: 748000
  },
  {
    id: 'thac-si-27',
    code: '8310201',
    name: 'Chính trị học',
    degree: 'master',
    quotaRound1: 35,
    quotaRound2: 65,
    cutoffScoreRound1: 7.77,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Khoa Chính trị & Quản lý',
    durationMonths: 24,
    tuitionPerCredit: 790000
  },
  {
    id: 'thac-si-28',
    code: '8310102',
    name: 'Kinh tế chính trị',
    degree: 'master',
    quotaRound1: 15,
    quotaRound2: 21,
    cutoffScoreRound1: 6.83,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Khoa Chính trị & Quản lý',
    durationMonths: 24,
    tuitionPerCredit: 790000
  },
  {
    id: 'thac-si-29',
    code: '8310110',
    name: 'Quản lý kinh tế',
    degree: 'master',
    quotaRound1: 50,
    quotaRound2: 58,
    cutoffScoreRound1: 7.15,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Trường Kinh tế',
    durationMonths: 24,
    tuitionPerCredit: 880000
  },
  {
    id: 'thac-si-30',
    code: '8310501',
    name: 'Địa lý học',
    degree: 'master',
    quotaRound1: 10,
    quotaRound2: 0,
    cutoffScoreRound1: 7.53,
    admissionMethod: 'XÉT_HỒ_SƠ_BÀI_LUẬN',
    faculty: 'Trường Ngoại ngữ & XHNV',
    durationMonths: 24,
    tuitionPerCredit: 748000
  }
];

// ==========================================
// 2. DANH MỤC 12 NGÀNH ĐÀO TẠO TRÌNH ĐỘ TIẾN SĨ (NĂM 2026)
// Trích xuất nguyên văn từ Thông báo 34/TB-ĐHV & Thông báo 136/TB-ĐHV (Thu hồ sơ tiếp tục)
// ==========================================
export const doctoralMajorsList: PostgraduateMajor[] = [
  {
    id: 'tien-si-01',
    code: '9310201',
    name: 'Chính trị học',
    degree: 'doctoral',
    quotaRound1: 6,
    quotaRound2: 9,
    dean89: false,
    governmentScholarship: false,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Khoa Chính trị & Quản lý',
    durationMonths: 36,
    tuitionPerYear: 26000000
  },
  {
    id: 'tien-si-02',
    code: '9440114',
    name: 'Hoá hữu cơ',
    degree: 'doctoral',
    quotaRound1: 2,
    quotaRound2: 3,
    dean89: true,
    governmentScholarship: true,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Viện Hóa học',
    durationMonths: 36,
    tuitionPerYear: 32000000
  },
  {
    id: 'tien-si-03',
    code: '9229011',
    name: 'Lịch sử Thế giới',
    degree: 'doctoral',
    quotaRound1: 2,
    quotaRound2: 3,
    dean89: false,
    governmentScholarship: false,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Trường Ngoại ngữ & XHNV',
    durationMonths: 36,
    tuitionPerYear: 24000000
  },
  {
    id: 'tien-si-04',
    code: '9229013',
    name: 'Lịch sử Việt Nam',
    degree: 'doctoral',
    quotaRound1: 2,
    quotaRound2: 3,
    dean89: false,
    governmentScholarship: false,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Trường Ngoại ngữ & XHNV',
    durationMonths: 36,
    tuitionPerYear: 24000000
  },
  {
    id: 'tien-si-05',
    code: '9140111',
    name: 'Lý luận và phương pháp dạy học bộ môn Hóa học',
    degree: 'doctoral',
    quotaRound1: 2,
    quotaRound2: 7,
    dean89: false,
    governmentScholarship: false,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Khoa Sư phạm',
    durationMonths: 36,
    tuitionPerYear: 28000000
  },
  {
    id: 'tien-si-06',
    code: '9140111',
    name: 'Lý luận và phương pháp dạy học bộ môn Toán',
    degree: 'doctoral',
    quotaRound1: 2,
    quotaRound2: 7,
    dean89: false,
    governmentScholarship: false,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Khoa Sư phạm',
    durationMonths: 36,
    tuitionPerYear: 28000000
  },
  {
    id: 'tien-si-07',
    code: '9460106',
    name: 'Lý thuyết xác suất và thống kê Toán học',
    degree: 'doctoral',
    quotaRound1: 2,
    quotaRound2: 3,
    dean89: true,
    governmentScholarship: true,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Viện Toán học & CNTT',
    durationMonths: 36,
    tuitionPerYear: 30000000
  },
  {
    id: 'tien-si-08',
    code: '9460102',
    name: 'Toán giải tích',
    degree: 'doctoral',
    quotaRound1: 2,
    quotaRound2: 3,
    dean89: false,
    governmentScholarship: true,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Viện Toán học & CNTT',
    durationMonths: 36,
    tuitionPerYear: 30000000
  },
  {
    id: 'tien-si-09',
    code: '9440110',
    name: 'Quang học',
    degree: 'doctoral',
    quotaRound1: 2,
    quotaRound2: 8,
    dean89: true,
    governmentScholarship: true,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Viện Vật lý Kỹ thuật',
    durationMonths: 36,
    tuitionPerYear: 34000000
  },
  {
    id: 'tien-si-10',
    code: '9310110',
    name: 'Quản lý kinh tế',
    degree: 'doctoral',
    quotaRound1: 6,
    quotaRound2: 12,
    dean89: false,
    governmentScholarship: false,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Trường Kinh tế',
    durationMonths: 36,
    tuitionPerYear: 35000000
  },
  {
    id: 'tien-si-11',
    code: '9340101',
    name: 'Quản trị kinh doanh',
    degree: 'doctoral',
    quotaRound1: 5,
    quotaRound2: 8,
    dean89: false,
    governmentScholarship: false,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Trường Kinh tế',
    durationMonths: 36,
    tuitionPerYear: 35000000
  },
  {
    id: 'tien-si-12',
    code: '9580201',
    name: 'Kỹ thuật xây dựng',
    degree: 'doctoral',
    quotaRound1: 3,
    quotaRound2: 5,
    dean89: false,
    governmentScholarship: true,
    admissionMethod: 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG',
    faculty: 'Viện Kỹ thuật & Công nghệ',
    durationMonths: 36,
    tuitionPerYear: 36000000
  }
];

// ==========================================
// 3. DANH SÁCH CHỨNG CHỈ NGOẠI NGỮ MINH CHỨNG TRÌNH ĐỘ
// (Theo Phụ lục II Thông tư 18/2021/TT-BGDĐT và các Quyết định bổ sung của Bộ GD&ĐT)
// ==========================================
export const foreignLanguageRequirements: ForeignLanguageRequirement[] = [
  {
    id: 'fl-01',
    language: 'Tiếng Anh',
    certificateName: 'TOEFL iBT',
    minScoreOrLevel: 'Từ 46 trở lên',
    note: 'Không chấp nhận chứng chỉ thi theo hình thức Home Edition'
  },
  {
    id: 'fl-02',
    language: 'Tiếng Anh',
    certificateName: 'IELTS Academic',
    minScoreOrLevel: 'Từ 5.5 trở lên',
    note: 'IDP hoặc British Council cấp, còn thời hạn 2 năm'
  },
  {
    id: 'fl-03',
    language: 'Tiếng Anh',
    certificateName: 'Cambridge Assessment English',
    minScoreOrLevel: 'B2 First / B2 Business Vantage / Linguaskill (Thang điểm: từ 160 trở lên)'
  },
  {
    id: 'fl-04',
    language: 'Tiếng Anh',
    certificateName: 'Aptis ESOL International Certificate',
    minScoreOrLevel: 'Từ B2 trở lên (British Council)'
  },
  {
    id: 'fl-05',
    language: 'Tiếng Anh',
    certificateName: 'Pearson English International Certificate (PEIC)',
    minScoreOrLevel: 'Từ bậc 4 (Level 3) trở lên'
  },
  {
    id: 'fl-06',
    language: 'Tiếng Anh',
    certificateName: 'Pearson Test of English Academic (PTE Academic)',
    minScoreOrLevel: 'Từ bậc 4 (59 - 75) trở lên'
  },
  {
    id: 'fl-07',
    language: 'Tiếng Anh',
    certificateName: 'Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam (VSTEP)',
    minScoreOrLevel: 'Từ bậc 4 trở lên (B2)',
    issuingBody: 'Các trường đại học được Bộ GD&ĐT cấp phép (bao gồm ĐH Vinh)'
  },
  {
    id: 'fl-08',
    language: 'Tiếng Anh',
    certificateName: 'LANGUAGECERT International ESOL / Academic',
    minScoreOrLevel: 'B2 Communicator hoặc Từ 60 trở lên',
    note: 'QĐ 1430/QĐ-BGDĐT ngày 29/05/2026'
  },
  {
    id: 'fl-09',
    language: 'Tiếng Anh',
    certificateName: 'Oxford Test of English (OTE & OTE Advanced)',
    minScoreOrLevel: 'Từ 111 trở lên',
    note: 'QĐ 1429/QĐ-BGDĐT ngày 29/05/2026'
  },
  {
    id: 'fl-10',
    language: 'Tiếng Pháp',
    certificateName: 'CIEP / Alliance française diplomas',
    minScoreOrLevel: 'TCF từ 400 trở lên; DELF B2 trở lên'
  },
  {
    id: 'fl-11',
    language: 'Tiếng Đức',
    certificateName: 'Goethe-Institut / TestDaF',
    minScoreOrLevel: 'Goethe-Zertifikat B2 trở lên; TestDaF level 4 (TDN 4) trở lên'
  },
  {
    id: 'fl-12',
    language: 'Tiếng Trung Quốc',
    certificateName: 'Chinese Hanyu Shuiping Kaoshi (HSK)',
    minScoreOrLevel: 'HSK level 4 trở lên (kèm HSKK Trung cấp)'
  },
  {
    id: 'fl-13',
    language: 'Tiếng Nhật',
    certificateName: 'Japanese Language Proficiency Test (JLPT)',
    minScoreOrLevel: 'N3 trở lên'
  },
  {
    id: 'fl-14',
    language: 'Tiếng Nga',
    certificateName: 'TORFL (ТРКИ)',
    minScoreOrLevel: 'TPKИ-2 trở lên'
  }
];

// ==========================================
// 4. DANH MỤC THÍ SINH TRA CỨU MẪU (THẠC SĨ ĐỢT 1 - KẾT QUẢ ĐÃ CÔNG BỐ)
// ==========================================
export const mockPostgraduateApplicants: PostgraduateApplicant[] = [
  {
    applicationCode: 'SDH-2026-1088',
    fullName: 'Nguyễn Văn Hoàng',
    dateOfBirth: '1995-04-12',
    gender: 'Nam',
    idNumber: '040095001234',
    phoneNumber: '0984123456',
    email: 'hoangnv95@gmail.com',
    degreeLevel: 'master',
    majorCode: '8310201',
    majorName: 'Chính trị học',
    round: 1,
    undergraduateDegree: {
      institution: 'Trường Đại học Vinh',
      major: 'Giáo dục Chính trị',
      graduationYear: 2017,
      classification: 'Giỏi'
    },
    foreignLanguageCert: {
      type: 'VSTEP B2 (Đại học Vinh cấp)',
      scoreOrLevel: 'Bậc 4 (B2) - 6.5',
      issueDate: '2025-11-20'
    },
    researchTopicOrEssayTitle: 'Bài luận: Phát triển năng lực lãnh đạo cán bộ cơ sở tỉnh Nghệ An trong thời kỳ chuyển đổi số',
    paymentStatus: 'PAID',
    feeAmount: 420000,
    status: 'ADMITTED',
    examScore: {
      essayOrInterviewScore: 8.50,
      totalScore: 8.50,
      rank: 3
    },
    admissionNotice: {
      officialNumber: '39/TB-ĐHV & QĐ 2246/QĐ-ĐHV',
      cutoffScore: 7.77,
      enrollmentDeadline: '15/07/2026',
      registrationLocation: 'Phòng Đào tạo Sau đại học, Tầng 4 Nhà Điều hành ĐH Vinh'
    }
  },
  {
    applicationCode: 'SDH-2026-1092',
    fullName: 'Lê Thị Phương Thảo',
    dateOfBirth: '1998-09-24',
    gender: 'Nữ',
    idNumber: '040198005678',
    phoneNumber: '0973654321',
    email: 'thaoltp@gmail.com',
    degreeLevel: 'master',
    majorCode: '8140111',
    majorName: 'Lý luận và PPDH bộ môn Tiếng Anh',
    round: 1,
    undergraduateDegree: {
      institution: 'Trường Đại học Ngoại ngữ - ĐHQG Hà Nội',
      major: 'Sư phạm Tiếng Anh',
      graduationYear: 2020,
      classification: 'Xuất sắc'
    },
    foreignLanguageCert: {
      type: 'IELTS Academic',
      scoreOrLevel: '7.5',
      issueDate: '2025-08-15'
    },
    researchTopicOrEssayTitle: 'Phỏng vấn chuyên môn: Integrating Artificial Intelligence in English Speaking Skills Assessment for High School Students',
    paymentStatus: 'PAID',
    feeAmount: 420000,
    status: 'ADMITTED',
    examScore: {
      essayOrInterviewScore: 8.75,
      totalScore: 8.75,
      rank: 2
    },
    admissionNotice: {
      officialNumber: '39/TB-ĐHV & QĐ 2246/QĐ-ĐHV',
      cutoffScore: 7.90,
      enrollmentDeadline: '15/07/2026',
      registrationLocation: 'Phòng Đào tạo Sau đại học, Tầng 4 Nhà Điều hành ĐH Vinh'
    }
  },
  {
    applicationCode: 'SDH-2026-2005',
    fullName: 'Trần Văn Đức',
    dateOfBirth: '1990-11-05',
    gender: 'Nam',
    idNumber: '040090009988',
    phoneNumber: '0912334455',
    email: 'ductran.ce@gmail.com',
    degreeLevel: 'doctoral',
    majorCode: '9580201',
    majorName: 'Kỹ thuật xây dựng',
    round: 2,
    undergraduateDegree: {
      institution: 'Trường Đại học Bách khoa Đà Nẵng',
      major: 'Kỹ thuật Xây dựng Công trình Giao thông',
      graduationYear: 2013,
      classification: 'Khá'
    },
    masterDegree: {
      institution: 'Trường Đại học Vinh',
      major: 'Kỹ thuật xây dựng',
      graduationYear: 2017
    },
    foreignLanguageCert: {
      type: 'TOEFL iBT',
      scoreOrLevel: '62 điểm',
      issueDate: '2025-05-10'
    },
    researchTopicOrEssayTitle: 'Nghiên cứu ứng dụng bê tông Geopolymer cốt liệu tro bay tại vùng duyên hải Bắc Trung Bộ',
    paymentStatus: 'PAID',
    feeAmount: 1500000,
    status: 'UNDER_REVIEW'
  }
];

// Thông tin liên hệ Ban Tuyển sinh Sau đại học
export const postgraduateContactInfo = {
  office: 'Phòng Đào tạo Sau đại học — Trường Đại học Vinh',
  location: 'Tầng 4, Nhà Điều hành, Trường Đại học Vinh (Số 182, đường Lê Duẩn, TP. Vinh, Nghệ An)',
  phone: '0238.3855773 · 0898.336868 · 0947.089789',
  email: 'saudaihoc@vinhuni.edu.vn',
  website: 'https://phongdaotaosdh.vinhuni.edu.vn',
  portalUrl: 'https://tuyensinhsdh.vinhuni.edu.vn',
  examLookupUrl: 'https://diemthi.vinhuni.edu.vn',
  zaloCommunity: 'https://zalo.me/g/vsdsks260',
  officerInCharge: 'ThS. Nguyễn Thị Hải Sinh (0947.089.789) & Thầy Trần Việt Dũng (089.833.6868)'
};
