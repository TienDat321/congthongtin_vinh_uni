import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Users, 
  Search, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Phone, 
  Mail, 
  Download, 
  Printer, 
  Building, 
  Sparkles,
  School,
  BookOpen
} from 'lucide-react';
import { initialVLVHMajors, vlvhConsultants, vlvhPaymentConfig } from '../../data/vlvhMockData';
import { VLVHRegistrationForm } from './VLVHRegistrationForm';
import { VLVHResultLookup } from './VLVHResultLookup';
import { VLVHTemplatesModal } from './VLVHTemplatesModal';

export const PublicVLVH: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'majors' | 'training' | 'register' | 'results' | 'templates' | 'consultants'>('majors');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'teacher' | 'other'>('all');
  const [programFilter, setProgramFilter] = useState<'all' | 'tcToDh' | 'cdToDh' | 'secondDegree' | 'thpt'>('all');
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);

  const filteredMajors = initialVLVHMajors.filter(m => {
    const matchCategory = categoryFilter === 'all' || m.category === categoryFilter;
    const matchProgram = programFilter === 'all' || m.programs[programFilter];
    return matchCategory && matchProgram;
  });

  const totalQuota = initialVLVHMajors.reduce((acc, m) => acc + m.quota, 0);
  const teacherQuota = initialVLVHMajors.filter(m => m.category === 'teacher').reduce((acc, m) => acc + m.quota, 0);
  const otherQuota = initialVLVHMajors.filter(m => m.category === 'other').reduce((acc, m) => acc + m.quota, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-300" />
              <span>Đại Học Vừa Làm Vừa Học (VLVH)</span>
            </span>

            <span className="bg-sky-500/20 text-sky-200 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-semibold">
              Căn cứ: <strong className="font-mono text-white">Thông báo 07/TB-ĐHV (16/01/2026)</strong>
            </span>

            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold">
              Tổng chỉ tiêu: {totalQuota.toLocaleString('vi-VN')} học viên
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Tuyển Sinh Đào Tạo Trình Độ Đại Học Hình Thức Vừa Làm Vừa Học Năm 2026
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-3xl">
            Trường Đại học Vinh tuyển sinh <strong>16 ngành đào tạo</strong> gồm nhóm <strong>đào tạo giáo viên (nâng chuẩn)</strong> và nhóm <strong>ngành kinh tế, luật, kỹ thuật, ngôn ngữ</strong>. Lịch học linh hoạt vào thứ Bảy, Chủ nhật hoặc tập trung dịp hè, học trực tiếp kết hợp trực tuyến.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Thời gian học: <strong className="text-white">Thứ 7 & Chủ nhật (hoặc tập trung hè)</strong></span>
            </div>

            <button
              onClick={() => setActiveTab('register')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer text-xs"
            >
              <CreditCard className="w-4 h-4 text-slate-950" />
              <span>Đăng Ký & Nộp Lệ Phí (500k)</span>
            </button>

            <button
              onClick={() => setIsTemplatesModalOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer text-xs"
            >
              <FileText className="w-4 h-4 text-emerald-300" />
              <span>Mẫu Phiếu ĐK & Giấy Xác Nhận</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-slate-200 bg-white rounded-xl shadow-xs px-4 flex items-center gap-1 sm:gap-3 overflow-x-auto text-xs">
        {[
          { id: 'majors', label: `16 Ngành Đào Tạo (${totalQuota} Chỉ Tiêu)`, icon: BookOpen },
          { id: 'training', label: 'Tổ Chức Đào Tạo & Ngưỡng Đầu Vào', icon: School },
          { id: 'register', label: 'Đăng Ký Trực Tuyến & VietQR (500k)', icon: CreditCard },
          { id: 'results', label: 'Tra Cứu Hồ Sơ & Kết Quả', icon: Search },
          { id: 'templates', label: 'Mẫu Biểu Hồ Sơ (Phiếu ĐK / Xác Nhận)', icon: FileText },
          { id: 'consultants', label: 'Tư Vấn Tuyển Sinh (TT GDTX)', icon: Phone }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'templates') {
                  setIsTemplatesModalOpen(true);
                } else {
                  setActiveTab(tab.id as any);
                }
              }}
              className={`flex items-center gap-2 py-3.5 px-3 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: 16 MAJORS & QUOTAS ================= */}
      {activeTab === 'majors' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-500 uppercase">Khối ngành:</span>
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  categoryFilter === 'all' 
                    ? 'bg-emerald-900 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tất cả (16 ngành - {totalQuota} chỉ tiêu)
              </button>
              <button
                onClick={() => setCategoryFilter('teacher')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  categoryFilter === 'teacher' 
                    ? 'bg-emerald-900 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Đào tạo giáo viên (8 ngành - {teacherQuota} chỉ tiêu)
              </button>
              <button
                onClick={() => setCategoryFilter('other')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  categoryFilter === 'other' 
                    ? 'bg-emerald-900 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Các ngành khác (8 ngành - {otherQuota} chỉ tiêu)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500">Loại hình:</span>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value as any)}
                className="p-1.5 rounded-lg border border-slate-300 font-medium bg-white focus:outline-none"
              >
                <option value="all">Tất cả loại hình</option>
                <option value="cdToDh">Liên thông CĐ lên ĐH</option>
                <option value="tcToDh">Liên thông TC lên ĐH</option>
                <option value="secondDegree">Bằng ĐH thứ 2 (VB2)</option>
                <option value="thpt">Tốt nghiệp THPT</option>
              </select>
            </div>
          </div>

          {/* Majors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredMajors.map((major) => (
              <div 
                key={major.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900">
                      Mã: {major.code}
                    </span>
                    <span className="text-xs font-mono font-extrabold text-sky-900 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                      Chỉ tiêu: {major.quota} học viên
                    </span>
                  </div>

                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                      major.category === 'teacher' ? 'text-amber-700' : 'text-slate-500'
                    }`}>
                      {major.category === 'teacher' ? 'Nhóm ngành Đào tạo Giáo viên' : 'Nhóm ngành Kinh tế - Kỹ thuật - Luật'}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                      {major.name}
                    </h4>
                  </div>

                  {/* Program Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-slate-400 font-semibold mr-1">Hệ đào tạo:</span>
                    {major.programs.tcToDh && (
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">TC lên ĐH</span>
                    )}
                    {major.programs.cdToDh && (
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">CĐ lên ĐH</span>
                    )}
                    {major.programs.secondDegree && (
                      <span className="bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded font-medium">Bằng ĐH 2 (VB2)</span>
                    )}
                    {major.programs.thpt && (
                      <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded font-medium">Tốt nghiệp THPT</span>
                    )}
                  </div>

                  <div className="space-y-1 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700">Thời gian đào tạo (học vượt được):</span>
                    <p className="text-slate-600 font-mono text-[11px]">{major.durationNote}</p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-700">Ngưỡng đầu vào quy định:</span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {major.entryRequirement}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Hình thức: <strong>Xét tuyển</strong></span>

                  <button
                    onClick={() => setActiveTab('register')}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Nộp hồ sơ ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= TAB 2: TRAINING ORGANIZATION & REQUIREMENTS ================= */}
      {activeTab === 'training' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Mục III & IV Thông báo số 07/TB-ĐHV
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Tổ Chức Đào Tạo & Ngưỡng Đầu Vào Các Ngành VLVH
              </h3>
              <p className="text-xs text-slate-600">
                Linh hoạt cho người vừa đi làm vừa nâng cao trình độ, văn bằng do Trường Đại học Vinh cấp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Thời gian đào tạo & Học vượt</h4>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li>Liên thông từ Trung cấp lên ĐH: đúng ngành <strong>3,0 năm</strong>; khác ngành <strong>3,5 năm</strong>.</li>
                  <li>Liên thông từ Cao đẳng lên ĐH: đúng ngành <strong>2,0 năm</strong>; khác ngành <strong>2,5 năm</strong>.</li>
                  <li>Văn bằng hai trình độ đại học: từ <strong>2,0 đến 2,5 năm</strong>.</li>
                  <li>Người học có thể đăng ký <strong>học vượt</strong> để tốt nghiệp sớm hơn thời gian quy định.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-900 flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Hình thức & Thời gian học</h4>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li>Dạy - học trực tiếp kết hợp với <strong>trực tuyến (E-learning)</strong> hiện đại.</li>
                  <li>Học vào <strong>thứ Bảy, Chủ nhật</strong> trong tuần (trừ dịp lễ, tết).</li>
                  <li>Đối với ngành đào tạo nâng trình độ chuẩn giáo viên: có thể bố trí <strong>học tập trung vào các ngày thường trong dịp nghỉ hè</strong>.</li>
                  <li>Địa điểm: Tại Trường Đại học Vinh hoặc tại các Đơn vị liên kết đào tạo.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Hồ sơ & Lệ phí xét tuyển</h4>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li><strong>Hình thức:</strong> Xét tuyển hồ sơ (không thi tuyển).</li>
                  <li><strong>Lệ phí xét tuyển:</strong> 500.000 đồng/01 hồ sơ (quét mã VietQR).</li>
                  <li><strong>Học phí:</strong> Theo Nghị định số 238/2025/NĐ-CP ngày 03/9/2025 của Chính phủ. Đóng trực tuyến từng kỳ.</li>
                  <li>Nơi tiếp nhận: Trung tâm GDTX, Tầng 5 Nhà Điều hành ĐHV (182 Lê Duẩn, TP. Vinh).</li>
                </ul>
              </div>

            </div>

            {/* Threshold condition note */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5 text-amber-950">
              <span className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Quy định đặc thù về ngưỡng đầu vào ngành Giáo viên (Mục III.1.2):</span>
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                Đối với người đã trúng tuyển hoặc đã tốt nghiệp các ngành đào tạo giáo viên trước ngày <strong>07 tháng 5 năm 2020</strong>: nếu dự tuyển vào học để đạt trình độ chuẩn theo quy định tại Điều 72 Luật Giáo dục năm 2019, ngưỡng xét đầu vào là thí sinh xếp hạng tốt nghiệp từ loại <strong>Trung bình trở lên</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ONLINE REGISTRATION & VIETQR ================= */}
      {activeTab === 'register' && (
        <div className="space-y-6">
          <VLVHRegistrationForm />
        </div>
      )}

      {/* ================= TAB 4: RESULT LOOKUP ================= */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <VLVHResultLookup />
        </div>
      )}

      {/* ================= TAB 5: CONSULTANTS DIRECTORY ================= */}
      {activeTab === 'consultants' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Mục VIII Thông báo số 07/TB-ĐHV
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Thông Tin Tư Vấn Tuyển Sinh — Trung Tâm Giáo Dục Thường Xuyên
              </h3>
              <p className="text-xs text-slate-600">
                Địa chỉ: Tầng 5, Nhà Điều hành, Trường Đại học Vinh, số 182, đường Lê Duẩn, TP. Vinh, tỉnh Nghệ An.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vlvhConsultants.map((c, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-2 hover:border-emerald-300 transition-all text-xs"
                >
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                    {c.role}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {c.name}
                  </h4>

                  <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <a href={`tel:${c.phone}`} className="font-mono font-bold text-slate-900 hover:underline">
                        {c.phone}
                      </a>
                      <span className="text-[10px] text-slate-400 font-mono">(Zalo)</span>
                    </div>

                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                      <a href={`mailto:${c.email}`} className="text-slate-600 hover:text-sky-900 truncate">
                        {c.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      <VLVHTemplatesModal 
        isOpen={isTemplatesModalOpen} 
        onClose={() => setIsTemplatesModalOpen(false)} 
      />

    </div>
  );
};
