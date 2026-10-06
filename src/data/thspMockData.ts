import { 
  THSPQuotaInfo, 
  THSPTimelineItem, 
  THSPApplicantRecord, 
  THSPExtractedDocument 
} from '../types/thsp';

// Danh mục chỉ tiêu tuyển sinh Trường Thực hành Sư phạm - Đại học Vinh
export const initialTHSPQuotas: THSPQuotaInfo[] = [
  {
    gradeLevel: 'mam-non',
    gradeName: 'Khối Mầm non (Nhà trẻ & Mẫu giáo)',
    ageRequirement: 'Từ 24 tháng đến 5 tuổi',
    birthYear: '2021 - 2024',
    targetQuota: 120,
    classCount: 4,
    campus1Quota: 80,
    campus2Quota: 40,
    method: 'Xét tuyển hồ sơ kết hợp bốc thăm công khai nếu vượt chỉ tiêu',
    priorityCriteria: [
      '1. Con ruột cán bộ, giảng viên, viên chức cơ hữu Trường Đại học Vinh',
      '2. Trẻ em có hộ khẩu thường trú hoặc tạm trú tại Phường Bến Thủy / Nghi Ân',
      '3. Gia đình có anh/chị ruột đang theo học tại Trường Thực hành Sư phạm'
    ],
    lotteryRule: 'Nếu số lượng hồ sơ hợp lệ vượt quá 120 chỉ tiêu, Nhà trường sẽ tổ chức bốc thăm công khai có sự chứng kiến của Đại diện Hội phụ huynh và Ban Thanh tra Trường ĐH Vinh vào ngày 28/05/2026.',
    tuitionFeePerMonth: 1850000,
    boardingFeePerMonth: 850000,
    status: 'active'
  },
  {
    gradeLevel: 'lop-1',
    gradeName: 'Khối Tiểu học (Lớp 1)',
    ageRequirement: 'Trẻ 06 tuổi hoàn thành chương trình mầm non 5 tuổi',
    birthYear: '2020 (hoặc trẻ khuyết tật, hoàn cảnh đặc biệt: 2019)',
    targetQuota: 180,
    classCount: 5,
    campus1Quota: 120,
    campus2Quota: 60,
    method: 'Xét tuyển học bạ mầm non & Đánh giá năng lực phát triển nhận thức, ngôn ngữ',
    priorityCriteria: [
      '1. Con đẻ/con nuôi hợp pháp của cán bộ, viên chức Trường Đại học Vinh',
      '2. Học sinh đã hoàn thành chương trình Mầm non tại Trường THSP',
      '3. Học sinh có anh/chị ruột đang học tại các cấp của Trường THSP'
    ],
    lotteryRule: 'Trong trường hợp số hồ sơ diện phổ thông vượt chỉ tiêu sau khi tiếp nhận các đối tượng ưu tiên 1 và 2, tiến hành bốc thăm minh bạch theo mã hồ sơ số hóa.',
    tuitionFeePerMonth: 1650000,
    boardingFeePerMonth: 850000,
    status: 'active'
  },
  {
    gradeLevel: 'lop-6',
    gradeName: 'Khối THCS (Lớp 6 - Chất lượng cao)',
    ageRequirement: 'Học sinh hoàn thành chương trình Tiểu học',
    birthYear: '2015',
    targetQuota: 210, // Được điều chỉnh từ 180 lên 210 theo Thông báo số 02/TB-THSP thay thế số 52
    classCount: 6,
    campus1Quota: 150,
    campus2Quota: 60,
    method: 'Khảo sát năng lực 3 môn (Toán, Tiếng Việt, Tiếng Anh) kết hợp điểm học bạ tiểu học',
    englishFloorScore: 5.0,
    scoringFormula: 'Điểm XT = (Điểm Toán + Điểm Tiếng Việt) + (Điểm Tiếng Anh × 1.0) + Điểm Ưu tiên (Tối đa 3.0 điểm). Yêu cầu điểm sàn môn Tiếng Anh ≥ 5.0 điểm.',
    priorityCriteria: [
      '1. Học sinh đạt giải Nhất, Nhì cấp Tỉnh/Thành phố các cuộc thi Toán, Tin học, Tiếng Anh (+1.5 - 2.0 điểm)',
      '2. Có chứng chỉ tiếng Anh quốc tế Cambridge Flyers ≥ 12 khiên hoặc TOEFL Primary Step 2 (4-5 huy hiệu) (+1.0 - 2.0 điểm)',
      '3. Con ruột cán bộ, viên chức Trường Đại học Vinh (+1.0 điểm)',
      '4. Hoàn thành xuất sắc nhiệm vụ học tập và rèn luyện 5 năm tiểu học (+1.0 điểm)'
    ],
    lotteryRule: 'Tuyển chọn từ cao xuống thấp theo Điểm xét tuyển tổng hợp cho đến khi đủ 210 chỉ tiêu. Thí sinh cùng mức điểm ở ngưỡng cuối sẽ xét theo thứ tự: Điểm môn Toán cao hơn -> Điểm môn Tiếng Anh cao hơn.',
    tuitionFeePerMonth: 1950000,
    boardingFeePerMonth: 900000,
    status: 'active'
  },
  {
    gradeLevel: 'lop-10-11',
    gradeName: 'Khối THPT (Lớp 10 & 11 Chuyển trường)',
    ageRequirement: 'Học sinh tốt nghiệp THCS hoặc hoàn thành lớp 10',
    birthYear: '2010 - 2011',
    targetQuota: 160,
    classCount: 4,
    campus1Quota: 160,
    campus2Quota: 0,
    method: 'Sử dụng kết quả kỳ thi Tuyển sinh vào Lớp 10 của Sở GD&ĐT Nghệ An hoặc Khảo sát riêng',
    englishFloorScore: 5.0,
    scoringFormula: 'Điểm XT = (Điểm Ngữ văn + Điểm Toán) × 2 + Điểm Ngoại ngữ + Điểm Ưu tiên.',
    priorityCriteria: [
      '1. Học sinh đạt danh hiệu Học sinh giỏi cấp Tỉnh lớp 9 các môn văn hóa',
      '2. Chứng chỉ IELTS từ 5.5 trở lên hoặc tương đương',
      '3. Con viên chức Trường Đại học Vinh'
    ],
    lotteryRule: 'Lấy điểm xét tuyển từ cao xuống thấp đến khi đủ chỉ tiêu được phê duyệt.',
    tuitionFeePerMonth: 2200000,
    boardingFeePerMonth: 950000,
    status: 'active'
  }
];

// Tiến độ tuyển sinh & Lịch trình thời gian thực
export const initialTHSPTimelines: THSPTimelineItem[] = [
  {
    id: 'timeline-1',
    title: 'Phát hành thông báo & Mở cổng đăng ký trực tuyến',
    dateRange: '02/05/2026 - 10/06/2026',
    startDate: '2026-05-02',
    endDate: '2026-06-10T17:00:00',
    description: 'Phụ huynh điền form trực tuyến, tải lên ảnh 3x4, bản sao khai sinh và nộp lệ phí 300.000đ qua VietQR.',
    status: 'current',
    highlight: true
  },
  {
    id: 'timeline-2',
    title: 'Tổ chức Bốc thăm chỉ tiêu (Mầm non & Lớp 1)',
    dateRange: '12/06/2026',
    startDate: '2026-06-12',
    endDate: '2026-06-12T11:30:00',
    description: 'Bốc thăm công khai tại Hội trường A - Trường Thực hành Sư phạm (182 Lê Duẩn) có livestream trực tiếp.',
    status: 'upcoming'
  },
  {
    id: 'timeline-3',
    title: 'Khảo sát năng lực tuyển sinh Lớp 6',
    dateRange: '15/06/2026 (Sáng 07h00)',
    startDate: '2026-06-15T07:00:00',
    endDate: '2026-06-15T11:45:00',
    description: 'Thí sinh tập trung tại phòng thi làm 3 bài khảo sát: Toán (60 phút), Tiếng Việt (60 phút), Tiếng Anh (45 phút). Lưu ý mang CCCD/Thẻ học sinh.',
    status: 'upcoming'
  },
  {
    id: 'timeline-4',
    title: 'Công bố điểm thi & Danh sách trúng tuyển',
    dateRange: '20/06/2026 (Từ 14h00)',
    startDate: '2026-06-20T14:00:00',
    endDate: '2026-06-20T23:59:59',
    description: 'Công bố điểm số và danh sách trúng tuyển đợt 1 trên Cổng Tra cứu VinhUni.',
    status: 'upcoming'
  },
  {
    id: 'timeline-5',
    title: 'Tiếp nhận hồ sơ gốc & Thủ tục nhập học',
    dateRange: '23/06/2026 - 28/06/2026',
    startDate: '2026-06-23',
    endDate: '2026-06-28T17:00:00',
    description: 'Phụ huynh nộp bản chính Giấy khai sinh, Học bạ và đối chiếu thông tin tại Văn phòng Trường.',
    status: 'upcoming'
  }
];

// Danh sách văn bản PDF của Trường Thực hành Sư phạm (mô phỏng trích xuất AI Engine)
export const initialTHSPDocuments: THSPExtractedDocument[] = [
  {
    id: 'doc-02-thsp',
    fileName: 'Thong_bao_02_TB-THSP_ThayThe.pdf',
    officialNumber: '02/TB-THSP',
    docType: 'REPLACEMENT_NOTICE',
    issuer: 'Trường Thực hành Sư phạm — Trường Đại học Vinh',
    signer: 'TS. Phan Xuân Phồn — Hiệu trưởng',
    issueDate: '2026-05-18',
    effectiveDate: '2026-05-18',
    replacesDocId: 'doc-52-thsp',
    replacesOfficialNumber: '52/TB-THSP',
    summary: 'Thông báo số 02/TB-THSP THAY THẾ Thông báo số 52/TB-THSP về việc điều chỉnh tăng chỉ tiêu Khối THCS Lớp 6 (từ 180 lên 210 học sinh) và gia hạn thời hạn đăng ký trực tuyến đến hết ngày 10/06/2026.',
    keyChangesHighlight: 'Thay thế chỉ tiêu Lớp 6: 180 -> 210 học sinh (tăng 1 lớp). Gia hạn nộp hồ sơ đến 10/06/2026. Lệ phí và phương thức thi giữ nguyên.',
    applicationDeadline: '2026-06-10T17:00:00',
    surveyExamDate: '2026-06-15T07:00:00',
    resultDate: '2026-06-20',
    registrationFee: 300000,
    bankAccount: {
      bankName: 'BIDV Chi nhánh Nghệ An',
      accountNumber: '51010001234567',
      accountHolder: 'TRUONG THUC HANH SU PHAM - DAI HOC VINH',
      qrPrefix: 'THSP2026'
    },
    isPublished: true,
    isRegistrationFormOpen: true
  },
  {
    id: 'doc-52-thsp',
    fileName: 'Thong_bao_52_TB-THSP.pdf',
    officialNumber: '52/TB-THSP',
    docType: 'ADMISSION_NOTICE',
    issuer: 'Trường Thực hành Sư phạm — Trường Đại học Vinh',
    signer: 'TS. Phan Xuân Phồn — Hiệu trưởng',
    issueDate: '2026-04-15',
    effectiveDate: '2026-04-15',
    summary: 'Kế hoạch và Thông báo tuyển sinh các cấp học (Mầm non, Lớp 1, Lớp 6, Lớp 10) năm học 2026 - 2027 của Trường Thực hành Sư phạm (Văn bản gốc ban đầu).',
    keyChangesHighlight: 'Văn bản gốc quy định chỉ tiêu 180 cho Lớp 6, hạn đăng ký 25/05/2026 (Đã bị thay thế bởi Thông báo 02/TB-THSP).',
    applicationDeadline: '2026-05-25T17:00:00',
    surveyExamDate: '2026-06-10T07:00:00',
    resultDate: '2026-06-18',
    registrationFee: 300000,
    bankAccount: {
      bankName: 'BIDV Chi nhánh Nghệ An',
      accountNumber: '51010001234567',
      accountHolder: 'TRUONG THUC HANH SU PHAM - DAI HOC VINH',
      qrPrefix: 'THSP2026'
    },
    isPublished: false,
    isRegistrationFormOpen: false
  },
  {
    id: 'doc-kq-thsp',
    fileName: 'Thong_bao_DiemThi_KhaoSat_Lop6.pdf',
    officialNumber: '88/TB-THSP-KQ',
    docType: 'EXAM_RESULT',
    issuer: 'Hội đồng Tuyển sinh Trường Thực hành Sư phạm',
    signer: 'HĐTS Trường THSP - ĐH Vinh',
    issueDate: '2026-06-20',
    effectiveDate: '2026-06-20',
    summary: 'Công bố điểm thi khảo sát năng lực đầu vào lớp 6 năm học 2026-2027 và điểm chuẩn xét tuyển đợt 1 (Điểm chuẩn: 22.50 điểm, tiếng Anh ≥ 5.0).',
    keyChangesHighlight: 'Điểm sàn chuẩn trúng tuyển Đợt 1: 22.50 điểm. Điểm sàn Tiếng Anh: 5.0 điểm. Tiếp nhận phúc khảo đến 24/06/2026.',
    applicationDeadline: '2026-06-10',
    surveyExamDate: '2026-06-15',
    resultDate: '2026-06-20',
    registrationFee: 300000,
    bankAccount: {
      bankName: 'BIDV Chi nhánh Nghệ An',
      accountNumber: '51010001234567',
      accountHolder: 'TRUONG THUC HANH SU PHAM - DAI HOC VINH',
      qrPrefix: 'THSP2026'
    },
    isPublished: true,
    isRegistrationFormOpen: false
  }
];

// Thí sinh mẫu để demo tra cứu kết quả (Result Lookup Tool)
export const initialTHSPApplicants: THSPApplicantRecord[] = [
  {
    id: 'app-001',
    applicationCode: 'THSP2026-6-88392',
    rollNumber: 'THSP-06-0128',
    studentName: 'Lê Minh Anh',
    birthDate: '2015-04-12',
    gender: 'Nữ',
    gradeLevel: 'lop-6',
    targetGradeName: 'Lớp 6 THCS Chất lượng cao',
    campusPreference: 'Cơ sở 1 (182 Lê Duẩn)',
    parentName: 'Lê Hoàng Nam',
    parentPhone: '0912345678',
    parentEmail: 'nam.lehoang@gmail.com',
    currentSchool: 'Trường Tiểu học Lê Mao, TP. Vinh',
    registrationDate: '2026-05-20',
    feeAmount: 300000,
    paymentStatus: 'PAID',
    paymentRef: 'MBVCB.983948271',
    documents: {
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      birthCertUrl: 'GIAY_KHAI_SINH_LE_MINH_ANH.pdf',
      transcriptUrl: 'HOC_BA_TIEU_HOC_LE_MINH_ANH.pdf'
    },
    examScores: {
      math: 8.50,
      vietnamese: 8.00,
      english: 9.00,
      priorityBonus: 1.00, // Hoàn thành xuất sắc 5 năm
      totalScore: 26.50,
      standardCutoff: 22.50
    },
    admissionStatus: 'ADMITTED'
  },
  {
    id: 'app-002',
    applicationCode: 'THSP2026-6-47201',
    rollNumber: 'THSP-06-0345',
    studentName: 'Nguyễn Đăng Khoa',
    birthDate: '2015-09-25',
    gender: 'Nam',
    gradeLevel: 'lop-6',
    targetGradeName: 'Lớp 6 THCS Chất lượng cao',
    campusPreference: 'Cơ sở 1 (182 Lê Duẩn)',
    parentName: 'Nguyễn Văn Hùng',
    parentPhone: '0988776655',
    parentEmail: 'hung.nguyen@vinhuni.edu.vn',
    currentSchool: 'Trường Thực hành Sư phạm (Tiểu học)',
    registrationDate: '2026-05-22',
    feeAmount: 300000,
    paymentStatus: 'PAID',
    paymentRef: 'BIDV.882910382',
    documents: {
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      birthCertUrl: 'GIAY_KHAI_SINH_NGUYEN_DANG_KHOA.pdf',
      transcriptUrl: 'HOC_BA_NGUYEN_DANG_KHOA.pdf'
    },
    examScores: {
      math: 7.00,
      vietnamese: 7.25,
      english: 7.50,
      priorityBonus: 1.00, // Con viên chức ĐHV
      totalScore: 22.75,
      standardCutoff: 22.50
    },
    admissionStatus: 'ADMITTED'
  },
  {
    id: 'app-003',
    applicationCode: 'THSP2026-6-99120',
    rollNumber: 'THSP-06-0512',
    studentName: 'Trần Gia Bảo',
    birthDate: '2015-11-03',
    gender: 'Nam',
    gradeLevel: 'lop-6',
    targetGradeName: 'Lớp 6 THCS Chất lượng cao',
    campusPreference: 'Cơ sở 2 (Nghi Ân)',
    parentName: 'Trần Văn Đức',
    parentPhone: '0945112233',
    parentEmail: 'ductran.vinh@gmail.com',
    currentSchool: 'Trường Tiểu học Hưng Dũng 1',
    registrationDate: '2026-05-28',
    feeAmount: 300000,
    paymentStatus: 'PAID',
    paymentRef: 'VIETIN.77192837',
    documents: {
      birthCertUrl: 'KHAI_SINH_TRAN_GIA_BAO.pdf',
      transcriptUrl: 'HOC_BA_TRAN_GIA_BAO.pdf'
    },
    examScores: {
      math: 7.25,
      vietnamese: 6.75,
      english: 8.00,
      priorityBonus: 0.00,
      totalScore: 22.00,
      standardCutoff: 22.50
    },
    admissionStatus: 'WAITLIST',
    waitlistRank: 3
  },
  {
    id: 'app-004',
    applicationCode: 'THSP2026-1-10492',
    studentName: 'Phạm Quỳnh Chi',
    birthDate: '2020-02-14',
    gender: 'Nữ',
    gradeLevel: 'lop-1',
    targetGradeName: 'Lớp 1 Tiểu học',
    campusPreference: 'Cơ sở 1 (182 Lê Duẩn)',
    parentName: 'Phạm Quốc Tuấn',
    parentPhone: '0903456789',
    parentEmail: 'tuanpq@yahoo.com',
    currentSchool: 'Trường Mầm non Thực hành Sư phạm',
    registrationDate: '2026-05-15',
    feeAmount: 300000,
    paymentStatus: 'PAID',
    paymentRef: 'TECH.99028371',
    documents: {
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      birthCertUrl: 'KHAI_SINH_PHAM_QUYNH_CHI.pdf'
    },
    admissionStatus: 'ADMITTED'
  }
];

// Chính sách học phí và miễn giảm chi tiết
export const thspFeePolicyDetails = {
  academicYear: '2026 - 2027',
  approvedBy: 'Hội đồng Trường Đại học Vinh & Ban Giám hiệu Trường THSP',
  monthlyFees: [
    {
      level: 'Mầm non (Nhà trẻ & Mẫu giáo)',
      tuition: 1850000,
      boarding: 850000,
      utilities: 150000,
      totalMonthly: 2850000,
      note: 'Bao gồm 3 bữa ăn (sáng, trưa, xế), nước uống tinh khiết và điều hòa'
    },
    {
      level: 'Tiểu học (Lớp 1 đến Lớp 5)',
      tuition: 1650000,
      boarding: 850000,
      utilities: 150000,
      totalMonthly: 2650000,
      note: 'Bao gồm bán trú trưa, câu lạc bộ ngoại khóa và tiếng Anh tăng cường'
    },
    {
      level: 'THCS (Lớp 6 đến Lớp 9)',
      tuition: 1950000,
      boarding: 900000,
      utilities: 180000,
      totalMonthly: 3030000,
      note: 'Bao gồm chương trình giáo dục STEM thực nghiệm và luyện thi chứng chỉ Cambridge'
    },
    {
      level: 'THPT (Lớp 10 đến Lớp 12)',
      tuition: 2200000,
      boarding: 950000,
      utilities: 200000,
      totalMonthly: 3350000,
      note: 'Định hướng khối thi đại học, bồi dưỡng học sinh giỏi và IELTS'
    }
  ],
  exemptions: [
    {
      title: 'Giảm 50% học phí',
      beneficiary: 'Con đẻ của cán bộ, giảng viên, nhân viên cơ hữu Trường Đại học Vinh',
      legalBasis: 'Nghị quyết của Hội đồng Trường Đại học Vinh và Quy chế chi tiêu nội bộ'
    },
    {
      title: 'Giảm 10% học phí',
      beneficiary: 'Gia đình có từ 2 con ruột trở lên cùng theo học tại Trường THSP (áp dụng cho con thứ 2 trở đi)',
      legalBasis: 'Chính sách hỗ trợ gia đình VinhUni Family'
    },
    {
      title: 'Miễn 100% học phí & Học bổng toàn phần',
      beneficiary: 'Học sinh đạt giải Nhất kỳ thi Học sinh giỏi cấp Quốc gia hoặc hoàn cảnh đặc biệt khó khăn vươn lên học giỏi',
      legalBasis: 'Quỹ Học bổng Tài năng Trẻ Trường Đại học Vinh'
    }
  ]
};
