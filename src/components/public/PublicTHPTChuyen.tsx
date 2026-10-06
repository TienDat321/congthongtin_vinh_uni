import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Award, 
  Calendar, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Send, 
  Clock, 
  GraduationCap, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Trophy,
  Calculator,
  Zap,
  TrendingUp,
  Info,
  Percent,
  CheckSquare
} from 'lucide-react';
import { 
  thptChuyenClasses, 
  thptChuyenExamSchedules, 
  thptChuyenDirectRules, 
  sampleCandidatesData 
} from '../../data/thptChuyenMockData';
import { THPTChuyenClass, THPTChuyenCandidate } from '../../types/thptChuyen';

export const PublicTHPTChuyen: React.FC = () => {
  // Navigation: classes -> schedule -> formula -> lookup -> register -> direct
  const [activeTab, setActiveTab] = useState<'classes' | 'schedule' | 'formula' | 'lookup' | 'register' | 'direct'>('classes');
  
  // Interactive Score Calculator State
  const [calcMath, setCalcMath] = useState<number>(8.5);
  const [calcEnglish, setCalcEnglish] = useState<number>(8.0);
  const [calcLiterature, setCalcLiterature] = useState<number>(7.5);
  const [calcSpecialized, setCalcSpecialized] = useState<number>(8.5);
  const [calcTargetClassId, setCalcTargetClassId] = useState<string>('ch-toan');
  const [calcPriority, setCalcPriority] = useState<number>(0.0);

  // Search candidate states
  const [searchQuery, setSearchQuery] = useState('');
  const [foundCandidate, setFoundCandidate] = useState<THPTChuyenCandidate | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Selected class for detail modal / view
  const [selectedClass, setSelectedClass] = useState<THPTChuyenClass>(thptChuyenClasses[0]);

  // Online registration form state
  const [regForm, setRegForm] = useState({
    fullName: '',
    dob: '',
    gender: 'Nam',
    phone: '',
    email: '',
    parentName: '',
    parentPhone: '',
    juniorHighSchool: '',
    province: 'Nghệ An',
    targetClassId: 'ch-toan',
    hasSecondChoice: true,
    secondChoice: 'clc-toan-anh',
    hasDirectAdmissionProof: false,
    proofDescription: ''
  });
  const [regSuccess, setRegSuccess] = useState(false);
  const [submittedRegCode, setSubmittedRegCode] = useState('');

  // Computations for Score Calculator
  const round1Total = Number((calcMath + calcEnglish + calcLiterature).toFixed(2));
  const specializedWeighted = Number((calcSpecialized * 1.5).toFixed(2));
  const finalAdmissionScore = Number((specializedWeighted + round1Total + calcPriority).toFixed(2));
  const hasFailingScore = calcMath < 4.0 || calcEnglish < 4.0 || calcLiterature < 4.0 || calcSpecialized < 4.0;
  const targetClassObj = thptChuyenClasses.find(c => c.id === calcTargetClassId) || thptChuyenClasses[0];
  const scoreDiff = Number((finalAdmissionScore - targetClassObj.benchmark2025).toFixed(2));

  // Handle Candidate Lookup
  const handleSearchCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const candidate = sampleCandidatesData.find(c => 
      c.registrationNumber.toLowerCase().includes(query) ||
      c.fullName.toLowerCase().includes(query)
    );

    setFoundCandidate(candidate || null);
    setSearchAttempted(true);
  };

  const handleQuickLookup = (sbd: string) => {
    setSearchQuery(sbd);
    const candidate = sampleCandidatesData.find(c => c.registrationNumber === sbd);
    setFoundCandidate(candidate || null);
    setSearchAttempted(true);
  };

  // Handle Online Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `CV26-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRegCode(randomCode);
    setRegSuccess(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* HERO BANNER - TRƯỜNG THPT CHUYÊN ĐẠI HỌC VINH */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-7 sm:p-10 shadow-lg border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Kỳ Thi Tuyển Sinh Lớp 10 Khóa 61 (Năm Học 2026 - 2027)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            TRƯỜNG THPT CHUYÊN — ĐẠI HỌC VINH
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
            Thành lập năm 1966, Trường THPT Chuyên - Trường Đại học Vinh là một trong những trung tâm phát hiện, bồi dưỡng nhân tài Toán - Tin - Khoa học tự nhiên & Ngoại ngữ hàng đầu cả nước với bề dày huy chương Olympic quốc tế.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[10px] text-indigo-200 block uppercase font-bold">Chỉ tiêu 2026</span>
              <span className="text-lg font-black text-amber-300 font-mono">385</span>
              <span className="text-[10px] text-slate-300 block">8 Khối chuyên & CLC</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[10px] text-indigo-200 block uppercase font-bold">Lịch Thi</span>
              <span className="text-lg font-black text-white font-mono">14 - 15/06</span>
              <span className="text-[10px] text-slate-300 block">Tại Cơ sở 1 ĐHV</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[10px] text-amber-300 block uppercase font-bold">Cách tính điểm</span>
              <span className="text-base font-black text-amber-300 font-mono">Chuyên × 1,5 + Vòng I</span>
              <span className="text-[10px] text-slate-300 block">Vòng I: Toán + Anh + Văn</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[10px] text-indigo-200 block uppercase font-bold">Tuyển thẳng</span>
              <span className="text-lg font-black text-white font-mono">HSG & IELTS</span>
              <span className="text-[10px] text-slate-300 block">Hạn nộp 25/05/2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* PORTAL NAVIGATION TABS: classes -> schedule -> formula -> lookup -> register -> direct */}
      <div className="border-b border-slate-200">
        <nav className="flex items-center gap-2 overflow-x-auto pb-2 text-xs sm:text-sm font-semibold">
          
          {/* Tab 1: 8 Lớp Chuyên & Chỉ tiêu */}
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'classes'
                ? 'bg-indigo-900 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>8 Lớp Chuyên & Chỉ tiêu</span>
          </button>

          {/* Tab 2: Lịch Thi & Cấu Trúc Đề */}
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'schedule'
                ? 'bg-indigo-900 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Lịch Thi & Cấu Trúc Đề</span>
          </button>

          {/* Tab 3: Cách Tính Điểm & Tính Điểm Thử (Moved directly after Schedule) */}
          <button
            onClick={() => setActiveTab('formula')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'formula'
                ? 'bg-indigo-900 text-white shadow-xs font-bold ring-2 ring-indigo-400'
                : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-100'
            }`}
          >
            <Calculator className={`w-4 h-4 ${activeTab === 'formula' ? 'text-amber-300' : 'text-slate-500'}`} />
            <span>Cách Tính Điểm</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
              activeTab === 'formula' ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
            }`}>
              × 1,5
            </span>
          </button>

          {/* Tab 4: Tra Cứu Điểm & SBD */}
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'lookup'
                ? 'bg-indigo-900 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Tra Cứu Điểm & SBD</span>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-mono px-1.5 py-0.2 rounded-md font-bold">
              Demo SBD
            </span>
          </button>

          {/* Tab 5: Đăng Ký Dự Thi Online */}
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'register'
                ? 'bg-indigo-900 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-100'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Đăng Ký Dự Thi Online</span>
          </button>

          {/* Tab 6: Tuyển Thẳng & Ưu Tiên */}
          <button
            onClick={() => setActiveTab('direct')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'direct'
                ? 'bg-indigo-900 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Tuyển Thẳng & Ưu Tiên</span>
          </button>
        </nav>
      </div>

      {/* TAB 1: 8 KHỐI CHUYÊN & CHỈ TIÊU */}
      {activeTab === 'classes' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Danh Mục Các Khối Chuyên Tuyển Sinh 2026</h2>
              <p className="text-xs text-slate-500">Chỉ tiêu phân bổ theo từng khối chuyên và lịch sử điểm chuẩn 3 năm gần nhất.</p>
            </div>
            <div className="text-xs font-mono bg-indigo-50 text-indigo-900 border border-indigo-200 px-3 py-1.5 rounded-xl font-bold">
              Tổng chỉ tiêu: 385 học sinh / 11 lớp
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {thptChuyenClasses.map(cls => (
              <div 
                key={cls.id}
                onClick={() => setSelectedClass(cls)}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all cursor-pointer flex flex-col justify-between ${
                  selectedClass.id === cls.id 
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20' 
                    : 'border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded">
                      {cls.code}
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700">
                      {cls.quota} chỉ tiêu ({cls.classesCount} lớp)
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{cls.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{cls.description}</p>

                  <div className="bg-slate-50 p-2.5 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Điểm chuẩn 2025:</span>
                      <strong className="text-indigo-950 font-mono">{cls.benchmark2025}</strong>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Điểm chuẩn 2024:</span>
                      <span className="font-mono">{cls.benchmark2024}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Điểm chuẩn 2023:</span>
                      <span className="font-mono">{cls.benchmark2023}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
                  <span>Chi tiết môn thi</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Selected Class Deep View */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-900 text-amber-300 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-indigo-700 font-bold uppercase">{selectedClass.code}</span>
                  <h3 className="text-lg font-bold text-slate-900">{selectedClass.name} — Khóa 61</h3>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-700">
                  Phụ trách: <strong>{selectedClass.facultyLead}</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">Môn thi & Công thức:</span>
                <p className="text-slate-900 font-semibold">{selectedClass.examSubject}</p>
                <p className="text-[11px] text-slate-500">Môn chuyên × 1,5 + Vòng I (Toán + Tiếng Anh + Ngữ văn).</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">Định hướng tương lai:</span>
                <p className="text-slate-900 font-semibold">{selectedClass.careerFocus}</p>
                <p className="text-[11px] text-slate-500">Được ưu tiên tuyển thẳng vào các ngành tương ứng của Trường Đại học Vinh.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">Tuyển thẳng / Ưu tiên:</span>
                <p className="text-slate-900 font-semibold">
                  {selectedClass.directAdmissionAvailable ? 'Áp dụng tuyển thẳng HSG & IELTS' : 'Chỉ xét tuyển từ điểm thi'}
                </p>
                <p className="text-[11px] text-slate-500">Chi tiết tại tab Tuyển Thẳng & Ưu Tiên.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LỊCH THI & CẤU TRÚC ĐỀ THI */}
      {activeTab === 'schedule' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Lịch Thi Chính Thức Kỳ Thi Tuyển Sinh Lớp 10</h2>
            <p className="text-xs text-slate-500">Kỳ thi diễn ra trong 02 ngày: 14/06 và 15/06/2026 tại khuôn viên Trường Đại học Vinh.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {thptChuyenExamSchedules.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-indigo-900 text-white px-2.5 py-1 rounded-lg">
                      {item.date}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Buổi {item.session} (bắt đầu {item.startTime})
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    item.type === 'Chuyên' 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-sky-100 text-sky-900 border border-sky-300'
                  }`}>
                    {item.type === 'Chuyên' ? 'Hệ số 1,5' : 'Hệ số 1,0'}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{item.subject}</h3>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Thời gian làm bài: <strong>{item.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Địa điểm: {item.location}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  * {item.notes}
                </p>
              </div>
            ))}
          </div>

          {/* Quy tắc tính điểm và xét trúng tuyển */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Nguyên Tắc Xét Tuyển Trúng Tuyển:</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 list-disc list-inside leading-relaxed">
              <li><strong>Điểm trúng tuyển</strong> = (Điểm thi môn chuyên × hệ số 1,5) + Tổng điểm thi các bài thi vòng I (Toán, Tiếng Anh, Ngữ văn) + Điểm ưu tiên (nếu có).</li>
              <li>Thí sinh phải tham gia thi đủ các môn thi quy định, không vi phạm Quy chế thi đến mức hủy kết quả.</li>
              <li><strong>Điểm sàn từng môn thi:</strong> Tất cả các bài thi (Vòng I và môn chuyên) đều phải đạt từ <strong>4,0 điểm trở lên</strong> (theo thang điểm 10).</li>
              <li>Xét trúng tuyển theo ĐXT từ cao xuống thấp cho đến khi đủ chỉ tiêu từng lớp chuyên.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: CÁCH TÍNH ĐIỂM & CÔNG CỤ TÍNH ĐIỂM THỬ (PLACED DIRECTLY AFTER SCHEDULE) */}
      {activeTab === 'formula' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Unified Tool Card matching design language */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Header: Title and Unified Formula */}
            <div className="space-y-4 pb-5 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-900 text-amber-300 flex items-center justify-center shadow-xs">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Công Cụ Tính Điểm Thử & Ước Lượng Cơ Hội Trúng Tuyển
                    </h3>
                    <p className="text-xs text-slate-500">
                      Mô phỏng điểm xét tuyển tự động theo công thức chính thức của Trường THPT Chuyên — Đại học Vinh.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-900 px-3 py-1 rounded-xl border border-indigo-200">
                    Thang điểm 45.0
                  </span>
                  <span className="text-xs font-mono font-bold bg-amber-50 text-amber-950 px-3 py-1 rounded-xl border border-amber-300">
                    Điểm sàn ≥ 4.0
                  </span>
                </div>
              </div>

              {/* Cohesive Formula Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                      Căn cứ công thức xét tuyển chính thức:
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Vòng I (Toán, Tiếng Anh, Ngữ văn) + Môn Chuyên × 1,5
                    </span>
                  </div>
                  <div className="text-xs sm:text-base font-extrabold font-mono tracking-tight text-white leading-relaxed">
                    <span className="text-indigo-300">Điểm trúng tuyển</span>
                    <span className="text-slate-400 mx-2">=</span>
                    <span className="text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                      Điểm thi môn chuyên × hệ số 1,5
                    </span>
                    <span className="text-slate-400 mx-2">+</span>
                    <span className="text-sky-300 bg-sky-400/20 px-2 py-0.5 rounded border border-sky-400/30">
                      Tổng điểm thi các bài thi vòng I (Toán, Tiếng Anh, Ngữ văn)
                    </span>
                    {calcPriority > 0 && <span className="text-emerald-300 ml-1.5">+ Ưu tiên</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs & Outputs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Round 1 inputs */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      1. Điểm các bài thi Vòng I (Hệ số 1,0):
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">
                      Tối đa 30.0đ
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Math */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <label className="font-semibold text-slate-700">Môn Toán:</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.25"
                          value={calcMath}
                          onChange={e => setCalcMath(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                          className="w-14 p-1 text-center font-mono font-bold text-xs bg-slate-100 rounded border border-slate-300 text-indigo-950 focus:outline-indigo-600"
                        />
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        step="0.25"
                        value={calcMath}
                        onChange={e => setCalcMath(parseFloat(e.target.value))}
                        className="w-full accent-indigo-900 cursor-pointer"
                      />
                    </div>

                    {/* English */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <label className="font-semibold text-slate-700">Tiếng Anh:</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.25"
                          value={calcEnglish}
                          onChange={e => setCalcEnglish(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                          className="w-14 p-1 text-center font-mono font-bold text-xs bg-slate-100 rounded border border-slate-300 text-indigo-950 focus:outline-indigo-600"
                        />
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        step="0.25"
                        value={calcEnglish}
                        onChange={e => setCalcEnglish(parseFloat(e.target.value))}
                        className="w-full accent-indigo-900 cursor-pointer"
                      />
                    </div>

                    {/* Literature */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <label className="font-semibold text-slate-700">Ngữ văn:</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.25"
                          value={calcLiterature}
                          onChange={e => setCalcLiterature(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                          className="w-14 p-1 text-center font-mono font-bold text-xs bg-slate-100 rounded border border-slate-300 text-indigo-950 focus:outline-indigo-600"
                        />
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        step="0.25"
                        value={calcLiterature}
                        onChange={e => setCalcLiterature(parseFloat(e.target.value))}
                        className="w-full accent-indigo-900 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
                    <span className="text-slate-500 font-medium">Tổng điểm 3 môn Vòng I:</span>
                    <span className="font-mono font-bold text-indigo-950 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                      {calcMath} + {calcEnglish} + {calcLiterature} = {round1Total} điểm
                    </span>
                  </div>
                </div>

                {/* Specialized subject input */}
                <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      2. Bài thi Môn Chuyên (Nhân hệ số 1,5):
                    </span>
                    <span className="font-mono text-xs font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                      Hệ số 1,5
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Khối chuyên dự thi:</label>
                      <select
                        value={calcTargetClassId}
                        onChange={e => setCalcTargetClassId(e.target.value)}
                        className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-indigo-600"
                      >
                        {thptChuyenClasses.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name} (Điểm chuẩn 2025: {c.benchmark2025})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <label className="font-semibold text-slate-700">Điểm thi chuyên:</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.25"
                          value={calcSpecialized}
                          onChange={e => setCalcSpecialized(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                          className="w-14 p-1 text-center font-mono font-bold text-xs bg-amber-50 rounded border border-amber-300 text-amber-950 focus:outline-indigo-600"
                        />
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        step="0.25"
                        value={calcSpecialized}
                        onChange={e => setCalcSpecialized(parseFloat(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-200/80 text-xs">
                    <span className="text-amber-900 font-medium">Điểm môn chuyên sau khi nhân hệ số 1,5:</span>
                    <span className="font-mono font-bold text-amber-950 bg-white px-2.5 py-0.5 rounded-lg border border-amber-200">
                      {calcSpecialized} × 1,5 = {specializedWeighted} điểm
                    </span>
                  </div>
                </div>

                {/* Priority score */}
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-700">3. Điểm ưu tiên khu vực / chính sách (nếu có):</span>
                  <div className="flex items-center gap-1.5">
                    {[0, 0.5, 1.0, 1.5].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setCalcPriority(p)}
                        className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors cursor-pointer ${
                          calcPriority === p 
                            ? 'bg-indigo-900 text-white shadow-xs' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        +{p}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Output Card */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono font-bold text-amber-300">
                      Kết Quả Mô Phỏng
                    </span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                      Năm học 2026 - 2027
                    </span>
                  </div>

                  {/* Big Final Score */}
                  <div className="text-center py-2 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-xs text-indigo-200 block uppercase font-bold tracking-wider">
                      Điểm Trúng Tuyển Dự Kiến
                    </span>
                    <span className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight my-1 block">
                      {finalAdmissionScore}
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      = {specializedWeighted} (Chuyên × 1,5) + {round1Total} (Vòng I) {calcPriority > 0 ? `+ ${calcPriority}` : ''}
                    </span>
                  </div>

                  {/* Failing Score Check */}
                  {hasFailingScore ? (
                    <div className="p-3 bg-red-900/50 border border-red-500/50 rounded-xl flex items-start gap-2.5 text-xs text-red-200">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Không đạt điều kiện điểm sàn!</strong>
                        <span>Có ít nhất một môn thi dưới 4.0 điểm (điểm liệt). Thí sinh không đủ điều kiện xét tuyển.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-emerald-200 font-semibold">Tất cả bài thi ≥ 4.0 điểm</span>
                        </div>
                        <span className="text-[10px] font-mono bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded font-bold">
                          ĐẠT ĐIỀU KIỆN
                        </span>
                      </div>

                      {/* Comparison with Target Class */}
                      <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 space-y-1 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Mục tiêu: <strong>{targetClassObj.name}</strong></span>
                          <span>Chuẩn 2025: <strong className="font-mono text-white">{targetClassObj.benchmark2025}</strong></span>
                        </div>
                        <div className="flex justify-between items-center pt-1 text-sm font-bold">
                          <span className="text-slate-300">Chênh lệch:</span>
                          <span className={`font-mono ${scoreDiff >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {scoreDiff >= 0 ? `+${scoreDiff}` : scoreDiff} điểm
                          </span>
                        </div>
                      </div>

                      {/* Assessment badge */}
                      <div className="text-center py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-400 text-slate-950">
                        {scoreDiff >= 1.0 
                          ? '★ Khả năng trúng tuyển: RẤT CAO'
                          : scoreDiff >= 0 
                          ? '✔ Khả năng trúng tuyển: KHẢ QUAN'
                          : scoreDiff >= -1.5 
                          ? '⚠ Khả năng cạnh tranh / Dự khuyết' 
                          : 'Cần nâng cao điểm môn chuyên và Vòng 1'}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab('register')}
                  className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Nộp Hồ Sơ Đăng Ký Dự Thi Ngay</span>
                </button>
              </div>

            </div>

            {/* Benchmark Comparison Table for all 8 classes */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                So sánh điểm dự kiến {finalAdmissionScore} với điểm chuẩn 8 lớp chuyên:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {thptChuyenClasses.map(cls => {
                  const diff = Number((finalAdmissionScore - cls.benchmark2025).toFixed(2));
                  const isQualifying = !hasFailingScore && diff >= 0;

                  return (
                    <div 
                      key={cls.id} 
                      className={`p-3 rounded-xl border flex flex-col justify-between ${
                        isQualifying 
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white shadow-xs">
                            {cls.code}
                          </span>
                          <span className={`text-[10px] font-mono font-bold ${diff >= 0 ? 'text-emerald-700' : 'text-slate-500'}`}>
                            {diff >= 0 ? `+${diff}` : diff}
                          </span>
                        </div>
                        <span className="font-bold text-xs truncate block">{cls.name}</span>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Chuẩn 2025:</span>
                        <strong className="font-mono">{cls.benchmark2025}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: TRA CỨU ĐIỂM THI & SBD */}
      {activeTab === 'lookup' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Tra Cứu Điểm Thi & Số Báo Danh Tuyển Sinh Lớp 10</h2>
            <p className="text-xs text-slate-500">Nhập Số báo danh (SBD) hoặc Họ và tên thí sinh để tra cứu kết quả.</p>
          </div>

          {/* Quick Demo SBD Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Bấm thử mẫu SBD có sẵn:</span>
            <button
              onClick={() => handleQuickLookup('CV26-0012')}
              className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-mono font-bold border border-indigo-200 cursor-pointer"
            >
              CV26-0012 (Chuyên Toán: 39.0đ)
            </button>
            <button
              onClick={() => handleQuickLookup('CV26-0089')}
              className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-mono font-bold border border-indigo-200 cursor-pointer"
            >
              CV26-0089 (Chuyên Anh: 40.38đ)
            </button>
            <button
              onClick={() => handleQuickLookup('CV26-0304')}
              className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-mono font-bold border border-indigo-200 cursor-pointer"
            >
              CV26-0304 (Chuyên Tin: 35.75đ)
            </button>
            <button
              onClick={() => handleQuickLookup('CV26-TT01')}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-mono font-bold border border-emerald-200 cursor-pointer"
            >
              CV26-TT01 (Tuyển thẳng)
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchCandidate} className="max-w-2xl flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Nhập SBD (vd: CV26-0012) hoặc Họ tên thí sinh..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-indigo-600 focus:border-indigo-600 shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shrink-0"
            >
              Tra cứu ngay
            </button>
          </form>

          {/* Results display */}
          {searchAttempted && foundCandidate && (
            <div className="bg-white rounded-2xl border border-indigo-200 shadow-md p-6 max-w-3xl space-y-6 animate-in slide-in-from-top-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold bg-indigo-900 text-white px-2.5 py-1 rounded-lg">
                      {foundCandidate.registrationNumber}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900">{foundCandidate.fullName}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Ngày sinh: {foundCandidate.dob} · Trường: {foundCandidate.previousSchool} ({foundCandidate.province})
                  </p>
                </div>

                <div>
                  <span className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 ${
                    foundCandidate.resultStatus === 'Trúng tuyển chính thức' || foundCandidate.resultStatus === 'Tuyển thẳng'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : foundCandidate.resultStatus === 'Dự khuyết'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{foundCandidate.resultStatus}</span>
                  </span>
                </div>
              </div>

              {/* Updated Score Grid matching the formula */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                
                {/* Toán V1 */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Toán (Vòng I)</span>
                  <span className="text-lg font-black text-slate-800 font-mono">
                    {foundCandidate.resultStatus === 'Tuyển thẳng' ? 'Miễn' : foundCandidate.mathGeneralScore}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Hệ số 1,0</span>
                </div>

                {/* Tiếng Anh V1 */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Anh (Vòng I)</span>
                  <span className="text-lg font-black text-slate-800 font-mono">
                    {foundCandidate.resultStatus === 'Tuyển thẳng' ? 'Miễn' : foundCandidate.englishGeneralScore}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Hệ số 1,0</span>
                </div>

                {/* Ngữ văn V1 */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Văn (Vòng I)</span>
                  <span className="text-lg font-black text-slate-800 font-mono">
                    {foundCandidate.resultStatus === 'Tuyển thẳng' ? 'Miễn' : foundCandidate.literatureGeneralScore}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Hệ số 1,0</span>
                </div>

                {/* Môn Chuyên */}
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-300 text-center">
                  <span className="text-[10px] text-amber-950 font-bold uppercase block">Môn Chuyên</span>
                  <span className="text-lg font-black text-amber-950 font-mono">
                    {foundCandidate.resultStatus === 'Tuyển thẳng' ? 'Miễn' : foundCandidate.specializedScore}
                  </span>
                  <span className="text-[10px] text-amber-800 block font-bold">Hệ số 1,5</span>
                </div>

                {/* Ưu tiên */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Ưu tiên</span>
                  <span className="text-lg font-black text-slate-800 font-mono">
                    +{foundCandidate.priorityScore}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Chính sách</span>
                </div>

                {/* Tổng điểm trúng tuyển */}
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-300 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase block">Tổng điểm</span>
                  <span className="text-xl font-black text-emerald-950 font-mono">
                    {foundCandidate.resultStatus === 'Tuyển thẳng' ? '100%' : foundCandidate.totalScore}
                  </span>
                  <span className="text-[10px] text-emerald-700 block font-bold">ĐXT Trúng tuyển</span>
                </div>
              </div>

              {/* Formula details */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span>Khối chuyên đăng ký: <strong className="text-slate-900">{foundCandidate.targetClass}</strong></span>
                {foundCandidate.resultStatus !== 'Tuyển thẳng' && (
                  <span className="font-mono text-amber-950 font-semibold text-[11px]">
                    Chi tiết: ({foundCandidate.specializedScore} × 1,5 = {(foundCandidate.specializedScore * 1.5).toFixed(2)}) + ({foundCandidate.mathGeneralScore} + {foundCandidate.englishGeneralScore} + {foundCandidate.literatureGeneralScore} = {(foundCandidate.mathGeneralScore + foundCandidate.englishGeneralScore + foundCandidate.literatureGeneralScore).toFixed(2)}) = {foundCandidate.totalScore}
                  </span>
                )}
              </div>

              {/* Action */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => alert(`Đang chuẩn bị Giấy báo trúng tuyển bản PDF cho thí sinh ${foundCandidate.fullName} (SBD: ${foundCandidate.registrationNumber})...`)}
                  className="px-4 py-2 bg-indigo-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Giấy Báo Kết Quả</span>
                </button>
              </div>
            </div>
          )}

          {searchAttempted && !foundCandidate && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-2xl space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">Không tìm thấy thông tin thí sinh</h4>
              <p className="text-xs text-slate-500">Vui lòng kiểm tra lại Số báo danh (ví dụ: CV26-0012) hoặc bấm vào các nút SBD mẫu phía trên để xem kết quả demo.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: ĐĂNG KÝ DỰ THI TRỰC TUYẾN */}
      {activeTab === 'register' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Đăng Ký Dự Thi Tuyển Sinh Lớp 10 Trực Tuyến</h2>
            <p className="text-xs text-slate-500">Hệ thống tiếp nhận hồ sơ đăng ký nguyện vọng lớp chuyên năm học 2026 - 2027.</p>
          </div>

          {regSuccess ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 max-w-2xl space-y-4 text-center animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">Đăng Ký Hồ Sơ Thành Công!</h3>
              <p className="text-xs text-emerald-800">
                Mã hồ sơ đăng ký dự thi của em: <strong className="font-mono text-base bg-emerald-200/80 px-2 py-0.5 rounded text-emerald-950">{submittedRegCode}</strong>
              </p>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thông tin xác nhận đã được gửi về số điện thoại phụ huynh. Hội đồng tuyển sinh Trường THPT Chuyên sẽ kiểm tra và cấp Số báo danh trước ngày 05/06/2026.
              </p>
              <button
                onClick={() => setRegSuccess(false)}
                className="px-5 py-2.5 bg-emerald-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 cursor-pointer"
              >
                Đăng ký thêm thí sinh khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 max-w-3xl space-y-6 shadow-xs">
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-indigo-950 uppercase tracking-wider pb-2 border-b border-slate-100">
                  1. Thông tin thí sinh
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Họ và tên thí sinh *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Nguyễn Văn A" 
                      value={regForm.fullName}
                      onChange={e => setRegForm({...regForm, fullName: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Ngày sinh *</label>
                    <input 
                      type="date" 
                      required
                      value={regForm.dob}
                      onChange={e => setRegForm({...regForm, dob: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Trường THCS đang học *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="THCS Đặng Thai Mai, TP Vinh" 
                      value={regForm.juniorHighSchool}
                      onChange={e => setRegForm({...regForm, juniorHighSchool: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tỉnh / Thành phố *</label>
                    <select
                      value={regForm.province}
                      onChange={e => setRegForm({...regForm, province: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-indigo-600 bg-white"
                    >
                      <option value="Nghệ An">Nghệ An</option>
                      <option value="Hà Tĩnh">Hà Tĩnh</option>
                      <option value="Thanh Hóa">Thanh Hóa</option>
                      <option value="Khác">Tỉnh thành khác</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-indigo-950 uppercase tracking-wider pb-2 border-b border-slate-100">
                  2. Nguyện vọng đăng ký lớp chuyên
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nguyện vọng 1 (Lớp chuyên chính) *</label>
                    <select
                      value={regForm.targetClassId}
                      onChange={e => setRegForm({...regForm, targetClassId: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-indigo-600 bg-white font-semibold text-indigo-950"
                    >
                      {thptChuyenClasses.filter(c => c.id !== 'clc-toan-anh').map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.quota} chỉ tiêu)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nguyện vọng 2 (Lớp Chất lượng cao)</label>
                    <select
                      value={regForm.secondChoice}
                      onChange={e => setRegForm({...regForm, secondChoice: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-indigo-600 bg-white"
                    >
                      <option value="clc-toan-anh">Có đăng ký xét Lớp Chất lượng cao (CLC)</option>
                      <option value="none">Không đăng ký nguyện vọng 2</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-indigo-950 uppercase tracking-wider pb-2 border-b border-slate-100">
                  3. Thông tin liên hệ phụ huynh
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Họ tên Phụ huynh / Người giám hộ *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Nguyễn Văn B" 
                      value={regForm.parentName}
                      onChange={e => setRegForm({...regForm, parentName: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Số điện thoại nhận tin nhắn SMS *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="0912 345 678" 
                      value={regForm.parentPhone}
                      onChange={e => setRegForm({...regForm, parentPhone: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-indigo-600"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-sm"
                >
                  Xác Nhận Nộp Hồ Sơ Đăng Ký Dự Thi
                </button>
              </div>

            </form>
          )}
        </div>
      )}

      {/* TAB 6: TUYỂN THẲNG & ƯU TIÊN */}
      {activeTab === 'direct' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Quy Định Tuyển Thẳng & Ưu Tiên Tuyển Sinh Lớp 10</h2>
            <p className="text-xs text-slate-500">Áp dụng cho học sinh giỏi cấp tỉnh/quốc gia và chứng chỉ ngoại ngữ quốc tế.</p>
          </div>

          <div className="space-y-4">
            {thptChuyenDirectRules.map((rule, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-sm text-slate-900">{rule.category}</h3>
                  </div>

                  <span className="text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-lg">
                    Hạn nộp: {rule.submissionDeadline}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-semibold text-slate-700 block">Điều kiện áp dụng:</span>
                  <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                    {rule.conditions.map((cond, cIdx) => (
                      <li key={cIdx} className="leading-relaxed">{cond}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-indigo-900 bg-indigo-50/70 p-3 rounded-xl border border-indigo-100">
                  <span>Áp dụng cho các lớp: <strong>{rule.eligibleClasses.join(', ')}</strong></span>
                  <button 
                    onClick={() => setActiveTab('register')}
                    className="font-bold underline hover:text-indigo-950 cursor-pointer"
                  >
                    Nộp minh chứng ngay →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <span className="font-bold text-slate-800">Liên hệ Ban Tuyển sinh Trường THPT Chuyên:</span>
            <p>Văn phòng Trường THPT Chuyên - Cơ sở 1 Trường Đại học Vinh, số 182 Lê Duẩn, TP. Vinh, Nghệ An.</p>
            <p>Điện thoại: <strong>(0238) 3855 452</strong> · Hotline: <strong>0913 272 888</strong> · Website: thptchuyen.vinhuni.edu.vn</p>
          </div>
        </div>
      )}

    </div>
  );
};
