import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  GitCompare, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface PublicDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicDiffModal: React.FC<PublicDiffModalProps> = ({ isOpen, onClose }) => {
  const { historyList, stateByCycle, selectedCycle, availableCycles } = useAdmission();

  // Pick 2 versions to compare
  const [versionAIndex, setVersionAIndex] = useState<number>(historyList.length > 1 ? historyList.length - 1 : 0);
  const [versionBIndex, setVersionBIndex] = useState<number>(0);

  if (!isOpen) return null;

  const verA = historyList[versionAIndex] || historyList[0];
  const verB = historyList[versionBIndex] || historyList[0];

  const stateA = verA.stateSnapshot;
  const stateB = verB.stateSnapshot;

  const methodsA = stateA.methods.filter(m => m.status === 'active');
  const methodsB = stateB.methods.filter(m => m.status === 'active');

  const deadlineA = stateA.deadlines[0]?.endDate || '20/07/2026';
  const deadlineB = stateB.deadlines[0]?.endDate || '20/07/2026';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-6 flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-sky-950 text-white p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <h2 className="text-base font-extrabold tracking-tight">
                CÔNG CỤ SO SÁNH: "CÓ GÌ THAY ĐỔI?"
              </h2>
            </div>
            <p className="text-xs text-sky-200">
              Dành cho thí sinh và phụ huynh: Xem ngay những điểm mới nhất giữa các đợt công bố văn bản mà không phải đọc thủ công từng trang PDF.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white text-xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Version Pickers */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">So sánh:</span>
            <select
              value={versionAIndex}
              onChange={(e) => setVersionAIndex(Number(e.target.value))}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800"
            >
              {historyList.map((h, idx) => (
                <option key={idx} value={idx}>{h.versionName}</option>
              ))}
            </select>
          </div>

          <div className="text-slate-400 font-bold hidden sm:inline">VỚI</div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Phiên bản:</span>
            <select
              value={versionBIndex}
              onChange={(e) => setVersionBIndex(Number(e.target.value))}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-sky-900"
            >
              {historyList.map((h, idx) => (
                <option key={idx} value={idx}>{h.versionName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Diff Content Comparison Box */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-5 text-xs">
          
          {/* Comparison 1: Phương thức */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-700" />
                <span>PHƯƠNG THỨC XÉT TUYỂN</span>
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                methodsA.length === methodsB.length 
                  ? 'bg-slate-100 text-slate-600' 
                  : 'bg-amber-100 text-amber-900'
              }`}>
                {methodsA.length === methodsB.length ? 'Không thay đổi số lượng' : 'Có điều chỉnh'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Trước:</span>
                <span className="font-bold text-slate-800 block text-xs">
                  {methodsA.length} phương thức
                </span>
                <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                  ({methodsA.map(m => `Mã ${m.code}`).join(', ')})
                </span>
              </div>

              <div className={`p-3 rounded-lg border ${
                methodsA.length !== methodsB.length 
                  ? 'bg-amber-50/70 border-amber-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[10px] font-bold text-sky-800 block mb-1">Sau:</span>
                <span className="font-bold text-sky-950 block text-xs">
                  {methodsB.length} phương thức
                </span>
                <span className="text-[11px] text-sky-900 font-mono mt-0.5 block font-semibold">
                  ({methodsB.map(m => `Mã ${m.code}`).join(', ')})
                </span>
              </div>
            </div>

            {methodsA.length !== methodsB.length && (
              <p className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded border border-amber-200 mt-2">
                <strong>Lưu ý thí sinh:</strong> Năm {verB.stateSnapshot.cycle} nhà trường thu gọn phương thức để tập trung vào xét điểm thi tốt nghiệp và xét tuyển thẳng.
              </p>
            )}
          </div>

          {/* Comparison 2: Hạn chót đăng ký Đợt 1 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-700" />
                <span>HẠN CHÓT ĐĂNG KÝ XÉT TUYỂN ĐỢT 1</span>
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                deadlineA === deadlineB 
                  ? 'bg-slate-100 text-slate-600' 
                  : 'bg-emerald-100 text-emerald-900'
              }`}>
                {deadlineA === deadlineB ? 'Giữ nguyên' : 'ĐÃ GIA HẠN THÊM'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Hạn nộp hồ sơ trước:</span>
                <span className="font-mono font-bold text-slate-700 text-xs">{deadlineA}</span>
              </div>

              <div className={`p-3 rounded-lg border ${
                deadlineA !== deadlineB 
                  ? 'bg-emerald-50/70 border-emerald-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[10px] font-bold text-emerald-800 block mb-1">Hạn nộp hồ sơ mới:</span>
                <span className="font-mono font-extrabold text-emerald-950 text-sm">{deadlineB}</span>
              </div>
            </div>

            {deadlineA !== deadlineB && (
              <p className="text-[11px] text-emerald-900 bg-emerald-50 p-2.5 rounded border border-emerald-200 mt-2">
                Hội đồng tuyển sinh đã gia hạn thời gian nộp hồ sơ trực tuyến nhằm hỗ trợ tối đa cho thí sinh.
              </p>
            )}
          </div>

          {/* Comparison 3: Tóm lược căn cứ */}
          <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100 text-xs space-y-1">
            <span className="font-bold text-sky-950 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-700" />
              <span>Văn bản pháp lý cập nhật:</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Căn cứ theo văn bản <strong>{verB.sourceDocName}</strong>. Mọi quyền lợi của thí sinh đã nộp hồ sơ ở phiên bản trước được bảo lưu hoàn toàn.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
