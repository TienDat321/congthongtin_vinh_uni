import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AdmissionState, 
  DocumentItem, 
  ChangeSet, 
  HistoryVersion, 
  ChangeItem 
} from '../types/admission';
import { 
  initialAdmissionState2026, 
  initialDocuments, 
  initialHistory, 
  sampleFilesConfig, 
  SampleFileConfig 
} from '../data/mockData';

interface AdmissionContextType {
  // Navigation / Mode
  activePortal: 'public' | 'admin';
  setActivePortal: (portal: 'public' | 'admin') => void;
  activeChannel: 'dh-chinh-quy' | 'thpt-chuyen' | 'thuc-hanh-su-pham' | 'vua-lam-vua-hoc' | 'sinh-vien-quoc-te' | 'sau-dai-hoc';
  setActiveChannel: (channel: 'dh-chinh-quy' | 'thpt-chuyen' | 'thuc-hanh-su-pham' | 'vua-lam-vua-hoc' | 'sinh-vien-quoc-te' | 'sau-dai-hoc') => void;
  publicActiveTab: string;
  setPublicActiveTab: (tab: string) => void;
  
  // Cycle Management
  selectedCycle: number;
  setSelectedCycle: (cycle: number) => void;
  availableCycles: number[];
  
  // States
  currentAdmissionState: AdmissionState;
  stateByCycle: Record<number, AdmissionState>;
  documents: DocumentItem[];
  historyList: HistoryVersion[];
  
  // Review & ChangeSets
  pendingChangeSets: ChangeSet[];
  activeReviewChangeSet: ChangeSet | null;
  setActiveReviewChangeSet: (cs: ChangeSet | null) => void;
  selectedChangeItemForDetail: ChangeItem | null;
  setSelectedChangeItemForDetail: (item: ChangeItem | null) => void;
  
  // Lineage inspection modal
  lineageTarget: {
    title: string;
    entity: string;
    currentValue: string;
    docId: string;
    docName: string;
    date: string;
    detail: string;
    evidence?: string;
  } | null;
  setLineageTarget: (target: any) => void;

  // Actions
  uploadAndAnalyzeSampleDoc: (fileName: string) => Promise<ChangeSet>;
  uploadCustomFile: (file: File) => Promise<ChangeSet>;
  updateChangeItemStatus: (changeSetId: string, itemId: string, status: 'accepted' | 'rejected', note?: string) => void;
  applyChangeSet: (changeSetId: string) => void;
  rejectChangeSet: (changeSetId: string) => void;
  resetAllData: () => void;
  
  // Toast notification
  toastMessage: { text: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
}

const AdmissionContext = createContext<AdmissionContextType | undefined>(undefined);

export const AdmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePortal, setActivePortal] = useState<'public' | 'admin'>('public');
  const [activeChannel, setActiveChannel] = useState<'dh-chinh-quy' | 'thpt-chuyen' | 'thuc-hanh-su-pham' | 'vua-lam-vua-hoc' | 'sinh-vien-quoc-te' | 'sau-dai-hoc'>('dh-chinh-quy');
  const [publicActiveTab, setPublicActiveTab] = useState<string>('methods');
  const [selectedCycle, setSelectedCycle] = useState<number>(2026);
  const [availableCycles, setAvailableCycles] = useState<number[]>([2026]);

  const [stateByCycle, setStateByCycle] = useState<Record<number, AdmissionState>>({
    2026: JSON.parse(JSON.stringify(initialAdmissionState2026))
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [historyList, setHistoryList] = useState<HistoryVersion[]>(initialHistory);
  const [pendingChangeSets, setPendingChangeSets] = useState<ChangeSet[]>([]);
  const [activeReviewChangeSet, setActiveReviewChangeSet] = useState<ChangeSet | null>(null);
  const [selectedChangeItemForDetail, setSelectedChangeItemForDetail] = useState<ChangeItem | null>(null);
  const [lineageTarget, setLineageTarget] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const currentAdmissionState = stateByCycle[selectedCycle] || stateByCycle[2026];

  // Upload & analyze sample document
  const uploadAndAnalyzeSampleDoc = async (fileName: string): Promise<ChangeSet> => {
    const config = sampleFilesConfig[fileName];
    if (!config) {
      throw new Error(`File ${fileName} không tồn tại trong danh mục mẫu`);
    }

    // Add document in ANALYZING status
    const newDoc: DocumentItem = {
      id: config.id,
      name: config.name,
      officialNumber: config.officialNumber,
      fileName: config.fileName,
      type: config.type,
      channel: "Đại học chính quy",
      cycle: config.cycle,
      issueDate: config.issueDate,
      status: "NEEDS_REVIEW",
      pageCount: fileName === "Ke_hoach_2027.pdf" ? 8 : 4,
      fileSize: fileName === "Ke_hoach_2027.pdf" ? "1.8 MB" : "1.2 MB",
      summary: config.description,
      signer: "PGS.TS. Trần Bá Tiến - Phó Chủ tịch HĐTS"
    };

    setDocuments(prev => {
      const exists = prev.find(d => d.id === newDoc.id);
      if (exists) return prev.map(d => d.id === newDoc.id ? { ...d, status: "NEEDS_REVIEW" } : d);
      return [...prev, newDoc];
    });

    const newChangeSet: ChangeSet = JSON.parse(JSON.stringify(config.changeSet));
    
    // Add to pending
    setPendingChangeSets(prev => {
      const filtered = prev.filter(cs => cs.documentId !== newChangeSet.documentId);
      return [...filtered, newChangeSet];
    });

    setActiveReviewChangeSet(newChangeSet);
    return newChangeSet;
  };

  // Upload custom generic file (maps to smart heuristic)
  const uploadCustomFile = async (file: File): Promise<ChangeSet> => {
    // If user dropped an actual file with similar name or generic name
    let sampleKey = "Thong_bao_98_TB-DHV.pdf";
    if (file.name.toLowerCase().includes("2027") || file.name.toLowerCase().includes("ke_hoach")) {
      sampleKey = "Ke_hoach_2027.pdf";
    } else if (file.name.toLowerCase().includes("dot2") || file.name.toLowerCase().includes("dot_2")) {
      sampleKey = "Dot2nam2026.pdf";
    }

    const template = sampleFilesConfig[sampleKey];
    const customDocId = `doc-custom-${Date.now()}`;
    const customChangeSetId = `cs-custom-${Date.now()}`;

    const newDoc: DocumentItem = {
      id: customDocId,
      name: file.name.replace(/\.[^/.]+$/, ""),
      officialNumber: "CV-TUDONG/2026",
      fileName: file.name,
      type: template.type,
      channel: "Đại học chính quy",
      cycle: template.cycle,
      issueDate: new Date().toISOString().split('T')[0],
      status: "NEEDS_REVIEW",
      pageCount: 3,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      summary: `Hệ thống trích xuất tự động từ văn bản tải lên: ${file.name}`,
      signer: "Hội đồng Tuyển sinh Trường Đại học Vinh"
    };

    setDocuments(prev => [...prev, newDoc]);

    const generatedChangeSet: ChangeSet = {
      ...JSON.parse(JSON.stringify(template.changeSet)),
      id: customChangeSetId,
      documentId: customDocId,
      documentName: file.name
    };

    setPendingChangeSets(prev => [...prev, generatedChangeSet]);
    setActiveReviewChangeSet(generatedChangeSet);
    return generatedChangeSet;
  };

  const updateChangeItemStatus = (
    changeSetId: string, 
    itemId: string, 
    status: 'accepted' | 'rejected', 
    note?: string
  ) => {
    setPendingChangeSets(prev => prev.map(cs => {
      if (cs.id !== changeSetId) return cs;
      return {
        ...cs,
        changes: cs.changes.map(ch => ch.id === itemId ? { ...ch, status, managerNote: note || ch.managerNote } : ch)
      };
    }));

    if (activeReviewChangeSet && activeReviewChangeSet.id === changeSetId) {
      setActiveReviewChangeSet(prev => {
        if (!prev) return null;
        return {
          ...prev,
          changes: prev.changes.map(ch => ch.id === itemId ? { ...ch, status, managerNote: note || ch.managerNote } : ch)
        };
      });
    }
  };

  // Áp dụng ChangeSet vào AdmissionState
  const applyChangeSet = (changeSetId: string) => {
    const cs = pendingChangeSets.find(c => c.id === changeSetId) || activeReviewChangeSet;
    if (!cs) return;

    const acceptedChanges = cs.changes.filter(c => c.status === 'accepted');
    const targetCycle = cs.detectedKnowledge.cycle;
    const isNewCycle = !availableCycles.includes(targetCycle);

    // Chuẩn bị state mới
    const baseState: AdmissionState = stateByCycle[targetCycle] 
      ? JSON.parse(JSON.stringify(stateByCycle[targetCycle]))
      : JSON.parse(JSON.stringify(stateByCycle[2026])); // kế thừa từ 2026 nếu chu kỳ mới

    baseState.cycle = targetCycle;
    baseState.lastUpdated = cs.detectedKnowledge.issueDate;
    baseState.lastUpdatedByDoc = cs.documentName;

    // Áp dụng từng thay đổi được chấp thuận
    acceptedChanges.forEach(change => {
      if (change.entity === 'deadline' && change.type === 'UPDATED') {
        // Cập nhật deadline
        if (change.newValue?.includes('25/07') || change.id.includes('98')) {
          baseState.deadlines = baseState.deadlines.map(dl => {
            if (dl.round === 1) {
              return {
                ...dl,
                endDate: "2026-07-25",
                note: "Đã gia hạn theo Thông báo 98/TB-ĐHV (đến hết 17h00 ngày 25/07/2026)",
                lineageDocId: cs.documentId,
                lineageDocName: cs.documentName,
                lineageDate: cs.detectedKnowledge.issueDate,
                lineageDetail: `Được gia hạn ngày kết thúc thêm 5 ngày dựa trên căn cứ Mục 3 văn bản ${cs.documentName}`
              };
            }
            return dl;
          });
        } else if (targetCycle === 2027) {
          baseState.deadlines = [
            {
              round: 1,
              name: "Xét tuyển đợt 1 (ĐHCQ 2027)",
              startDate: "2027-06-15",
              endDate: "2027-07-28",
              status: "upcoming",
              note: "Áp dụng cho 2 phương thức: 100 và 301",
              lineageDocId: cs.documentId,
              lineageDocName: cs.documentName,
              lineageDate: cs.detectedKnowledge.issueDate,
              lineageDetail: `Khởi tạo khung thời gian năm 2027 theo ${cs.documentName}`
            }
          ];
        }
      }

      if (change.entity === 'method') {
        if (change.type === 'REMOVED' && change.code) {
          // KỊCH BẢN 4 -> 2 PHƯƠNG THỨC: Đánh dấu deprecated/removed
          baseState.methods = baseState.methods.map(m => {
            if (m.code === change.code) {
              return {
                ...m,
                status: 'deprecated',
                evidence: change.evidence.section,
                lineageDocId: cs.documentId,
                lineageDocName: cs.documentName,
                lineageDate: cs.detectedKnowledge.issueDate,
                lineageDetail: `Ngừng áp dụng kể từ năm ${targetCycle} theo phê duyệt văn bản ${cs.documentName}`
              };
            }
            return m;
          });
        } else if (change.type === 'UNCHANGED' && change.code) {
          baseState.methods = baseState.methods.map(m => {
            if (m.code === change.code) {
              return {
                ...m,
                status: 'active',
                lineageDocId: cs.documentId,
                lineageDocName: cs.documentName,
                lineageDate: cs.detectedKnowledge.issueDate,
                lineageDetail: `Tái xác nhận tiếp tục áp dụng cho chu kỳ ${targetCycle}`
              };
            }
            return m;
          });
        }
      }
    });

    // Cập nhật State by cycle
    setStateByCycle(prev => ({
      ...prev,
      [targetCycle]: baseState
    }));

    if (isNewCycle) {
      setAvailableCycles(prev => [...prev, targetCycle].sort());
      setSelectedCycle(targetCycle);
    }

    // Đánh dấu tài liệu là APPLIED
    setDocuments(prev => prev.map(doc => {
      if (doc.id === cs.documentId) {
        return { ...doc, status: 'APPLIED' };
      }
      return doc;
    }));

    // Ghi nhận vào Lịch sử phiên bản (Audit trail)
    const newVersionNumber = historyList.length + 1;
    const newHistory: HistoryVersion = {
      versionNumber: newVersionNumber,
      versionName: `Phiên bản ${newVersionNumber}: ${cs.documentName}`,
      timestamp: new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }),
      sourceDocId: cs.documentId,
      sourceDocName: cs.documentName,
      changeSummary: cs.detectedKnowledge.summary,
      actor: "Quản trị viên Tuyển sinh (Manager)",
      stateSnapshot: JSON.parse(JSON.stringify(baseState)),
      appliedChangesCount: acceptedChanges.length
    };

    setHistoryList(prev => [newHistory, ...prev]);

    // Xóa khỏi pending
    setPendingChangeSets(prev => prev.filter(c => c.id !== changeSetId));
    setActiveReviewChangeSet(null);
    setSelectedChangeItemForDetail(null);

    // Thông báo toast
    showToast(
      `Đã công bố thành công tri thức tuyển sinh mới từ ${cs.documentName}! Giao diện công khai đã tự động cập nhật.`,
      'success'
    );
  };

  const rejectChangeSet = (changeSetId: string) => {
    const cs = pendingChangeSets.find(c => c.id === changeSetId);
    if (!cs) return;

    setDocuments(prev => prev.map(doc => doc.id === cs.documentId ? { ...doc, status: 'REJECTED' } : doc));
    setPendingChangeSets(prev => prev.filter(c => c.id !== changeSetId));
    setActiveReviewChangeSet(null);
    setSelectedChangeItemForDetail(null);
    showToast(`Đã từ chối áp dụng ChangeSet của ${cs.documentName}`, 'info');
  };

  const resetAllData = () => {
    setStateByCycle({
      2026: JSON.parse(JSON.stringify(initialAdmissionState2026))
    });
    setDocuments(initialDocuments);
    setHistoryList(initialHistory);
    setPendingChangeSets([]);
    setActiveReviewChangeSet(null);
    setSelectedChangeItemForDetail(null);
    setSelectedCycle(2026);
    setAvailableCycles([2026]);
    showToast("Đã khôi phục trạng thái ban đầu (ĐHCQ 2026 với 4 phương thức)", "info");
  };

  return (
    <AdmissionContext.Provider value={{
      activePortal,
      setActivePortal,
      activeChannel,
      setActiveChannel,
      publicActiveTab,
      setPublicActiveTab,
      selectedCycle,
      setSelectedCycle,
      availableCycles,
      currentAdmissionState,
      stateByCycle,
      documents,
      historyList,
      pendingChangeSets,
      activeReviewChangeSet,
      setActiveReviewChangeSet,
      selectedChangeItemForDetail,
      setSelectedChangeItemForDetail,
      lineageTarget,
      setLineageTarget,
      uploadAndAnalyzeSampleDoc,
      uploadCustomFile,
      updateChangeItemStatus,
      applyChangeSet,
      rejectChangeSet,
      resetAllData,
      toastMessage,
      showToast
    }}>
      {children}
    </AdmissionContext.Provider>
  );
};

export const useAdmission = () => {
  const context = useContext(AdmissionContext);
  if (!context) {
    throw new Error('useAdmission must be used within an AdmissionProvider');
  }
  return context;
};
