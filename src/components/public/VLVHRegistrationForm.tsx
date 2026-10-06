import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  QrCode, 
  ArrowRight, 
  Sparkles, 
  User, 
  Briefcase, 
  School, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard,
  RefreshCw,
  Eye,
  Check,
  Printer
} from 'lucide-react';
import { initialVLVHMajors, vlvhPaymentConfig } from '../../data/vlvhMockData';
import { VLVHApplicationRecord } from '../../types/vlvh';
import { VLVHTemplatesModal } from './VLVHTemplatesModal';

interface VLVHRegistrationFormProps {
  onSuccessRegister?: (applicant: VLVHApplicationRecord) => void;
}

export const VLVHRegistrationForm: React.FC<VLVHRegistrationFormProps> = ({
  onSuccessRegister
}) => {
  const [step, setStep] = useState<number>(1); // 1: Info, 2: Uploads, 3: VietQR 500k
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);

  // Selected Major & Program
  const [selectedMajorCode, setSelectedMajorCode] = useState<string>('7140201'); // Mầm non default
  const [programType, setProgramType] = useState<'tcToDh' | 'cdToDh' | 'secondDegree' | 'thpt'>('cdToDh');

  // Candidate Details (From official form)
  const [studentName, setStudentName] = useState('');
  const [birthDate, setBirthDate] = useState('1996-05-15');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nữ');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [idCardDate, setIdCardDate] = useState('2021-06-10');
  const [idCardPlace, setIdCardPlace] = useState('Cục Cảnh sát QLHC về TTXH');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Education Background
  const [graduatedLevel, setGraduatedLevel] = useState('Cao đẳng Sư phạm');
  const [graduatedMajor, setGraduatedMajor] = useState('Giáo dục Mầm non');
  const [graduatedYear, setGraduatedYear] = useState('2019');
  const [graduatedSchool, setGraduatedSchool] = useState('Trường CĐ Sư phạm Nghệ An');

  // Employment Details
  const [workplace, setWorkplace] = useState('');
  const [workPosition, setWorkPosition] = useState('');
  const [workYears, setWorkYears] = useState<number>(4);

  // Uploaded docs simulation
  const [gradDiplomaName, setGradDiplomaName] = useState<string | null>(null);
  const [transcriptsName, setTranscriptsName] = useState<string | null>(null);
  const [idCardScanName, setIdCardScanName] = useState<string | null>(null);
  const [workConfirmName, setWorkConfirmName] = useState<string | null>(null);

  // Payment & Generated Record
  const [generatedApplicant, setGeneratedApplicant] = useState<VLVHApplicationRecord | null>(null);
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const selectedMajor = initialVLVHMajors.find(m => m.code === selectedMajorCode) || initialVLVHMajors[0];

  // Handle Step 1 to Step 2
  const handleProceedToUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !idCardNumber.trim() || !phoneNumber.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên, Số CCCD và Số điện thoại liên hệ!');
      return;
    }
    setStep(2);
  };

  // Handle Step 2 to Step 3 (Generate VietQR 500k)
  const handleProceedToPayment = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const appCode = `VLVH2026-${selectedMajor.name.slice(0, 3).toUpperCase()}-${randomSuffix}`;

    const record: VLVHApplicationRecord = {
      id: `vlvh-${Date.now()}`,
      applicationCode: appCode,
      studentName: studentName.trim(),
      birthDate,
      gender,
      idCardNumber: idCardNumber.trim(),
      idCardDate,
      idCardPlace,
      phoneNumber: phoneNumber.trim(),
      email: email.trim() || 'hocvien@gmail.com',
      address: address.trim(),
      majorCode: selectedMajor.code,
      majorName: selectedMajor.name,
      programType,
      graduatedLevel,
      graduatedMajor,
      graduatedYear,
      graduatedSchool,
      workplace: workplace.trim(),
      workPosition: workPosition.trim(),
      workYears,
      feeAmount: 500000,
      paymentStatus: 'PENDING',
      status: 'SUBMITTED',
      registrationDate: new Date().toISOString().split('T')[0],
      documents: {
        gradDiploma: gradDiplomaName || undefined,
        transcripts: transcriptsName || undefined,
        idCardScan: idCardScanName || undefined,
        workConfirmation: workConfirmName || undefined
      }
    };

    setGeneratedApplicant(record);
    setStep(3);
  };

  // Simulate Instant VietQR Webhook Callback
  const handleSimulatePaymentSuccess = () => {
    setIsSimulatingPayment(true);
    setTimeout(() => {
      setIsSimulatingPayment(false);
      setIsPaid(true);
      if (generatedApplicant) {
        const updated = {
          ...generatedApplicant,
          paymentStatus: 'PAID' as const,
          paymentRef: `BIDV.VLVH.${Date.now().toString().slice(-8)}`
        };
        setGeneratedApplicant(updated);
        if (onSuccessRegister) {
          onSuccessRegister(updated);
        }
      }
    }, 1200);
  };

  const transferContent = generatedApplicant
    ? `VLVH2026 ${generatedApplicant.applicationCode} ${generatedApplicant.studentName.toUpperCase()}`
    : 'VLVH2026 HOSO';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Form Wizard Navigation */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mẫu chuẩn hóa từ Thông báo số 07/TB-ĐHV</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Đăng Ký Tuyển Sinh Đại Học Vừa Làm Vừa Học Năm 2026
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Trường Đại học Vinh — Trung tâm Giáo dục thường xuyên (Lệ phí xét tuyển 500.000 VNĐ qua VietQR)
          </p>
        </div>

        {/* Step Indicators & Template button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsTemplatesModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Xem Mẫu Đơn Gốc</span>
          </button>

          {[
            { num: 1, label: 'Thông tin' },
            { num: 2, label: 'Minh chứng' },
            { num: 3, label: 'Lệ phí VietQR (500k)' }
          ].map((s) => (
            <div 
              key={s.num} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === s.num 
                  ? 'bg-amber-400 text-slate-950 shadow-md' 
                  : step > s.num 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <span>{step > s.num ? '✓' : s.num}.</span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-10">

        {/* ================= STEP 1: FILL CANDIDATE DETAILS ================= */}
        {step === 1 && (
          <form onSubmit={handleProceedToUpload} className="space-y-8">
            
            {/* Major & Program selection */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. Ngành Đăng Ký Dự Tuyển & Loại Hình Đào Tạo:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Ngành đăng ký dự tuyển *</label>
                  <select
                    value={selectedMajorCode}
                    onChange={(e) => setSelectedMajorCode(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white font-bold text-slate-900"
                  >
                    <optgroup label="CÁC NGÀNH ĐÀO TẠO GIÁO VIÊN (1.800 chỉ tiêu)">
                      {initialVLVHMajors.filter(m => m.category === 'teacher').map(m => (
                        <option key={m.code} value={m.code}>
                          {m.name} (Mã: {m.code}) — Chỉ tiêu: {m.quota}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="CÁC NGÀNH ĐÀO TẠO KHÁC (600 chỉ tiêu)">
                      {initialVLVHMajors.filter(m => m.category === 'other').map(m => (
                        <option key={m.code} value={m.code}>
                          {m.name} (Mã: {m.code}) — Chỉ tiêu: {m.quota}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Loại hình / Đối tượng đào tạo *</label>
                  <select
                    value={programType}
                    onChange={(e) => setProgramType(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white font-medium"
                  >
                    {selectedMajor.programs.cdToDh && (
                      <option value="cdToDh">Nâng chuẩn: Liên thông từ Cao đẳng lên Đại học (2.0 - 2.5 năm)</option>
                    )}
                    {selectedMajor.programs.tcToDh && (
                      <option value="tcToDh">Nâng chuẩn: Liên thông từ Trung cấp lên Đại học (3.0 - 3.5 năm)</option>
                    )}
                    {selectedMajor.programs.secondDegree && (
                      <option value="secondDegree">Liên thông bằng Đại học thứ hai (Văn bằng 2 - 2.0 đến 2.5 năm)</option>
                    )}
                    {selectedMajor.programs.thpt && (
                      <option value="thpt">Người đã tốt nghiệp THPT (4.0 - 4.5 năm)</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Requirement badge */}
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-sky-950">Ngưỡng đầu vào quy định cho ngành {selectedMajor.name}:</span>
                <p className="text-slate-700 text-[11px] leading-relaxed">{selectedMajor.entryRequirement}</p>
                <div className="text-[10px] text-slate-500">Thời gian học: Thứ Bảy, Chủ nhật hoặc tập trung hè theo Mục III Thông báo 07.</div>
              </div>
            </div>

            {/* Sơ yếu lý lịch cá nhân */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-sky-800" />
                <span>2. Sơ Yếu Lý Lịch Thí Sinh (Theo Phiếu Đăng Ký VLVH)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700">Họ và tên khai sinh *</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Vd: TRẦN THỊ MAI HƯƠNG"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none uppercase font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Giới tính *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
                  >
                    <option value="Nữ">Nữ</option>
                    <option value="Nam">Nam</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Ngày sinh *</label>
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Số CMND/CCCD *</label>
                  <input
                    type="text"
                    required
                    value={idCardNumber}
                    onChange={(e) => setIdCardNumber(e.target.value)}
                    placeholder="12 chữ số trên thẻ CCCD"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Số điện thoại liên hệ *</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Vd: 0987654321"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700">Địa chỉ báo tin / Thường trú *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, đường/xã, huyện, tỉnh/TP"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email cá nhân</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hocvien@gmail.com"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Văn bằng đã tốt nghiệp & Quá trình công tác */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-sky-800" />
                <span>3. Trình Độ Đã Tốt Nghiệp & Đơn Vị Công Tác</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Trình độ tốt nghiệp cao nhất *</label>
                  <select
                    value={graduatedLevel}
                    onChange={(e) => setGraduatedLevel(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
                  >
                    <option value="Cao đẳng Sư phạm">Cao đẳng Sư phạm</option>
                    <option value="Trung cấp Sư phạm">Trung cấp Sư phạm</option>
                    <option value="Đại học">Đại học (học VB2)</option>
                    <option value="Cao đẳng khác">Cao đẳng khối ngành khác</option>
                    <option value="Trung cấp khác">Trung cấp khối ngành khác</option>
                    <option value="THPT / Bổ túc THPT">THPT / Bổ túc THPT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Ngành tốt nghiệp</label>
                  <input
                    type="text"
                    value={graduatedMajor}
                    onChange={(e) => setGraduatedMajor(e.target.value)}
                    placeholder="Vd: Sư phạm Mầm non"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Trường tốt nghiệp</label>
                  <input
                    type="text"
                    value={graduatedSchool}
                    onChange={(e) => setGraduatedSchool(e.target.value)}
                    placeholder="Vd: CĐ Sư phạm Nghệ An"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Cơ quan / Đơn vị công tác hiện tại</label>
                  <input
                    type="text"
                    value={workplace}
                    onChange={(e) => setWorkplace(e.target.value)}
                    placeholder="Vd: Trường Mầm non Hưng Lộc"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Vị trí công tác</label>
                  <input
                    type="text"
                    value={workPosition}
                    onChange={(e) => setWorkPosition(e.target.value)}
                    placeholder="Vd: Giáo viên mầm non"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Số năm kinh nghiệm công tác</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={workYears}
                    onChange={(e) => setWorkYears(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Submit Step 1 */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-sky-900 hover:bg-sky-800 text-white font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer text-xs"
              >
                <span>Tiếp tục: Tải lên hồ sơ minh chứng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* ================= STEP 2: UPLOAD DOCUMENTS ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-slate-900">
                Tải Lên Hồ Sơ Tuyển Sinh (Theo Mục IV Thông Báo Số 07/TB-ĐHV)
              </h4>
              <p className="text-xs text-slate-600">
                Thí sinh tải lên file scan hoặc ảnh chụp rõ nét các giấy tờ để Hội đồng xét duyệt sơ khảo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* 1. Bằng tốt nghiệp */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-700" />
                    <span>1. Bằng tốt nghiệp (TC / CĐ / ĐH / THPT) *</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Bắt buộc</span>
                </div>
                <p className="text-[11px] text-slate-500">Bản sao công chứng bằng tốt nghiệp tương ứng đối tượng xét tuyển.</p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-white transition-colors">
                  {gradDiplomaName ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                      <span className="font-medium truncate">{gradDiplomaName}</span>
                      <button onClick={() => setGradDiplomaName(null)} className="text-red-500 font-bold text-xs">Xóa</button>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setGradDiplomaName(`BANG_TOT_NGHIEP_${studentName || 'HOC_VIEN'}.PDF`)}
                      className="text-sky-800 font-bold hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Chọn file bằng tốt nghiệp tải lên</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Bảng điểm toàn khóa */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-700" />
                    <span>2. Bảng điểm toàn khóa học *</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Bắt buộc</span>
                </div>
                <p className="text-[11px] text-slate-500">Bản sao công chứng bảng điểm Trung cấp / Cao đẳng / Đại học tương ứng.</p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-white transition-colors">
                  {transcriptsName ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                      <span className="font-medium truncate">{transcriptsName}</span>
                      <button onClick={() => setTranscriptsName(null)} className="text-red-500 font-bold text-xs">Xóa</button>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setTranscriptsName(`BANG_DIEM_TOAN_KHOA.PDF`)}
                      className="text-sky-800 font-bold hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Chọn file bảng điểm tải lên</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Căn cước công dân 2 mặt */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-sky-700" />
                    <span>3. Căn cước công dân (CCCD 2 mặt trên khổ A4) *</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Bắt buộc</span>
                </div>
                <p className="text-[11px] text-slate-500">Bản phô tô hoặc scan rõ 2 mặt thẻ CCCD gắn chip.</p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-white transition-colors">
                  {idCardScanName ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                      <span className="font-medium truncate">{idCardScanName}</span>
                      <button onClick={() => setIdCardScanName(null)} className="text-red-500 font-bold text-xs">Xóa</button>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setIdCardScanName(`CCCD_2_MAT_${idCardNumber || 'A4'}.PDF`)}
                      className="text-sky-800 font-bold hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Chọn file scan CCCD 2 mặt</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 4. Giấy xác nhận công tác */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-emerald-700" />
                    <span>4. Giấy xác nhận công tác (Mẫu số 2 của ĐH Vinh)</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Bổ sung xét ngưỡng</span>
                </div>
                <p className="text-[11px] text-slate-500">Dành cho đối tượng cần xác nhận 3 năm kinh nghiệm công tác đúng chuyên môn.</p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-white transition-colors">
                  {workConfirmName ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                      <span className="font-medium truncate">{workConfirmName}</span>
                      <button onClick={() => setWorkConfirmName(null)} className="text-red-500 font-bold text-xs">Xóa</button>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setWorkConfirmName(`GIAY_XAC_NHAN_CONG_TAC_DA_KY_DONG_DAU.PDF`)}
                      className="text-sky-800 font-bold hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Tải lên Giấy xác nhận có đóng dấu</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-bold text-xs cursor-pointer"
              >
                ← Quay lại bước thông tin
              </button>

              <button
                type="button"
                onClick={handleProceedToPayment}
                className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer text-xs"
              >
                <span>Xác nhận hồ sơ & Tạo mã VietQR (500.000 VNĐ)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: VIETQR 500.000 VNĐ PAYMENT & CONFIRMATION ================= */}
        {step === 3 && generatedApplicant && (
          <div className="space-y-8">
            
            {/* Header Success / Code Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Đã Khởi Tạo Hồ Sơ Xét Tuyển Vừa Làm Vừa Học 2026
                </span>
                <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                  Thí sinh: <span className="text-sky-950">{generatedApplicant.studentName}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Ngành: <strong>{generatedApplicant.majorName}</strong> (Mã: {generatedApplicant.majorCode}) · CCCD: <strong className="font-mono">{generatedApplicant.idCardNumber}</strong>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-emerald-200 sm:pl-6">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">Mã Hồ Sơ Xét Tuyển:</span>
                <span className="text-xl font-extrabold font-mono text-sky-900 bg-white px-3 py-1 rounded-lg border border-emerald-300 shadow-xs inline-block mt-0.5">
                  {generatedApplicant.applicationCode}
                </span>
              </div>
            </div>

            {/* VietQR 500k Payment Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200">
              
              {/* Left Column: VietQR Image Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col items-center text-center space-y-4">
                <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sky-900 text-xs tracking-wider">VietQR</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Napas 247</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700">500.000 VNĐ</span>
                </div>

                {/* Generated QR Image or Scalable SVG Pattern */}
                <div className="relative p-3 bg-white border-2 border-slate-800 rounded-2xl shadow-inner">
                  <img
                    src={`https://api.vietqr.io/image/970418-51010001234567-compact2.jpg?amount=500000&addInfo=${encodeURIComponent(transferContent)}&accountName=TRUONG%20DAI%20HOC%20VINH%20-%20TT%20GDTX`}
                    alt="Mã VietQR nộp lệ phí tuyển sinh VLVH"
                    className="w-56 h-56 object-contain rounded-lg"
                    onError={(e: any) => {
                      e.target.style.display = 'none';
                      const fallback = document.getElementById('vlvh-vietqr-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />

                  {/* Fallback container */}
                  <div id="vlvh-vietqr-fallback" style={{ display: 'none' }} className="w-56 h-56 bg-slate-900 rounded-lg flex flex-col items-center justify-center text-white p-4 text-center space-y-2">
                    <QrCode className="w-16 h-16 text-amber-400" />
                    <span className="text-xs font-mono font-bold">MÃ VIETQR VLVH 2026</span>
                    <span className="text-[10px] text-slate-300 font-mono break-all">{transferContent}</span>
                  </div>

                  {isPaid && (
                    <div className="absolute inset-0 bg-emerald-950/85 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-white p-4 animate-in fade-in">
                      <CheckCircle2 className="w-14 h-14 text-emerald-400 mb-2" />
                      <span className="font-extrabold text-base">ĐÃ THU LỆ PHÍ</span>
                      <span className="text-xs text-emerald-200 mt-1 font-mono">500.000 VNĐ</span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500">
                  Lệ phí xét tuyển theo Mục IV.3 Thông báo số 07/TB-ĐHV
                </div>
              </div>

              {/* Right Column: Bank Details & Verification Button */}
              <div className="space-y-5">
                <div className="space-y-1">
                  <h5 className="font-extrabold text-base text-slate-900">
                    Tài Khoản Thu Lệ Phí Tuyển Sinh Trường Đại Học Vinh
                  </h5>
                  <p className="text-xs text-slate-600">
                    Nộp cùng hồ sơ đăng ký dự tuyển hoặc chuyển khoản trực tuyến qua VietQR.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Đơn vị thụ hưởng:</span>
                    <strong className="text-slate-900 text-right">{vlvhPaymentConfig.accountHolder}</strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Số tài khoản:</span>
                    <strong className="font-mono text-sky-900 text-sm">{vlvhPaymentConfig.accountNumber}</strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Ngân hàng:</span>
                    <strong className="text-slate-900">{vlvhPaymentConfig.bankName} ({vlvhPaymentConfig.branch})</strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Số tiền lệ phí:</span>
                    <strong className="text-emerald-700 font-extrabold text-sm">500.000 VNĐ</strong>
                  </div>

                  <div className="py-1">
                    <span className="text-slate-500 block mb-1">Cú pháp chuyển khoản:</span>
                    <div className="p-2.5 bg-slate-900 text-amber-400 font-mono font-bold rounded-lg text-xs break-all select-all">
                      {transferContent}
                    </div>
                  </div>
                </div>

                {/* Instant Verification Simulation Button */}
                {!isPaid ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      disabled={isSimulatingPayment}
                      onClick={handleSimulatePaymentSuccess}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs disabled:opacity-50"
                    >
                      {isSimulatingPayment ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Đang đối soát giao dịch ngân hàng...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mô Phỏng: Quét QR & Thanh Toán 500.000đ Thành Công</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-500 text-center">
                      (Bấm nút trên để xác nhận thu lệ phí và hoàn thiện hồ sơ vào hệ thống)
                    </p>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Đã hoàn tất nộp hồ sơ và lệ phí! Mã hồ sơ: {generatedApplicant.applicationCode}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsTemplatesModalOpen(true)}
                      className="w-full py-2.5 bg-sky-900 hover:bg-sky-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-amber-300" />
                      <span>Xem & In Phiếu Đăng Ký Đã Điền</span>
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-900 font-bold"
              >
                ← Đăng ký hồ sơ khác
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setStudentName('');
                  setIdCardNumber('');
                  setPhoneNumber('');
                  setIsPaid(false);
                }}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Làm mới form
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Templates Modal */}
      <VLVHTemplatesModal 
        isOpen={isTemplatesModalOpen} 
        onClose={() => setIsTemplatesModalOpen(false)} 
      />

    </div>
  );
};
