import React from 'react';
import {
  FileEdit,
  BarChart3,
  Search,
  ArrowRight,
  AlertTriangle,
  GitMerge,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Building2,
  Info,
} from 'lucide-react';
import { Issue, Language } from '../types';
import { translations } from '../i18n/translations';
import { SilentNeedCard } from '../components/SilentNeedCard';

interface HomePageProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
  silentIssues: Issue[];
  onInspectIssue: (issue: Issue) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  onNavigate,
  silentIssues,
  onInspectIssue,
}) => {
  const t = translations[currentLang];
  const hamletCIssue =
    silentIssues.find((i) => i.id === 'ISSUE-SILENT-HAMLET-C') || silentIssues[0];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section
        className="bg-white border-b border-[#D9E0E7] py-12 sm:py-16 px-4"
        aria-labelledby="hero-title"
      >
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0B3D91]">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Civic Intelligence & Infrastructure Planning Infrastructure</span>
          </div>

          <h1
            id="hero-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B3D91] tracking-tight leading-tight"
          >
            {t.tagline}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {t.heroDescription}
          </p>

          {/* Three Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('report')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-bold bg-[#0B3D91] text-white hover:bg-[#163A5F] shadow-xs transition-colors"
            >
              <FileEdit className="w-4 h-4 text-amber-400" />
              <span>{t.ctaReport}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('priorities')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-bold bg-white text-[#163A5F] border-2 border-[#163A5F] hover:bg-slate-50 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-[#0B3D91]" />
              <span>{t.ctaExplore}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('track')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-[#F5F7FA] text-slate-700 border border-[#D9E0E7] hover:bg-white transition-colors"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>{t.ctaTrack}</span>
            </button>
          </div>

          {/* Core Philosophy Banner */}
          <div className="pt-6">
            <p className="inline-block text-sm sm:text-base font-semibold text-[#163A5F] border-y border-amber-300 py-2 px-4 bg-amber-50/50 rounded">
              {t.philosophyQuote}
            </p>
          </div>
        </div>
      </section>

      {/* Signature Section: "What are we missing?" */}
      <section className="max-w-7xl mx-auto px-4" aria-labelledby="silent-need-heading">
        <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 border-2 border-amber-300 rounded-xl p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>SIGNATURE CAPABILITY</span>
            </div>
            <h2
              id="silent-need-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#163A5F]"
            >
              {t.whatAreWeMissing}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-2 leading-relaxed">
              {t.whatAreWeMissingSub}
            </p>
          </div>

          {/* Featured Spotlight: Hamlet C */}
          {hamletCIssue && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <SilentNeedCard
                  issue={hamletCIssue}
                  currentLang={currentLang}
                  onInspect={onInspectIssue}
                />
              </div>

              {/* Explanatory Panel: Why was this flagged? */}
              <div className="lg:col-span-5 bg-white border border-[#D9E0E7] rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-base text-[#163A5F] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#0B3D91]" />
                  <span>{t.whyWasThisFlagged}</span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {t.silentNeedExplanation}
                </p>

                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Recommended Actions:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Field verification by local sub-division engineer</li>
                    <li>Collect additional non-digital citizen feedback (Gram Sabha)</li>
                    <li>Review local water source and borewell table data</li>
                    <li>Check if interim water tanker routes can be linked</li>
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('silent-need')}
                    className="flex-1 text-center py-2 px-3 bg-[#0B3D91] text-white text-xs font-bold rounded hover:bg-[#163A5F] transition-colors"
                  >
                    Open Silent Need Intelligence Dossier →
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('planning')}
                    className="text-center py-2 px-3 bg-slate-100 text-slate-800 text-xs font-semibold rounded hover:bg-slate-200 transition-colors border border-slate-300"
                  >
                    Planning View
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5 Core Pillars: What Decision-Makers Need to Understand */}
      <section className="max-w-7xl mx-auto px-4" aria-labelledby="pillars-heading">
        <div className="bg-white border border-[#D9E0E7] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
              Civic Intelligence Architecture
            </span>
            <h2 id="pillars-heading" className="text-xl sm:text-2xl font-bold text-[#163A5F] mt-1">
              Five Critical Insights for Public Decision-Makers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Moving beyond flat complaint counts to evidence-based infrastructure delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
            <div
              onClick={() => onNavigate('report')}
              className="p-4 rounded-lg bg-[#F5F7FA] border border-[#D9E0E7] hover:border-[#0B3D91] cursor-pointer transition-colors space-y-2"
            >
              <div className="w-7 h-7 rounded bg-blue-100 text-[#0B3D91] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900">What Citizens Report</h3>
              <p className="text-slate-600 leading-relaxed">
                Multilingual testimonies via text or voice, transcribed without linguistic dilution.
              </p>
            </div>

            <div
              onClick={() => onNavigate('issue-graph')}
              className="p-4 rounded-lg bg-[#F5F7FA] border border-[#D9E0E7] hover:border-[#0B3D91] cursor-pointer transition-colors space-y-2"
            >
              <div className="w-7 h-7 rounded bg-blue-100 text-[#0B3D91] flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900">Issue Synthesis</h3>
              <p className="text-slate-600 leading-relaxed">
                Grouping 10+ isolated complaints into single shared community infrastructure bottlenecks.
              </p>
            </div>

            <div
              onClick={() => onNavigate('silent-need')}
              className="p-4 rounded-lg bg-amber-50 border border-amber-300 hover:border-amber-400 cursor-pointer transition-colors space-y-2"
            >
              <div className="w-7 h-7 rounded bg-amber-200 text-amber-900 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-amber-950">Under-Reported Need</h3>
              <p className="text-amber-900 leading-relaxed">
                Uncovering silent deficits where limited digital access suppresses complaint volume.
              </p>
            </div>

            <div
              onClick={() => onNavigate('planning')}
              className="p-4 rounded-lg bg-[#F5F7FA] border border-[#D9E0E7] hover:border-[#0B3D91] cursor-pointer transition-colors space-y-2"
            >
              <div className="w-7 h-7 rounded bg-blue-100 text-[#0B3D91] flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="font-bold text-slate-900">Existing Projects</h3>
              <p className="text-slate-600 leading-relaxed">
                Checking whether ongoing tenders already cover the grievance or if intervention is missing.
              </p>
            </div>

            <div
              onClick={() => onNavigate('planning')}
              className="p-4 rounded-lg bg-emerald-50 border border-emerald-300 hover:border-emerald-400 cursor-pointer transition-colors space-y-2"
            >
              <div className="w-7 h-7 rounded bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="font-bold text-emerald-950">Evidence for Action</h3>
              <p className="text-emerald-900 leading-relaxed">
                Transparent multi-factor dossiers for human officials to inspect before taking action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process: From citizen voices to actionable evidence (01, 02, 03, 04) */}
      <section className="max-w-7xl mx-auto px-4" aria-labelledby="process-heading">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold text-[#0B3D91]">
            {t.processHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            A transparent four-stage pipeline linking community participation with rigorous public governance.
          </p>
        </div>

        {/* 4-Step horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 01 */}
          <div className="bg-white border border-[#D9E0E7] rounded-lg p-5 relative hover:border-[#0B3D91] transition-colors">
            <span className="text-3xl font-extrabold font-mono text-[#0B3D91]/20 absolute top-3 right-4">
              01
            </span>
            <div className="w-9 h-9 rounded-md bg-blue-50 text-[#0B3D91] flex items-center justify-center font-bold mb-3 border border-blue-200">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#163A5F] mb-1">{t.step1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step1Desc}</p>
          </div>

          {/* Step 02 */}
          <div className="bg-white border border-[#D9E0E7] rounded-lg p-5 relative hover:border-[#0B3D91] transition-colors">
            <span className="text-3xl font-extrabold font-mono text-[#0B3D91]/20 absolute top-3 right-4">
              02
            </span>
            <div className="w-9 h-9 rounded-md bg-blue-50 text-[#0B3D91] flex items-center justify-center font-bold mb-3 border border-blue-200">
              <GitMerge className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#163A5F] mb-1">{t.step2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step2Desc}</p>
          </div>

          {/* Step 03 */}
          <div className="bg-white border border-[#D9E0E7] rounded-lg p-5 relative hover:border-[#0B3D91] transition-colors">
            <span className="text-3xl font-extrabold font-mono text-[#0B3D91]/20 absolute top-3 right-4">
              03
            </span>
            <div className="w-9 h-9 rounded-md bg-blue-50 text-[#0B3D91] flex items-center justify-center font-bold mb-3 border border-blue-200">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#163A5F] mb-1">{t.step3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step3Desc}</p>
          </div>

          {/* Step 04 */}
          <div className="bg-white border-2 border-emerald-500 rounded-lg p-5 relative bg-emerald-50/20">
            <span className="text-3xl font-extrabold font-mono text-emerald-600/30 absolute top-3 right-4">
              04
            </span>
            <div className="w-9 h-9 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3 border border-emerald-300">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-emerald-950 mb-1">{t.step4Title}</h3>
            <p className="text-xs text-slate-700 leading-relaxed">{t.step4Desc}</p>
          </div>
        </div>
      </section>

      {/* Issue Graph Teaser Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#163A5F] text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Product Innovation
            </span>
            <h3 className="text-2xl font-bold">Issue Graph: Synthesizing Isolated Complaints</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Don’t treat 18 different complaints as 18 separate problems. See how semantic, geographic,
              and temporal grouping identifies single root infrastructure bottlenecks.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('issue-graph')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Explore Issue Graph</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
