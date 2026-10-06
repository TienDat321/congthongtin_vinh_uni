import React from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  GitBranch, 
  FileText, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const LineageModal: React.FC = () => {
  const { lineageTarget, setLineageTarget, documents } = useAdmission();

  if (!lineageTarget) return null;

  const relatedDoc = documents.find(d => d.id === lineageTarget.docId) || {
    name: lineageTarget.docName,
    officialNumber: lineageTarget.docName,
    issueDate: lineageTarget.date,
    signer: "Hội đồng Tuyển sinh Trường Đại học Vinh"
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-sky-950 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-bold text-sm">Truy xuất Nguồn gốc Dữ liệu (Data Lineage)</h3>
              <p className="text-[11px] text-sky-200">Vì sao giá trị này có mặt trong hệ thống?</p>
            </div>
          </div>
          <button 
            onClick={() => setLineageTarget(null)}
            className="text-slate-300 hover:text-white text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          
          {/* Target Element Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Phần tử đang kiểm tra ({lineageTarget.entity}):
            </div>
            <div className="text-sm font-bold text-slate-900">
              {lineageTarget.title}
            </div>
            {lineageTarget.currentValue && (
              <div className="mt-1 font-mono text-xs text-sky-800 bg-sky-50 px-2 py-1 rounded inline-block border border-sky-100">
                Giá trị hiện tại: {lineageTarget.currentValue}
              </div>
            )}
          </div>

          {/* Lineage Trace Timeline */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
              <span>Chuỗi căn cứ pháp lý & lịch sử xác lập</span>
            </div>

            <div className="relative pl-6 space-y-4 border-l-2 border-sky-200 ml-2">
              
              {/* Step 1: Document */}
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <div>
                  <span className="font-semibold text-slate-800 text-xs block">
                    Văn bản gốc ban hành
                  </span>
                  <div className="mt-1 bg-white p-2.5 rounded border border-slate-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-sky-900">
                      <FileText className="w-3.5 h-3.5 text-sky-600" />
                      <span>{lineageTarget.docName}</span>
                    </div>
                    <div className="text-slate-600 text-[11px] flex items-center gap-3">
                      <span>Ngày ban hành: <strong className="text-slate-800">{lineageTarget.date}</strong></span>
                      <span>·</span>
                      <span>Ký bởi: {relatedDoc.signer}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Evidence Citation */}
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                  §
                </span>
                <div>
                  <span className="font-semibold text-slate-800 text-xs block">
                    Bằng chứng & Căn cứ trích dẫn
                  </span>
                  <div className="mt-1 p-2.5 bg-indigo-50/60 rounded border border-indigo-100 text-slate-700 leading-relaxed">
                    {lineageTarget.detail || "Giá trị được trích xuất trực tiếp từ đề án tuyển sinh chính thức."}
                  </div>
                </div>
              </div>

              {/* Step 3: Human Verification */}
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                  ●
                </span>
                <div>
                  <span className="font-semibold text-slate-800 text-xs block">
                    Phê duyệt & Xuất bản (Human-in-the-loop)
                  </span>
                  <div className="mt-1 text-slate-600 flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Xác nhận bởi Quản trị viên Hội đồng Tuyển sinh trước khi cập nhật vào cơ sở dữ liệu.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setLineageTarget(null)}
            className="px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
