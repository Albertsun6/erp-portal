export type DocStatus = "confirmed" | "skeleton" | "placeholder";

export interface Document {
  id: string;
  title: string;
  path: string;
  category: "methodology" | "project" | "chatlog";
  domain?: string;
  level: "L0" | "L1" | "L2" | "project";
  status: DocStatus;
  fillTimeline?: string;
  currentRef?: string;
  contentMd: string;
  currentVersion: number;
  updatedAt: string;
}

export interface DocVersion {
  id: string;
  documentId: string;
  versionNum: number;
  contentMd: string;
  changeSummary: string;
  createdAt: string;
}

export interface Phase {
  id: string;
  name: string;
  phaseNum: number;
  status: "not-started" | "in-progress" | "completed";
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  activities: string[];
  deliverables: string[];
}

export interface Milestone {
  id: string;
  phaseId: string;
  name: string;
  code: string;
  status: "not-started" | "in-progress" | "completed";
  targetDate: string;
}

export interface QualityGate {
  id: string;
  phaseTransition: string;
  checkItem: string;
  verifyMethod: string;
  passCriteria: string;
  isPassed: boolean;
  checkedAt?: string;
}

export interface ChatlogEntry {
  id: string;
  chatTime: string;
  title: string;
  userNeed: string;
  solution: string;
  codeChanges: string;
  keyDecisions?: string;
  statusTag: "completed" | "in-progress" | "unresolved";
}

export interface MethodologyNode {
  id: string;
  label: string;
  status: DocStatus;
  docId?: string;
  children?: MethodologyNode[];
}
