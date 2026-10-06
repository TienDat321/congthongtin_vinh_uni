import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  Sparkles, 
  Printer, 
  Download, 
  ShieldCheck, 
  BookOpen, 
  AlertCircle,
  CreditCard,
  Building,
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { masterMajorsList, doctoralMajorsList } from '../../data/postgraduateMockData';
import { PostgraduateDegree, PostgraduateMajor } from '../../types/postgraduate';

interface PostgraduateApplicationFormProps {
  onSuccess?: (applicationCode: string) => void;
  defaultDegree?: PostgraduateDegree;
}

export const PostgraduateApplicationForm: React.FC<PostgraduateApplicationFormProps> = ({ 
  onSuccess,
  defaultDegree = 'master' 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [degreeLevel, setDegreeLevel] = useState<PostgraduateDegree>(defaultDegree);
  const [selectedMajorId, setSelectedMajorId] = useState<string>(
    defaultDegree === 'master' ? masterMajorsList[0].id : doctoralMajorsList[0].id
  );
  const [admissionRound, setAdmissionRound] = useState<1 | 2>(2); // Đang mở nhận hồ sơ đợt 2 tiếp tục thu hồ sơ

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [position, setPosition] = useState('');

  // Academic Background
  const [ugInstitution, setUgInstitution] = useState('');
  const [ugMajor, setUgMajor] = useState('');
  const [ugYear, setUgYear] = useState('2020');
  const [ugGrade, setUgGrade] = useState<'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình khá'>('Giỏi');

  // Master Degree (for PhD candidates)
  const [masterInstitution, setMasterInstitution] = useState('');
  const [masterMajor, setMasterMajor] = useState('');
  const [masterYear, setMasterYear] = useState('2023');

  // Language & Knowledge Supplement
  const [languageOption, setLanguageOption] = useState<'CERTIFICATE' | 'REGISTER_PREP_EXAM'>('CERTIFICATE');
  const [languageCertType, setLanguageCertType] = useState('VSTEP B2');
  const [languageScore, setLanguageScore] = useState('B2 (6.0)');
  const [needSupplementaryCourses, setNeedSupplementaryCourses] = useState<boolean>(false);
  const [supplementSubjectCount, setSupplementSubjectCount] = useState<3 | 7>(3);

  // Research Topic
  const [researchTopicTitle, setResearchTopicTitle] = useState('');

  // Uploaded Files State
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({
    phieuDangKy: 'Phieu_dang_ky_du_tuyen_SDH_2026.pdf',
    soYeuLyLich: 'So_yeu_ly_lich_xac_nhan_co_quan.pdf',
    bangDaiHoc: 'Bang_va_Bang_diem_Dai_hoc_cong_chung.pdf',
    chungChiNgoaiNgu: 'Chung_chi_Tieng_Anh_B2.pdf',
    baiLuanHoacDeCuong: 'De_cuong_nghien_cuu_hoac_Bai_luan.pdf'
  });

  // Generated Application Code
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const availableMajors = degreeLevel === 'master' ? masterMajorsList : doctoralMajorsList;
  const selectedMajor = availableMajors.find(m => m.id === selectedMajorId) || availableMajors[0];

  // Fee calculation: Master = 420.000 VNĐ; Doctoral = 1.500.000 VNĐ; Ngoại ngữ ôn tập = 1.500.000 VNĐ; BSKT = 1.000.000 VNĐ / môn
  const baseAdmissionFee = degreeLevel === 'master' ? 420000 : 1500000;
  const prepLanguageFee = languageOption === 'REGISTER_PREP_EXAM' ? 1500000 : 0;
  const supplementFee = needSupplementaryCourses ? supplementSubjectCount * 1000000 : 0;
  const totalFee = baseAdmissionFee + prepLanguageFee + supplementFee;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !idNumber || !phoneNumber || !email) {
      alert('Vui lòng điền đầy đủ các thông tin cá nhân bắt buộc (*).');
      return;
    }
    setCurrentStep(3);
  };

  const handleNextStep3 = () => {
    // Generate Code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `SDH-2026-${randomSuffix}`;
    setGeneratedCode(code);
    setCurrentStep(4);
    if (onSuccess) {
      onSuccess(code);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-xs">
      
      {/* Top Header */}
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-indigo-950 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              <span>Hệ thống Đăng ký Tuyển sinh Sau đại học Trực tuyến</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Đăng Ký Xét Tuyển Thạc Sĩ & Tiến Sĩ Năm 2026
            </h2>
            <p className="text-slate-300 text-xs">
              Cổng tiếp nhận hồ sơ trực tuyến theo Thông báo số 39/TB-ĐHV (Thạc sĩ) và Thông báo số 136/TB-ĐHV (Tiến sĩ).
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-[11px] text-slate-300 block font-medium">Cổng dịch vụ công:</span>
            <span className="font-mono text-amber-300 font-bold text-sm">tuyensinhsdh.vinhuni.edu.vn</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 pt-6 border-t border-sky-800/60 mt-6">
          {[
            { step: 1, label: 'Bậc & Ngành tuyển sinh' },
            { step: 2, label: 'Thông tin & Văn bằng' },
            { step: 3, label: 'Minh chứng hồ sơ' },
            { step: 4, label: 'Xác nhận & Lệ phí VietQR' }
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold mb-1 transition-all ${
                currentStep >= item.step
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-sky-900/60 text-sky-400 border border-sky-700'
              }`}>
                {currentStep > item.step ? '✓' : item.step}
              </div>
              <span className={`text-[10px] hidden sm:block ${
                currentStep >= item.step ? 'text-white font-bold' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FORM BODY */}
      <div className="p-6 sm:p-8">
        
        {/* ================= STEP 1: BẬC & NGÀNH DỰ TUYỂN ================= */}
        {currentStep === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">
                Bước 1: Chọn Bậc Đào Tạo & Ngành Tuyển Sinh
              </h3>
              <p className="text-slate-500">
                Nhà trường đang tổ chức thu nhận hồ sơ trực tuyến Đợt 2 năm 2026 cho các ngành còn chỉ tiêu sau khi kết thúc Đợt 1.
              </p>
            </div>

            {/* Degree Switcher */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Chọn bậc đào tạo dự tuyển *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => {
                    setDegreeLevel('master');
                    setSelectedMajorId(masterMajorsList[0].id);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                    degreeLevel === 'master'
                      ? 'border-sky-900 bg-sky-50/60 ring-2 ring-sky-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${degreeLevel === 'master' ? 'bg-sky-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">Trình độ Thạc sĩ (Cao học)</span>
                      <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded">30 Ngành</span>
                    </div>
                    <p className="text-slate-500 mt-1">
                      Thời gian đào tạo: 1.5 - 2 năm (18 - 24 tháng). Xét tuyển hồ sơ & bài luận/phỏng vấn chuyên môn. Lệ phí: 420.000đ.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setDegreeLevel('doctoral');
                    setSelectedMajorId(doctoralMajorsList[0].id);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                    degreeLevel === 'doctoral'
                      ? 'border-indigo-900 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${degreeLevel === 'doctoral' ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">Trình độ Tiến sĩ (NCS)</span>
                      <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded">12 Ngành</span>
                    </div>
                    <p className="text-slate-500 mt-1">
                      Thời gian đào tạo: 3 - 4 năm. Xét tuyển hồ sơ & bảo vệ đề cương nghiên cứu. Có Đề án 89 & Học bổng Chính phủ. Lệ phí: 1.500.000đ.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admission Round */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Chọn đợt tuyển sinh *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer ${
                  admissionRound === 2 ? 'border-amber-400 bg-amber-50/60 text-slate-900 font-bold' : 'border-slate-200 text-slate-600'
                }`}>
                  <input
                    type="radio"
                    name="round"
                    checked={admissionRound === 2}
                    onChange={() => setAdmissionRound(2)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <div>
                    <span className="block text-xs font-bold text-amber-950">Đợt 2 năm 2026 (Đang nhận hồ sơ - Hạn nộp 15/11/2026)</span>
                    <span className="text-[11px] text-slate-500 font-normal">Xét tuyển cho các chuyên ngành còn chỉ tiêu sau Đợt 1</span>
                  </div>
                </label>

                <label className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer opacity-70 ${
                  admissionRound === 1 ? 'border-sky-300 bg-sky-50 text-slate-900 font-bold' : 'border-slate-200 text-slate-600'
                }`}>
                  <input
                    type="radio"
                    name="round"
                    checked={admissionRound === 1}
                    onChange={() => setAdmissionRound(1)}
                    className="accent-sky-600 w-4 h-4"
                  />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Đợt 1 năm 2026 (Đã công bố điểm chuẩn & kết quả)</span>
                    <span className="text-[11px] text-slate-500 font-normal">Xem điểm chuẩn và tra cứu danh sách trúng tuyển</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Major Selection */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">
                Chọn ngành đăng ký dự tuyển ({availableMajors.length} ngành có sẵn) *
              </label>
              <select
                value={selectedMajorId}
                onChange={(e) => setSelectedMajorId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white focus:ring-2 focus:ring-sky-500 text-sm"
              >
                {availableMajors.map((major) => (
                  <option key={major.id} value={major.id}>
                    [{major.code}] {major.name} — {major.quotaRound2 ? `Còn ${major.quotaRound2} chỉ tiêu Đợt 2` : `Chỉ tiêu Đợt 1: ${major.quotaRound1}`} {major.dean89 ? '(Có Đề án 89)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Major Summary Card */}
            {selectedMajor && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold bg-sky-900 text-white px-2 py-0.5 rounded text-xs">
                      {selectedMajor.code}
                    </span>
                    <span className="font-extrabold text-sm text-slate-900">{selectedMajor.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedMajor.quotaRound2 !== undefined && selectedMajor.quotaRound2 > 0 && (
                      <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px]">
                        Chỉ tiêu tiếp tục thu Đợt 2: {selectedMajor.quotaRound2} chỉ tiêu
                      </span>
                    )}
                    {selectedMajor.dean89 && (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        Đào tạo theo Đề án 89
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Khoa / Viện:</span>
                    <span className="font-semibold text-slate-800">{selectedMajor.faculty}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Thời gian đào tạo:</span>
                    <span className="font-semibold text-slate-800">{selectedMajor.durationMonths} tháng</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Phương thức xét:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedMajor.admissionMethod === 'XÉT_HỒ_SƠ_PHỎNG_VẤN' ? 'Hồ sơ & Phỏng vấn' : 
                       selectedMajor.admissionMethod === 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG' ? 'Hồ sơ & Bảo vệ đề cương' : 
                       'Hồ sơ & Chấm bài luận'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Điểm chuẩn Đợt 1:</span>
                    <span className="font-bold text-sky-900 font-mono">
                      {selectedMajor.cutoffScoreRound1 ? `${selectedMajor.cutoffScoreRound1.toFixed(2)} điểm` : 'Đang cập nhật'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="px-6 py-2.5 bg-sky-900 hover:bg-sky-800 text-white font-extrabold rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Tiếp tục: Điền thông tin ứng viên</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 2: THÔNG TIN ỨNG VIÊN & VĂN BẰNG ================= */}
        {currentStep === 2 && (
          <form onSubmit={handleNextStep2} className="space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">
                Bước 2: Thông Tin Ứng Viên & Năng Lực Học Thuật
              </h3>
              <p className="text-slate-500">
                Nhập đầy đủ thông tin định danh cá nhân, cơ quan công tác và trình độ văn bằng tốt nghiệp.
              </p>
            </div>

            {/* Personal Details */}
            <div className="space-y-3">
              <span className="font-extrabold text-sky-950 block text-xs uppercase tracking-wider border-b border-slate-200 pb-1">
                1. Thông tin cá nhân & Liên hệ
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Họ và tên thí sinh *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: NGUYỄN VĂN AN"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value.toUpperCase())}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-bold uppercase focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Ngày sinh *</label>
                  <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Giới tính *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'Nam' | 'Nữ')}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Số CCCD / Hộ chiếu *</label>
                  <input
                    type="text"
                    required
                    placeholder="12 chữ số CCCD"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Số điện thoại liên hệ *</label>
                  <input
                    type="tel"
                    required
                    placeholder="09xx xxx xxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-bold focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Địa chỉ Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="ungvien@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-medium focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Cơ quan, đơn vị công tác hiện nay</label>
                  <input
                    type="text"
                    placeholder="Tên cơ quan, trường học, doanh nghiệp..."
                    value={workplace}
                    onChange={(e) => setWorkplace(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Chức vụ</label>
                  <input
                    type="text"
                    placeholder="Giảng viên, Chuyên viên..."
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Academic Background */}
            <div className="space-y-3 pt-2">
              <span className="font-extrabold text-sky-950 block text-xs uppercase tracking-wider border-b border-slate-200 pb-1">
                2. Văn bằng Đại học & Thạc sĩ đã có
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Trường cấp bằng Đại học *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Trường Đại học Vinh"
                    value={ugInstitution}
                    onChange={(e) => setUgInstitution(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Ngành tốt nghiệp ĐH *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Sư phạm Toán"
                    value={ugMajor}
                    onChange={(e) => setUgMajor(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Năm tốt nghiệp & Xếp loại *</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      value={ugYear}
                      onChange={(e) => setUgYear(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-mono text-center"
                    />
                    <select
                      value={ugGrade}
                      onChange={(e) => setUgGrade(e.target.value as any)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                    >
                      <option value="Xuất sắc">Xuất sắc</option>
                      <option value="Giỏi">Giỏi</option>
                      <option value="Khá">Khá</option>
                      <option value="Trung bình khá">TB Khá</option>
                    </select>
                  </div>
                </div>

                {degreeLevel === 'doctoral' && (
                  <>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-indigo-900">Trường cấp bằng Thạc sĩ (nếu có)</label>
                      <input
                        type="text"
                        placeholder="VD: Trường Đại học Vinh"
                        value={masterInstitution}
                        onChange={(e) => setMasterInstitution(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/40"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-indigo-900">Chuyên ngành Thạc sĩ & Năm tốt nghiệp</label>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Chuyên ngành ThS"
                          value={masterMajor}
                          onChange={(e) => setMasterMajor(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/40 col-span-2"
                        />
                        <input
                          type="number"
                          value={masterYear}
                          onChange={(e) => setMasterYear(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/40 text-center font-mono"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Foreign Language & Knowledge Supplement */}
            <div className="space-y-3 pt-2">
              <span className="font-extrabold text-sky-950 block text-xs uppercase tracking-wider border-b border-slate-200 pb-1">
                3. Điều kiện Ngoại ngữ & Bổ sung kiến thức
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 space-y-3">
                  <label className="font-bold text-slate-800 block">Năng lực ngoại ngữ đầu vào *</label>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                      <input
                        type="radio"
                        name="langOpt"
                        checked={languageOption === 'CERTIFICATE'}
                        onChange={() => setLanguageOption('CERTIFICATE')}
                        className="accent-sky-700"
                      />
                      <span>Đã có văn bằng / chứng chỉ ngoại ngữ chuẩn B2 (IELTS 5.5, VSTEP B2,...)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                      <input
                        type="radio"
                        name="langOpt"
                        checked={languageOption === 'REGISTER_PREP_EXAM'}
                        onChange={() => setLanguageOption('REGISTER_PREP_EXAM')}
                        className="accent-sky-700"
                      />
                      <span>Chưa có chứng chỉ — Đăng ký ôn tập & thi ĐGNL ngoại ngữ ĐH Vinh (+1.500.000đ)</span>
                    </label>
                  </div>

                  {languageOption === 'CERTIFICATE' ? (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Tên chứng chỉ (VD: VSTEP B2)"
                        value={languageCertType}
                        onChange={(e) => setLanguageCertType(e.target.value)}
                        className="p-2 rounded-lg border border-slate-300 font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Điểm số / Bậc (VD: 6.5)"
                        value={languageScore}
                        onChange={(e) => setLanguageScore(e.target.value)}
                        className="p-2 rounded-lg border border-slate-300 font-bold"
                      />
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                      Khóa ôn tập 60 tiết (30 tiết E-learning + 30 tiết Teams trực tiếp) theo Thông báo 05/03/2026. Lệ phí 1.500.000đ.
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-slate-200 space-y-3">
                  <label className="font-bold text-slate-800 block">Học phần Bổ sung kiến thức (Nếu trái ngành)</label>
                  
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                    <input
                      type="checkbox"
                      checked={needSupplementaryCourses}
                      onChange={(e) => setNeedSupplementaryCourses(e.target.checked)}
                      className="rounded accent-sky-700 w-4 h-4"
                    />
                    <span>Thí sinh thuộc diện ngành gần / phải học bổ sung kiến thức</span>
                  </label>

                  {needSupplementaryCourses && (
                    <div className="space-y-2 pt-1">
                      <label className="text-slate-600 block">Số học phần cần học bổ sung (1.000.000đ/môn):</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                          <input
                            type="radio"
                            name="bsktCount"
                            checked={supplementSubjectCount === 3}
                            onChange={() => setSupplementSubjectCount(3)}
                            className="accent-sky-700"
                          />
                          <span>03 học phần (+3.000.000đ)</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                          <input
                            type="radio"
                            name="bsktCount"
                            checked={supplementSubjectCount === 7}
                            onChange={() => setSupplementSubjectCount(7)}
                            className="accent-sky-700"
                          />
                          <span>07 học phần (+7.000.000đ)</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Research Topic */}
            <div className="space-y-1 pt-2">
              <label className="font-bold text-slate-700">
                Tên dự kiến Đề cương nghiên cứu (đối với Tiến sĩ) hoặc Đề tài bài luận (đối với Thạc sĩ) *
              </label>
              <textarea
                rows={2}
                required
                placeholder="VD: Nghiên cứu nâng cao hiệu quả quản lý giáo dục phổ thông..."
                value={researchTopicTitle}
                onChange={(e) => setResearchTopicTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 font-medium"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                ← Quay lại bước 1
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-sky-900 hover:bg-sky-800 text-white font-extrabold rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Tiếp tục: Tải hồ sơ scan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 3: TẢI MINH CHỨNG HỒ SƠ ================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">
                Bước 3: Tải Lên Tệp Hồ Sơ Đăng Ký Dự Tuyển
              </h3>
              <p className="text-slate-500">
                Hệ thống chấp nhận các file định dạng PDF, JPG, PNG. Các mục có dấu (*) là bắt buộc theo quy chế tuyển sinh Sau đại học.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'phieuDangKy', label: '1. Phiếu đăng ký dự tuyển (Mẫu Phụ lục 1)', required: true },
                { key: 'soYeuLyLich', label: '2. Sơ yếu lý lịch có xác nhận của cơ quan hoặc địa phương', required: true },
                { key: 'bangDaiHoc', label: '3. Bản scan bằng & bảng điểm Đại học (công chứng)', required: true },
                { key: 'chungChiNgoaiNgu', label: '4. Bản scan chứng chỉ ngoại ngữ (nếu có)', required: languageOption === 'CERTIFICATE' },
                { key: 'baiLuanHoacDeCuong', label: degreeLevel === 'doctoral' ? '5. Đề cương nghiên cứu (kèm danh mục công trình)' : '5. Bài luận dự tuyển (theo mẫu Phụ lục 4)', required: true },
                { key: 'thuGioiThieu', label: '6. Thư giới thiệu của 02 nhà khoa học (Bắt buộc cho NCS Tiến sĩ)', required: degreeLevel === 'doctoral' }
              ].map((doc) => (
                <div key={doc.key} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 block">
                      {doc.label} {doc.required && <strong className="text-red-500">*</strong>}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{uploadedFiles[doc.key] || 'Đã đính kèm tệp mẫu hợp lệ'}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newName = `File_scan_${doc.key}_${Date.now().toString().slice(-4)}.pdf`;
                      setUploadedFiles({ ...uploadedFiles, [doc.key]: newName });
                    }}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold shrink-0 cursor-pointer text-xs flex items-center gap-1"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-sky-800" />
                    <span>Tải lại</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1 text-slate-700">
                <span className="font-bold text-amber-900 block">Lưu ý quan trọng đối với ứng viên:</span>
                <p>
                  - Thí sinh nộp bài luận đăng ký dự tuyển và đề cương nghiên cứu gửi bản in bằng thư đảm bảo về: <strong>Phòng Đào tạo Sau đại học, Trường Đại học Vinh (Tầng 4 Nhà Điều hành, 182 Lê Duẩn, TP Vinh)</strong>.
                </p>
                <p>
                  - Nhà trường chỉ thành lập các lớp/chuyên ngành có thí sinh trúng tuyển từ 07 người trở lên theo quy định.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                ← Quay lại bước 2
              </button>
              <button
                type="button"
                onClick={handleNextStep3}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Xác nhận & Chuyển sang nộp lệ phí VietQR</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: HOÀN TẤT & THANH TOÁN VIETQR ================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-300 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold text-emerald-800 tracking-wider block">
                  Hồ sơ dự tuyển đã được ghi nhận trên hệ thống
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-2xl font-extrabold text-slate-950">{generatedCode}</span>
                  <button
                    onClick={() => copyToClipboard(generatedCode)}
                    className="px-3 py-1 bg-white border border-emerald-400 rounded-lg text-emerald-900 font-bold hover:bg-emerald-100 cursor-pointer text-xs"
                  >
                    {isCopied ? 'Đã sao chép!' : 'Sao chép mã'}
                  </button>
                </div>
                <p className="text-slate-600 text-xs">
                  Thí sinh: <strong>{fullName}</strong> · Ngành: <strong>[{selectedMajor.code}] {selectedMajor.name}</strong> ({degreeLevel === 'master' ? 'Thạc sĩ' : 'Tiến sĩ'})
                </p>
              </div>
            </div>

            {/* Split Screen: VietQR Payment & Application Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left: VietQR Napas */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white text-xs">Cổng Thanh Toán Napas 24/7 (VietQR)</span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    Tự động đối soát
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl text-slate-950 space-y-3">
                  {/* Generated QR Code Simulation */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://vinhuni.edu.vn/pay?code=${generatedCode}&amount=${totalFee}`}
                      alt="VietQR Napas ĐH Vinh"
                      className="w-40 h-40 rounded-lg"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 text-center">
                    Quét mã qua mọi ứng dụng Ngân hàng (BIDV, Vietcombank, Techcombank, Agribank,...)
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Ngân hàng thụ hưởng:</span>
                    <strong className="text-white">BIDV - Chi nhánh Nghệ An</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Số tài khoản:</span>
                    <strong className="text-amber-400 font-bold text-sm">51010000018596</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Đơn vị thụ hưởng:</span>
                    <strong className="text-white">TRƯỜNG ĐẠI HỌC VINH</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Số tiền thanh toán:</span>
                    <strong className="text-emerald-400 font-bold text-base">
                      {totalFee.toLocaleString('vi-VN')} VNĐ
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800">
                    <span>Nội dung chuyển khoản:</span>
                    <strong className="text-amber-300 font-bold">{generatedCode} {idNumber}</strong>
                  </div>
                </div>
              </div>

              {/* Right: Application Summary & Printable Confirmation */}
              <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-4">
                <span className="font-extrabold text-slate-900 block text-sm border-b border-slate-200 pb-2">
                  Tóm Tắt Hồ Sơ & Bước Tiếp Theo
                </span>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mã hồ sơ:</span>
                    <span className="font-mono font-bold text-slate-900">{generatedCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bậc đào tạo:</span>
                    <span className="font-bold text-slate-900">
                      {degreeLevel === 'master' ? 'Thạc sĩ (Cao học)' : 'Tiến sĩ (Nghiên cứu sinh)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ngành đăng ký:</span>
                    <span className="font-bold text-slate-900 text-right">{selectedMajor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Lệ phí xét tuyển cơ bản:</span>
                    <span className="font-mono font-bold text-slate-900">{baseAdmissionFee.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {prepLanguageFee > 0 && (
                    <div className="flex justify-between text-amber-900">
                      <span>Lệ phí ôn & thi ngoại ngữ 60 tiết:</span>
                      <span className="font-mono font-bold">+1.500.000đ</span>
                    </div>
                  )}
                  {supplementFee > 0 && (
                    <div className="flex justify-between text-indigo-900">
                      <span>Học bổ sung ({supplementSubjectCount} học phần):</span>
                      <span className="font-mono font-bold">+{supplementFee.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-950 text-sm">
                    <span>Tổng kinh phí cần nộp:</span>
                    <span className="text-emerald-700 font-mono">{totalFee.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-900 block">Kế hoạch tiếp theo:</span>
                  <p>• Hạn chót nhận hồ sơ Đợt 2: <strong>15/11/2026</strong></p>
                  <p>• Thời gian xét tuyển, phỏng vấn dự kiến: <strong>22/11 - 28/11/2026</strong></p>
                  <p>• Công bố kết quả trúng tuyển: <strong>30/11 - 02/12/2026</strong></p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In phiếu xác nhận</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setFullName('');
                      setIdNumber('');
                    }}
                    className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold cursor-pointer text-xs"
                  >
                    Đăng ký mới
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
