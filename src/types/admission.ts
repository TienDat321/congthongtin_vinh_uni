export type DocumentType = 
  | 'ADMISSION_PLAN'        // Đề án / Thông tin tuyển sinh gốc
  | 'ADMISSION_ADJUSTMENT'  // Thông báo điều chỉnh, bổ sung
  | 'ROUND_NOTICE'          // Thông báo xét tuyển từng đợt
  | 'RESULT_NOTICE'         // Thông báo điểm chuẩn, kết quả
  | 'CONVERSION_RULE';      // Quy tắc quy đổi điểm

export type DocumentStatus = 
  | 'RECEIVED'
  | 'ANALYZING'
  | 'NEEDS_REVIEW'
  | 'APPLIED'
  | 'REJECTED';

export type ChangeType = 
  | 'ADDED'        // ✚ Thêm mới
  | 'UPDATED'      // ✎ Cập nhật
  | 'REMOVED'      // ✖ Ngừng áp dụng
  | 'UNCHANGED'    // ○ Không nhắc đến (giữ nguyên)
  | 'CONFLICTED';  // ⚠ Mâu thuẫn cần giải quyết

export type EntityType = 'method' | 'deadline' | 'quota' | 'condition' | 'conversion' | 'general';

export interface EvidenceInfo {
  page: number;
  section: string;
  quote: string;
  pdfSnippetContext?: string;
  documentName: string;
  documentId: string;
}

export interface ChangeItem {
  id: string;
  type: ChangeType;
  entity: EntityType;
  code?: string;
  title: string;
  description: string;
  oldValue?: string;
  newValue?: string;
  evidence: EvidenceInfo;
  status: 'accepted' | 'rejected' | 'pending';
  managerNote?: string;
}

export interface DocumentRelationship {
  type: 'AMENDS' | 'REFERENCES' | 'IMPLEMENTS' | 'SUPERSEDES';
  targetDocId: string;
  targetDocName: string;
  detail: string;
}

export interface ExtractedKnowledge {
  documentType: DocumentType;
  channel: string;
  cycle: number;
  issueDate: string;
  effectiveDate: string;
  scope: string; // e.g. "Đợt 1 toàn trường", "Đợt 2 các ngành còn chỉ tiêu"
  relationships: DocumentRelationship[];
  summary: string;
}

export interface ChangeSet {
  id: string;
  documentId: string;
  documentName: string;
  detectedKnowledge: ExtractedKnowledge;
  assertionMode: 'SNAPSHOT_COMPLETE' | 'INCREMENTAL_PATCH';
  changes: ChangeItem[];
  status: 'PENDING' | 'APPLIED' | 'REJECTED';
  createdAt: string;
  appliedAt?: string;
}

export interface AdmissionMethod {
  code: string;
  name: string;
  shortDesc: string;
  status: 'active' | 'deprecated';
  evidence?: string;
  lineageDocId: string;
  lineageDocName: string;
  lineageDate: string;
  lineageDetail: string;
}

export interface AdmissionDeadline {
  round: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'open' | 'closed';
  note?: string;
  lineageDocId: string;
  lineageDocName: string;
  lineageDate: string;
  lineageDetail: string;
}

export interface MajorQuota {
  majorCode: string;
  majorName: string;
  faculty: string;
  totalQuota: number;
  methodQuotas: Record<string, number>; // method code -> quota
  lineageDocId: string;
  lineageDocName: string;
  lineageDate: string;
}

export interface AdmissionCondition {
  id: string;
  title: string;
  detail: string;
  applicableMethods: string[];
  lineageDocId: string;
  lineageDocName: string;
  lineageDate: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  officialNumber: string; // e.g. "06/TB-ĐHV"
  fileName: string;
  type: DocumentType;
  channel: string;
  cycle: number;
  issueDate: string;
  status: DocumentStatus;
  pageCount: number;
  fileSize: string;
  summary: string;
  signer: string; // e.g. "PGS.TS. Nguyễn Hoa Du - Phó Hiệu trưởng"
}

export interface AdmissionState {
  channel: string;
  cycle: number;
  lastUpdated: string;
  lastUpdatedByDoc: string;
  methods: AdmissionMethod[];
  deadlines: AdmissionDeadline[];
  quotas: MajorQuota[];
  conditions: AdmissionCondition[];
}

export interface HistoryVersion {
  versionNumber: number;
  versionName: string;
  timestamp: string;
  sourceDocId: string;
  sourceDocName: string;
  changeSummary: string;
  actor: string;
  stateSnapshot: AdmissionState;
  appliedChangesCount: number;
}
