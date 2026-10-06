import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  GitBranch, 
  Layers, 
  Calendar, 
  Table, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Search,
  ShieldCheck,
  FileText,
  Clock,
  ExternalLink
} from 'lucide-react';

export const AdminAdmissionState: React.FC = () => {
  const { currentAdmissionState, selectedCycle, setLineageTarget, availableCycles, setSelectedCycle } = useAdmission();
  const [activeSection, setActiveSection] = useState<'methods' | 'quotas' | 'deadlines' | 'conditions'>('methods');
  const [majorSearch, setMajorSearch] = useState('');

  const state = currentAdmissionState;

  const filteredQuotas = state.quotas.filter(q => 
    q.majorName.toLowerCase().includes(majorSearch.toLowerCase()) ||
    q.majorCode.includes(majorSearch) ||
    q.faculty.toLowerCase().includes(majorSearch.toLowerCase())
  );

  return (
    <div className="space-y-5">
      
      {/* Header and Cycle Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Cây Tri Thức Tuyển Sinh Hiện Hành
            </h2>
            <span className="font-mono text-xs bg-sky-100 text-sky-800 font-bold px-2.5 py-0.5 rounded">
              {state.channel} — Chu kỳ {selectedCycle}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Dữ liệu tuyển sinh có cấu trúc đã xác thực. Mọi phần tử đều gắn liền với căn cứ pháp lý nguồn gốc.
          </p>
        </div>

        {/* Cycle selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-slate-500 px-2">Xem chu kỳ:</span>
          {availableCycles.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCycle(c)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCycle === c 
                  ? 'bg-sky-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Năm {c}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation tabs for sections */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs overflow-x-auto">
        {[
          { id: 'methods', label: `Phương thức (${state.methods.filter(m => m.status === 'active').length})`, icon: Layers },
          { id: 'quotas', label: `Ngành & Chỉ tiêu (${state.quotas.length})`, icon: Table },
          { id: 'deadlines', label: `Lịch tuyển sinh (${state.deadlines.length} đợt)`, icon: Calendar },
          { id: 'conditions', label: `Điều kiện & Điểm sàn (${state.conditions.length})`, icon: ShieldCheck },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-1.5 py-2.5 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-sky-900 text-sky-950 bg-sky-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: METHODS */}
      {activeSection === 'methods' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>
              Tự động tính toán số phương thức có hiệu lực cho chu kỳ {selectedCycle}. Nhấp vào <strong className="text-sky-800">"Vì sao giá trị này ở đây?"</strong> để kiểm tra nguồn gốc văn bản.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.methods.map((method) => {
              const isActive = method.status === 'active';

              return (
                <div 
                  key={method.code}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive 
                      ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300' 
                      : 'bg-rose-50/40 border-rose-200 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isActive ? 'bg-sky-900 text-white' : 'bg-rose-700 text-white'
                      }`}>
                        Mã {method.code}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isActive ? 'text-emerald-700' : 'text-rose-700'
                      }`}>
                        {isActive ? '● Đang kích hoạt' : '✖ Đã dừng xét tuyển'}
                      </span>
                    </div>

                    {/* Data Lineage Button */}
                    <button
                      onClick={() => setLineageTarget({
                        title: `Phương thức ${method.code}: ${method.name}`,
                        entity: "Phương thức tuyển sinh",
                        currentValue: isActive ? "Kích hoạt (Active)" : "Ngừng áp dụng (Deprecated)",
                        docId: method.lineageDocId,
                        docName: method.lineageDocName,
                        date: method.lineageDate,
                        detail: method.lineageDetail,
                        evidence: method.evidence
                      })}
                      className="px-2 py-1 rounded bg-sky-50 text-sky-800 hover:bg-sky-100 text-[11px] font-semibold flex items-center gap-1 border border-sky-200 transition-colors cursor-pointer"
                      title="Truy xuất căn cứ văn bản cho giá trị này"
                    >
                      <GitBranch className="w-3 h-3 text-sky-600" />
                      <span>Vì sao giá trị này ở đây?</span>
                    </button>
                  </div>

                  <h3 className={`font-bold text-sm mt-2.5 ${isActive ? 'text-slate-900' : 'text-rose-900 line-through'}`}>
                    {method.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {method.shortDesc}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">Căn cứ: {method.lineageDocName}</span>
                    <span>Ngày xác lập: {method.lineageDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: QUOTAS */}
      {activeSection === 'quotas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-slate-500">
              Phân bổ chỉ tiêu chi tiết theo từng phương thức xét tuyển:
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={majorSearch}
                onChange={(e) => setMajorSearch(e.target.value)}
                placeholder="Tìm ngành, mã ngành..."
                className="bg-transparent border-none text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Mã ngành</th>
                    <th className="py-3 px-4">Tên ngành đào tạo</th>
                    <th className="py-3 px-4">Đơn vị / Khoa</th>
                    <th className="py-3 px-4 text-center font-mono">Tổng chỉ tiêu</th>
                    <th className="py-3 px-4">Phân bổ theo PT</th>
                    <th className="py-3 px-4 text-right">Nguồn gốc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuotas.map((q) => (
                    <tr key={q.majorCode} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-mono font-bold text-sky-950">
                        {q.majorCode}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {q.majorName}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {q.faculty}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-extrabold text-sm text-sky-900 tabular-nums">
                        {q.totalQuota}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {Object.entries(q.methodQuotas).map(([mCode, val]) => (
                            <span 
                              key={mCode}
                              className="font-mono text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200"
                            >
                              PT {mCode}: <strong className="text-slate-900">{val}</strong>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setLineageTarget({
                            title: `Chỉ tiêu tuyển sinh ngành ${q.majorName} (${q.majorCode})`,
                            entity: "Chỉ tiêu ngành",
                            currentValue: `${q.totalQuota} chỉ tiêu`,
                            docId: q.lineageDocId,
                            docName: q.lineageDocName,
                            date: q.lineageDate,
                            detail: `Chỉ tiêu được phân bổ trong Phụ lục 1 kèm theo ${q.lineageDocName}`
                          })}
                          className="text-sky-700 hover:text-sky-900 font-medium text-[11px] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <GitBranch className="w-3 h-3" />
                          <span>Lineage</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: DEADLINES */}
      {activeSection === 'deadlines' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.deadlines.map((dl) => (
              <div 
                key={dl.round}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold bg-sky-900 text-white px-2 py-0.5 rounded">
                    ĐỢT {dl.round}
                  </span>

                  <button
                    onClick={() => setLineageTarget({
                      title: dl.name,
                      entity: "Hạn đăng ký xét tuyển",
                      currentValue: `${dl.startDate} đến ${dl.endDate}`,
                      docId: dl.lineageDocId,
                      docName: dl.lineageDocName,
                      date: dl.lineageDate,
                      detail: dl.lineageDetail
                    })}
                    className="text-sky-700 hover:text-sky-900 font-medium text-[11px] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <GitBranch className="w-3 h-3" />
                    <span>Vì sao giá trị này ở đây?</span>
                  </button>
                </div>

                <h3 className="font-bold text-sm text-slate-900">{dl.name}</h3>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Bắt đầu nhận hồ sơ:</span>
                    <span className="font-mono font-bold text-slate-800">{dl.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Hạn chót kết thúc:</span>
                    <span className="font-mono font-extrabold text-sky-900 text-sm">{dl.endDate}</span>
                  </div>
                </div>

                {dl.note && (
                  <p className="text-xs text-slate-600 bg-amber-50/70 p-2.5 rounded border border-amber-200/70">
                    {dl.note}
                  </p>
                )}

                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  Cập nhật bởi: {dl.lineageDocName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: CONDITIONS */}
      {activeSection === 'conditions' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {state.conditions.map((cond) => (
              <div 
                key={cond.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{cond.title}</h4>
                  <button
                    onClick={() => setLineageTarget({
                      title: cond.title,
                      entity: "Ngưỡng ĐBCL / Điều kiện xét tuyển",
                      currentValue: cond.detail,
                      docId: cond.lineageDocId,
                      docName: cond.lineageDocName,
                      date: cond.lineageDate,
                      detail: `Quy định tại Mục 3 Đề án tuyển sinh ${cond.lineageDocName}`
                    })}
                    className="text-sky-700 hover:text-sky-900 font-medium text-[11px] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <GitBranch className="w-3 h-3" />
                    <span>Vì sao giá trị này ở đây?</span>
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {cond.detail}
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                  <span>Phương thức áp dụng:</span>
                  <div className="flex gap-1">
                    {cond.applicableMethods.map(m => (
                      <span key={m} className="font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px]">
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

    </div>
  );
};
