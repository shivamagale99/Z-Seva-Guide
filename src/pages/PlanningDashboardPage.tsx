import React, { useState } from 'react';
import {
  FileText,
  GitMerge,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck,
  Info,
  Layers,
  ChevronRight,
  Sparkles,
  Map as MapIcon,
  Table as TableIcon,
  HelpCircle,
  AlertCircle,
  Eye,
  Filter,
  Search,
  ExternalLink,
  ChevronDown,
  Building2,
  Activity,
  CheckCircle,
  Send,
} from 'lucide-react';
import { Issue, Language, PriorityWeights, UserRole, ExistingProjectStatus } from '../types';
import { translations } from '../i18n/translations';
import { CivicMap } from '../components/CivicMap';

interface PlanningDashboardPageProps {
  issues: Issue[];
  currentLang: Language;
  userRole: UserRole;
  priorityWeights: PriorityWeights;
  onOpenWeightConfig: () => void;
  onOpenHumanDecision: (issue: Issue) => void;
  onInspectIssue: (issue: Issue) => void;
}

type InquiryQuestion =
  | 'all'
  | 'what'
  | 'where'
  | 'evidence'
  | 'existing'
  | 'missing'
  | 'verify';

export const PlanningDashboardPage: React.FC<PlanningDashboardPageProps> = ({
  issues,
  currentLang,
  userRole,
  priorityWeights,
  onOpenWeightConfig,
  onOpenHumanDecision,
  onInspectIssue,
}) => {
  const t = translations[currentLang];

  // Primary view mode: Priority Table vs Map View vs What Are We Missing View
  const [viewMode, setViewMode] = useState<'table' | 'map' | 'missing'>('table');
  const [activeInquiry, setActiveInquiry] = useState<InquiryQuestion>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIssueId, setSelectedIssueId] = useState<string>(issues[0]?.id || 'ISSUE-W-014');

  // Filter issues based on search, filters, and active inquiry question
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' || issue.category === categoryFilter;

    const matchesStatus =
      statusFilter === 'All' ||
      issue.silent_need_verification_state === statusFilter ||
      issue.status === statusFilter;

    // Inquiry filter mapping
    if (activeInquiry === 'missing') return matchesSearch && matchesCategory && issue.silent_need_flag;
    if (activeInquiry === 'existing')
      return matchesSearch && matchesCategory && issue.existing_project_status !== 'Not Covered';
    if (activeInquiry === 'verify')
      return matchesSearch && matchesCategory && !issue.human_decision;
    if (activeInquiry === 'evidence')
      return matchesSearch && matchesCategory && issue.evidence_confidence >= 80;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const selectedIssue =
    issues.find((i) => i.id === selectedIssueId) || issues[0];

  const silentNeedsList = issues.filter((i) => i.silent_need_flag);
  const areasRequiringReview = issues.filter((i) => !i.human_decision).length;
  const totalReportsCount = issues.reduce((acc, curr) => acc + curr.report_count, 0);

  // Helper for determining the Next Step recommendation tag
  const getNextStepRecommendation = (issue: Issue): string => {
    if (issue.silent_need_flag) return 'Field verification';
    if (issue.existing_project_status === 'Planned but Delayed') return 'Accelerate existing project';
    if (issue.existing_project_status === 'Partially Covered') return 'Extend existing project';
    if (issue.existing_project_status === 'Covered') return 'Review evidence & monitor progress';
    if (issue.report_count >= 10) return 'Bundle nearby issues & plan intervention';
    return 'Request more information';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Header & Non-Negotiable Governance Disclaimer */}
      <div className="bg-[#163A5F] text-white p-6 sm:p-8 rounded-xl shadow-md border-b-4 border-amber-400 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-blue-900/60 border border-blue-400/40 text-xs font-semibold text-amber-300 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Evidence-Based Decision Support Interface · GIGW 3.0 Standard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.planningTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Synthesizing citizen grievances with infrastructure context, physical deficit indicators, and existing project coverage to inform human administrative decisions.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={onOpenWeightConfig}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded hover:bg-amber-300 transition-colors shadow-xs"
            >
              <Sliders className="w-4 h-4" />
              <span>{t.adjustWeights}</span>
            </button>
          </div>
        </div>

        {/* Non-Negotiable Mandate Banner */}
        <div className="bg-blue-900/80 border border-blue-400/30 p-3 rounded-lg text-xs text-blue-100 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Decision-Support Notice:</strong> This dashboard does <u>not</u> make final policy, budget, or procurement decisions. It organizes evidence to empower authorized district officers, collectors, and engineers to verify ground realities before committing public resources.
          </p>
        </div>

        {/* 6 Core Questions Guide Bar */}
        <div className="pt-2 border-t border-slate-700/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-2">
            Inquiry Filter: What question are you answering?
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            {[
              { id: 'what', label: '“What is happening?”', sub: 'Review active issue categories' },
              { id: 'where', label: '“Where is it happening?”', sub: 'Inspect spatial locations' },
              { id: 'evidence', label: '“How strong is evidence?”', sub: 'Filter high confidence' },
              { id: 'existing', label: '“Is this addressed?”', sub: 'Check active project schemes' },
              { id: 'missing', label: '“What might we miss?”', sub: 'Surface silent needs' },
              { id: 'verify', label: '“What to verify?”', sub: 'Action pending review' },
            ].map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setActiveInquiry(activeInquiry === q.id ? 'all' : (q.id as InquiryQuestion));
                  if (q.id === 'missing') setViewMode('missing');
                  else if (q.id === 'where') setViewMode('map');
                }}
                className={`p-2.5 rounded text-left border transition-all ${
                  activeInquiry === q.id
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-xs'
                    : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                }`}
              >
                <span className="font-bold block text-xs">{q.label}</span>
                <span
                  className={`text-[10px] block leading-tight mt-0.5 ${
                    activeInquiry === q.id ? 'text-slate-900' : 'text-slate-300'
                  }`}
                >
                  {q.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Top Metric Overview Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
        <div className="bg-white p-4 rounded-lg border border-[#D9E0E7] shadow-xs">
          <span className="text-slate-500 block mb-0.5">Citizen Reports</span>
          <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
            {totalReportsCount}
          </span>
          <span className="text-[11px] text-slate-500 block">Raw multilingual inputs</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#D9E0E7] shadow-xs">
          <span className="text-slate-500 block mb-0.5">Unique Issue Clusters</span>
          <span className="font-mono text-2xl font-bold text-[#0B3D91] tabular-nums">
            {issues.length}
          </span>
          <span className="text-[11px] text-slate-500 block">Root community problems</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#D9E0E7] shadow-xs">
          <span className="text-slate-500 block mb-0.5">Silent Need Alerts</span>
          <span className="font-mono text-2xl font-bold text-amber-700 tabular-nums">
            {silentNeedsList.length}
          </span>
          <span className="text-[11px] text-amber-800 font-semibold block">High gap · Low reports</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#D9E0E7] shadow-xs">
          <span className="text-slate-500 block mb-0.5">Existing Projects Covered</span>
          <span className="font-mono text-2xl font-bold text-emerald-700 tabular-nums">
            {issues.filter((i) => i.existing_project_status === 'Covered' || i.existing_project_status === 'Partially Covered').length}
          </span>
          <span className="text-[11px] text-emerald-800 font-semibold block">Scheme active/planned</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#D9E0E7] shadow-xs col-span-2 md:col-span-1">
          <span className="text-slate-500 block mb-0.5">Pending Human Verification</span>
          <span className="font-mono text-2xl font-bold text-rose-700 tabular-nums">
            {areasRequiringReview}
          </span>
          <span className="text-[11px] text-rose-700 font-semibold block">Awaiting sign-off</span>
        </div>
      </div>

      {/* 3. Primary View Mode Tabs & Filter Strip */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E0E7] pb-2">
          {/* Main View Mode Selector */}
          <div className="flex items-center gap-1 bg-[#F5F7FA] border border-[#D9E0E7] p-1 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-[#0B3D91] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>1. Priority & Need Table</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-[#0B3D91] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>2. Spatial Territory Map</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('missing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold transition-colors ${
                viewMode === 'missing'
                  ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>3. What Might We Be Missing? ({silentNeedsList.length})</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Showing <strong>{filteredIssues.length}</strong> of {issues.length} issue clusters
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-3.5 rounded-lg border border-[#D9E0E7] grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="relative sm:col-span-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search area, village, or issue ID..."
              className="w-full pl-8 pr-3 py-1.5 border border-[#D9E0E7] rounded bg-white focus:ring-1 focus:ring-[#0B3D91]"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-1.5 border border-[#D9E0E7] rounded bg-white text-slate-700"
            >
              <option value="All">All Categories</option>
              <option value="Drinking Water">Drinking Water</option>
              <option value="Roads & Transport">Roads & Transport</option>
              <option value="Drainage & Sanitation">Drainage & Sanitation</option>
              <option value="Healthcare Access">Healthcare Access</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-1.5 border border-[#D9E0E7] rounded bg-white text-slate-700"
            >
              <option value="All">All Verification States</option>
              <option value="Possible Silent Need">Possible Silent Need</option>
              <option value="Needs Field Visit">Needs Field Visit</option>
              <option value="Verified">Verified</option>
              <option value="Already Addressed">Already Addressed</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. VIEW 1: PRIORITY & NEED TABLE (10 Columns) */}
      {viewMode === 'table' && (
        <div className="bg-white border border-[#D9E0E7] rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#163A5F] text-white font-semibold">
                <tr>
                  <th scope="col" className="p-3 border-b border-blue-900">Area</th>
                  <th scope="col" className="p-3 border-b border-blue-900">Detected Common Issue</th>
                  <th scope="col" className="p-3 border-b border-blue-900 text-center">Issue Clusters</th>
                  <th scope="col" className="p-3 border-b border-blue-900 text-right">Infra Gap</th>
                  <th scope="col" className="p-3 border-b border-blue-900 text-right">Reports</th>
                  <th scope="col" className="p-3 border-b border-blue-900">Existing Project Coverage</th>
                  <th scope="col" className="p-3 border-b border-blue-900 text-right">Evidence Conf.</th>
                  <th scope="col" className="p-3 border-b border-blue-900 text-right">Priority Signal</th>
                  <th scope="col" className="p-3 border-b border-blue-900 text-center">Verification Status</th>
                  <th scope="col" className="p-3 border-b border-blue-900 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E0E7]">
                {filteredIssues.map((issue) => {
                  const isSelected = selectedIssue?.id === issue.id;
                  return (
                    <tr
                      key={issue.id}
                      onClick={() => setSelectedIssueId(issue.id)}
                      className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/70 font-medium' : issue.silent_need_flag ? 'bg-amber-50/20' : ''
                      }`}
                    >
                      {/* 1. Area */}
                      <td className="p-3 font-semibold text-slate-900">
                        <span className="block text-[#163A5F]">{issue.area}</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {issue.district} Dist · {issue.block}
                        </span>
                      </td>

                      {/* 2. Detected Issue */}
                      <td className="p-3 max-w-xs">
                        <span className="font-semibold text-slate-800 line-clamp-1 block">{issue.title}</span>
                        <span className="text-[10px] text-slate-500">
                          {issue.category} · Ref: <span className="font-mono">{issue.id}</span>
                        </span>
                      </td>

                      {/* 3. Issue Clusters */}
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-mono font-bold text-slate-700">
                          1 Root Node
                        </span>
                      </td>

                      {/* 4. Infrastructure Gap */}
                      <td className="p-3 text-right">
                        <span
                          className={`font-mono font-bold tabular-nums ${
                            issue.factors.infrastructure_gap >= 80 ? 'text-rose-700 text-sm' : 'text-slate-800'
                          }`}
                        >
                          {issue.factors.infrastructure_gap}%
                        </span>
                      </td>

                      {/* 5. Citizen Reports */}
                      <td className="p-3 text-right font-mono font-bold text-slate-800 tabular-nums">
                        {issue.report_count}
                      </td>

                      {/* 6. Existing Project Coverage */}
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            issue.existing_project_status === 'Covered'
                              ? 'bg-emerald-100 text-emerald-900'
                              : issue.existing_project_status === 'Partially Covered'
                              ? 'bg-blue-100 text-blue-900'
                              : issue.existing_project_status === 'Planned but Delayed'
                              ? 'bg-rose-100 text-rose-900'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {issue.existing_project_status}
                        </span>
                        {issue.existing_project_name && (
                          <span className="text-[10px] text-slate-500 block truncate max-w-[140px] mt-0.5">
                            {issue.existing_project_name}
                          </span>
                        )}
                      </td>

                      {/* 7. Evidence Confidence */}
                      <td className="p-3 text-right font-mono font-bold text-[#0B3D91] tabular-nums">
                        {issue.evidence_confidence}%
                      </td>

                      {/* 8. Priority Signal */}
                      <td className="p-3 text-right font-mono font-bold text-amber-700 tabular-nums">
                        {issue.priority_signal} / 100
                      </td>

                      {/* 9. Verification Status */}
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            issue.silent_need_verification_state === 'Possible Silent Need'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : issue.silent_need_verification_state === 'Needs Field Visit'
                              ? 'bg-rose-100 text-rose-900 border border-rose-300'
                              : issue.silent_need_verification_state === 'Verified'
                              ? 'bg-blue-100 text-blue-900 border border-blue-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {issue.silent_need_verification_state || 'Possible Silent Need'}
                        </span>
                      </td>

                      {/* 10. Actions */}
                      <td className="p-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspectIssue(issue);
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-[#0B3D91] hover:underline"
                        >
                          Evidence →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. VIEW 2: SPATIAL MAP VIEW */}
      {viewMode === 'map' && (
        <div className="space-y-4">
          <CivicMap
            issues={filteredIssues}
            currentLang={currentLang}
            onSelectArea={(areaName) => {
              const found = issues.find((i) => i.area === areaName);
              if (found) setSelectedIssueId(found.id);
            }}
            selectedAreaName={selectedIssue?.area}
          />
        </div>
      )}

      {/* 4. VIEW 3: DEDICATED "WHAT MIGHT WE BE MISSING?" SECTION */}
      {viewMode === 'missing' && (
        <div className="bg-amber-50/70 border-2 border-amber-300 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-200 text-amber-950 text-xs font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-800" />
              <span>GAPS & SILENT NEEDS SURFACING</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-amber-950">
              What Might We Be Missing?
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Public administrations often suffer from structural blind spots: digital exclusion, missing groundwater surveys, or unverified project closures. This view surfaces areas where infrastructure deficit is severe but reporting is suppressed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {silentNeedsList.map((iss) => (
              <div
                key={iss.id}
                onClick={() => setSelectedIssueId(iss.id)}
                className={`p-4 rounded-lg bg-white border-2 cursor-pointer transition-all space-y-3 ${
                  selectedIssue?.id === iss.id ? 'border-amber-500 shadow-sm' : 'border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#0B3D91]">{iss.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                    {iss.silent_need_verification_state}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#163A5F]">{iss.area}</h3>
                <span className="text-[11px] text-slate-500 block">{iss.category}</span>

                <div className="p-2 bg-amber-50/60 rounded border border-amber-200 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Physical Gap:</span>
                    <strong className="text-rose-700">{iss.factors.infrastructure_gap}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Report Volume:</span>
                    <strong className="text-amber-800">{iss.report_count} reports (Low)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Digital Access:</span>
                    <strong className="text-slate-800">{iss.digital_access}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-semibold">{iss.data_reliability}</span>
                  <span className="text-[#0B3D91] font-bold">Inspect Evidence →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DEDICATED 4-PART EVIDENCE PANEL FOR THE SELECTED ISSUE */}
      {selectedIssue && (
        <section
          aria-labelledby="evidence-panel-heading"
          className="bg-white border-2 border-[#0B3D91] rounded-xl p-6 sm:p-8 shadow-sm space-y-6"
        >
          {/* Panel Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 bg-blue-100 text-[#0B3D91] rounded font-mono text-xs font-bold">
                  {selectedIssue.id}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                  {selectedIssue.category}
                </span>
                {selectedIssue.silent_need_flag && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    Silent Need Alert
                  </span>
                )}
              </div>
              <h2 id="evidence-panel-heading" className="text-xl sm:text-2xl font-bold text-[#163A5F] mt-1">
                {selectedIssue.title}
              </h2>
              <span className="text-xs text-slate-500">
                Location: <strong>{selectedIssue.area}</strong> ({selectedIssue.district} District · {selectedIssue.block})
              </span>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => onInspectIssue(selectedIssue)}
                className="px-3.5 py-2 text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 rounded border border-slate-300"
              >
                Inspect All {selectedIssue.report_count} Reports
              </button>

              {userRole !== 'citizen' && (
                <button
                  type="button"
                  onClick={() => onOpenHumanDecision(selectedIssue)}
                  className="px-4 py-2 text-xs font-bold bg-[#0B3D91] text-white hover:bg-[#163A5F] rounded flex items-center gap-1.5 shadow-xs"
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>{selectedIssue.human_decision ? 'Update Official Decision' : 'Record Official Decision'}</span>
                </button>
              )}
            </div>
          </div>

          {/* THE 4 REQUIRED PANELS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* 1. WHY THIS ISSUE IS VISIBLE */}
            <div className="bg-[#F5F7FA] border border-[#D9E0E7] rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1.5 font-bold text-[#163A5F]">
                <Activity className="w-4 h-4 text-[#0B3D91]" />
                <span className="uppercase text-[11px] tracking-wider">Why This Issue Is Visible</span>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-slate-500 block text-[11px]">Citizen Reports:</span>
                  <strong className="text-slate-900 font-mono text-sm">
                    {selectedIssue.report_count} Filings
                  </strong>
                  <span className="text-[10px] text-slate-500 block">{selectedIssue.reporting_rate}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Geographic Concentration:</span>
                  <strong className="text-slate-800 block">Tight spatial radius (&lt; 350m)</strong>
                  <span className="text-[10px] text-slate-500">{selectedIssue.area} cluster</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Infrastructure Indicator:</span>
                  <strong className="text-rose-700 font-mono text-sm block">
                    {selectedIssue.factors.infrastructure_gap}% physical gap
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Urgency Indicator:</span>
                  <strong className="text-slate-900 block font-mono">
                    {selectedIssue.factors.urgency}% life-safety index
                  </strong>
                </div>
              </div>
            </div>

            {/* 2. WHAT MIGHT BE MISSING */}
            <div className="bg-amber-50/60 border border-amber-300 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-1.5 border-b border-amber-200 pb-1.5 font-bold text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span className="uppercase text-[11px] tracking-wider">What Might Be Missing</span>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-slate-600 block text-[11px]">Possible Silent Need:</span>
                  <strong className={`block ${selectedIssue.silent_need_flag ? 'text-amber-900 font-bold' : 'text-slate-700'}`}>
                    {selectedIssue.silent_need_flag ? 'Flagged for verification' : 'None detected'}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-600 block text-[11px]">Low Reporting Area Assessment:</span>
                  <strong className="text-slate-800 block">
                    {selectedIssue.digital_access === 'Low'
                      ? 'Severe participation barrier (low digital access)'
                      : `${selectedIssue.digital_access} digital connectivity`}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-600 block text-[11px]">Missing Infrastructure Data:</span>
                  <strong className="text-slate-800 block">
                    {selectedIssue.data_reliability === 'Needs verification'
                      ? 'Groundwater yield telemetry unverified'
                      : 'Audited municipal asset register'}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-600 block text-[11px]">Unverified Project Status:</span>
                  <strong className="text-slate-800 block">
                    {selectedIssue.existing_project_status === 'Not Covered'
                      ? 'No matching scheme found'
                      : 'Subject to sanction audit'}
                  </strong>
                </div>
              </div>
            </div>

            {/* 3. EXISTING RESPONSE */}
            <div className="bg-[#F5F7FA] border border-[#D9E0E7] rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1.5 font-bold text-[#163A5F]">
                <Building2 className="w-4 h-4 text-[#0B3D91]" />
                <span className="uppercase text-[11px] tracking-wider">Existing Response</span>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-slate-500 block text-[11px]">Coverage State:</span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold mt-0.5 ${
                      selectedIssue.existing_project_status === 'Covered'
                        ? 'bg-emerald-100 text-emerald-900'
                        : selectedIssue.existing_project_status === 'Partially Covered'
                        ? 'bg-blue-100 text-blue-900'
                        : selectedIssue.existing_project_status === 'Planned but Delayed'
                        ? 'bg-rose-100 text-rose-900'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {selectedIssue.existing_project_status === 'Not Covered'
                      ? 'No project found'
                      : selectedIssue.existing_project_status}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Sanctioned Scheme Name:</span>
                  <p className="font-semibold text-slate-800 mt-0.5 leading-snug">
                    {selectedIssue.existing_project_name || 'No scheme registered'}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Budget Sanction Audit:</span>
                  <span className="text-slate-700 italic block mt-0.5">
                    {selectedIssue.existing_project_budget || 'Data unavailable'}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. NEXT STEP */}
            <div className="bg-emerald-50/50 border border-emerald-300 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-1.5 border-b border-emerald-200 pb-1.5 font-bold text-emerald-950">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span className="uppercase text-[11px] tracking-wider">Recommended Next Step</span>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 bg-white rounded border border-emerald-300">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                    Action Direction
                  </span>
                  <strong className="text-emerald-950 text-xs block mt-0.5">
                    {getNextStepRecommendation(selectedIssue)}
                  </strong>
                </div>

                <div className="space-y-1 text-[11px] text-slate-700">
                  <span className="font-semibold block text-slate-900">Standard Action Menu:</span>
                  <ul className="space-y-0.5 list-disc pl-4 text-[10px] text-slate-600">
                    <li>Review evidence</li>
                    <li>Field verification</li>
                    <li>Accelerate existing project</li>
                    <li>Extend existing project</li>
                    <li>Bundle nearby issues</li>
                    <li>Request more information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Current Human Review Audit Note if already recorded */}
          {selectedIssue.human_decision && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-lg text-xs space-y-1">
              <div className="flex items-center justify-between text-emerald-950 font-bold">
                <span>Formal Human Review Decision: {selectedIssue.human_decision.action}</span>
                <span className="font-mono text-[11px]">{selectedIssue.human_decision.timestamp}</span>
              </div>
              <p className="text-slate-800 italic">“{selectedIssue.human_decision.note}”</p>
              <span className="text-[11px] text-emerald-900 font-semibold block pt-1">
                Authorized Official: {selectedIssue.human_decision.reviewer} ({selectedIssue.human_decision.department})
              </span>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
