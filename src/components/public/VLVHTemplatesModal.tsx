import React, { useState } from 'react';
import { FileText, Printer, Download, X, Check, Copy } from 'lucide-react';

interface VLVHTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'phieu-dang-ky' | 'xac-nhan-cong-tac';
}

export const VLVHTemplatesModal: React.FC<VLVHTemplatesModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'phieu-dang-ky'
}) => {
  const [activeTab, setActiveTab] = useState<'phieu-dang-ky' | 'xac-nhan-cong-tac'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Mẫu văn bản theo Thông báo 07/TB-ĐHV
              </span>
              <h3 className="font-extrabold text-base text-white">
                Mẫu Hồ Sơ Tuyển Sinh Vừa Làm Vừa Học Năm 2026
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In Mẫu</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="bg-slate-100 p-2 flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('phieu-dang-ky')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'phieu-dang-ky' 
                ? 'bg-white text-sky-950 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Mẫu 1: Phiếu Đăng Ký Tuyển Sinh VLVH</span>
          </button>

          <button
            onClick={() => setActiveTab('xac-nhan-cong-tac')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'xac-nhan-cong-tac' 
                ? 'bg-white text-sky-950 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Mẫu 2: Giấy Xác Nhận Công Tác</span>
          </button>
        </div>

        {/* Printable Template View */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-slate-50 text-slate-900 font-serif leading-relaxed text-xs sm:text-sm">
          
          {activeTab === 'phieu-dang-ky' ? (
            /* TEMPLATE 1: PHIẾU ĐĂNG KÝ TUYỂN SINH */
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
              
              <div className="flex justify-between items-start">
                <div className="border border-slate-300 w-28 h-36 flex flex-col items-center justify-center text-[10px] text-center p-2 text-slate-500 font-sans">
                  <span>Ảnh 3×4</span>
                  <span className="text-[9px] mt-1">có dấu của cơ quan xác nhận hồ sơ</span>
                </div>

                <div className="text-center space-y-1 flex-1 pl-4">
                  <div className="font-bold text-xs uppercase font-sans">
                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                  </div>
                  <div className="text-xs font-sans font-semibold">
                    Độc lập - Tự do - Hạnh phúc
                  </div>
                  <div className="text-[10px] text-slate-400">—————————</div>
                </div>
              </div>

              <div className="text-center space-y-1 pt-2">
                <h4 className="font-extrabold text-base sm:text-lg uppercase text-slate-900 font-sans">
                  PHIẾU ĐĂNG KÝ TUYỂN SINH
                </h4>
                <p className="font-bold text-xs font-sans text-sky-900">
                  Đào tạo trình độ Đại học hình thức Vừa làm vừa học năm 2026
                </p>
                <p className="text-xs italic text-slate-600">
                  Kính gửi: Hội đồng Tuyển sinh Trường Đại học Vinh
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-4 text-xs font-sans">
                <div className="grid grid-cols-1 gap-2">
                  <p>Tôi tên là: ............................................................................................................................................</p>
                  <p>Số điện thoại: .................................................... Email: ......................................................................</p>
                  <p>Địa chỉ báo tin: ......................................................................................................................................</p>
                  <p>Đăng ký dự tuyển vào ngành: ....................................................................................................................</p>
                  <p>Đối tượng tuyển sinh (đã có bằng tốt nghiệp): .....................................................................................</p>
                </div>

                <div className="pt-3">
                  <div className="font-bold text-slate-900 uppercase">I. SƠ YẾU LÝ LỊCH</div>
                  <div className="space-y-1.5 mt-2 pl-2">
                    <p>1. Họ và tên khai sinh: ......................................................... Giới tính: ...........................................</p>
                    <p>2. Ngày sinh: ...... / ...... / .......... Nơi sinh (tỉnh, TP): ..........................................................................</p>
                    <p>3. Số CMND/CCCD: ......................................... Ngày cấp: ....../....../........ Nơi cấp: ...............................</p>
                    <p>4. Hộ khẩu thường trú: ..........................................................................................................................</p>
                    <p>5. Đơn vị công tác: ................................................................................................................................</p>
                    <p>6. Đã tốt nghiệp: [ ] THPT &nbsp;&nbsp; [ ] Bổ túc THPT &nbsp;&nbsp; [ ] TCCN &nbsp;&nbsp; [ ] Cao đẳng &nbsp;&nbsp; [ ] Đại học</p>
                    <p>7. Ngành tốt nghiệp: ............................................... Năm tốt nghiệp: ........... Trường: .............................</p>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="font-bold text-slate-900 uppercase">II. HỒ SƠ KÈM THEO GỒM CÓ</div>
                  <ul className="list-disc list-inside space-y-1 mt-1 pl-2 text-slate-700">
                    <li>Giấy khai sinh (bản sao hoặc bản phô tô có công chứng)</li>
                    <li>Bằng tốt nghiệp THPT, Trung cấp/Cao đẳng/Đại học (bản sao có công chứng)</li>
                    <li>Bảng điểm toàn khóa tương ứng (bản sao có công chứng)</li>
                    <li>Căn cước công dân (phô tô 2 mặt trên tờ giấy A4)</li>
                    <li>Ảnh màu 3x4 (02 cái) và Giấy xác nhận công tác (nếu có)</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-bold uppercase text-[11px]">Xác nhận của Cơ quan / Địa phương</div>
                    <div className="text-[10px] text-slate-500 italic mt-8">(Ký tên và đóng dấu)</div>
                  </div>
                  <div>
                    <div className="text-[11px] italic">Ngày ...... tháng ...... năm 2026</div>
                    <div className="font-bold uppercase text-[11px]">Người làm đơn</div>
                    <div className="text-[10px] text-slate-500 italic mt-8">(Ký và ghi rõ họ tên)</div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* TEMPLATE 2: GIẤY XÁC NHẬN CÔNG TÁC */
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto space-y-6">
              
              <div className="text-center space-y-1">
                <div className="font-bold text-xs uppercase font-sans">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </div>
                <div className="text-xs font-sans font-semibold">
                  Độc lập - Tự do - Hạnh phúc
                </div>
                <div className="text-[10px] text-slate-400">—————————</div>
              </div>

              <div className="text-center space-y-1 pt-2">
                <h4 className="font-extrabold text-base sm:text-lg uppercase text-slate-900 font-sans">
                  GIẤY XÁC NHẬN CÔNG TÁC
                </h4>
                <p className="text-xs italic text-slate-600">
                  Kính gửi: Trường Đại học Vinh / Đơn vị công tác
                </p>
              </div>

              <div className="space-y-3 border-t border-slate-200 pt-4 text-xs font-sans">
                <p>Họ và tên: .............................................................................................................................................</p>
                <p>Ngày sinh: ...... / ...... / .......... Giới tính: ..............................................................................................</p>
                <p>Số CCCD: ......................................... Ngày cấp: ....../....../........ Nơi cấp: ................................................</p>
                <p>Địa chỉ: .................................................................................................................................................</p>
                <p>Đã tốt nghiệp trình độ: ......................................... Ngành tốt nghiệp: ......................................................</p>
                <p>Thời gian tốt nghiệp: ..............................................................................................................................</p>
                <p>Vị trí công tác hiện tại: ...........................................................................................................................</p>
                <p>Đơn vị công tác: ...................................................................................................................................</p>
                <p>Thời gian bắt đầu công tác: từ ngày ...... tháng ...... năm .......... đến nay.</p>
                <p>Lý do xác nhận công tác: <strong>Bổ sung hồ sơ tuyển sinh đại học hình thức Vừa làm vừa học</strong>.</p>
                <p className="italic text-slate-600">Tôi xin cam đoan những lời khai trên là chính xác, nếu có gì sai trái tôi xin chịu mọi trách nhiệm trước pháp luật.</p>

                <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-bold uppercase text-[11px]">Xác nhận của Cơ quan / Đơn vị</div>
                    <div className="text-[10px] text-slate-500 italic mt-12">(Ký, ghi rõ họ tên, chức vụ và đóng dấu)</div>
                  </div>
                  <div>
                    <div className="text-[11px] italic">Ngày ...... tháng ...... năm 2026</div>
                    <div className="font-bold uppercase text-[11px]">Người làm đơn</div>
                    <div className="text-[10px] text-slate-500 italic mt-12">(Ký và ghi rõ họ tên)</div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-white p-4 border-t border-slate-200 flex items-center justify-between text-xs font-sans">
          <span className="text-slate-500">
            Nguồn: Ban hành kèm Thông báo số 07/TB-ĐHV (Trường Đại học Vinh)
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
