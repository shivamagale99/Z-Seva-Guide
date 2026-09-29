import React, { useState } from 'react';
import {
  GitMerge,
  FileText,
  CheckCircle2,
  ChevronRight,
  Layers,
  MapPin,
  Calendar,
  AlertCircle,
  HelpCircle,
  Split,
  Network,
  ShieldCheck,
  Building,
  Activity,
  ArrowRight,
  Info,
  Scale,
} from 'lucide-react';
import { Issue, CitizenReport, Language } from '../types';
import { translations } from '../i18n/translations';

interface IssueGraphProps {
  issues: Issue[];
  reports: CitizenReport[];
  currentLang: Language;
  onOpenReportDetail?: (report: CitizenReport) => void;
}

export const IssueGraph: React.FC<IssueGraphProps> = ({
  issues,
  reports,
  currentLang,
  onOpenReportDetail,
}) => {
  const t = translations[currentLang];
  const [selectedIssueId, setSelectedIssueId] = useState<string>('ISSUE-KHANDALA-ROAD');
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [showSemanticExplainer, setShowSemanticExplainer] = useState(true);

  const selectedIssue = issues.find((i) => i.id === selectedIssueId) || issues[0];
  const linkedReports = reports.filter((r) => r.issue_id === selectedIssue.id);

  // Filter linked reports if searching
  const displayedReports = linkedReports.filter((r) =>
    r.text.toLowerCase().includes(filterQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const activeReport =
    displayedReports.find((r) => r.id === activeReportId) || displayedReports[0] || linkedReports[0];

  return (
    <div className="bg-white border-2 border-[#D9E0E7] rounded-xl shadow-xs overflow-hidden space-y-0">
      {/* 1. Header Bar: Citizen Reports ≠ Underlying Issues */}
      <div className="p-5 sm:p-6 bg-slate-50 border-b border-[#D9E0E7]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#0B3D91] text-white rounded-md">
                <Network className="w-5 h-5 text-amber-400" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Core Structural Law
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#163A5F] mt-0.5">
                  Citizen Reports ≠ Underlying Issues
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              A civic administration cannot treat every complaint as an isolated repair ticket.
              The Issue Graph performs semantic, geographic, and temporal synthesis to group multiple citizen reports into single root community problems.
            </p>
          </div>

          {/* Issue Selector Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 self-start lg:self-auto bg-white p-2 rounded-lg border border-[#D9E0E7]">
            <label htmlFor="issue-graph-select" className="text-xs font-bold text-slate-700 whitespace-nowrap">
              Active Issue Node:
            </label>
            <select
              id="issue-graph-select"
              value={selectedIssueId}
              onChange={(e) => {
                setSelectedIssueId(e.target.value);
                setActiveReportId(null);
                setFilterQuery('');
              }}
              className="text-xs font-semibold bg-slate-50 border border-[#D9E0E7] rounded px-3 py-1.5 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-[#0B3D91]"
            >
              {issues.map((iss) => (
                <option key={iss.id} value={iss.id}>
                  {iss.id} — {iss.category} ({iss.area})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. Visual Synthesis Pipeline Bar */}
        <div className="mt-5 p-4 bg-white rounded-lg border border-[#D9E0E7] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
            <span className="px-3 py-1.5 bg-[#0B3D91] text-white font-mono font-bold rounded text-xs sm:text-sm shadow-xs">
              {selectedIssue.report_count} Citizen Reports
            </span>
            <span className="text-slate-400 font-bold">→</span>
            <span className="px-3 py-1.5 bg-blue-50 text-[#0B3D91] font-semibold rounded border border-blue-200">
              AI Semantic + Spatial &lt;400m + Temporal Synthesis
            </span>
            <span className="text-slate-400 font-bold">→</span>
            <span className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold rounded text-xs sm:text-sm shadow-xs">
              1 Root Underlying Issue
            </span>
          </div>

          {/* VISUALLY OBVIOUS DISTINCTION: Evidence Confidence vs Priority/Need Signal */}
          <div className="flex items-center gap-3 text-xs border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
            <div className="p-2 bg-blue-50 rounded border border-blue-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Evidence Confidence
              </span>
              <span className="font-mono text-base font-extrabold text-[#0B3D91] tabular-nums">
                {selectedIssue.evidence_confidence}%
              </span>
              <span className="text-[10px] text-slate-500 block">Empirical support</span>
            </div>

            <div className="p-2 bg-amber-50 rounded border border-amber-300">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">
                Need / Priority Signal
              </span>
              <span className="font-mono text-base font-extrabold text-amber-700 tabular-nums">
                {selectedIssue.priority_signal} / 100
              </span>
              <span className="text-[10px] text-amber-800 block">Planning model</span>
            </div>
          </div>
        </div>

        {/* 3. Semantic Clustering Rule Box (Important constraint) */}
        {showSemanticExplainer && (
          <div className="mt-4 p-4 bg-amber-50/70 border border-amber-300 rounded-lg text-xs space-y-2 relative">
            <button
              type="button"
              onClick={() => setShowSemanticExplainer(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 text-xs font-bold"
              aria-label="Dismiss rule banner"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Semantic Clustering Principle: Meaning & Location Over Lazy Keyword Matching</span>
            </div>
            <p className="text-slate-800 leading-relaxed">
              Do not simply group reports because they contain the same keyword. The system evaluates <strong>meaning, location, and context</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 bg-white rounded border border-emerald-300 space-y-1">
                <span className="font-bold text-emerald-900 block text-[11px]">
                  ✓ Correctly Grouped into 1 Underlying Road Issue:
                </span>
                <p className="text-[11px] text-slate-700 italic">
                  “Road full of potholes” · “Road becomes dangerous after rain” · “School road is unusable”
                </p>
                <span className="text-[10px] text-emerald-800 block">
                  All 3 describe one root access problem in Khandala Bypass because location (&lt; 350m) and context align.
                </span>
              </div>

              <div className="p-2.5 bg-white rounded border border-rose-300 space-y-1">
                <span className="font-bold text-rose-900 block text-[11px]">
                  ✗ Never Grouped (Spatial Boundary Enforced):
                </span>
                <p className="text-[11px] text-slate-700 italic">
                  Two complaints both mentioning “road”, but one in Nashik Central and one in Khandala Ghat.
                </p>
                <span className="text-[10px] text-rose-800 block">
                  Separated into distinct civic nodes because geographic coordinates and jurisdictions do not overlap.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Visual Graph Core Viewport */}
      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Individual Citizen Reports (Source Nodes) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Individual Citizen Reports
              </span>
              <span className="text-[11px] text-slate-500">
                {linkedReports.length} supporting testimonies linked
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Source Nodes
            </span>
          </div>

          {/* Search/filter within reports */}
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter testimonies by text..."
            className="w-full text-xs p-2 border border-[#D9E0E7] rounded bg-slate-50 focus:outline-hidden focus:ring-1 focus:ring-[#0B3D91]"
          />

          {/* List of Report Nodes with connection lines styling */}
          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {displayedReports.length > 0 ? (
              displayedReports.map((rep) => {
                const isSelected = activeReport?.id === rep.id;
                return (
                  <div
                    key={rep.id}
                    onClick={() => setActiveReportId(rep.id)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all relative ${
                      isSelected
                        ? 'border-[#0B3D91] bg-blue-50/70 shadow-xs ring-1 ring-[#0B3D91]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-mono font-bold text-[#0B3D91]">{rep.id}</span>
                      <span className="text-[10px] text-slate-500 px-1.5 py-0.2 bg-slate-100 rounded">
                        {rep.language.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-slate-800 line-clamp-2 leading-relaxed font-medium">
                      “{rep.text}”
                    </p>

                    <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span>{rep.timestamp}</span>
                      <span className="font-semibold text-emerald-700">
                        {rep.ai_confidence}% semantic match
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded border border-dashed border-slate-200">
                No reports matching “{filterQuery}”.
              </div>
            )}
          </div>
        </div>

        {/* Center Column: Synthesizing Relationship Engine (Clustering Metrics) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center p-5 bg-[#F5F7FA] rounded-xl border border-[#D9E0E7] space-y-4">
          <div className="text-center">
            <span className="p-2 bg-white rounded-full border border-slate-200 inline-block shadow-2xs mb-1">
              <GitMerge className="w-5 h-5 text-[#0B3D91]" />
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Synthesis Bridge
            </span>
            <span className="text-[10px] text-slate-500">
              Correlation parameters
            </span>
          </div>

          {/* Relationship Metrics */}
          <div className="w-full space-y-2.5 text-xs">
            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Semantic Similarity</span>
                <span className="font-mono font-bold text-emerald-700">94%</span>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[94%]" />
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Spatial Radius</span>
                <span className="font-mono font-bold text-[#0B3D91]">&lt; 350 meters</span>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-[#0B3D91] h-full w-[85%]" />
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Temporal Coincidence</span>
                <span className="font-mono font-bold text-amber-700">48-hour cluster</span>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[90%]" />
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Duplicate Filter</span>
                <span className="font-mono font-bold text-slate-800">Redundancy merged</span>
              </div>
              <span className="text-[10px] text-slate-500 block">
                Identical phrases de-duplicated to prevent synthetic volume spikes.
              </span>
            </div>
          </div>

          <div className="w-full pt-1 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B3D91] text-white text-[11px] font-bold">
              <span>{selectedIssue.report_count} Reports → 1 Issue Node</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Right Column: Detected Common Issue (Target Root Node) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#0B3D91] rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
          {/* Top Lockup */}
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedIssue.id}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                  {selectedIssue.category}
                </span>
              </div>
              <span className="text-[11px] font-bold text-amber-800 block mt-1">
                Detected Root Issue
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
              {selectedIssue.status}
            </span>
          </div>

          {/* Issue Title */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#163A5F] leading-snug">
              {selectedIssue.title}
            </h3>
          </div>

          {/* Comprehensive Required Metadata Table */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-[#F5F7FA] p-3.5 rounded-lg border border-[#D9E0E7]">
            <div>
              <span className="text-slate-500 text-[11px] block">Location:</span>
              <strong className="text-slate-800 block">{selectedIssue.area}</strong>
              <span className="text-[10px] text-slate-500">{selectedIssue.district} District · {selectedIssue.block}</span>
            </div>

            <div>
              <span className="text-slate-500 text-[11px] block">Supporting Reports:</span>
              <strong className="text-slate-800 block font-mono text-sm">{selectedIssue.report_count} testimonies</strong>
              <span className="text-[10px] text-slate-500">1 unique root problem identified</span>
            </div>

            <div>
              <span className="text-slate-500 text-[11px] block">Infrastructure Context:</span>
              <strong className="text-rose-700 font-mono block">{selectedIssue.factors.infrastructure_gap}% deficit</strong>
              <span className="text-[10px] text-slate-500">Surveys & physical telemetry</span>
            </div>

            <div>
              <span className="text-slate-500 text-[11px] block">Silent Need Status:</span>
              <strong className={`block ${selectedIssue.silent_need_flag ? 'text-amber-800 font-bold' : 'text-slate-700'}`}>
                {selectedIssue.silent_need_flag ? 'Possible Silent Need' : 'Demand Corroborated'}
              </strong>
              <span className="text-[10px] text-slate-500">
                {selectedIssue.silent_need_verification_state || 'Standard'}
              </span>
            </div>

            <div className="col-span-2 pt-2 border-t border-slate-200">
              <span className="text-slate-500 text-[11px] block">Related Project Scheme Status:</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-semibold text-slate-800">
                  {selectedIssue.existing_project_name || 'No sanctioned scheme directly covers this issue'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-300">
                  {selectedIssue.existing_project_status}
                </span>
              </div>
            </div>

            <div className="col-span-2 pt-2 border-t border-slate-200">
              <span className="text-slate-500 text-[11px] block">Current Government-Review Status:</span>
              {selectedIssue.human_decision ? (
                <div className="mt-1 p-2 bg-emerald-50 rounded border border-emerald-300 text-[11px]">
                  <span className="font-bold text-emerald-950 block">
                    Official Decision: {selectedIssue.human_decision.action}
                  </span>
                  <p className="text-slate-700 italic">“{selectedIssue.human_decision.note}”</p>
                  <span className="text-[10px] text-emerald-800 block mt-0.5">
                    By: {selectedIssue.human_decision.reviewer} ({selectedIssue.human_decision.department}) · {selectedIssue.human_decision.timestamp}
                  </span>
                </div>
              ) : (
                <span className="text-amber-800 font-semibold block text-xs mt-0.5">
                  Pending formal executive decision by reviewing officer
                </span>
              )}
            </div>
          </div>

          {/* AI Suggested Action Advisory */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded text-xs">
            <span className="text-[10px] font-bold text-[#0B3D91] uppercase tracking-wider block mb-0.5">
              Advisory Action Suggestion
            </span>
            <p className="text-slate-900 font-medium">
              {selectedIssue.ai_suggested_action}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Deep-Dive Inspection of Selected Source Report */}
      {activeReport && (
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-[#D9E0E7] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0B3D91]" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Raw Citizen Testimony Detail: <span className="font-mono text-[#0B3D91]">{activeReport.id}</span>
              </h4>
            </div>
            <span className="text-xs text-slate-500">{activeReport.timestamp}</span>
          </div>

          <p className="text-xs text-slate-900 bg-white p-3.5 rounded-lg border border-[#D9E0E7] italic leading-relaxed">
            “{activeReport.text}”
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            <div>
              <strong>Original Language:</strong> {activeReport.detectedLanguage || activeReport.language.toUpperCase()}
            </div>
            <div>
              <strong>AI Synthesized Summary:</strong> {activeReport.ai_summary}
            </div>
            <div>
              <strong>Location:</strong> {activeReport.area} ({activeReport.district})
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
