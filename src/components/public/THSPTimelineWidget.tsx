import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle, Sparkles, CheckCircle2, ChevronRight, Bell } from 'lucide-react';
import { initialTHSPTimelines } from '../../data/thspMockData';
import { THSPTimelineItem } from '../../types/thsp';

interface THSPTimelineWidgetProps {
  timelines?: THSPTimelineItem[];
  deadlineDate?: string; // ISO string e.g. 2026-06-10T17:00:00
}

export const THSPTimelineWidget: React.FC<THSPTimelineWidgetProps> = ({
  timelines = initialTHSPTimelines,
  deadlineDate = '2026-06-10T17:00:00'
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  // Live countdown calculation
  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(deadlineDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [deadlineDate]);

  return (
    <div className="space-y-6">
      
      {/* Real-time Countdown Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-sky-800/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Đồng hồ đếm ngược tuyển sinh 2026 - 2027</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Thời Hạn Đóng Cổng Tiếp Nhận Hồ Sơ Trực Tuyến
            </h3>
            <p className="text-xs sm:text-sm text-sky-200">
              Được gia hạn theo <strong>Thông báo số 02/TB-THSP</strong> (Hạn chót: 17h00 ngày 10/06/2026)
            </p>
          </div>

          {/* Countdown Boxes */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {[
              { label: 'Ngày', value: timeLeft.days },
              { label: 'Giờ', value: timeLeft.hours },
              { label: 'Phút', value: timeLeft.minutes },
              { label: 'Giây', value: timeLeft.seconds }
            ].map((unit, idx) => (
              <div 
                key={idx}
                className="bg-slate-950/80 border border-sky-500/40 rounded-xl p-3 sm:p-4 text-center min-w-[64px] sm:min-w-[80px] shadow-inner"
              >
                <div className="text-2xl sm:text-4xl font-extrabold font-mono text-amber-400">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Exam Notice Note (Bút chì 2B, CCCD, Thẻ học sinh) */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-xl shadow-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-amber-950">
          <p className="font-extrabold text-amber-900">
            LƯU Ý ĐẶC BIỆT KHI THAM GIA KHẢO SÁT NĂNG LỰC (LỚP 6):
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
            <li>Thí sinh phải có mặt tại phòng thi trước giờ làm bài <strong>30 phút</strong> để làm thủ tục.</li>
            <li>Bắt buộc mang theo: <strong>Bản sao Giấy khai sinh</strong> hoặc <strong>Căn cước công dân / Thẻ học sinh</strong> kèm Mã dự thi điện tử.</li>
            <li>Chuẩn bị bút viết mực xanh/đen, bút chì 2B, tẩy để làm bài trắc nghiệm khảo sát năng lực Tiếng Anh và Toán.</li>
            <li>Nghiêm cấm mang điện thoại di động, máy tính bỏ túi có chức năng soạn thảo văn bản vào phòng thi.</li>
          </ul>
        </div>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Lộ trình chi tiết
            </span>
            <h4 className="text-lg font-extrabold text-slate-900">
              Tiến Độ Tuyển Sinh Các Đợt Năm Học 2026 - 2027
            </h4>
          </div>
          <span className="text-xs font-mono bg-sky-100 text-sky-900 font-bold px-2.5 py-1 rounded-lg">
            5 GIAI ĐOẠN
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {timelines.map((item, index) => {
            const isCurrent = item.status === 'current';
            const isPast = item.status === 'past';

            return (
              <div key={item.id} className="relative group">
                {/* Timeline bullet */}
                <div className={`absolute -left-[30px] sm:-left-[37px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ring-4 ring-white transition-all ${
                  isCurrent 
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-amber-100 animate-pulse' 
                    : isPast 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {isPast ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                </div>

                {/* Content Box */}
                <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  isCurrent 
                    ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-500/20 shadow-xs' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 w-fit">
                      {item.dateRange}
                    </span>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                        Đang diễn ra (Hạn nộp hồ sơ)
                      </span>
                    )}
                  </div>

                  <h5 className="font-extrabold text-base text-slate-900 group-hover:text-sky-900 transition-colors">
                    {item.title}
                  </h5>

                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
