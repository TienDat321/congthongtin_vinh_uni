import { 
  AdmissionState, 
  DocumentItem, 
  ChangeSet, 
  HistoryVersion 
} from '../types/admission';

// State khởi tạo: Đại học chính quy 2026 với 4 phương thức
export const initialAdmissionState2026: AdmissionState = {
  channel: "Đại học chính quy",
  cycle: 2026,
  lastUpdated: "2026-01-06",
  lastUpdatedByDoc: "Thông báo 06/TB-ĐHV",
  methods: [
    { 
      code: "100", 
      name: "Xét tuyển theo kết quả thi tốt nghiệp THPT", 
      shortDesc: "Sử dụng kết quả tổ hợp 3 môn thi tốt nghiệp THPT năm 2026",
      status: "active",
      evidence: "Trang 4, Mục 2.1 — Thông báo 06/TB-ĐHV",
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06",
      lineageDetail: "Xác lập ban đầu trong Đề án tuyển sinh gốc số 06/TB-ĐHV ban hành ngày 06/01/2026."
    },
    { 
      code: "200", 
      name: "Xét tuyển theo kết quả học tập cấp THPT (Học bạ)", 
      shortDesc: "Dựa trên điểm trung bình tổng kết lớp 12 hoặc cả 3 năm THPT",
      status: "active",
      evidence: "Trang 5, Mục 2.2 — Thông báo 06/TB-ĐHV",
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06",
      lineageDetail: "Quy định phương thức xét học bạ kết hợp kiểm tra ngưỡng bảo đảm chất lượng."
    },
    { 
      code: "301", 
      name: "Xét tuyển thẳng và ưu tiên xét tuyển", 
      shortDesc: "Thực hiện theo Quy chế tuyển sinh hiện hành của Bộ GD&ĐT (Học sinh giỏi Quốc gia, Quốc tế...)",
      status: "active",
      evidence: "Trang 6, Mục 2.3 — Thông báo 06/TB-ĐHV",
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06",
      lineageDetail: "Áp dụng theo Điều 8 Quy chế tuyển sinh trình độ đại học của Bộ GD&ĐT."
    },
    { 
      code: "405", 
      name: "Xét tuyển kết quả thi đánh giá năng lực & tư duy", 
      shortDesc: "Sử dụng điểm thi ĐGNL của ĐHQG Hà Nội hoặc ĐHQG TP. Hồ Chí Minh năm 2026",
      status: "active",
      evidence: "Trang 7, Mục 2.4 — Thông báo 06/TB-ĐHV",
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06",
      lineageDetail: "Chấp thuận sử dụng điểm kỳ thi HSA (ĐHQG Hà Nội) và APT (ĐHQG TP.HCM)."
    }
  ],
  deadlines: [
    { 
      round: 1, 
      name: "Xét tuyển đợt 1 (Chính quy)", 
      startDate: "2026-06-01", 
      endDate: "2026-07-20", 
      status: "open",
      note: "Áp dụng cho tất cả 4 phương thức xét tuyển",
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06",
      lineageDetail: "Lịch đăng ký ban đầu ấn định kết thúc vào 17h00 ngày 20/07/2026."
    },
    { 
      round: 2, 
      name: "Xét tuyển bổ sung đợt 2", 
      startDate: "2026-08-18", 
      endDate: "2026-09-04", 
      status: "upcoming",
      note: "Áp dụng đối với các ngành chưa đủ chỉ tiêu đợt 1",
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06",
      lineageDetail: "Kế hoạch khung tuyển sinh bổ sung theo hướng dẫn của Hội đồng tuyển sinh Trường."
    }
  ],
  quotas: [
    {
      majorCode: "7480201",
      majorName: "Công nghệ thông tin",
      faculty: "Viện Kỹ thuật và Công nghệ",
      totalQuota: 380,
      methodQuotas: { "100": 200, "200": 100, "301": 30, "405": 50 },
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06"
    },
    {
      majorCode: "7140209",
      majorName: "Sư phạm Toán học",
      faculty: "Trường Sư phạm",
      totalQuota: 150,
      methodQuotas: { "100": 80, "200": 40, "301": 20, "405": 10 },
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06"
    },
    {
      majorCode: "7220201",
      majorName: "Ngôn ngữ Anh",
      faculty: "Trường Ngoại ngữ",
      totalQuota: 240,
      methodQuotas: { "100": 120, "200": 70, "301": 20, "405": 30 },
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06"
    },
    {
      majorCode: "7340101",
      majorName: "Quản trị kinh doanh",
      faculty: "Trường Kinh tế",
      totalQuota: 320,
      methodQuotas: { "100": 160, "200": 100, "301": 20, "405": 40 },
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06"
    },
    {
      majorCode: "7380107",
      majorName: "Luật kinh tế",
      faculty: "Trường Khoa học Xã hội & Nhân văn",
      totalQuota: 180,
      methodQuotas: { "100": 90, "200": 60, "301": 15, "405": 15 },
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06"
    },
    {
      majorCode: "7520201",
      majorName: "Kỹ thuật điện",
      faculty: "Viện Kỹ thuật và Công nghệ",
      totalQuota: 160,
      methodQuotas: { "100": 90, "200": 45, "301": 10, "405": 15 },
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06"
    }
  ],
  conditions: [
    {
      id: "cond-01",
      title: "Ngưỡng bảo đảm chất lượng đầu vào (Điểm sàn)",
      detail: "Thí sinh có tổng điểm 3 môn thi tốt nghiệp THPT theo tổ hợp từ 16.0 điểm trở lên. Nhóm ngành đào tạo giáo viên theo quy định điểm sàn riêng của Bộ GD&ĐT.",
      applicableMethods: ["100", "200", "405"],
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06"
    },
    {
      id: "cond-02",
      title: "Điều kiện xét tuyển học bạ THPT (Phương thức 200)",
      detail: "Điểm trung bình cộng 3 môn trong tổ hợp xét tuyển cả năm lớp 12 đạt từ 6.5 trở lên (đối với các ngành ngoài Sư phạm); từ 8.0 trở lên và học lực Giỏi (đối với nhóm ngành Sư phạm).",
      applicableMethods: ["200"],
      lineageDocId: "doc-001",
      lineageDocName: "Thông báo 06/TB-ĐHV",
      lineageDate: "2026-01-06"
    }
  ]
};

// Danh sách văn bản ban đầu
export const initialDocuments: DocumentItem[] = [
  {
    id: "doc-001",
    name: "Thông báo 06/TB-ĐHV",
    officialNumber: "06/TB-ĐHV",
    fileName: "Thong_bao_06_TB-DHV.pdf",
    type: "ADMISSION_PLAN",
    channel: "Đại học chính quy",
    cycle: 2026,
    issueDate: "2026-01-06",
    status: "APPLIED",
    pageCount: 16,
    fileSize: "2.4 MB",
    summary: "Đề án tuyển sinh gốc Đại học chính quy năm 2026 của Trường Đại học Vinh, quy định 4 phương thức xét tuyển và 55 ngành đào tạo.",
    signer: "GS.TS. Nguyễn Huy Bằng - Hiệu trưởng"
  },
  {
    id: "doc-007",
    name: "Thông báo 07/TB-ĐHV (VLVH 2026)",
    officialNumber: "07/TB-ĐHV",
    fileName: "Thong_bao_07_TB-DHV_VLVH.pdf",
    type: "ADMISSION_PLAN",
    channel: "Vừa làm vừa học",
    cycle: 2026,
    issueDate: "2026-01-16",
    status: "APPLIED",
    pageCount: 8,
    fileSize: "1.8 MB",
    summary: "Thông báo tuyển sinh Đại học hình thức Vừa làm vừa học năm 2026: 16 ngành đào tạo (8 ngành SP nâng chuẩn, 8 ngành khác), 2.400 chỉ tiêu, lệ phí xét tuyển 500.000đ, học T7-CN & tập trung hè.",
    signer: "GS.TS. Nguyễn Huy Bằng - Hiệu trưởng"
  },
  {
    id: "doc-002-thsp",
    name: "Thông báo 02/TB-THSP (Thay thế)",
    officialNumber: "02/TB-THSP",
    fileName: "Thong_bao_02_TB-THSP_ThayThe.pdf",
    type: "ADMISSION_ADJUSTMENT",
    channel: "Thực hành Sư phạm",
    cycle: 2026,
    issueDate: "2026-05-10",
    status: "APPLIED",
    pageCount: 5,
    fileSize: "1.2 MB",
    summary: "Điều chỉnh chỉ tiêu Lớp 6 tăng từ 180 lên 210 học sinh, gia hạn nộp hồ sơ đến 10/06/2026, thay thế Thông báo số 52/TB-THSP.",
    signer: "Hiệu trưởng Trường THSP"
  },
  {
    id: "doc-intl-2026",
    name: "Thông báo Tuyển sinh Lưu học sinh Quốc tế năm 2026",
    officialNumber: "TB-ĐHV/HTQT-2026",
    fileName: "Thong_bao_Tuyen_sinh_Sinh_vien_Quoc_te_2026.pdf",
    type: "ADMISSION_PLAN",
    channel: "Sinh viên quốc tế",
    cycle: 2026,
    issueDate: "2026-03-01",
    status: "APPLIED",
    pageCount: 12,
    fileSize: "3.1 MB",
    summary: "Thông báo tuyển sinh Lưu học sinh Lào và quốc tế năm 2026: 54 ngành Đại học, 36 ngành Thạc sĩ, 16 ngành Tiến sĩ, khóa dự bị Tiếng Việt 1 năm. KTX 10 USD/tháng, học bổng Hiệp định & địa phương.",
    signer: "GS.TS. Nguyễn Huy Bằng - Hiệu trưởng"
  },
  {
    id: "doc-sdh-136",
    name: "Thông báo 136/TB-ĐHV (Thu hồ sơ Tiến sĩ Đợt 2)",
    officialNumber: "136/TB-ĐHV",
    fileName: "Thong_bao_136_TB-DHV_TienSi_Dot2.pdf",
    type: "ROUND_NOTICE",
    channel: "Sau đại học",
    cycle: 2026,
    issueDate: "2026-08-20",
    status: "APPLIED",
    pageCount: 4,
    fileSize: "1.4 MB",
    summary: "Thông báo tiếp tục thu hồ sơ tuyển sinh đào tạo trình độ tiến sĩ năm 2026 cho 11 ngành còn chỉ tiêu sau Đợt 1 (Chính trị học, Hóa hữu cơ, Quản lý kinh tế, Xây dựng,...). Hạn nhận hồ sơ đến 15/11/2026.",
    signer: "PGS.TS. Trần Bá Tiến - Phó Hiệu trưởng"
  },
  {
    id: "doc-sdh-039",
    name: "Thông báo 39/TB-ĐHV (Tuyển sinh Thạc sĩ 2026)",
    officialNumber: "39/TB-ĐHV",
    fileName: "Thong_bao_39_TB-DHV_ThacSi_2026.pdf",
    type: "ADMISSION_PLAN",
    channel: "Sau đại học",
    cycle: 2026,
    issueDate: "2026-03-06",
    status: "APPLIED",
    pageCount: 10,
    fileSize: "2.8 MB",
    summary: "Thông báo tuyển sinh đào tạo trình độ thạc sĩ năm 2026 với 30 ngành/lĩnh vực, thời gian đào tạo 1.5 - 2 năm chính quy, lệ phí xét tuyển 420.000đ, học phí 748.000đ - 940.000đ/tín chỉ.",
    signer: "GS.TS. Nguyễn Huy Bằng - Hiệu trưởng"
  },
  {
    id: "doc-sdh-2246",
    name: "Quyết định 2246/QĐ-ĐHV (Điểm chuẩn Thạc sĩ Đợt 1)",
    officialNumber: "2246/QĐ-ĐHV",
    fileName: "Quyet_dinh_2246_QD-DHV_DiemChuan_ThacSi_D1.pdf",
    type: "ROUND_NOTICE",
    channel: "Sau đại học",
    cycle: 2026,
    issueDate: "2026-07-22",
    status: "APPLIED",
    pageCount: 3,
    fileSize: "0.9 MB",
    summary: "Công bố điểm chuẩn trúng tuyển đào tạo trình độ thạc sĩ đợt 1 năm 2026 cho 27 ngành/lĩnh vực (PPDH Tiếng Anh: 7.90; Quản trị kinh doanh: 5.00; Chính trị học: 7.77; GD Tiểu học: 7.88,...).",
    signer: "GS.TS. Nguyễn Huy Bằng - Hiệu trưởng"
  }
];

// Lịch sử phiên bản ban đầu
export const initialHistory: HistoryVersion[] = [
  {
    versionNumber: 1,
    versionName: "Phiên bản gốc 2026 (06/01/2026)",
    timestamp: "2026-01-06 09:30",
    sourceDocId: "doc-001",
    sourceDocName: "Thông báo 06/TB-ĐHV",
    changeSummary: "Khởi tạo kho tri thức ĐHCQ 2026: Xác lập 4 phương thức (100, 200, 301, 405), lịch đợt 1 và phân bổ chỉ tiêu ban đầu.",
    actor: "Hệ thống / Ban Tuyển sinh",
    stateSnapshot: initialAdmissionState2026,
    appliedChangesCount: 12
  }
];

// CÁC FILE MẪU CÓ SẴN ĐỂ DEMO
export interface SampleFileConfig {
  id: string;
  fileName: string;
  name: string;
  officialNumber: string;
  type: 'ADMISSION_ADJUSTMENT' | 'ADMISSION_PLAN' | 'ROUND_NOTICE';
  cycle: number;
  issueDate: string;
  description: string;
  badgeText: string;
  scenarioHighlight: string;
  changeSet: ChangeSet;
}

export const sampleFilesConfig: Record<string, SampleFileConfig> = {
  // MẪU 1: Điều chỉnh lịch tuyển sinh 2026 (Thực tế của VinhUni)
  "Thong_bao_98_TB-DHV.pdf": {
    id: "doc-002",
    fileName: "Thong_bao_98_TB-DHV.pdf",
    name: "Thông báo 98/TB-ĐHV (Điều chỉnh thông tin)",
    officialNumber: "98/TB-ĐHV",
    type: "ADMISSION_ADJUSTMENT",
    cycle: 2026,
    issueDate: "2026-06-26",
    description: "Điều chỉnh gia hạn thời gian đăng ký xét tuyển đợt 1 thêm 5 ngày (đến hết 25/07/2026). Các phương thức và chỉ tiêu giữ nguyên.",
    badgeText: "Điều chỉnh 2026",
    scenarioHighlight: "Minh họa nguyên tắc: 'Không nhắc đến ≠ Bị xóa'. Deadline cập nhật, 4 phương thức giữ nguyên.",
    changeSet: {
      id: "cs-002",
      documentId: "doc-002",
      documentName: "Thong_bao_98_TB-DHV.pdf",
      assertionMode: "INCREMENTAL_PATCH",
      detectedKnowledge: {
        documentType: "ADMISSION_ADJUSTMENT",
        channel: "Đại học chính quy",
        cycle: 2026,
        issueDate: "2026-06-26",
        effectiveDate: "2026-06-26",
        scope: "Đợt 1 toàn trường",
        relationships: [
          {
            type: "AMENDS",
            targetDocId: "doc-001",
            targetDocName: "Thông báo 06/TB-ĐHV",
            detail: "Sửa đổi Khoản 3 Điều 4 về Lịch trình nộp hồ sơ xét tuyển Đợt 1 năm 2026."
          }
        ],
        summary: "Văn bản gia hạn thời hạn nhận hồ sơ đăng ký xét tuyển đợt 1 từ ngày 20/07/2026 sang ngày 25/07/2026 nhằm tạo điều kiện cho thí sinh vùng khó khăn nộp hồ sơ trực tuyến."
      },
      changes: [
        {
          id: "c-98-01",
          type: "UPDATED",
          entity: "deadline",
          title: "Hạn chót nộp hồ sơ xét tuyển Đợt 1",
          description: "Gia hạn thời gian kết thúc nhận đăng ký từ 20/07/2026 sang 25/07/2026",
          oldValue: "2026-07-20 (17h00)",
          newValue: "2026-07-25 (17h00)",
          evidence: {
            page: 2,
            section: "Mục 3: Điều chỉnh thời gian đăng ký",
            quote: "Hội đồng Tuyển sinh Trường Đại học Vinh thông báo gia hạn thời gian đăng ký trực tuyến xét tuyển đại học chính quy Đợt 1 năm 2026 đến hết 17h00 ngày 25 tháng 07 năm 2026.",
            pdfSnippetContext: "Trường Đại học Vinh | Số: 98/TB-ĐHV | Nghệ An, ngày 26 tháng 6 năm 2026\nTHÔNG BÁO VỀ VIỆC ĐIỀU CHỈNH THỜI GIAN ĐĂNG KÝ XÉT TUYỂN ĐỢT 1 NĂM 2026\n...\n3. Điều chỉnh thời gian đăng ký xét tuyển:\nCăn cứ diễn biến kỳ thi tốt nghiệp THPT, Trường gia hạn tiếp nhận hồ sơ xét tuyển Đợt 1 đến hết 17h00 ngày 25/07/2026 thay vì ngày 20/07/2026 như thông báo số 06/TB-ĐHV.",
            documentName: "Thông báo 98/TB-ĐHV",
            documentId: "doc-002"
          },
          status: "accepted"
        },
        {
          id: "c-98-02",
          type: "UNCHANGED",
          entity: "method",
          title: "Các phương thức xét tuyển (100, 200, 301, 405)",
          description: "Văn bản số 98 không đề cập đến việc thay đổi phương thức. Giữ nguyên 4 phương thức hiện hành.",
          oldValue: "4 phương thức đang kích hoạt",
          newValue: "Giữ nguyên 4 phương thức",
          evidence: {
            page: 3,
            section: "Mục 4: Hiệu lực thi hành",
            quote: "Các nội dung khác không đề cập trong văn bản này tiếp tục thực hiện theo Thông báo số 06/TB-ĐHV ngày 06/01/2026 của Hiệu trưởng Trường Đại học Vinh.",
            documentName: "Thông báo 98/TB-ĐHV",
            documentId: "doc-002"
          },
          status: "accepted"
        },
        {
          id: "c-98-03",
          type: "UNCHANGED",
          entity: "quota",
          title: "Chỉ tiêu tuyển sinh và điều kiện xét tuyển các ngành",
          description: "Toàn bộ chỉ tiêu 55 ngành và điều kiện điểm sàn giữ nguyên theo Đề án số 06/TB-ĐHV.",
          oldValue: "Giữ nguyên chỉ tiêu gốc",
          newValue: "Không thay đổi",
          evidence: {
            page: 3,
            section: "Mục 4: Hiệu lực thi hành",
            quote: "Chỉ tiêu và tổ hợp môn xét tuyển giữ nguyên theo danh mục ban hành kèm Thông báo số 06/TB-ĐHV.",
            documentName: "Thông báo 98/TB-ĐHV",
            documentId: "doc-002"
          },
          status: "accepted"
        }
      ],
      status: "PENDING",
      createdAt: "2026-06-26 14:15"
    }
  },

  // MẪU 2: KỊCH BẢN CHÍNH "4 PHƯƠNG THỨC → 2 PHƯƠNG THỨC"
  "Ke_hoach_2027.pdf": {
    id: "doc-004",
    fileName: "Ke_hoach_2027.pdf",
    name: "Kế hoạch Tuyển sinh 2027 (Kế hoạch 2027/KH-ĐHV)",
    officialNumber: "2027/KH-ĐHV",
    type: "ADMISSION_PLAN",
    cycle: 2027,
    issueDate: "2026-11-15",
    description: "Đề án định hướng năm 2027: Dừng xét học bạ (200) và ĐGNL (405). Chỉ giữ lại 2 phương thức: Điểm thi THPT (100) và Tuyển thẳng (301).",
    badgeText: "Kịch bản Trọng tâm: 4 → 2 Phương thức",
    scenarioHighlight: "Demonstrates dynamic UI generation: Public portal automatically collapses from 4 cards to 2 cards with zero frontend code modification!",
    changeSet: {
      id: "cs-004",
      documentId: "doc-004",
      documentName: "Ke_hoach_2027.pdf",
      assertionMode: "SNAPSHOT_COMPLETE",
      detectedKnowledge: {
        documentType: "ADMISSION_PLAN",
        channel: "Đại học chính quy",
        cycle: 2027,
        issueDate: "2026-11-15",
        effectiveDate: "2027-01-01",
        scope: "Toàn trường - Chu kỳ tuyển sinh 2027",
        relationships: [
          {
            type: "SUPERSEDES",
            targetDocId: "doc-001",
            targetDocName: "Thông báo 06/TB-ĐHV (Chu kỳ 2026)",
            detail: "Xác lập chu kỳ tuyển sinh kế tiếp 2027 với cấu trúc phương thức tinh gọn mới."
          }
        ],
        summary: "Kế hoạch tuyển sinh ĐHCQ năm 2027 nhằm nâng cao chất lượng chuẩn đầu vào. Nhà trường quyết định ngừng áp dụng phương thức xét tuyển theo học bạ (mã 200) và tạm dừng điểm thi ĐGNL (mã 405), chỉ tập trung vào phương thức 100 và 301."
      },
      changes: [
        {
          id: "c-27-01",
          type: "UNCHANGED",
          entity: "method",
          code: "100",
          title: "Phương thức 100: Xét tuyển điểm thi THPT",
          description: "Tiếp tục áp dụng cho tất cả các ngành năm 2027",
          oldValue: "Đang áp dụng (Chu kỳ 2026)",
          newValue: "Tiếp tục áp dụng (Chu kỳ 2027)",
          evidence: {
            page: 2,
            section: "Trang 2, Mục 1: Các phương thức xét tuyển 2027",
            quote: "Phương thức 1: Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2027 (mã phương thức 100) đối với tất cả các ngành đào tạo.",
            pdfSnippetContext: "TRƯỜNG ĐẠI HỌC VINH | KẾ HOẠCH TUYỂN SINH 2027\nMục 1. Phương thức xét tuyển năm 2027:\nNhà trường chủ trương tinh gọn phương thức, tăng cường tính cạnh tranh và chất lượng đầu vào:\n- Phương thức 1 (Mã 100): Xét tuyển dựa trên kết quả thi tốt nghiệp THPT năm 2027.\n- Phương thức 2 (Mã 301): Xét tuyển thẳng và ưu tiên xét tuyển theo Quy chế của Bộ GD&ĐT.\n- Nhà trường dừng xét tuyển theo học bạ (mã 200) và tạm dừng phương thức đánh giá năng lực (mã 405).",
            documentName: "Ke_hoach_2027.pdf",
            documentId: "doc-004"
          },
          status: "accepted"
        },
        {
          id: "c-27-02",
          type: "UNCHANGED",
          entity: "method",
          code: "301",
          title: "Phương thức 301: Xét tuyển thẳng & Ưu tiên xét tuyển",
          description: "Thực hiện theo Quy chế Bộ GD&ĐT",
          oldValue: "Đang áp dụng (Chu kỳ 2026)",
          newValue: "Tiếp tục áp dụng (Chu kỳ 2027)",
          evidence: {
            page: 2,
            section: "Trang 2, Mục 1: Các phương thức xét tuyển 2027",
            quote: "Phương thức 2: Xét tuyển thẳng và ưu tiên xét tuyển theo Quy chế của Bộ GD&ĐT (mã phương thức 301).",
            pdfSnippetContext: "- Phương thức 2 (Mã 301): Xét tuyển thẳng và ưu tiên xét tuyển theo Quy chế của Bộ GD&ĐT dành cho học sinh đạt giải quốc gia, quốc tế.",
            documentName: "Ke_hoach_2027.pdf",
            documentId: "doc-004"
          },
          status: "accepted"
        },
        {
          id: "c-27-03",
          type: "REMOVED",
          entity: "method",
          code: "200",
          title: "Phương thức 200: Xét học bạ THPT",
          description: "Ngừng áp dụng kể từ mùa tuyển sinh 2027 để nâng cao chất lượng đầu vào",
          oldValue: "Đang kích hoạt (40% chỉ tiêu 2026)",
          newValue: "NGỪNG ÁP DỤNG (Removed)",
          evidence: {
            page: 2,
            section: "Trang 2, Mục 1 — Bỏ phương thức xét học bạ",
            quote: "Từ năm tuyển sinh 2027, Trường Đại học Vinh dừng áp dụng phương thức xét tuyển theo kết quả học tập cấp THPT (học bạ - mã 200) trên phạm vi toàn trường.",
            pdfSnippetContext: "Lưu ý quan trọng: Nhằm chuẩn hóa chất lượng đào tạo và hội nhập quốc tế, từ năm 2027 Nhà trường dừng hẳn phương thức xét tuyển theo học bạ (mã 200) cho toàn bộ 55 ngành đại học chính quy.",
            documentName: "Ke_hoach_2027.pdf",
            documentId: "doc-004"
          },
          status: "accepted"
        },
        {
          id: "c-27-04",
          type: "REMOVED",
          entity: "method",
          code: "405",
          title: "Phương thức 405: Xét kết quả thi ĐGNL & ĐGTD",
          description: "Tạm dừng áp dụng trong chu kỳ 2027, dồn chỉ tiêu cho phương thức 100",
          oldValue: "Đang kích hoạt (10% chỉ tiêu 2026)",
          newValue: "NGỪNG ÁP DỤNG (Removed)",
          evidence: {
            page: 2,
            section: "Trang 2, Mục 1 — Tạm dừng thi ĐGNL",
            quote: "Tạm dừng sử dụng kết quả kỳ thi Đánh giá năng lực của các đại học quốc gia (mã 405) trong năm 2027, chuyển toàn bộ tỷ lệ chỉ tiêu tương ứng sang phương thức thi tốt nghiệp THPT (mã 100).",
            pdfSnippetContext: "Nhà trường đồng thời tạm dừng phương thức 405 (ĐGNL) để khảo sát và xây dựng bộ đề đánh giá tư duy chuyên biệt vào năm tiếp theo.",
            documentName: "Ke_hoach_2027.pdf",
            documentId: "doc-004"
          },
          status: "accepted"
        },
        {
          id: "c-27-05",
          type: "UPDATED",
          entity: "deadline",
          title: "Lịch tuyển sinh Đợt 1 năm 2027",
          description: "Khởi động nhận hồ sơ từ 15/06/2027 đến 28/07/2027",
          oldValue: "Đợt 1 năm 2026: 01/06/2026 - 25/07/2026",
          newValue: "Đợt 1 năm 2027: 15/06/2027 - 28/07/2027",
          evidence: {
            page: 4,
            section: "Trang 4, Mục 3: Khung thời gian tuyển sinh 2027",
            quote: "Thời gian đăng ký xét tuyển Đợt 1 năm 2027: Từ ngày 15/06/2027 đến 17h00 ngày 28/07/2027 qua cổng tuyển sinh chung của Bộ GD&ĐT.",
            pdfSnippetContext: "Kế hoạch thời gian tuyển sinh 2027:\n- Đợt 1: Bắt đầu từ 15/06/2027, kết thúc 28/07/2027.\n- Công bố kết quả trúng tuyển: Trước 17h00 ngày 15/08/2027.",
            documentName: "Ke_hoach_2027.pdf",
            documentId: "doc-004"
          },
          status: "accepted"
        }
      ],
      status: "PENDING",
      createdAt: "2026-11-15 08:30"
    }
  },

  // MẪU 3: Thông báo tuyển sinh đợt 2 năm 2026
  "Dot2nam2026.pdf": {
    id: "doc-003",
    fileName: "Dot2nam2026.pdf",
    name: "Thông báo Đăng ký xét tuyển đợt 2 năm 2026",
    officialNumber: "142/TB-ĐHV",
    type: "ROUND_NOTICE",
    cycle: 2026,
    issueDate: "2026-08-18",
    description: "Xét tuyển bổ sung đợt 2 cho các ngành còn chỉ tiêu: Chỉ áp dụng 2 phương thức (100 và 200). Đợt 2 không sử dụng phương thức 405.",
    badgeText: "Thông báo Đợt 2",
    scenarioHighlight: "Minh họa phạm vi theo đợt: Đợt 2 giới hạn phương thức mà không làm mất phương thức của toàn bộ đề án chung.",
    changeSet: {
      id: "cs-003",
      documentId: "doc-003",
      documentName: "Dot2nam2026.pdf",
      assertionMode: "INCREMENTAL_PATCH",
      detectedKnowledge: {
        documentType: "ROUND_NOTICE",
        channel: "Đại học chính quy",
        cycle: 2026,
        issueDate: "2026-08-18",
        effectiveDate: "2026-08-18",
        scope: "Xét tuyển bổ sung Đợt 2",
        relationships: [
          {
            type: "IMPLEMENTS",
            targetDocId: "doc-001",
            targetDocName: "Thông báo 06/TB-ĐHV",
            detail: "Triển khai xét tuyển bổ sung theo khung kế hoạch đã phê duyệt trong Đề án gốc."
          }
        ],
        summary: "Thông báo nhận hồ sơ xét tuyển đại học chính quy đợt 2 năm 2026 đối với các ngành đào tạo còn thiếu chỉ tiêu, chỉ xét bằng điểm thi THPT (mã 100) và học bạ (mã 200)."
      },
      changes: [
        {
          id: "c-d2-01",
          type: "UPDATED",
          entity: "deadline",
          title: "Chính thức mở đăng ký xét tuyển Đợt 2",
          description: "Bắt đầu tiếp nhận hồ sơ bổ sung từ 18/08/2026 đến hết 04/09/2026",
          oldValue: "Dự kiến: 18/08/2026 - 04/09/2026",
          newValue: "Chính thức kích hoạt: 18/08/2026 - 04/09/2026",
          evidence: {
            page: 1,
            section: "Mục 2: Thời hạn nộp hồ sơ đợt 2",
            quote: "Thời gian nhận hồ sơ đăng ký xét tuyển bổ sung đợt 2 từ ngày 18 tháng 8 năm 2026 đến 17 giờ 00 ngày 04 tháng 9 năm 2026.",
            pdfSnippetContext: "THÔNG BÁO XÉT TUYỂN BỔ SUNG ĐỢT 2 NĂM 2026\n2. Thời hạn nộp hồ sơ: từ 18/08/2026 đến 17h00 ngày 04/09/2026.",
            documentName: "Dot2nam2026.pdf",
            documentId: "doc-003"
          },
          status: "accepted"
        },
        {
          id: "c-d2-02",
          type: "UNCHANGED",
          entity: "method",
          title: "Phương thức áp dụng trong đợt 2",
          description: "Đợt 2 chỉ áp dụng 2 phương thức: 100 và 200. Các phương thức 301, 405 đã kết thúc ở Đợt 1.",
          oldValue: "Đợt 1: 4 phương thức",
          newValue: "Đợt 2: Áp dụng phương thức 100 và 200",
          evidence: {
            page: 1,
            section: "Mục 1: Đối tượng và phương thức xét bổ sung",
            quote: "Thí sinh đăng ký xét tuyển đợt 2 sử dụng kết quả thi tốt nghiệp THPT (mã 100) hoặc kết quả học tập THPT (mã 200).",
            documentName: "Dot2nam2026.pdf",
            documentId: "doc-003"
          },
          status: "accepted"
        }
      ],
      status: "PENDING",
      createdAt: "2026-08-18 10:00"
    }
  }
};

// Danh sách 9 kênh đào tạo của Trường Đại học Vinh
export const vinhUniAdmissionChannels = [
  {
    id: "dh-chinh-quy",
    code: "DHCQ",
    title: "Đại học chính quy",
    cycle: 2026,
    active: true,
    highlight: true,
    desc: "Đào tạo cử nhân, kỹ sư chất lượng cao với 55 ngành học thuộc Sư phạm, Kỹ thuật, Kinh tế, Ngoại ngữ, Luật, Xã hội.",
    tag: "Đang mở đợt tuyển sinh",
    route: "/public/dai-hoc-chinh-quy"
  },
  {
    id: "sau-dai-hoc",
    code: "SDH",
    title: "Sau đại học (ThS, TS)",
    cycle: 2026,
    active: true,
    highlight: true,
    desc: "Đào tạo 30 ngành Thạc sĩ và 12 ngành Tiến sĩ. Đang mở thu hồ sơ Đợt 2 đến 15/11/2026 (TB 136/TB-ĐHV). Đề án 89 & Học bổng Chính phủ.",
    tag: "Đang nhận hồ sơ Đợt 2",
    route: "/public/sau-dai-hoc"
  },
  {
    id: "vua-lam-vua-hoc",
    code: "VLVH",
    title: "Vừa làm vừa học",
    cycle: 2026,
    active: false,
    desc: "Học tập linh hoạt vào buổi tối và cuối tuần, phù hợp cho người đang công tác tại các cơ quan, doanh nghiệp.",
    tag: "Nhận hồ sơ liên tục",
    route: "#"
  },
  {
    id: "dao-tao-tu-xa",
    code: "DTTX",
    title: "Đào tạo từ xa (E-Learning)",
    cycle: 2026,
    active: false,
    desc: "Chương trình trực tuyến 100% trên nền tảng số hiện đại, cấp văn bằng tương đương hệ chính quy.",
    tag: "Khai giảng hàng tháng",
    route: "#"
  },
  {
    id: "lien-thong-vb2",
    code: "LTVB2",
    title: "Liên thông & Văn bằng 2",
    cycle: 2026,
    active: false,
    desc: "Cơ hội nâng chuẩn học vấn và mở rộng cơ hội việc làm với thời gian rút ngắn 1.5 - 2 năm.",
    tag: "Xét tuyển hồ sơ",
    route: "#"
  },
  {
    id: "thpt-chuyen",
    code: "CHUYEN",
    title: "Trường THPT Chuyên ĐH Vinh",
    cycle: 2026,
    active: true,
    highlight: true,
    desc: "Cái nôi đào tạo nhân tài Olympic Bắc Miền Trung (thành lập 1966) với 8 khối chuyên: Toán, Tin, Lý, Hóa, Sinh, Văn, Anh & Lớp Chất lượng cao. 385 chỉ tiêu.",
    tag: "Tuyển sinh Lớp 10 (Thi 14-15/06)",
    route: "/public/thpt-chuyen"
  },
  {
    id: "mam-non-tieu-hoc-th",
    code: "THUCHANH",
    title: "Trường Thực hành Sư phạm",
    cycle: 2026,
    active: false,
    desc: "Hệ thống Mầm non, Tiểu học, THCS thực hành mô hình giáo dục tiên tiến chất lượng cao.",
    tag: "Đã hoàn thành tuyển sinh",
    route: "#"
  },
  {
    id: "hop-tac-quoc-te",
    code: "QUOCTE",
    title: "Lưu học sinh & Sinh viên Quốc tế",
    cycle: 2026,
    active: true,
    desc: "Tiếp nhận lưu học sinh Lào và quốc tế vào 54 ngành ĐH, 36 ngành Thạc sĩ, 16 ngành Tiến sĩ, khóa dự bị Tiếng Việt 1 năm. KTX 10$/tháng.",
    tag: "Đang nhận hồ sơ 2026",
    route: "/public/sinh-vien-quoc-te"
  },
  {
    id: "boi-duong-ngan-han",
    code: "BDNH",
    title: "Bồi dưỡng & Chứng chỉ",
    cycle: 2026,
    active: false,
    desc: "Bồi dưỡng chuẩn chức danh nghề nghiệp giáo viên, chứng chỉ ứng dụng CNTT, ngoại ngữ khung 6 bậc.",
    tag: "Mở lớp thường xuyên",
    route: "#"
  }
];
