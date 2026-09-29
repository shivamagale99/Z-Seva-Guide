import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  CheckCircle,
  Clock,
  Compass,
  FileCheck,
  Send,
  Eye,
  Info,
  Layers,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  List,
  Map as MapIcon,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingDown,
} from 'lucide-react';
import { Issue, Language, UserRole, VerificationState } from '../types';
import { translations } from '../i18n/translations';
import { CivicMap } from '../components/CivicMap';

interface SilentNeedPageProps {
  issues: Issue[];
  currentLang: Language;
  userRole: UserRole;
  onInspectIssue: (issue: Issue) => void;
  onOpenDecisionModal: (issue: Issue) => void;
  onToggleVerificationStep?: (issueId: string, stepId: string) => void;
}

export const SilentNeedPage: React.FC<SilentNeedPageProps> = ({
  issues,
  currentLang,
  userRole,
  onInspectIssue,
  onOpenDecisionModal,
  onToggleVerificationStep,
}) => {
  const t = translations[currentLang];

  // Dashboard Filters
  const [statusFilter, setStatusFilter] = useState<'All' | VerificationState>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Selected issue for deep-dive & explanation panel
  const [selectedIssueId, setSelectedIssueId] = useState<string>('ISSUE-SILENT-HAMLET-C');

  // Filter issues according to selected filters
  const filteredIssues = issues.filter((issue) => {
    const matchesStatus =
      statusFilter === 'All' || issue.silent_need_verification_state === statusFilter;
    const matchesCategory =
      categoryFilter === 'All' || issue.category === categoryFilter;
    const matchesDistrict =
      districtFilter === 'All' || issue.district === districtFilter;
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesCategory && matchesDistrict && matchesSearch;
  });

  const selectedIssue =
    issues.find((i) => i.id === selectedIssueId) ||
    issues.find((i) => i.silent_need_flag) ||
    issues[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* 1. Header & Prominent Purpose Banner */}
      <div className="border-b border-[#D9E0E7] pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>CORE INTELLIGENCE LAYER · SILENT NEED INTELLIGENCE</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
            <ShieldAlert className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>Evidence Signal · Requires Human Verification</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] tracking-tight">
          Silent Need Intelligence
        </h1>

        <p className="text-sm sm:text-base text-slate-700 max-w-4xl leading-relaxed">
          <strong>Purpose:</strong> Identify areas where infrastructure or service need may be high even though citizen reporting is unusually low.
          <span className="block mt-1 text-slate-900 font-semibold">
            Do NOT assume: few complaints = low need.
          </span>
        </p>

        {/* 9 Core Signals Indicator Strip */}
        <div className="pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Synthesis Signals Evaluated:
          </span>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-700">
            {[
              'Citizen Reports',
              'Unique Underlying Issues',
              'Infrastructure Gap',
              'Digital Access',
              'Reporting Rate',
              'Vulnerability / Equity Indicators',
              'Existing Project Coverage',
              'Project Status',
              'Geographic Context',
            ].map((sig) => (
              <span
                key={sig}
                className="px-2 py-0.5 rounded bg-white border border-[#D9E0E7] text-slate-700"
              >
                ✓ {sig}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Concrete Benchmark Showcase: Area A vs Area B */}
      <section aria-labelledby="benchmark-title" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="benchmark-title" className="text-lg font-bold text-[#163A5F]">
              The Core Problem Illustrated: Area A vs. Area B
            </h2>
            <p className="text-xs text-slate-600">
              Why relying purely on complaint volume creates inequitable civic blind spots.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
            Demonstration Case Study
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Area A: Urban Sector */}
          <div className="bg-white border-2 border-slate-300 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500">Benchmark Baseline</span>
                <h3 className="text-base font-bold text-slate-900">Area A (Old Shanti Nagar Urban)</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-[#0B3D91]">
                Demand Corroborated
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block">Citizen Reports</span>
                <span className="font-mono text-xl font-bold text-slate-900">100 reports</span>
                <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">High reporting density</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block">Infrastructure Gap</span>
                <span className="font-mono text-xl font-bold text-slate-800">60% gap</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Moderate deficit</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block">Digital Access</span>
                <span className="font-bold text-slate-800 text-sm">High</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Smartphone & broadband saturation</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block">Project Status</span>
                <span className="font-bold text-slate-800 text-sm">Underway</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Existing pipeline scheme active</span>
              </div>
            </div>

            <div className="p-3 bg-slate-100 rounded text-xs text-slate-700">
              <strong>Observation:</strong> Strong civic participation and ongoing public scheme ensure this issue is actively monitored.
            </div>
          </div>

          {/* Area B: Remote Rural / Hamlet C */}
          <div className="bg-amber-50/60 border-2 border-amber-400 rounded-xl p-5 shadow-xs space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <div>
                <span className="text-xs font-mono font-bold text-amber-800">Identified Discrepancy</span>
                <h3 className="text-base font-bold text-amber-950">Area B (Hamlet C / Dindori Rural)</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-400 text-slate-950 animate-pulse">
                Possible Silent Need
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded border border-amber-300">
                <span className="text-slate-500 block">Citizen Reports</span>
                <span className="font-mono text-xl font-bold text-amber-900">5 reports</span>
                <span className="text-[11px] text-amber-800 font-semibold block mt-0.5">Unusually low volume</span>
              </div>
              <div className="p-2.5 bg-white rounded border border-amber-300">
                <span className="text-slate-500 block">Infrastructure Gap</span>
                <span className="font-mono text-xl font-bold text-rose-700">94% gap</span>
                <span className="text-[11px] text-rose-600 font-semibold block mt-0.5">Critical physical deficit</span>
              </div>
              <div className="p-2.5 bg-white rounded border border-amber-300">
                <span className="text-slate-500 block">Digital Access</span>
                <span className="font-bold text-slate-900 text-sm">Low</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Major participation barrier</span>
              </div>
              <div className="p-2.5 bg-white rounded border border-amber-300">
                <span className="text-slate-500 block">Project Status</span>
                <span className="font-bold text-slate-900 text-sm">No Known Project</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Zero active schemes detected</span>
              </div>
            </div>

            {/* Show WHY Box */}
            <div className="bg-white p-3 rounded-lg border border-amber-300 text-xs space-y-1.5">
              <span className="font-bold text-amber-950 uppercase text-[11px] tracking-wider block">
                Why was Area B flagged as Possible Silent Need?
              </span>
              <ul className="space-y-1 text-slate-800 list-disc pl-4 text-[11px]">
                <li><strong>Very high infrastructure gap:</strong> 94% deficit in clean drinking water source.</li>
                <li><strong>Low reporting relative to comparable areas:</strong> Only 5 complaints vs. 100 in comparable urban zones.</li>
                <li><strong>Low digital access:</strong> Limited mobile connectivity suppresses digital filing.</li>
                <li><strong>No matching project found:</strong> Area is not covered by any sanctioned tender or municipal works.</li>
              </ul>
            </div>

            {/* Recommended Next Step Callout */}
            <div className="bg-amber-100 border border-amber-300 p-3 rounded-lg flex items-center justify-between text-xs">
              <div>
                <span className="font-mono font-bold text-amber-900 block text-[10px] tracking-wider">
                  ACTION PROTOCOL
                </span>
                <strong className="text-amber-950 text-sm">
                  RECOMMENDED NEXT STEP: Field verification
                </strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedIssueId('ISSUE-SILENT-HAMLET-C');
                  const found = issues.find((i) => i.id === 'ISSUE-SILENT-HAMLET-C');
                  if (found) onInspectIssue(found);
                }}
                className="px-3 py-1.5 bg-[#0B3D91] text-white font-bold rounded hover:bg-[#163A5F] shrink-0"
              >
                Inspect Dossier
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Safeguard Reminders */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#0B3D91] shrink-0" />
            <span>
              <strong>Crucial Public Service Principle:</strong> Never automatically call this area the highest priority. Never treat Silent Need as proof. It is an evidence signal that requires human verification.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            Advisory Civic Intelligence
          </span>
        </div>
      </section>

      {/* 3. Dedicated Silent Need Dashboard Controls & Filters */}
      <section aria-labelledby="dashboard-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E0E7] pb-3">
          <div>
            <h2 id="dashboard-heading" className="text-xl font-bold text-[#163A5F]">
              Silent Need Intelligence Dashboard
            </h2>
            <p className="text-xs text-slate-600">
              Filter by verification phase, review reasons for flag, and dispatch field checks.
            </p>
          </div>

          {/* Map vs List View Toggle */}
          <div className="flex items-center gap-1 bg-white border border-[#D9E0E7] p-1 rounded-md text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#0B3D91] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold transition-colors ${
                viewMode === 'map'
                  ? 'bg-[#0B3D91] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Filter Bar (All / Possible Silent Need / Verified / Needs Field Visit / Already Addressed) */}
        <div className="bg-white p-4 rounded-lg border border-[#D9E0E7] shadow-xs space-y-3">
          {/* Verification Status Tabs (Exact requested filters) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-semibold mr-1">Status Filter:</span>
            {[
              { id: 'All', label: 'All' },
              { id: 'Possible Silent Need', label: 'Possible Silent Need' },
              { id: 'Needs Field Visit', label: 'Needs Field Visit' },
              { id: 'Verified', label: 'Verified' },
              { id: 'Already Addressed', label: 'Already Addressed' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setStatusFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors border ${
                  statusFilter === f.id
                    ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Secondary Filters: Search, Category, District */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search area or reason for flag..."
                className="w-full pl-8 pr-3 py-1.5 border border-[#D9E0E7] rounded bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0B3D91]"
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
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full p-1.5 border border-[#D9E0E7] rounded bg-white text-slate-700"
              >
                <option value="All">All Districts</option>
                <option value="Nashik">Nashik</option>
                <option value="Pune">Pune</option>
                <option value="Palghar">Palghar</option>
                <option value="Nandurbar">Nandurbar</option>
                <option value="Thane">Thane</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. DASHBOARD LIST VIEW (TABLE) */}
        {viewMode === 'list' && (
          <div className="bg-white border border-[#D9E0E7] rounded-lg shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#163A5F] text-white font-semibold">
                  <tr>
                    <th scope="col" className="p-3 border-b border-blue-900">Area</th>
                    <th scope="col" className="p-3 border-b border-blue-900">Issue Category</th>
                    <th scope="col" className="p-3 border-b border-blue-900 text-right">Infra Gap</th>
                    <th scope="col" className="p-3 border-b border-blue-900 text-center">Reporting Rate</th>
                    <th scope="col" className="p-3 border-b border-blue-900 text-center">Digital Access</th>
                    <th scope="col" className="p-3 border-b border-blue-900 text-right">Confidence</th>
                    <th scope="col" className="p-3 border-b border-blue-900">Reason for Flag</th>
                    <th scope="col" className="p-3 border-b border-blue-900">Recommended Action</th>
                    <th scope="col" className="p-3 border-b border-blue-900 text-center">Verification Status</th>
                    <th scope="col" className="p-3 border-b border-blue-900 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9E0E7]">
                  {filteredIssues.map((issue) => (
                    <tr
                      key={issue.id}
                      onClick={() => setSelectedIssueId(issue.id)}
                      className={`hover:bg-amber-50/40 cursor-pointer transition-colors ${
                        selectedIssue?.id === issue.id ? 'bg-amber-50/70 font-medium' : ''
                      }`}
                    >
                      {/* Area */}
                      <td className="p-3 font-semibold text-slate-900">
                        <span className="block text-[#163A5F]">{issue.area}</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {issue.district} Dist · {issue.block}
                        </span>
                      </td>

                      {/* Issue Category */}
                      <td className="p-3">
                        <span className="font-semibold text-slate-800">{issue.category}</span>
                        <span className="block text-[10px] text-slate-500 font-mono">{issue.id}</span>
                      </td>

                      {/* Infrastructure Gap */}
                      <td className="p-3 text-right">
                        <span
                          className={`font-mono font-bold tabular-nums ${
                            issue.factors.infrastructure_gap >= 80
                              ? 'text-rose-700 text-sm'
                              : 'text-slate-800'
                          }`}
                        >
                          {issue.factors.infrastructure_gap}%
                        </span>
                      </td>

                      {/* Reporting Rate */}
                      <td className="p-3 text-center">
                        <span className="font-mono text-slate-700 font-medium">
                          {issue.reporting_rate || `${issue.report_count} reports`}
                        </span>
                      </td>

                      {/* Digital Access */}
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            issue.digital_access === 'Low'
                              ? 'bg-rose-100 text-rose-800'
                              : issue.digital_access === 'Moderate'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          {issue.digital_access}
                        </span>
                      </td>

                      {/* Confidence */}
                      <td className="p-3 text-right font-mono font-bold text-[#0B3D91] tabular-nums">
                        {issue.evidence_confidence}%
                      </td>

                      {/* Reason for Flag */}
                      <td className="p-3 max-w-xs">
                        <span className="text-[11px] text-slate-700 line-clamp-2 leading-relaxed">
                          {issue.silent_need_reason ||
                            (issue.silent_need_flag
                              ? 'High physical gap paired with unusually low citizen filings and participation barriers.'
                              : 'Standard citizen reporting matching surveyed municipal metrics.')}
                        </span>
                      </td>

                      {/* Recommended Verification Action */}
                      <td className="p-3 max-w-xs">
                        <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200 block">
                          {issue.recommended_verification_action || 'Field verification recommended'}
                        </span>
                      </td>

                      {/* Verification Status */}
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
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

                      {/* Action */}
                      <td className="p-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspectIssue(issue);
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-[#0B3D91] hover:underline"
                        >
                          Inspect →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. DASHBOARD MAP VIEW */}
        {viewMode === 'map' && (
          <div className="space-y-4">
            <CivicMap
              issues={filteredIssues}
              currentLang={currentLang}
              onSelectArea={(name) => {
                const match = issues.find((i) => i.area === name);
                if (match) setSelectedIssueId(match.id);
              }}
              selectedAreaName={selectedIssue?.area}
            />
          </div>
        )}
      </section>

      {/* 5. Plain Language Explanation Panel: "Why was this flagged?" */}
      <section aria-labelledby="explanation-panel-title" className="bg-white border-2 border-[#0B3D91] rounded-xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-[#0B3D91] text-white rounded">
              <HelpCircle className="w-5 h-5 text-amber-400" />
            </span>
            <div>
              <h2 id="explanation-panel-title" className="text-lg font-bold text-[#163A5F]">
                Explainable AI: Why was this flagged?
              </h2>
              <span className="text-xs text-slate-500">
                Transparent plain-language reasoning for civic review officers.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Inspect Issue:</span>
            <select
              value={selectedIssueId}
              onChange={(e) => setSelectedIssueId(e.target.value)}
              className="py-1 px-2.5 bg-slate-50 border border-[#D9E0E7] rounded font-semibold text-slate-800"
            >
              {issues.map((iss) => (
                <option key={iss.id} value={iss.id}>
                  {iss.id} — {iss.area} ({iss.silent_need_flag ? 'Silent Need' : 'Standard'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Area Explanation Body */}
        {selectedIssue && (
          <div className="space-y-4">
            <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-lg">
              <span className="text-[11px] font-bold text-[#0B3D91] uppercase tracking-wider block mb-1">
                Plain Language Synthesis for {selectedIssue.area}
              </span>
              <p className="text-slate-900 text-sm sm:text-base leading-relaxed font-medium">
                {selectedIssue.silent_need_flag
                  ? `“This area has a high infrastructure gap (${selectedIssue.factors.infrastructure_gap}%) but relatively few digital reports (${selectedIssue.report_count} filings). Low reporting may reflect limited digital access. The system recommends field verification before any decision.”`
                  : `“This area shows active citizen participation (${selectedIssue.report_count} filings) that matches surveyed municipal infrastructure deficits. Ongoing works or planned interventions should proceed according to standard administrative milestones.”`}
              </p>
            </div>

            {/* Signal Factors Table for this Issue */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#F5F7FA] rounded border border-[#D9E0E7]">
                <span className="text-slate-500 block">Identified Gap</span>
                <span className="font-mono text-base font-bold text-rose-700">{selectedIssue.factors.infrastructure_gap}%</span>
                <span className="text-[10px] text-slate-500 block">Physical telemetry</span>
              </div>

              <div className="p-3 bg-[#F5F7FA] rounded border border-[#D9E0E7]">
                <span className="text-slate-500 block">Relative Demand</span>
                <span className="font-mono text-base font-bold text-slate-900">{selectedIssue.report_count} reports</span>
                <span className="text-[10px] text-slate-500 block">{selectedIssue.reporting_rate}</span>
              </div>

              <div className="p-3 bg-[#F5F7FA] rounded border border-[#D9E0E7]">
                <span className="text-slate-500 block">Existing Project</span>
                <span className="font-bold text-slate-900 text-xs block truncate">
                  {selectedIssue.existing_project_status}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {selectedIssue.existing_project_name || 'None identified'}
                </span>
              </div>

              <div className="p-3 bg-amber-50 rounded border border-amber-300">
                <span className="text-amber-800 font-bold block">Status</span>
                <span className="font-bold text-amber-950 text-xs block">
                  {selectedIssue.silent_need_verification_state || 'Possible Silent Need'}
                </span>
                <span className="text-[10px] text-amber-800 block">
                  Confidence: {selectedIssue.evidence_confidence}%
                </span>
              </div>
            </div>

            {/* Field Verification Checklist & Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-xs text-slate-600">
                <span>Protocol: <strong>{selectedIssue.recommended_verification_action}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onInspectIssue(selectedIssue)}
                  className="px-4 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-semibold rounded border border-slate-300"
                >
                  Inspect All Reports ({selectedIssue.report_count})
                </button>
                {userRole !== 'citizen' && (
                  <button
                    type="button"
                    onClick={() => onOpenDecisionModal(selectedIssue)}
                    className="px-4 py-2 bg-[#0B3D91] text-white hover:bg-[#163A5F] text-xs font-bold rounded flex items-center gap-1.5 shadow-xs"
                  >
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Record Official Directive</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
