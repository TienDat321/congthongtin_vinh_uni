import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Vinh University Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm">
              <div className="w-8 h-8 rounded bg-sky-800 flex items-center justify-center text-amber-300">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span>TRƯỜNG ĐẠI HỌC VINH — CỔNG TUYỂN SINH</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              Cơ sở giáo dục đại học đào tạo đa ngành, đa lĩnh vực trọng điểm quốc gia, thành viên Mạng lưới các trường đại học Đông Nam Á (AUN-QA). Hệ thống quản lý thông tin tuyển sinh có cấu trúc đảm bảo tính chính xác, minh bạch và tức thời.
            </p>
            <div className="space-y-1.5 pt-2 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>182 Lê Duẩn, Phường Bến Thủy, Thành phố Vinh, Tỉnh Nghệ An</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Hotline Tuyển sinh: (0238) 3855.452 — 0915.228.228</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Email: tuyensinh@vinhuni.edu.vn</span>
              </div>
            </div>
          </div>

          {/* Col 2: Channels */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Các Bậc Đào Tạo
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">Đại học chính quy 2026</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Đào tạo Sau đại học (ThS, TS)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Vừa làm vừa học & Văn bằng 2</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Đào tạo từ xa E-Learning</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Trường THPT Chuyên ĐHV</span></li>
            </ul>
          </div>

          {/* Col 3: System Philosophy */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Triết Lý Nền Tảng
            </h4>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="flex items-center gap-1.5 text-sky-300 font-semibold text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Structured Knowledge Base</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Văn bản hành chính là nguồn đầu vào có cấu trúc. AI đề xuất thay đổi kèm bằng chứng trích dẫn. Người quản lý phê duyệt trước khi công bố.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Trường Đại học Vinh (Vinh University). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Quy chế tuyển sinh</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Cam kết chất lượng</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Chính sách bảo mật</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
