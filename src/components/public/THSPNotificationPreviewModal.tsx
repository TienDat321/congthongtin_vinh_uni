import React, { useState } from 'react';
import { Mail, MessageSquare, X, CheckCircle2, Copy, Check, ExternalLink, Printer } from 'lucide-react';
import { THSPApplicantRecord } from '../../types/thsp';

interface THSPNotificationPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: THSPApplicantRecord;
}

export const THSPNotificationPreviewModal: React.FC<THSPNotificationPreviewModalProps> = ({
  isOpen,
  onClose,
  applicant
}) => {
  const [activeChannel, setActiveChannel] = useState<'email' | 'sms'>('email');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(applicant.applicationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Phản hồi Tự động đa kênh
              </span>
              <h3 className="font-extrabold text-base text-white">
                Mô Phỏng Thông Báo Xác Nhận Gửi Phụ Huynh
              </h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Switcher */}
        <div className="bg-slate-100 p-2 flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveChannel('email')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeChannel === 'email' 
                ? 'bg-white text-sky-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4 text-sky-600" />
            <span>Email Xác nhận HTML (Gửi tới {applicant.parentEmail || 'phuhuynh@email.com'})</span>
          </button>

          <button
            onClick={() => setActiveChannel('sms')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeChannel === 'sms' 
                ? 'bg-white text-sky-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Tin nhắn SMS BrandName [TRUONG-THSP]</span>
          </button>
        </div>

        {/* Body Preview */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50">
          
          {activeChannel === 'email' ? (
            /* EMAIL HTML PREVIEW */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 text-slate-800 font-sans text-xs">
              
              {/* Email Branding */}
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-sky-950 uppercase">
                    TRƯỜNG THỰC HÀNH SƯ PHẠM — ĐẠI HỌC VINH
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Hệ thống Tuyển sinh Thông minh VinhUni Admissions
                  </p>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  ✓ Giao dịch VietQR thành công
                </span>
              </div>

              {/* Salutation */}
              <div className="space-y-2 text-slate-700 leading-relaxed">
                <p>Kính gửi Quý Phụ huynh <strong>{applicant.parentName || 'Phụ huynh'}</strong>,</p>
                <p>
                  Hội đồng Tuyển sinh Trường Thực hành Sư phạm (Trường Đại học Vinh) xin trân trọng thông báo: Hồ sơ đăng ký tuyển sinh của học sinh <strong>{applicant.studentName}</strong> đã được tiếp nhận và xác thực thanh toán lệ phí thành công.
                </p>
              </div>

              {/* Application Snapshot Card */}
              <div className="bg-sky-50/80 rounded-xl p-4 border border-sky-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Mã hồ sơ tra cứu:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-extrabold text-sky-900 text-sm bg-white px-2 py-0.5 rounded border border-sky-300">
                      {applicant.applicationCode}
                    </span>
                    <button 
                      onClick={handleCopyCode}
                      className="p-1 text-slate-500 hover:text-sky-900"
                      title="Sao chép mã"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Khối lớp dự tuyển:</span>
                  <strong className="text-slate-900">{applicant.targetGradeName}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Ngày sinh học sinh:</span>
                  <strong className="text-slate-900">{applicant.birthDate}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Cơ sở đăng ký:</span>
                  <strong className="text-slate-900">{applicant.campusPreference}</strong>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-sky-200/80">
                  <span className="text-slate-600 font-medium">Lệ phí tuyển sinh:</span>
                  <span className="font-bold text-emerald-700">
                    {applicant.feeAmount.toLocaleString('vi-VN')} VNĐ (Đã thanh toán qua VietQR)
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2 text-slate-600">
                <h5 className="font-bold text-slate-900">Các bước tiếp theo phụ huynh cần lưu ý:</h5>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Lưu lại Mã hồ sơ <strong>{applicant.applicationCode}</strong> để tra cứu số báo danh phòng thi và kết quả điểm thi.</li>
                  <li>Kỳ khảo sát năng lực Lớp 6 diễn ra vào sáng ngày <strong>15/06/2026</strong> tại Nhà A - Trường THSP (182 Lê Duẩn, TP. Vinh).</li>
                  <li>Nếu cần giải đáp thắc mắc, vui lòng liên hệ Hotline tuyển sinh: <strong>(0238) 3855.452</strong>.</li>
                </ol>
              </div>

              <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-400 text-center">
                Email này được hệ thống gửi tự động từ máy chủ Tuyển sinh Trường Đại học Vinh. Quý phụ huynh vui lòng không trả lời trực tiếp email này.
              </div>

            </div>
          ) : (
            /* SMS BRANDNAME PREVIEW */
            <div className="max-w-sm mx-auto bg-slate-900 rounded-3xl p-4 shadow-xl border-4 border-slate-800 space-y-3">
              <div className="text-center text-[10px] text-slate-400 font-mono">
                BrandName: <strong className="text-white">TRUONG-THSP</strong>
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 text-white text-xs leading-relaxed space-y-2 shadow-inner">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>XAC NHAN HO SO TUYEN SINH</span>
                </div>
                <p>
                  Truong THSP - DH Vinh da tiep nhan ho so cua hoc sinh {applicant.studentName} ({applicant.targetGradeName}). Ma ho so: {applicant.applicationCode}. Da thu le phi 300.000d.
                </p>
                <p className="text-slate-300 text-[11px]">
                  Lich khao sat: 15/06/2026. Tra cuu tai: tuyensinh.vinhuni.edu.vn/thsp. Hotline: 02383855452.
                </p>
              </div>

              <div className="text-center text-[10px] text-slate-500">
                Tin nhắn SMS tự động bởi Cổng Tuyển sinh VinhUni
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-white p-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Trạng thái gửi: <strong className="text-emerald-700">Đã kích hoạt tự động sau khi đối soát VietQR</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Đóng màn hình
          </button>
        </div>

      </div>
    </div>
  );
};
