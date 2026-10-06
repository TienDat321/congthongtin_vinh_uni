import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  Layers, 
  Calendar, 
  FileText, 
  Table, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Download, 
  ExternalLink,
  GitBranch,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  BookOpen,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { PublicDiffModal } from './PublicDiffModal';

export const PublicDHCQ: React.FC = () => {
  const { 
    currentAdmissionState, 
    selectedCycle, 
    setSelectedCycle, 
    availableCycles, 
    documents,
    setLineageTarget,
    publicActiveTab,
    setPublicActiveTab
  } = useAdmission();

  const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);
  const [majorFilter, setMajorFilter] = useState('');
  const [selectedMethodDetail, setSelectedMethodDetail] = useState<any | null>(null);

  const state = currentAdmissionState;
  
  // DYNAMIC METHOD COUNT: Exactly based on structured state
  const activeMethods = state.methods.filter(m => m.status === 'active');
  const deprecatedMethods = state.methods.filter(m => m.status === 'deprecated');

  const filteredQuotas = state.quotas.filter(q => 
    q.majorName.toLowerCase().includes(majorFilter.toLowerCase()) ||
    q.majorCode.includes(majorFilter) ||
    q.faculty.toLowerCase().includes(majorFilter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Page Hero Header */}
      <div className="bg-gradient-to-br from-sky-950 via-sky-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm border border-sky-800/40 relative overflow-hidden">
        
        {/* Subtle decorative background pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-400/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Chương trình Đào tạo Đại học Chính quy</span>
            </span>

            {/* Cycle Selector in Hero */}
            <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-700 text-xs">
              <span className="text-slate-400 pl-1">Mùa tuyển sinh:</span>
              {availableCycles.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCycle(c)}
                  className={`px-2.5 py-0.5 rounded-full font-bold font-mono transition-colors cursor-pointer ${
                    selectedCycle === c 
                      ? 'bg-amber-400 text-slate-950' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Đại học chính quy — Tuyển sinh năm {selectedCycle}
          </h1>

          <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
            Hệ thống công bố thông tin tuyển sinh đồng bộ, chính xác theo Đề án số {state.lastUpdatedByDoc}. Toàn bộ phương thức và lịch tuyển sinh được hiển thị tức thời theo văn bản mới nhất.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Cập nhật lần cuối: <strong>{state.lastUpdated}</strong></span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">Theo {state.lastUpdatedByDoc}</span>
            </div>

            {/* Feature Button: Có gì thay đổi? */}
            <button
              onClick={() => setIsDiffModalOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer text-xs"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Tính năng: "Có gì thay đổi?"</span>
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 bg-white rounded-xl shadow-xs px-4 flex items-center gap-1 sm:gap-4 overflow-x-auto text-xs">
        {[
          { id: 'methods', label: `Phương thức xét tuyển (${activeMethods.length})`, icon: Layers },
          { id: 'schedule', label: 'Lịch tuyển sinh & Đợt xét', icon: Calendar },
          { id: 'majors', label: 'Ngành đào tạo & Chỉ tiêu', icon: Table },
          { id: 'conditions', label: 'Ngưỡng ĐBCL (Điểm sàn)', icon: ShieldCheck },
          { id: 'documents', label: 'Văn bản pháp lý gốc', icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = publicActiveTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setPublicActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3.5 px-3 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-sky-900 text-sky-950 bg-sky-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: PHƯƠNG THỨC XÉT TUYỂN (DYNAMIC RENDER THEO DỮ LIỆU) */}
      {publicActiveTab === 'methods' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Các Phương Thức Xét Tuyển Năm {selectedCycle}
                </h2>
                <span className="font-mono text-xs font-bold bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded-full">
                  {activeMethods.length} PHƯƠNG THỨC
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Số lượng phương thức hiển thị hoàn toàn tự động theo dữ liệu tuyển sinh đã duyệt, không hardcode.
              </p>
            </div>

            <button
              onClick={() => setIsDiffModalOpen(true)}
              className="text-xs text-sky-800 hover:text-sky-950 font-semibold flex items-center gap-1 hover:underline cursor-pointer self-start sm:self-auto"
            >
              <span>Xem so sánh với năm trước</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* DYNAMIC CARDS CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeMethods.map((method, idx) => (
              <div 
                key={method.code}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  
                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-lg bg-sky-900 text-white shadow-xs">
                      PHƯƠNG THỨC {method.code}
                    </span>

                    <button
                      onClick={() => setLineageTarget({
                        title: `Phương thức ${method.code}: ${method.name}`,
                        entity: "Phương thức xét tuyển",
                        currentValue: "Kích hoạt (Active)",
                        docId: method.lineageDocId,
                        docName: method.lineageDocName,
                        date: method.lineageDate,
                        detail: method.lineageDetail,
                        evidence: method.evidence
                      })}
                      className="text-[11px] text-sky-700 hover:text-sky-900 flex items-center gap-1 font-semibold hover:underline cursor-pointer"
                      title="Xem căn cứ văn bản công bố"
                    >
                      <GitBranch className="w-3 h-3 text-sky-600" />
                      <span>Căn cứ pháp lý</span>
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-950 transition-colors leading-snug">
                    {method.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {method.shortDesc}
                  </p>

                  {/* Evidence tag */}
                  {method.evidence && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                      <span>Căn cứ: <strong className="text-slate-800">{method.evidence}</strong></span>
                    </div>
                  )}

                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Trạng thái: <strong className="text-emerald-700">Đang nhận hồ sơ</strong></span>
                  <button 
                    onClick={() => setPublicActiveTab('majors')}
                    className="font-bold text-sky-800 hover:text-sky-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Xem chỉ tiêu áp dụng</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* If there are deprecated methods (like 200 or 405 in 2027) */}
          {deprecatedMethods.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <AlertCircle className="w-4 h-4 text-slate-600" />
                <span>Phương thức không còn áp dụng trong mùa tuyển sinh {selectedCycle}:</span>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 pl-1">
                {deprecatedMethods.map(m => (
                  <li key={m.code}>
                    <strong>Phương thức {m.code}</strong> ({m.name}) — {m.lineageDetail || "Ngừng áp dụng để nâng cao chất lượng đầu vào theo chủ trương của Hội đồng tuyển sinh."}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

      {/* SECTION 2: LỊCH TUYỂN SINH (DEADLINES) */}
      {publicActiveTab === 'schedule' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Lịch Tuyển Sinh & Kế Hoạch Xét Tuyển Năm {selectedCycle}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Thời gian nhận hồ sơ trực tuyến, công bố kết quả và xác nhận nhập học.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-sky-300 ml-3">
            {state.deadlines.map((dl, index) => (
              <div key={dl.round} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[33px] sm:-left-[41px] top-1 w-6 h-6 rounded-full bg-sky-900 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-4 ring-white">
                  {dl.round}
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-extrabold text-base text-slate-900">
                      {dl.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {dl.startDate} → {dl.endDate}
                      </span>
                      <button
                        onClick={() => setLineageTarget({
                          title: dl.name,
                          entity: "Lịch đăng ký xét tuyển",
                          currentValue: `${dl.startDate} đến ${dl.endDate}`,
                          docId: dl.lineageDocId,
                          docName: dl.lineageDocName,
                          date: dl.lineageDate,
                          detail: dl.lineageDetail
                        })}
                        className="text-[11px] text-sky-700 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <GitBranch className="w-3 h-3" />
                        <span>Căn cứ</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dl.note || "Thí sinh đăng ký nguyện vọng xét tuyển trực tuyến theo hệ thống hỗ trợ tuyển sinh chung của Bộ GD&ĐT và Cổng thông tin của Trường Đại học Vinh."}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                    <span className="text-slate-500 font-mono text-[11px]">Văn bản phê duyệt: {dl.lineageDocName}</span>
                    <span className="text-sky-900 font-bold text-[11px]">Hạn cuối: {dl.endDate} (17h00)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: NGÀNH & CHỈ TIÊU (QUOTAS) */}
      {publicActiveTab === 'majors' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Danh Mục Ngành Đào Tạo & Chỉ Tiêu Tuyển Sinh
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tra cứu nhanh chỉ tiêu và các phương thức áp dụng cho từng ngành.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs text-xs">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={majorFilter}
                onChange={(e) => setMajorFilter(e.target.value)}
                placeholder="Tìm tên ngành, mã ngành..."
                className="bg-transparent border-none text-xs focus:outline-none w-48 text-slate-800"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Mã ngành</th>
                    <th className="py-3.5 px-4">Tên ngành đào tạo</th>
                    <th className="py-3.5 px-4">Viện / Khoa</th>
                    <th className="py-3.5 px-4 text-center">Tổng chỉ tiêu</th>
                    <th className="py-3.5 px-4">Chỉ tiêu theo phương thức</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuotas.map((q) => (
                    <tr key={q.majorCode} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-900">
                        {q.majorCode}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                        {q.majorName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {q.faculty}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-extrabold text-sky-950 text-sm tabular-nums">
                        {q.totalQuota}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {Object.entries(q.methodQuotas).map(([mCode, val]) => {
                            // Check if this method is active in current state
                            const isMethodActive = activeMethods.some(m => m.code === mCode);
                            if (!isMethodActive) return null;

                            return (
                              <span 
                                key={mCode}
                                className="font-mono text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200"
                              >
                                PT {mCode}: <strong className="text-sky-900">{val}</strong>
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: ĐIỀU KIỆN & ĐIỂM SÀN (CONDITIONS) */}
      {publicActiveTab === 'conditions' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Ngưỡng Đảm Bảo Chất Lượng Đầu Vào (Điểm Sàn)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Điều kiện cần để nộp hồ sơ xét tuyển vào Trường Đại học Vinh năm {selectedCycle}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.conditions.map((cond) => (
              <div 
                key={cond.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {cond.title}
                  </h3>
                  <button
                    onClick={() => setLineageTarget({
                      title: cond.title,
                      entity: "Ngưỡng ĐBCL",
                      currentValue: cond.detail,
                      docId: cond.lineageDocId,
                      docName: cond.lineageDocName,
                      date: cond.lineageDate,
                      detail: `Quy định tại Đề án tuyển sinh ${cond.lineageDocName}`
                    })}
                    className="text-[11px] text-sky-700 hover:underline flex items-center gap-1 cursor-pointer font-medium shrink-0"
                  >
                    <GitBranch className="w-3 h-3" />
                    <span>Căn cứ</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {cond.detail}
                </p>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Văn bản: {cond.lineageDocName}</span>
                  <div className="flex gap-1">
                    {cond.applicableMethods.map(m => (
                      <span key={m} className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        PT {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: VĂN BẢN GỐC (DOCUMENTS) */}
      {publicActiveTab === 'documents' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Văn Bản Pháp Lý & Hồ Sơ Tuyển Sinh Gốc
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Thí sinh và phụ huynh có thể tải và xem toàn bộ văn bản chính thức của Nhà trường.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.filter(d => d.status === 'APPLIED').map((doc) => (
              <div 
                key={doc.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-900">
                      {doc.officialNumber}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Ban hành: {doc.issueDate}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {doc.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3">
                    {doc.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">{doc.pageCount} trang · {doc.fileSize}</span>
                  <button
                    onClick={() => alert(`Đang tải file PDF chính thức: ${doc.fileName}`)}
                    className="px-3 py-1.5 bg-sky-900 hover:bg-sky-800 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải PDF gốc</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diff Modal */}
      <PublicDiffModal 
        isOpen={isDiffModalOpen} 
        onClose={() => setIsDiffModalOpen(false)} 
      />

    </div>
  );
};
