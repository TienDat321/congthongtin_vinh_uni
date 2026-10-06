import React, { useState, useEffect } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  Check, 
  X, 
  Info,
  ShieldCheck,
  Eye,
  FileCheck,
  Cpu,
  RefreshCw,
  GitCompare,
  FileCode2,
  FileSearch
} from 'lucide-react';
import { sampleFilesConfig } from '../../data/mockData';
import { ChangeItem, ChangeType } from '../../types/admission';

interface UploadWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadWizardModal: React.FC<UploadWizardModalProps> = ({ isOpen, onClose }) => {
  const { 
    uploadAndAnalyzeSampleDoc, 
    uploadCustomFile,
    activeReviewChangeSet, 
    setActiveReviewChangeSet,
    setSelectedChangeItemForDetail,
    updateChangeItemStatus,
    applyChangeSet,
    rejectChangeSet,
    availableCycles,
    setSelectedCycle
  } = useAdmission();

  // Wizard Steps: 1: Pick File, 2: AI Analysis (2s), 3: System Understanding, 4: ChangeSet Review, 5: Confirmed
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedFileName, setSelectedFileName] = useState<string>("Ke_hoach_2027.pdf");
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [analysisLog, setAnalysisLog] = useState<string>("Bắt đầu đọc cấu trúc tệp PDF...");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadedCustomFile, setUploadedCustomFile] = useState<File | null>(null);

  // If there's already an active review changeSet from outside, start at step 3 or 4
  useEffect(() => {
    if (isOpen && activeReviewChangeSet && currentStep === 1) {
      setCurrentStep(4);
    }
  }, [isOpen, activeReviewChangeSet]);

  if (!isOpen) return null;

  // Handle starting analysis (Step 1 -> Step 2 -> Step 3)
  const handleStartAnalysis = async () => {
    setCurrentStep(2);
    setAnalysisProgress(15);
    setAnalysisLog("OCR và bóc tách bảng số liệu tuyển sinh...");

    setTimeout(() => {
      setAnalysisProgress(45);
      setAnalysisLog("Đối chiếu ngữ nghĩa với kho tri thức ĐHCQ hiện hành...");
    }, 600);

    setTimeout(() => {
      setAnalysisProgress(75);
      setAnalysisLog("Kiểm tra 3 nguyên tắc bất biến (Không nhắc đến ≠ Bị xóa)...");
    }, 1200);

    setTimeout(async () => {
      setAnalysisProgress(100);
      setAnalysisLog("Hoàn tất tổng hợp ChangeSet!");

      try {
        if (uploadedCustomFile) {
          await uploadCustomFile(uploadedCustomFile);
        } else {
          await uploadAndAnalyzeSampleDoc(selectedFileName);
        }
        setCurrentStep(3); // Go to "Hệ thống đã hiểu gì"
      } catch (err) {
        console.error(err);
      }
    }, 1900);
  };

  const handleCustomDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedCustomFile(file);
      setSelectedFileName(file.name);
    }
  };

  const handleConfirmAndPublish = () => {
    if (!activeReviewChangeSet) return;
    const targetCycle = activeReviewChangeSet.detectedKnowledge.cycle;
    applyChangeSet(activeReviewChangeSet.id);
    setSelectedCycle(targetCycle);
    setCurrentStep(5);
  };

  const cs = activeReviewChangeSet;
  const changes = cs?.changes || [];

  // Group changes by category for step 4
  const addedChanges = changes.filter(c => c.type === 'ADDED');
  const updatedChanges = changes.filter(c => c.type === 'UPDATED');
  const removedChanges = changes.filter(c => c.type === 'REMOVED');
  const unchangedChanges = changes.filter(c => c.type === 'UNCHANGED');
  const conflictedChanges = changes.filter(c => c.type === 'CONFLICTED');

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-6 flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top wizard header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <h2 className="font-bold text-sm tracking-wide text-white">
                QUY TRÌNH TIẾP NHẬN & CẬP NHẬT TRI THỨC VĂN BẢN
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Hệ thống đọc PDF → Đề xuất ChangeSet → Quản trị viên duyệt → Website tự động cập nhật
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl leading-none cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* Stepper bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs overflow-x-auto">
          <div className="flex items-center gap-2">
            {[
              { num: 1, label: "Chọn văn bản" },
              { num: 2, label: "AI phân tích" },
              { num: 3, label: "Hệ thống đã hiểu gì" },
              { num: 4, label: "Xem xét thay đổi (ChangeSet)" },
              { num: 5, label: "Hoàn tất" },
            ].map(step => (
              <div key={step.num} className="flex items-center gap-1.5 whitespace-nowrap">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep === step.num 
                    ? 'bg-sky-900 text-white' 
                    : currentStep > step.num 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-300 text-slate-600'
                }`}>
                  {currentStep > step.num ? '✓' : step.num}
                </span>
                <span className={`font-medium ${
                  currentStep === step.num ? 'text-sky-950 font-bold' : 'text-slate-600'
                }`}>
                  {step.label}
                </span>
                {step.num < 5 && <span className="text-slate-300 mx-1">›</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Step Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          
          {/* STEP 1: CHỌN FILE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              
              {/* Dropzone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleCustomDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isDragging 
                    ? 'border-sky-500 bg-sky-50' 
                    : 'border-slate-300 bg-slate-50/70 hover:bg-slate-50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm">
                  Kéo thả file PDF văn bản tuyển sinh vào đây
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Định dạng hỗ trợ: PDF, Scan OCR (tối đa 25MB)
                </p>

                {uploadedCustomFile && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-medium">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>Đã chọn: {uploadedCustomFile.name}</span>
                  </div>
                )}
              </div>

              {/* Sample files selection (for seamless presentation & demo) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-700" />
                    <span>Hoặc chọn 1 trong các văn bản mẫu có sẵn (Khuyên dùng cho Demo):</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">Bấm để chọn</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(sampleFilesConfig).map(([key, config]) => {
                    const isSelected = selectedFileName === key && !uploadedCustomFile;
                    const isHighlightScenario = key === "Ke_hoach_2027.pdf";

                    return (
                      <div
                        key={key}
                        onClick={() => {
                          setSelectedFileName(key);
                          setUploadedCustomFile(null);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all relative ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50/60 ring-2 ring-sky-500/20 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        } ${isHighlightScenario ? 'border-indigo-300 bg-indigo-50/20' : ''}`}
                      >
                        {isHighlightScenario && (
                          <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                            Kịch bản chính
                          </div>
                        )}

                        <div className="flex items-start gap-2.5">
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'border-sky-700 bg-sky-700 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </span>
                          <div>
                            <span className="font-bold text-slate-900 text-xs block leading-tight">
                              {config.fileName}
                            </span>
                            <span className="text-[11px] text-sky-800 font-semibold block mt-0.5">
                              {config.badgeText}
                            </span>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                              {config.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Notice of Principle 3 */}
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Nguyên tắc 3 (Human-in-the-loop):</strong> Sau khi AI đọc và phân tích văn bản, hệ thống sẽ đề xuất <strong>ChangeSet</strong>. Không có dữ liệu nào tự ý thay đổi nếu Quản trị viên chưa bấm nút "Xác nhận và công bố".
                </p>
              </div>

            </div>
          )}

          {/* STEP 2: AI ANALYZING (Simulation animation) */}
          {currentStep === 2 && (
            <div className="py-12 px-4 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-slate-200 border-t-sky-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  Hệ thống đang đọc và phân tích văn bản trong ngữ cảnh tri thức cũ...
                </h3>
                <p className="text-xs font-mono text-sky-800 bg-sky-50 px-3 py-1.5 rounded-lg inline-block border border-sky-100">
                  {analysisLog}
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>Trích xuất thực thể</span>
                  <span>{analysisProgress}%</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: HỆ THỐNG ĐÃ HIỂU GÌ */}
          {currentStep === 3 && cs && (
            <div className="space-y-5">
              <div className="p-3.5 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sky-700" />
                  <div>
                    <h3 className="font-bold text-sky-950 text-sm">
                      Kết quả Trích xuất Tri thức Văn bản (Document Understanding)
                    </h3>
                    <p className="text-xs text-sky-800">
                      Tệp nguồn: <strong>{cs.documentName}</strong>
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-1 bg-white rounded border border-sky-200 text-sky-900 font-semibold">
                  Chế độ: {cs.assertionMode}
                </span>
              </div>

              {/* Extracted fields grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Loại văn bản</span>
                  <span className="font-mono font-semibold text-slate-900 mt-1 block">
                    {cs.detectedKnowledge.documentType}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Kênh đào tạo</span>
                  <span className="font-semibold text-slate-900 mt-1 block">
                    {cs.detectedKnowledge.channel}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Chu kỳ tuyển sinh</span>
                  <span className="font-mono font-bold text-sky-800 mt-1 block text-sm">
                    {cs.detectedKnowledge.cycle}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Ngày ban hành</span>
                  <span className="font-mono text-slate-800 mt-1 block">
                    {cs.detectedKnowledge.issueDate}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Ngày có hiệu lực</span>
                  <span className="font-mono text-slate-800 mt-1 block">
                    {cs.detectedKnowledge.effectiveDate}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Phạm vi tác động</span>
                  <span className="font-semibold text-slate-800 mt-1 block">
                    {cs.detectedKnowledge.scope}
                  </span>
                </div>
              </div>

              {/* Document Relationships */}
              <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-700 block mb-2 flex items-center gap-1.5">
                  <GitCompare className="w-3.5 h-3.5 text-sky-700" />
                  <span>Mối quan hệ văn bản (Graph Relations)</span>
                </span>
                <div className="space-y-2">
                  {cs.detectedKnowledge.relationships.map((rel, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs flex items-start gap-2">
                      <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-sky-900 text-white shrink-0 mt-0.5">
                        {rel.type}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {rel.targetDocName}
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5">
                          {rel.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary extracted */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-700 block mb-1">Tóm tắt nội dung chính:</span>
                <p className="text-slate-600 leading-relaxed">
                  {cs.detectedKnowledge.summary}
                </p>
              </div>

            </div>
          )}

          {/* STEP 4: CÓ GÌ THAY ĐỔI (ChangeSet Review - QUAN TRỌNG NHẤT) */}
          {currentStep === 4 && cs && (
            <div className="space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    THAY ĐỔI SO VỚI TRẠNG THÁI HIỆN TẠI (ChangeSet Review)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Phê duyệt từng mục thay đổi hoặc điều chỉnh trước khi công bố ra Cổng thí sinh.
                  </p>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-500">Văn bản nguồn:</span>{' '}
                  <strong className="text-slate-800 font-mono">{cs.documentName}</strong>
                </div>
              </div>

              {/* Change Category 1: ✚ THÊM MỚI */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                    <span>✚ THÊM MỚI</span>
                    <span className="text-[11px] font-normal text-emerald-700">({addedChanges.length})</span>
                  </span>
                </div>
                <div className="p-3 text-xs">
                  {addedChanges.length === 0 ? (
                    <span className="text-slate-400 italic">(Không có mục thêm mới)</span>
                  ) : (
                    <div className="space-y-2">
                      {addedChanges.map(renderChangeItemRow)}
                    </div>
                  )}
                </div>
              </div>

              {/* Change Category 2: ✎ CẬP NHẬT */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-sky-50 px-4 py-2 border-b border-sky-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-sky-900 flex items-center gap-1.5">
                    <span>✎ CẬP NHẬT (Update)</span>
                    <span className="text-[11px] font-normal text-sky-700">({updatedChanges.length})</span>
                  </span>
                </div>
                <div className="p-3 text-xs">
                  {updatedChanges.length === 0 ? (
                    <span className="text-slate-400 italic">(Không có mục cập nhật)</span>
                  ) : (
                    <div className="space-y-2">
                      {updatedChanges.map(renderChangeItemRow)}
                    </div>
                  )}
                </div>
              </div>

              {/* Change Category 3: ✖ NGỪNG ÁP DỤNG (REMOVED) */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-rose-50 px-4 py-2 border-b border-rose-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-rose-900 flex items-center gap-1.5">
                    <span>✖ NGỪNG ÁP DỤNG (Dừng xét tuyển)</span>
                    <span className="text-[11px] font-normal text-rose-700">({removedChanges.length})</span>
                  </span>
                </div>
                <div className="p-3 text-xs">
                  {removedChanges.length === 0 ? (
                    <span className="text-slate-400 italic">(Không có mục ngừng áp dụng)</span>
                  ) : (
                    <div className="space-y-2">
                      {removedChanges.map(renderChangeItemRow)}
                    </div>
                  )}
                </div>
              </div>

              {/* Change Category 4: ○ KHÔNG NHẮC ĐẾN (GIỮ NGUYÊN) - VÔ CÙNG QUAN TRỌNG */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <span>○ KHÔNG NHẮC ĐẾN (Giữ nguyên theo Đề án gốc)</span>
                    <span className="text-[11px] font-normal text-slate-500">
                      — Minh họa nguyên tắc: "Không nhắc đến ≠ Bị xóa"
                    </span>
                  </span>
                </div>
                <div className="p-3 text-xs">
                  {unchangedChanges.length === 0 ? (
                    <span className="text-slate-400 italic">(Không có)</span>
                  ) : (
                    <div className="space-y-2">
                      {unchangedChanges.map(item => (
                        <div key={item.id} className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                            <div>
                              <span className="font-semibold text-slate-800">{item.title}</span>
                              <span className="text-slate-500 text-[11px] ml-2">{item.description}</span>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                            Bảo toàn
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Change Category 5: ⚠ MÂU THUẪN */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-amber-50 px-4 py-2 border-b border-amber-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <span>⚠ MÂU THUẪN (Conflict check)</span>
                    <span className="text-[11px] font-normal text-amber-700">({conflictedChanges.length})</span>
                  </span>
                </div>
                <div className="p-3 text-xs">
                  {conflictedChanges.length === 0 ? (
                    <div className="flex items-center gap-2 text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Không phát hiện mâu thuẫn pháp lý với các văn bản còn hiệu lực.</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {conflictedChanges.map(renderChangeItemRow)}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: HOÀN TẤT & THÀNH CÔNG */}
          {currentStep === 5 && (
            <div className="py-10 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-lg font-bold text-slate-900">
                  Xác nhận & Xuất bản Tri thức Tuyển sinh Thành Công!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kho tri thức tuyển sinh đã được cập nhật chính thức. Giao diện Cổng thí sinh (Public Portal) đã tự động tính toán lại và hiển thị cấu trúc phương thức mới mà không cần can thiệp code frontend.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                >
                  Quay về Bảng điều khiển Admin
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Controls */}
        {currentStep !== 2 && currentStep !== 5 && (
          <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between shrink-0">
            <div>
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quay lại</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {currentStep === 1 && (
                <button
                  onClick={handleStartAnalysis}
                  className="px-5 py-2 rounded-lg bg-sky-900 hover:bg-sky-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Tiến hành Đọc & Phân tích</span>
                </button>
              )}

              {currentStep === 3 && (
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-5 py-2 rounded-lg bg-sky-900 hover:bg-sky-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Xem xét bảng Thay đổi (ChangeSet)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {currentStep === 4 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (cs) rejectChangeSet(cs.id);
                      onClose();
                    }}
                    className="px-3.5 py-2 rounded-lg bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Từ chối văn bản
                  </button>

                  <button
                    onClick={handleConfirmAndPublish}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác nhận & Công bố ra Cổng tuyển sinh</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );

  // Helper row renderer for Step 4
  function renderChangeItemRow(item: ChangeItem) {
    const isAccepted = item.status === 'accepted';
    const isRejected = item.status === 'rejected';

    return (
      <div 
        key={item.id} 
        className={`p-3 rounded-lg border transition-all ${
          isRejected 
            ? 'bg-slate-100 border-slate-300 opacity-60' 
            : item.type === 'REMOVED'
            ? 'bg-rose-50/50 border-rose-200'
            : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                item.type === 'REMOVED' ? 'bg-rose-600 text-white' :
                item.type === 'UPDATED' ? 'bg-sky-700 text-white' :
                'bg-emerald-700 text-white'
              }`}>
                {item.type}
              </span>
              <span className="font-bold text-slate-900 text-xs">{item.title}</span>
              {item.code && (
                <span className="text-[11px] font-mono text-slate-500">(Mã: {item.code})</span>
              )}
            </div>

            <div className="text-slate-600 text-[11px] flex items-center gap-2 flex-wrap">
              {item.oldValue && <span>Cũ: <span className="line-through text-slate-400">{item.oldValue}</span></span>}
              {item.newValue && (
                <span className="font-semibold text-slate-900">
                  → Mới: {item.newValue}
                </span>
              )}
            </div>

            {/* Evidence Link */}
            <div className="flex items-center gap-2 pt-0.5">
              <button
                onClick={() => setSelectedChangeItemForDetail(item)}
                className="text-[11px] text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <FileSearch className="w-3 h-3 text-sky-600" />
                <span>Bằng chứng: {item.evidence.section}</span>
              </button>
            </div>
          </div>

          {/* Action buttons: Nhận / Từ chối / Xem */}
          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <button
              onClick={() => setSelectedChangeItemForDetail(item)}
              title="Xem văn bản & bằng chứng chi tiết"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded text-xs"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => updateChangeItemStatus(cs!.id, item.id, 'rejected')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isRejected 
                  ? 'bg-rose-700 text-white' 
                  : 'bg-slate-100 hover:bg-rose-50 text-rose-700 border border-slate-200'
              }`}
            >
              <X className="w-3 h-3" />
              <span>Từ chối</span>
            </button>

            <button
              onClick={() => updateChangeItemStatus(cs!.id, item.id, 'accepted')}
              className={`px-3 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isAccepted 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'bg-slate-100 hover:bg-emerald-50 text-emerald-800 border border-slate-200'
              }`}
            >
              <Check className="w-3 h-3" />
              <span>Nhận</span>
            </button>
          </div>

        </div>
      </div>
    );
  }
};
