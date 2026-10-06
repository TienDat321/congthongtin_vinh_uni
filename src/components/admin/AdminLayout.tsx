import React, { useState } from 'react';
import { useAdmission } from '../../context/AdmissionContext';
import { 
  LayoutDashboard, 
  FileText, 
  GitPullRequest, 
  Database, 
  History, 
  UploadCloud, 
  User, 
  Bell, 
  LogOut, 
  Eye, 
  GraduationCap,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileSearch,
  Server
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { AdminDocuments } from './AdminDocuments';
import { AdminAdmissionState } from './AdminAdmissionState';
import { AdminHistory } from './AdminHistory';
import { UploadWizardModal } from './UploadWizardModal';
import { ChangeReviewDetailModal } from './ChangeReviewDetailModal';
import { LineageModal } from './LineageModal';
import { AdminAIExtractionEngine } from './AdminAIExtractionEngine';
import { BackendArchitectureWorkflow } from './BackendArchitectureWorkflow';

export const AdminLayout: React.FC = () => {
  const { 
    setActivePortal, 
    pendingChangeSets, 
    selectedCycle, 
    activeReviewChangeSet,
    setActiveReviewChangeSet 
  } = useAdmission();

  const [currentTab, setCurrentTab] = useState<'dashboard' | 'documents' | 'state' | 'changes' | 'history' | 'extraction' | 'backend-architecture'>('backend-architecture');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const pendingCount = pendingChangeSets.length;

  const handleOpenUpload = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        
        {/* Brand Area */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Cổng Quản Trị
              </span>
              <span className="text-sm font-extrabold text-white tracking-tight block">
                VinhUni Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 text-xs flex-1">
          <button
            onClick={() => setCurrentTab('extraction')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-left ${
              currentTab === 'extraction' 
                ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm' 
                : 'text-amber-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>AI Extraction Engine</span>
            </div>
            <span className="bg-amber-900 text-amber-200 text-[9px] font-mono px-1 rounded font-bold">
              PDF
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('backend-architecture')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-left ${
              currentTab === 'backend-architecture' 
                ? 'bg-indigo-600 text-white font-extrabold shadow-sm' 
                : 'text-indigo-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Server className="w-4 h-4 text-indigo-400" />
              <span>Kiến Trúc 9 Subdomain</span>
            </div>
            <span className="bg-indigo-950 text-indigo-200 text-[9px] font-mono px-1 rounded font-bold">
              SDUI
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-left ${
              currentTab === 'dashboard' 
                ? 'bg-sky-700 text-white font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentTab('documents')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-left ${
              currentTab === 'documents' 
                ? 'bg-sky-700 text-white font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Văn bản & Quyết định</span>
          </button>

          <button
            onClick={() => setCurrentTab('state')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-left ${
              currentTab === 'state' 
                ? 'bg-sky-700 text-white font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Trạng thái Tuyển sinh</span>
          </button>

          <button
            onClick={() => {
              if (pendingChangeSets.length > 0) {
                setActiveReviewChangeSet(pendingChangeSets[0]);
                setIsUploadModalOpen(true);
              } else {
                setCurrentTab('changes');
              }
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-left ${
              currentTab === 'changes' 
                ? 'bg-sky-700 text-white font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <GitPullRequest className="w-4 h-4" />
              <span>Xem xét thay đổi</span>
            </div>
            {pendingCount > 0 && (
              <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px] font-mono">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('history')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-left ${
              currentTab === 'history' 
                ? 'bg-sky-700 text-white font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Lịch sử phiên bản</span>
          </button>
        </nav>

        {/* Upload Action Button in Sidebar */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={handleOpenUpload}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload văn bản mới</span>
          </button>

          {/* Switch to Public Portal */}
          <button
            onClick={() => setActivePortal('public')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Xem Cổng Thí sinh</span>
          </button>
        </div>

        {/* Manager User Profile Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800/80 flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-full bg-sky-900 text-sky-200 flex items-center justify-center font-bold font-mono">
            M
          </div>
          <div className="overflow-hidden flex-1">
            <span className="font-semibold text-white truncate block text-[11px]">
              Manager - Ban Tuyển sinh
            </span>
            <span className="text-[10px] text-slate-400 truncate block">
              Hội đồng Tuyển sinh ĐHV
            </span>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Admin</span>
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-slate-800 capitalize">
              {currentTab === 'backend-architecture' ? 'Kiến trúc 9 Subdomain & Schema Server-Driven UI' :
               currentTab === 'extraction' ? 'AI Extraction Engine (Bộ trích xuất PDF)' :
               currentTab === 'dashboard' ? 'Bảng điều khiển' :
               currentTab === 'documents' ? 'Văn bản & Quyết định' :
               currentTab === 'state' ? 'Trạng thái Tuyển sinh ĐHCQ' :
               currentTab === 'changes' ? 'ChangeSet Review' :
               'Lịch sử phiên bản'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {pendingCount > 0 && (
              <button 
                onClick={() => {
                  setActiveReviewChangeSet(pendingChangeSets[0]);
                  setIsUploadModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg font-medium cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                <span>{pendingCount} ChangeSet chờ duyệt</span>
              </button>
            )}

            <span className="text-slate-400">|</span>

            <button
              onClick={() => setActivePortal('public')}
              className="text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Mở Cổng Thí sinh</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="p-6 overflow-y-auto flex-1">
          {currentTab === 'backend-architecture' && (
            <BackendArchitectureWorkflow />
          )}

          {currentTab === 'extraction' && (
            <AdminAIExtractionEngine />
          )}

          {currentTab === 'dashboard' && (
            <AdminDashboard 
              onOpenUpload={handleOpenUpload}
              onNavigateTab={(tab: string) => setCurrentTab(tab as any)}
            />
          )}

          {currentTab === 'documents' && (
            <AdminDocuments onOpenUpload={handleOpenUpload} />
          )}

          {currentTab === 'state' && (
            <AdminAdmissionState />
          )}

          {currentTab === 'changes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Danh Sách Yêu Cầu Thay Đổi (ChangeSets)</h2>
                  <p className="text-xs text-slate-500">Mọi đề xuất do AI trích xuất từ văn bản mới đều nằm tại đây để Quản trị viên duyệt.</p>
                </div>
                <button
                  onClick={handleOpenUpload}
                  className="px-4 py-2 bg-sky-900 text-white rounded-lg text-xs font-semibold hover:bg-sky-800"
                >
                  Upload thêm văn bản
                </button>
              </div>

              {pendingChangeSets.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-700">Tất cả thay đổi đã được xử lý hoàn tất</h3>
                  <p className="text-xs max-w-md mx-auto">Không có ChangeSet nào đang chờ. Hãy upload văn bản "Ke_hoach_2027.pdf" hoặc "Thong_bao_98_TB-DHV.pdf" để kiểm tra quy trình.</p>
                  <button
                    onClick={handleOpenUpload}
                    className="px-4 py-2 rounded-lg bg-sky-900 text-white text-xs font-bold hover:bg-sky-800 mt-2"
                  >
                    Bắt đầu Upload Demo
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingChangeSets.map(cs => (
                    <div key={cs.id} className="bg-white p-5 rounded-xl border border-amber-200 shadow-xs space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                              {cs.id}
                            </span>
                            <h3 className="font-bold text-sm text-slate-900">{cs.documentName}</h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Chu kỳ phát hiện: <strong>{cs.detectedKnowledge.cycle}</strong> · {cs.changes.length} thay đổi đề xuất</p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveReviewChangeSet(cs);
                            setIsUploadModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-lg bg-sky-900 text-white text-xs font-bold hover:bg-sky-800"
                        >
                          Mở bảng duyệt chi tiết
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
                        {cs.detectedKnowledge.summary}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentTab === 'history' && (
            <AdminHistory />
          )}
        </main>

      </div>

      {/* Modals */}
      <UploadWizardModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />

      <ChangeReviewDetailModal />
      <LineageModal />

    </div>
  );
};
