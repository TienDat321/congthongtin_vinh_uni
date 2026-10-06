import React, { useState } from 'react';
import { 
  GraduationCap, 
  School, 
  Layers, 
  Calendar, 
  CreditCard, 
  Search, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  ExternalLink,
  Users,
  Coins,
  RefreshCw,
  Gift
} from 'lucide-react';
import { 
  initialTHSPQuotas, 
  initialTHSPDocuments, 
  thspFeePolicyDetails, 
  initialTHSPApplicants 
} from '../../data/thspMockData';
import { THSPGradeLevel, THSPQuotaInfo } from '../../types/thsp';
import { THSPTimelineWidget } from './THSPTimelineWidget';
import { THSPRegistrationForm } from './THSPRegistrationForm';
import { THSPResultLookup } from './THSPResultLookup';
import { THSPNotificationPreviewModal } from './THSPNotificationPreviewModal';

export const PublicTHSP: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'register' | 'results' | 'fees' | 'documents'>('overview');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<THSPGradeLevel>('all');
  const [selectedDocForDiff, setSelectedDocForDiff] = useState<any | null>(null);
  const [previewModalApplicant, setPreviewModalApplicant] = useState<any | null>(null);

  const quotas = initialTHSPQuotas;
  const filteredQuotas = selectedGradeFilter === 'all' 
    ? quotas 
    : quotas.filter(q => q.gradeLevel === selectedGradeFilter);

  // Active replacement notice (02 thay the 52)
  const doc02 = initialTHSPDocuments.find(d => d.officialNumber === '02/TB-THSP');
  const doc52 = initialTHSPDocuments.find(d => d.officialNumber === '52/TB-THSP');

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-950 via-sky-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm border border-sky-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-amber-300" />
              <span>Trường Thực hành Sư phạm — Đại học Vinh</span>
            </span>

            <span className="bg-sky-500/20 text-sky-200 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-semibold">
              Mã cơ sở: <strong className="font-mono text-white">THSP-VINHUNI</strong>
            </span>

            {/* Version badge */}
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold">
              ✓ Số 02/TB-THSP (Thay thế số 52)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Cổng Tuyển Sinh Các Cấp Học Năm Học 2026 - 2027
          </h1>

          <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed max-w-3xl">
            Hệ thống quản lý và công bố thông tin tuyển sinh tự động trích xuất từ văn bản chính thức của Trường Đại học Vinh. Phân luồng đầy đủ từ <strong>Mầm non</strong>, <strong>Tiểu học (Lớp 1)</strong>, <strong>THCS (Lớp 6 CLC)</strong> đến <strong>THPT (Lớp 10, 11)</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Hạn đăng ký: <strong className="text-white">10/06/2026</strong> (Đã gia hạn theo TB số 02)</span>
            </div>

            <button
              onClick={() => setActiveTab('register')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer text-xs"
            >
              <CreditCard className="w-4 h-4 text-slate-950" />
              <span>Đăng Ký & Quét VietQR (300k)</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className="bg-sky-800 hover:bg-sky-700 text-white font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer text-xs"
            >
              <Search className="w-4 h-4 text-amber-300" />
              <span>Tra cứu điểm thi & kết quả</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-slate-200 bg-white rounded-xl shadow-xs px-4 flex items-center gap-1 sm:gap-3 overflow-x-auto text-xs">
        {[
          { id: 'overview', label: 'Chỉ tiêu & Tiêu chí xét tuyển', icon: Layers },
          { id: 'timeline', label: 'Lịch trình & Đếm ngược', icon: Calendar },
          { id: 'register', label: 'Đăng ký trực tuyến & VietQR', icon: CreditCard },
          { id: 'results', label: 'Tra cứu điểm & Kết quả', icon: Search },
          { id: 'fees', label: 'Bảng học phí & Miễn giảm', icon: Coins },
          { id: 'documents', label: 'Văn bản gốc & Lịch sử thay thế', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* ================= TAB 1: OVERVIEW & QUOTAS ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Replacement Alert Notice Banner */}
          <div className="bg-amber-50/90 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <div className="font-extrabold text-amber-950 text-sm">
                  VĂN BẢN ĐÃ CẬP NHẬT: Thông báo số 02/TB-THSP (18/05/2026) thay thế Thông báo số 52
                </div>
                <p className="text-slate-700">
                  Chỉ tiêu lớp 6 đã được điều chỉnh tăng từ <strong>180 lên 210 học sinh</strong> (tăng thêm 01 lớp). Hạn nộp hồ sơ được gia hạn đến <strong>17h00 ngày 10/06/2026</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('documents')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              Xem so sánh chi tiết →
            </button>
          </div>

          {/* Grade Level Filter Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
                Phân luồng 4 cấp học
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                Chỉ Tiêu & Tiêu Chí Tuyển Sinh Từng Khối Lớp
              </h3>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
              {[
                { id: 'all', label: 'Tất cả cấp học' },
                { id: 'mam-non', label: 'Mầm non' },
                { id: 'lop-1', label: 'Lớp 1' },
                { id: 'lop-6', label: 'Lớp 6 CLC' },
                { id: 'lop-10-11', label: 'Lớp 10 & 11' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedGradeFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedGradeFilter === f.id
                      ? 'bg-sky-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quota Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredQuotas.map((q) => (
              <div 
                key={q.gradeLevel}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-100 text-sky-900">
                      {q.gradeName}
                    </span>
                    <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Chỉ tiêu: {q.targetQuota} HS ({q.classCount} lớp)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Độ tuổi / Năm sinh:</span>
                      <strong className="text-slate-900">{q.birthYear}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Phân bổ cơ sở:</span>
                      <strong className="text-slate-900">CS1: {q.campus1Quota} | CS2: {q.campus2Quota}</strong>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-700">Phương thức tuyển sinh:</span>
                    <p className="text-slate-600 leading-relaxed bg-sky-50/50 p-2.5 rounded-lg border border-sky-100">
                      {q.method}
                    </p>
                  </div>

                  {q.scoringFormula && (
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-sky-900">Công thức tính điểm & Điểm sàn:</span>
                      <p className="text-slate-700 font-mono text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        {q.scoringFormula}
                      </p>
                    </div>
                  )}

                  {/* Priority Criteria */}
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-700">Thứ tự các tiêu chí ưu tiên:</span>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                      {q.priorityCriteria.map((crit, idx) => (
                        <li key={idx}>{crit}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Lottery Rule */}
                  {q.lotteryRule && (
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                      <strong className="text-amber-900 flex items-center gap-1 text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Quy định bốc thăm hồ sơ khi vượt chỉ tiêu:</span>
                      </strong>
                      <p className="text-slate-700 text-[11px] leading-relaxed">
                        {q.lotteryRule}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Học phí quy định:</span>
                    <strong className="text-sky-950 font-mono">{q.tuitionFeePerMonth.toLocaleString('vi-VN')} đ/tháng</strong>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('register');
                    }}
                    className="px-4 py-2 bg-sky-900 hover:bg-sky-800 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Nộp hồ sơ trực tuyến</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= TAB 2: TIMELINE & COUNTDOWN ================= */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <THSPTimelineWidget />
        </div>
      )}

      {/* ================= TAB 3: ONLINE REGISTRATION & VIETQR ================= */}
      {activeTab === 'register' && (
        <div className="space-y-6">
          <THSPRegistrationForm 
            defaultGrade={selectedGradeFilter}
            isOpenRegistration={true}
            onSuccessRegister={(applicant) => {
              setPreviewModalApplicant(applicant);
            }}
          />
        </div>
      )}

      {/* ================= TAB 4: RESULT LOOKUP TOOL ================= */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <THSPResultLookup />
        </div>
      )}

      {/* ================= TAB 5: TUITION FEES & POLICIES ================= */}
      {activeTab === 'fees' && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                Minh bạch tài chính tuyển sinh
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Bảng Thu Học Phí & Chi Phí Bán Trú Năm Học 2026 - 2027
              </h3>
              <p className="text-xs text-slate-600">
                Phê duyệt theo {thspFeePolicyDetails.approvedBy}. Lệ phí xét tuyển đầu vào: <strong>300.000 VNĐ/hồ sơ</strong> nộp qua VietQR.
              </p>
            </div>

            {/* Monthly Fees Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3.5">Khối Lớp Đào Tạo</th>
                    <th className="p-3.5 text-right">Học Phí Hàng Tháng</th>
                    <th className="p-3.5 text-right">Tiền Ăn & Bán Trú</th>
                    <th className="p-3.5 text-right">Điện Nước & Điều Hòa</th>
                    <th className="p-3.5 text-right">Tổng Thu Dự Kiến</th>
                    <th className="p-3.5">Ghi Chú Chương Trình</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {thspFeePolicyDetails.monthlyFees.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">{fee.level}</td>
                      <td className="p-3.5 text-right font-mono text-sky-900 font-semibold">
                        {fee.tuition.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-700">
                        {fee.boarding.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-500">
                        {fee.utilities.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="p-3.5 text-right font-mono font-extrabold text-emerald-800 text-sm">
                        {fee.totalMonthly.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="p-3.5 text-slate-600 text-[11px]">{fee.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Exemption Policies Cards */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                <span>Chính Sách Miễn Giảm Học Phí (Nghị Quyết Hội Đồng Trường ĐHV)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {thspFeePolicyDetails.exemptions.map((ex, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-extrabold text-sky-900 text-sm block">
                      {ex.title}
                    </span>
                    <p className="text-xs text-slate-700 font-semibold">
                      Đối tượng: {ex.beneficiary}
                    </p>
                    <p className="text-[11px] text-slate-500 italic">
                      Căn cứ pháp lý: {ex.legalBasis}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 6: DOCUMENTS & REPLACEMENT DIFF ================= */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                Hệ thống văn bản số hóa & Lịch sử phiên bản
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Danh Mục Văn Bản Pháp Lý Tuyển Sinh Trường Thực Hành Sư Phạm
              </h3>
              <p className="text-xs text-slate-600">
                Hệ thống tự động nhận diện văn bản thay thế (Thông báo số 02 thay thế Thông báo số 52).
              </p>
            </div>

            {/* Document Cards */}
            <div className="space-y-4">
              {initialTHSPDocuments.map((doc) => {
                const isReplacement = doc.docType === 'REPLACEMENT_NOTICE';
                const isReplaced = doc.replacesDocId || doc.officialNumber === '52/TB-THSP';

                return (
                  <div 
                    key={doc.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      isReplacement
                        ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-500/20 shadow-xs'
                        : doc.isPublished
                        ? 'bg-white border-slate-200'
                        : 'bg-slate-50/60 border-slate-200 opacity-80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-sky-900 text-white">
                            {doc.officialNumber}
                          </span>
                          <span className="text-xs text-slate-500">Ban hành: {doc.issueDate}</span>

                          {isReplacement && (
                            <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                              Văn bản thay thế mới nhất
                            </span>
                          )}

                          {!doc.isPublished && (
                            <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Đã bị thay thế (Lưu trữ)
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                          {doc.summary}
                        </h4>

                        <p className="text-xs text-slate-600">
                          Người ký: <strong>{doc.signer}</strong> · Đơn vị: {doc.issuer}
                        </p>

                        {doc.keyChangesHighlight && (
                          <div className="p-3 bg-white/90 rounded-xl border border-sky-200 text-xs space-y-1">
                            <span className="font-bold text-sky-950">Điểm cốt lõi được AI bóc tách:</span>
                            <p className="text-slate-700 font-mono text-[11px]">{doc.keyChangesHighlight}</p>
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex sm:flex-col items-center gap-2">
                        <button
                          onClick={() => setSelectedDocForDiff(doc)}
                          className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-sky-700" />
                          <span>Chi tiết trích xuất</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Replacement Details Modal or Inline Viewer */}
            {selectedDocForDiff && (
              <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="font-extrabold text-sm text-amber-400">
                    Chi Tiết Dữ Liệu Bóc Tách: {selectedDocForDiff.officialNumber}
                  </div>
                  <button onClick={() => setSelectedDocForDiff(null)} className="text-slate-400 hover:text-white text-xs">
                    ✕ Đóng
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Số hiệu văn bản:</span>
                    <strong className="text-white font-mono">{selectedDocForDiff.officialNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Văn bản bị thay thế:</span>
                    <strong className="text-amber-300 font-mono">{selectedDocForDiff.replacesOfficialNumber || 'Không có (Văn bản gốc)'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Hạn đăng ký:</span>
                    <strong className="text-white font-mono">{selectedDocForDiff.applicationDeadline}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Lệ phí hồ sơ:</span>
                    <strong className="text-emerald-400 font-mono">{selectedDocForDiff.registrationFee.toLocaleString('vi-VN')} VNĐ (VietQR)</strong>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Global Preview Modal if any applicant registered */}
      {previewModalApplicant && (
        <THSPNotificationPreviewModal
          isOpen={true}
          onClose={() => setPreviewModalApplicant(null)}
          applicant={previewModalApplicant}
        />
      )}

    </div>
  );
};
