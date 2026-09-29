import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Database,
  Cpu,
  UserCheck,
  Scale,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface TransparencyPageProps {
  currentLang: Language;
}

export const TransparencyPage: React.FC<TransparencyPageProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#D9E0E7] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0B3D91] mb-2">
          <Scale className="w-3.5 h-3.5 text-amber-500" />
          <span>Algorithmic Transparency & Public Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] tracking-tight">
          How Z Seva Guide Works
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 max-w-3xl leading-relaxed">
          Z Seva Guide operates on a foundational civic principle: <strong>“AI organizes evidence. People make decisions.”</strong>
          We adhere to Guidelines for Indian Government Websites and Apps (GIGW 3.0) and transparent algorithmic disclosure.
        </p>
      </div>

      {/* Side-by-Side: What AI Does vs What AI Does NOT Do */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Box 1: What AI Does (Capabilities) */}
        <div className="bg-white border-2 border-[#0B3D91] rounded-xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-100 pb-3">
            <Cpu className="w-5 h-5 text-[#0B3D91]" />
            <h2 className="text-base font-bold text-[#163A5F] uppercase tracking-wider">
              AI Capabilities (Advisory Synthesis)
            </h2>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Language Detection:</strong> Automatically recognizes Marathi, Hindi, and English script and spoken vernacular.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Speech-to-Text:</strong> Transcribes audio testimonies directly so citizens with low literacy can report seamlessly.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Summarization:</strong> Condenses long or emotionally intense grievance text into clean, neutral civic summaries.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Issue Classification:</strong> Maps reports into public works categories (Drinking Water, Roads, Sanitation, etc.).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Urgency Suggestion:</strong> Assesses life-safety indicators to recommend attention tiers without creating panic.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Related-Report Grouping:</strong> Aggregates 10+ isolated complaints into 1 shared root infrastructure problem.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Evidence Explanation:</strong> Generates plain-language rationales for why an area was prioritized or flagged.</span>
            </li>
          </ul>
        </div>

        {/* Box 2: What AI Does NOT Do (Strict Boundaries) */}
        <div className="bg-white border-2 border-rose-300 rounded-xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-rose-100 pb-3">
            <XCircle className="w-5 h-5 text-rose-700" />
            <h2 className="text-base font-bold text-rose-950 uppercase tracking-wider">
              What AI Does NOT Do (Strict Safeguards)
            </h2>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>No Autonomous Decisions:</strong> AI never issues executive orders, closes tickets, or dismisses grievances autonomously.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>No Project Approvals:</strong> AI cannot sanction engineering works or approve tenders without designated officer signature.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>No Budget Allocations:</strong> AI does not manage treasury disbursements or financial authorisations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>No Hallucinated Data:</strong> AI is never allowed to fabricate population statistics, GPS tracks, or census records.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Never Equates Silence with Satisfaction:</strong> The system strictly prohibits treating low reporting as proof of low need.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Data Sources Used */}
      <div className="bg-white border border-[#D9E0E7] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Database className="w-5 h-5 text-[#0B3D91]" />
          <h2 className="text-lg font-bold text-[#163A5F]">
            Data Layers & Sources Used
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#F5F7FA] rounded border border-[#D9E0E7] space-y-1">
            <span className="font-bold text-slate-800 block">1. Citizen Testimonies</span>
            <p className="text-slate-600">Direct reports submitted via text, mobile voice memos, and field surveys.</p>
          </div>
          <div className="p-4 bg-[#F5F7FA] rounded border border-[#D9E0E7] space-y-1">
            <span className="font-bold text-slate-800 block">2. Infrastructure Baseline</span>
            <p className="text-slate-600">Jal Jeevan Mission coverage, PWD road indices, and municipal asset registers.</p>
          </div>
          <div className="p-4 bg-[#F5F7FA] rounded border border-[#D9E0E7] space-y-1">
            <span className="font-bold text-slate-800 block">3. Access & Connectivity</span>
            <p className="text-slate-600">Telecom tower coverage maps, broadband penetration, and literacy indices.</p>
          </div>
          <div className="p-4 bg-[#F5F7FA] rounded border border-[#D9E0E7] space-y-1">
            <span className="font-bold text-slate-800 block">4. Vulnerability Indicators</span>
            <p className="text-slate-600">Socio-economic census data, flood hazard zones, and tribal habitation lists.</p>
          </div>
          <div className="p-4 bg-[#F5F7FA] rounded border border-[#D9E0E7] space-y-1">
            <span className="font-bold text-slate-800 block">5. Ongoing Public Schemes</span>
            <p className="text-slate-600">Sanctioned works, tender progress registers, and executing agency timelines.</p>
          </div>
          <div className="p-4 bg-[#F5F7FA] rounded border border-[#D9E0E7] space-y-1">
            <span className="font-bold text-slate-800 block">6. Ground Truth Feedback</span>
            <p className="text-slate-600">Post-completion citizen verification verifying if repairs actually fixed the problem.</p>
          </div>
        </div>
      </div>

      {/* Human Oversight Principle */}
      <div className="bg-gradient-to-r from-blue-900 to-[#163A5F] text-white p-6 sm:p-8 rounded-xl shadow-md text-center space-y-3">
        <UserCheck className="w-10 h-10 text-amber-400 mx-auto" />
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Human Oversight: The Central Pillar
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
          «Citizen voices are evidence. AI organizes the evidence. Context reveals what may be missing. People make the decisions.»
        </p>
      </div>
    </div>
  );
};
