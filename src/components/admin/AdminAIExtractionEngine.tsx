import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  Eye, 
  Save, 
  GitCompare, 
  Layers, 
  Clock, 
  DollarSign, 
  CreditCard, 
  Check, 
  Edit3,
  School,
  Lock,
  Unlock,
  Radio,
  ExternalLink,
  Globe
} from 'lucide-react';
import { useAdmission } from '../../context/AdmissionContext';
import { initialTHSPDocuments, initialTHSPQuotas } from '../../data/thspMockData';
import { THSPExtractedDocument } from '../../types/thsp';

export const AdminAIExtractionEngine: React.FC = () => {
  const { setActivePortal, setActiveChannel, showToast } = useAdmission();

  // Selected sample document for AI extraction
  const [selectedDocKey, setSelectedDocKey] = useState<string>('Thong_bao_Tuyen_sinh_Sinh_vien_Quoc_te_2026.pdf');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [extractionProgress, setExtractionProgress] = useState<number>(100);
  const [currentStage, setCurrentStage] = useState<string>('Đã trích xuất & cấu trúc hóa hoàn tất');
  
  // Human-in-the-loop editable fields
  const [docOfficialNumber, setDocOfficialNumber] = useState('TB-ĐHV/HTQT-2026');
  const [docType, setDocType] = useState<'ADMISSION_NOTICE' | 'REPLACEMENT_NOTICE' | 'EXAM_RESULT'>('ADMISSION_NOTICE');
  const [replacesDocNumber, setReplacesDocNumber] = useState('');
  const [grade6Quota, setGrade6Quota] = useState(210);
  const [grade1Quota, setGrade1Quota] = useState(180);
  const [gradeMNQuota, setGradeMNQuota] = useState(120);
  const [vlvhTotalQuota, setVlvhTotalQuota] = useState(2400);
  const [vlvhTeacherQuota, setVlvhTeacherQuota] = useState(1200);
  const [vlvhOtherQuota, setVlvhOtherQuota] = useState(1200);
  const [vlvhScheduleType, setVlvhScheduleType] = useState('Thứ 7, Chủ nhật & tập trung hè');
  
  // International Admission fields from official notice
  const [intlUgMajorsCount, setIntlUgMajorsCount] = useState(54);
  const [intlMasterMajorsCount, setIntlMasterMajorsCount] = useState(36);
  const [intlDocMajorsCount, setIntlDocMajorsCount] = useState(16);
  const [intlUgTuitionUsd, setIntlUgTuitionUsd] = useState(500);
  const [intlDormFeeUsd, setIntlDormFeeUsd] = useState(10);
  const [intlInsuranceUsd, setIntlInsuranceUsd] = useState(25);
  const [intlPrepTuitionUsd, setIntlPrepTuitionUsd] = useState(400);

  // Sau đại học (ThS & TS) fields from official notices (TB 136, TB 39, QĐ 2246)
  const [sdhMasterMajorsCount, setSdhMasterMajorsCount] = useState(30);
  const [sdhDoctoralMajorsCount, setSdhDoctoralMajorsCount] = useState(12);
  const [sdhRoundName, setSdhRoundName] = useState('Đợt 2 - Năm 2026');
  const [sdhMasterFee, setSdhMasterFee] = useState(600000);
  const [sdhDoctoralFee, setSdhDoctoralFee] = useState(1000000);
  const [sdhLanguageStandard, setSdhLanguageStandard] = useState('VSTEP Bậc 4 / IELTS 5.5 / B2');

  const [englishFloorScore, setEnglishFloorScore] = useState(5.0);
  const [applicationDeadline, setApplicationDeadline] = useState('2026-10-30T17:00:00');
  const [surveyExamDate, setSurveyExamDate] = useState('2026-06-15T07:00:00');
  const [registrationFee, setRegistrationFee] = useState(500000);
  const [lotteryRuleEnabled, setLotteryRuleEnabled] = useState(true);
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(true);

  // Trigger simulated AI Analysis
  const handleRunAIExtraction = (fileName: string) => {
    setSelectedDocKey(fileName);
    setIsProcessing(true);
    setExtractionProgress(10);
    setCurrentStage('1/4: Đọc OCR và phân loại loại văn bản hành chính...');

    setTimeout(() => {
      setExtractionProgress(35);
      setCurrentStage('2/4: Phân tách định danh văn bản & phát hiện quan hệ thay thế/liên kết...');
    }, 500);

    setTimeout(() => {
      setExtractionProgress(70);
      setCurrentStage('3/4: Trích xuất bộ thông số cốt lõi: Ngành, chỉ tiêu, biểu học phí, KTX, hồ sơ 13 mục...');
    }, 1100);

    setTimeout(() => {
      setExtractionProgress(100);
      setIsProcessing(false);
      setCurrentStage('4/4: Hoàn tất trích xuất! Chuyển sang màn hình Human-in-the-Loop Validation.');

      if (fileName.includes('NCS') || fileName.includes('136') || fileName.includes('Sau_dai_hoc') || fileName.includes('SDH')) {
        setDocOfficialNumber('136/TB-ĐHV');
        setDocType('ADMISSION_NOTICE');
        setReplacesDocNumber('');
        setRegistrationFee(600000);
        setApplicationDeadline('2026-11-15T17:00:00');
        setSdhMasterMajorsCount(30);
        setSdhDoctoralMajorsCount(12);
        setSdhRoundName('Đợt 2 - Năm 2026');
      } else if (fileName.includes('Quoc_te') || fileName.includes('HTQT')) {
        setDocOfficialNumber('TB-ĐHV/HTQT-2026');
        setDocType('ADMISSION_NOTICE');
        setReplacesDocNumber('');
        setRegistrationFee(500000);
        setApplicationDeadline('2026-10-30T17:00:00');
      } else if (fileName.includes('07')) {
        setDocOfficialNumber('07/TB-ĐHV');
        setDocType('ADMISSION_NOTICE');
        setReplacesDocNumber('');
        setRegistrationFee(500000);
        setApplicationDeadline('2026-12-31T17:00:00');
      } else if (fileName.includes('02')) {
        setDocOfficialNumber('02/TB-THSP');
        setDocType('REPLACEMENT_NOTICE');
        setReplacesDocNumber('52/TB-THSP');
        setGrade6Quota(210);
        setRegistrationFee(300000);
        setApplicationDeadline('2026-06-10T17:00:00');
      } else if (fileName.includes('52')) {
        setDocOfficialNumber('52/TB-THSP');
        setDocType('ADMISSION_NOTICE');
        setReplacesDocNumber('');
        setGrade6Quota(180);
        setRegistrationFee(300000);
        setApplicationDeadline('2026-05-25T17:00:00');
      } else if (fileName.includes('DiemThi')) {
        setDocOfficialNumber('88/TB-THSP-KQ');
        setDocType('EXAM_RESULT');
        setReplacesDocNumber('');
      }

      showToast(`AI Engine đã bóc tách dữ liệu thành công từ file: ${fileName}`, 'success');
    }, 1700);
  };

  // Publish & Generate UI Action
  const handlePublishAndGenerateUI = () => {
    if (selectedDocKey.includes('NCS') || selectedDocKey.includes('136') || selectedDocKey.includes('Sau_dai_hoc') || docOfficialNumber.includes('136') || docOfficialNumber.includes('SDH')) {
      setActiveChannel('sau-dai-hoc');
      showToast(
        `Đã phê duyệt và xuất bản đề án Sau đại học (Thạc sĩ & Tiến sĩ 2026)! Cổng Sau đại học đã được đồng bộ với 30 ngành ThS và 12 ngành TS.`,
        'success'
      );
    } else if (selectedDocKey.includes('Quoc_te') || docOfficialNumber.includes('HTQT')) {
      setActiveChannel('sinh-vien-quoc-te');
      showToast(
        `Đã phê duyệt và xuất bản đề án Tuyển sinh Lưu học sinh Lào & Quốc tế! Cổng Sinh viên Quốc tế đã được đồng bộ.`,
        'success'
      );
    } else if (docOfficialNumber.includes('07') || selectedDocKey.includes('07')) {
      setActiveChannel('vua-lam-vua-hoc');
      showToast(
        `Đã phê duyệt và xuất bản cấu trúc tuyển sinh VLVH từ ${docOfficialNumber}! Giao diện Vừa làm vừa học (Thông báo 07/TB-ĐHV) đã được đồng bộ.`,
        'success'
      );
    } else {
      setActiveChannel('thuc-hanh-su-pham');
      showToast(
        `Đã phê duyệt và xuất bản cấu trúc mới từ ${docOfficialNumber}! Giao diện Cổng Thực hành Sư phạm đã được đồng bộ.`,
        'success'
      );
    }
    // Switch to public portal and view the generated UI
    setActivePortal('public');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Title & Engine Status */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Nghiệp vụ 1: AI Extraction Engine & Human-in-the-Loop CMS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Động Cơ Trích Xuất & Phân Loại Dữ Liệu Tuyển Sinh Từ PDF
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Đọc hiểu văn bản hành chính, tự động phát hiện văn bản thay thế, trích xuất bộ thông số cốt lõi và sinh giao diện web tương tác.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePublishAndGenerateUI}
              className={`px-5 py-2.5 font-extrabold rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer whitespace-nowrap ${
                selectedDocKey.includes('NCS') || selectedDocKey.includes('136') || selectedDocKey.includes('Sau_dai_hoc') || docOfficialNumber.includes('136') || docOfficialNumber.includes('SDH')
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold'
                  : selectedDocKey.includes('Quoc_te') || docOfficialNumber.includes('HTQT')
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  : selectedDocKey.includes('07') || docOfficialNumber.includes('07')
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {selectedDocKey.includes('NCS') || selectedDocKey.includes('136') || selectedDocKey.includes('Sau_dai_hoc') || docOfficialNumber.includes('136') || docOfficialNumber.includes('SDH')
                  ? 'Xuất Bản & Sinh Giao Diện Web (Sau đại học)'
                  : selectedDocKey.includes('Quoc_te') || docOfficialNumber.includes('HTQT')
                  ? 'Xuất Bản & Sinh Giao Diện Web (Quốc tế / Lào)'
                  : selectedDocKey.includes('07') || docOfficialNumber.includes('07')
                  ? 'Xuất Bản & Sinh Giao Diện Web (VLVH)'
                  : 'Xuất Bản & Sinh Giao Diện Web (THSP)'}
              </span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">{currentStage}</span>
            <span className="font-mono font-bold text-amber-400">{extractionProgress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 to-amber-400 transition-all duration-300 rounded-full"
              style={{ width: `${extractionProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step 1: Select PDF Source Document */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Nguồn dữ liệu đầu vào
            </span>
            <h3 className="text-base font-extrabold text-slate-900">
              Chọn Tệp PDF Văn Bản Tuyển Sinh Cần Trích Xuất
            </h3>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">6 file mẫu văn bản chính thức của Trường</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            {
              file: 'ThongbaotuyenNCSdot3.pdf',
              title: 'TB Tuyển sinh Sau đại học (NCS & ThS)',
              tag: 'SAU ĐẠI HỌC 2026',
              tagColor: 'bg-amber-100 text-amber-950 border-amber-300',
              desc: 'Tuyển sinh NCS & Thạc sĩ: 30 ngành ThS, 12 ngành TS, Đề án 89, điểm chuẩn Đợt 1 & thu hồ sơ Đợt 2.'
            },
            {
              file: 'Thong_bao_Tuyen_sinh_Sinh_vien_Quoc_te_2026.pdf',
              title: 'TB Tuyển sinh Lưu học sinh Quốc tế',
              tag: 'QUỐC TẾ & LÀO 2026',
              tagColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
              desc: 'Tuyển sinh Lưu học sinh Lào & Quốc tế: 54 ngành ĐH (500$/năm), 36 ThS, 16 TS, Tiếng Việt 1 năm, KTX 10$/tháng.'
            },
            {
              file: 'Thong_bao_07_TB-DHV_VLVH.pdf',
              title: 'Thông báo 07/TB-ĐHV (VLVH 2026)',
              tag: 'VĂN BẢN VLVH',
              tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
              desc: 'Đại học Vừa làm vừa học: 16 ngành (8 SP, 8 khác), 2.400 chỉ tiêu, lệ phí 500k, học T7-CN/hè.'
            },
            {
              file: 'Thong_bao_02_TB-THSP_ThayThe.pdf',
              title: 'Thông báo 02/TB-THSP (Thay thế)',
              tag: 'VĂN BẢN THAY THẾ',
              tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
              desc: 'Tăng chỉ tiêu Lớp 6: 180 -> 210 HS. Gia hạn nộp hồ sơ đến 10/06/2026. Thay thế Thông báo 52.'
            },
            {
              file: 'Thong_bao_52_TB-THSP.pdf',
              title: 'Thông báo 52/TB-THSP (Gốc)',
              tag: 'VĂN BẢN GỐC',
              tagColor: 'bg-slate-100 text-slate-800 border-slate-300',
              desc: 'Kế hoạch tuyển sinh 4 cấp học ban đầu. Chỉ tiêu lớp 6 là 180 HS, hạn nộp 25/05/2026.'
            },
            {
              file: 'Thong_bao_DiemThi_KhaoSat_Lop6.pdf',
              title: 'Thông báo Điểm thi & Điểm sàn',
              tag: 'KẾT QUẢ / ĐIỂM SÀN',
              tagColor: 'bg-sky-100 text-sky-900 border-sky-300',
              desc: 'Thông báo kết quả khảo sát năng lực Lớp 6, điểm chuẩn trúng tuyển Đợt 1 (22.50 điểm).'
            }
          ].map((item) => (
            <div
              key={item.file}
              onClick={() => handleRunAIExtraction(item.file)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                selectedDocKey === item.file
                  ? 'border-sky-900 bg-sky-50/70 shadow-sm ring-2 ring-sky-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  {selectedDocKey === item.file && (
                    <span className="text-sky-900 font-bold text-xs flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Đang chọn</span>
                    </span>
                  )}
                </div>
                <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 text-[11px]">{item.file}</span>
                <span className="text-sky-800 font-bold hover:underline">Chạy trích xuất AI →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: Human-in-the-Loop Validation Interface (Split Screen) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Nghiệp vụ 3: Human-in-the-Loop Validation Dashboard</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Rà Soát, Kiểm Tra & Hiệu Chỉnh Tham Số Trước Khi Xuất Bản (Publish)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Đã lưu nháp cấu hình tham số thành công!', 'info')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu cấu hình nháp</span>
            </button>
            <button
              onClick={handlePublishAndGenerateUI}
              className="px-5 py-2 bg-sky-900 hover:bg-sky-800 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Phê Duyệt & Xuất Bản</span>
            </button>
          </div>
        </div>

        {/* 2 Columns: Left = Raw PDF Snippet Context, Right = Extracted Fields Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Raw PDF Evidence & Snippet View (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-800" />
                <span>Trích đoạn văn bản PDF gốc:</span>
              </span>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Trang 1 / 3
              </span>
            </div>

            {/* Document Viewer Simulation Card */}
            <div className="bg-slate-950 text-slate-200 rounded-2xl p-5 border border-slate-800 space-y-4 font-sans text-xs leading-relaxed shadow-inner">
              <div className="border-b border-slate-800 pb-3 text-center space-y-1">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">
                  {selectedDocKey.includes('NCS') || selectedDocKey.includes('136') || selectedDocKey.includes('Sau_dai_hoc') || docOfficialNumber.includes('136') || docOfficialNumber.includes('SDH')
                    ? 'TRƯỜNG ĐẠI HỌC VINH — HỘI ĐỒNG TUYỂN SINH SAU ĐẠI HỌC'
                    : selectedDocKey.includes('Quoc_te') || docOfficialNumber.includes('HTQT')
                    ? 'TRƯỜNG ĐẠI HỌC VINH — PHÒNG KHOA HỌC VÀ HỢP TÁC QUỐC TẾ'
                    : selectedDocKey.includes('07') || docOfficialNumber.includes('07')
                    ? 'TRƯỜNG ĐẠI HỌC VINH — TRUNG TÂM GIÁO DỤC THƯỜNG XUYÊN'
                    : 'TRƯỜNG ĐẠI HỌC VINH — TRƯỜNG THỰC HÀNH SƯ PHẠM'}
                </div>
                <div className="font-extrabold text-amber-400 text-sm">
                  {docOfficialNumber}
                </div>
                <div className="text-[11px] text-slate-300">
                  {selectedDocKey.includes('NCS') || selectedDocKey.includes('136') || selectedDocKey.includes('Sau_dai_hoc') || docOfficialNumber.includes('136') || docOfficialNumber.includes('SDH')
                    ? 'THÔNG BÁO TIẾP TỤC THU HỒ SƠ TUYỂN SINH ĐÀO TẠO TRÌNH ĐỘ TIẾN SĨ & THẠC SĨ ĐỢT 2 NĂM 2026'
                    : selectedDocKey.includes('Quoc_te') || docOfficialNumber.includes('HTQT')
                    ? 'THÔNG BÁO TUYỂN SINH SINH VIÊN QUỐC TẾ NĂM 2026 (LƯU HỌC SINH LÀO & QUỐC TẾ)'
                    : selectedDocKey.includes('07') || docOfficialNumber.includes('07')
                    ? 'THÔNG BÁO TUYỂN SINH ĐÀO TẠO TRÌNH ĐỘ ĐẠI HỌC HÌNH THỨC VỪA LÀM VỪA HỌC NĂM 2026'
                    : docType === 'REPLACEMENT_NOTICE' 
                    ? 'THÔNG BÁO VỀ VIỆC ĐIỀU CHỈNH CHỈ TIÊU VÀ THỜI GIAN TUYỂN SINH NĂM HỌC 2026 - 2027 (THAY THẾ THÔNG BÁO SỐ 52/TB-THSP)'
                    : 'THÔNG BÁO TUYỂN SINH CÁC CẤP HỌC NĂM HỌC 2026 - 2027'}
                </div>
              </div>

              {/* OCR Highlighted Snippets */}
              {selectedDocKey.includes('NCS') || selectedDocKey.includes('136') || selectedDocKey.includes('Sau_dai_hoc') || docOfficialNumber.includes('136') || docOfficialNumber.includes('SDH') ? (
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-3 bg-amber-950/80 rounded-xl border border-amber-700 text-amber-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục I & II. 30 Ngành Thạc sĩ & 12 Ngành Tiến sĩ]</span>
                    <p>
                      "Trường Đại học Vinh tiếp tục tuyển sinh đào tạo trình độ thạc sĩ <strong>30 ngành</strong> và đào tạo tiến sĩ <strong>12 chuyên ngành</strong> năm 2026 (Đợt 2). Thời gian đào tạo: Thạc sĩ từ 1.5 - 2 năm; Tiến sĩ 3 - 4 năm. Xét tuyển thẳng theo <strong>Đề án 89</strong> cho giảng viên đại học, cao đẳng."
                    </p>
                  </div>

                  <div className="p-3 bg-sky-950/80 rounded-xl border border-sky-700 text-sky-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục III & IV. Điều kiện Ngoại ngữ VSTEP Bậc 4 & Điểm chuẩn Đợt 1]</span>
                    <p>
                      "Yêu cầu năng lực ngoại ngữ: Tối thiểu đạt <strong>Bậc 4/6 (VSTEP B2)</strong>, IELTS 5.5, TOEFL iBT 46. Công bố kết quả xét tuyển Đợt 1 theo Quyết định số 2246/QĐ-ĐHV, mức điểm trúng tuyển từ 18.00 đến 25.50 điểm."
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-700 text-emerald-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục V & VI. Lệ phí xét tuyển & Thời hạn nhận hồ sơ Đợt 2]</span>
                    <p>
                      "Lệ phí xét tuyển Tiến sĩ: <strong>1.000.000 đồng/hồ sơ</strong>; Thạc sĩ: <strong>600.000 đồng/hồ sơ</strong> nộp trực tuyến qua VietQR Napas (BIDV ĐH Vinh). Hạn nhận hồ sơ Đợt 2: đến hết ngày <strong>15/11/2026</strong>."
                    </p>
                  </div>
                </div>
              ) : selectedDocKey.includes('Quoc_te') || docOfficialNumber.includes('HTQT') ? (
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-3 bg-indigo-950/80 rounded-xl border border-indigo-700 text-indigo-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục I & II. Quy mô đào tạo 3 bậc học & 54 ngành Đại học]</span>
                    <p>
                      "Trường Đại học Vinh thông báo tuyển sinh lưu học sinh quốc tế năm 2026 với <strong>54 ngành đào tạo trình độ đại học</strong>, <strong>36 chuyên ngành Thạc sĩ</strong> và <strong>16 chuyên ngành Tiến sĩ</strong>. Tiếp nhận các diện học bổng Hiệp định Chính phủ, diện hợp tác các tỉnh của Lào và diện tự túc kinh phí."
                    </p>
                  </div>

                  <div className="p-3 bg-sky-950/80 rounded-xl border border-sky-700 text-sky-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục III & IV. Khóa bồi dưỡng Tiếng Việt & Ký túc xá]</span>
                    <p>
                      "Thời gian đào tạo: Đại học 4 năm, Thạc sĩ 2 năm, Tiến sĩ 3 năm. Lưu học sinh chưa đạt năng lực tiếng Việt B2 được tham gia <strong>khóa bồi dưỡng tiếng Việt 01 năm</strong>. Ký túc xá sinh viên quốc tế khang trang, đầy đủ tiện nghi với mức phí ưu đãi <strong>10 USD/người/tháng</strong>."
                    </p>
                  </div>

                  <div className="p-3 bg-amber-950/80 rounded-xl border border-amber-700 text-amber-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục V & VI. Biểu học phí chuẩn quốc tế & Hồ sơ 13 mục]</span>
                    <p>
                      "Học phí hệ đại học: <strong>500 USD/năm</strong>. Bảo hiểm y tế: <strong>25 USD/năm</strong>. Hồ sơ đăng ký gồm 13 mục (Đơn xin học, hộ chiếu, học bạ dịch thuật công chứng, giấy khám sức khỏe). Hạn nhận hồ sơ đến 30/10/2026."
                    </p>
                  </div>
                </div>
              ) : selectedDocKey.includes('07') || docOfficialNumber.includes('07') ? (
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-700 text-emerald-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục I & II. 16 Ngành đào tạo & 2.400 chỉ tiêu]</span>
                    <p>
                      "Trường Đại học Vinh thông báo tuyển sinh đào tạo trình độ đại học hình thức vừa làm vừa học năm 2026 với <strong>16 ngành đào tạo</strong> (8 ngành sư phạm nâng chuẩn giáo viên và 8 ngành kinh tế, kỹ thuật, luật, ngôn ngữ). Tổng chỉ tiêu: <strong>2.400 học viên</strong>."
                    </p>
                  </div>

                  <div className="p-3 bg-sky-950/80 rounded-xl border border-sky-700 text-sky-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục III & IV. Hình thức tổ chức đào tạo & Học vượt]</span>
                    <p>
                      "Tổ chức dạy - học kết hợp trực tiếp và <strong>trực tuyến (E-learning)</strong>. Thời gian học vào <strong>thứ Bảy, Chủ nhật</strong> trong tuần hoặc tập trung dịp hè (đối với khối giáo viên). Người học có thể đăng ký <strong>học vượt</strong> để tốt nghiệp sớm."
                    </p>
                  </div>

                  <div className="p-3 bg-amber-950/80 rounded-xl border border-amber-700 text-amber-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục V. Lệ phí hồ sơ & Thanh toán VietQR 500k]</span>
                    <p>
                      "Lệ phí xét tuyển: <strong>500.000 đồng/hồ sơ</strong> nộp trực tuyến qua mã VietQR Napas chuyển khoản vào tài khoản BIDV của Trường Đại học Vinh. Nơi tiếp nhận hồ sơ: Trung tâm GDTX, Tầng 5 Nhà Điều hành."
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-3 bg-sky-950/80 rounded-xl border border-sky-700 text-sky-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục 1. Quan hệ văn bản thay thế]</span>
                    <p>
                      "Thông báo này thay thế cho Thông báo số 52/TB-THSP ban hành ngày 15/04/2026 về chỉ tiêu Khối THCS Lớp 6 và khung thời hạn nộp hồ sơ trực tuyến."
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-700 text-emerald-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục 2. Điều chỉnh chỉ tiêu & Lớp]</span>
                    <p>
                      "Điều chỉnh chỉ tiêu tuyển sinh Lớp 6 THCS Chất lượng cao từ 180 học sinh (05 lớp) lên <strong>210 học sinh (06 lớp)</strong> nhằm đáp ứng nhu cầu học tập của phụ huynh học sinh."
                    </p>
                  </div>

                  <div className="p-3 bg-amber-950/80 rounded-xl border border-amber-700 text-amber-200 space-y-1">
                    <span className="text-amber-400 font-bold block">[Mục 3. Thời gian & Lệ phí VietQR]</span>
                    <p>
                      "Thời gian nhận hồ sơ trực tuyến gia hạn đến hết <strong>17h00 ngày 10/06/2026</strong>. Lệ phí hồ sơ: 300.000 đồng/hồ sơ nộp qua mã VietQR chuyển khoản vào tài khoản BIDV của Trường."
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800 text-center">
                Mô hình AI Vision OCR đã xác thực độ tin cậy 99.4%
              </div>
            </div>
          </div>

          {/* RIGHT: Editable Form Fields (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-sky-800" />
              <span>Dữ liệu số hóa trích xuất (Quản trị viên có thể chỉnh sửa):</span>
            </span>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5 text-xs">
              
              {/* Group 1: Identity & Relationships */}
              <div className="space-y-3">
                <span className="font-extrabold text-slate-900 text-xs block text-sky-950">
                  A. Định Danh & Phân Loại Văn Bản
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Số hiệu văn bản *</label>
                    <input
                      type="text"
                      value={docOfficialNumber}
                      onChange={(e) => setDocOfficialNumber(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold bg-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Phân loại loại văn bản *</label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-bold bg-white focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="REPLACEMENT_NOTICE">Thông báo bổ sung / THAY THẾ</option>
                      <option value="ADMISSION_NOTICE">Thông báo tuyển sinh chính thức</option>
                      <option value="EXAM_RESULT">Thông báo điểm thi & Điểm chuẩn</option>
                    </select>
                  </div>

                  {docType === 'REPLACEMENT_NOTICE' && (
                    <div className="sm:col-span-2 space-y-1 bg-amber-100/70 p-3 rounded-xl border border-amber-300">
                      <label className="font-bold text-amber-950 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Văn bản bị thay thế (Hệ thống tự động gắn nhãn 'Đã cập nhật') *</span>
                      </label>
                      <input
                        type="text"
                        value={replacesDocNumber}
                        onChange={(e) => setReplacesDocNumber(e.target.value)}
                        placeholder="Vd: 52/TB-THSP"
                        className="w-full p-2 rounded-lg border border-amber-400 font-mono font-extrabold bg-white text-xs"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Group 2: Core Metrics (Quotas & Criteria) */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <span className="font-extrabold text-slate-900 text-xs block text-sky-950">
                  B. Bộ Thông Số Cốt Lõi Trích Xuất {
                    selectedDocKey.includes('NCS') || selectedDocKey.includes('136') || selectedDocKey.includes('Sau_dai_hoc') || docOfficialNumber.includes('136') || docOfficialNumber.includes('SDH')
                      ? '(Sau đại học: Thạc sĩ & Tiến sĩ)'
                      : selectedDocKey.includes('Quoc_te') || docOfficialNumber.includes('HTQT')
                      ? '(Sinh viên Quốc tế & Lào)'
                      : selectedDocKey.includes('07') || docOfficialNumber.includes('07')
                      ? '(Đại học VLVH)'
                      : '(Trường THSP)'
                  }
                </span>

                {selectedDocKey.includes('NCS') || selectedDocKey.includes('136') || selectedDocKey.includes('Sau_dai_hoc') || docOfficialNumber.includes('136') || docOfficialNumber.includes('SDH') ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Số ngành Thạc sĩ *</label>
                      <input
                        type="number"
                        value={sdhMasterMajorsCount}
                        onChange={(e) => setSdhMasterMajorsCount(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-amber-900 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Số ngành Tiến sĩ *</label>
                      <input
                        type="number"
                        value={sdhDoctoralMajorsCount}
                        onChange={(e) => setSdhDoctoralMajorsCount(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-amber-900 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Đợt tuyển sinh đang mở *</label>
                      <input
                        type="text"
                        value={sdhRoundName}
                        onChange={(e) => setSdhRoundName(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 font-bold bg-white text-slate-800 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Lệ phí xét tuyển Thạc sĩ (VNĐ)</label>
                      <input
                        type="number"
                        value={sdhMasterFee}
                        onChange={(e) => setSdhMasterFee(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-emerald-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Lệ phí xét tuyển Tiến sĩ (VNĐ)</label>
                      <input
                        type="number"
                        value={sdhDoctoralFee}
                        onChange={(e) => setSdhDoctoralFee(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-emerald-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Chuẩn Ngoại ngữ đầu vào</label>
                      <input
                        type="text"
                        value={sdhLanguageStandard}
                        onChange={(e) => setSdhLanguageStandard(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 font-bold bg-white text-slate-800 text-xs"
                      />
                    </div>
                  </div>
                ) : selectedDocKey.includes('Quoc_te') || docOfficialNumber.includes('HTQT') ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Số ngành Đại học *</label>
                      <input
                        type="number"
                        value={intlUgMajorsCount}
                        onChange={(e) => setIntlUgMajorsCount(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-indigo-900 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Số ngành Thạc sĩ *</label>
                      <input
                        type="number"
                        value={intlMasterMajorsCount}
                        onChange={(e) => setIntlMasterMajorsCount(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-indigo-900 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Số ngành Tiến sĩ *</label>
                      <input
                        type="number"
                        value={intlDocMajorsCount}
                        onChange={(e) => setIntlDocMajorsCount(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-indigo-900 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Học phí Đại học (USD/năm) *</label>
                      <input
                        type="number"
                        value={intlUgTuitionUsd}
                        onChange={(e) => setIntlUgTuitionUsd(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-emerald-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Phí Ký túc xá (USD/tháng) *</label>
                      <input
                        type="number"
                        value={intlDormFeeUsd}
                        onChange={(e) => setIntlDormFeeUsd(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-sky-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Bảo hiểm Y tế (USD/năm)</label>
                      <input
                        type="number"
                        value={intlInsuranceUsd}
                        onChange={(e) => setIntlInsuranceUsd(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-slate-800"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">Dự bị Tiếng Việt (USD/năm)</label>
                      <input
                        type="number"
                        value={intlPrepTuitionUsd}
                        onChange={(e) => setIntlPrepTuitionUsd(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Lệ phí hồ sơ (VNĐ)</label>
                      <input
                        type="number"
                        value={registrationFee}
                        onChange={(e) => setRegistrationFee(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-emerald-800"
                      />
                    </div>
                  </div>
                ) : selectedDocKey.includes('07') || docOfficialNumber.includes('07') ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Tổng chỉ tiêu 16 ngành *</label>
                      <input
                        type="number"
                        value={vlvhTotalQuota}
                        onChange={(e) => setVlvhTotalQuota(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-emerald-800 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Chỉ tiêu 8 ngành SP nâng chuẩn</label>
                      <input
                        type="number"
                        value={vlvhTeacherQuota}
                        onChange={(e) => setVlvhTeacherQuota(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Chỉ tiêu 8 ngành Kinh tế/Luật/CNTT</label>
                      <input
                        type="number"
                        value={vlvhOtherQuota}
                        onChange={(e) => setVlvhOtherQuota(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Lệ phí xét tuyển (VNĐ) *</label>
                      <input
                        type="number"
                        value={registrationFee}
                        onChange={(e) => setRegistrationFee(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-emerald-800"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">Thời gian & Hình thức học</label>
                      <input
                        type="text"
                        value={vlvhScheduleType}
                        onChange={(e) => setVlvhScheduleType(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 font-semibold bg-white text-slate-800"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Chỉ tiêu Lớp 6 (HS) *</label>
                      <input
                        type="number"
                        value={grade6Quota}
                        onChange={(e) => setGrade6Quota(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-emerald-700 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Chỉ tiêu Lớp 1 (HS)</label>
                      <input
                        type="number"
                        value={grade1Quota}
                        onChange={(e) => setGrade1Quota(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Chỉ tiêu Mầm non</label>
                      <input
                        type="number"
                        value={gradeMNQuota}
                        onChange={(e) => setGradeMNQuota(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Điểm sàn Tiếng Anh *</label>
                      <input
                        type="number"
                        step="0.5"
                        value={englishFloorScore}
                        onChange={(e) => setEnglishFloorScore(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-sky-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Lệ phí hồ sơ (VNĐ) *</label>
                      <input
                        type="number"
                        value={registrationFee}
                        onChange={(e) => setRegistrationFee(Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white text-emerald-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Quy định bốc thăm</label>
                      <select
                        value={lotteryRuleEnabled ? 'true' : 'false'}
                        onChange={(e) => setLotteryRuleEnabled(e.target.value === 'true')}
                        className="w-full p-2 rounded-lg border border-slate-300 font-bold bg-white"
                      >
                        <option value="true">Áp dụng khi vượt chỉ tiêu</option>
                        <option value="false">Không áp dụng</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Group 3: Timeline & Registration Form Gatekeeper */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <span className="font-extrabold text-slate-900 text-xs block text-sky-950">
                  C. Lịch Trình Tuyển Sinh & Đóng/Mở Form Tự Động
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Hạn chót nộp hồ sơ trực tuyến *</label>
                    <input
                      type="text"
                      value={applicationDeadline}
                      onChange={(e) => setApplicationDeadline(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-mono bg-white font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Ngày khảo sát năng lực (Lớp 6)</label>
                    <input
                      type="text"
                      value={surveyExamDate}
                      onChange={(e) => setSurveyExamDate(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-mono bg-white font-semibold"
                    />
                  </div>

                  <div className="sm:col-span-2 p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Trạng thái Cổng Đăng ký Trực Tuyến (Dynamic Form Gate):
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {isRegistrationFormOpen 
                          ? 'Đang MỞ — Cho phép phụ huynh điền thông tin và thanh toán VietQR' 
                          : 'Đang ĐÓNG — Tự động khóa khi hết thời hạn trích xuất từ PDF'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsRegistrationFormOpen(!isRegistrationFormOpen)}
                      className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        isRegistrationFormOpen
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-300 text-slate-700'
                      }`}
                    >
                      {isRegistrationFormOpen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      <span>{isRegistrationFormOpen ? 'ĐANG MỞ' : 'ĐÃ ĐÓNG'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
