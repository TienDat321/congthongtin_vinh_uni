import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  Sparkles, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  HelpCircle, 
  FileCheck2, 
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronDown
} from 'lucide-react';

export const DemoScenarioBar: React.FC = () => {
  const { 
    activePortal, 
    setActivePortal, 
    activeChannel,
    setActiveChannel,
    resetAllData, 
    uploadAndAnalyzeSampleDoc, 
    availableCycles, 
    selectedCycle, 
    setSelectedCycle,
    currentAdmissionState,
    pendingChangeSets
  } = useAdmission();

  const [showPrinciplesModal, setShowPrinciplesModal] = useState(false);
  const [isRunningScenario, setIsRunningScenario] = useState(false);

  const activeMethodsCount = currentAdmissionState.methods.filter(m => m.status === 'active').length;

  const handleRun2027Scenario = async () => {
    setIsRunningScenario(true);
    setActivePortal('admin');
    await uploadAndAnalyzeSampleDoc("Ke_hoach_2027.pdf");
    setIsRunningScenario(false);
  };

  const handleRun98Scenario = async () => {
    setIsRunningScenario(true);
    setActivePortal('admin');
    await uploadAndAnalyzeSampleDoc("Thong_bao_98_TB-DHV.pdf");
    setIsRunningScenario(false);
  };

  return (
    <>
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left badge & principles */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-amber-400 tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              VINHUNI ADMISSIONS DEMO
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <button 
              onClick={() => setShowPrinciplesModal(true)}
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors underline-offset-2 hover:underline cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>3 Nguyên tắc Bất biến</span>
              <HelpCircle className="w-3 h-3 text-slate-400" />
            </button>

            {pendingChangeSets.length > 0 && (
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-500/30 flex items-center gap-1">
                <FileCheck2 className="w-3 h-3" />
                {pendingChangeSets.length} ChangeSet chờ duyệt
              </span>
            )}
          </div>

          {/* Center: Live State Indicators */}
          <div className="hidden lg:flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Chu kỳ hiện tại:</span>
              <div className="flex items-center gap-1">
                {availableCycles.map(cycle => (
                  <button
                    key={cycle}
                    onClick={() => setSelectedCycle(cycle)}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] font-medium transition-colors ${
                      selectedCycle === cycle 
                        ? 'bg-sky-600 text-white' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cycle}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-slate-500">·</span>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Số PT đang hiển thị:</span>
              <span className="font-mono font-semibold text-white px-1.5 py-0.5 bg-slate-800 rounded">
                {activeMethodsCount} phương thức
              </span>
            </div>
          </div>

          {/* Right: Quick actions for evaluation & demo */}
          <div className="flex items-center gap-2">
            {/* THSP Demo Toggle */}
            <button
              onClick={() => {
                setActivePortal('public');
                setActiveChannel(activeChannel === 'thuc-hanh-su-pham' ? 'dh-chinh-quy' : 'thuc-hanh-su-pham');
              }}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2 py-1 rounded font-extrabold flex items-center gap-1 transition-colors cursor-pointer text-[11px] shadow-xs"
              title="Chuyển đổi giao diện Tuyển sinh Thực hành Sư phạm (Mầm non - THPT)"
            >
              <span>🏫 {activeChannel === 'thuc-hanh-su-pham' ? '← ĐH Chính Quy' : 'THSP'}</span>
            </button>

            {/* VLVH Demo Toggle (From TB 07/TB-ĐHV) */}
            <button
              onClick={() => {
                setActivePortal('public');
                setActiveChannel(activeChannel === 'vua-lam-vua-hoc' ? 'dh-chinh-quy' : 'vua-lam-vua-hoc');
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer text-[11px] shadow-xs"
              title="Xem Tuyển sinh Đại học Vừa làm vừa học theo Thông báo số 07/TB-ĐHV"
            >
              <span>💼 {activeChannel === 'vua-lam-vua-hoc' ? '← ĐHCQ' : 'VLVH (TB 07)'}</span>
            </button>

            {/* Sinh viên quốc tế Demo Toggle (From Official International Notice) */}
            <button
              onClick={() => {
                setActivePortal('public');
                setActiveChannel(activeChannel === 'sinh-vien-quoc-te' ? 'dh-chinh-quy' : 'sinh-vien-quoc-te');
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer text-[11px] shadow-xs"
              title="Xem Tuyển sinh Lưu học sinh Lào & Sinh viên Quốc tế"
            >
              <span>🌍 {activeChannel === 'sinh-vien-quoc-te' ? '← ĐHCQ' : 'Quốc tế (Lào/EN)'}</span>
            </button>

            {/* Sau đại học Demo Toggle (From Official TB 34, 39, 136) */}
            <button
              onClick={() => {
                setActivePortal('public');
                setActiveChannel(activeChannel === 'sau-dai-hoc' ? 'dh-chinh-quy' : 'sau-dai-hoc');
              }}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2 py-1 rounded font-extrabold flex items-center gap-1 transition-colors cursor-pointer text-[11px] shadow-xs"
              title="Xem Tuyển sinh Thạc sĩ 30 ngành & Tiến sĩ 12 ngành (Đợt 2)"
            >
              <span>🎓 {activeChannel === 'sau-dai-hoc' ? '← ĐHCQ' : 'Sau đại học (ThS/TS)'}</span>
            </button>

            {/* Quick Demo: 4 -> 2 methods */}
            <button
              onClick={handleRun2027Scenario}
              disabled={isRunningScenario}
              className="hidden lg:flex bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded font-medium items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
              title="Kịch bản trọng tâm: Upload Ke_hoach_2027.pdf để biến đổi 4 phương thức thành 2 phương thức tự động"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Thử 4 → 2 PT (2027)</span>
            </button>

            {/* Quick Demo: Deadline patch */}
            <button
              onClick={handleRun98Scenario}
              disabled={isRunningScenario}
              className="hidden md:flex bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded font-medium items-center gap-1 transition-colors cursor-pointer text-[11px]"
              title="Upload Thông báo 98 điều chỉnh gia hạn deadline từ 20/07 sang 25/07"
            >
              <span>Thử sửa hạn 20/07 → 25/07</span>
            </button>

            {/* Switch Portal */}
            <button
              onClick={() => setActivePortal(activePortal === 'public' ? 'admin' : 'public')}
              className="bg-sky-700 hover:bg-sky-600 text-white px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors cursor-pointer text-[11px]"
            >
              {activePortal === 'public' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Vào Admin Portal</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem Cổng Thí sinh</span>
                </>
              )}
            </button>

            {/* Reset */}
            <button
              onClick={resetAllData}
              title="Khôi phục trạng thái ban đầu"
              className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Modal: 3 Bất Biến Cốt Lõi */}
      {showPrinciplesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 text-slate-800 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-sky-600" />
                <span>Ba Nguyên Tắc Bất Biến Cốt Lõi Của Hệ Thống</span>
              </div>
              <button 
                onClick={() => setShowPrinciplesModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <div className="p-3.5 rounded-lg bg-sky-50 border border-sky-100 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-sky-950">Văn bản mới KHÔNG mặc định thay thế toàn bộ dữ liệu cũ</h4>
                  <p className="text-slate-600 mt-1">
                    <strong className="text-slate-800">Không nhắc đến ≠ Bị xóa.</strong> Nếu văn bản mới chỉ gia hạn hạn chót đợt 1, các phương thức xét tuyển, chỉ tiêu từng ngành và tổ hợp môn vẫn được bảo toàn nguyên vẹn.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-indigo-50 border border-indigo-100 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-indigo-950">Giao diện render từ DỮ LIỆU CÓ CẤU TRÚC, không phải từ AI output</h4>
                  <p className="text-slate-600 mt-1">
                    Giao diện người dùng độc lập hoàn toàn với AI. AI chỉ đóng vai trò phân tích và đề xuất cấu trúc. Website hiển thị động dựa trên trạng thái tuyển sinh đã duyệt (<code className="text-xs bg-indigo-100/70 px-1 py-0.5 rounded font-mono">methods.filter(m =&gt; m.status === 'active')</code>).
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-emerald-950">Mọi thay đổi trọng yếu đều cần NGƯỜI XÁC NHẬN (Human-in-the-loop)</h4>
                  <p className="text-slate-600 mt-1">
                    AI không bao giờ tự ý sửa code frontend hay tự động xuất bản. Mọi cập nhật được đóng gói trong một <strong>ChangeSet</strong> với bằng chứng trích dẫn cụ thể (trang, mục, đoạn văn) để Quản lý kiểm tra và bấm nhận/từ chối.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowPrinciplesModal(false)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Đã hiểu & Tiếp tục Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
