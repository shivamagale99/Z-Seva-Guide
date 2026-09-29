import React from 'react';
import { Shield, FileText, CheckCircle, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-[#163A5F] text-white border-t-4 border-[#0B3D91] mt-16 text-sm">
      {/* Top Banner - Civic Assurance */}
      <div className="bg-[#0B3D91] px-4 py-3 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span>{t.aiAssistsNotice}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>GIGW 3.0 Guidelines Oriented</span>
            </span>
            <span>·</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#0B3D91] border border-amber-400 flex items-center justify-center font-bold text-white">
                Z
              </div>
              <span className="font-bold text-lg tracking-wide text-white">{t.siteTitle}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.siteSubtitle}
            </p>
            <div className="pt-2 border-t border-slate-700/60">
              <p className="text-xs italic text-amber-300 font-medium">
                {t.philosophyQuote}
              </p>
            </div>
          </div>

          {/* Col 2: Citizen Services */}
          <div>
            <h3 className="font-semibold text-white uppercase text-xs tracking-wider mb-3 pb-1 border-b border-slate-700">
              {t.footerServices}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('report')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navReport}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('track')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navTrack}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('priorities')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navPriorities}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('silent-need')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navSilentNeed}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('issue-graph')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navIssueGraph}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Information & Policies */}
          <div>
            <h3 className="font-semibold text-white uppercase text-xs tracking-wider mb-3 pb-1 border-b border-slate-700">
              {t.footerInformation}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('transparency')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navTransparency}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Privacy Policy & Data Principles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('planning')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navPlanning}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Public Contact & Help */}
          <div>
            <h3 className="font-semibold text-white uppercase text-xs tracking-wider mb-3 pb-1 border-b border-slate-700">
              {t.footerContact}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Civic Assistance: 1800-2026-SEVA</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>contact@zsevaguide.org</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>District Civic Intelligence & Planning Cell</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="bg-[#0f2740] px-4 py-4 border-t border-slate-800 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4 text-slate-300">
            <button type="button" onClick={() => onNavigate('about')} className="hover:underline">
              About
            </button>
            <span>·</span>
            <button type="button" onClick={() => onNavigate('privacy')} className="hover:underline">
              Privacy
            </button>
            <span>·</span>
            <button type="button" onClick={() => onNavigate('transparency')} className="hover:underline">
              Methodology
            </button>
            <span>·</span>
            <button type="button" onClick={() => onNavigate('home')} className="hover:underline">
              Accessibility
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-2 text-[11px] text-slate-400 border-t border-slate-800 pt-2 text-center md:text-left">
          {t.disclaimerFooter}
        </div>
      </div>
    </footer>
  );
};
