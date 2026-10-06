import React from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  FileText, 
  FileCheck2, 
  Layers, 
  Activity, 
  UploadCloud, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  GitBranch,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface AdminDashboardProps {
  onOpenUpload: () => void;
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onOpenUpload, onNavigateTab }) => {
  const { 
    documents, 
    pendingChangeSets, 
    currentAdmissionState, 
    selectedCycle,
    historyList,
    setActiveReviewChangeSet,
    setLineageTarget
  } = useAdmission();

  const activeMethods = currentAdmissionState.methods.filter(m => m.status === 'active');
  const deprecatedMethods = currentAdmissionState.methods.filter(m => m.status === 'deprecated');

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-sky-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
              VinhUni Knowledge Management
            </span>
            <span className="text-sky-300 text-xs font-medium">Chu kỳ {selectedCycle}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Bảng Điều Khiển Quản Trị Tuyển Sinh
          </h1>
          <p className="text-xs text-sky-200/90 max-w-2xl leading-relaxed">
            Hệ thống chuyển đổi các văn bản thông báo hành chính rời rạc thành kho tri thức tuyển sinh có cấu trúc thời gian thực.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer self-start md:self-auto shrink-0"
        >
          <UploadCloud className="w-4 h-4 text-slate-950" />
          <span>Upload văn bản mới</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Documents */}
        <div 
          onClick={() => onNavigateTab('documents')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-sky-300 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Văn bản đã nạp</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {documents.length}
            </span>
            <span className="text-[11px] text-slate-500">văn bản</span>
          </div>
          <div className="mt-2 text-[11px] text-sky-700 flex items-center gap-1 font-medium">
            <span>Xem danh mục hồ sơ</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Stat 2: Pending ChangeSets */}
        <div 
          onClick={() => onNavigateTab('changes')}
          className={`p-4 rounded-xl border transition-all cursor-pointer group ${
            pendingChangeSets.length > 0 
              ? 'bg-amber-50/70 border-amber-200 hover:border-amber-400' 
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">ChangeSet chờ duyệt</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform ${
              pendingChangeSets.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
            }`}>
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl font-extrabold font-mono tabular-nums ${
              pendingChangeSets.length > 0 ? 'text-amber-900' : 'text-slate-900'
            }`}>
              {pendingChangeSets.length}
            </span>
            <span className="text-[11px] text-slate-500">yêu cầu thay đổi</span>
          </div>
          <div className="mt-2 text-[11px] font-medium text-amber-800 flex items-center gap-1">
            <span>{pendingChangeSets.length > 0 ? 'Cần Quản lý xem xét ngay' : 'Đã duyệt toàn bộ'}</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Stat 3: Active Methods (Demonstrates dynamic count!) */}
        <div 
          onClick={() => onNavigateTab('state')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Phương thức ĐHCQ {selectedCycle}</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-indigo-950 font-mono tabular-nums">
              {activeMethods.length}
            </span>
            <span className="text-[11px] text-slate-500">phương thức kích hoạt</span>
          </div>
          <div className="mt-2 text-[11px] text-indigo-700 flex items-center gap-1 font-medium">
            <span>Mã: {activeMethods.map(m => m.code).join(', ')}</span>
          </div>
        </div>

        {/* Stat 4: Version history count */}
        <div 
          onClick={() => onNavigateTab('history')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Phiên bản tri thức</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-950 font-mono tabular-nums">
              v{historyList.length}
            </span>
            <span className="text-[11px] text-slate-500">snapshot lịch sử</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
            <span>Audit trail đầy đủ</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

      </div>

      {/* Main dashboard content: Left = Current Active State, Right = Recent Activities & Pending */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 cols: Current Admission State Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Trạng thái Tuyển sinh Hiện hành ({currentAdmissionState.channel} — {selectedCycle})</span>
                <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-bold">
                  {activeMethods.length} PHƯƠNG THỨC
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cập nhật lần cuối: {currentAdmissionState.lastUpdated} (Theo {currentAdmissionState.lastUpdatedByDoc})
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('state')}
              className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
            >
              <span>Xem chi tiết cây tri thức</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dynamic Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeMethods.map((m) => (
              <div 
                key={m.code}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono font-bold text-xs bg-sky-900 text-white px-2 py-0.5 rounded">
                    Mã {m.code}
                  </span>
                  <button
                    onClick={() => setLineageTarget({
                      title: `Phương thức ${m.code}: ${m.name}`,
                      entity: "Phương thức tuyển sinh",
                      currentValue: "Kích hoạt (Active)",
                      docId: m.lineageDocId,
                      docName: m.lineageDocName,
                      date: m.lineageDate,
                      detail: m.lineageDetail
                    })}
                    className="text-[11px] text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    title="Truy xuất nguồn gốc văn bản gốc"
                  >
                    <GitBranch className="w-3 h-3" />
                    <span>Nguồn gốc?</span>
                  </button>
                </div>
                <h4 className="font-bold text-slate-900 text-xs leading-snug">
                  {m.name}
                </h4>
                <p className="text-[11px] text-slate-600 line-clamp-2">
                  {m.shortDesc}
                </p>
              </div>
            ))}
          </div>

          {/* Deprecated methods notice if any */}
          {deprecatedMethods.length > 0 && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900">
              <span className="font-bold">Đã ngừng áp dụng ({deprecatedMethods.length}):</span>{' '}
              {deprecatedMethods.map(m => `Mã ${m.code} (${m.name})`).join(', ')}
            </div>
          )}

          {/* Deadlines preview */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase text-slate-700 block mb-2">
              Khung thời gian các đợt tuyển sinh:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentAdmissionState.deadlines.map(dl => (
                <div key={dl.round} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{dl.name}</span>
                    <button
                      onClick={() => setLineageTarget({
                        title: dl.name,
                        entity: "Lịch tuyển sinh",
                        currentValue: `${dl.startDate} đến ${dl.endDate}`,
                        docId: dl.lineageDocId,
                        docName: dl.lineageDocName,
                        date: dl.lineageDate,
                        detail: dl.lineageDetail
                      })}
                      className="text-[10px] text-sky-700 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <GitBranch className="w-2.5 h-2.5" />
                      <span>Lineage</span>
                    </button>
                  </div>
                  <div className="font-mono text-slate-700 font-medium">
                    {dl.startDate} → <span className="text-sky-900 font-bold">{dl.endDate}</span>
                  </div>
                  {dl.note && <div className="text-[11px] text-slate-500 italic">{dl.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 col: Pending ChangeSets & Recent Activity */}
        <div className="space-y-4">
          
          {/* Pending Review Box */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center justify-between">
              <span>ChangeSet chờ phê duyệt</span>
              <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-mono text-[11px]">
                {pendingChangeSets.length}
              </span>
            </h3>

            {pendingChangeSets.length === 0 ? (
              <div className="py-6 text-center text-slate-400 text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p>Không có ChangeSet nào đang chờ. Hãy upload văn bản mới để trải nghiệm.</p>
                <button
                  onClick={onOpenUpload}
                  className="mt-2 text-xs font-semibold text-sky-700 hover:text-sky-900 underline cursor-pointer"
                >
                  Upload văn bản mới ngay
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingChangeSets.map(cs => (
                  <div 
                    key={cs.id}
                    className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-bold text-slate-900 text-xs">
                        {cs.documentName}
                      </span>
                      <span className="font-mono text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                        Chu kỳ {cs.detectedKnowledge.cycle}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2">
                      {cs.detectedKnowledge.summary}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-amber-800 font-medium">
                        {cs.changes.length} thay đổi đề xuất
                      </span>
                      <button
                        onClick={() => {
                          setActiveReviewChangeSet(cs);
                          onOpenUpload();
                        }}
                        className="px-2.5 py-1 bg-sky-900 hover:bg-sky-800 text-white rounded text-xs font-semibold cursor-pointer"
                      >
                        Xem xét ngay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent History / Audit Trail */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center justify-between">
              <span>Lịch sử cập nhật gần đây</span>
              <button 
                onClick={() => onNavigateTab('history')}
                className="text-sky-700 text-[11px] font-semibold hover:underline"
              >
                Xem tất cả
              </button>
            </h3>

            <div className="space-y-2.5 text-xs">
              {historyList.slice(0, 3).map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px]">{item.versionName}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{item.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {item.changeSummary}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
