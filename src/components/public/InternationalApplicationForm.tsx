import React, { useState } from 'react';
import { 
  Globe, 
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
  AlertCircle 
} from 'lucide-react';
import { 
  internationalUndergraduateMajors, 
  internationalMasterMajors, 
  internationalDoctoralMajors, 
  initialInternationalApplicants 
} from '../../data/internationalMockData';
import { LanguageMode } from '../../types/international';

interface InternationalApplicationFormProps {
  lang: LanguageMode;
}

export const InternationalApplicationForm: React.FC<InternationalApplicationFormProps> = ({ lang }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submittedApp, setSubmittedApp] = useState<any | null>(null);

  // Form State
  const [degreeLevel, setDegreeLevel] = useState<'undergraduate' | 'master' | 'doctoral'>('undergraduate');
  const [majorCode, setMajorCode] = useState<string>('7480201');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('Lào (Lao PDR)');
  const [passportNumber, setPassportNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [scholarshipType, setScholarshipType] = useState<'agreement' | 'province' | 'self-funded'>('agreement');
  const [needsPrep, setNeedsPrep] = useState<boolean>(true);
  const [vietnameseLevel, setVietnameseLevel] = useState('none');

  // File uploads checklist simulated
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: boolean }>({
    passport: true,
    transcript: true,
    health: true,
    photo: true
  });

  const currentMajors = degreeLevel === 'undergraduate' 
    ? internationalUndergraduateMajors 
    : degreeLevel === 'master' 
    ? internationalMasterMajors 
    : internationalDoctoralMajors;

  const selectedMajorObj = currentMajors.find(m => m.code === majorCode) || currentMajors[0];

  const handleFillDemo = (applicantIndex: number) => {
    const demo = initialInternationalApplicants[applicantIndex];
    if (!demo) return;
    setFullName(demo.fullName);
    setGender(demo.gender);
    setDob(demo.dob);
    setNationality(demo.nationality);
    setPassportNumber(demo.passportNumber);
    setEmail(demo.email);
    setPhone(demo.phone);
    setDegreeLevel(demo.appliedDegree);
    setMajorCode(demo.appliedMajorCode);
    setNeedsPrep(demo.needsVietnamesePrep);
    setScholarshipType(demo.scholarshipType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = `VINHUNI-INTL-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord = {
      code: newCode,
      fullName: fullName.toUpperCase(),
      passportNumber,
      degreeLevel,
      majorName: lang === 'en' ? selectedMajorObj.nameEn : lang === 'lao' ? selectedMajorObj.nameLao : selectedMajorObj.nameVi,
      majorCode: selectedMajorObj.code,
      nationality,
      email,
      phone,
      needsPrep,
      scholarshipType,
      date: new Date().toLocaleDateString('vi-VN')
    };
    setSubmittedApp(newRecord);
    setStep(3);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {lang === 'en' 
                ? 'Online International Admission Portal' 
                : lang === 'lao' 
                ? 'ລະບົບລົງທະບຽນອອນລາຍສຳລັບນັກສຶກສາຕ່າງປະເທດ' 
                : 'Cổng Đăng Ký Xét Tuyển Trực Tuyến Lưu Học Sinh Quốc Tế'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === 'en' 
              ? 'International Student Application Form 2026' 
              : lang === 'lao' 
              ? 'ໃບສະໝັກເຂົ້າຮຽນນັກສຶກສາຕ່າງປະເທດ ປີ 2026' 
              : 'Phiếu Đăng Ký Dự Tuyển Sinh Viên Quốc Tế Năm 2026'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'en'
              ? 'Submit your profile for undergraduate, master, and doctoral programs at Vinh University.'
              : lang === 'lao'
              ? 'ສົ່ງເອກະສານສະໝັກຮຽນລະດັບປະລິນຍາຕີ, ໂທ ແລະ ເອກ ທີ່ມະຫາວິທະຍາໄລວິນ.'
              : 'Nộp hồ sơ trực tuyến đối với lưu học sinh Lào và sinh viên quốc tế các bậc học.'}
          </p>
        </div>

        {/* Quick Demo Fill Buttons */}
        {step !== 3 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">Demo Fill:</span>
            <button
              type="button"
              onClick={() => handleFillDemo(0)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 cursor-pointer"
            >
              🇱🇦 Somxay (Lào - CNTT)
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo(2)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 cursor-pointer"
            >
              🇬🇧 Michael (Anh - ThS)
            </button>
          </div>
        )}
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center max-w-xl mx-auto">
        {[
          { num: 1, title: lang === 'en' ? 'Programme & Profile' : lang === 'lao' ? 'ສາຂາຮຽນ & ຂໍ້ມູນ' : 'Chương trình & Hồ sơ' },
          { num: 2, title: lang === 'en' ? 'Documents & Visa' : lang === 'lao' ? 'ເອກະສານ' : 'Minh chứng & Hộ chiếu' },
          { num: 3, title: lang === 'en' ? 'Confirmation & Code' : lang === 'lao' ? 'ຢືນຢັນ' : 'Xác nhận & Cấp mã' }
        ].map((s, idx) => (
          <div key={s.num} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= s.num ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {step > s.num ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : s.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${
                step >= s.num ? 'text-slate-900' : 'text-slate-400'
              }`}>
                {s.title}
              </span>
            </div>
            {idx < 2 && (
              <div className={`h-0.5 flex-1 mx-3 ${
                step > s.num ? 'bg-indigo-900' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1: Programme & Personal Information */}
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6 max-w-3xl mx-auto text-xs">
          
          {/* Degree Selection */}
          <div className="space-y-3">
            <label className="font-extrabold text-slate-900 uppercase tracking-wide block">
              1. {lang === 'en' ? 'Select Degree Level' : lang === 'lao' ? 'ເລືອກລະດັບການສຶກສາ' : 'Bậc đào tạo đăng ký dự tuyển *'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'undergraduate', name: 'Undergraduate (54 Majors)', nameVi: 'Bậc Đại học (54 Ngành)', nameLao: 'ປະລິນຍາຕີ (54 ສາຂາ)', fee: '500 USD/year' },
                { id: 'master', name: "Master's Degree (36 Majors)", nameVi: 'Bậc Thạc sĩ (36 Ngành)', nameLao: 'ປະລິນຍາໂທ (36 ສາຂາ)', fee: '800 USD/year' },
                { id: 'doctoral', name: 'Doctoral / PhD (16 Majors)', nameVi: 'Bậc Tiến sĩ (16 Ngành)', nameLao: 'ປະລິນຍາເອກ (16 ສາຂາ)', fee: '1,000 USD/year' }
              ].map(deg => (
                <div
                  key={deg.id}
                  onClick={() => {
                    setDegreeLevel(deg.id as any);
                    const list = deg.id === 'undergraduate' ? internationalUndergraduateMajors : deg.id === 'master' ? internationalMasterMajors : internationalDoctoralMajors;
                    setMajorCode(list[0].code);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-1 ${
                    degreeLevel === deg.id 
                      ? 'border-indigo-900 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-slate-900 text-xs">
                    {lang === 'en' ? deg.name : lang === 'lao' ? deg.nameLao : deg.nameVi}
                  </div>
                  <div className="font-mono text-indigo-700 font-extrabold text-[11px]">
                    {deg.fee}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Major Selection */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-slate-900 block">
              2. {lang === 'en' ? 'Select Desired Major *' : lang === 'lao' ? 'ເລືອກສາຂາວິຊາຮຽນ *' : 'Ngành đào tạo mong muốn *'}
            </label>
            <select
              value={majorCode}
              onChange={(e) => setMajorCode(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 font-semibold bg-white text-xs focus:ring-2 focus:ring-indigo-500"
            >
              {currentMajors.map(m => (
                <option key={m.code} value={m.code}>
                  [{m.code}] {lang === 'en' ? m.nameEn : lang === 'lao' ? m.nameLao : m.nameVi} — {m.durationYears}
                </option>
              ))}
            </select>
          </div>

          {/* Vietnamese Language Preparation */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>
                  {lang === 'en' ? 'Vietnamese Language Requirement (Mục 1.2)' : lang === 'lao' ? 'ເງື່ອນໄຂພາສາຫວຽດ' : 'Yêu cầu Trình độ Tiếng Việt (Mục 1.2)'}
                </span>
              </span>
              <span className="bg-amber-200/60 text-amber-900 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                500 USD / năm
              </span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              {lang === 'en'
                ? 'All foreign students must have a Vietnamese B2 certificate. If you do not have one, you will be enrolled in a 1-year preparatory Vietnamese language course at Vinh University.'
                : lang === 'lao'
                ? 'ນັກສຶກສາຕ່າງປະເທດຕ້ອງມີໃບຢັ້ງຢືນພາສາຫວຽດ B2. ຖ້າບໍ່ມີ ຕ້ອງຮຽນພາສາຫວຽດກຽມຄວາມພ້ອມ 01 ປີ ທີ່ມະຫາວິທະຍາໄລວິນ.'
                : 'Thí sinh quốc tế phải đạt chuẩn B2 tiếng Việt. Nếu chưa có, thí sinh sẽ đăng ký học 01 năm Dự bị Tiếng Việt trước khi vào chuyên ngành.'}
            </p>
            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                <input
                  type="radio"
                  name="prep"
                  checked={needsPrep}
                  onChange={() => setNeedsPrep(true)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span>{lang === 'en' ? 'I need 1-year Vietnamese prep course' : lang === 'lao' ? 'ຂ້າພະເຈົ້າຕ້ອງການຮຽນພາສາຫວຽດ 1 ປີ' : 'Tôi cần học 01 năm Dự bị Tiếng Việt'}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                <input
                  type="radio"
                  name="prep"
                  checked={!needsPrep}
                  onChange={() => setNeedsPrep(false)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span>{lang === 'en' ? 'I already have Vietnamese B2 certificate' : lang === 'lao' ? 'ຂ້າພະເຈົ້າມີໃບຢັ້ງຢືນ B2 ແລ້ວ' : 'Tôi đã có chứng chỉ B2 Tiếng Việt'}</span>
              </label>
            </div>
          </div>

          {/* Scholarship / Financial Mode */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-slate-900 block">
              3. {lang === 'en' ? 'Scholarship / Study Category' : lang === 'lao' ? 'ປະເພດທຶນການສຶກສາ' : 'Diện tuyển sinh & Học bổng *'}
            </label>
            <select
              value={scholarshipType}
              onChange={(e) => setScholarshipType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold bg-white text-xs"
            >
              <option value="agreement">
                {lang === 'en' ? 'Government Agreement Scholarship (Vietnam - Laos)' : lang === 'lao' ? 'ທຶນສັນຍາລັດຖະບານ (ຫວຽດນາມ - ລາວ)' : 'Học bổng Hiệp định Chính phủ Việt Nam - Lào (Miễn 100% học phí & KTX)'}
              </option>
              <option value="province">
                {lang === 'en' ? "Nghe An Province People's Committee Scholarship" : lang === 'lao' ? 'ທຶນອຸປະຖຳຂອງແຂວງເຫງະອານ' : 'Học bổng Tài trợ của UBND Tỉnh Nghệ An dành cho các tỉnh bạn Lào'}
              </option>
              <option value="self-funded">
                {lang === 'en' ? 'Self-Funded / MOU Cooperation (500 USD/year, 10 USD dorm)' : lang === 'lao' ? 'ທຶນຮ່ວມມື MOU ແລະ ນັກສຶກສາທຶນຕົນເອງ (500$/ປີ)' : 'Diện Tự túc / Thỏa thuận MOU (Học phí ưu đãi 500 USD/năm, KTX 10 USD/tháng)'}
              </option>
            </select>
          </div>

          {/* Personal Information */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <span className="font-extrabold text-slate-900 uppercase tracking-wide block">
              4. {lang === 'en' ? 'Applicant Identity Information' : lang === 'lao' ? 'ຂໍ້ມູນສ່ວນຕົວຂອງຜູ້ສະໝັກ' : 'Thông tin định danh thí sinh'}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  {lang === 'en' ? 'Full Name (as in passport) *' : lang === 'lao' ? 'ຊື່ ແລະ ນາມສະກຸນ (ຕາມ Passport) *' : 'Họ và tên (theo Hộ chiếu) *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g. SOMXAY VONGPHACHANH"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-bold uppercase focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  {lang === 'en' ? 'Passport Number *' : lang === 'lao' ? 'ເລກທີໜັງສືຜ່ານແດນ (Passport) *' : 'Số Hộ chiếu (Passport) *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g. P01982736"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  {lang === 'en' ? 'Nationality *' : lang === 'lao' ? 'ສັນຊາດ *' : 'Quốc tịch *'}
                </label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-bold bg-white"
                >
                  <option value="Lào (Lao PDR)">Lào (Lao PDR) 🇱🇦</option>
                  <option value="Campuchia (Cambodia)">Campuchia (Cambodia) 🇰🇭</option>
                  <option value="Thái Lan (Thailand)">Thái Lan (Thailand) 🇹🇭</option>
                  <option value="Trung Quốc (China)">Trung Quốc (China) 🇨🇳</option>
                  <option value="Hàn Quốc (South Korea)">Hàn Quốc (South Korea) 🇰🇷</option>
                  <option value="Vương Quốc Anh (United Kingdom)">Vương Quốc Anh (UK) 🇬🇧</option>
                  <option value="Pháp (France)">Pháp (France) 🇫🇷</option>
                  <option value="Khác (Other)">Quốc gia khác (Other)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  {lang === 'en' ? 'Date of Birth *' : lang === 'lao' ? 'ວັນເດືອນປີເກີດ *' : 'Ngày sinh *'}
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  {lang === 'en' ? 'Email Address *' : lang === 'lao' ? 'ອີເມວຕິດຕໍ່ *' : 'Địa chỉ Email *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  {lang === 'en' ? 'Phone / WhatsApp / Zalo *' : lang === 'lao' ? 'ເບີໂທລະສັບຕິດຕໍ່ *' : 'Số điện thoại / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+856 20 55123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-extrabold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm text-xs"
            >
              <span>{lang === 'en' ? 'Continue to Document Upload' : lang === 'lao' ? 'ຕໍ່ໄປ: ອັບໂຫຼດເອກະສານ' : 'Tiếp tục: Đính kèm Hồ sơ & Minh chứng'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Document Checklist Upload */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto text-xs">
          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-slate-900">
              {lang === 'en' ? 'Upload Application Documents (Mục 3)' : lang === 'lao' ? 'ອັບໂຫຼດເອກະສານປະກອບ (ໝວດທີ 3)' : 'Đính kèm Danh mục 13 Hồ sơ Quy định (Mục 3)'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'en' 
                ? 'All files should be in PDF or clear image format, translated and certified into Vietnamese or English.'
                : lang === 'lao'
                ? 'ເອກະສານທຸກຢ່າງຕ້ອງແປເປັນພາສາຫວຽດ ຫຼື ອັງກິດ ແລະ ມີການຢັ້ງຢືນຖືກຕ້ອງ.'
                : 'Các file đính kèm định dạng PDF/ảnh chụp rõ nét, có bản dịch thuật công chứng tiếng Việt hoặc tiếng Anh.'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'passport', title: lang === 'en' ? 'Passport (valid > 6 months)' : lang === 'lao' ? 'ໜັງສືຜ່ານແດນ (Passport)' : 'Bản chụp Hộ chiếu (còn hạn trên 6 tháng)', mandatory: true },
              { id: 'transcript', title: lang === 'en' ? 'Diploma & Academic Transcript' : lang === 'lao' ? 'ໃບປະກາສະນີຍະບັດ ແລະ ປື້ມຕິດຕາມ' : 'Bằng tốt nghiệp & Học bạ/Bảng điểm', mandatory: true },
              { id: 'health', title: lang === 'en' ? 'Health Certificate (< 6 months)' : lang === 'lao' ? 'ໃບກວດສຸຂະພາບ (< 6 ເດືອນ)' : 'Giấy khám sức khỏe (trong vòng 6 tháng)', mandatory: true },
              { id: 'photo', title: lang === 'en' ? '08 Passport Photos (3x4 cm)' : lang === 'lao' ? 'ຮູບ 3x4 ຈຳນວນ 8 ໃບ' : '08 ảnh chân dung 3x4 phông nền trắng', mandatory: true },
              { id: 'financial', title: lang === 'en' ? 'Financial Statement / Guarantee' : lang === 'lao' ? 'ໃບຮັບປະກັນດ້ານການເງິນ' : 'Giấy xác nhận bảo lãnh tài chính', mandatory: false }
            ].map(doc => (
              <div 
                key={doc.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-xs">
                      {doc.title} {doc.mandatory && <span className="text-rose-600">*</span>}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {uploadedDocs[doc.id] ? 'file_scanned_verified.pdf (1.8 MB)' : 'Chưa tải file'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setUploadedDocs(prev => ({ ...prev, [doc.id]: !prev[doc.id] }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    uploadedDocs[doc.id] 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{uploadedDocs[doc.id] ? 'Đã tải lên ✓' : 'Tải file'}</span>
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-700" />
              <span>Cam kết hồ sơ nhập học:</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              Tôi cam đoan toàn bộ thông tin kê khai là chính xác và trung thực. Khi nhập học chính thức, tôi sẽ nộp bản gốc các văn bằng, chứng chỉ và hộ chiếu để Nhà trường đối chiếu theo quy định của Bộ GD&ĐT Việt Nam.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
            >
              ← Quay lại
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>{lang === 'en' ? 'Submit Official Application' : lang === 'lao' ? 'ສົ່ງໃບສະໝັກຢ່າງເປັນທາງການ' : 'Nộp Hồ Sơ Đăng Ký Chính Thức'}</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Submission Confirmation & Printable Slip */}
      {step === 3 && submittedApp && (
        <div className="space-y-6 max-w-2xl mx-auto text-xs animate-in zoom-in-95 duration-200">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {lang === 'en' ? 'Application Submitted Successfully!' : lang === 'lao' ? 'ສົ່ງໃບສະໝັກສຳເລັດແລ້ວ!' : 'Nộp Hồ Sơ Tuyển Sinh Thành Công!'}
            </h3>
            <p className="text-slate-600 text-xs">
              {lang === 'en'
                ? 'Your profile has been forwarded to the Department of Research & International Affairs (Dr. Phan Van Tien).'
                : lang === 'lao'
                ? 'ເອກະສານຂອງທ່ານໄດ້ສົ່ງໄປຍັງຫ້ອງການວິທະຍາສາດ ແລະ ການຮ່ວມມືສາກົນແລ້ວ.'
                : 'Hồ sơ đã được chuyển tiếp đến Phòng Khoa học & Hợp tác Quốc tế (TS. Phan Văn Tiến) để thẩm định.'}
            </p>
          </div>

          {/* Application Slip Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border-2 border-indigo-200 space-y-4 shadow-sm font-sans">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">MÃ HỒ SƠ QUỐC TẾ / APPLICATION CODE</span>
                <span className="font-mono font-extrabold text-base text-indigo-950">{submittedApp.code}</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                ĐÃ TIẾP NHẬN / RECEIVED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Họ và tên thí sinh:</span>
                <strong className="text-slate-900">{submittedApp.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Số Hộ chiếu (Passport):</span>
                <strong className="text-slate-900 font-mono">{submittedApp.passportNumber}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Quốc tịch / Country:</span>
                <strong className="text-slate-900">{submittedApp.nationality}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Bậc đào tạo đăng ký:</span>
                <strong className="text-indigo-900 uppercase font-mono">{submittedApp.degreeLevel}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 text-[11px] block">Ngành đăng ký xét tuyển:</span>
                <strong className="text-slate-900">{submittedApp.majorName}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Lớp Dự bị Tiếng Việt:</span>
                <strong className="text-amber-800">{submittedApp.needsPrep ? 'Cần học 1 năm (500 USD)' : 'Miễn (Đã có chứng chỉ B2)'}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Ngày nộp hồ sơ:</span>
                <strong className="text-slate-900 font-mono">{submittedApp.date}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Đơn vị phụ trách: Phòng Khoa học & Hợp tác Quốc tế</span>
              <span className="font-mono">Hotline: +84 917012255</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
            >
              <Printer className="w-4 h-4" />
              <span>In Phiếu Đăng Ký (Print Slip)</span>
            </button>

            <button
              onClick={() => {
                setStep(1);
                setSubmittedApp(null);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Nộp hồ sơ khác
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
