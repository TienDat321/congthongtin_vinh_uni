import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  FileSearch, 
  Check, 
  X, 
  Edit3, 
  FileText, 
  ArrowRight, 
  AlertCircle,
  Eye,
  CornerDownRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const ChangeReviewDetailModal: React.FC = () => {
  const { 
    selectedChangeItemForDetail, 
    setSelectedChangeItemForDetail,
    activeReviewChangeSet,
    updateChangeItemStatus
  } = useAdmission();

  const [customNote, setCustomNote] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);

  if (!selectedChangeItemForDetail || !activeReviewChangeSet) return null;

  const item = selectedChangeItemForDetail;
  const ev = item.evidence;

  const handleAccept = () => {
    updateChangeItemStatus(activeReviewChangeSet.id, item.id, 'accepted', customNote || item.managerNote);
    setSelectedChangeItemForDetail(null);
  };

  const handleReject = () => {
    updateChangeItemStatus(activeReviewChangeSet.id, item.id, 'rejected', customNote || item.managerNote);
    setSelectedChangeItemForDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-sky-950 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <FileSearch className="w-5 h-5 text-amber-300" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm">Chi tiết Thay đổi & Bằng chứng Văn bản</h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                  item.type === 'UPDATED' ? 'bg-amber-400 text-amber-950' :
                  item.type === 'REMOVED' ? 'bg-rose-500 text-white' :
                  item.type === 'ADDED' ? 'bg-emerald-500 text-white' :
                  'bg-slate-700 text-slate-200'
                }`}>
                  {item.type}
                </span>
              </div>
              <p className="text-[11px] text-sky-200">{item.title}</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedChangeItemForDetail(null)}
            className="text-slate-300 hover:text-white text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          
          {/* Side by side comparison (Old vs New) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Old value */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Giá trị hiện tại (Trước thay đổi)
              </span>
              <div className="p-3 bg-white rounded border border-slate-200 font-medium text-slate-700 leading-relaxed min-h-[60px]">
                {item.oldValue || "(Chưa có hoặc không xác định)"}
              </div>
            </div>

            {/* New value proposed */}
            <div className={`p-4 rounded-lg border ${
              item.type === 'REMOVED' 
                ? 'bg-rose-50/60 border-rose-200' 
                : 'bg-emerald-50/60 border-emerald-200'
            }`}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2 flex items-center justify-between">
                <span>Đề xuất từ văn bản mới</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Đã qua trích xuất
                </span>
              </span>
              <div className={`p-3 bg-white rounded border font-semibold leading-relaxed min-h-[60px] ${
                item.type === 'REMOVED' 
                  ? 'border-rose-300 text-rose-800 line-through decoration-rose-600' 
                  : 'border-emerald-300 text-emerald-900'
              }`}>
                {item.newValue || "(Ngừng áp dụng)"}
              </div>
            </div>

          </div>

          {/* Evidence Card */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
                <FileText className="w-4 h-4 text-sky-700" />
                <span>Bằng chứng trích xuất từ PDF gốc ({ev.documentName})</span>
              </div>
              <span className="bg-white px-2.5 py-0.5 rounded text-[11px] font-mono font-medium text-slate-600 border border-slate-200">
                Trang {ev.page} · {ev.section}
              </span>
            </div>

            <div className="p-4 space-y-3 bg-slate-50/50">
              {/* Quote highlighted */}
              <div className="p-3.5 bg-amber-50/90 rounded border-l-4 border-amber-500 text-slate-800 text-xs leading-relaxed font-sans shadow-xs">
                <div className="font-bold text-amber-900 text-[11px] uppercase tracking-wide mb-1">
                  Đoạn trích dẫn nguyên văn:
                </div>
                "{ev.quote}"
              </div>

              {/* Simulated PDF Viewer / Screenshot */}
              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1.5 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  Mô phỏng vị trí trong văn bản scan (PDF Page {ev.page}):
                </span>

                <div className="p-4 bg-white border border-slate-300 rounded shadow-inner font-serif text-slate-800 text-[12px] leading-relaxed max-h-48 overflow-y-auto">
                  <div className="text-center font-bold text-[11px] text-slate-600 uppercase mb-2 pb-1 border-b border-slate-200">
                    TRƯỜNG ĐẠI HỌC VINH — HỘI ĐỒNG TUYỂN SINH
                  </div>
                  
                  {ev.pdfSnippetContext ? (
                    <div className="whitespace-pre-line text-slate-700">
                      {ev.pdfSnippetContext.split(ev.quote).map((part, idx, arr) => (
                        <React.Fragment key={idx}>
                          <span>{part}</span>
                          {idx < arr.length - 1 && (
                            <mark className="bg-amber-200/90 text-slate-900 px-1 py-0.5 rounded font-semibold underline decoration-amber-500">
                              {ev.quote}
                            </mark>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div>
                      ...
                      <br />
                      <mark className="bg-amber-200/90 text-slate-900 px-1 py-0.5 rounded font-semibold">
                        {ev.quote}
                      </mark>
                      <br />
                      ...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Manager Note or override */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                Ghi chú của người thẩm định:
              </span>
              {!isEditingNote && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-sky-700 hover:text-sky-900 font-medium text-[11px] underline"
                >
                  {item.managerNote ? "Sửa ghi chú" : "+ Thêm ghi chú"}
                </button>
              )}
            </div>
            {isEditingNote ? (
              <div className="space-y-2 mt-2">
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Nhập lý do chấp thuận hoặc điều chỉnh thêm của Quản trị viên..."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
                  rows={2}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 rounded text-[11px]"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="px-2.5 py-1 bg-sky-900 text-white rounded text-[11px]"
                  >
                    Lưu tạm
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-slate-600 italic">
                {customNote || item.managerNote || "(Chưa có ghi chú riêng. Bấm xác nhận để đồng ý áp dụng)"}
              </div>
            )}
          </div>

        </div>

        {/* Footer actions: Nhận / Từ chối / Đóng */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500">
            Trạng thái hiện tại: <strong className="uppercase text-slate-700">{item.status}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReject}
              className="px-3.5 py-2 rounded-lg bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>✗ Từ chối thay đổi</span>
            </button>

            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>✓ Nhận (Chấp thuận)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
