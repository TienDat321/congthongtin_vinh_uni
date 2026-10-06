import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  Download, 
  Globe, 
  User, 
  FileText, 
  Sparkles,
  Award,
  Building
} from 'lucide-react';
import { initialInternationalApplicants, internationalContactOfficer } from '../../data/internationalMockData';
import { InternationalApplicant, LanguageMode } from '../../types/international';

interface InternationalResultLookupProps {
  lang: LanguageMode;
}

export const InternationalResultLookup: React.FC<InternationalResultLookupProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<InternationalApplicant | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const found = initialInternationalApplicants.find(
      app => app.passportNumber.toLowerCase() === query || 
             app.applicationCode.toLowerCase() === query ||
             app.fullName.toLowerCase().includes(query)
    );

    setSearchResult(found || null);
    setHasSearched(true);
  };

  const handleQuickLookup = (code: string) => {
    setSearchQuery(code);
    const found = initialInternationalApplicants.find(app => app.applicationCode === code || app.passportNumber === code);
    setSearchResult(found || null);
    setHasSearched(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in duration-150">
      
      {/* Title */}
      <div className="space-y-2 border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Search className="w-3.5 h-3.5 text-indigo-600" />
          <span>
            {lang === 'en' ? 'Admission Status & Offer Letter' : lang === 'lao' ? 'ກວດສອບຜົນການສະໝັກຮຽນ' : 'Tra Cứu Kết Quả Xét Tuyển & Giấy Triệu Tập Nhập Học'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          {lang === 'en' 
            ? 'International Student Admission Result Verification' 
            : lang === 'lao' 
            ? 'ລະບົບກວດສອບຜົນການຮັບເຂົ້າຮຽນນັກສຶກສາສາກົນ' 
            : 'Hệ Thống Tra Cứu Trúng Tuyển & Thư Mời Nhập Học (Offer Letter)'}
        </h2>
        <p className="text-xs text-slate-500">
          {lang === 'en'
            ? 'Enter your Passport Number or Application Code to check your acceptance status and download your official Admission Offer Letter.'
            : lang === 'lao'
            ? 'ປ້ອນເລກທີ Passport ຫຼື ລະຫັດສະໝັກ ເພື່ອກວດສອບຜົນການຮັບຮຽນ ແລະ ດາວໂຫຼດໃບແຈ້ງການ.'
            : 'Nhập số Hộ chiếu (Passport) hoặc Mã hồ sơ để kiểm tra tiến độ xét duyệt và nhận Giấy báo triệu tập nhập học chính thức.'}
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              required
              placeholder={lang === 'en' ? 'Enter Passport No. (e.g. P01982736) or Application Code...' : 'Nhập số Hộ chiếu (vd: P01982736) hoặc Mã hồ sơ...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shrink-0"
          >
            <span>{lang === 'en' ? 'Check Now' : lang === 'lao' ? 'ກວດສອບ' : 'Tra cứu ngay'}</span>
          </button>
        </div>

        {/* Quick Demo links */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span className="font-bold">Mẫu tra cứu nhanh:</span>
          <button
            type="button"
            onClick={() => handleQuickLookup('P01982736')}
            className="text-indigo-700 hover:underline font-mono font-semibold"
          >
            P01982736 (Somxay Vongphachanh - Lào - Trúng tuyển)
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => handleQuickLookup('E98127364')}
            className="text-indigo-700 hover:underline font-mono font-semibold"
          >
            E98127364 (Michael David Smith - Anh - Thạc sĩ)
          </button>
        </div>
      </form>

      {/* Search Result */}
      {hasSearched && (
        <div className="max-w-2xl mx-auto">
          {searchResult ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              
              {/* Status Header Badge */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                searchResult.status === 'ACCEPTED'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                    searchResult.status === 'ACCEPTED' ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}>
                    {searchResult.status === 'ACCEPTED' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider block">
                      {lang === 'en' ? 'APPLICATION STATUS' : 'TRẠNG THÁI HỒ SƠ'}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base">
                      {searchResult.status === 'ACCEPTED' 
                        ? (lang === 'en' ? 'OFFICIALLY ACCEPTED — ADMISSION OFFER GRANTED' : 'TRÚNG TUYỂN — ĐÃ CẤP THƯ MỜI NHẬP HỌC (OFFER LETTER)')
                        : (lang === 'en' ? 'PROFILE UNDER REVIEW' : 'ĐANG THẨM ĐỊNH HỒ SƠ')}
                    </h3>
                  </div>
                </div>

                <span className="font-mono text-xs font-extrabold bg-white px-3 py-1 rounded-lg shadow-2xs border">
                  {searchResult.applicationCode}
                </span>
              </div>

              {/* Official Offer Letter Card (Printable) */}
              <div className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 shadow-sm space-y-5 text-slate-800 font-sans text-xs">
                
                {/* Official Letter Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-4 text-center sm:text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC VINH
                    </span>
                    <h4 className="font-extrabold text-indigo-950 text-sm">
                      VINH UNIVERSITY — DEPARTMENT OF RESEARCH & INTERNATIONAL AFFAIRS
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono block">
                      182 Le Duan Str., Vinh City, Nghe An Province, Vietnam
                    </span>
                  </div>

                  <div className="text-center sm:text-right space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Offer Letter Code</span>
                    <strong className="text-indigo-900 font-mono text-xs bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 block">
                      {searchResult.offerLetterCode || 'PENDING'}
                    </strong>
                    <span className="text-[10px] text-slate-500 block">Ngày cấp: {searchResult.submissionDate}</span>
                  </div>
                </div>

                {/* Offer Letter Title */}
                <div className="text-center space-y-1 py-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-indigo-950 uppercase tracking-tight">
                    THƯ MỜI NHẬP HỌC / ADMISSION OFFER LETTER
                  </h3>
                  <span className="text-[11px] text-slate-500 italic block">
                    (V/v Tiếp nhận lưu học sinh quốc tế vào học tập tại Trường Đại học Vinh)
                  </span>
                </div>

                {/* Candidate Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Họ và tên / Full Name:</span>
                    <strong className="text-slate-900 font-extrabold text-sm">{searchResult.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Số Hộ chiếu / Passport No.:</span>
                    <strong className="text-slate-900 font-mono">{searchResult.passportNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Quốc tịch / Nationality:</span>
                    <strong className="text-slate-900">{searchResult.nationality}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Ngày sinh / Date of Birth:</span>
                    <strong className="text-slate-900 font-mono">{searchResult.dob}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 text-[11px] block">Ngành học trúng tuyển / Admitted Major:</span>
                    <strong className="text-indigo-950 font-bold">{searchResult.appliedMajorName} (Mã: {searchResult.appliedMajorCode})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Bậc đào tạo / Degree Level:</span>
                    <strong className="text-slate-900 uppercase font-mono">{searchResult.appliedDegree}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Lớp Dự bị Tiếng Việt / Prep Course:</span>
                    <strong className="text-amber-800">{searchResult.needsVietnamesePrep ? 'Học 01 năm Dự bị (500 USD)' : 'Miễn (Đã có chứng chỉ B2)'}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 text-[11px] block">Diện học bổng / Scholarship Category:</span>
                    <strong className="text-emerald-800">
                      {searchResult.scholarshipType === 'agreement' 
                        ? 'Học bổng Hiệp định Chính phủ (Toàn phần học phí & KTX)'
                        : searchResult.scholarshipType === 'province'
                        ? 'Học bổng UBND Tỉnh Nghệ An tài trợ'
                        : 'Diện Tự túc / Thỏa thuận MOU (Học phí 500 USD/năm)'}
                    </strong>
                  </div>
                </div>

                {/* Reviewer Note */}
                {searchResult.reviewerNotes && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950">
                    <strong className="block text-emerald-900 mb-0.5">Ý kiến phê duyệt của Hội đồng tuyển sinh quốc tế:</strong>
                    <p className="text-slate-700">{searchResult.reviewerNotes}</p>
                  </div>
                )}

                {/* Signer block */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="text-[11px] text-slate-500">
                    <span>Đơn vị hỗ trợ thủ tục thị thực & ký túc xá:</span>
                    <strong className="block text-slate-800">Phòng Khoa học & Hợp tác Quốc tế (ĐH Vinh)</strong>
                    <span className="font-mono">Email: international@vinhuni.edu.vn</span>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[11px] text-slate-500 block uppercase">TL. HIỆU TRƯỞNG / P. PHÒNG KH & HTQT</span>
                    <div className="h-12 flex items-center justify-center">
                      <span className="font-serif italic text-indigo-900 font-bold text-sm">Phan Van Tien</span>
                    </div>
                    <strong className="text-xs text-slate-900 block">{internationalContactOfficer.officerName}</strong>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer text-xs shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>In Thư Mời Nhập Học (Print Offer Letter)</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Không tìm thấy hồ sơ với thông tin "{searchQuery}"
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Vui lòng kiểm tra lại chính xác số Hộ chiếu (Passport) hoặc Mã hồ sơ đã được cấp khi đăng ký trực tuyến.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
