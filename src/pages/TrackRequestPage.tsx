import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  Clock,
  ArrowRight,
  Send,
  Check,
  AlertCircle,
  FileText,
  User,
  MapPin,
  Calendar,
} from 'lucide-react';
import { CitizenReport, Language, ReportStatus } from '../types';
import { translations } from '../i18n/translations';

interface TrackRequestPageProps {
  reports: CitizenReport[];
  currentLang: Language;
  initialTrackingId?: string;
  onUpdateFeedback: (
    reportId: string,
    feedback: { status: 'Resolved' | 'Partially Resolved' | 'Still Exists'; notes: string }
  ) => void;
}

const statusOrder: ReportStatus[] = [
  'Received',
  'Under Review',
  'Planned',
  'In Progress',
  'Completed',
];

export const TrackRequestPage: React.FC<TrackRequestPageProps> = ({
  reports,
  currentLang,
  initialTrackingId = '',
  onUpdateFeedback,
}) => {
  const t = translations[currentLang];

  const [searchId, setSearchId] = useState(initialTrackingId || 'ZSG-2026-00124');
  const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(
    reports.find((r) => r.id === (initialTrackingId || 'ZSG-2026-00124')) || reports[0]
  );
  const [errorMsg, setErrorMsg] = useState('');

  // Citizen resolution feedback state
  const [resolutionStatus, setResolutionStatus] = useState<
    'Resolved' | 'Partially Resolved' | 'Still Exists'
  >('Resolved');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setFeedbackSubmitted(false);

    const query = searchId.trim().toUpperCase();
    const found = reports.find(
      (r) => r.id.toUpperCase() === query || r.id.toUpperCase().includes(query)
    );

    if (found) {
      setSelectedReport(found);
    } else {
      setErrorMsg(`No request found with ID "${searchId}". Please check your tracking receipt.`);
    }
  };

  const handleSelectSample = (id: string) => {
    setSearchId(id);
    const found = reports.find((r) => r.id === id);
    if (found) {
      setSelectedReport(found);
      setErrorMsg('');
      setFeedbackSubmitted(false);
    }
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    onUpdateFeedback(selectedReport.id, {
      status: resolutionStatus,
      notes: feedbackNotes,
    });
    setFeedbackSubmitted(true);
  };

  // Determine stage progression index
  const currentStageIndex = selectedReport
    ? statusOrder.indexOf(selectedReport.status as any)
    : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left border-b border-[#D9E0E7] pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D91]">
          {t.trackTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {t.trackSubtitle}
        </p>
      </div>

      {/* Tracking Input Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#D9E0E7] shadow-xs space-y-3">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder={t.trackInputPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 border border-[#D9E0E7] rounded-md font-mono text-sm uppercase font-bold focus:ring-2 focus:ring-[#0B3D91] focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0B3D91] text-white font-bold text-xs sm:text-sm rounded-md hover:bg-[#163A5F] transition-colors shadow-xs"
          >
            {t.trackBtn}
          </button>
        </form>

        {/* Quick Demo IDs */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-1">
          <span className="font-semibold text-slate-500">{t.sampleIds}</span>
          {['ZSG-2026-00124', 'ZSG-2026-00108', 'ZSG-2026-00130', 'ZSG-2026-00099'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleSelectSample(id)}
              className="font-mono text-[#0B3D91] hover:underline bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded"
            >
              {id}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Selected Report Details Card */}
      {selectedReport && (
        <div className="space-y-6">
          {/* Main Status & Life-cycle Progress Bar */}
          <div className="bg-white p-6 rounded-lg border border-[#D9E0E7] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E0E7] pb-4">
              <div>
                <span className="text-xs text-slate-500 font-medium">Request Identifier</span>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold font-mono text-[#0B3D91]">
                    {selectedReport.id}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-[#0B3D91] border border-blue-200">
                    {selectedReport.category}
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-slate-500 block mb-0.5">{t.currentStatus}</span>
                <span
                  className={`inline-block px-3 py-1 rounded text-xs font-bold border ${
                    selectedReport.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : selectedReport.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-blue-50 text-blue-900 border-blue-300'
                  }`}
                >
                  {selectedReport.status}
                </span>
              </div>
            </div>

            {/* 5-Step Lifecycle Visual */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Civic Workflow Progress:
              </span>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center text-xs">
                {statusOrder.map((stageName, idx) => {
                  const isReached = currentStageIndex >= idx;
                  const isCurrent = selectedReport.status === stageName;
                  return (
                    <div key={stageName} className="space-y-1.5">
                      <div
                        className={`h-2 rounded-full transition-colors ${
                          isReached ? 'bg-[#0B3D91]' : 'bg-slate-200'
                        } ${isCurrent ? 'ring-2 ring-amber-400' : ''}`}
                      />
                      <span
                        className={`block text-[11px] sm:text-xs leading-tight ${
                          isCurrent
                            ? 'font-bold text-[#0B3D91]'
                            : isReached
                            ? 'text-slate-800 font-semibold'
                            : 'text-slate-400'
                        }`}
                      >
                        {stageName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Report Summary Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F5F7FA] p-4 rounded-md border border-[#D9E0E7] text-xs">
              <div>
                <span className="text-slate-500 block">Area Location:</span>
                <span className="font-semibold text-slate-800">
                  {selectedReport.area} ({selectedReport.district} District)
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Date Registered:</span>
                <span className="font-semibold text-slate-800">{selectedReport.timestamp}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block">Original Citizen Testimony:</span>
                <p className="italic text-slate-800 mt-0.5">“{selectedReport.text}”</p>
              </div>
            </div>
          </div>

          {/* Official Action Timeline */}
          <div className="bg-white p-6 rounded-lg border border-[#D9E0E7] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#163A5F] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0B3D91]" />
              <span>{t.timelineHeading}</span>
            </h3>

            <div className="space-y-4 pl-2 border-l-2 border-[#0B3D91] ml-2">
              {selectedReport.timeline.map((event, i) => (
                <div key={i} className="relative pl-4 space-y-0.5">
                  <div className="w-3 h-3 rounded-full bg-[#0B3D91] absolute -left-[23px] top-1 border-2 border-white" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{event.status}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{event.date}</span>
                  </div>
                  <p className="text-xs text-slate-600">{event.description}</p>
                  <span className="text-[10px] text-slate-400 block font-medium">By: {event.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* For Completed Cases: "Was the issue resolved?" Citizen Feedback */}
          {selectedReport.status === 'Completed' && (
            <div className="bg-white p-6 rounded-lg border-2 border-emerald-500 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                <CheckCircle className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-sm text-emerald-950 uppercase tracking-wider">
                  {t.wasIssueResolved}
                </h3>
              </div>

              {selectedReport.resolutionFeedback ? (
                <div className="bg-emerald-50 p-4 rounded text-xs text-emerald-900 space-y-1">
                  <span className="font-bold block">
                    Citizen Verified: {selectedReport.resolutionFeedback.status}
                  </span>
                  <p className="italic">“{selectedReport.resolutionFeedback.notes}”</p>
                  <span className="text-[11px] text-emerald-700 block mt-1">
                    Recorded on: {selectedReport.resolutionFeedback.date}
                  </span>
                </div>
              ) : feedbackSubmitted ? (
                <div className="bg-emerald-50 p-4 rounded text-xs text-emerald-900 font-semibold">
                  Thank you! Your feedback has been recorded into the civic ground-truth register.
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4 text-xs">
                  <p className="text-slate-600">
                    This request was marked completed by the field engineer. Please verify the actual ground situation to confirm whether the issue was resolved.
                  </p>

                  {/* 3 Resolution Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'Resolved', label: t.resolved, color: 'emerald' },
                      { id: 'Partially Resolved', label: t.partiallyResolved, color: 'amber' },
                      { id: 'Still Exists', label: t.stillExists, color: 'rose' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setResolutionStatus(item.id as any)}
                        className={`px-4 py-2 rounded font-bold border transition-colors ${
                          resolutionStatus === item.id
                            ? 'bg-[#0B3D91] text-white border-[#0B3D91]'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      {t.feedbackPrompt}:
                    </label>
                    <textarea
                      rows={2}
                      value={feedbackNotes}
                      onChange={(e) => setFeedbackNotes(e.target.value)}
                      placeholder={t.feedbackPlaceholder}
                      className="w-full p-2.5 border border-[#D9E0E7] rounded bg-white focus:ring-1 focus:ring-[#0B3D91]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white font-bold rounded hover:bg-emerald-800 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.sendFeedback}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
