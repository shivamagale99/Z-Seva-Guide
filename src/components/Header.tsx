import React, { useState } from 'react';
import { Eye, HelpCircle, Phone, Volume2, ShieldCheck, CheckCircle2, Menu, X } from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  fontScale: 'normal' | 'lg' | 'xl';
  onFontScaleChange: (scale: 'normal' | 'lg' | 'xl') => void;
  isHighContrast: boolean;
  onToggleContrast: () => void;
  onOpenHelp: () => void;
  onOpenContact: () => void;
  silentNeedsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  userRole,
  onRoleChange,
  fontScale,
  onFontScaleChange,
  isHighContrast,
  onToggleContrast,
  onOpenHelp,
  onOpenContact,
  silentNeedsCount,
}) => {
  const t = translations[currentLang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#D9E0E7] bg-white sticky top-0 z-50 shadow-xs">
      {/* Skip to Main Content */}
      <a href="#main-content" className="skip-link">
        {t.skipToMain}
      </a>

      {/* Top Utility Bar (GIGW 3.0 Standard) */}
      <div className="bg-[#163A5F] text-white text-xs px-4 py-1.5 border-b border-[#0B3D91]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Accessibility Tools */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Eye className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>{t.accessibility}:</span>
            </span>

            {/* Font scaling */}
            <div className="flex items-center gap-1 border-r border-slate-600 pr-3">
              <button
                type="button"
                onClick={() => onFontScaleChange('normal')}
                aria-label="Normal text size"
                className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                  fontScale === 'normal' ? 'bg-amber-400 text-slate-900' : 'text-slate-200 hover:text-white'
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onFontScaleChange('lg')}
                aria-label="Large text size"
                className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                  fontScale === 'lg' ? 'bg-amber-400 text-slate-900' : 'text-slate-200 hover:text-white'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onFontScaleChange('xl')}
                aria-label="Extra large text size"
                className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                  fontScale === 'xl' ? 'bg-amber-400 text-slate-900' : 'text-slate-200 hover:text-white'
                }`}
              >
                A+
              </button>
            </div>

            {/* High Contrast */}
            <button
              type="button"
              onClick={onToggleContrast}
              className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
            >
              <span>{t.contrast}:</span>
              <span className={`font-semibold underline ${isHighContrast ? 'text-amber-300' : 'text-slate-300'}`}>
                {isHighContrast ? t.highContrast : t.normalContrast}
              </span>
            </button>

            {/* Screen Reader Label */}
            <div className="hidden sm:flex items-center gap-1 border-l border-slate-600 pl-3 text-slate-300">
              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.screenReader}</span>
            </div>
          </div>

          {/* Right: Help, Contact & Language Bar */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenHelp}
              className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.help}</span>
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.contact}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-[#0B3D91] px-2 py-0.5 rounded border border-blue-400/30">
              <button
                type="button"
                onClick={() => onLanguageChange('mr')}
                className={`px-1.5 py-0.5 text-xs font-medium rounded transition-colors ${
                  currentLang === 'mr' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-white hover:text-amber-200'
                }`}
                aria-pressed={currentLang === 'mr'}
              >
                मराठी
              </button>
              <span className="text-blue-300">|</span>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-1.5 py-0.5 text-xs font-medium rounded transition-colors ${
                  currentLang === 'hi' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-white hover:text-amber-200'
                }`}
                aria-pressed={currentLang === 'hi'}
              >
                हिन्दी
              </button>
              <span className="text-blue-300">|</span>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-1.5 py-0.5 text-xs font-medium rounded transition-colors ${
                  currentLang === 'en' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-white hover:text-amber-200'
                }`}
                aria-pressed={currentLang === 'en'}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Role Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          {/* Official emblem icon */}
          <div className="w-11 h-11 rounded-lg bg-[#0B3D91] flex items-center justify-center text-white font-bold text-lg border-2 border-amber-500 shadow-xs shrink-0">
            <span>Z</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onTabChange('home')}
                className="text-left text-xl sm:text-2xl font-bold tracking-tight text-[#0B3D91] hover:text-[#163A5F]"
              >
                {t.siteTitle}
              </button>
              {/* Subtle AI Indicator */}
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3 text-[#0B3D91]" aria-hidden="true" />
                <span>{t.aiAssisted}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#163A5F] font-medium leading-tight">
              {t.siteSubtitle}
            </p>
          </div>
        </div>

        {/* Right: Role Switcher & Planning Quick Link */}
        <div className="flex items-center flex-wrap gap-2 self-start md:self-center">
          <div className="flex items-center gap-1.5 bg-[#F5F7FA] border border-[#D9E0E7] p-1 rounded-md text-xs">
            <span className="text-slate-500 pl-1 font-medium">{t.activeRole}:</span>
            <select
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-white border border-[#D9E0E7] text-slate-800 font-semibold rounded px-2 py-1 focus:ring-1 focus:ring-[#0B3D91] focus:outline-hidden"
              aria-label="Select user role"
            >
              <option value="citizen">{t.roleCitizen}</option>
              <option value="reviewer">{t.roleReviewer}</option>
              <option value="planner">{t.rolePlanner}</option>
              <option value="admin">{t.roleAdmin}</option>
            </select>
          </div>

          {userRole !== 'citizen' && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-1 rounded">
              <CheckCircle2 className="w-3 h-3" />
              <span>Official Mode</span>
            </span>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded bg-slate-100 border border-slate-300 text-[#0B3D91] hover:bg-slate-200"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B3D91] text-white border-t border-blue-800 p-4 space-y-1 shadow-lg">
          {[
            { id: 'home', label: t.navHome },
            { id: 'report', label: t.navReport },
            { id: 'priorities', label: t.navPriorities },
            { id: 'issue-graph', label: t.navIssueGraph },
            { id: 'silent-need', label: t.navSilentNeed, badge: silentNeedsCount },
            { id: 'planning', label: t.navPlanning },
            { id: 'track', label: t.navTrack },
            { id: 'transparency', label: t.navTransparency },
            { id: 'about', label: t.navAbout },
            { id: 'privacy', label: t.navPrivacy },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onTabChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === item.id
                  ? 'bg-[#163A5F] text-amber-300 font-bold border-l-4 border-amber-400'
                  : 'text-slate-100 hover:bg-white/10'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      )}

      {/* Main Navigation Bar (Desktop & Horizontal Scroll) */}
      <nav
        className="hidden md:block bg-[#0B3D91] text-white overflow-x-auto border-t border-[#163A5F]"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => onTabChange('home')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'home'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {t.navHome}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('report')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'report'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {t.navReport}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('priorities')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'priorities'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {t.navPriorities}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('issue-graph')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'issue-graph'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {t.navIssueGraph}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('silent-need')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 relative ${
              activeTab === 'silent-need'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{t.navSilentNeed}</span>
            {silentNeedsCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                {silentNeedsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('planning')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'planning'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {t.navPlanning}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('track')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'track'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {t.navTrack}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('transparency')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'transparency'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {t.navTransparency}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('about')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'about'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {t.navAbout}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('privacy')}
            className={`px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'privacy'
                ? 'border-amber-400 text-white font-bold bg-[#163A5F]'
                : 'border-transparent text-slate-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {t.navPrivacy}
          </button>
        </div>
      </nav>
    </header>
  );
};
