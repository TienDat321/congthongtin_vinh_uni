import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Printer, 
  Download, 
  ShieldCheck, 
  User, 
  RefreshCw, 
  Sparkles, 
  FileText, 
  HelpCircle,
  Award
} from 'lucide-react';
import { THSPApplicantRecord } from '../../types/thsp';
import { initialTHSPApplicants } from '../../data/thspMockData';

interface THSPResultLookupProps {
  applicants?: THSPApplicantRecord[];
}

export const THSPResultLookup: React.FC<THSPResultLookupProps> = ({
  applicants = initialTHSPApplicants
}) => {
  // Search Fields
  const [searchKey, setSearchKey] = useState('THSP-06-0128'); // SBD or AppCode
  const [studentName, setStudentName] = useState('Lê Minh Anh');
  const [birthDate, setBirthDate] = useState('2015-04-12');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7B9K');
  
  // Results
  const [searched, setSearched] = useState(false);
  const [resultRecord, setResultRecord] = useState<THSPApplicantRecord | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Refresh CAPTCHA
  const handleRefreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserCaptcha('');
  };

  // Quick fill sample data for instant demo
  const handleQuickFill = (applicant: THSPApplicantRecord) => {
    setSearchKey(applicant.rollNumber || applicant.applicationCode);
    setStudentName(applicant.studentName);
    setBirthDate(applicant.birthDate);
    setUserCaptcha(captchaCode);
  };

  // Perform search
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
      const matchKey = (a.rollNumber && a.rollNumber.toLowerCase() === key) ||
                       (a.applicationCode.toLowerCase() === key);
      const matchName = a.studentName.toLowerCase().includes(name);
      return matchKey || matchName;
    });

    if (found) {
      setResultRecord(found);
    } else {
      setResultRecord(null);
      setSearchError(`Không tìm thấy kết quả phù hợp với thông tin: "${searchKey}". Vui lòng kiểm tra lại Số báo danh hoặc Họ tên.`);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Search Filter Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-900 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-sky-800" />
            <span>Trình sinh trang tra cứu kết quả từ PDF Điểm chuẩn</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Tra Cứu Điểm Khảo Sát & Kết Quả Tuyển Sinh Lớp 6
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Hội đồng Tuyển sinh Trường Thực hành Sư phạm — Trường Đại học Vinh năm học 2026 - 2027
          </p>
        </div>

        {/* Quick Demo Selectors */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Mẫu demo nhanh:</span>
          {applicants.slice(0, 3).map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => handleQuickFill(a)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-sky-50 border border-slate-200 text-slate-700 hover:text-sky-900 font-medium transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>{a.studentName}</span>
              <span className="text-[10px] text-slate-400 font-mono">({a.rollNumber})</span>
              {a.admissionStatus === 'ADMITTED' && (
                <span className="text-[10px] text-emerald-600 font-bold">✓ Đỗ</span>
              )}
              {a.admissionStatus === 'WAITLIST' && (
                <span className="text-[10px] text-amber-600 font-bold">Dự khuyết</span>
              )}
            </button>
          ))}
        </div>

        {/* Form Search */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Số báo danh (SBD) hoặc Mã hồ sơ *</label>
            <input
              type="text"
              required
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Vd: THSP-06-0128"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono uppercase font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Họ và tên thí sinh *</label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Vd: Lê Minh Anh"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Ngày sinh thí sinh *</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono uppercase tracking-widest text-center font-bold"
              />
              <div 
                onClick={handleRefreshCaptcha}
                title="Bấm để đổi mã mới"
                className="px-3 py-2.5 bg-slate-900 text-amber-400 font-mono font-extrabold text-sm tracking-widest rounded-xl select-none cursor-pointer border border-slate-700 shrink-0"
              >
                {captchaCode}
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-sky-900 hover:bg-sky-800 text-white font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer text-xs"
            >
              <Search className="w-4 h-4" />
              <span>Tra Cứu Kết Quả Ngay</span>
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

      {/* Search Results Presentation */}
      {searched && resultRecord && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Status Header Banner */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            resultRecord.admissionStatus === 'ADMITTED'
              ? 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white border-emerald-600/50'
              : resultRecord.admissionStatus === 'WAITLIST'
              ? 'bg-gradient-to-r from-amber-950 via-amber-900 to-slate-900 text-white border-amber-600/50'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            <div className="space-y-1">
              <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                resultRecord.admissionStatus === 'ADMITTED'
                  ? 'bg-emerald-400 text-slate-950'
                  : 'bg-amber-400 text-slate-950'
              }`}>
                {resultRecord.admissionStatus === 'ADMITTED' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ĐỦ ĐIỀU KIỆN TRÚNG TUYỂN ĐỢT 1</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5" />
                    <span>DỰ KHUYẾT THỨ HẠNG #{resultRecord.waitlistRank || 1}</span>
                  </>
                )}
              </span>

              <h4 className="text-2xl font-extrabold text-white mt-1">
                Thí sinh: {resultRecord.studentName}
              </h4>
              <p className="text-xs text-slate-300">
                SBD: <strong className="font-mono text-amber-300">{resultRecord.rollNumber}</strong> · Mã hồ sơ: <strong className="font-mono text-sky-200">{resultRecord.applicationCode}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {resultRecord.admissionStatus === 'ADMITTED' && (
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

          {/* Electronic Certificate of Admission Modal / Accordion */}
          {showCertificate && resultRecord.admissionStatus === 'ADMITTED' && (
            <div className="bg-white rounded-3xl border-4 border-double border-amber-300 p-8 sm:p-12 shadow-xl space-y-6 relative overflow-hidden">
              <div className="text-center space-y-2 border-b border-slate-200 pb-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC VINH
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-sky-950">
                  GIẤY BÁO KẾT QUẢ KHẢO SÁT VÀ NHẬP HỌC ĐIỆN TỬ
                </h3>
                <p className="text-xs text-slate-600">
                  Năm học 2026 - 2027 · Trường Thực hành Sư phạm
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <p>
                  Hội đồng Tuyển sinh Trường Thực hành Sư phạm — Trường Đại học Vinh trân trọng thông báo thí sinh:
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                  <div>Họ và tên: <strong className="text-sky-950 uppercase">{resultRecord.studentName}</strong></div>
                  <div>Giới tính: <strong>{resultRecord.gender}</strong></div>
                  <div>Ngày sinh: <strong>{resultRecord.birthDate}</strong></div>
                  <div>Số báo danh: <strong className="font-mono">{resultRecord.rollNumber}</strong></div>
                  <div>Lớp dự tuyển: <strong>{resultRecord.targetGradeName}</strong></div>
                  <div>Cơ sở học tập: <strong>{resultRecord.campusPreference}</strong></div>
                </div>

                <div className="space-y-1">
                  <p>
                    Đã hoàn thành kỳ khảo sát năng lực ngày 15/06/2026 với kết quả: <strong>{resultRecord.examScores?.totalScore} điểm</strong> (Điểm chuẩn đợt 1: <strong>{resultRecord.examScores?.standardCutoff} điểm</strong>).
                  </p>
                  <p className="font-extrabold text-emerald-800">
                    KẾT LUẬN: ĐỦ ĐIỀU KIỆN TRÚNG TUYỂN VÀO LỚP 6 TRƯỜNG THSP NĂM HỌC 2026 - 2027.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1 text-amber-950">
                  <strong>Thủ tục và thời gian nhập học:</strong>
                  <p>Thời gian: Từ 08h00 ngày 23/06/2026 đến 17h00 ngày 28/06/2026.</p>
                  <p>Địa điểm: Văn phòng Trường Thực hành Sư phạm (Tầng 1, Nhà A, Số 182 Lê Duẩn, TP. Vinh).</p>
                  <p>Hồ sơ mang theo: Bản chính Giấy khai sinh, Học bạ tiểu học bản chính, Bản in Giấy báo điện tử này.</p>
                </div>
              </div>

              {/* Signature block */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-[11px] font-mono text-slate-400">Mã xác thực số: {resultRecord.applicationCode}</div>
                  <div className="text-[10px] text-emerald-700 font-bold">✓ Ký số bởi Trường Đại học Vinh</div>
                </div>

                <div className="text-center">
                  <div className="font-bold text-slate-900">CHỦ TỊCH HỘI ĐỒNG TUYỂN SINH</div>
                  <div className="text-sky-900 font-serif italic text-sm mt-4">TS. Phan Xuân Phồn</div>
                  <div className="text-[11px] text-slate-500">Hiệu trưởng Trường Thực hành Sư phạm</div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In Giấy Báo Trúng Tuyển</span>
                </button>
              </div>
            </div>
          )}

          {/* Exam Score Breakdown Table */}
          {resultRecord.examScores && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h5 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-800" />
                <span>Bảng Điểm Khảo Sát Năng Lực Thành Phần</span>
              </h5>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Môn Khảo Sát</th>
                      <th className="p-3 text-center">Điểm Đạt Được</th>
                      <th className="p-3 text-center">Điểm Sàn Quy Định</th>
                      <th className="p-3 text-center">Đánh Giá Sàn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Môn Toán (60 phút)</td>
                      <td className="p-3 text-center font-mono font-bold text-sky-900 text-sm">
                        {resultRecord.examScores.math.toFixed(2)}
                      </td>
                      <td className="p-3 text-center text-slate-500">Không quy định</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">✓ Đạt</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Môn Tiếng Việt (60 phút)</td>
                      <td className="p-3 text-center font-mono font-bold text-sky-900 text-sm">
                        {resultRecord.examScores.vietnamese.toFixed(2)}
                      </td>
                      <td className="p-3 text-center text-slate-500">Không quy định</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">✓ Đạt</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Môn Tiếng Anh (45 phút)</td>
                      <td className="p-3 text-center font-mono font-bold text-sky-900 text-sm">
                        {resultRecord.examScores.english.toFixed(2)}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-slate-700">≥ 5.00 điểm</td>
                      <td className="p-3 text-center font-bold">
                        {resultRecord.examScores.english >= 5.0 ? (
                          <span className="text-emerald-700">✓ Đạt ngưỡng sàn</span>
                        ) : (
                          <span className="text-red-600">✕ Dưới điểm sàn</span>
                        )}
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-800">Điểm Ưu Tiên (HSG / Con CBVC)</td>
                      <td className="p-3 text-center font-mono font-bold text-amber-700 text-sm">
                        +{resultRecord.examScores.priorityBonus.toFixed(2)}
                      </td>
                      <td className="p-3 text-center text-slate-400">—</td>
                      <td className="p-3 text-center text-slate-500">Cộng hợp lệ</td>
                    </tr>
                    <tr className="bg-sky-50 font-bold text-sky-950">
                      <td className="p-3 text-sm">TỔNG ĐIỂM XÉT TUYỂN</td>
                      <td className="p-3 text-center font-mono font-extrabold text-base text-sky-950">
                        {resultRecord.examScores.totalScore.toFixed(2)}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-emerald-800">
                        Điểm chuẩn: {resultRecord.examScores.standardCutoff.toFixed(2)}
                      </td>
                      <td className="p-3 text-center font-extrabold">
                        {resultRecord.examScores.totalScore >= resultRecord.examScores.standardCutoff ? (
                          <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">TRÚNG TUYỂN</span>
                        ) : (
                          <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded">DỰ KHUYẾT</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
