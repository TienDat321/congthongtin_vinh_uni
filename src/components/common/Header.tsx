import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  GraduationCap, 
  Search, 
  ShieldCheck, 
  ExternalLink, 
  Calendar,
  Layers,
  ChevronRight,
  Menu,
  X,
  FileText,
  School,
  Sparkles,
  Briefcase,
  Globe,
  Award,
  Trophy
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activePortal, 
    setActivePortal, 
    activeChannel,
    setActiveChannel,
    selectedCycle, 
    setSelectedCycle, 
    availableCycles,
    currentAdmissionState,
    setPublicActiveTab
  } = useAdmission();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand zone: Vinh University Seal & Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('dh-chinh-quy');
                setPublicActiveTab('methods');
              }}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-lg bg-sky-900 flex items-center justify-center text-amber-300 shadow-inner ring-1 ring-sky-800">
                <GraduationCap className="w-6 h-6 group-hover:scale-105 transition-transform" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-sky-900 block leading-tight">
                  Trường Đại học Vinh
                </span>
                <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight block leading-tight">
                  Cổng Tuyển Sinh VinhUni
                </span>
              </div>
            </button>
          </div>

          {/* Navigation links with DHCQ vs THSP Toggle */}
          <nav className="hidden lg:flex items-center gap-2 text-sm font-medium">
            
            {/* DHCQ Channel Button */}
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('dh-chinh-quy');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeChannel === 'dh-chinh-quy'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className={`w-3.5 h-3.5 ${activeChannel === 'dh-chinh-quy' ? 'text-amber-300' : 'text-slate-500'}`} />
              <span>Đại học</span>
            </button>

            {/* THPT Chuyen Channel Button */}
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('thpt-chuyen');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer relative ${
                activeChannel === 'thpt-chuyen'
                  ? 'bg-indigo-950 text-white shadow-xs ring-2 ring-indigo-400'
                  : 'text-slate-700 hover:text-indigo-950 hover:bg-indigo-50/70'
              }`}
            >
              <Trophy className={`w-3.5 h-3.5 ${activeChannel === 'thpt-chuyen' ? 'text-amber-300' : 'text-indigo-600'}`} />
              <span>THPT Chuyên</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-1 rounded font-mono shadow-xs">
                LỚP 10
              </span>
            </button>

            {/* THSP Channel Button (New Page requested by user) */}
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('thuc-hanh-su-pham');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer relative ${
                activeChannel === 'thuc-hanh-su-pham'
                  ? 'bg-indigo-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-indigo-950 hover:bg-indigo-50/60'
              }`}
            >
              <School className={`w-4 h-4 ${activeChannel === 'thuc-hanh-su-pham' ? 'text-amber-300' : 'text-indigo-600'}`} />
              <span>Thực hành Sư phạm</span>
            </button>

            {/* VLVH Channel Button (From official TB 07/TB-ĐHV) */}
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('vua-lam-vua-hoc');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer relative ${
                activeChannel === 'vua-lam-vua-hoc'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-950 hover:bg-emerald-50/60'
              }`}
            >
              <Briefcase className={`w-3.5 h-3.5 ${activeChannel === 'vua-lam-vua-hoc' ? 'text-amber-300' : 'text-emerald-700'}`} />
              <span>Vừa làm vừa học</span>
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-extrabold px-1 rounded font-mono shadow-xs">
                TB 07
              </span>
            </button>

            {/* Sinh viên quốc tế (International Students) */}
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('sinh-vien-quoc-te');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer relative ${
                activeChannel === 'sinh-vien-quoc-te'
                  ? 'bg-indigo-900 text-white shadow-xs ring-2 ring-indigo-400'
                  : 'text-slate-700 hover:text-indigo-950 hover:bg-indigo-50/60'
              }`}
            >
              <Globe className={`w-3.5 h-3.5 ${activeChannel === 'sinh-vien-quoc-te' ? 'text-amber-300' : 'text-indigo-700'}`} />
              <span>Sinh viên quốc tế</span>
              <span className="bg-indigo-100 text-indigo-950 text-[10px] font-extrabold px-1 rounded font-mono border border-indigo-200">
                LÀO / EN
              </span>
            </button>

            {/* Sau đại học (ThS 30 ngành & TS 12 ngành) */}
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('sau-dai-hoc');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer relative ${
                activeChannel === 'sau-dai-hoc'
                  ? 'bg-amber-400 text-slate-950 shadow-xs ring-2 ring-amber-300 font-extrabold'
                  : 'text-slate-700 hover:text-amber-950 hover:bg-amber-50/70'
              }`}
            >
              <Award className={`w-3.5 h-3.5 ${activeChannel === 'sau-dai-hoc' ? 'text-slate-950' : 'text-amber-600'}`} />
              <span>Sau đại học</span>
              <span className="bg-amber-100 text-amber-950 text-[10px] font-extrabold px-1 rounded font-mono border border-amber-300">
                ThS/TS
              </span>
            </button>

          </nav>

          {/* Actions: Cycle Selector + Admin Toggle */}
          <div className="flex items-center gap-3">
            {/* Cycle Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase px-1.5 hidden sm:inline">Năm:</span>
              {availableCycles.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCycle(c)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedCycle === c 
                      ? 'bg-sky-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Portal Switcher Button */}
            <button
              onClick={() => setActivePortal(activePortal === 'admin' ? 'public' : 'admin')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                activePortal === 'admin'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                  : 'bg-sky-900 text-white hover:bg-sky-800'
              }`}
            >
              {activePortal === 'admin' ? (
                <>
                  <Layers className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">Trở về</span> Cổng Thí sinh
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Admin Portal</span>
                </>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 space-y-1">
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('dh-chinh-quy');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-sky-900 font-bold hover:bg-slate-100 rounded-md"
            >
              🎓 Đại học chính quy ({currentAdmissionState.methods.filter(m => m.status === 'active').length} phương thức)
            </button>
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('thpt-chuyen');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-indigo-950 font-bold hover:bg-indigo-50 rounded-md"
            >
              🏆 Trường THPT Chuyên ĐH Vinh (385 chỉ tiêu Lớp 10)
            </button>
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('thuc-hanh-su-pham');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-indigo-900 font-bold hover:bg-indigo-50 rounded-md"
            >
              🏫 Thực hành Sư phạm (Mầm non - THPT)
            </button>
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('vua-lam-vua-hoc');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-emerald-900 font-bold hover:bg-emerald-50 rounded-md"
            >
              💼 Đại học Vừa làm vừa học (Thông báo 07/TB-ĐHV)
            </button>
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('sinh-vien-quoc-te');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-indigo-900 font-bold hover:bg-indigo-50 rounded-md"
            >
              🌍 Sinh viên quốc tế / International Students (Lào - Quốc tế)
            </button>
            <button 
              onClick={() => {
                setActivePortal('public');
                setActiveChannel('sau-dai-hoc');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-amber-950 font-bold hover:bg-amber-50 rounded-md"
            >
              🎓 Sau đại học (Thạc sĩ 30 ngành & Tiến sĩ 12 ngành)
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
