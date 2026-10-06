import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  History, 
  GitCommit, 
  FileText, 
  Calendar, 
  User, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  GitCompare,
  Eye,
  Clock
} from 'lucide-react';
import { HistoryVersion } from '../../types/admission';

export const AdminHistory: React.FC = () => {
  const { historyList } = useAdmission();
  const [selectedVersionForCompare, setSelectedVersionForCompare] = useState<{ vCurrent: HistoryVersion; vPrevious?: HistoryVersion } | null>(null);

  const handleCompareWithPrevious = (index: number) => {
    const current = historyList[index];
    const previous = historyList[index + 1]; // list is sorted latest first
    setSelectedVersionForCompare({ vCurrent: current, vPrevious: previous });
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-sky-800" />
          <span>Lịch Sử Phiên Bản & Nhật Ký Kiểm Toán (Audit Trail)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Ghi nhận toàn bộ các mốc thời gian áp dụng ChangeSet, văn bản kích hoạt và người phê duyệt.
        </p>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {historyList.map((ver, idx) => {
          const isLatest = idx === 0;
          const hasPrevious = idx < historyList.length - 1;

          return (
            <div 
              key={ver.versionNumber}
              className={`p-5 rounded-xl border transition-all ${
                isLatest 
                  ? 'bg-white border-sky-300 ring-2 ring-sky-500/10 shadow-xs' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono ${
                    isLatest ? 'bg-sky-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    v{ver.versionNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{ver.versionName}</h3>
                      {isLatest && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          Phiên bản hiện hành
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-[11px] font-mono mt-0.5">
                      <span>Thời điểm: {ver.timestamp}</span>
                      <span>·</span>
                      <span>Người duyệt: {ver.actor}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {hasPrevious && (
                    <button
                      onClick={() => handleCompareWithPrevious(idx)}
                      className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <GitCompare className="w-3.5 h-3.5 text-sky-700" />
                      <span>So sánh với phiên bản trước</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Version content */}
              <div className="pt-3 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500">Văn bản nguồn kích hoạt:</span>{' '}
                    <strong className="text-slate-800">{ver.sourceDocName}</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                  {ver.changeSummary}
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span>Trạng thái snapshot: <strong>{ver.stateSnapshot.channel} ({ver.stateSnapshot.cycle})</strong></span>
                  <span>·</span>
                  <span>
                    Số phương thức: <strong className="text-sky-900 font-mono">{ver.stateSnapshot.methods.filter(m => m.status === 'active').length} active</strong>
                  </span>
                  <span>·</span>
                  <span>{ver.appliedChangesCount} thay đổi được ghi nhận</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compare Modal */}
      {selectedVersionForCompare && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-sky-800" />
                <h3 className="font-bold text-sm text-slate-900">
                  So Sánh Biến Động Tri Thức Tuyển Sinh
                </h3>
              </div>
              <button 
                onClick={() => setSelectedVersionForCompare(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Phiên bản trước</span>
                  <span className="font-bold text-slate-800">
                    {selectedVersionForCompare.vPrevious?.versionName || "Khởi tạo hệ thống"}
                  </span>
                  <span className="text-[11px] text-slate-500 block font-mono">
                    {selectedVersionForCompare.vPrevious?.sourceDocName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-sky-700 block">Phiên bản sau</span>
                  <span className="font-bold text-sky-950">
                    {selectedVersionForCompare.vCurrent.versionName}
                  </span>
                  <span className="text-[11px] text-sky-700 block font-mono">
                    {selectedVersionForCompare.vCurrent.sourceDocName}
                  </span>
                </div>
              </div>

              {/* Comparison Details */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">
                  Biến động các thực thể:
                </h4>

                {/* Methods comparison */}
                <div className="p-3 bg-white rounded border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block">1. Danh mục phương thức xét tuyển:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-slate-50 rounded">
                      Trước: {selectedVersionForCompare.vPrevious?.stateSnapshot.methods.filter(m => m.status === 'active').map(m => m.code).join(', ') || '4 phương thức (100, 200, 301, 405)'}
                    </div>
                    <div className="p-2 bg-sky-50 rounded font-semibold text-sky-950">
                      Sau: {selectedVersionForCompare.vCurrent.stateSnapshot.methods.filter(m => m.status === 'active').map(m => m.code).join(', ')} ({selectedVersionForCompare.vCurrent.stateSnapshot.methods.filter(m => m.status === 'active').length} phương thức)
                    </div>
                  </div>
                </div>

                {/* Deadlines comparison */}
                <div className="p-3 bg-white rounded border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block">2. Lịch đăng ký Đợt 1:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-slate-50 rounded font-mono">
                      Hạn cũ: {selectedVersionForCompare.vPrevious?.stateSnapshot.deadlines[0]?.endDate || '2026-07-20'}
                    </div>
                    <div className="p-2 bg-sky-50 rounded font-mono font-bold text-sky-950">
                      Hạn mới: {selectedVersionForCompare.vCurrent.stateSnapshot.deadlines[0]?.endDate}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedVersionForCompare(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
              >
                Đóng so sánh
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
