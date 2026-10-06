import { 
  THPTChuyenClass, 
  THPTChuyenExamSchedule, 
  THPTChuyenCandidate,
  THPTChuyenDirectAdmissionRule 
} from '../types/thptChuyen';

export const thptChuyenClasses: THPTChuyenClass[] = [
  {
    id: "ch-toan",
    name: "Chuyên Toán học",
    code: "CH-TOAN",
    quota: 70,
    classesCount: 2,
    examSubject: "Môn Chuyên: Toán chuyên (hệ số 1,5) + Vòng I (Toán, Tiếng Anh, Ngữ văn)",
    directAdmissionAvailable: true,
    benchmark2025: 38.50,
    benchmark2024: 37.75,
    benchmark2023: 38.00,
    description: "Lớp chuyên truyền thống thành lập năm 1966, sở hữu nhiều huy chương Olympic Toán học quốc tế (IMO) và giải Nhất HSG Quốc gia.",
    careerFocus: "Khoa học Dữ liệu, Trí tuệ nhân tạo, Toán - Tin ứng dụng, Tài chính định lượng",
    facultyLead: "TS. Nguyễn Văn Hùng - Tổ trưởng Tổ Toán"
  },
  {
    id: "ch-tin",
    name: "Chuyên Tin học",
    code: "CH-TIN",
    quota: 35,
    classesCount: 1,
    examSubject: "Môn Chuyên: Tin học chuyên (lập trình máy) hoặc Toán chuyên (hệ số 1,5) + Vòng I (Toán, Anh, Văn)",
    directAdmissionAvailable: true,
    benchmark2025: 36.25,
    benchmark2024: 35.50,
    benchmark2023: 36.00,
    description: "Đào tạo tư duy thuật toán, giải thuật nâng cao, cọ xát các kỳ thi Olympic Tin học ICPC và Tin học trẻ toàn quốc.",
    careerFocus: "Công nghệ phần mềm, An toàn thông tin, Kỹ nghệ dữ liệu, AI & Robotics",
    facultyLead: "ThS. Lê Thái Bình - Tổ Tin học"
  },
  {
    id: "ch-ly",
    name: "Chuyên Vật lý",
    code: "CH-LY",
    quota: 35,
    classesCount: 1,
    examSubject: "Môn Chuyên: Vật lý chuyên (hệ số 1,5) + Vòng I (Toán, Tiếng Anh, Ngữ văn)",
    directAdmissionAvailable: true,
    benchmark2025: 37.00,
    benchmark2024: 36.25,
    benchmark2023: 36.75,
    description: "Tập trung vật lý lý thuyết và thí nghiệm chuyên sâu, liên tục có học sinh tham dự Olympic Vật lý Châu Á và Quốc tế.",
    careerFocus: "Kỹ thuật Vi điện tử, Bán dẫn, Tự động hóa, Năng lượng tái tạo",
    facultyLead: "TS. Trần Đình Tuấn - Tổ Vật lý"
  },
  {
    id: "ch-hoa",
    name: "Chuyên Hóa học",
    code: "CH-HOA",
    quota: 35,
    classesCount: 1,
    examSubject: "Môn Chuyên: Hóa học chuyên (hệ số 1,5) + Vòng I (Toán, Tiếng Anh, Ngữ văn)",
    directAdmissionAvailable: true,
    benchmark2025: 37.50,
    benchmark2024: 36.75,
    benchmark2023: 37.25,
    description: "Trang bị phòng thực hành hiện đại, chuyên sâu Hóa vô cơ, hữu cơ và hóa phân tích định lượng.",
    careerFocus: "Y đa khoa, Dược học, Kỹ thuật Hóa sinh, Khoa học Vật liệu mới",
    facultyLead: "TS. Phạm Thị Minh Hà - Tổ Hóa học"
  },
  {
    id: "ch-sinh",
    name: "Chuyên Sinh học",
    code: "CH-SINH",
    quota: 35,
    classesCount: 1,
    examSubject: "Môn Chuyên: Sinh học chuyên (hệ số 1,5) + Vòng I (Toán, Tiếng Anh, Ngữ văn)",
    directAdmissionAvailable: true,
    benchmark2025: 35.50,
    benchmark2024: 34.75,
    benchmark2023: 35.00,
    description: "Thế mạnh về Di truyền học, Sinh học phân tử và Công nghệ sinh học ứng dụng y tế - nông nghiệp cao.",
    careerFocus: "Bác sĩ nội trú, Công nghệ sinh học, Nông nghiệp công nghệ cao, Môi trường",
    facultyLead: "ThS. Hoàng Trọng Nghĩa - Tổ Sinh học"
  },
  {
    id: "ch-anh",
    name: "Chuyên Tiếng Anh",
    code: "CH-ANH",
    quota: 70,
    classesCount: 2,
    examSubject: "Môn Chuyên: Tiếng Anh chuyên (hệ số 1,5) + Vòng I (Toán, Tiếng Anh, Ngữ văn)",
    directAdmissionAvailable: true,
    benchmark2025: 40.25,
    benchmark2024: 39.50,
    benchmark2023: 39.75,
    description: "Giảng dạy theo chuẩn CEFR C1/IELTS 7.5+, hợp tác giáo viên bản ngữ và các chương trình giao lưu văn hóa quốc tế.",
    careerFocus: "Kinh tế đối ngoại, Quan hệ quốc tế, Ngôn ngữ ứng dụng, Truyền thông số",
    facultyLead: "ThS. Vũ Thị Thanh Tâm - Tổ Ngoại ngữ"
  },
  {
    id: "ch-van",
    name: "Chuyên Ngữ văn",
    code: "CH-VAN",
    quota: 35,
    classesCount: 1,
    examSubject: "Môn Chuyên: Ngữ văn chuyên (hệ số 1,5) + Vòng I (Toán, Tiếng Anh, Ngữ văn)",
    directAdmissionAvailable: true,
    benchmark2025: 37.75,
    benchmark2024: 36.75,
    benchmark2023: 37.00,
    description: "Bồi dưỡng tư duy phản biện, thẩm mỹ ngôn từ và phong cách biểu đạt văn chương sắc sảo.",
    careerFocus: "Báo chí & Truyền hình, Luật sư, Xuất bản, Sáng tạo nội dung, Sư phạm Văn",
    facultyLead: "TS. Lê Thị Quỳnh Chi - Tổ Ngữ văn"
  },
  {
    id: "clc-toan-anh",
    name: "Lớp Chất lượng cao (CLC)",
    code: "CLC-TA",
    quota: 70,
    classesCount: 2,
    examSubject: "Xét từ thí sinh tham gia kỳ thi THPT Chuyên có nguyện vọng 2 (Toán + Văn + Anh + Môn chuyên × 1,5)",
    directAdmissionAvailable: false,
    benchmark2025: 32.50,
    benchmark2024: 31.75,
    benchmark2023: 32.00,
    description: "Chương trình tăng cường tiếng Anh học thuật và kỹ năng STEM, công nghệ số, chuẩn bị hành trang du học và ĐH top đầu.",
    careerFocus: "Đa ngành, Kinh doanh quốc tế, Khoa học ứng dụng, Du học học bổng",
    facultyLead: "Ban Giám hiệu Trường THPT Chuyên"
  }
];

export const thptChuyenExamSchedules: THPTChuyenExamSchedule[] = [
  {
    date: "14/06/2026",
    session: "Sáng",
    subject: "Vòng I — Môn 1: Ngữ văn",
    type: "Chung",
    duration: "90 phút",
    startTime: "07h30",
    location: "Khu A & Nhà B, Cơ sở 1 - Trường Đại học Vinh (182 Lê Duẩn)",
    notes: "Tất cả thí sinh đều bắt buộc thi. Tính hệ số 1."
  },
  {
    date: "14/06/2026",
    session: "Chiều",
    subject: "Vòng I — Môn 2: Tiếng Anh",
    type: "Chung",
    duration: "60 phút",
    startTime: "14h00",
    location: "Khu A & Nhà B, Cơ sở 1 - Trường Đại học Vinh (182 Lê Duẩn)",
    notes: "Tất cả thí sinh đều bắt buộc thi. Tính hệ số 1."
  },
  {
    date: "15/06/2026",
    session: "Sáng",
    subject: "Vòng I — Môn 3: Toán",
    type: "Chung",
    duration: "90 phút",
    startTime: "07h30",
    location: "Khu A & Nhà B, Cơ sở 1 - Trường Đại học Vinh (182 Lê Duẩn)",
    notes: "Tất cả thí sinh đều bắt buộc thi. Tính hệ số 1."
  },
  {
    date: "15/06/2026",
    session: "Chiều",
    subject: "Vòng II — Môn Chuyên (Toán, Tin, Lý, Hóa, Sinh, Văn, Anh)",
    type: "Chuyên",
    duration: "150 phút",
    startTime: "14h00",
    location: "Nhà C & Khu phòng máy Lab Nhà E",
    notes: "Điểm thi môn chuyên tính hệ số 1,5 theo quy định trúng tuyển."
  }
];

export const thptChuyenDirectRules: THPTChuyenDirectAdmissionRule[] = [
  {
    category: "Giải Học sinh giỏi cấp Tỉnh / Thành phố trực thuộc Trung ương",
    conditions: [
      "Học sinh đạt giải Nhất hoặc giải Nhì môn văn hóa lớp 9 cấp tỉnh/thành phố tương ứng với lớp chuyên đăng ký.",
      "Xếp loại hạnh kiểm Tốt, học lực Giỏi trong cả 4 năm cấp THCS.",
      "Điểm trung bình môn chuyên đăng ký năm lớp 9 đạt từ 8.5 trở lên."
    ],
    eligibleClasses: ["Toán", "Tin học", "Vật lý", "Hóa học", "Sinh học", "Ngữ văn", "Tiếng Anh"],
    submissionDeadline: "25/05/2026"
  },
  {
    category: "Chứng chỉ Tiếng Anh Quốc tế (IELTS / TOEFL iBT / Cambridge)",
    conditions: [
      "IELTS từ 6.5 trở lên hoặc TOEFL iBT từ 79 trở lên (còn hạn sử dụng đến ngày xét tuyển).",
      "Xếp loại học lực Giỏi và hạnh kiểm Tốt năm lớp 9.",
      "Tuyển thẳng vào lớp Chuyên Tiếng Anh hoặc ưu tiên cộng điểm thi chuyên."
    ],
    eligibleClasses: ["Chuyên Tiếng Anh", "Lớp Chất lượng cao"],
    submissionDeadline: "25/05/2026"
  },
  {
    category: "Giải Cuộc thi Khoa học Kỹ thuật (KHKT) cấp Quốc gia",
    conditions: [
      "Học sinh đạt giải Nhất, Nhì, Ba cuộc thi KHKT cấp quốc gia dành cho học sinh trung học do Bộ GD&ĐT tổ chức.",
      "Dự án đạt giải có lĩnh vực phù hợp với môn chuyên đăng ký.",
      "Hạnh kiểm Tốt, học lực Giỏi cả 4 năm THCS."
    ],
    eligibleClasses: ["Tin học", "Vật lý", "Hóa học", "Sinh học"],
    submissionDeadline: "25/05/2026"
  }
];

export const sampleCandidatesData: THPTChuyenCandidate[] = [
  {
    id: "cand-01",
    registrationNumber: "CV26-0012",
    fullName: "Nguyễn Hoàng Nam",
    dob: "12/03/2011",
    gender: "Nam",
    previousSchool: "THCS Đặng Thai Mai, TP. Vinh",
    province: "Nghệ An",
    targetClass: "Chuyên Toán học",
    mathGeneralScore: 9.00,
    englishGeneralScore: 8.50,
    literatureGeneralScore: 8.00,
    specializedScore: 9.00, // 9.00 * 1.5 = 13.5
    priorityScore: 0.0,
    totalScore: 39.00, // 9.0 * 1.5 (13.5) + (9.0 + 8.5 + 8.0 = 25.5) = 39.00
    resultStatus: "Trúng tuyển chính thức",
    notes: "Đạt giải Nhì HSG Toán cấp Tỉnh lớp 9"
  },
  {
    id: "cand-02",
    registrationNumber: "CV26-0089",
    fullName: "Trần Mai Phương",
    dob: "25/08/2011",
    gender: "Nữ",
    previousSchool: "THCS Lê Lợi, TP. Vinh",
    province: "Nghệ An",
    targetClass: "Chuyên Tiếng Anh",
    mathGeneralScore: 8.50,
    englishGeneralScore: 9.50,
    literatureGeneralScore: 8.50,
    specializedScore: 9.25, // 9.25 * 1.5 = 13.875
    priorityScore: 0.0,
    totalScore: 40.38, // 13.875 + 26.5 = 40.375 ~ 40.38
    resultStatus: "Trúng tuyển chính thức",
    notes: "IELTS 7.5 đạt năm 2025"
  },
  {
    id: "cand-03",
    registrationNumber: "CV26-0145",
    fullName: "Phan Đình Khải",
    dob: "05/11/2011",
    gender: "Nam",
    previousSchool: "THCS Lý Tự Trọng, Thạch Hà",
    province: "Hà Tĩnh",
    targetClass: "Chuyên Vật lý",
    mathGeneralScore: 8.50,
    englishGeneralScore: 8.00,
    literatureGeneralScore: 7.50,
    specializedScore: 8.50, // 8.5 * 1.5 = 12.75
    priorityScore: 0.5,
    totalScore: 37.25, // 12.75 + 24.0 + 0.5 = 37.25
    resultStatus: "Trúng tuyển chính thức"
  },
  {
    id: "cand-04",
    registrationNumber: "CV26-0210",
    fullName: "Lê Ngọc Anh Thư",
    dob: "19/02/2011",
    gender: "Nữ",
    previousSchool: "THCS Trung Đô, TP. Vinh",
    province: "Nghệ An",
    targetClass: "Chuyên Ngữ văn",
    mathGeneralScore: 7.50,
    englishGeneralScore: 8.50,
    literatureGeneralScore: 8.50,
    specializedScore: 8.50, // 8.5 * 1.5 = 12.75
    priorityScore: 0.0,
    totalScore: 37.25, // 12.75 + 24.5 = 37.25
    resultStatus: "Trúng tuyển chính thức"
  },
  {
    id: "cand-05",
    registrationNumber: "CV26-0304",
    fullName: "Võ Quang Huy",
    dob: "30/09/2011",
    gender: "Nam",
    previousSchool: "THCS Diễn Châu",
    province: "Nghệ An",
    targetClass: "Chuyên Tin học",
    mathGeneralScore: 8.00,
    englishGeneralScore: 8.00,
    literatureGeneralScore: 7.00,
    specializedScore: 8.50, // 8.5 * 1.5 = 12.75
    priorityScore: 0.0,
    totalScore: 35.75, // 12.75 + 23.0 = 35.75
    resultStatus: "Trúng tuyển chính thức",
    notes: "Đạt giải Nhất Tin học trẻ tỉnh Nghệ An 2025"
  },
  {
    id: "cand-06",
    registrationNumber: "CV26-0412",
    fullName: "Đậu Thị Hà My",
    dob: "14/06/2011",
    gender: "Nữ",
    previousSchool: "THCS Hà Huy Tập, TP. Vinh",
    province: "Nghệ An",
    targetClass: "Chuyên Hóa học",
    mathGeneralScore: 7.50,
    englishGeneralScore: 7.50,
    literatureGeneralScore: 7.50,
    specializedScore: 7.00, // 7.0 * 1.5 = 10.5
    priorityScore: 0.0,
    totalScore: 33.00, // 10.5 + 22.5 = 33.00
    resultStatus: "Dự khuyết",
    notes: "Dự khuyết thứ tự số 02 lớp Chuyên Hóa học"
  },
  {
    id: "cand-07",
    registrationNumber: "CV26-TT01",
    fullName: "Bùi Quốc Đạt",
    dob: "08/04/2011",
    gender: "Nam",
    previousSchool: "THCS Cao Xuân Huy, Diễn Châu",
    province: "Nghệ An",
    targetClass: "Chuyên Toán học",
    mathGeneralScore: 0,
    englishGeneralScore: 0,
    literatureGeneralScore: 0,
    specializedScore: 0,
    priorityScore: 0,
    totalScore: 0,
    resultStatus: "Tuyển thẳng",
    notes: "Huy chương Vàng Olympic Toán Quốc tế Tuổi thơ (IMC)"
  }
];
