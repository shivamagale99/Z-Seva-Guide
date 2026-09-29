import React from 'react';
import { Target, AlertCircle, Compass, Users, CheckCircle, Shield } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface AboutPageProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D9E0E7] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
          Civic Intelligence Platform
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] tracking-tight">
          About Z Seva Guide
        </h1>
        <p className="text-base sm:text-lg text-slate-700 mt-2 font-medium">
          «Don’t just count complaints. Find the need behind them.»
        </p>
      </div>

      {/* Mission */}
      <div className="bg-[#163A5F] text-white p-6 sm:p-8 rounded-xl shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold uppercase tracking-wider text-amber-300">Our Mission</h2>
        </div>
        <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
          To help public institutions understand community needs more completely by combining citizen voices with contextual infrastructure evidence.
        </p>
      </div>

      {/* Problem, Challenge, Approach, Goal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
        {/* The Problem */}
        <div className="bg-white p-6 rounded-lg border border-[#D9E0E7] space-y-2">
          <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">The Problem</span>
          <h3 className="text-base font-bold text-slate-900">Fragmented Citizen Voices</h3>
          <p className="text-slate-600 leading-relaxed">
            Citizen feedback is often scattered across phone helplines, handwritten petitions, social media, and disparate local offices. Crucial linguistic nuances in Marathi, Hindi, and local dialects get lost in bureaucratic silos.
          </p>
        </div>

        {/* The Challenge */}
        <div className="bg-white p-6 rounded-lg border border-[#D9E0E7] space-y-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">The Challenge</span>
          <h3 className="text-base font-bold text-slate-900">Complaint Volume Bias</h3>
          <p className="text-slate-600 leading-relaxed">
            Complaint volume alone does not represent actual community need. Areas with affluent, digitally connected residents file dozens of online requests, while remote or tribal hamlets with severe water deficits file zero.
          </p>
        </div>

        {/* The Approach */}
        <div className="bg-white p-6 rounded-lg border-2 border-[#0B3D91] space-y-2 md:col-span-2">
          <span className="text-xs font-bold text-[#0B3D91] uppercase tracking-wider">The Approach</span>
          <h3 className="text-base font-bold text-[#163A5F]">A Rigorous 5-Part Civic Synthesis</h3>
          <div className="bg-[#F5F7FA] p-4 rounded-md border border-[#D9E0E7] my-3 text-center">
            <span className="font-semibold text-slate-900 text-xs sm:text-sm">
              Citizen Voice + AI Synthesis + Infrastructure Context + Access Data + Human Review
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            We merge multilingual citizen testimonies with census data, GIS layers, telecom indices, and public scheme records so that under-reported areas receive prioritized field verification.
          </p>
        </div>

        {/* The Goal */}
        <div className="bg-emerald-50/50 p-6 rounded-lg border border-emerald-300 space-y-2 md:col-span-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">The Ultimate Goal</span>
          <h3 className="text-base font-bold text-emerald-950">Better Evidence for Better Civic Planning</h3>
          <p className="text-slate-700 leading-relaxed">
            Empower municipal commissioners, district collectors, and village panchayats with explainable, equitable data to ensure public investments reach where they are most urgently needed.
          </p>
        </div>
      </div>

      {/* Direct Call to Action */}
      <div className="bg-white p-6 rounded-lg border border-[#D9E0E7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-[#163A5F]">Have a problem to report in your neighborhood?</h3>
          <p className="text-xs text-slate-600">Your report directly contributes to district infrastructure awareness.</p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('report')}
          className="px-5 py-2.5 bg-[#0B3D91] text-white text-xs font-bold rounded hover:bg-[#163A5F] shrink-0"
        >
          {t.ctaReport}
        </button>
      </div>
    </div>
  );
};
