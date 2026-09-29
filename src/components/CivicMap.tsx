import React, { useState } from 'react';
import { MapPin, Layers, AlertTriangle, Eye, Info, CheckCircle2 } from 'lucide-react';
import { Area, Issue, Language } from '../types';
import { mockAreas } from '../data/mockData';

interface CivicMapProps {
  issues: Issue[];
  currentLang: Language;
  onSelectArea?: (areaName: string) => void;
  selectedAreaName?: string;
}

export const CivicMap: React.FC<CivicMapProps> = ({
  issues,
  currentLang,
  onSelectArea,
  selectedAreaName,
}) => {
  const [activeLayer, setActiveLayer] = useState<'discrepancy' | 'gap' | 'reports'>('discrepancy');
  const [hoveredArea, setHoveredArea] = useState<Area | null>(null);

  const selectedArea =
    mockAreas.find((a) => a.name === selectedAreaName) || hoveredArea || mockAreas[0];

  return (
    <div className="bg-white border border-[#D9E0E7] rounded-xl overflow-hidden shadow-xs">
      {/* Map Control Bar */}
      <div className="p-4 bg-slate-50 border-b border-[#D9E0E7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#0B3D91] text-white rounded">
            <Layers className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-bold text-sm text-[#163A5F]">
              Spatial Civic Layer: Regional Needs & Reporting Density
            </h3>
            <span className="text-[11px] text-slate-500">
              Interactive district administrative grid. Click any sector to view local evidence.
            </span>
          </div>
        </div>

        {/* Layer Switcher */}
        <div className="flex items-center gap-1 bg-white border border-[#D9E0E7] p-1 rounded-md text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveLayer('discrepancy')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors ${
              activeLayer === 'discrepancy'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Silent Need Discrepancy
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('gap')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors ${
              activeLayer === 'gap'
                ? 'bg-blue-100 text-[#0B3D91] border border-blue-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Infrastructure Deficit
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('reports')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors ${
              activeLayer === 'reports'
                ? 'bg-slate-200 text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Report Volume
          </button>
        </div>
      </div>

      {/* Map Graphic & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive SVG Geographic Visualization */}
        <div className="lg:col-span-8 p-4 sm:p-6 bg-[#F8FAFC] relative border-b lg:border-b-0 lg:border-r border-[#D9E0E7]">
          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs p-2.5 rounded border border-slate-200 text-[11px] z-10 space-y-1">
            <span className="font-bold text-slate-800 block">Map Legend:</span>
            {activeLayer === 'discrepancy' && (
              <div className="space-y-1 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600 inline-block" />
                  <span>Silent Need (High Gap + Low Reports)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#0B3D91] inline-block" />
                  <span>Report Corroborated Area</span>
                </div>
              </div>
            )}
            {activeLayer === 'gap' && (
              <div className="space-y-1 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-rose-700 rounded-sm" />
                  <span>&gt; 80% Critical Deficit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-blue-600 rounded-sm" />
                  <span>&lt; 55% Moderate Deficit</span>
                </div>
              </div>
            )}
            {activeLayer === 'reports' && (
              <div className="space-y-1 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-slate-800 rounded-sm" />
                  <span>High Volume (&gt; 10 reports)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-slate-300 rounded-sm" />
                  <span>Low Volume (&lt; 5 reports)</span>
                </div>
              </div>
            )}
          </div>

          {/* SVG Map Canvas */}
          <div className="w-full h-80 sm:h-96 flex items-center justify-center">
            <svg
              viewBox="0 0 600 400"
              className="w-full h-full max-h-96 drop-shadow-xs"
              aria-label="Civic sector territory map"
            >
              {/* Background territorial mesh outlines */}
              <defs>
                <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="600" height="400" fill="url(#grid-pattern)" rx="8" />

              {/* Administrative Region Shapes */}
              {/* Sector 1: Nandurbar / Akrani (Top North) */}
              <g
                className="cursor-pointer transition-all"
                onClick={() => onSelectArea?.('Malik Pada Remote Habitation')}
                onMouseEnter={() =>
                  setHoveredArea(mockAreas.find((a) => a.id === 'AREA-MALIK-PADA') || null)
                }
              >
                <polygon
                  points="220,30 380,20 370,110 240,120"
                  fill={
                    activeLayer === 'discrepancy'
                      ? '#FEF3C7'
                      : activeLayer === 'gap'
                      ? '#F43F5E'
                      : '#E2E8F0'
                  }
                  stroke={selectedArea.id === 'AREA-MALIK-PADA' ? '#0B3D91' : '#CBD5E1'}
                  strokeWidth={selectedArea.id === 'AREA-MALIK-PADA' ? '3' : '1.5'}
                />
                <text x="260" y="70" fontSize="11" fontWeight="bold" fill="#1E293B">
                  Akrani Hilly (Malik Pada)
                </text>
                <circle cx="280" cy="85" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              </g>

              {/* Sector 2: Nashik Rural / Dindori (North-Central) */}
              <g
                className="cursor-pointer transition-all"
                onClick={() => onSelectArea?.('Hamlet C (Dindori Taluka)')}
                onMouseEnter={() =>
                  setHoveredArea(mockAreas.find((a) => a.id === 'AREA-HAMLET-C') || null)
                }
              >
                <polygon
                  points="200,130 360,125 350,210 180,200"
                  fill={
                    activeLayer === 'discrepancy'
                      ? '#FEF3C7'
                      : activeLayer === 'gap'
                      ? '#E11D48'
                      : '#CBD5E1'
                  }
                  stroke={selectedArea.id === 'AREA-HAMLET-C' ? '#0B3D91' : '#94A3B8'}
                  strokeWidth={selectedArea.id === 'AREA-HAMLET-C' ? '3' : '1.5'}
                />
                <text x="210" y="165" fontSize="11" fontWeight="bold" fill="#0F172A">
                  Dindori Rural (Hamlet C)
                </text>
                <circle cx="260" cy="180" r="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
              </g>

              {/* Sector 3: Nashik Urban / Ward 14 (Central) */}
              <g
                className="cursor-pointer transition-all"
                onClick={() => onSelectArea?.('Ward 14 (Old Shanti Nagar)')}
                onMouseEnter={() =>
                  setHoveredArea(mockAreas.find((a) => a.id === 'AREA-WARD-14') || null)
                }
              >
                <polygon
                  points="365,125 520,135 500,230 355,210"
                  fill={
                    activeLayer === 'discrepancy'
                      ? '#EFF6FF'
                      : activeLayer === 'gap'
                      ? '#38BDF8'
                      : '#1E293B'
                  }
                  stroke={selectedArea.id === 'AREA-WARD-14' ? '#0B3D91' : '#94A3B8'}
                  strokeWidth={selectedArea.id === 'AREA-WARD-14' ? '3' : '1.5'}
                />
                <text x="380" y="175" fontSize="11" fontWeight="bold" fill={activeLayer === 'reports' ? '#FFFFFF' : '#0B3D91'}>
                  Nashik Central (Ward 14)
                </text>
                <circle cx="430" cy="195" r="9" fill="#0B3D91" stroke="#FFFFFF" strokeWidth="2" />
                <text x="426" y="199" fontSize="9" fontWeight="bold" fill="#FFFFFF">18</text>
              </g>

              {/* Sector 4: Palghar / Jawhar Tribal (West-Central) */}
              <g
                className="cursor-pointer transition-all"
                onClick={() => onSelectArea?.('Tribal Settlement Pocket B')}
                onMouseEnter={() =>
                  setHoveredArea(mockAreas.find((a) => a.id === 'AREA-TRIBAL-B') || null)
                }
              >
                <polygon
                  points="60,170 175,170 160,280 40,260"
                  fill={
                    activeLayer === 'discrepancy'
                      ? '#FEF3C7'
                      : activeLayer === 'gap'
                      ? '#E11D48'
                      : '#E2E8F0'
                  }
                  stroke={selectedArea.id === 'AREA-TRIBAL-B' ? '#0B3D91' : '#94A3B8'}
                  strokeWidth={selectedArea.id === 'AREA-TRIBAL-B' ? '3' : '1.5'}
                />
                <text x="55" y="220" fontSize="11" fontWeight="bold" fill="#1E293B">
                  Jawhar Forest (Tribal B)
                </text>
                <circle cx="95" cy="240" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              </g>

              {/* Sector 5: Thane / Kalyan (South-West) */}
              <g
                className="cursor-pointer transition-all"
                onClick={() => onSelectArea?.('Ward 7 (Kalyan East Outskirts)')}
                onMouseEnter={() =>
                  setHoveredArea(mockAreas.find((a) => a.id === 'AREA-WARD-7') || null)
                }
              >
                <polygon
                  points="165,270 330,260 320,360 150,350"
                  fill={
                    activeLayer === 'discrepancy'
                      ? '#F1F5F9'
                      : activeLayer === 'gap'
                      ? '#60A5FA'
                      : '#334155'
                  }
                  stroke={selectedArea.id === 'AREA-WARD-7' ? '#0B3D91' : '#94A3B8'}
                  strokeWidth={selectedArea.id === 'AREA-WARD-7' ? '3' : '1.5'}
                />
                <text x="180" y="310" fontSize="11" fontWeight="bold" fill={activeLayer === 'reports' ? '#FFFFFF' : '#1E293B'}>
                  Kalyan Zone (Ward 7)
                </text>
                <circle cx="230" cy="330" r="8" fill="#163A5F" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="226" y="334" fontSize="9" fontWeight="bold" fill="#FFFFFF">14</text>
              </g>

              {/* Sector 6: Pune / Maval Rural (South-East) */}
              <g
                className="cursor-pointer transition-all"
                onClick={() => onSelectArea?.('Khandala Ghat Bypass Sector')}
                onMouseEnter={() =>
                  setHoveredArea(mockAreas.find((a) => a.id === 'AREA-KHANDALA') || null)
                }
              >
                <polygon
                  points="340,250 510,240 500,370 335,360"
                  fill={
                    activeLayer === 'discrepancy'
                      ? '#F8FAFC'
                      : activeLayer === 'gap'
                      ? '#FB7185'
                      : '#475569'
                  }
                  stroke={selectedArea.id === 'AREA-KHANDALA' ? '#0B3D91' : '#94A3B8'}
                  strokeWidth={selectedArea.id === 'AREA-KHANDALA' ? '3' : '1.5'}
                />
                <text x="360" y="300" fontSize="11" fontWeight="bold" fill={activeLayer === 'reports' ? '#FFFFFF' : '#1E293B'}>
                  Maval Rural (Khandala)
                </text>
                <circle cx="410" cy="320" r="8" fill="#163A5F" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="406" y="324" fontSize="9" fontWeight="bold" fill="#FFFFFF">12</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Selected Sector Context Drawer */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-white space-y-4 text-xs">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[11px] font-mono text-[#0B3D91] font-bold block mb-1">
              SECTOR INSPECTION · {selectedArea.district} District
            </span>
            <h4 className="text-base font-bold text-[#163A5F]">{selectedArea.name}</h4>
            <span className="text-slate-500 text-[11px]">Block: {selectedArea.block}</span>
          </div>

          {/* Key Area Metrics */}
          <div className="grid grid-cols-2 gap-3 bg-[#F5F7FA] p-3 rounded-lg border border-[#D9E0E7]">
            <div>
              <span className="text-slate-500 block">Reported Grievances</span>
              <span className="font-mono text-lg font-bold text-slate-900 tabular-nums">
                {selectedArea.reports_count}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block">Physical Infra Deficit</span>
              <span className="font-mono text-lg font-bold text-rose-700 tabular-nums">
                {selectedArea.infrastructure_gap}%
              </span>
            </div>

            <div>
              <span className="text-slate-500 block">Digital Access</span>
              <span className="font-semibold text-slate-800">{selectedArea.digital_access}</span>
            </div>

            <div>
              <span className="text-slate-500 block">Vulnerability Level</span>
              <span className="font-semibold text-slate-800">{selectedArea.vulnerability}</span>
            </div>
          </div>

          {/* Data Reliability Notice */}
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] space-y-1">
            <span className="text-slate-500 block font-semibold">Population Reference:</span>
            <span className="font-medium text-slate-800">
              {selectedArea.population.toLocaleString('en-IN')} (
              <span className="italic text-amber-800 font-semibold">{selectedArea.population_status}</span>)
            </span>
          </div>

          {/* Discrepancy Evaluation */}
          {selectedArea.silent_needs_count > 0 ? (
            <div className="p-3 rounded bg-amber-50 border border-amber-300 text-amber-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Discrepancy Signal: Silent Need</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Critical gap of {selectedArea.infrastructure_gap}% with only {selectedArea.reports_count} citizen filings. Low reporting is associated with {selectedArea.digital_access.toLowerCase()} digital connectivity.
              </p>
              <span className="block text-[10px] font-bold text-amber-800 mt-1">
                Action: Field inspection & non-digital feedback audit recommended.
              </span>
            </div>
          ) : (
            <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Demand Corroborated</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Citizen reporting frequency matches surveyed municipal infrastructure deficits.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
