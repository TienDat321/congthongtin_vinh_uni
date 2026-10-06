import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Search, 
  Award, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Download, 
  Printer, 
  Phone, 
  Mail, 
  Building, 
  Sparkles, 
  Layers, 
  Globe, 
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { 
  masterMajorsList, 
  doctoralMajorsList, 
  foreignLanguageRequirements, 
  postgraduateContactInfo 
} from '../../data/postgraduateMockData';
import { PostgraduateDegree, PostgraduateMajor } from '../../types/postgraduate';
import { PostgraduateApplicationForm } from './PostgraduateApplicationForm';
import { PostgraduateResultLookup } from './PostgraduateResultLookup';

export const PublicPostgraduate: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'majors' | 'cutoff-scores' | 'requirements' | 'registration' | 'lookup' | 'schedule'
  >('majors');

  const [degreeFilter, setDegreeFilter] = useState<'all' | 'master' | 'doctoral'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLangCertFilter, setActiveLangCertFilter] = useState<string>('all');

  // Filtered majors
  const allMajors = [...masterMajorsList, ...doctoralMajorsList];
  const filteredMajors = allMajors.filter(major => {
    const matchesDegree = degreeFilter === 'all' || major.degree === degreeFilter;
    const matchesSearch = major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          major.code.includes(searchTerm) ||
                          major.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDegree && matchesSearch;
  });

  const masterCount = masterMajorsList.length;
  const doctoralCount = doctoralMajorsList.length;
  const round2TotalQuotaMaster = masterMajorsList.reduce((acc, m) => acc + (m.quotaRound2 || 0), 0);
  const round2TotalQuotaDoc = doctoralMajorsList.reduce((acc, m) => acc + (m.quotaRound2 || 0), 0);

  return (
    <div className="space-y-10 text-xs">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-sky-500/20 text-sky-200 border border-sky-400/30 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              <span>Tuyển Sinh Sau Đại Học VinhUni Năm 2026</span>
            </span>

            <span className="bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full font-extrabold text-[10px] tracking-wide flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Đang nhận hồ sơ Đợt 2 (Đến 15/11/2026)</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            CỔNG THÔNG TIN TUYỂN SINH THẠC SĨ & TIẾN SĨ 2026
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Hệ thống đào tạo trình độ cao học và nghiên cứu sinh hàng đầu khu vực Bắc Miền Trung. Dữ liệu các chuyên ngành, chỉ tiêu Đợt 1 & Đợt 2, điểm chuẩn xét tuyển và kế hoạch đào tạo được số hóa từ các văn bản chính thức của Trường Đại học Vinh (Thông báo số 34/TB-ĐHV, Thông báo số 39/TB-ĐHV, Quyết định 2246/QĐ-ĐHV và Thông báo số 136/TB-ĐHV).
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-slate-300 font-semibold block uppercase">Trình độ Thạc sĩ</span>
              <strong className="text-xl font-extrabold text-amber-300">{masterCount} Ngành</strong>
              <span className="text-[10px] text-slate-400 block">Đợt 2 còn {round2TotalQuotaMaster} chỉ tiêu</span>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-slate-300 font-semibold block uppercase">Trình độ Tiến sĩ</span>
              <strong className="text-xl font-extrabold text-amber-300">{doctoralCount} Chuyên ngành</strong>
              <span className="text-[10px] text-slate-400 block">Đợt 2 còn {round2TotalQuotaDoc} chỉ tiêu</span>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-slate-300 font-semibold block uppercase">Đề án 89 & Học bổng</span>
              <strong className="text-xl font-extrabold text-emerald-400">100%</strong>
              <span className="text-[10px] text-slate-400 block">Học bổng Nhà trường & CP</span>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-slate-300 font-semibold block uppercase">Căn cứ pháp lý</span>
              <strong className="text-xl font-extrabold text-sky-300">TB 136 / TB 39</strong>
              <span className="text-[10px] text-slate-400 block">Điểm chuẩn QĐ 2246</span>
            </div>
          </div>

        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 text-xs">
        {[
          { key: 'majors', label: '1. Danh mục Ngành & Chỉ tiêu (ThS & TS)', icon: BookOpen },
          { key: 'cutoff-scores', label: '2. Điểm chuẩn trúng tuyển Đợt 1', icon: Award },
          { key: 'requirements', label: '3. Điều kiện & Ngoại ngữ B2', icon: ShieldCheck },
          { key: 'registration', label: '4. Nộp hồ sơ trực tuyến', icon: FileText, badge: 'Đợt 2' },
          { key: 'lookup', label: '5. Tra cứu kết quả & Giấy báo', icon: Search },
          { key: 'schedule', label: '6. Kế hoạch & Tư vấn tuyển sinh', icon: Calendar }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-3 px-4 font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-sky-900 text-sky-950'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-sky-900' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-mono px-1.5 py-0.2 rounded font-extrabold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: MAJORS & QUOTAS ================= */}
      {activeTab === 'majors' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Degree Segment */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <span className="text-slate-400 font-bold uppercase text-[10px] shrink-0">Bậc đào tạo:</span>
              <button
                onClick={() => setDegreeFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  degreeFilter === 'all'
                    ? 'bg-sky-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tất cả ({allMajors.length})
              </button>
              <button
                onClick={() => setDegreeFilter('master')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  degreeFilter === 'master'
                    ? 'bg-sky-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🎓 Thạc sĩ ({masterCount})
              </button>
              <button
                onClick={() => setDegreeFilter('doctoral')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  degreeFilter === 'doctoral'
                    ? 'bg-indigo-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🎖️ Tiến sĩ ({doctoralCount})
              </button>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm mã ngành, tên chuyên ngành..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

          </div>

          {/* Majors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMajors.map((major) => {
              const isMaster = major.degree === 'master';

              return (
                <div 
                  key={major.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md ${
                        isMaster ? 'bg-sky-100 text-sky-900' : 'bg-indigo-100 text-indigo-900'
                      }`}>
                        MÃ: {major.code}
                      </span>

                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isMaster ? 'bg-slate-100 text-slate-700' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {isMaster ? 'Thạc sĩ (Cao học)' : 'Tiến sĩ (NCS)'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-sky-900 transition-colors">
                      {major.name}
                    </h3>

                    <div className="space-y-1.5 text-[11px] text-slate-600">
                      <div className="flex items-center justify-between">
                        <span>Khoa / Viện:</span>
                        <strong className="text-slate-800">{major.faculty}</strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Thời gian đào tạo:</span>
                        <span className="font-semibold">{major.durationMonths} tháng</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Chỉ tiêu Đợt 1:</span>
                        <span className="font-mono font-bold text-slate-800">{major.quotaRound1} chỉ tiêu</span>
                      </div>

                      {major.quotaRound2 !== undefined && major.quotaRound2 > 0 && (
                        <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-amber-950 font-bold">
                          <span>Tiếp tục thu Đợt 2:</span>
                          <span className="font-mono text-sm text-amber-700">
                            {major.quotaRound2} CHỈ TIÊU
                          </span>
                        </div>
                      )}

                      {major.cutoffScoreRound1 && (
                        <div className="flex items-center justify-between text-emerald-800 font-semibold">
                          <span>Điểm chuẩn Đợt 1 (QĐ 2246):</span>
                          <span className="font-mono font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {major.cutoffScoreRound1.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {major.dean89 && (
                        <div className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-950 font-bold text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>Ngành thuộc Đề án 89 đào tạo giảng viên</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">
                      {major.admissionMethod === 'XÉT_HỒ_SƠ_PHỎNG_VẤN' ? 'Hồ sơ & Phỏng vấn' : 
                       major.admissionMethod === 'XÉT_HỒ_SƠ_ĐỀ_CƯƠNG' ? 'Hồ sơ & Đề cương' : 
                       'Hồ sơ & Bài luận'}
                    </span>
                    <button
                      onClick={() => setActiveTab('registration')}
                      className="text-sky-900 font-bold hover:underline flex items-center gap-1 cursor-pointer text-xs"
                    >
                      <span>Nộp hồ sơ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ================= TAB 2: CUTOFF SCORES ================= */}
      {activeTab === 'cutoff-scores' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                  Quyết định số 2246/QĐ-ĐHV ngày 22/07/2026
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Bảng Điểm Chuẩn Trúng Tuyển Đào Tạo Trình Độ Thạc Sĩ Đợt 1 Năm 2026
                </h3>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer text-xs self-start sm:self-auto"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In bảng điểm chuẩn</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="py-3 px-4">TT</th>
                    <th className="py-3 px-4">Mã ngành</th>
                    <th className="py-3 px-4">Tên ngành / lĩnh vực đào tạo</th>
                    <th className="py-3 px-4 text-center">Phương thức xét</th>
                    <th className="py-3 px-4 text-right">Điểm chuẩn đợt 1 (Thang 10)</th>
                    <th className="py-3 px-4 text-right">Chỉ tiêu Đợt 2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {masterMajorsList.map((major, idx) => (
                    <tr key={major.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4 font-mono font-bold text-sky-950">{major.code}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{major.name}</td>
                      <td className="py-3 px-4 text-center text-slate-600">
                        {major.admissionMethod === 'XÉT_HỒ_SƠ_PHỎNG_VẤN' ? 'Xét hồ sơ + Phỏng vấn' : 'Xét hồ sơ + Chấm bài luận'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-mono font-extrabold text-sm px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {major.cutoffScoreRound1 ? major.cutoffScoreRound1.toFixed(2) : '--'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        {major.quotaRound2 ? (
                          <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                            {major.quotaRound2} chỉ tiêu
                          </span>
                        ) : (
                          <span className="text-slate-400">Đã đủ chỉ tiêu</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 space-y-2 text-xs">
              <span className="font-bold block">Điều kiện trúng tuyển chính thức:</span>
              <p>a) Đáp ứng điều kiện dự tuyển ở Mục II, Thông báo số 39/TB-ĐHV ngày 06/3/2026 của Trường Đại học Vinh;</p>
              <p>b) Đạt các tiêu chí, nguyên tắc xét tuyển theo Quyết định số 2246/QĐ-ĐHV ngày 22/7/2026 của Trường Đại học Vinh;</p>
              <p>c) Đạt điểm chuẩn trúng tuyển theo ngành tương ứng đã công bố.</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: REQUIREMENTS & LANGUAGE ================= */}
      {activeTab === 'requirements' && (
        <div className="space-y-6">
          
          {/* Language Prep Notice Alert */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-extrabold px-2.5 py-1 rounded text-[10px] uppercase">
                Thông Báo Ôn Tập & Thi ĐGNL Ngoại Ngữ
              </span>
              <span className="text-slate-500 text-xs">Ban hành ngày 05/03/2026</span>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Kế Hoạch Tổ Chức Ôn Tập Và Thi Đánh Giá Năng Lực Ngoại Ngữ Thạc Sĩ 2026
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                <span className="text-slate-500 font-bold block">Chương trình ôn tập:</span>
                <strong className="text-slate-900 block text-sm">60 tiết chuẩn</strong>
                <span className="text-slate-500 text-[11px] block">30 tiết E-learning + 30 tiết Teams trực tiếp</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                <span className="text-slate-500 font-bold block">Thời gian ôn tập & thi:</span>
                <strong className="text-slate-900 block text-sm">12/06 - 18/06/2026</strong>
                <span className="text-slate-500 text-[11px] block">Thi chính thức ngày 20/06/2026</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                <span className="text-slate-500 font-bold block">Lệ phí ôn tập & thi:</span>
                <strong className="text-emerald-700 block text-sm">1.500.000 VNĐ</strong>
                <span className="text-slate-500 text-[11px] block">Đăng ký trực tiếp tại Cổng tuyển sinh</span>
              </div>
            </div>
          </div>

          {/* Foreign Language Equivalency Table (Phụ lục II TT 18/2021) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                Phụ lục II Thông tư số 18/2021/TT-BGDĐT
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                Danh Sách Chứng Chỉ Tiếng Nước Ngoài Minh Chứng Cho Trình Độ Ngoại Ngữ Đầu Vào
              </h3>
              <p className="text-slate-500 text-xs">
                Áp dụng cho thí sinh dự tuyển đào tạo trình độ thạc sĩ và tiến sĩ năm 2026.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="py-3 px-4">STT</th>
                    <th className="py-3 px-4">Ngôn ngữ</th>
                    <th className="py-3 px-4">Tên bằng / Chứng chỉ</th>
                    <th className="py-3 px-4">Trình độ / Thang điểm tối thiểu</th>
                    <th className="py-3 px-4">Ghi chú & Căn cứ quy định</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {foreignLanguageRequirements.map((req, idx) => (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{req.language}</td>
                      <td className="py-3 px-4 font-semibold text-sky-950">{req.certificateName}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">{req.minScoreOrLevel}</td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">{req.note || req.issuingBody || 'Quy chuẩn Bộ GD&ĐT'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 4: REGISTRATION FORM ================= */}
      {activeTab === 'registration' && (
        <div className="space-y-6">
          <PostgraduateApplicationForm />
        </div>
      )}

      {/* ================= TAB 5: RESULT LOOKUP ================= */}
      {activeTab === 'lookup' && (
        <div className="space-y-6">
          <PostgraduateResultLookup />
        </div>
      )}

      {/* ================= TAB 6: SCHEDULE & ADVISING ================= */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Master Timeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-sky-100 text-sky-900 rounded-xl font-bold">🎓</span>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Kế Hoạch Tuyển Sinh Thạc Sĩ 2026</h3>
                <span className="text-[11px] text-slate-500">Căn cứ Thông báo số 39/TB-ĐHV & Thông báo gia hạn</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-sky-950 font-bold block">1. Tuyển sinh Đợt 1 (Đã hoàn thành):</strong>
                <p>• Nhận hồ sơ: Gia hạn đến hết ngày <strong>15/07/2026</strong></p>
                <p>• Xét tuyển & phỏng vấn: <strong>20/07/2026 - 26/07/2026</strong></p>
                <p>• Công bố kết quả xét tuyển: <strong>29/07/2026</strong> (QĐ 2246)</p>
                <p>• Thời gian nhập học: <strong>05/08/2026</strong></p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 space-y-1">
                <strong className="text-amber-950 font-bold block">2. Tiếp tục thu hồ sơ Đợt 2 (ĐANG DIỄN RA):</strong>
                <p>• Nhận hồ sơ diện BSKT: Đến hết ngày <strong>10/10/2026 - 25/10/2026</strong></p>
                <p>• Nhận hồ sơ diện không BSKT: Đến hết ngày <strong>15/11/2026</strong></p>
                <p>• Thời gian xét tuyển: <strong>25/11/2026 - 28/11/2026</strong></p>
                <p>• Công bố kết quả: <strong>02/12/2026</strong></p>
                <p>• Thời gian nhập học: <strong>10/12/2026</strong></p>
              </div>
            </div>
          </div>

          {/* Doctoral Timeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-100 text-indigo-900 rounded-xl font-bold">🎖️</span>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Kế Hoạch Tuyển Sinh Tiến Sĩ 2026</h3>
                <span className="text-[11px] text-slate-500">Căn cứ Thông báo số 34/TB-ĐHV & Thông báo 136/TB-ĐHV</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-indigo-950 font-bold block">1. Tuyển sinh Đợt 1:</strong>
                <p>• Nhận hồ sơ: Đến hết ngày <strong>30/05/2026</strong></p>
                <p>• Xét tuyển & bảo vệ đề cương: <strong>10/06 - 12/06/2026</strong></p>
                <p>• Công bố kết quả: <strong>15/06/2026</strong></p>
                <p>• Nhập học: <strong>25/06/2026</strong></p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-300 space-y-1">
                <strong className="text-indigo-950 font-bold block">2. Thu hồ sơ Đợt 2 (Theo Thông báo 136/TB-ĐHV):</strong>
                <p>• Thời gian nhận hồ sơ: Đến hết ngày <strong>15/11/2026</strong></p>
                <p>• Thời gian xét tuyển: <strong>22/11/2026 - 25/11/2026</strong></p>
                <p>• Công bố kết quả trúng tuyển: <strong>30/11/2026</strong></p>
                <p>• Thời gian nhập học: <strong>20/12/2026</strong></p>
              </div>
            </div>
          </div>

          {/* Contact Box */}
          <div className="md:col-span-2 bg-gradient-to-r from-sky-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-extrabold text-base text-white">
              Thông Tin Liên Hệ & Hỗ Trợ Ứng Viên Sau Đại Học
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1 text-slate-300">
                <span className="text-amber-300 font-bold block">Địa điểm tiếp nhận hồ sơ:</span>
                <p>{postgraduateContactInfo.office}</p>
                <p>{postgraduateContactInfo.location}</p>
              </div>

              <div className="space-y-1 text-slate-300">
                <span className="text-amber-300 font-bold block">Điện thoại & Email:</span>
                <p>Điện thoại: <strong>{postgraduateContactInfo.phone}</strong></p>
                <p>Email: <strong>{postgraduateContactInfo.email}</strong></p>
                <p>Cán bộ phụ trách: <strong>{postgraduateContactInfo.officerInCharge}</strong></p>
              </div>

              <div className="space-y-1 text-slate-300">
                <span className="text-amber-300 font-bold block">Hỗ trợ trực tuyến:</span>
                <p>Website: <a href={postgraduateContactInfo.website} target="_blank" rel="noreferrer" className="text-sky-300 hover:underline">{postgraduateContactInfo.website}</a></p>
                <p>Zalo nhóm tư vấn tuyển sinh: <a href={postgraduateContactInfo.zaloCommunity} target="_blank" rel="noreferrer" className="text-amber-300 font-mono hover:underline">{postgraduateContactInfo.zaloCommunity}</a></p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
