export type Language = 'en' | 'mr' | 'hi';

export type UserRole = 'citizen' | 'reviewer' | 'planner' | 'admin';

export type ReportCategory =
  | 'Drinking Water'
  | 'Roads & Transport'
  | 'Connectivity & Digital'
  | 'Drainage & Sanitation'
  | 'Electricity & Streetlights'
  | 'Healthcare Access'
  | 'Other';

export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type ReportStatus =
  | 'Received'
  | 'Under Review'
  | 'Planned'
  | 'In Progress'
  | 'Completed'
  | 'Merged'
  | 'Needs Information'
  | 'Declined';

export type ExistingProjectStatus =
  | 'Covered'
  | 'Partially Covered'
  | 'Planned but Delayed'
  | 'Not Covered';

export type VerificationState =
  | 'Possible Silent Need'
  | 'Verified'
  | 'Needs Field Visit'
  | 'Already Addressed';

export interface TimelineEvent {
  status: ReportStatus;
  date: string;
  description: string;
  role: string;
}

export interface CitizenReport {
  id: string; // e.g. "ZSG-2026-00124"
  text: string;
  originalText?: string;
  language: Language;
  detectedLanguage?: string;
  category: ReportCategory;
  urgency: UrgencyLevel;
  area: string;
  district: string;
  block?: string;
  timestamp: string;
  anonymous: boolean;
  contactName?: string;
  contactPhone?: string;
  ai_confidence: number; // percentage (e.g. 89)
  ai_summary: string;
  issue_id?: string;
  status: ReportStatus;
  similar_reports_count?: number;
  data_audit_status?: 'Audited' | 'Needs verification' | 'Data unavailable';
  timeline: TimelineEvent[];
  resolutionFeedback?: {
    status: 'Resolved' | 'Partially Resolved' | 'Still Exists';
    notes: string;
    date: string;
  };
}

export interface PriorityFactors {
  infrastructure_gap: number; // 0-100
  urgency: number; // 0-100
  equity_vulnerability: number; // 0-100
  bias_adjusted_demand: number; // 0-100
  readiness: number; // 0-100
}

export interface PriorityWeights {
  infrastructure_gap: number; // default 0.30
  urgency: number; // default 0.25
  equity_vulnerability: number; // default 0.20
  bias_adjusted_demand: number; // default 0.15
  readiness: number; // default 0.10
}

export interface HumanDecision {
  id: string;
  issue_id: string;
  action:
    | 'Field verification'
    | 'Plan intervention'
    | 'Existing project sufficient'
    | 'Need more information'
    | 'Other';
  note: string;
  reviewer: string;
  department: string;
  timestamp: string;
}

export interface FieldVerificationStep {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
  updatedAt?: string;
}

export interface Issue {
  id: string; // e.g. "ISSUE-W-014"
  title: string;
  category: ReportCategory;
  area: string;
  district: string;
  block: string;
  report_count: number;
  reporting_rate: string;
  digital_access: 'Low' | 'Moderate' | 'High';
  evidence_confidence: number; // percentage (e.g. 86)
  priority_signal: number; // 0 - 100
  silent_need_flag: boolean;
  silent_need_reason?: string;
  silent_need_verification_state?: VerificationState;
  recommended_verification_action: string;
  data_reliability: 'Audited' | 'Needs verification' | 'Data unavailable';
  existing_project_status: ExistingProjectStatus;
  existing_project_name?: string;
  existing_project_budget?: string;
  ai_suggested_action: string;
  human_decision?: HumanDecision;
  report_ids: string[];
  factors: PriorityFactors;
  status: 'Identified' | 'Under Review' | 'Verified' | 'Intervention Planned' | 'In Execution' | 'Resolved';
  lastUpdated: string;
  verification_steps?: FieldVerificationStep[];
}

export interface Area {
  id: string;
  name: string;
  district: string;
  block: string;
  population: number;
  population_status: 'Sample estimate (Needs verification)' | 'Local register' | 'Data unavailable';
  infrastructure_gap: number; // % (e.g. 94)
  digital_access: 'Low' | 'Moderate' | 'High';
  vulnerability: 'Low' | 'Medium' | 'High' | 'Severe';
  reports_count: number;
  underlying_issues_count: number;
  silent_needs_count: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Project {
  id: string;
  name: string;
  area: string;
  category: ReportCategory;
  status: 'Planned' | 'In Progress' | 'Delayed' | 'Completed';
  budget_sanctioned: string;
  budget_audit_note: string; // e.g. "Indicative / Subject to sanction verification" or "Data unavailable"
  executing_agency: string;
  expected_completion: string;
  delay_reason?: string;
}
