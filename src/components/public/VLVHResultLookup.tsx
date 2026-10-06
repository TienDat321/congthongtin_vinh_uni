import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Printer, 
  Award, 
  FileText, 
  User, 
  Briefcase, 
  School,
  Check
} from 'lucide-react';
import { initialVLVHApplicants } from '../../data/vlvhMockData';
import { VLVHApplicationRecord } from '../../types/vlvh';

interface VLVHResultLookupProps {
  applicants?: VLVHApplicationRecord[];
}

export const VLVHResultLookup: React.FC<VLVHResultLookupProps> = ({
  applicants = initialVLVHApplicants
}) => {
  const [searchKey, setSearchKey] = useState('040195003456'); // CCCD or AppCode
  const [studentName, setStudentName] = useState('Trần Thị Mai Hương');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaCode, setCaptchaCode] = useState('9VLV');
  
  const [searched, setSearched] = useState(false);
  const [resultRecord, setResultRecord] = useState<VLVHApplicationRecord | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleRefreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserCaptcha('');
  };

  const handleQuickFill = (applicant: VLVHApplicationRecord) => {
    setSearchKey(applicant.idCardNumber);
    setStudentName(applicant.studentName);
    setUserCaptcha(captchaCode);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setSearchError(null);
    setShowCertificate(false);

    if (userCaptcha.trim().toUpperCase() !== captchaCode) {
      setSearchError('Mã xác nhận CAPTCHA không chính xác. Vui lòng nhập lại!');
      handleRefreshCaptcha();
      return;
    }

    const key = searchKey.trim().toLowerCase();
    const name = studentName.trim().toLowerCase();

    const found = applicants.find(a => {
      const matchKey = a.idCardNumber.toLowerCase() === key ||
                       a.applicationCode.toLowerCase() === key;
      const matchName = a.studentName.toLowerCase().includes(name);
      return matchKey || matchName;
    });

    if (found) {
      setResultRecord(found);
    } else {
      setResultRecord(null);
      setSearchError(`Không tìm thấy hồ sơ dự tuyển phù hợp với thông tin: "${searchKey}". Vui lòng kiểm tra lại Số CCCD hoặc Mã hồ sơ.`);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Search Filter Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-emerald-800" />
            <span>Tra cứu trực tuyến hệ Vừa làm vừa học</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Tra Cứu Hồ Sơ & Kết Quả Xét Tuyển Đại Học VLVH Năm 2026
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Hội đồng Tuyển sinh Trường Đại học Vinh — Trung tâm Giáo dục thường xuyên
          </p>
        </div>

        {/* Quick Demo Selectors */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Mẫu demo nhanh:</span>
          {applicants.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => handleQuickFill(a)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-900 font-medium transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>{a.studentName}</span>
              <span className="text-[10px] text-slate-400 font-mono">({a.majorName})</span>
              {a.status === 'ADMITTED' && (
                <span className="text-[10px] text-emerald-600 font-bold">✓ Đã trúng tuyển</span>
              )}
            </button>
          ))}
        </div>

        {/* Form Search */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Số Căn cước công dân (CCCD) hoặc Mã hồ sơ *</label>
            <input
              type="text"
              required
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Vd: 040195003456"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono uppercase font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Họ và tên thí sinh *</label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Vd: Trần Thị Mai Hương"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Mã xác nhận CAPTCHA *</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                placeholder="Nhập mã..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono uppercase tracking-widest text-center font-bold"
              />
              <div 
                onClick={handleRefreshCaptcha}
                title="Bấm để đổi mã"
                className="px-3 py-2.5 bg-slate-900 text-amber-400 font-mono font-extrabold text-sm tracking-widest rounded-xl select-none cursor-pointer border border-slate-700 shrink-0"
              >
                {captchaCode}
              </div>
            </div>
          </div>

          <div className="sm:col-span-3 flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer text-xs"
            >
              <Search className="w-4 h-4" />
              <span>Tra Cứu Hồ Sơ & Kết Quả</span>
            </button>
          </div>
        </form>

        {searchError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{searchError}</span>
          </div>
        )}
      </div>

      {/* Result presentation */}
      {searched && resultRecord && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Result Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            resultRecord.status === 'ADMITTED'
              ? 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white border-emerald-600/50'
              : 'bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white border-sky-600/50'
          }`}>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-400 text-slate-950">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{resultRecord.status === 'ADMITTED' ? 'ĐỦ ĐIỀU KIỆN TRÚNG TUYỂN (ĐỢT 1/2026)' : 'HỒ SƠ HỢP LỆ — ĐANG XÉT DUYỆT'}</span>
              </span>

              <h4 className="text-2xl font-extrabold text-white mt-1">
                Thí sinh: {resultRecord.studentName}
              </h4>
              <p className="text-xs text-slate-300">
                Ngành trúng tuyển: <strong className="text-amber-300">{resultRecord.majorName}</strong> (Mã: {resultRecord.majorCode}) · Mã hồ sơ: <strong className="font-mono text-sky-200">{resultRecord.applicationCode}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {resultRecord.status === 'ADMITTED' && (
                <button
                  type="button"
                  onClick={() => setShowCertificate(!showCertificate)}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>{showCertificate ? 'Ẩn Giấy Báo' : 'Xem Giấy Báo Trúng Tuyển'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Certificate View */}
          {showCertificate && resultRecord.status === 'ADMITTED' && (
            <div className="bg-white rounded-3xl border-4 border-double border-amber-300 p-8 sm:p-12 shadow-xl space-y-6 relative overflow-hidden font-serif">
              <div className="text-center space-y-1 border-b border-slate-200 pb-5 font-sans">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC VINH
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-sky-950">
                  GIẤY BÁO TRÚNG TUYỂN VÀ NHẬP HỌC ĐẠI HỌC HÌNH THỨC VỪA LÀM VỪA HỌC
                </h3>
                <p className="text-xs text-slate-600">
                  Theo Quyết định trúng tuyển căn cứ Thông báo số 07/TB-ĐHV ngày 16/01/2026
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                <p>
                  Hội đồng Tuyển sinh Trường Đại học Vinh trân trọng thông báo thí sinh:
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                  <div>Họ và tên: <strong className="text-sky-950 uppercase">{resultRecord.studentName}</strong></div>
                  <div>Giới tính: <strong>{resultRecord.gender}</strong></div>
                  <div>Ngày sinh: <strong>{resultRecord.birthDate}</strong></div>
                  <div>Số CCCD: <strong className="font-mono">{resultRecord.idCardNumber}</strong></div>
                  <div>Ngành trúng tuyển: <strong className="text-emerald-800">{resultRecord.majorName}</strong></div>
                  <div>Mã ngành: <strong className="font-mono">{resultRecord.majorCode}</strong></div>
                  <div>Trình độ trước đây: <strong>{resultRecord.graduatedLevel}</strong></div>
                  <div>Đơn vị công tác: <strong>{resultRecord.workplace || 'Tự do'}</strong></div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5 text-emerald-950">
                  <strong className="block font-bold">KẾT LUẬN & THỦ TỤC NHẬP HỌC:</strong>
                  <p>1. Thí sinh đủ điều kiện trúng tuyển đào tạo trình độ đại học hình thức Vừa làm vừa học năm 2026.</p>
                  <p>2. Thời gian nhập học: Từ ngày <strong>01/04/2026 đến 15/04/2026</strong>.</p>
                  <p>3. Địa điểm: Trung tâm Giáo dục thường xuyên, Tầng 5, Nhà điều hành, Trường Đại học Vinh, 182 Lê Duẩn, TP. Vinh, Nghệ An.</p>
                  <p>4. Lịch học: Tổ chức học trực tiếp kết hợp trực tuyến vào thứ Bảy, Chủ nhật hàng tuần.</p>
                </div>
              </div>

              {/* Signature block */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4 font-sans">
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Mã tra cứu: {resultRecord.applicationCode}</div>
                  <div className="text-[10px] text-emerald-700 font-bold">✓ Đã đối soát lệ phí xét tuyển 500.000 VNĐ</div>
                </div>

                <div className="text-center">
                  <div className="font-bold text-slate-900">KT. HIỆU TRƯỞNG — PHÓ HIỆU TRƯỞNG</div>
                  <div className="text-sky-900 font-serif italic text-sm mt-5">PGS.TS. Trần Bá Tiến</div>
                  <div className="text-[11px] text-slate-500">Trường Đại học Vinh</div>
                </div>
              </div>

              <div className="flex justify-end pt-2 font-sans">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In Giấy Báo Nhập Học</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
