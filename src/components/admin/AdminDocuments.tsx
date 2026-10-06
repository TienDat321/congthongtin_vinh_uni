import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  FileText, 
  UploadCloud, 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  Download,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { DocumentItem } from '../../types/admission';

interface AdminDocumentsProps {
  onOpenUpload: () => void;
}

export const AdminDocuments: React.FC<AdminDocumentsProps> = ({ onOpenUpload }) => {
  const { documents, pendingChangeSets, setActiveReviewChangeSet } = useAdmission();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<string>('all');
  const [activeDocForPreview, setActiveDocForPreview] = useState<DocumentItem | null>(null);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.officialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (doc.channel && doc.channel.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedTypeFilter === 'all' || doc.type === selectedTypeFilter;
    const matchesChannel = selectedChannelFilter === 'all' || doc.channel === selectedChannelFilter;
    return matchesSearch && matchesType && matchesChannel;
  });

  return (
    <div className="space-y-5">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Kho Văn Bản & Quyết Định Tuyển Sinh
          </h2>
          <p className="text-xs text-slate-500">
            Toàn bộ các đề án, thông báo điều chỉnh, thông báo xét tuyển từng đợt được số hóa và lưu trữ làm căn cứ pháp lý.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="bg-sky-900 hover:bg-sky-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer self-start sm:self-auto shrink-0"
        >
          <UploadCloud className="w-4 h-4 text-amber-300" />
          <span>Upload văn bản mới</span>
        </button>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo số hiệu văn bản, tên thông báo, file, kênh..."
            className="w-full bg-transparent border-none text-xs focus:outline-none text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedChannelFilter}
            onChange={(e) => setSelectedChannelFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 focus:outline-none font-medium"
          >
            <option value="all">Tất cả kênh tuyển sinh</option>
            <option value="Sau đại học">Sau đại học (ThS, TS)</option>
            <option value="Sinh viên quốc tế">Sinh viên quốc tế</option>
            <option value="Vừa làm vừa học">Vừa làm vừa học</option>
            <option value="Thực hành Sư phạm">Thực hành Sư phạm</option>
            <option value="Đại học chính quy">Đại học chính quy</option>
          </select>

          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 focus:outline-none font-medium"
          >
            <option value="all">Tất cả loại văn bản</option>
            <option value="ADMISSION_PLAN">Đề án gốc (ADMISSION_PLAN)</option>
            <option value="ADMISSION_ADJUSTMENT">Điều chỉnh (ADMISSION_ADJUSTMENT)</option>
            <option value="ROUND_NOTICE">Thông báo đợt (ROUND_NOTICE)</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Tên văn bản & Số hiệu</th>
                <th className="py-3 px-4">Loại văn bản</th>
                <th className="py-3 px-4">Chu kỳ</th>
                <th className="py-3 px-4">Ngày ban hành</th>
                <th className="py-3 px-4">Trạng thái xử lý</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => {
                const pendingCs = pendingChangeSets.find(cs => cs.documentId === doc.id);

                return (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Name & Official number */}
                    <td className="py-3 px-4">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-slate-900 block leading-tight">
                              {doc.name}
                            </span>
                            {doc.channel && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                                doc.channel === 'Sau đại học' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                                doc.channel === 'Sinh viên quốc tế' ? 'bg-indigo-100 text-indigo-900 border-indigo-300' :
                                doc.channel === 'Vừa làm vừa học' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                                doc.channel === 'Thực hành Sư phạm' ? 'bg-indigo-50 text-indigo-900 border-indigo-200' :
                                'bg-sky-100 text-sky-900 border-sky-300'
                              }`}>
                                {doc.channel}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                            {doc.fileName} · {doc.fileSize}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type badge */}
                    <td className="py-3 px-4">
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {doc.type}
                      </span>
                    </td>

                    {/* Cycle */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                      {doc.cycle}
                    </td>

                    {/* Issue Date */}
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {doc.issueDate}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {doc.status === 'APPLIED' && (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Đã công bố (APPLIED)
                        </span>
                      )}
                      {doc.status === 'NEEDS_REVIEW' && (
                        <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Chờ duyệt (NEEDS_REVIEW)
                        </span>
                      )}
                      {doc.status === 'ANALYZING' && (
                        <span className="inline-flex items-center gap-1 font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 text-[11px]">
                          Đang đọc (ANALYZING)
                        </span>
                      )}
                      {doc.status === 'REJECTED' && (
                        <span className="inline-flex items-center gap-1 font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">
                          Đã từ chối (REJECTED)
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {pendingCs ? (
                          <button
                            onClick={() => {
                              setActiveReviewChangeSet(pendingCs);
                              onOpenUpload();
                            }}
                            className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            Duyệt ChangeSet
                          </button>
                        ) : null}

                        <button
                          onClick={() => setActiveDocForPreview(doc)}
                          className="p-1.5 text-slate-600 hover:text-sky-900 hover:bg-slate-100 rounded transition-colors"
                          title="Xem chi tiết văn bản"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Detail Preview Drawer/Modal */}
      {activeDocForPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-sky-800" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{activeDocForPreview.name}</h3>
                  <span className="text-[11px] font-mono text-slate-500">Số: {activeDocForPreview.officialNumber} · File: {activeDocForPreview.fileName}</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveDocForPreview(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Người ký ban hành:</span>
                  <span className="font-semibold text-slate-800">{activeDocForPreview.signer}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Ngày ban hành:</span>
                  <span className="font-mono text-slate-800">{activeDocForPreview.issueDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Số trang / Dung lượng:</span>
                  <span className="font-mono text-slate-800">{activeDocForPreview.pageCount} trang ({activeDocForPreview.fileSize})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Trạng thái:</span>
                  <span className="font-semibold text-emerald-800 uppercase">{activeDocForPreview.status}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Tóm lược trích yếu nội dung:</span>
                <p className="p-3 bg-white rounded border border-slate-200 text-slate-700 leading-relaxed">
                  {activeDocForPreview.summary}
                </p>
              </div>

              <div className="p-3 bg-sky-50 rounded border border-sky-200 flex items-center justify-between text-sky-950">
                <span>File PDF đã được lập chỉ mục vector và trích xuất thực thể thành công.</span>
                <button 
                  onClick={() => alert(`Tải xuống bản sao lưu điện tử: ${activeDocForPreview.fileName}`)}
                  className="px-3 py-1 rounded bg-sky-900 hover:bg-sky-800 text-white font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải PDF gốc</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveDocForPreview(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
