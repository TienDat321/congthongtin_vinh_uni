import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  School, 
  MapPin, 
  ShieldCheck, 
  RefreshCw,
  Eye,
  Check,
  Building,
  Image as ImageIcon
} from 'lucide-react';
import { THSPApplicantRecord, THSPGradeLevel } from '../../types/thsp';
import { initialTHSPQuotas } from '../../data/thspMockData';
import { THSPNotificationPreviewModal } from './THSPNotificationPreviewModal';

interface THSPRegistrationFormProps {
  defaultGrade?: THSPGradeLevel;
  isOpenRegistration?: boolean;
  onSuccessRegister?: (applicant: THSPApplicantRecord) => void;
}

export const THSPRegistrationForm: React.FC<THSPRegistrationFormProps> = ({
  defaultGrade = 'lop-6',
  isOpenRegistration = true,
  onSuccessRegister
}) => {
  // Form Steps: 1: Fill Info, 2: Upload Documents, 3: VietQR Payment & Confirmation
  const [step, setStep] = useState<number>(1);
  const [selectedGrade, setSelectedGrade] = useState<THSPGradeLevel>(
    defaultGrade === 'all' ? 'lop-6' : defaultGrade
  );

  // Form Fields
  const [studentName, setStudentName] = useState('');
  const [birthDate, setBirthDate] = useState('2015-05-15');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [campus, setCampus] = useState('Cơ sở 1 (182 Lê Duẩn, TP. Vinh)');
  const [currentSchool, setCurrentSchool] = useState('');
  const [address, setAddress] = useState('');

  // Parent Info
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [isVinhUniStaff, setIsVinhUniStaff] = useState(false);
  const [staffDepartment, setStaffDepartment] = useState('');

  // Uploaded Files Simulator
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);
  const [birthCertFileName, setBirthCertFileName] = useState<string | null>(null);
  const [transcriptFileName, setTranscriptFileName] = useState<string | null>(null);
  const [priorityCertFileName, setPriorityCertFileName] = useState<string | null>(null);

  // Payment State & Generated Applicant Record
  const [generatedApplicant, setGeneratedApplicant] = useState<THSPApplicantRecord | null>(null);
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [previewNotificationOpen, setPreviewNotificationOpen] = useState(false);

  // If registrations are officially closed
  if (!isOpenRegistration) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-4 max-w-xl mx-auto shadow-xs">
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mx-auto">
          <Calendar className="w-7 h-7 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Cổng Đăng Ký Trực Tuyến Đang Tạm Đóng</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Thời hạn đăng ký trực tuyến theo quy định hiện tại đã hết hoặc chưa mở đợt tiếp theo. Quý phụ huynh vui lòng liên hệ Văn phòng tuyển sinh Trường Thực hành Sư phạm (0238 3855.452) để được hỗ trợ.
        </p>
      </div>
    );
  }

  // Handle proceed to Step 2
  const handleProceedToUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentPhone.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên học sinh và Số điện thoại phụ huynh!');
      return;
    }
    setStep(2);
  };

  // Handle generate VietQR & proceed to Step 3
  const handleProceedToPayment = () => {
    // Generate unique application code
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const gradeCode = selectedGrade === 'mam-non' ? 'MN' : selectedGrade === 'lop-1' ? 'L1' : selectedGrade === 'lop-6' ? 'K6' : 'C3';
    const appCode = `THSP2026-${gradeCode}-${randomSuffix}`;

    const targetQuota = initialTHSPQuotas.find(q => q.gradeLevel === selectedGrade);

    const record: THSPApplicantRecord = {
      id: `app-${Date.now()}`,
      applicationCode: appCode,
      studentName: studentName.trim(),
      birthDate: birthDate,
      gender: gender,
      gradeLevel: selectedGrade as any,
      targetGradeName: targetQuota ? targetQuota.gradeName : 'Hồ sơ tuyển sinh',
      campusPreference: campus,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      parentEmail: parentEmail.trim() || 'phuhuynh@email.com',
      currentSchool: currentSchool.trim() || 'Trường phổ thông',
      registrationDate: new Date().toISOString().split('T')[0],
      feeAmount: 300000,
      paymentStatus: 'PENDING',
      documents: {
        avatarUrl: avatarFileName ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' : undefined,
        birthCertUrl: birthCertFileName || undefined,
        transcriptUrl: transcriptFileName || undefined,
        priorityProofUrl: priorityCertFileName || undefined
      },
      admissionStatus: 'PENDING_EXAM'
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
          paymentRef: `VIETQR.${Date.now().toString().slice(-8)}`
        };
        setGeneratedApplicant(updated);
        if (onSuccessRegister) {
          onSuccessRegister(updated);
        }
      }
    }, 1200);
  };

  // VietQR Transfer description format
  const transferContent = generatedApplicant 
    ? `THSP2026 ${generatedApplicant.applicationCode} ${generatedApplicant.studentName.toUpperCase()}`
    : 'THSP2026 HOSO';

  // Bank Info from PDF extraction
  const bankInfo = {
    bankName: 'BIDV — Ngân hàng TMCP Đầu tư & Phát triển Việt Nam',
    branch: 'Chi nhánh Nghệ An',
    accountNumber: '51010001234567',
    accountHolder: 'TRUONG THUC HANH SU PHAM - DAI HOC VINH',
    fee: 300000
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Form Wizard Navigation */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Trình sinh form trực tuyến trích xuất từ PDF</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Đăng Ký Tuyển Sinh Trực Tuyến Năm Học 2026 - 2027
          </h3>
          <p className="text-xs sm:text-sm text-sky-200">
            Trường Thực hành Sư phạm — Trường Đại học Vinh (Tích hợp quét mã VietQR tự động)
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 shrink-0">
          {[
            { num: 1, label: 'Thông tin' },
            { num: 2, label: 'Hồ sơ minh chứng' },
            { num: 3, label: 'Thanh toán VietQR' }
          ].map((s) => (
            <div 
              key={s.num} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === s.num 
                  ? 'bg-amber-400 text-slate-950 shadow-md' 
                  : step > s.num 
                  ? 'bg-emerald-600/80 text-white' 
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

        {/* ================= STEP 1: FILL STUDENT & PARENT INFO ================= */}
        {step === 1 && (
          <form onSubmit={handleProceedToUpload} className="space-y-8">
            
            {/* Grade Level Selection Buttons */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. Chọn Khối Lớp Dự Tuyển:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'mam-non', name: 'Mầm non', sub: 'Nhà trẻ & MG (2-5 tuổi)' },
                  { id: 'lop-1', name: 'Lớp 1 Tiểu học', sub: 'Trẻ sinh năm 2020' },
                  { id: 'lop-6', name: 'Lớp 6 THCS CLC', sub: 'Khảo sát 3 môn' },
                  { id: 'lop-10-11', name: 'Lớp 10 & 11 THPT', sub: 'Xét tuyển điểm thi' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedGrade(item.id as any)}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      selectedGrade === item.id 
                        ? 'border-sky-900 bg-sky-50 text-sky-950 shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-sm">{item.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Student Info Section */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-sky-800" />
                <span>2. Thông tin Thí sinh / Học sinh</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700">Họ và tên học sinh *</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Vd: LÊ MINH ANH"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none uppercase font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Giới tính *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
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
                  <label className="font-bold text-slate-700">Cơ sở học tập nguyện vọng *</label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Cơ sở 1 (182 Lê Duẩn, TP. Vinh)">Cơ sở 1 (182 Lê Duẩn, Bến Thủy)</option>
                    <option value="Cơ sở 2 (Xã Nghi Ân, TP. Vinh)">Cơ sở 2 (Xã Nghi Ân, TP. Vinh)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Trường mầm non/tiểu học đang học</label>
                  <input
                    type="text"
                    value={currentSchool}
                    onChange={(e) => setCurrentSchool(e.target.value)}
                    placeholder="Vd: Tiểu học Lê Mao"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="font-bold text-slate-700">Địa chỉ thường trú / Nơi ở hiện nay</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Vd: Số 45 Đường Nguyễn Du, Phường Bến Thủy, TP. Vinh, Nghệ An"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Parent Info Section */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-800" />
                <span>3. Thông tin Phụ huynh & Diện Ưu tiên</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Họ tên Cha/Mẹ/Người giám hộ *</label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Vd: Nguyễn Văn A"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Số điện thoại liên hệ *</label>
                  <input
                    type="tel"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="Vd: 0912345678"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email nhận kết quả và mã QR *</label>
                  <input
                    type="email"
                    required
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    placeholder="phuhuynh@gmail.com"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* VinhUni Staff Priority Checkbox */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVinhUniStaff}
                    onChange={(e) => setIsVinhUniStaff(e.target.checked)}
                    className="w-4 h-4 text-sky-900 rounded focus:ring-sky-500"
                  />
                  <span className="text-xs font-bold text-amber-950">
                    Học sinh thuộc diện con ruột Cán bộ, Giảng viên, Viên chức Trường Đại học Vinh (Ưu tiên xét tuyển & Giảm 50% học phí)
                  </span>
                </label>

                {isVinhUniStaff && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={staffDepartment}
                      onChange={(e) => setStaffDepartment(e.target.value)}
                      placeholder="Ghi rõ Phòng / Khoa / Viện công tác tại Trường Đại học Vinh"
                      className="w-full p-2.5 rounded-lg border border-amber-300 bg-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button to Step 2 */}
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
                Tải Lên Hồ Sơ & Minh Chứng Số Hóa (Trích xuất từ văn bản tuyển sinh)
              </h4>
              <p className="text-xs text-slate-600">
                Phụ huynh chuẩn bị ảnh chụp rõ nét hoặc file scan PDF theo danh mục quy định.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* 1. Ảnh chân dung 3x4 */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-sky-700" />
                    <span>1. Ảnh thẻ chân dung 3x4 *</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Bắt buộc</span>
                </div>
                <p className="text-[11px] text-slate-500">Chụp trong vòng 6 tháng gần nhất, rõ mặt, phông nền xanh hoặc trắng.</p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-white transition-colors">
                  {avatarFileName ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                      <span className="font-medium truncate">{avatarFileName}</span>
                      <button onClick={() => setAvatarFileName(null)} className="text-red-500 font-bold text-xs">Xóa</button>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setAvatarFileName('ANH_THE_3X4_LE_MINH_ANH.JPG')}
                      className="text-sky-800 font-bold hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Chọn file ảnh tải lên (JPG/PNG)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Bản sao Giấy khai sinh */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-700" />
                    <span>2. Bản sao Giấy khai sinh hợp lệ *</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Bắt buộc</span>
                </div>
                <p className="text-[11px] text-slate-500">Bản sao công chứng hoặc bản chụp từ bản chính rõ nét.</p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-white transition-colors">
                  {birthCertFileName ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                      <span className="font-medium truncate">{birthCertFileName}</span>
                      <button onClick={() => setBirthCertFileName(null)} className="text-red-500 font-bold text-xs">Xóa</button>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setBirthCertFileName('GIAY_KHAI_SINH_BAN_SAO.PDF')}
                      className="text-sky-800 font-bold hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Chọn file giấy khai sinh (PDF/Ảnh)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Học bạ / Bảng điểm */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-700" />
                    <span>3. Học bạ / Bảng ghi kết quả rèn luyện *</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Bắt buộc Lớp 6/10</span>
                </div>
                <p className="text-[11px] text-slate-500">Bản sao học bạ 5 năm tiểu học có xác nhận của trường.</p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-white transition-colors">
                  {transcriptFileName ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                      <span className="font-medium truncate">{transcriptFileName}</span>
                      <button onClick={() => setTranscriptFileName(null)} className="text-red-500 font-bold text-xs">Xóa</button>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setTranscriptFileName('HOC_BA_TIEU_HOC_SO_HOA.PDF')}
                      className="text-sky-800 font-bold hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Chọn file học bạ số hóa</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 4. Minh chứng ưu tiên */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>4. Minh chứng Ưu tiên (HSG / Flyers / Con CBVC)</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Tùy chọn</span>
                </div>
                <p className="text-[11px] text-slate-500">Chứng chỉ ngoại ngữ tiếng Anh hoặc giấy xác nhận công tác ĐHV.</p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-white transition-colors">
                  {priorityCertFileName ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                      <span className="font-medium truncate">{priorityCertFileName}</span>
                      <button onClick={() => setPriorityCertFileName(null)} className="text-red-500 font-bold text-xs">Xóa</button>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setPriorityCertFileName('CHUNG_CHI_CAMBRIDGE_FLYERS_14_KHIEN.PDF')}
                      className="text-sky-800 font-bold hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Chọn minh chứng ưu tiên (nếu có)</span>
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
                <span>Xác nhận hồ sơ & Tạo mã VietQR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: VIETQR GENERATOR & CONFIRMATION ================= */}
        {step === 3 && generatedApplicant && (
          <div className="space-y-8">
            
            {/* Header Success / Code Banner */}
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block">
                  Đã Khởi Tạo Hồ Sơ Thành Công
                </span>
                <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                  Thí sinh: <span className="text-sky-950">{generatedApplicant.studentName}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Khối: <strong>{generatedApplicant.targetGradeName}</strong> · Cơ sở: {generatedApplicant.campusPreference}
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-sky-200 sm:pl-6">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">Mã Hồ Sơ Của Bạn:</span>
                <span className="text-xl font-extrabold font-mono text-sky-900 bg-white px-3 py-1 rounded-lg border border-sky-300 shadow-xs inline-block mt-0.5">
                  {generatedApplicant.applicationCode}
                </span>
              </div>
            </div>

            {/* VietQR Payment Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200">
              
              {/* Left Column: Napas VietQR Visual Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col items-center text-center space-y-4">
                <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sky-900 text-xs tracking-wider">VietQR</span>
                    <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.5 rounded">Napas 247</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700">300.000 VNĐ</span>
                </div>

                {/* QR Code Canvas Representation */}
                <div className="relative p-3 bg-white border-2 border-slate-800 rounded-2xl shadow-inner">
                  {/* Generated QR Image or Scalable SVG Pattern */}
                  <img
                    src={`https://api.vietqr.io/image/970418-51010001234567-compact2.jpg?amount=300000&addInfo=${encodeURIComponent(transferContent)}&accountName=TRUONG%20THUC%20HANH%20SU%20PHAM%20-%20DHV`}
                    alt="Mã VietQR nộp lệ phí tuyển sinh"
                    className="w-56 h-56 object-contain rounded-lg"
                    onError={(e: any) => {
                      // Fallback SVG if external VietQR server fails
                      e.target.style.display = 'none';
                      const fallback = document.getElementById('vietqr-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />

                  {/* Fallback container */}
                  <div id="vietqr-fallback" style={{ display: 'none' }} className="w-56 h-56 bg-slate-900 rounded-lg flex flex-col items-center justify-center text-white p-4 text-center space-y-2">
                    <QrCode className="w-16 h-16 text-amber-400" />
                    <span className="text-xs font-mono font-bold">MÃ VIETQR ĐIỆN TỬ</span>
                    <span className="text-[10px] text-slate-300 font-mono break-all">{transferContent}</span>
                  </div>

                  {isPaid && (
                    <div className="absolute inset-0 bg-emerald-950/85 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-white p-4 animate-in fade-in">
                      <CheckCircle2 className="w-14 h-14 text-emerald-400 mb-2" />
                      <span className="font-extrabold text-base">ĐÃ THANH TOÁN</span>
                      <span className="text-xs text-emerald-200 mt-1 font-mono">Xác thực tức thì</span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quét bằng ứng dụng của bất kỳ ngân hàng nào (Vietcombank, BIDV, Agribank, MB...)</span>
                </div>
              </div>

              {/* Right Column: Bank Account Details & Action Buttons */}
              <div className="space-y-5">
                <div className="space-y-1">
                  <h5 className="font-extrabold text-base text-slate-900">
                    Thông Tin Chuyển Khoản Trích Xuất Từ Văn Bản
                  </h5>
                  <p className="text-xs text-slate-600">
                    Hệ thống tự động điền sẵn số tiền và mã nội dung chuyển khoản.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Ngân hàng thụ hưởng:</span>
                    <strong className="text-slate-900 text-right">{bankInfo.bankName} ({bankInfo.branch})</strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Số tài khoản:</span>
                    <strong className="font-mono text-sky-900 text-sm">{bankInfo.accountNumber}</strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Chủ tài khoản:</span>
                    <strong className="text-slate-900">{bankInfo.accountHolder}</strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Lệ phí đăng ký:</span>
                    <strong className="text-emerald-700 font-extrabold text-sm">300.000 VNĐ</strong>
                  </div>

                  <div className="py-1">
                    <span className="text-slate-500 block mb-1">Cú pháp chuyển khoản bắt buộc:</span>
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
                          <span>Đang nhận tín hiệu Webhook SmartBanking...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mô Phỏng: Quét QR & Chuyển Khoản Thành Công</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-500 text-center">
                      (Nhấn nút trên để demo ngay quy trình xác thực tự động và nhận thông báo đa kênh)
                    </p>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Xác nhận nộp lệ phí thành công! Hồ sơ đã được lưu trữ.</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPreviewNotificationOpen(true)}
                      className="w-full py-2.5 bg-sky-900 hover:bg-sky-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-amber-300" />
                      <span>Xem Trước Phản Hồi Tự Động (Email & SMS)</span>
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
                  setParentPhone('');
                  setIsPaid(false);
                }}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Làm mới biểu mẫu
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Notification Preview Modal */}
      {generatedApplicant && (
        <THSPNotificationPreviewModal
          isOpen={previewNotificationOpen}
          onClose={() => setPreviewNotificationOpen(false)}
          applicant={generatedApplicant}
        />
      )}

    </div>
  );
};
