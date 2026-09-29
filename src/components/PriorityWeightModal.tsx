import React, { useState } from 'react';
import { Sliders, RefreshCw, Check, Info, X } from 'lucide-react';
import { PriorityWeights } from '../types';
import { defaultPriorityWeights } from '../data/mockData';

interface PriorityWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  weights: PriorityWeights;
  onSaveWeights: (newWeights: PriorityWeights) => void;
}

export const PriorityWeightModal: React.FC<PriorityWeightModalProps> = ({
  isOpen,
  onClose,
  weights,
  onSaveWeights,
}) => {
  const [localWeights, setLocalWeights] = useState<PriorityWeights>({ ...weights });

  if (!isOpen) return null;

  const total =
    Math.round(
      (localWeights.infrastructure_gap +
        localWeights.urgency +
        localWeights.equity_vulnerability +
        localWeights.bias_adjusted_demand +
        localWeights.readiness) *
        100
    );

  const handleSliderChange = (key: keyof PriorityWeights, value: number) => {
    setLocalWeights((prev) => ({
      ...prev,
      [key]: value / 100,
    }));
  };

  const handleReset = () => {
    setLocalWeights({ ...defaultPriorityWeights });
  };

  const handleSave = () => {
    onSaveWeights(localWeights);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full border border-[#D9E0E7] overflow-hidden">
        {/* Header */}
        <div className="bg-[#163A5F] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">Configurable Priority Model Weights</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Transparent planning model disclaimer */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Planning model notice:</strong>
              <span>
                Weights are configurable by authorized planners and should not be interpreted as objective truth.
                They synthesize multi-factor trade-offs to aid transparent human governance.
              </span>
            </div>
          </div>

          {/* Sliders list */}
          <div className="space-y-4">
            {/* Factor 1: Infrastructure Gap */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-800">Infrastructure Gap</span>
                <span className="font-mono text-[#0B3D91] font-bold tabular-nums">
                  {Math.round(localWeights.infrastructure_gap * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={Math.round(localWeights.infrastructure_gap * 100)}
                onChange={(e) => handleSliderChange('infrastructure_gap', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D91]"
              />
              <span className="text-[11px] text-slate-500">Weight for historical physical deficit & pipeline lack</span>
            </div>

            {/* Factor 2: Urgency */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-800">Urgency</span>
                <span className="font-mono text-[#0B3D91] font-bold tabular-nums">
                  {Math.round(localWeights.urgency * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={Math.round(localWeights.urgency * 100)}
                onChange={(e) => handleSliderChange('urgency', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D91]"
              />
              <span className="text-[11px] text-slate-500">Weight for life-safety, health emergencies, and immediate hazards</span>
            </div>

            {/* Factor 3: Equity / Vulnerability */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-800">Equity / Vulnerability</span>
                <span className="font-mono text-[#0B3D91] font-bold tabular-nums">
                  {Math.round(localWeights.equity_vulnerability * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={Math.round(localWeights.equity_vulnerability * 100)}
                onChange={(e) => handleSliderChange('equity_vulnerability', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D91]"
              />
              <span className="text-[11px] text-slate-500">Protection for historically marginalized, tribal, and remote areas</span>
            </div>

            {/* Factor 4: Bias-adjusted Demand */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-800">Bias-adjusted Demand</span>
                <span className="font-mono text-[#0B3D91] font-bold tabular-nums">
                  {Math.round(localWeights.bias_adjusted_demand * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={Math.round(localWeights.bias_adjusted_demand * 100)}
                onChange={(e) => handleSliderChange('bias_adjusted_demand', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D91]"
              />
              <span className="text-[11px] text-slate-500">Citizen complaints normalized against telecom access to avoid urban skew</span>
            </div>

            {/* Factor 5: Readiness */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-800">Project Readiness</span>
                <span className="font-mono text-[#0B3D91] font-bold tabular-nums">
                  {Math.round(localWeights.readiness * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={Math.round(localWeights.readiness * 100)}
                onChange={(e) => handleSliderChange('readiness', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D91]"
              />
              <span className="text-[11px] text-slate-500">Availability of DPR, sanction, engineering contractors, and rights of way</span>
            </div>
          </div>

          {/* Sum bar */}
          <div className="bg-[#F5F7FA] p-3 rounded border border-[#D9E0E7] flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Cumulative Weight Sum:</span>
            <span
              className={`font-mono font-bold text-sm tabular-nums ${
                total === 100 ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {total}% {total !== 100 && '(will auto-normalize on calculation)'}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-[#D9E0E7] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restore Default Weights</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white bg-[#0B3D91] hover:bg-[#163A5F] rounded"
            >
              <Check className="w-4 h-4" />
              <span>Apply Model Configuration</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
