import React, { useState } from 'react';
import { 
  Globe, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Search, 
  Building, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Download, 
  Printer, 
  Sparkles, 
  Clock, 
  Users, 
  Award,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { 
  internationalUndergraduateMajors, 
  internationalMasterMajors, 
  internationalDoctoralMajors, 
  internationalFees, 
  internationalScholarships, 
  internationalDocumentChecklist, 
  internationalContactOfficer 
} from '../../data/internationalMockData';
import { InternationalApplicationForm } from './InternationalApplicationForm';
import { InternationalResultLookup } from './InternationalResultLookup';
import { LanguageMode } from '../../types/international';

export const PublicInternational: React.FC = () => {
  const [lang, setLang] = useState<LanguageMode>('vi');
  const [activeTab, setActiveTab] = useState<'majors' | 'requirements' | 'fees' | 'register' | 'results' | 'facilities' | 'contact'>('majors');
  
  // Majors Filter State
  const [degreeFilter, setDegreeFilter] = useState<'all' | 'undergraduate' | 'master' | 'doctoral'>('undergraduate');
  const [searchMajor, setSearchMajor] = useState('');

  const displayedMajors = (
    degreeFilter === 'undergraduate' 
      ? internationalUndergraduateMajors 
      : degreeFilter === 'master' 
      ? internationalMasterMajors 
      : degreeFilter === 'doctoral'
      ? internationalDoctoralMajors
      : [...internationalUndergraduateMajors, ...internationalMasterMajors, ...internationalDoctoralMajors]
  ).filter(m => {
    const q = searchMajor.toLowerCase();
    return m.nameVi.toLowerCase().includes(q) ||
           m.nameEn.toLowerCase().includes(q) ||
           m.nameLao.toLowerCase().includes(q) ||
           m.code.includes(q);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Hero Banner with Multi-Language Switcher */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-5 max-w-4xl">
          
          {/* Top badges & Language Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {lang === 'en' ? 'International Students Admission' : lang === 'lao' ? 'ຮັບສະໝັກນັກສຶກສາສາກົນ' : 'Tuyển Sinh Sinh Viên Quốc Tế'}
                </span>
              </span>

              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold">
                54 ĐH · 36 ThS · 16 TS
              </span>
            </div>

            {/* Language Toggle: VI - EN - LAO (Matches screenshots) */}
            <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setLang('vi')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  lang === 'vi' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🇻🇳 Tiếng Việt</span>
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  lang === 'en' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🇬🇧 English</span>
              </button>
              <button
                onClick={() => setLang('lao')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  lang === 'lao' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🇱🇦 ພາສາລາວ</span>
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {lang === 'en' 
                ? 'Admission of International Students — Vinh University' 
                : lang === 'lao' 
                ? 'ແຈ້ງການຮັບສະໝັກນັກສຶກສາຕ່າງປະເທດ — ມະຫາວິທະຍາໄລວິນ' 
                : 'Thông Báo Tuyển Sinh Lưu Học Sinh Quốc Tế — Trường Đại Học Vinh'}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed max-w-3xl">
              {lang === 'en'
                ? 'Welcoming international and Lao students across 54 undergraduate, 36 master\'s, and 16 doctoral programs. Comprehensive support including 1-year preparatory Vietnamese, modern dormitories, and Government / Provincial scholarships.'
                : lang === 'lao'
                ? 'ຍິນດີຕ້ອນຮັບນັກສຶກສາລາວ ແລະ ສາກົນ ເຂົ້າຮຽນ 54 ສາຂາປະລິນຍາຕີ, 36 ສາຂາປະລິນຍາໂທ ແລະ 16 ສາຂາປະລິນຍາເອກ. ມີຫຼັກສູດພາສາຫວຽດ 01 ປີ, ຫໍພັກທັນສະໄໝ ແລະ ທຶນການສຶກສາສັນຍາລັດຖະບານ / ແຂວງເຫງະອານ.'
                : 'Tiếp nhận và đào tạo lưu học sinh Lào và sinh viên quốc tế với 54 ngành đại học, 36 chuyên ngành thạc sĩ và 16 chuyên ngành tiến sĩ. Hỗ trợ đào tạo 1 năm dự bị tiếng Việt, ký túc xá khép kín 315 phòng và chính sách học bổng Hiệp định.'}
            </p>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Học phí Đại học / Prep</span>
              <strong className="text-amber-400 font-mono text-sm block">500 USD / năm</strong>
              <span className="text-[10px] text-slate-500">10 tháng / năm học</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Ký túc xá quốc tế</span>
              <strong className="text-emerald-400 font-mono text-sm block">10 USD / tháng</strong>
              <span className="text-[10px] text-slate-500">Phòng 4 SV · Free nước & điện</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Học phí Thạc sĩ & TS</span>
              <strong className="text-sky-300 font-mono text-sm block">800 - 1.000 USD</strong>
              <span className="text-[10px] text-slate-500">36 ThS · 16 Tiến sĩ</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Chuẩn tiếng Việt</span>
              <strong className="text-indigo-300 font-mono text-sm block">B2 hoặc Học 1 năm</strong>
              <span className="text-[10px] text-slate-500">Dự bị tại ĐH Vinh</span>
            </div>
          </div>

          {/* Quick CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setActiveTab('register')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer text-xs"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>{lang === 'en' ? 'Apply Online Now' : lang === 'lao' ? 'ລົງທະບຽນອອນລາຍ' : 'Đăng Ký Xét Tuyển Trực Tuyến'}</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer text-xs"
            >
              <Search className="w-4 h-4 text-indigo-300" />
              <span>{lang === 'en' ? 'Offer Letter Verification' : lang === 'lao' ? 'ກວດສອບຜົນຮັບຮຽນ' : 'Tra Cứu Thư Mời (Offer Letter)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('requirements')}
              className="bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{lang === 'en' ? '13 Required Documents' : lang === 'lao' ? '13 ເອກະສານປະກອບ' : 'Danh mục 13 Hồ sơ'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-slate-200 bg-white rounded-xl shadow-xs px-4 flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs">
        {[
          { id: 'majors', label: lang === 'en' ? 'Training Majors (54 ĐH / 36 ThS / 16 TS)' : lang === 'lao' ? 'ສາຂາວິຊາຮຽນ' : 'Danh Mục Ngành Đào Tạo (106 Ngành)', icon: BookOpen },
          { id: 'requirements', label: lang === 'en' ? 'Admission Requirements & 13 Documents' : lang === 'lao' ? 'ເງື່ອນໄຂ & ເອກະສານ' : 'Điều Kiện & 13 Hồ Sơ Quy Định', icon: CheckCircle2 },
          { id: 'fees', label: lang === 'en' ? 'Tuition, Dormitory & Scholarships' : lang === 'lao' ? 'ຄ່າຮຽນ & ທຶນການສຶກສາ' : 'Học Phí, Ký Túc Xá & Học Bổng', icon: Award },
          { id: 'register', label: lang === 'en' ? 'Online Application Form' : lang === 'lao' ? 'ແບບຟອມສະໝັກຮຽນ' : 'Đăng Ký Xét Tuyển Online', icon: FileText },
          { id: 'results', label: lang === 'en' ? 'Offer Letter Lookup' : lang === 'lao' ? 'ກວດສອບໃບແຈ້ງການ' : 'Tra Cứu Trúng Tuyển & Thư Mời', icon: Search },
          { id: 'facilities', label: lang === 'en' ? 'Campus & Dormitory (315 Rooms)' : lang === 'lao' ? 'ຫໍພັກ & ສິ່ງອຳນວຍ' : 'Cơ Sở Vật Chất & KTX 315 Phòng', icon: Building },
          { id: 'contact', label: lang === 'en' ? 'International Office Contact' : lang === 'lao' ? 'ຕິດຕໍ່ພົວພັນ' : 'Liên Hệ (Phòng KH & HTQT)', icon: Phone }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3.5 px-3 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-indigo-900 text-indigo-950 bg-indigo-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: MAJORS LIST (54 ĐH, 36 ThS, 16 TS) ================= */}
      {activeTab === 'majors' && (
        <div className="space-y-6">
          
          {/* Degree Filter and Search Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-500 uppercase">
                {lang === 'en' ? 'Degree Level:' : lang === 'lao' ? 'ລະດັບການສຶກສາ:' : 'Bậc đào tạo:'}
              </span>
              <button
                onClick={() => setDegreeFilter('undergraduate')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  degreeFilter === 'undergraduate' 
                    ? 'bg-indigo-900 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Đại học / Bachelor (54 ngành)
              </button>
              <button
                onClick={() => setDegreeFilter('master')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  degreeFilter === 'master' 
                    ? 'bg-indigo-900 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Thạc sĩ / Master (36 ngành)
              </button>
              <button
                onClick={() => setDegreeFilter('doctoral')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  degreeFilter === 'doctoral' 
                    ? 'bg-indigo-900 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tiến sĩ / PhD (16 ngành)
              </button>
              <button
                onClick={() => setDegreeFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  degreeFilter === 'all' 
                    ? 'bg-indigo-900 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tất cả (106 ngành)
              </button>
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={lang === 'en' ? 'Search major or code...' : 'Tìm ngành hoặc mã ngành...'}
                value={searchMajor}
                onChange={(e) => setSearchMajor(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Table of Majors */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">STT</th>
                    <th className="py-3 px-4 w-28">Mã ngành / Code</th>
                    <th className="py-3 px-4">Tên ngành Tiếng Việt</th>
                    <th className="py-3 px-4">English Name</th>
                    <th className="py-3 px-4">ຊື່ພາສາລາວ (Lao)</th>
                    <th className="py-3 px-4 w-24">Bậc học</th>
                    <th className="py-3 px-4 w-24 text-right">Đăng ký</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {displayedMajors.map((major, idx) => (
                    <tr key={major.code + idx} className="hover:bg-indigo-50/40 transition-colors">
                      <td className="py-3 px-4 text-center font-mono text-slate-400">{major.no}</td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-950">{major.code}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{major.nameVi}</td>
                      <td className="py-3 px-4 text-slate-700 italic">{major.nameEn}</td>
                      <td className="py-3 px-4 text-slate-800 font-medium">{major.nameLao}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          major.level === 'undergraduate' ? 'bg-sky-100 text-sky-800' :
                          major.level === 'master' ? 'bg-amber-100 text-amber-900' :
                          'bg-purple-100 text-purple-900'
                        }`}>
                          {major.level === 'undergraduate' ? 'Đại học' : major.level === 'master' ? 'Thạc sĩ' : 'Tiến sĩ'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setActiveTab('register')}
                          className="px-2.5 py-1 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-lg text-[11px] cursor-pointer"
                        >
                          Chọn
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>Hiển thị {displayedMajors.length} chuyên ngành đào tạo</span>
              <span>Học phí: 500 USD/năm (ĐH) · 800 USD/năm (ThS) · 1,000 USD/năm (TS)</span>
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 2: REQUIREMENTS & 13 DOCUMENTS CHECKLIST ================= */}
      {activeTab === 'requirements' && (
        <div className="space-y-6">
          
          {/* General Admission Requirements (Images 2 & 3) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                Mục 1 & 2 Thông báo Tuyển sinh Quốc tế
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                {lang === 'en' ? 'Enrollment Requirements & Qualification Criteria' : 'Điều Kiện Trình Độ & Tiêu Chuẩn Tiếp Nhận'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                <div className="font-extrabold text-indigo-950 text-sm flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-700" />
                  <span>1. Trình độ học vấn & Chuyên môn</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside leading-relaxed text-[11px]">
                  <li><strong>Bậc Đại học:</strong> Đã tốt nghiệp THPT hoặc tương đương theo quy định của pháp luật Việt Nam.</li>
                  <li><strong>Bậc Thạc sĩ:</strong> Đã có bằng tốt nghiệp đại học (Cử nhân / Kỹ sư).</li>
                  <li><strong>Bậc Tiến sĩ:</strong> Đã có bằng tốt nghiệp thạc sĩ phù hợp với chuyên ngành dự tuyển.</li>
                  <li><strong>Trình độ Tiếng Việt:</strong> Đạt chứng chỉ trình độ B2 trở lên do ĐH Vinh hoặc các cơ sở giáo dục uy tín tại Việt Nam cấp. Thí sinh chưa có B2 bắt buộc học 01 năm Dự bị Tiếng Việt.</li>
                  <li>Các ngành có môn năng khiếu (Giáo dục mầm non, GD thể chất): tham gia kiểm tra năng khiếu theo quy định.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>2. Sức khỏe & Độ tuổi</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside leading-relaxed text-[11px]">
                  <li>Có đủ sức khỏe để học tập tại Việt Nam, có Giấy khám sức khỏe do bệnh viện cấp tỉnh hoặc trung ương cấp trong vòng 06 tháng.</li>
                  <li>Trước khi vào học, phải kiểm tra sức khỏe tại Trạm Y tế Trường Đại học Vinh; không mắc các bệnh truyền nhiễm hoặc bệnh xã hội.</li>
                  <li><strong>Độ tuổi:</strong> Không giới hạn độ tuổi đối với sinh viên quốc tế học tập theo diện hiệp định, tài trợ hoặc tự túc.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 13 Application Documents Checklist (Section 3) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Mục 3 Thông báo Tuyển sinh Quốc tế
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Danh Mục 13 Hồ Sơ Nhập Học Bắt Buộc (Application Profile)
              </h3>
              <p className="text-xs text-slate-500">
                Thí sinh chuẩn bị 01 bộ hồ sơ bằng tiếng mẹ đẻ và 01 bộ dịch thuật công chứng sang tiếng Việt hoặc tiếng Anh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {internationalDocumentChecklist.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300 transition-all space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-extrabold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded">
                      Mục {doc.sectionNumber}
                    </span>
                    {doc.isMandatory ? (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        Bắt buộc
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                        Tùy chọn
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-xs">
                    {lang === 'en' ? doc.titleEn : lang === 'lao' ? doc.titleLao : doc.titleVi}
                  </h4>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {doc.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 3: FEES, DORM & SCHOLARSHIPS ================= */}
      {activeTab === 'fees' && (
        <div className="space-y-6">
          
          {/* Fee Table in USD and VND */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                Mục Văn Bản Mức Thu Kinh Phí (Ảnh 2 & 3)
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Biểu Phí Đào Tạo & Ký Túc Xá Lưu Học Sinh (Đơn vị: USD)
              </h3>
              <p className="text-xs text-slate-500">
                Áp dụng chuẩn hóa cho toàn bộ sinh viên quốc tế và lưu học sinh Lào tại Trường Đại học Vinh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {internationalFees.map((fee, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase block">
                      Chi phí #{idx + 1}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {lang === 'en' ? fee.itemEn : lang === 'lao' ? fee.itemLao : fee.itemVi}
                    </h4>
                    <div className="font-mono text-xl font-extrabold text-indigo-950">
                      ${fee.amountUsd} <span className="text-xs font-normal text-slate-500">USD</span>
                    </div>
                    <span className="text-[11px] text-indigo-900 font-semibold block bg-indigo-100/60 p-1.5 rounded-lg">
                      {fee.period}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {fee.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Utility Free Allowance Card */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs text-sky-950">
              <div className="space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-700" />
                  <span>Định mức tiện ích miễn phí hàng tháng (Mục 4):</span>
                </span>
                <p className="text-slate-600 text-[11px]">
                  Mỗi lưu học sinh được cấp <strong>3 m³ nước sạch</strong> và <strong>6 kWh điện sinh hoạt</strong> miễn phí mỗi tháng tại KTX. Phần vượt định mức đóng theo giá quy định của Nhà trường.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Scholarship Types (From Image 5) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Mục 5 Giới thiệu Cơ sở Đào tạo (Ảnh 5)
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Chính Sách Học Bổng Toàn Phần & Bán Phần Dành Cho Lưu Học Sinh
              </h3>
            </div>

            <div className="space-y-4">
              {internationalScholarships.map((s) => (
                <div 
                  key={s.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-amber-400 transition-all space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="font-extrabold text-base text-slate-900">
                      {lang === 'en' ? s.titleEn : lang === 'lao' ? s.titleLao : s.titleVi}
                    </h4>
                    <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-300">
                      {s.fundingBody}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-700 block">Quyền lợi chi trả:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 text-[11px]">
                      {s.coverage.map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                    <strong>Đối tượng áp dụng:</strong> {s.targetAudience}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 4: ONLINE APPLICATION FORM ================= */}
      {activeTab === 'register' && (
        <div className="space-y-6">
          <InternationalApplicationForm lang={lang} />
        </div>
      )}

      {/* ================= TAB 5: RESULT & OFFER LETTER LOOKUP ================= */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <InternationalResultLookup lang={lang} />
        </div>
      )}

      {/* ================= TAB 6: FACILITIES & DORMITORY (Image 5) ================= */}
      {activeTab === 'facilities' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                Mục 4 Cơ sở vật chất Lưu học sinh (Ảnh 5)
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Khu Ký Túc Xá Lưu Học Sinh & Cơ Sở Vật Chất Trường Đại Học Vinh
              </h3>
              <p className="text-xs text-slate-600">
                Tọa lạc tại thành phố Vinh hơn 400.000 dân, Trường Đại học Vinh thành lập năm 1959 với khuôn viên xanh mát, hiện đại.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
                <span className="text-2xl font-black text-indigo-900 block font-mono">02</span>
                <h4 className="font-extrabold text-slate-900 text-sm">Tòa nhà Ký túc xá Lưu học sinh</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Trường bố trí 02 tòa nhà ký túc xá chuyên biệt với tổng cộng <strong>315 phòng ở</strong> khép kín, tiện nghi, bảo vệ 24/7.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-2xl font-black text-emerald-900 block font-mono">30.5 m²</span>
                <h4 className="font-extrabold text-slate-900 text-sm">Diện tích phòng chuẩn 4 người</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Thiết kế khép kín với nhà vệ sinh riêng, bàn học, giường tầng, quạt trần, ban công thoáng mát và wifi tốc độ cao.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="text-2xl font-black text-amber-900 block font-mono">10 USD</span>
                <h4 className="font-extrabold text-slate-900 text-sm">Mức phí KTX ưu đãi / tháng</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Chi phí phòng ở chỉ 10 USD/tháng (100 USD/năm), được hỗ trợ miễn phí 3 m³ nước và 6 kWh điện mỗi tháng.
                </p>
              </div>
            </div>

            {/* Sports & Campus facilities */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Khu Thể thao & Tiện ích Ngoại khóa</h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Khuôn viên Làng Sinh viên và KTX rộng rãi, rợp bóng cây xanh, trang bị <strong>sân bóng đá cỏ nhân tạo, sân bóng chuyền, sân cầu mây (sepak takraw), bóng bàn, nhà thi đấu đa năng</strong> phục vụ lưu học sinh giao lưu văn hóa và rèn luyện thể thao.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 7: CONTACT DETAILS ================= */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                Mục 7 Thông tin Liên hệ (Ảnh 2, 3 & 5)
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Phòng Khoa Học & Hợp Tác Quốc Tế — Trường Đại Học Vinh
              </h3>
              <p className="text-xs text-slate-600">
                Bộ phận chuyên trách tiếp nhận hồ sơ, tư vấn thủ tục visa thị thực và hướng dẫn lưu học sinh quốc tế.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Contact Card 1: Official Desk */}
              <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-700">Trụ sở tiếp nhận</span>
                  <h4 className="font-extrabold text-sm text-slate-900">{internationalContactOfficer.departmentVi}</h4>
                  <p className="text-slate-600 text-[11px]">{internationalContactOfficer.addressVi}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-indigo-200/80">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-700" />
                    <span>Điện thoại bàn: <strong>{internationalContactOfficer.phoneDesk}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-700" />
                    <span>Email: <strong className="font-mono">{internationalContactOfficer.email1}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-700" />
                    <span>Email phụ: <strong className="font-mono">{internationalContactOfficer.email2}</strong></span>
                  </div>
                </div>
              </div>

              {/* Contact Card 2: Officer in charge (Dr. Phan Văn Tiến) */}
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-800">Cán bộ phụ trách dịch vụ & hỗ trợ</span>
                  <h4 className="font-extrabold text-base text-slate-900">{internationalContactOfficer.officerName}</h4>
                  <p className="text-amber-900 font-semibold text-[11px]">{internationalContactOfficer.officerTitleVi}</p>
                  <p className="text-slate-600 text-[10px] italic">{internationalContactOfficer.officerTitleEn}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-amber-200/80">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-700" />
                    <span>Di động / WhatsApp / Zalo: <strong className="font-mono text-sm">{internationalContactOfficer.officerMobile}</strong></span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Hỗ trợ giải đáp hồ sơ, tiếp nhận bản thảo đề cương nghiên cứu tiến sĩ và thư bảo lãnh visa du học.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
