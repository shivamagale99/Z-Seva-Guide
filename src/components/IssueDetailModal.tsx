import React from 'react';
import {
  X,
  AlertTriangle,
  Info,
  MapPin,
  Calendar,
  Layers,
  FileText,
  UserCheck,
  CheckCircle,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { Issue, CitizenReport, Language, UserRole } from '../types';
import { translations } from '../i18n/translations';

interface IssueDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: Issue | null;
  reports: CitizenReport[];
  currentLang: Language;
  userRole: UserRole;
  onOpenDecisionModal: (issue: Issue) => void;
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({
  isOpen,
  onClose,
  issue,
  reports,
  currentLang,
  userRole,
  onOpenDecisionModal,
}) => {
  const t = translations[currentLang];

  if (!isOpen || !issue) return null;

  const linkedReports = reports.filter((r) => r.issue_id === issue.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full border border-[#D9E0E7] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#163A5F] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                {issue.id}
              </span>
              <span className="text-xs text-slate-300 font-semibold">{issue.category}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1 leading-snug">{issue.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Location & Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F5F7FA] p-3 rounded-lg border border-[#D9E0E7] text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0B3D91]" />
              <span className="font-semibold text-slate-800">
                {issue.area} ({issue.district} District · {issue.block})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-[#0B3D91] bg-white px-2 py-0.5 rounded border border-slate-300">
                {issue.status}
              </span>
            </div>
          </div>

          {/* Silent Need Highlight (if applicable) */}
          {issue.silent_need_flag && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 space-y-2 text-xs text-amber-950">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Possible Silent Need Signal Flagged</span>
              </div>
              <p className="leading-relaxed">
                {issue.silent_need_reason || t.silentNeedExplanation}
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] font-bold text-amber-800">
                <Info className="w-3.5 h-3.5" />
                <span>«{t.silentNeedDisclaimer}»</span>
              </div>
            </div>
          )}

          {/* Evidence vs Priority Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50/60 p-4 rounded-lg border border-blue-200">
              <span className="text-xs text-slate-500 block mb-1">{t.evidenceConfidence}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-extrabold text-[#0B3D91] tabular-nums">
                  {issue.evidence_confidence}%
                </span>
                <span className="text-xs text-slate-600 font-medium">Empirical alignment</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Evaluates citizen testimony clarity, temporal concentration, and cross-channel consistency.
              </p>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-lg border border-amber-200">
              <span className="text-xs text-slate-500 block mb-1">{t.prioritySignal}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-extrabold text-amber-700 tabular-nums">
                  {issue.priority_signal}
                </span>
                <span className="text-xs text-slate-600 font-medium">/ 100 configured score</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Multi-factor composite calculated from Gap, Urgency, Equity, Demand, and Readiness weights.
              </p>
            </div>
          </div>

          {/* Factor Breakdown Strip */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Multi-Factor Indicator Breakdown:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Infra Gap</span>
                <span className="font-mono font-bold text-rose-700">{issue.factors.infrastructure_gap}%</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Urgency</span>
                <span className="font-mono font-bold text-slate-800">{issue.factors.urgency}%</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Equity/Vuln</span>
                <span className="font-mono font-bold text-slate-800">{issue.factors.equity_vulnerability}%</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Adj Demand</span>
                <span className="font-mono font-bold text-slate-800">{issue.factors.bias_adjusted_demand}%</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Readiness</span>
                <span className="font-mono font-bold text-slate-800">{issue.factors.readiness}%</span>
              </div>
            </div>
          </div>

          {/* Existing Project Status */}
          <div className="bg-slate-50 border border-[#D9E0E7] p-4 rounded-lg space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Existing Public Works Project Status:
              </span>
              <span className="font-bold text-[#0B3D91] bg-white px-2 py-0.5 rounded border border-slate-300">
                {issue.existing_project_status}
              </span>
            </div>
            <p className="text-slate-800 font-medium">
              {issue.existing_project_name || 'No sanctioned scheme directly covers this specific location'}
            </p>
          </div>

          {/* AI Suggested Action */}
          <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-lg text-xs space-y-1">
            <span className="text-[11px] font-bold text-[#0B3D91] uppercase tracking-wider block">
              AI Suggested Action (Advisory Only)
            </span>
            <p className="text-slate-900 font-semibold">{issue.ai_suggested_action}</p>
          </div>

          {/* Supporting Citizen Testimonies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#0B3D91]" />
                <span>Supporting Citizen Testimonies ({linkedReports.length || issue.report_count})</span>
              </span>
            </div>

            <div className="space-y-2">
              {linkedReports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-[#F5F7FA] p-3 rounded border border-slate-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-mono font-bold text-[#0B3D91]">{rep.id}</span>
                    <span>{rep.timestamp}</span>
                  </div>
                  <p className="text-slate-800 italic">“{rep.text}”</p>
                  <span className="text-[11px] text-slate-500 block">
                    AI Summary: {rep.ai_summary}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Human Decision Record */}
          {issue.human_decision ? (
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-4 text-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-950 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Official Human Decision: {issue.human_decision.action}</span>
                </span>
                <span className="text-[11px] font-mono">{issue.human_decision.timestamp}</span>
              </div>
              <p className="text-slate-800 italic">“{issue.human_decision.note}”</p>
              <div className="text-[11px] text-emerald-900 font-semibold pt-1 border-t border-emerald-200">
                Recorded by: {issue.human_decision.reviewer} ({issue.human_decision.department})
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 p-4 rounded-lg text-xs text-slate-600 flex items-center justify-between">
              <span>No official human executive decision recorded yet.</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDecisionModal(issue);
                }}
                className="px-3 py-1.5 bg-[#0B3D91] text-white font-bold rounded hover:bg-[#163A5F]"
              >
                Record Official Decision
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-[#D9E0E7] flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded"
          >
            Close
          </button>

          {userRole !== 'citizen' && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDecisionModal(issue);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#0B3D91] hover:bg-[#163A5F] rounded shadow-xs"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>{issue.human_decision ? 'Update Decision' : 'Review & Decide'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
