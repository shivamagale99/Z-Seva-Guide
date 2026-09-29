import React from 'react';
import { AlertTriangle, CheckCircle, Search, ArrowRight, ShieldAlert, Info } from 'lucide-react';
import { Issue, Language } from '../types';
import { translations } from '../i18n/translations';

interface SilentNeedCardProps {
  issue: Issue;
  currentLang: Language;
  onInspect: (issue: Issue) => void;
  onVerify?: (issue: Issue) => void;
}

export const SilentNeedCard: React.FC<SilentNeedCardProps> = ({
  issue,
  currentLang,
  onInspect,
  onVerify,
}) => {
  const t = translations[currentLang];

  return (
    <div className="bg-white border-2 border-amber-300 rounded-lg p-5 shadow-xs relative overflow-hidden transition-all hover:border-amber-400">
      {/* Top Warning Banner */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-100 rounded text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-700" aria-hidden="true" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {t.possibleSilentNeed}
            </span>
            <h4 className="text-base font-bold text-[#163A5F]">{issue.area}</h4>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded">
          {issue.category}
        </span>
      </div>

      {/* Grid of 4 Key Evidence Signals */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F5F7FA] p-3 rounded-md border border-[#D9E0E7] text-xs">
        <div>
          <span className="text-slate-500 block">Citizen Reports</span>
          <span className="text-base font-bold font-mono text-slate-800 tabular-nums">
            {issue.report_count}
          </span>
          <span className="block text-[11px] text-amber-700 font-semibold">{t.unusuallyLow}</span>
        </div>

        <div>
          <span className="text-slate-500 block">Infrastructure Gap</span>
          <span className="text-base font-bold font-mono text-rose-700 tabular-nums">
            {issue.factors.infrastructure_gap}%
          </span>
          <span className="block text-[11px] text-rose-600 font-semibold">Critical deficit</span>
        </div>

        <div>
          <span className="text-slate-500 block">Digital Access</span>
          <span className="text-base font-bold text-slate-800">Low</span>
          <span className="block text-[11px] text-slate-500">Participation barrier</span>
        </div>

        <div>
          <span className="text-slate-500 block">Existing Project</span>
          <span className="text-base font-bold text-slate-800">
            {issue.existing_project_status === 'Not Covered' ? 'None Identified' : issue.existing_project_status}
          </span>
          <span className="block text-[11px] text-slate-500">Needs intervention</span>
        </div>
      </div>

      {/* Show WHY Box */}
      <div className="mt-3.5 bg-amber-50/80 border border-amber-200 p-3 rounded text-xs space-y-1">
        <span className="font-bold text-amber-950 uppercase text-[10px] tracking-wider block">
          Why was this flagged?
        </span>
        <ul className="text-slate-800 space-y-0.5 text-[11px] list-disc pl-4">
          <li><strong>Very high infrastructure gap:</strong> {issue.factors.infrastructure_gap}% deficit in essential civic services.</li>
          <li><strong>Low reporting relative to comparable areas:</strong> Only {issue.report_count} citizen filings recorded.</li>
          <li><strong>Low digital access:</strong> Limited smartphone/telecom infrastructure suppresses digital grievances.</li>
          <li><strong>No matching project found:</strong> {issue.existing_project_status === 'Not Covered' ? 'No active government project addresses this location.' : issue.existing_project_status}</li>
        </ul>
      </div>

      {/* RECOMMENDED NEXT STEP callout */}
      <div className="mt-3 bg-amber-100/90 border border-amber-300 p-2.5 rounded text-xs flex items-center justify-between">
        <div>
          <span className="font-mono font-bold text-amber-900 block text-[10px] uppercase">
            Action Protocol
          </span>
          <strong className="text-amber-950 text-xs">
            RECOMMENDED NEXT STEP: Field verification
          </strong>
        </div>
        <button
          type="button"
          onClick={() => onInspect(issue)}
          className="inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-bold bg-[#0B3D91] text-white hover:bg-[#163A5F] transition-colors"
        >
          <span>{t.ctaViewEvidence}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Distinction between Evidence Confidence vs Priority Signal */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-slate-500 block text-[11px]">{t.evidenceConfidence}</span>
            <span className="font-bold font-mono text-[#0B3D91] text-sm tabular-nums">
              {issue.evidence_confidence}%
            </span>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-slate-500 block text-[11px]">{t.prioritySignal}</span>
            <span className="font-bold font-mono text-amber-700 text-sm tabular-nums">
              {issue.priority_signal} / 100
            </span>
          </div>
        </div>

        <span className="text-[11px] text-slate-500 font-medium">
          Status: <strong>{issue.silent_need_verification_state || 'Possible Silent Need'}</strong>
        </span>
      </div>

      {/* Bottom Mandatory Disclaimer */}
      <div className="mt-3 bg-slate-50 border border-slate-200 px-3 py-2 rounded text-[11px] text-slate-700 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-[#0B3D91] shrink-0 mt-0.5" />
        <p className="leading-tight">
          «Never automatically call this area the highest priority. Never treat Silent Need as proof. It is an evidence signal that requires human verification.»
        </p>
      </div>
    </div>
  );
};
