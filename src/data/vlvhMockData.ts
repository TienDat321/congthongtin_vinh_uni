import { VLVHMajor, VLVHConsultant, VLVHApplicationRecord } from '../types/vlvh';

// Danh sách 16 ngành đào tạo Vừa làm vừa học trích xuất từ Thông báo số 07/TB-ĐHV (16/01/2026)
export const initialVLVHMajors: VLVHMajor[] = [
  // 1. CÁC NGÀNH ĐÀO TẠO GIÁO VIÊN (1.800 CHỈ TIÊU)
  {
    id: 'vlvh-01',
    order: 1,
    name: 'Giáo dục Mầm non',
    code: '7140201',
    category: 'teacher',
    quota: 900,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: false
    },
    durationNote: 'TC lên ĐH: 3.0 - 3.5 năm | CĐ lên ĐH: 2.0 - 2.5 năm | Bằng 2: 2.0 - 2.5 năm',
    entryRequirement: 'Tốt nghiệp TC/CĐ sư phạm loại Khá + 3 năm kinh nghiệm, hoặc loại Giỏi; hoặc tốt nghiệp trước 07/05/2020 đạt loại Trung bình trở lên theo Đ72 Luật GD 2019.'
  },
  {
    id: 'vlvh-02',
    order: 2,
    name: 'Giáo dục Quốc phòng - An ninh',
    code: '7140208',
    category: 'teacher',
    quota: 150,
    programs: {
      tcToDh: false,
      cdToDh: false,
      secondDegree: true,
      thpt: false
    },
    durationNote: 'Văn bằng hai: 2.0 - 2.5 năm',
    entryRequirement: 'Người đã có bằng tốt nghiệp trình độ đại học sư phạm khác ngành.'
  },
  {
    id: 'vlvh-03',
    order: 3,
    name: 'Giáo dục Thể chất',
    code: '7140206',
    category: 'teacher',
    quota: 50,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: false
    },
    durationNote: 'TC lên ĐH: 3.0 năm | CĐ lên ĐH: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Lớp 12 Khá hoặc ĐTB các môn văn hóa THPT ≥ 6.5; hoặc TC/CĐ/ĐH loại Khá trở lên; hoặc lớp 12 TB + 5 năm kinh nghiệm.'
  },
  {
    id: 'vlvh-04',
    order: 4,
    name: 'Giáo dục Tiểu học',
    code: '7140202',
    category: 'teacher',
    quota: 400,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: false
    },
    durationNote: 'TC lên ĐH: 3.0 - 3.5 năm | CĐ lên ĐH: 2.0 - 2.5 năm | Bằng 2: 2.0 - 2.5 năm',
    entryRequirement: 'Tốt nghiệp TC/CĐ sư phạm loại Khá + 3 năm kinh nghiệm, hoặc loại Giỏi; người học nâng chuẩn xếp loại Trung bình trở lên.'
  },
  {
    id: 'vlvh-05',
    order: 5,
    name: 'Sư phạm Ngữ văn',
    code: '7140217',
    category: 'teacher',
    quota: 50,
    programs: {
      tcToDh: false,
      cdToDh: true,
      secondDegree: true,
      thpt: false
    },
    durationNote: 'CĐ lên ĐH: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Tốt nghiệp Cao đẳng Sư phạm Ngữ văn hoặc bằng đại học khác ngành.'
  },
  {
    id: 'vlvh-06',
    order: 6,
    name: 'Sư phạm Tiếng Anh',
    code: '7140231',
    category: 'teacher',
    quota: 100,
    programs: {
      tcToDh: false,
      cdToDh: true,
      secondDegree: true,
      thpt: false
    },
    durationNote: 'CĐ lên ĐH: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Tốt nghiệp Cao đẳng Sư phạm Tiếng Anh hoặc bằng đại học khác ngành.'
  },
  {
    id: 'vlvh-07',
    order: 7,
    name: 'Sư phạm Tin học',
    code: '7140210',
    category: 'teacher',
    quota: 50,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: false
    },
    durationNote: 'TC lên ĐH: 3.0 năm | CĐ lên ĐH: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Tốt nghiệp TC/CĐ sư phạm Tin học hoặc bằng đại học khác ngành.'
  },
  {
    id: 'vlvh-08',
    order: 8,
    name: 'Sư phạm Toán học',
    code: '7140209',
    category: 'teacher',
    quota: 100,
    programs: {
      tcToDh: false,
      cdToDh: true,
      secondDegree: true,
      thpt: false
    },
    durationNote: 'CĐ lên ĐH: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Tốt nghiệp Cao đẳng Sư phạm Toán hoặc bằng đại học khác ngành.'
  },

  // 2. CÁC NGÀNH ĐÀO TẠO KHÁC (600 CHỈ TIÊU)
  {
    id: 'vlvh-09',
    order: 1,
    name: 'Kế toán',
    code: '7340301',
    category: 'other',
    quota: 50,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: true
    },
    durationNote: 'THPT: 4.0 - 4.5 năm | TC: 3.0 năm | CĐ: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Xếp hạng tốt nghiệp từ loại Trung bình trở lên.'
  },
  {
    id: 'vlvh-10',
    order: 2,
    name: 'Quản trị kinh doanh',
    code: '7340101',
    category: 'other',
    quota: 50,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: true
    },
    durationNote: 'THPT: 4.0 - 4.5 năm | TC: 3.0 năm | CĐ: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Xếp hạng tốt nghiệp từ loại Trung bình trở lên.'
  },
  {
    id: 'vlvh-11',
    order: 3,
    name: 'Luật',
    code: '7380101',
    category: 'other',
    quota: 100,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: true
    },
    durationNote: 'THPT: 4.0 - 4.5 năm | TC: 3.0 năm | CĐ: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Xếp hạng tốt nghiệp từ loại Trung bình trở lên.'
  },
  {
    id: 'vlvh-12',
    order: 4,
    name: 'Luật kinh tế',
    code: '7380107',
    category: 'other',
    quota: 50,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: true
    },
    durationNote: 'THPT: 4.0 - 4.5 năm | TC: 3.0 năm | CĐ: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Xếp hạng tốt nghiệp từ loại Trung bình trở lên.'
  },
  {
    id: 'vlvh-13',
    order: 5,
    name: 'Ngôn ngữ Anh',
    code: '7220201',
    category: 'other',
    quota: 200,
    programs: {
      tcToDh: false,
      cdToDh: false,
      secondDegree: true,
      thpt: false
    },
    durationNote: 'Văn bằng hai: 2.0 - 2.5 năm',
    entryRequirement: 'Đã tốt nghiệp một bằng đại học bất kỳ loại Trung bình trở lên.'
  },
  {
    id: 'vlvh-14',
    order: 6,
    name: 'Quản lý nhà nước',
    code: '7310205',
    category: 'other',
    quota: 50,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: true
    },
    durationNote: 'THPT: 4.0 - 4.5 năm | TC: 3.0 năm | CĐ: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Xếp hạng tốt nghiệp từ loại Trung bình trở lên.'
  },
  {
    id: 'vlvh-15',
    order: 7,
    name: 'Kỹ thuật xây dựng',
    code: '7580201',
    category: 'other',
    quota: 50,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: true
    },
    durationNote: 'THPT: 4.5 năm | TC: 3.0 năm | CĐ: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Xếp hạng tốt nghiệp từ loại Trung bình trở lên.'
  },
  {
    id: 'vlvh-16',
    order: 8,
    name: 'Kỹ thuật xây dựng công trình giao thông',
    code: '7580205',
    category: 'other',
    quota: 50,
    programs: {
      tcToDh: true,
      cdToDh: true,
      secondDegree: true,
      thpt: true
    },
    durationNote: 'THPT: 4.5 năm | TC: 3.0 năm | CĐ: 2.0 năm | Bằng 2: 2.0 năm',
    entryRequirement: 'Xếp hạng tốt nghiệp từ loại Trung bình trở lên.'
  }
];

// Danh bạ thông tin tư vấn tuyển sinh (Trích xuất từ Mục VIII Thông báo số 07/TB-ĐHV)
export const vlvhConsultants: VLVHConsultant[] = [
  {
    role: 'Giám đốc Trung tâm GDTX',
    name: 'PGS.TS. Đinh Trung Thành',
    phone: '0904.252425',
    email: 'thanhdt@vinhuni.edu.vn',
    zalo: '0904.252425'
  },
  {
    role: 'Phó Giám đốc',
    name: 'ThS. Đậu Đăng Tuấn',
    phone: '0912.363420',
    email: 'tuankhtcdhv@gmail.com',
    zalo: '0912.363420'
  },
  {
    role: 'Phó Giám đốc',
    name: 'ThS. Nguyễn Quốc Dũng',
    phone: '0913.039877',
    email: 'dungnq@vinhuni.edu.vn',
    zalo: '0913.039877'
  },
  {
    role: 'Tư vấn tuyển sinh',
    name: 'ThS. Ngô Đức Nhàn',
    phone: '0904.395625',
    email: 'ngoducnhandhvinh@gmail.com',
    zalo: '0904.395625'
  },
  {
    role: 'Tư vấn tuyển sinh',
    name: 'TS. Nguyễn Năng Hùng',
    phone: '0941.586688',
    email: 'nanghung3290@gmail.com',
    zalo: '0941.586688'
  },
  {
    role: 'Tư vấn tuyển sinh',
    name: 'ThS. Chu Thị Ngọc Diệp',
    phone: '0943.149997',
    email: 'diepctn@vinhuni.edu.vn',
    zalo: '0943.149997'
  },
  {
    role: 'Tư vấn tuyển sinh',
    name: 'ThS. Nguyễn Ngọc Tú',
    phone: '0985.683368',
    email: 'nntu@vinhuni.edu.vn',
    zalo: '0985.683368'
  },
  {
    role: 'Tư vấn tuyển sinh',
    name: 'ThS. Nguyễn Văn Quỳnh',
    phone: '0949.597988',
    email: 'manhquynh0502@gmail.com',
    zalo: '0949.597988'
  },
  {
    role: 'Tư vấn tuyển sinh',
    name: 'TS. Phùng Quang Dương',
    phone: '0943.563789',
    email: 'duongpq@vinhuni.edu.vn',
    zalo: '0943.563789'
  },
  {
    role: 'Tư vấn tuyển sinh',
    name: 'ThS. Nguyễn Huy Hùng',
    phone: '0914.535566',
    email: 'hungnh@vinhuni.edu.vn',
    zalo: '0914.535566'
  }
];

// Thí sinh mẫu VLVH để demo tra cứu kết quả xét tuyển
export const initialVLVHApplicants: VLVHApplicationRecord[] = [
  {
    id: 'vlvh-app-01',
    applicationCode: 'VLVH2026-MN-1082',
    studentName: 'Trần Thị Mai Hương',
    birthDate: '1995-08-20',
    gender: 'Nữ',
    idCardNumber: '040195003456',
    phoneNumber: '0987654321',
    email: 'maihuong.mn@gmail.com',
    address: 'Xã Hưng Lộc, Thành phố Vinh, Nghệ An',
    majorCode: '7140201',
    majorName: 'Giáo dục Mầm non',
    programType: 'cdToDh',
    graduatedLevel: 'Cao đẳng Sư phạm',
    graduatedMajor: 'Giáo dục Mầm non',
    graduatedYear: '2018',
    graduatedSchool: 'Trường CĐ Sư phạm Nghệ An',
    workplace: 'Trường Mầm non Hưng Lộc',
    workPosition: 'Giáo viên mầm non',
    workYears: 6,
    feeAmount: 500000,
    paymentStatus: 'PAID',
    paymentRef: 'BIDV.VLVH.99281',
    status: 'ADMITTED',
    registrationDate: '2026-02-15',
    documents: {
      birthCert: 'KHAI_SINH_TRAN_THI_MAI_HUONG.PDF',
      gradDiploma: 'BANG_CD_SU_PHAM_MAM_NON.PDF',
      transcripts: 'BANG_DIEM_CD.PDF',
      idCardScan: 'CCCD_2MAT.PDF',
      workConfirmation: 'GIAY_XAC_NHAN_CONG_TAC_HUONG.PDF'
    }
  },
  {
    id: 'vlvh-app-02',
    applicationCode: 'VLVH2026-LUAT-2041',
    studentName: 'Nguyễn Văn Cường',
    birthDate: '1992-04-10',
    gender: 'Nam',
    idCardNumber: '042092008899',
    phoneNumber: '0912998877',
    email: 'cuong.nguyen@hatinh.gov.vn',
    address: 'Phường Nam Hà, TP. Hà Tĩnh',
    majorCode: '7380101',
    majorName: 'Luật',
    programType: 'secondDegree',
    graduatedLevel: 'Đại học',
    graduatedMajor: 'Kinh tế nông nghiệp',
    graduatedYear: '2014',
    graduatedSchool: 'Trường Đại học Vinh',
    workplace: 'UBND Phường Nam Hà',
    workPosition: 'Cán bộ địa chính',
    workYears: 8,
    feeAmount: 500000,
    paymentStatus: 'PAID',
    paymentRef: 'VCB.VLVH.44319',
    status: 'ADMITTED',
    registrationDate: '2026-02-20',
    documents: {
      gradDiploma: 'BANG_DAI_HOC_KINH_TE.PDF',
      transcripts: 'BANG_DIEM_DH.PDF',
      idCardScan: 'CCCD_2MAT_CUONG.PDF',
      workConfirmation: 'XAC_NHAN_UBND.PDF'
    }
  },
  {
    id: 'vlvh-app-03',
    applicationCode: 'VLVH2026-TH-3310',
    studentName: 'Hoàng Thị Thùy Dung',
    birthDate: '1998-11-05',
    gender: 'Nữ',
    idCardNumber: '038198007766',
    phoneNumber: '0945678901',
    email: 'thuydung.tieuhoc@yahoo.com',
    address: 'Thị trấn Đô Lương, Nghệ An',
    majorCode: '7140202',
    majorName: 'Giáo dục Tiểu học',
    programType: 'tcToDh',
    graduatedLevel: 'Trung cấp Sư phạm',
    graduatedMajor: 'Sư phạm Tiểu học',
    graduatedYear: '2019',
    graduatedSchool: 'Trường Trung cấp Kinh tế - Kỹ thuật',
    workplace: 'Trường Tiểu học Đô Lương 1',
    workPosition: 'Giáo viên hợp đồng',
    workYears: 4,
    feeAmount: 500000,
    paymentStatus: 'PAID',
    status: 'VERIFIED',
    registrationDate: '2026-03-01',
    documents: {
      gradDiploma: 'BANG_TC_SU_PHAM_TIEU_HOC.PDF',
      transcripts: 'BANG_DIEM_TC.PDF',
      idCardScan: 'CCCD_HOANG_THI_THUY_DUNG.PDF'
    }
  }
];

// Thông tin chuyển khoản VietQR lệ phí xét tuyển VLVH
export const vlvhPaymentConfig = {
  bankName: 'BIDV — Ngân hàng TMCP Đầu tư & Phát triển Việt Nam',
  branch: 'Chi nhánh Nghệ An',
  accountNumber: '51010001234567',
  accountHolder: 'TRUONG DAI HOC VINH - TRUNG TAM GDTX',
  feeAmount: 500000,
  feeNote: '500.000 đồng/01 hồ sơ theo Mục IV.3 Thông báo 07/TB-ĐHV'
};
