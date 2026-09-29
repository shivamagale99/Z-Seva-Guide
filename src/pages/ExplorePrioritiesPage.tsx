import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Layers,
  Table as TableIcon,
  Grid,
  Info,
  Map,
  ChevronDown,
} from 'lucide-react';
import { Issue, Language } from '../types';
import { translations } from '../i18n/translations';
import { CivicMap } from '../components/CivicMap';

interface ExplorePrioritiesPageProps {
  issues: Issue[];
  currentLang: Language;
  onInspectIssue: (issue: Issue) => void;
}

export const ExplorePrioritiesPage: React.FC<ExplorePrioritiesPageProps> = ({
  issues,
  currentLang,
  onInspectIssue,
}) => {
  const t = translations[currentLang];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [onlySilentNeeds, setOnlySilentNeeds] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'map'>('table');

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDistrict =
      selectedDistrict === 'All' || issue.district === selectedDistrict;

    const matchesCategory =
      selectedCategory === 'All' || issue.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All' || issue.status === selectedStatus;

    const matchesSilent = !onlySilentNeeds || issue.silent_need_flag;

    return (
      matchesSearch &&
      matchesDistrict &&
      matchesCategory &&
      matchesStatus &&
      matchesSilent
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-[#D9E0E7] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D91]">
            Community Priorities & Infrastructure Signals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Aggregated civic evidence across administrative blocks. Individual personal data is redacted for privacy.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-[#F5F7FA] p-1 border border-[#D9E0E7] rounded-md self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              viewMode === 'table'
                ? 'bg-white text-[#0B3D91] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>{t.viewTable}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-[#0B3D91] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{t.viewGrid}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              viewMode === 'map'
                ? 'bg-white text-[#0B3D91] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>GIS Map</span>
          </button>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#D9E0E7] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search area, village, or issue title..."
              className="w-full pl-9 pr-3 py-2 border border-[#D9E0E7] rounded bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0B3D91]"
            />
          </div>

          {/* District Filter */}
          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full py-2 px-2.5 border border-[#D9E0E7] rounded bg-white font-medium text-slate-700 focus:outline-hidden"
              aria-label="Filter by District"
            >
              <option value="All">All Districts</option>
              <option value="Nashik">Nashik</option>
              <option value="Pune">Pune</option>
              <option value="Palghar">Palghar</option>
              <option value="Thane">Thane</option>
              <option value="Nandurbar">Nandurbar</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-2.5 border border-[#D9E0E7] rounded bg-white font-medium text-slate-700 focus:outline-hidden"
              aria-label="Filter by Category"
            >
              <option value="All">All Categories</option>
              <option value="Drinking Water">Drinking Water</option>
              <option value="Roads & Transport">Roads & Transport</option>
              <option value="Drainage & Sanitation">Drainage & Sanitation</option>
              <option value="Healthcare Access">Healthcare Access</option>
              <option value="Electricity & Streetlights">Electricity</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-2.5 border border-[#D9E0E7] rounded bg-white font-medium text-slate-700 focus:outline-hidden"
              aria-label="Filter by Status"
            >
              <option value="All">All Statuses</option>
              <option value="Identified">Identified</option>
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
              <option value="Intervention Planned">Intervention Planned</option>
              <option value="In Execution">In Execution</option>
            </select>
          </div>
        </div>

        {/* Checkbox: Silent Needs Only */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
            <input
              type="checkbox"
              checked={onlySilentNeeds}
              onChange={(e) => setOnlySilentNeeds(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            <span className="flex items-center gap-1.5 text-amber-900">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Show Possible Silent Needs Only (Under-reported areas)</span>
            </span>
          </label>

          <span className="text-slate-500 font-mono tabular-nums">
            Showing <strong>{filteredIssues.length}</strong> of {issues.length} community issues
          </span>
        </div>
      </div>

      {/* VIEW 1: ACCESSIBLE DATA TABLE */}
      {viewMode === 'table' && (
        <div className="bg-white border border-[#D9E0E7] rounded-lg shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#163A5F] text-white font-semibold">
                <tr>
                  <th scope="col" className="p-3.5 border-b border-blue-900">Area</th>
                  <th scope="col" className="p-3.5 border-b border-blue-900">Issue</th>
                  <th scope="col" className="p-3.5 border-b border-blue-900 text-right">Reports</th>
                  <th scope="col" className="p-3.5 border-b border-blue-900 text-right">Infra Gap</th>
                  <th scope="col" className="p-3.5 border-b border-blue-900">Existing Project</th>
                  <th scope="col" className="p-3.5 border-b border-blue-900 text-center">Attention Signal</th>
                  <th scope="col" className="p-3.5 border-b border-blue-900">Status</th>
                  <th scope="col" className="p-3.5 border-b border-blue-900 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E0E7]">
                {filteredIssues.map((issue) => (
                  <tr
                    key={issue.id}
                    className={`hover:bg-blue-50/40 transition-colors ${
                      issue.silent_need_flag ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    {/* Area */}
                    <td className="p-3.5 font-medium text-slate-900">
                      <div>
                        <span className="font-bold block text-[#163A5F]">{issue.area}</span>
                        <span className="text-[11px] text-slate-500 font-normal">
                          {issue.district} Dist · {issue.block}
                        </span>
                      </div>
                    </td>

                    {/* Issue Title & Category */}
                    <td className="p-3.5 max-w-xs">
                      <span className="font-semibold text-slate-800 line-clamp-1 block">
                        {issue.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {issue.category} · Ref: <span className="font-mono">{issue.id}</span>
                      </span>
                    </td>

                    {/* Reports count */}
                    <td className="p-3.5 text-right font-mono font-bold text-slate-800 tabular-nums">
                      {issue.report_count}
                    </td>

                    {/* Infrastructure Gap */}
                    <td className="p-3.5 text-right">
                      <span
                        className={`font-mono font-bold tabular-nums ${
                          issue.factors.infrastructure_gap >= 80
                            ? 'text-rose-700'
                            : 'text-slate-800'
                        }`}
                      >
                        {issue.factors.infrastructure_gap}%
                      </span>
                    </td>

                    {/* Existing Project */}
                    <td className="p-3.5">
                      <span className="text-[11px] font-medium block">
                        {issue.existing_project_status}
                      </span>
                      {issue.existing_project_name && (
                        <span className="text-[10px] text-slate-500 truncate block max-w-[180px]">
                          {issue.existing_project_name}
                        </span>
                      )}
                    </td>

                    {/* Attention Signal (Silent Need vs Standard) */}
                    <td className="p-3.5 text-center">
                      {issue.silent_need_flag ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          <AlertTriangle className="w-3 h-3 text-amber-700" />
                          <span>Silent Need</span>
                        </span>
                      ) : (
                        <span className="inline-block text-[11px] text-slate-600 font-medium">
                          Signal {issue.priority_signal}/100
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {issue.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => onInspectIssue(issue)}
                        className="px-2.5 py-1 text-xs font-semibold text-[#0B3D91] hover:text-[#163A5F] hover:underline whitespace-nowrap"
                      >
                        Inspect Evidence →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: SPATIAL SECTOR GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className={`bg-white border rounded-lg p-5 shadow-xs transition-all hover:border-[#0B3D91] space-y-3 ${
                issue.silent_need_flag ? 'border-amber-300 bg-amber-50/20' : 'border-[#D9E0E7]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#0B3D91]">
                    {issue.id}
                  </span>
                  <h3 className="font-bold text-sm text-[#163A5F] mt-0.5">{issue.area}</h3>
                </div>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {issue.category}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-snug line-clamp-2">
                {issue.title}
              </p>

              <div className="grid grid-cols-3 gap-2 bg-[#F5F7FA] p-2.5 rounded border border-[#D9E0E7] text-[11px]">
                <div>
                  <span className="text-slate-500 block">Reports</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {issue.report_count}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Infra Gap</span>
                  <span className="font-mono font-bold text-rose-700 tabular-nums">
                    {issue.factors.infrastructure_gap}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Priority</span>
                  <span className="font-mono font-bold text-[#0B3D91] tabular-nums">
                    {issue.priority_signal}/100
                  </span>
                </div>
              </div>

              {issue.silent_need_flag && (
                <div className="p-2 rounded bg-amber-100/70 border border-amber-300 text-[11px] text-amber-900 flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Possible Silent Need (Field verification recommended)</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">{issue.status}</span>
                <button
                  type="button"
                  onClick={() => onInspectIssue(issue)}
                  className="text-xs font-bold text-[#0B3D91] hover:underline"
                >
                  View Details & Evidence →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: SPATIAL GIS MAP */}
      {viewMode === 'map' && (
        <div className="space-y-6">
          <CivicMap
            issues={filteredIssues}
            currentLang={currentLang}
            onSelectArea={(areaName) => setSearchTerm(areaName)}
          />

          <div className="bg-white p-4 rounded-lg border border-[#D9E0E7]">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Issues in Selected Scope ({filteredIssues.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {filteredIssues.map((iss) => (
                <div
                  key={iss.id}
                  className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-[#0B3D91] font-bold">{iss.id}</span>
                    <span className="block font-semibold text-slate-800">{iss.title}</span>
                    <span className="text-[11px] text-slate-500">{iss.area}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onInspectIssue(iss)}
                    className="px-2.5 py-1 text-xs font-bold text-[#0B3D91] hover:underline"
                  >
                    Evidence →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
