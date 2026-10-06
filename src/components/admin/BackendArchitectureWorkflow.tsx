import React, { useState } from 'react';
import { 
  Server, 
  Layers, 
  Database, 
  Code, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  ExternalLink,
  School,
  GraduationCap,
  Briefcase,
  Globe,
  Award,
  BookOpen,
  Compass,
  Zap,
  Eye,
  RefreshCw,
  Terminal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAdmission } from '../../context/AdmissionContext';

export const BackendArchitectureWorkflow: React.FC = () => {
  const { setActivePortal, setActiveChannel } = useAdmission();
  const [selectedSubdomain, setSelectedSubdomain] = useState<string>('thpt-chuyen');
  const [schemaFormat, setSchemaFormat] = useState<'json' | 'typescript'>('json');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const subdomains = [
    {
      id: "dh-chinh-quy",
      code: "DHCQ",
      title: "Đại học chính quy",
      icon: GraduationCap,
      color: "from-sky-700 to-sky-900",
      badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
      endpoint: "/api/v1/admissions/undergraduate",
      schemaVersion: "v2.6.4",
      status: "Synced & Active",
      stateCount: "55 Ngành · 4 Phương thức",
      description: "Hệ thống quản lý tuyển sinh đại học tập trung, đồng bộ cổng Bộ GD&ĐT (thi THPT, học bạ, ĐGNL, tuyển thẳng).",
      features: ["Đồng bộ mã ngành Bộ GD&ĐT", "Tính điểm ưu tiên khu vực tự động", "Phê duyệt ChangeSet tức thời", "Lập hồ sơ trúng tuyển số"]
    },
    {
      id: "thpt-chuyen",
      code: "CHUYEN",
      title: "Trường THPT Chuyên ĐH Vinh",
      icon: Compass,
      color: "from-violet-700 to-indigo-900",
      badgeColor: "bg-violet-100 text-violet-900 border-violet-300",
      endpoint: "/api/v1/admissions/highschool-gifted",
      schemaVersion: "v1.4.2",
      status: "Synced & Active",
      stateCount: "8 Khối chuyên · 385 Chỉ tiêu",
      description: "Phục vụ kỳ thi tuyển sinh lớp 10 THPT Chuyên (Toán, Tin, Lý, Hóa, Sinh, Văn, Anh, CLC). Hỗ trợ xét tuyển thẳng HSG.",
      features: ["Xếp phòng thi & cấp SBD tự động", "Đăng ký dự thi & chọn môn chuyên", "Tra cứu kết quả & phúc khảo trực tuyến", "Thống kê điểm chuẩn các năm"]
    },
    {
      id: "thuc-hanh-su-pham",
      code: "THSP",
      title: "Trường Thực hành Sư phạm",
      icon: School,
      color: "from-indigo-700 to-indigo-900",
      badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-300",
      endpoint: "/api/v1/admissions/pedagogical-practice",
      schemaVersion: "v1.8.0",
      status: "Synced & Active",
      stateCount: "4 Cấp học (MN → THPT)",
      description: "Tuyển sinh liên cấp Mầm non, Tiểu học, THCS và THPT. Tự động hóa đánh giá năng lực đầu vào và phân tuyến hồ sơ.",
      features: ["Biểu mẫu đăng ký liên cấp", "Xếp lớp & bốc thăm mầm non", "Tra cứu kết quả qua mã định danh", "Đóng lệ phí tuyển sinh tích hợp"]
    },
    {
      id: "vua-lam-vua-hoc",
      code: "VLVH",
      title: "Đại học Vừa làm vừa học",
      icon: Briefcase,
      color: "from-emerald-700 to-emerald-900",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      endpoint: "/api/v1/admissions/in-service-work-study",
      schemaVersion: "v1.2.1",
      status: "Synced & Active",
      stateCount: "16 Ngành · 2.400 Chỉ tiêu",
      description: "Thực thi Thông báo 07/TB-ĐHV. Quản lý 8 ngành nâng chuẩn giáo viên và 8 ngành kinh tế/kỹ thuật học thứ 7, CN.",
      features: ["Đăng ký xét tuyển hồ sơ trực tuyến", "Thu lệ phí xét tuyển 500k", "Phân bổ lớp theo địa phương", "Tải mẫu phiếu đăng ký chuẩn"]
    },
    {
      id: "sau-dai-hoc",
      code: "SDH",
      title: "Sau đại học (ThS & TS)",
      icon: Award,
      color: "from-amber-600 to-amber-900",
      badgeColor: "bg-amber-100 text-amber-950 border-amber-400",
      endpoint: "/api/v1/admissions/postgraduate",
      schemaVersion: "v2.1.0",
      status: "Synced & Active",
      stateCount: "30 Thạc sĩ · 12 Tiến sĩ",
      description: "Hệ thống quản lý nghiên cứu sinh và học viên cao học. Thu hồ sơ Đợt 2 theo TB 136/TB-ĐHV, tích hợp Đề án 89.",
      features: ["Đánh giá đề cương nghiên cứu sinh", "Điểm chuẩn theo Quyết định 2246", "Kiểm tra văn bằng ngoại ngữ B2/IELTS", "Bảo lưu kết quả xét tuyển"]
    },
    {
      id: "sinh-vien-quoc-te",
      code: "QUOCTE",
      title: "Lưu học sinh & Quốc tế",
      icon: Globe,
      color: "from-cyan-700 to-blue-900",
      badgeColor: "bg-cyan-100 text-cyan-900 border-cyan-300",
      endpoint: "/api/v1/admissions/international-students",
      schemaVersion: "v1.1.0",
      status: "Synced & Active",
      stateCount: "54 Ngành ĐH · Lớp Dự bị TV",
      description: "Cổng đăng ký đa ngôn ngữ (Việt - Lào - Anh). Tiếp nhận hồ sơ diện Hiệp định và tự túc, quản lý visa và ký túc xá.",
      features: ["Đơn đăng ký song ngữ Anh/Lào/Việt", "Quản lý học bổng Hiệp định", "Đăng ký nội trú KTX 10 USD/tháng", "Phân lớp dự bị tiếng Việt 1 năm"]
    },
    {
      id: "dao-tao-tu-xa",
      code: "DTTX",
      title: "Đào tạo từ xa (E-Learning)",
      icon: Activity,
      color: "from-blue-700 to-slate-900",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
      endpoint: "/api/v1/admissions/e-learning-distance",
      schemaVersion: "v1.0.3",
      status: "Healthy",
      stateCount: "LMS Canvas / Moodle",
      description: "Chương trình cử nhân trực tuyến 100%, tuyển sinh liên tục nhiều đợt trong năm, xét duyệt học bạ và văn bằng 1.",
      features: ["Đồng bộ tài khoản học tập LMS", "Khảo sát đầu vào kỹ năng số", "Khai giảng theo đợt linh hoạt", "Định danh điện tử thí sinh"]
    },
    {
      id: "lien-thong-vb2",
      code: "LTVB2",
      title: "Liên thông & Văn bằng 2",
      icon: Layers,
      color: "from-teal-700 to-slate-900",
      badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
      endpoint: "/api/v1/admissions/articulation-second-degree",
      schemaVersion: "v1.0.1",
      status: "Healthy",
      stateCount: "Chuyển đổi tín chỉ",
      description: "Tuyển sinh đào tạo từ Cao đẳng lên Đại học và người đã có bằng ĐH thứ nhất muốn sở hữu văn bằng thứ hai chính quy.",
      features: ["Quy đổi và miễn trừ học phần", "Xét duyệt hồ sơ công chứng số", "Rút ngắn thời gian đào tạo 1.5 năm", "Theo dõi tiến độ tích lũy"]
    },
    {
      id: "boi-duong-ngan-han",
      code: "BDNH",
      title: "Bồi dưỡng & Chứng chỉ",
      icon: BookOpen,
      color: "from-orange-700 to-slate-900",
      badgeColor: "bg-orange-100 text-orange-950 border-orange-300",
      endpoint: "/api/v1/admissions/certifications-shortcourse",
      schemaVersion: "v1.0.0",
      status: "Healthy",
      stateCount: "Cấp chứng chỉ điện tử",
      description: "Các khóa bồi dưỡng chuẩn chức danh nghề nghiệp giáo viên các hạng, ngoại ngữ B1-B2, ứng dụng CNTT cơ bản & nâng cao.",
      features: ["Đăng ký lớp học theo chuyên đề", "Cấp chứng chỉ số xác thực QR", "Thanh toán học phí trực tuyến", "Tra cứu chứng chỉ số quốc gia"]
    }
  ];

  const currentActiveSubdomain = subdomains.find(s => s.id === selectedSubdomain) || subdomains[1];

  const getSubdomainSchema = (subdomainId: string) => {
    switch (subdomainId) {
      case 'thpt-chuyen':
        return {
          "$schema": "https://admissions.vinhuni.edu.vn/schemas/sdui/v1/highschool-gifted.json",
          "subdomain": "CHUYEN",
          "institution": "Trường THPT Chuyên - Đại học Vinh",
          "cycle": 2026,
          "components": [
            {
              "type": "HeroBanner",
              "props": {
                "title": "Tuyển sinh Lớp 10 THPT Chuyên Đại học Vinh 2026",
                "tagline": "Cái nôi nhân tài Olympic Bắc Miền Trung thành lập năm 1966",
                "badge": "Chỉ tiêu: 385 Học sinh · 8 Khối chuyên",
                "actionButtons": [
                  { "label": "Đăng ký thi trực tuyến", "action": "OPEN_REGISTRATION_MODAL", "variant": "primary" },
                  { "label": "Tra cứu điểm & SBD", "action": "NAVIGATE_TAB_LOOKUP", "variant": "outline" }
                ]
              }
            },
            {
              "type": "SpecializedClassGrid",
              "props": {
                "classes": [
                  { "code": "CH-TOAN", "name": "Chuyên Toán", "quota": 70, "exam": "Toán chuyên (hệ số 2)", "benchmark": 31.75 },
                  { "code": "CH-TIN", "name": "Chuyên Tin học", "quota": 35, "exam": "Tin chuyên / Toán", "benchmark": 28.50 },
                  { "code": "CH-LY", "name": "Chuyên Vật lý", "quota": 35, "exam": "Vật lý chuyên (hệ số 2)", "benchmark": 29.25 },
                  { "code": "CH-HOA", "name": "Chuyên Hóa học", "quota": 35, "exam": "Hóa học chuyên (hệ số 2)", "benchmark": 30.00 },
                  { "code": "CH-SINH", "name": "Chuyên Sinh học", "quota": 35, "exam": "Sinh học chuyên (hệ số 2)", "benchmark": 27.75 },
                  { "code": "CH-ANH", "name": "Chuyên Tiếng Anh", "quota": 70, "exam": "Tiếng Anh chuyên (hệ số 2)", "benchmark": 33.50 },
                  { "code": "CH-VAN", "name": "Chuyên Ngữ văn", "quota": 35, "exam": "Ngữ văn chuyên (hệ số 2)", "benchmark": 30.50 },
                  { "code": "CLC-TA", "name": "Chất lượng cao", "quota": 70, "exam": "Xét NV2 từ kỳ thi", "benchmark": 25.00 }
                ]
              }
            },
            {
              "type": "ExamScheduleWidget",
              "props": {
                "examDays": [
                  { "date": "14/06/2026", "morning": "Toán chung (120')", "afternoon": "Ngữ văn chung (120')" },
                  { "date": "15/06/2026", "morning": "Môn Chuyên (Toán, Văn, Sinh)", "afternoon": "Môn Chuyên (Lý, Hóa, Anh, Tin)" }
                ]
              }
            },
            {
              "type": "CandidateLookupForm",
              "props": {
                "fields": ["registrationNumber", "fullName", "dob"],
                "apiEndpoint": "/api/v1/admissions/highschool-gifted/candidates/lookup"
              }
            }
          ]
        };

      case 'sau-dai-hoc':
        return {
          "$schema": "https://admissions.vinhuni.edu.vn/schemas/sdui/v1/postgraduate.json",
          "subdomain": "SDH",
          "institution": "Phòng Đào tạo Sau đại học - ĐH Vinh",
          "cycle": 2026,
          "components": [
            {
              "type": "NoticeAlertBanner",
              "props": {
                "officialDoc": "136/TB-ĐHV",
                "text": "Tiếp tục thu hồ sơ Tiến sĩ Đợt 2 cho 11 ngành đến 15/11/2026",
                "decisionBenchmark": "Quyết định 2246/QĐ-ĐHV (Điểm chuẩn Thạc sĩ Đợt 1)"
              }
            },
            {
              "type": "PostgraduateProgramList",
              "props": {
                "masterCount": 30,
                "doctoralCount": 12,
                "feePerCredit": "748.000đ - 940.000đ"
              }
            }
          ]
        };

      case 'dh-chinh-quy':
      default:
        return {
          "$schema": "https://admissions.vinhuni.edu.vn/schemas/sdui/v1/undergraduate.json",
          "subdomain": "DHCQ",
          "institution": "Trường Đại học Vinh (Mã trường: TDV)",
          "cycle": 2026,
          "components": [
            {
              "type": "AdmissionMethodsRegistry",
              "props": {
                "activeMethods": [
                  { "code": "100", "name": "Điểm thi THPT", "status": "active" },
                  { "code": "200", "name": "Học bạ THPT", "status": "active" },
                  { "code": "301", "name": "Tuyển thẳng Bộ GD&ĐT", "status": "active" },
                  { "code": "405", "name": "Đánh giá năng lực ĐHQG", "status": "active" }
                ]
              }
            },
            {
              "type": "MajorQuotaMatrix",
              "props": {
                "majorsCount": 55,
                "totalEstimatedQuota": 5200,
                "dynamicFilter": true
              }
            }
          ]
        };
    }
  };

  const copySchemaToClipboard = () => {
    const code = JSON.stringify(getSubdomainSchema(selectedSubdomain), null, 2);
    navigator.clipboard.writeText(code);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-7 rounded-2xl border border-indigo-800/40 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3 py-0.5 rounded-full text-xs font-mono font-semibold">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <span>KIẾN TRÚC HỆ THỐNG TUYỂN SINH ĐA PHÂN HỆ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Kiến Trúc 9 Subdomain & Server-Driven UI (SDUI)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Toàn bộ hệ thống tuyển sinh của Trường Đại học Vinh được module hóa thành 9 Subdomain độc lập với cấu trúc dữ liệu chuẩn hóa, được điều khiển linh hoạt qua Schema Server-Driven UI từ các văn bản PDF chính thức.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActivePortal('public');
                setActiveChannel(selectedSubdomain as any);
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span>Xem Subdomain ở Cổng Thí sinh</span>
            </button>
          </div>
        </div>
      </div>

      {/* 9 SUBDOMAINS GRID SELECTOR */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Danh Mục 9 Subdomain Tuyển Sinh Đang Vận Hành
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Nhấp vào từng Subdomain để kiểm tra cấu hình Schema & API Endpoint
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subdomains.map(sub => {
            const isSelected = selectedSubdomain === sub.id;
            const Icon = sub.icon;

            return (
              <div
                key={sub.id}
                onClick={() => setSelectedSubdomain(sub.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${sub.color} flex items-center justify-center text-white shadow-xs`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                        {sub.code}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border ${sub.badgeColor}`}>
                      {sub.schemaVersion}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{sub.title}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 inline" />}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Quy mô:</span>
                    <span className="font-semibold text-slate-700">{sub.stateCount}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 text-[10px] font-mono text-slate-400 truncate bg-slate-50 p-1.5 rounded border border-slate-100">
                  {sub.endpoint}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECTED SUBDOMAIN DEEP DIVE & SCHEMA VIEWER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Subdomain Details & Capabilities */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentActiveSubdomain.color} flex items-center justify-center text-white shadow-sm`}>
                  {React.createElement(currentActiveSubdomain.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                    Chi Tiết Subdomain
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {currentActiveSubdomain.title}
                  </h3>
                </div>
              </div>

              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {currentActiveSubdomain.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Năng lực nghiệp vụ cốt lõi:
              </span>
              <div className="space-y-1.5">
                {currentActiveSubdomain.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-indigo-950">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>Cơ Chế Dynamic Rendering SDUI:</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Khi Hội đồng tuyển sinh ban hành thông báo mới (ví dụ thông báo bổ sung chỉ tiêu, đổi lịch thi), AI trích xuất tri thức thành JSON Schema bên phải. Giao diện Cổng thí sinh sẽ tự render lại tức thời mà không cần dev phải deploy code mới!
              </p>
            </div>

            <button
              onClick={() => {
                setActivePortal('public');
                setActiveChannel(currentActiveSubdomain.id as any);
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Trải nghiệm Cổng {currentActiveSubdomain.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Server-Driven UI Schema */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-950 text-slate-200 rounded-2xl border border-slate-800 shadow-md p-5 flex flex-col h-full font-mono text-xs">
            
            {/* Terminal bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white text-xs">
                  SDUI Schema Response · {currentActiveSubdomain.code}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copySchemaToClipboard}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copiedSuccess ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Code className="w-3 h-3" />
                      <span>Sao chép JSON</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Subdomain API Route info */}
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 text-[11px] mb-3 flex items-center justify-between text-slate-300">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded font-bold text-[9px]">GET</span>
                <span className="text-indigo-300 truncate">{currentActiveSubdomain.endpoint}/schema</span>
              </div>
              <span className="text-slate-500 shrink-0">200 OK (cache-control: 300s)</span>
            </div>

            {/* Code Body */}
            <div className="flex-1 overflow-x-auto bg-slate-900/50 p-4 rounded-xl border border-slate-800/50 text-[11.5px] leading-relaxed max-h-[460px]">
              <pre className="text-indigo-200 font-mono">
                {JSON.stringify(getSubdomainSchema(selectedSubdomain), null, 2)}
              </pre>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Định dạng: RFC-8259 JSON · UTF-8</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Validated against JSON-Schema Draft-07
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
