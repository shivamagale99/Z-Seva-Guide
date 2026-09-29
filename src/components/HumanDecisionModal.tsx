import React, { useState } from 'react';
import { UserCheck, Shield, FileCheck2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { HumanDecision, Issue, Language } from '../types';
import { translations } from '../i18n/translations';

interface HumanDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: Issue | null;
  onSaveDecision: (decision: HumanDecision) => void;
  currentLang: Language;
}

export const HumanDecisionModal: React.FC<HumanDecisionModalProps> = ({
  isOpen,
  onClose,
  issue,
  onSaveDecision,
  currentLang,
}) => {
  const t = translations[currentLang];

  if (!isOpen || !issue) return null;

  const [action, setAction] = useState<
    'Field verification' | 'Plan intervention' | 'Existing project sufficient' | 'Need more information' | 'Other'
  >(
    (issue.human_decision?.action as any) ||
      (issue.silent_need_flag ? 'Field verification' : 'Plan intervention')
  );
  const [note, setNote] = useState<string>(issue.human_decision?.note || '');
  const [reviewerName, setReviewerName] = useState<string>(
    issue.human_decision?.reviewer || 'Shri S. V. Kulkarni, IAS'
  );
  const [department, setDepartment] = useState<string>(
    issue.human_decision?.department || 'District Planning & Infrastructure Cell'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    const newDecision: HumanDecision = {
      id: `DEC-${Date.now().toString().slice(-4)}`,
      issue_id: issue.id,
      action,
      note: note.trim(),
      reviewer: reviewerName.trim() || 'Authorized District Planner',
      department: department.trim() || 'Civic Infrastructure Works Desk',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    onSaveDecision(newDecision);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full border border-[#D9E0E7] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B3D91] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base leading-tight">Official Human Review & Executive Decision</h3>
              <p className="text-xs text-blue-200">Issue ID: {issue.id} · {issue.area}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          {/* Section 1: AI Evidence Summary (Subordinate) */}
          <div className="bg-[#F5F7FA] border border-[#D9E0E7] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#0B3D91]" />
                <span>AI Evidence Summary (Advisory Input)</span>
              </span>
              <span className="text-xs font-mono text-slate-500">
                Confidence: <strong>{issue.evidence_confidence}%</strong>
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {issue.title} in {issue.area} ({issue.district} District).{' '}
              {issue.silent_need_flag
                ? 'Flagged for Possible Silent Need due to disproportionate infrastructure gap vs low reporting.'
                : `Corroborated by ${issue.report_count} clustered citizen reports.`}
            </p>

            {/* AI Suggested Action: Clearly labeled */}
            <div className="bg-white border border-blue-200 p-2.5 rounded text-xs">
              <span className="text-[10px] font-bold text-[#0B3D91] uppercase tracking-wider block">
                AI Suggestion (Not Autonomous Decision)
              </span>
              <span className="text-slate-900 font-semibold">{issue.ai_suggested_action}</span>
            </div>
          </div>

          {/* Section 2: Human Decision (VISUALLY DOMINANT) */}
          <div className="border-2 border-[#0B3D91] rounded-lg p-5 bg-blue-50/20 space-y-4">
            <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
              <FileCheck2 className="w-5 h-5 text-[#0B3D91]" />
              <h4 className="text-base font-bold text-[#163A5F]">
                Authorized Human Decision
              </h4>
            </div>

            {/* Action options */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Select Official Action:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  {
                    id: 'Field verification',
                    desc: 'Dispatch field inspection squad or municipal engineer to inspect area.',
                  },
                  {
                    id: 'Plan intervention',
                    desc: 'Allocate budget, prepare DPR or initiate repair tender scheme.',
                  },
                  {
                    id: 'Existing project sufficient',
                    desc: 'Existing ongoing scheme already covers this requirement.',
                  },
                  {
                    id: 'Need more information',
                    desc: 'Request additional citizen survey or local telemetry inspection.',
                  },
                  {
                    id: 'Other',
                    desc: 'Administrative deferral or inter-departmental transfer.',
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded border cursor-pointer transition-colors ${
                      action === item.id
                        ? 'bg-[#0B3D91] text-white border-[#0B3D91] font-semibold'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="official_action"
                      value={item.id}
                      checked={action === item.id}
                      onChange={(e) => setAction(e.target.value as any)}
                      className="mt-0.5 accent-amber-400"
                    />
                    <div>
                      <span className="block text-xs font-bold">{item.id}</span>
                      <span
                        className={`text-[11px] block leading-tight ${
                          action === item.id ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {item.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Official Decision Note */}
            <div>
              <label htmlFor="decision-note" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Official Decision Note & Directives: <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="decision-note"
                rows={3}
                required
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter formal directives, executing department instructions, or reason for action..."
                className="w-full text-xs p-3 border border-[#D9E0E7] rounded bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-hidden"
              />
            </div>

            {/* Reviewer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Reviewing Official:</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-[#0B3D91]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Department / Cell:</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded bg-white focus:ring-1 focus:ring-[#0B3D91]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#0B3D91] hover:bg-[#163A5F] rounded flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.saveDecision}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
