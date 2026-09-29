/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ReportProblemPage } from './pages/ReportProblemPage';
import { ExplorePrioritiesPage } from './pages/ExplorePrioritiesPage';
import { PlanningDashboardPage } from './pages/PlanningDashboardPage';
import { TrackRequestPage } from './pages/TrackRequestPage';
import { TransparencyPage } from './pages/TransparencyPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SilentNeedPage } from './pages/SilentNeedPage';
import { IssueGraph } from './components/IssueGraph';
import { PriorityWeightModal } from './components/PriorityWeightModal';
import { HumanDecisionModal } from './components/HumanDecisionModal';
import { IssueDetailModal } from './components/IssueDetailModal';
import { HelpModal, ContactModal } from './components/HelpContactModals';

import {
  CitizenReport,
  HumanDecision,
  Issue,
  Language,
  PriorityWeights,
  UserRole,
} from './types';
import { defaultPriorityWeights, mockIssues, mockReports } from './data/mockData';
import { calculatePriorityScore } from './services/aiService';

export default function App() {
  // Global State
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>('citizen');

  // Accessibility State
  const [fontScale, setFontScale] = useState<'normal' | 'lg' | 'xl'>('normal');
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Civic Data State
  const [priorityWeights, setPriorityWeights] = useState<PriorityWeights>(defaultPriorityWeights);
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [reports, setReports] = useState<CitizenReport[]>(mockReports);

  // Modals & Navigation Target State
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [decisionIssue, setDecisionIssue] = useState<Issue | null>(null);
  const [inspectedIssue, setInspectedIssue] = useState<Issue | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [targetTrackingId, setTargetTrackingId] = useState<string>('ZSG-2026-00124');

  // Screen reader announcer message
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');

  // Apply accessibility classes to document body
  useEffect(() => {
    const body = document.body;
    body.classList.remove('font-scale-lg', 'font-scale-xl');
    if (fontScale === 'lg') body.classList.add('font-scale-lg');
    if (fontScale === 'xl') body.classList.add('font-scale-xl');

    if (isHighContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
  }, [fontScale, isHighContrast]);

  // Recalculate issue priority signals whenever weights change
  const handleSaveWeights = (newWeights: PriorityWeights) => {
    setPriorityWeights(newWeights);
    setIssues((prevIssues) =>
      prevIssues.map((iss) => ({
        ...iss,
        priority_signal: calculatePriorityScore(iss.factors, newWeights),
      }))
    );
    setScreenReaderAnnouncement('Priority weights updated. Priority signals recalculated.');
  };

  // Human official records a decision
  const handleSaveDecision = (decision: HumanDecision) => {
    setIssues((prevIssues) =>
      prevIssues.map((iss) => {
        if (iss.id === decision.issue_id) {
          let updatedStatus = iss.status;
          if (decision.action === 'Field verification') updatedStatus = 'Verified';
          else if (decision.action === 'Plan intervention') updatedStatus = 'Intervention Planned';

          return {
            ...iss,
            human_decision: decision,
            status: updatedStatus,
          };
        }
        return iss;
      })
    );
    setScreenReaderAnnouncement(`Official decision saved for issue ${decision.issue_id}.`);
  };

  // Citizen submits a new report
  const handleSubmitNewReport = (newReport: CitizenReport) => {
    setReports((prev) => [newReport, ...prev]);

    // Check if area corresponds to an existing issue, else update report counts
    setIssues((prevIssues) => {
      const match = prevIssues.find(
        (iss) =>
          iss.area.toLowerCase().includes(newReport.area.toLowerCase()) ||
          newReport.area.toLowerCase().includes(iss.area.toLowerCase())
      );

      if (match) {
        return prevIssues.map((iss) =>
          iss.id === match.id
            ? {
                ...iss,
                report_count: iss.report_count + 1,
                report_ids: [newReport.id, ...iss.report_ids],
              }
            : iss
        );
      }
      return prevIssues;
    });

    setScreenReaderAnnouncement(`Report successfully registered with ID ${newReport.id}.`);
  };

  // Citizen adds feedback to resolved issue
  const handleUpdateFeedback = (
    reportId: string,
    feedback: { status: 'Resolved' | 'Partially Resolved' | 'Still Exists'; notes: string }
  ) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              resolutionFeedback: {
                ...feedback,
                date: new Date().toISOString().slice(0, 10),
              },
            }
          : r
      )
    );
    setScreenReaderAnnouncement('Citizen resolution feedback recorded.');
  };

  // Navigate to track with specific ID
  const handleNavigateToTrack = (trackingId: string) => {
    setTargetTrackingId(trackingId);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScreenReaderAnnouncement(`Navigated to ${tab} page.`);
  };

  const silentNeedsCount = issues.filter((i) => i.silent_need_flag).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#1F2937]">
      {/* Live Region for Screen Readers */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {screenReaderAnnouncement}
      </div>

      {/* GIGW 3.0 Standard Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={(lang) => {
          setCurrentLang(lang);
          setScreenReaderAnnouncement(`Language switched to ${lang === 'mr' ? 'Marathi' : lang === 'hi' ? 'Hindi' : 'English'}`);
        }}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userRole={userRole}
        onRoleChange={(role) => {
          setUserRole(role);
          setScreenReaderAnnouncement(`User role switched to ${role}.`);
        }}
        fontScale={fontScale}
        onFontScaleChange={setFontScale}
        isHighContrast={isHighContrast}
        onToggleContrast={() => setIsHighContrast(!isHighContrast)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        silentNeedsCount={silentNeedsCount}
      />

      {/* Main Viewport Content */}
      <main id="main-content" className="flex-1 focus:outline-hidden" tabIndex={-1}>
        {activeTab === 'home' && (
          <HomePage
            currentLang={currentLang}
            onNavigate={handleTabChange}
            silentIssues={issues.filter((i) => i.silent_need_flag)}
            onInspectIssue={(iss) => setInspectedIssue(iss)}
          />
        )}

        {activeTab === 'report' && (
          <ReportProblemPage
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            onSubmitReport={handleSubmitNewReport}
            onNavigateToTrack={handleNavigateToTrack}
          />
        )}

        {activeTab === 'priorities' && (
          <ExplorePrioritiesPage
            issues={issues}
            currentLang={currentLang}
            onInspectIssue={(iss) => setInspectedIssue(iss)}
          />
        )}

        {activeTab === 'silent-need' && (
          <SilentNeedPage
            issues={issues}
            currentLang={currentLang}
            userRole={userRole}
            onInspectIssue={(iss) => setInspectedIssue(iss)}
            onOpenDecisionModal={(iss) => setDecisionIssue(iss)}
            onToggleVerificationStep={(issueId, stepId) => {
              setIssues((prev) =>
                prev.map((iss) => {
                  if (iss.id === issueId && iss.verification_steps) {
                    return {
                      ...iss,
                      verification_steps: iss.verification_steps.map((st) =>
                        st.id === stepId ? { ...st, completed: !st.completed } : st
                      ),
                    };
                  }
                  return iss;
                })
              );
            }}
          />
        )}

        {activeTab === 'planning' && (
          <PlanningDashboardPage
            issues={issues}
            currentLang={currentLang}
            userRole={userRole}
            priorityWeights={priorityWeights}
            onOpenWeightConfig={() => setIsWeightModalOpen(true)}
            onOpenHumanDecision={(iss) => setDecisionIssue(iss)}
            onInspectIssue={(iss) => setInspectedIssue(iss)}
          />
        )}

        {activeTab === 'track' && (
          <TrackRequestPage
            reports={reports}
            currentLang={currentLang}
            initialTrackingId={targetTrackingId}
            onUpdateFeedback={handleUpdateFeedback}
          />
        )}

        {activeTab === 'issue-graph' && (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            <div className="border-b border-[#D9E0E7] pb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D91]">
                Issue Graph: Semantic & Spatial Synthesis
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Visual demonstration of how isolated citizen grievance reports coalesce into root community issues.
              </p>
            </div>
            <IssueGraph
              issues={issues}
              reports={reports}
              currentLang={currentLang}
              onOpenReportDetail={(rep) => {
                const foundIssue = issues.find((i) => i.id === rep.issue_id);
                if (foundIssue) setInspectedIssue(foundIssue);
              }}
            />
          </div>
        )}

        {activeTab === 'transparency' && (
          <TransparencyPage currentLang={currentLang} />
        )}

        {activeTab === 'about' && (
          <AboutPage currentLang={currentLang} onNavigate={handleTabChange} />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPage currentLang={currentLang} />
        )}
      </main>

      {/* Formal Public Sector Footer */}
      <Footer currentLang={currentLang} onNavigate={handleTabChange} />

      {/* Global Modals */}
      <PriorityWeightModal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        weights={priorityWeights}
        onSaveWeights={handleSaveWeights}
      />

      <HumanDecisionModal
        isOpen={Boolean(decisionIssue)}
        onClose={() => setDecisionIssue(null)}
        issue={decisionIssue}
        onSaveDecision={handleSaveDecision}
        currentLang={currentLang}
      />

      <IssueDetailModal
        isOpen={Boolean(inspectedIssue)}
        onClose={() => setInspectedIssue(null)}
        issue={inspectedIssue}
        reports={reports}
        currentLang={currentLang}
        userRole={userRole}
        onOpenDecisionModal={(iss) => setDecisionIssue(iss)}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        currentLang={currentLang}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
