import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { vinhUniAdmissionChannels } from '../../data/mockData';
import { 
  GraduationCap, 
  Search, 
  ArrowRight, 
  Calendar, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  ExternalLink,
  BookOpen,
  School,
  Briefcase,
  Globe,
  Award,
  Trophy
} from 'lucide-react';
import { PublicDHCQ } from './PublicDHCQ';
import { PublicTHSP } from './PublicTHSP';
import { PublicVLVH } from './PublicVLVH';
import { PublicInternational } from './PublicInternational';
import { PublicPostgraduate } from './PublicPostgraduate';
import { PublicTHPTChuyen } from './PublicTHPTChuyen';

export const PublicHome: React.FC = () => {
  const { 
    currentAdmissionState, 
    selectedCycle, 
    documents, 
    setActivePortal, 
    activeChannel,
    setActiveChannel,
    setPublicActiveTab 
  } = useAdmission();

  const [activeChannelId, setActiveChannelId] = useState<string>('dh-chinh-quy');
  const [globalSearch, setGlobalSearch] = useState('');

  const currentChannel = activeChannel !== 'dh-chinh-quy' ? activeChannel : activeChannelId;
  const activeMethodsCount = currentAdmissionState.methods.filter(m => m.status === 'active').length;

  return (
    <div className="space-y-12">
      
      {/* If viewing THPT Chuyên ĐH Vinh */}
      {currentChannel === 'thpt-chuyen' ? (
        <div className="space-y-10">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] hidden sm:inline">Kênh:</span>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('all');
                }}
                className="px-3 py-1 rounded-full font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                ← Danh mục 9 kênh
              </button>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('dh-chinh-quy');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-800" />
                <span>Đại học chính quy</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('thpt-chuyen');
                  setActiveChannelId('thpt-chuyen');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-indigo-950 text-white shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5 font-extrabold ring-2 ring-indigo-400"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span>THPT Chuyên ĐH Vinh</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-mono px-1 rounded font-bold">385 CT</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('thuc-hanh-su-pham');
                  setActiveChannelId('thuc-hanh-su-pham');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <School className="w-3.5 h-3.5 text-indigo-700" />
                <span>Thực hành Sư phạm</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('vua-lam-vua-hoc');
                  setActiveChannelId('vua-lam-vua-hoc');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                <span>Vừa làm vừa học</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('sinh-vien-quoc-te');
                  setActiveChannelId('sinh-vien-quoc-te');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-700" />
                <span>Sinh viên quốc tế</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('sau-dai-hoc');
                  setActiveChannelId('sau-dai-hoc');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Sau đại học</span>
              </button>
            </div>

            <div className="text-right text-[11px] text-slate-500 hidden md:block">
              Văn phòng THPT Chuyên · Nhà C, Cơ sở 1 ĐH Vinh (182 Lê Duẩn)
            </div>
          </div>

          <PublicTHPTChuyen />
        </div>
      ) : currentChannel === 'sau-dai-hoc' ? (
        <div className="space-y-10">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] hidden sm:inline">Kênh:</span>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('all');
                }}
                className="px-3 py-1 rounded-full font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                ← Danh mục 9 kênh
              </button>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('dh-chinh-quy');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-800" />
                <span>Đại học chính quy</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('thuc-hanh-su-pham');
                  setActiveChannelId('thuc-hanh-su-pham');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <School className="w-3.5 h-3.5 text-indigo-700" />
                <span>Thực hành Sư phạm</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('vua-lam-vua-hoc');
                  setActiveChannelId('vua-lam-vua-hoc');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                <span>Vừa làm vừa học</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('sinh-vien-quoc-te');
                  setActiveChannelId('sinh-vien-quoc-te');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-700" />
                <span>Sinh viên quốc tế</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('sau-dai-hoc');
                  setActiveChannelId('sau-dai-hoc');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-amber-400 text-slate-950 shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5 font-extrabold"
              >
                <Award className="w-3.5 h-3.5 text-slate-950" />
                <span>Sau đại học (ThS & TS)</span>
                <span className="bg-slate-950 text-amber-300 text-[10px] font-mono px-1 rounded font-bold">ĐỢT 2</span>
              </button>
            </div>

            <div className="text-right text-[11px] text-slate-500 hidden md:block">
              Phòng Đào tạo Sau đại học · Tầng 4 Nhà Điều hành ĐH Vinh
            </div>
          </div>

          <PublicPostgraduate />
        </div>
      ) : currentChannel === 'sinh-vien-quoc-te' ? (
        <div className="space-y-10">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] hidden sm:inline">Kênh:</span>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('all');
                }}
                className="px-3 py-1 rounded-full font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                ← Danh mục 9 kênh
              </button>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('dh-chinh-quy');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-800" />
                <span>Đại học chính quy</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('thuc-hanh-su-pham');
                  setActiveChannelId('thuc-hanh-su-pham');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <School className="w-3.5 h-3.5 text-indigo-700" />
                <span>Thực hành Sư phạm</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('vua-lam-vua-hoc');
                  setActiveChannelId('vua-lam-vua-hoc');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                <span>Vừa làm vừa học</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('sinh-vien-quoc-te');
                  setActiveChannelId('sinh-vien-quoc-te');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-indigo-900 text-white shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>Sinh viên quốc tế (International)</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-mono px-1 rounded font-bold">LÀO / EN</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('sau-dai-hoc');
                  setActiveChannelId('sau-dai-hoc');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Sau đại học (ThS/TS)</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-mono px-1 rounded font-bold">ĐỢT 2</span>
              </button>
            </div>

            <div className="text-right text-[11px] text-slate-500 hidden md:block">
              Phòng Khoa học & HTQT · Tầng 2 Nhà Điều hành
            </div>
          </div>

          <PublicInternational />
        </div>
      ) : currentChannel === 'vua-lam-vua-hoc' ? (
        <div className="space-y-10">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] hidden sm:inline">Kênh:</span>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('all');
                }}
                className="px-3 py-1 rounded-full font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                ← Danh mục 9 kênh
              </button>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('dh-chinh-quy');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-800" />
                <span>Đại học chính quy ({activeMethodsCount} PT)</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('thuc-hanh-su-pham');
                  setActiveChannelId('thuc-hanh-su-pham');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <School className="w-3.5 h-3.5 text-indigo-700" />
                <span>Trường Thực hành Sư phạm</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('vua-lam-vua-hoc');
                  setActiveChannelId('vua-lam-vua-hoc');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-emerald-900 text-white shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-300" />
                <span>Đại học Vừa làm vừa học (VLVH)</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-mono px-1 rounded font-bold">TB 07</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('sinh-vien-quoc-te');
                  setActiveChannelId('sinh-vien-quoc-te');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-700" />
                <span>Sinh viên quốc tế</span>
                <span className="bg-indigo-200 text-indigo-950 text-[10px] font-mono px-1 rounded font-bold">LÀO / EN</span>
              </button>
            </div>

            <div className="text-right text-[11px] text-slate-500 hidden md:block">
              Trung tâm GDTX · Tầng 5 Nhà Điều hành ĐH Vinh
            </div>
          </div>

          <PublicVLVH />
        </div>
      ) : currentChannel === 'thuc-hanh-su-pham' ? (
        <div className="space-y-10">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] hidden sm:inline">Kênh:</span>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('all');
                }}
                className="px-3 py-1 rounded-full font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                ← Danh mục 9 kênh
              </button>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('dh-chinh-quy');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-800" />
                <span>Đại học chính quy ({activeMethodsCount} PT)</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('thuc-hanh-su-pham');
                  setActiveChannelId('thuc-hanh-su-pham');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-indigo-900 text-white shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <School className="w-3.5 h-3.5 text-amber-300" />
                <span>Trường Thực hành Sư phạm (Mầm non - THPT)</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-mono px-1 rounded font-bold">Mới</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('vua-lam-vua-hoc');
                  setActiveChannelId('vua-lam-vua-hoc');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                <span>Vừa làm vừa học (VLVH)</span>
                <span className="bg-emerald-600 text-white text-[10px] font-mono px-1 rounded font-bold">TB 07</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('sinh-vien-quoc-te');
                  setActiveChannelId('sinh-vien-quoc-te');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-700" />
                <span>Sinh viên quốc tế</span>
                <span className="bg-indigo-200 text-indigo-950 text-[10px] font-mono px-1 rounded font-bold">LÀO / EN</span>
              </button>
            </div>

            <div className="text-right text-[11px] text-slate-500 hidden md:block">
              Trường THSP · Cơ sở 1: Lê Duẩn | Cơ sở 2: Nghi Ân
            </div>
          </div>

          <PublicTHSP />
        </div>
      ) : currentChannel === 'dh-chinh-quy' ? (
        <div className="space-y-10">
          
          {/* Quick channel tabs switcher at top */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] hidden sm:inline">Kênh:</span>
              <button
                onClick={() => setActiveChannelId('all')}
                className="px-3 py-1 rounded-full font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                ← Danh mục 9 kênh tuyển sinh
              </button>
              <button
                onClick={() => {
                  setActiveChannel('dh-chinh-quy');
                  setActiveChannelId('dh-chinh-quy');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-sky-900 text-white shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                <span>Đại học chính quy ({activeMethodsCount} PT)</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('thuc-hanh-su-pham');
                  setActiveChannelId('thuc-hanh-su-pham');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <School className="w-3.5 h-3.5 text-indigo-700" />
                <span>Trường Thực hành Sư phạm</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-mono px-1 rounded font-bold">Mới</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('vua-lam-vua-hoc');
                  setActiveChannelId('vua-lam-vua-hoc');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                <span>Vừa làm vừa học (VLVH)</span>
                <span className="bg-emerald-600 text-white text-[10px] font-mono px-1 rounded font-bold">TB 07</span>
              </button>
              <button
                onClick={() => {
                  setActiveChannel('sinh-vien-quoc-te');
                  setActiveChannelId('sinh-vien-quoc-te');
                }}
                className="px-3.5 py-1 rounded-full font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-700" />
                <span>Sinh viên quốc tế</span>
                <span className="bg-indigo-200 text-indigo-950 text-[10px] font-mono px-1 rounded font-bold">LÀO / EN</span>
              </button>
            </div>

            <div className="text-right text-[11px] text-slate-500 hidden md:block">
              Trường Đại học Vinh · Mã tuyển sinh: <strong className="text-sky-950 font-mono">TDV</strong>
            </div>
          </div>

          <PublicDHCQ />
        </div>
      ) : (
        /* HOME LANDING VIEW: 9 CHANNELS + HERO */
        <div className="space-y-12">
          
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-sm relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-200 border border-sky-400/30 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Cổng Tuyển Sinh VinhUni — Hệ Thống Tri Thức Số Hóa</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                CỔNG THÔNG TIN TUYỂN SINH TRƯỜNG ĐẠI HỌC VINH
              </h1>

              <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
                Nền tảng công bố thông tin tuyển sinh thời gian thực. Dữ liệu các phương thức, ngành học, chỉ tiêu và khung thời gian được số hóa trực tiếp từ các văn bản chính thức của Nhà trường.
              </p>

              {/* Search Bar */}
              <div className="pt-2 max-w-xl">
                <div className="bg-white rounded-2xl p-1.5 flex items-center shadow-lg border border-slate-200 text-xs">
                  <div className="pl-3 pr-2 text-slate-400">
                    <Search className="w-5 h-5 text-sky-800" />
                  </div>
                  <input
                    type="text"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder="Tìm kiếm phương thức, ngành học, lịch nộp hồ sơ..."
                    className="w-full bg-transparent border-none text-slate-800 text-sm focus:outline-none py-2"
                  />
                  <button 
                    onClick={() => setActiveChannelId('dh-chinh-quy')}
                    className="px-5 py-2.5 bg-sky-900 hover:bg-sky-800 text-white rounded-xl font-bold transition-colors shrink-0 cursor-pointer text-xs"
                  >
                    Khám phá
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 9 CHANNELS GRID */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  Hệ thống 9 bậc đào tạo
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Lựa Chọn Kênh Tuyển Sinh Phù Hợp
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                Nhấp vào từng kênh để xem đề án tuyển sinh chi tiết
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {vinhUniAdmissionChannels.map((channel) => {
                const isDHCQ = channel.id === 'dh-chinh-quy';
                const isTHPTChuyen = channel.id === 'thpt-chuyen';
                const isTHSP = channel.id === 'mam-non-tieu-hoc-th';
                const isVLVH = channel.id === 'vua-lam-vua-hoc';
                const isInternational = channel.id === 'hop-tac-quoc-te';
                const isSDH = channel.id === 'sau-dai-hoc';

                return (
                  <div
                    key={channel.id}
                    onClick={() => {
                      if (isDHCQ) {
                        setActiveChannel('dh-chinh-quy');
                        setActiveChannelId('dh-chinh-quy');
                        setPublicActiveTab('methods');
                      } else if (isTHPTChuyen) {
                        setActiveChannel('thpt-chuyen');
                        setActiveChannelId('thpt-chuyen');
                      } else if (isTHSP) {
                        setActiveChannel('thuc-hanh-su-pham');
                        setActiveChannelId('thuc-hanh-su-pham');
                      } else if (isVLVH) {
                        setActiveChannel('vua-lam-vua-hoc');
                        setActiveChannelId('vua-lam-vua-hoc');
                      } else if (isInternational) {
                        setActiveChannel('sinh-vien-quoc-te');
                        setActiveChannelId('sinh-vien-quoc-te');
                      } else if (isSDH) {
                        setActiveChannel('sau-dai-hoc');
                        setActiveChannelId('sau-dai-hoc');
                      } else {
                        alert(`Chương trình "${channel.title}" hiện lưu trữ trên hệ thống chuyên biệt. Vui lòng xem kênh Đại học chính quy, THPT Chuyên, Sau đại học, Vừa làm vừa học hoặc Sinh viên quốc tế để trải nghiệm demo.`);
                      }
                    }}
                    className={`rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between group ${
                      isDHCQ
                        ? 'bg-gradient-to-br from-white to-sky-50/50 border-sky-300 ring-2 ring-sky-500/20 shadow-md hover:border-sky-500'
                        : isTHPTChuyen
                        ? 'bg-gradient-to-br from-white to-indigo-50/80 border-indigo-400 ring-2 ring-indigo-500/30 shadow-md hover:border-indigo-600'
                        : isVLVH
                        ? 'bg-gradient-to-br from-white to-emerald-50/60 border-emerald-300 ring-2 ring-emerald-500/20 shadow-md hover:border-emerald-500'
                        : isTHSP
                        ? 'bg-gradient-to-br from-white to-indigo-50/60 border-indigo-300 ring-2 ring-indigo-500/20 shadow-md hover:border-indigo-500'
                        : isInternational
                        ? 'bg-gradient-to-br from-white to-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/30 shadow-md hover:border-indigo-600'
                        : isSDH
                        ? 'bg-gradient-to-br from-white to-amber-50/80 border-amber-400 ring-2 ring-amber-500/30 shadow-md hover:border-amber-600'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg ${
                          isDHCQ ? 'bg-sky-900 text-white' : 
                          isTHPTChuyen ? 'bg-indigo-950 text-amber-300' :
                          isVLVH ? 'bg-emerald-900 text-white' :
                          isTHSP ? 'bg-indigo-900 text-white' :
                          isInternational ? 'bg-indigo-950 text-white' :
                          isSDH ? 'bg-slate-950 text-amber-300' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {channel.code}
                        </span>

                        <span className={`text-[11px] font-semibold ${
                          isDHCQ ? 'text-sky-700 font-bold' : 
                          isTHPTChuyen ? 'text-indigo-900 font-bold' :
                          isVLVH ? 'text-emerald-700 font-bold' :
                          isTHSP ? 'text-indigo-700 font-bold' :
                          isInternational ? 'text-indigo-700 font-bold' :
                          isSDH ? 'text-amber-800 font-bold' :
                          'text-slate-500'
                        }`}>
                          {isTHPTChuyen ? 'Kỳ thi 14-15/06' : isSDH ? 'Thu hồ sơ Đợt 2 (TB 136)' : isVLVH ? 'Mới công bố TB 07' : isTHSP ? 'Cập nhật TB 02' : isInternational ? 'Tuyển sinh Quốc tế' : channel.tag}
                        </span>
                      </div>

                      <h3 className={`text-base font-extrabold transition-colors leading-snug ${
                        isDHCQ ? 'text-sky-950 group-hover:text-sky-700' : 
                        isTHPTChuyen ? 'text-indigo-950 group-hover:text-indigo-700' :
                        isVLVH ? 'text-emerald-950 group-hover:text-emerald-700' :
                        isTHSP ? 'text-indigo-950 group-hover:text-indigo-700' :
                        isInternational ? 'text-indigo-950 group-hover:text-indigo-700' :
                        isSDH ? 'text-slate-950 group-hover:text-amber-700' :
                        'text-slate-900'
                      }`}>
                        {isTHPTChuyen ? 'Trường THPT Chuyên ĐH Vinh (Lớp 10 Khóa 61)' : isInternational ? 'Sinh viên quốc tế (Lưu học sinh Lào & Quốc tế)' : isSDH ? 'Sau đại học (Thạc sĩ & Tiến sĩ 2026)' : channel.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isTHPTChuyen
                          ? 'Cái nôi đào tạo nhân tài Olympic thành lập năm 1966. Tuyển sinh 385 học sinh Lớp 10 cho 8 khối chuyên: Toán, Tin, Lý, Hóa, Sinh, Anh, Văn và Lớp Chất lượng cao.'
                          : isSDH
                          ? 'Tuyển sinh 30 ngành Thạc sĩ và 12 ngành Tiến sĩ. Công bố điểm trúng tuyển Đợt 1, tiếp tục thu hồ sơ Đợt 2 theo TB 136/TB-ĐHV. Đề án 89 & học bổng hỗ trợ.'
                          : isVLVH 
                          ? 'Đào tạo linh hoạt thứ 7, CN và tập trung hè. Gồm 16 ngành (8 ngành SP nâng chuẩn, 8 ngành kinh tế, kỹ thuật, luật, ngôn ngữ).' 
                          : isInternational
                          ? 'Tiếp nhận lưu học sinh quốc tế vào 54 ngành ĐH, 36 ngành Thạc sĩ, 16 ngành Tiến sĩ. Học bổng Hiệp định, KTX 10$/tháng, lớp dự bị Tiếng Việt 1 năm.'
                          : channel.desc}
                      </p>

                      {isDHCQ && (
                        <div className="p-2.5 rounded-xl bg-sky-100/70 text-sky-950 text-xs font-semibold flex items-center justify-between">
                          <span>Phương thức xét tuyển hiện hành:</span>
                          <span className="font-mono font-bold text-sky-900 bg-white px-2 py-0.5 rounded shadow-xs">
                            {activeMethodsCount} PHƯƠNG THỨC
                          </span>
                        </div>
                      )}

                      {isTHPTChuyen && (
                        <div className="p-2.5 rounded-xl bg-indigo-100/80 text-indigo-950 text-xs font-semibold flex items-center justify-between">
                          <span>Chỉ tiêu 8 khối chuyên:</span>
                          <span className="font-mono font-bold text-indigo-950 bg-white px-2 py-0.5 rounded shadow-xs">
                            385 CHỈ TIÊU · 11 LỚP
                          </span>
                        </div>
                      )}

                      {isVLVH && (
                        <div className="p-2.5 rounded-xl bg-emerald-100/70 text-emerald-950 text-xs font-semibold flex items-center justify-between">
                          <span>Chỉ tiêu 16 ngành (TB 07):</span>
                          <span className="font-mono font-bold text-emerald-900 bg-white px-2 py-0.5 rounded shadow-xs">
                            2.400 CHỈ TIÊU
                          </span>
                        </div>
                      )}

                      {isTHSP && (
                        <div className="p-2.5 rounded-xl bg-indigo-100/70 text-indigo-950 text-xs font-semibold flex items-center justify-between">
                          <span>Phân luồng 4 cấp học:</span>
                          <span className="font-mono font-bold text-indigo-900 bg-white px-2 py-0.5 rounded shadow-xs">
                            MẦM NON → THPT
                          </span>
                        </div>
                      )}

                      {isInternational && (
                        <div className="p-2.5 rounded-xl bg-indigo-100/80 text-indigo-950 text-xs font-semibold flex items-center justify-between">
                          <span>Học phí ĐH & Ký túc xá:</span>
                          <span className="font-mono font-bold text-indigo-900 bg-white px-2 py-0.5 rounded shadow-xs">
                            500 USD/NĂM · KTX 10$
                          </span>
                        </div>
                      )}

                      {isSDH && (
                        <div className="p-2.5 rounded-xl bg-amber-100/80 text-amber-950 text-xs font-semibold flex items-center justify-between">
                          <span>Quy mô đào tạo & Đợt 2:</span>
                          <span className="font-mono font-bold text-amber-950 bg-white px-2 py-0.5 rounded shadow-xs">
                            30 THẠC SĨ · 12 TIẾN SĨ
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                      <span className={
                        isDHCQ ? 'text-sky-800' : 
                        isTHPTChuyen ? 'text-indigo-800' :
                        isVLVH ? 'text-emerald-800' : 
                        isTHSP ? 'text-indigo-800' : 
                        isInternational ? 'text-indigo-800' :
                        isSDH ? 'text-amber-800' :
                        'text-slate-500'
                      }>
                        {isDHCQ || isTHPTChuyen || isVLVH || isTHSP || isInternational || isSDH ? 'Xem chi tiết & nộp hồ sơ' : 'Thông tin chi tiết'}
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isDHCQ ? 'text-sky-800' : 
                        isTHPTChuyen ? 'text-indigo-800' :
                        isVLVH ? 'text-emerald-800' : 
                        isTHSP ? 'text-indigo-800' : 
                        isInternational ? 'text-indigo-800' :
                        isSDH ? 'text-amber-800' :
                        'text-slate-400'
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* LATEST NOTICES FEED */}
          <section className="bg-slate-100/80 rounded-3xl p-8 border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  Thông báo & Cập nhật mới nhất
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Văn Bản Chỉ Đạo Tuyển Sinh Đại Học Vinh
                </h2>
              </div>
              <button 
                onClick={() => {
                  setActiveChannelId('dh-chinh-quy');
                  setPublicActiveTab('documents');
                }}
                className="text-xs font-bold text-sky-800 hover:text-sky-950 flex items-center gap-1 cursor-pointer"
              >
                <span>Xem toàn bộ văn bản</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {documents.map(doc => (
                <div 
                  key={doc.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="bg-sky-100 text-sky-900 font-bold px-2 py-0.5 rounded">
                        {doc.officialNumber}
                      </span>
                      <span className="text-slate-500">{doc.issueDate}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3">
                      {doc.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">{doc.fileSize}</span>
                    <button
                      onClick={() => {
                        setActiveChannelId('dh-chinh-quy');
                        setPublicActiveTab('methods');
                      }}
                      className="font-bold text-sky-800 hover:text-sky-950 flex items-center gap-1"
                    >
                      <span>Xem tri thức</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

    </div>
  );
};
