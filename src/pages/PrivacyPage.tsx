import React from 'react';
import { Shield, Lock, EyeOff, UserCheck, FileCheck, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPageProps {
  currentLang: Language;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <div className="border-b border-[#D9E0E7] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0B3D91] mb-2">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Citizen Privacy & Data Protection Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91]">
          Privacy Policy & Civic Data Principles
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Transparent, citizen-first data governance adhering to Indian public sector standards.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
        <div className="bg-white p-5 rounded-lg border border-[#D9E0E7] space-y-2">
          <div className="flex items-center gap-2 text-[#0B3D91] font-bold">
            <EyeOff className="w-4 h-4" />
            <span>1. Approximate Location Only</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            We never require an exact house number or flat address. Ward, village, or locality names are sufficient to prioritize public infrastructure repairs.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#D9E0E7] space-y-2">
          <div className="flex items-center gap-2 text-[#0B3D91] font-bold">
            <Lock className="w-4 h-4" />
            <span>2. Anonymous Reporting by Default</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Citizens can choose to submit reports completely anonymously. No telephone number or name is shared on public dashboards.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#D9E0E7] space-y-2">
          <div className="flex items-center gap-2 text-[#0B3D91] font-bold">
            <UserCheck className="w-4 h-4" />
            <span>3. Role-Based Access Control (RBAC)</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Public viewers only see aggregated ward-level statistics. Only authorized field reviewers can inspect specific operational contact information.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#D9E0E7] space-y-2">
          <div className="flex items-center gap-2 text-[#0B3D91] font-bold">
            <FileCheck className="w-4 h-4" />
            <span>4. Immutable Audit Logs</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Every administrative review, weight adjustment, and field decision is timestamped with the reviewing officer’s department to guarantee public accountability.
          </p>
        </div>
      </div>

      {/* Responsible AI Practices */}
      <div className="bg-[#F5F7FA] border border-[#D9E0E7] rounded-lg p-6 space-y-3 text-xs sm:text-sm">
        <h3 className="text-base font-bold text-[#163A5F]">Responsible AI Safeguards</h3>
        <p className="text-slate-700 leading-relaxed">
          Z Seva Guide utilizes Natural Language Processing (NLP) exclusively to categorize issues, detect language, and cluster related reports. Algorithmic outputs are non-binding advisory inputs. Machine learning models never replace human officer discretion or make automated budgetary decisions.
        </p>
      </div>
    </div>
  );
};
