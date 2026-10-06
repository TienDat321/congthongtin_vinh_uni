import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  Download, 
  GraduationCap, 
  User, 
  FileText, 
  Sparkles,
  Award,
  Building,
  RotateCcw
} from 'lucide-react';
import { mockPostgraduateApplicants } from '../../data/postgraduateMockData';
import { PostgraduateApplicant } from '../../types/postgraduate';

export const PostgraduateResultLookup: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<PostgraduateApplicant | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showAppealModal, setShowAppealModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    const cleaned = searchQuery.trim().toLowerCase();

    const found = mockPostgraduateApplicants.find(a => 
      a.applicationCode.toLowerCase().includes(cleaned) ||
      a.fullName.toLowerCase().includes(cleaned) ||
      a.idNumber.includes(cleaned)
    );

    setSearchResult(found || null);
  };

  const handleQuickLookup = (code: string) => {
    setSearchQuery(code);
    const found = mockPostgraduateApplicants.find(a => a.applicationCode === code);
    setSearchResult(found || null);
    setHasSearched(true);
  };

  return (
    <div className="space-y-8 text-xs">
      
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-200 border border-sky-400/30 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
            <Search className="w-3.5 h-3.5 text-amber-300" />
            <span>Cổng Tra Cứu Điểm Thi & Kết Quả Xét Tuyển Sau Đại Học (diemthi.vinhuni.edu.vn)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tra Cứu Kết Quả Chấm Xét Tuyển & Điểm Chuẩn Thạc Sĩ / Tiến Sĩ 2026
          </h2>

          <p className="text-slate-300 leading-relaxed text-xs">
            Theo Thông báo ngày 30/07/2026 của Hội đồng Tuyển sinh Trường Đại học Vinh. Thí sinh nhập <strong>Mã ứng viên</strong> hoặc <strong>Số CCCD / Họ tên</strong> để tra cứu kết quả và in Giấy báo trúng tuyển.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="pt-2 max-w-2xl">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-1.5 flex items-center shadow-lg border border-slate-200">
            <div className="pl-3.5 pr-2 text-slate-400">
              <Search className="w-5 h-5 text-sky-900" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập Mã ứng viên (VD: SDH-2026-1088) hoặc Số CCCD..."
              className="w-full bg-transparent border-none text-slate-900 text-sm focus:outline-none py-2 font-medium"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-900 hover:bg-sky-800 text-white rounded-xl font-bold transition-all shrink-0 cursor-pointer shadow-xs text-xs"
            >
              Tra cứu ngay
            </button>
          </form>

          {/* Quick Demo Sample Candidates */}
          <div className="flex flex-wrap items-center gap-2 pt-3 text-[11px] text-slate-300">
            <span className="text-amber-300 font-bold">Thử nhanh hồ sơ mẫu:</span>
            <button
              onClick={() => handleQuickLookup('SDH-2026-1088')}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer font-mono"
            >
              SDH-2026-1088 (Nguyễn Văn Hoàng - ThS Chính trị học)
            </button>
            <button
              onClick={() => handleQuickLookup('SDH-2026-1092')}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer font-mono"
            >
              SDH-2026-1092 (Lê Thị Phương Thảo - ThS PPDH Tiếng Anh)
            </button>
            <button
              onClick={() => handleQuickLookup('SDH-2026-2005')}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer font-mono"
            >
              SDH-2026-2005 (Trần Văn Đức - Tiến sĩ Xây dựng)
            </button>
          </div>
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      {hasSearched && (
        <div>
          {searchResult ? (
            <div className="space-y-6">
              
              {/* Status Header Banner */}
              <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm ${
                searchResult.status === 'ADMITTED'
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : searchResult.status === 'UNDER_REVIEW'
                  ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${
                    searchResult.status === 'ADMITTED' ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}>
                    {searchResult.status === 'ADMITTED' ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : (
                      <Clock className="w-7 h-7" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider opacity-80 block">
                      Mã hồ sơ: {searchResult.applicationCode}
                    </span>
                    <h3 className="text-xl font-extrabold">
                      {searchResult.status === 'ADMITTED' 
                        ? 'CHÚC MỪNG BẠN ĐÃ TRÚNG TUYỂN SAU ĐẠI HỌC NĂM 2026!'
                        : 'HỒ SƠ ĐANG TRONG QUÁ TRÌNH THẨM ĐỊNH & XÉT DUYỆT'}
                    </h3>
                    <p className="text-xs opacity-90">
                      Ngành: <strong>[{searchResult.majorCode}] {searchResult.majorName}</strong> ({searchResult.degreeLevel === 'master' ? 'Trình độ Thạc sĩ' : 'Trình độ Tiến sĩ'})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer text-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In Giấy Báo</span>
                  </button>
                  <button
                    onClick={() => setShowAppealModal(true)}
                    className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                    <span>Nộp phúc khảo</span>
                  </button>
                </div>
              </div>

              {/* Score Breakdown & Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Score Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <span className="font-extrabold text-slate-900 block text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
                    Kết Quả Điểm Số & Chuẩn Đầu Vào
                  </span>

                  <div className="space-y-2 font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Điểm bài luận / phỏng vấn:</span>
                      <strong className="text-slate-900 text-sm">
                        {searchResult.examScore ? searchResult.examScore.essayOrInterviewScore.toFixed(2) : 'Đang chấm'}
                      </strong>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Chứng chỉ ngoại ngữ:</span>
                      <strong className="text-emerald-700 font-bold">
                        {searchResult.foreignLanguageCert.type} (Đạt B2)
                      </strong>
                    </div>

                    <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-100">
                      <span>Tổng điểm xét tuyển:</span>
                      <strong className="text-sky-950 font-extrabold text-base">
                        {searchResult.examScore ? searchResult.examScore.totalScore.toFixed(2) : '--'}
                      </strong>
                    </div>

                    {searchResult.admissionNotice && (
                      <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 flex justify-between text-sky-950">
                        <span>Điểm chuẩn ngành (QĐ 2246):</span>
                        <strong className="font-bold">{searchResult.admissionNotice.cutoffScore.toFixed(2)} điểm</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <span className="font-extrabold text-slate-900 block text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
                    Thông Tin Thí Sinh
                  </span>

                  <div className="space-y-1.5 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Họ và tên:</span>
                      <strong className="text-slate-900 text-sm">{searchResult.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Ngày sinh / CCCD:</span>
                      <span className="font-mono">{searchResult.dateOfBirth} · {searchResult.idNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Tốt nghiệp đại học:</span>
                      <span>{searchResult.undergraduateDegree.major} — {searchResult.undergraduateDegree.institution}</span>
                    </div>
                  </div>
                </div>

                {/* Enrollment Next Steps */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <span className="font-extrabold text-slate-900 block text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
                    Kế Hoạch Nhập Học
                  </span>

                  {searchResult.admissionNotice ? (
                    <div className="space-y-2 text-slate-700">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Hạn nhập học chính thức:</span>
                        <strong className="text-emerald-800 text-sm font-bold font-mono">
                          {searchResult.admissionNotice.enrollmentDeadline}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Địa điểm nộp hồ sơ gốc:</span>
                        <span className="font-medium">{searchResult.admissionNotice.registrationLocation}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Căn cứ quyết định:</span>
                        <span className="font-mono text-xs">{searchResult.admissionNotice.officialNumber}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-500">
                      Hồ sơ đang xét duyệt cho đợt 2. Kết quả sẽ được công bố chính thức vào 30/11 - 02/12/2026.
                    </p>
                  )}
                </div>

              </div>

              {/* SIMULATED OFFICIAL ADMISSION LETTER (GIẤY BÁO TRÚNG TUYỂN) */}
              {searchResult.status === 'ADMITTED' && (
                <div className="bg-white rounded-3xl border-2 border-slate-800 p-8 sm:p-12 shadow-md space-y-6 font-serif relative overflow-hidden">
                  
                  {/* Watermark Logo Simulation */}
                  <div className="absolute right-10 bottom-10 opacity-5 pointer-events-none">
                    <GraduationCap className="w-96 h-96 text-slate-900" />
                  </div>

                  {/* Letter Header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 border-b border-slate-300 pb-6 font-sans">
                    <div>
                      <div className="text-[11px] font-bold text-slate-700 uppercase">
                        BỘ GIÁO DỤC VÀ ĐÀO TẠO
                      </div>
                      <div className="text-sm font-extrabold text-sky-950 uppercase tracking-tight">
                        TRƯỜNG ĐẠI HỌC VINH
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Số: {searchResult.applicationCode}/GNT-SĐH-2026
                      </div>
                    </div>

                    <div className="text-center sm:text-right">
                      <div className="text-[11px] font-bold text-slate-900 uppercase">
                        CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
                      </div>
                      <div className="text-[11px] font-semibold text-slate-800">
                        Độc lập - Tự do - Hạnh phúc
                      </div>
                      <div className="text-[10px] text-slate-500 italic mt-0.5">
                        Nghệ An, ngày 29 tháng 07 năm 2026
                      </div>
                    </div>
                  </div>

                  {/* Letter Title */}
                  <div className="text-center space-y-1 py-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 uppercase tracking-tight font-sans">
                      GIẤY BÁO TRÚNG TUYỂN VÀ NHẬP HỌC SAU ĐẠI HỌC
                    </h2>
                    <p className="text-xs italic text-slate-600 font-sans">
                      (Đào tạo trình độ {searchResult.degreeLevel === 'master' ? 'Thạc sĩ Khóa 34' : 'Tiến sĩ Khóa 2026'})
                    </p>
                  </div>

                  {/* Letter Body */}
                  <div className="space-y-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                    <p>
                      Hội đồng Tuyển sinh Trường Đại học Vinh trân trọng thông báo:
                    </p>
                    <p>
                      Anh/Chị: <strong className="font-bold uppercase text-slate-950 text-base">{searchResult.fullName}</strong> — Giới tính: <strong>{searchResult.gender}</strong>
                    </p>
                    <p>
                      Ngày sinh: <strong>{searchResult.dateOfBirth}</strong> — Số CCCD: <strong>{searchResult.idNumber}</strong>
                    </p>
                    <p>
                      Đã trúng tuyển kỳ tuyển sinh đào tạo trình độ <strong>{searchResult.degreeLevel === 'master' ? 'Thạc sĩ' : 'Tiến sĩ'}</strong> năm 2026:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 font-semibold text-sky-950">
                      <li>Ngành trúng tuyển: <strong>{searchResult.majorName}</strong></li>
                      <li>Mã số chuyên ngành: <strong>{searchResult.majorCode}</strong></li>
                      <li>Hình thức đào tạo: <strong>Chính quy tập trung</strong> (Thời gian đào tạo: 24 tháng)</li>
                      <li>Điểm xét tuyển đạt: <strong>{searchResult.examScore?.totalScore.toFixed(2)} điểm</strong> (Điểm chuẩn trúng tuyển ngành: <strong>{searchResult.admissionNotice?.cutoffScore.toFixed(2)} điểm</strong>)</li>
                    </ul>
                    <p>
                      Nhà trường đề nghị Anh/Chị có mặt tại Trường Đại học Vinh để làm thủ tục nhập học trước ngày <strong>{searchResult.admissionNotice?.enrollmentDeadline}</strong>.
                    </p>
                  </div>

                  {/* Signature Section */}
                  <div className="pt-8 flex items-end justify-between font-sans">
                    <div className="space-y-1">
                      <div className="w-24 h-24 p-1 bg-white border border-slate-300 rounded-lg">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://vinhuni.edu.vn/verify/${searchResult.applicationCode}`} 
                          alt="QR Xác thực"
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-[9px] text-slate-500 block">Quét để xác thực văn bản gốc</span>
                    </div>

                    <div className="text-center space-y-1">
                      <span className="text-xs font-bold uppercase text-slate-900 block">
                        KT. HIỆU TRƯỞNG · PHÓ HIỆU TRƯỞNG
                      </span>
                      <span className="text-[10px] text-slate-500 block">CHỦ TỊCH HỘI ĐỒNG TUYỂN SINH</span>
                      <div className="py-2">
                        <span className="text-red-700 font-serif italic text-sm font-bold border-2 border-red-600 px-3 py-1 rounded inline-block">
                          ĐÃ KÝ VÀ ĐÓNG DẤU SỐ
                        </span>
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm block">
                        PGS.TS. Trần Bá Tiến
                      </span>
                    </div>
                  </div>

                </div>
              )}

            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="font-bold text-slate-900 text-base">
                Không tìm thấy kết quả hồ sơ "{searchQuery}"
              </h3>
              <p className="text-slate-500 max-w-md mx-auto text-xs">
                Vui lòng kiểm tra lại tính chính xác của Mã ứng viên hoặc Số CCCD. Bạn cũng có thể bấm vào các nút gợi ý hồ sơ mẫu phía trên để thử nghiệm tra cứu.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Appeal Info Modal */}
      {showAppealModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>Quy Trình Nộp Đơn Phúc Khảo Sau Đại Học</span>
              </h3>
              <button
                onClick={() => setShowAppealModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>
                Căn cứ <strong>Thông báo về việc phúc khảo kết quả chấm xét tuyển đào tạo trình độ thạc sĩ đợt 1 năm 2026</strong> của Trường Đại học Vinh:
              </p>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-200">
                <p>• <strong>Địa điểm nhận đơn:</strong> Phòng Đào tạo Sau đại học, Tầng 4 Nhà Điều hành ĐH Vinh (182 Lê Duẩn, TP Vinh).</p>
                <p>• <strong>Lệ phí phúc khảo:</strong> 200.000 đồng/hồ sơ.</p>
                <p>• <strong>Thời hạn thông báo kết quả:</strong> Chậm nhất ngày 21/08/2026 gửi trực tiếp qua email thí sinh cung cấp.</p>
                <p>• <strong>Điện thoại hỗ trợ:</strong> 0238.3855773</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowAppealModal(false)}
                className="px-5 py-2 bg-sky-900 text-white rounded-xl font-bold cursor-pointer text-xs"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
