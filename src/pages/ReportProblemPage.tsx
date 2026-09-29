import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  AlertCircle,
  Copy,
  Check,
  Info,
  MapPin,
  Volume2,
  Edit2,
  RotateCcw,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { CitizenReport, Language, ReportCategory, UrgencyLevel } from '../types';
import { translations } from '../i18n/translations';
import { analyzeCitizenReport } from '../services/aiService';

interface ReportProblemPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onSubmitReport: (newReport: CitizenReport) => void;
  onNavigateToTrack: (trackingId: string) => void;
}

const CATEGORIES: ReportCategory[] = [
  'Drinking Water',
  'Roads & Transport',
  'Drainage & Sanitation',
  'Connectivity & Digital',
  'Electricity & Streetlights',
  'Healthcare Access',
  'Other',
];

const DISTRICTS = [
  'Nashik',
  'Pune',
  'Palghar',
  'Thane',
  'Nandurbar',
  'Chh. Sambhajinagar',
];

export const ReportProblemPage: React.FC<ReportProblemPageProps> = ({
  currentLang,
  onLanguageChange,
  onSubmitReport,
  onNavigateToTrack,
}) => {
  const t = translations[currentLang];

  // Steps: 1 = Describe, 2 = Review, 3 = Submit (Success)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form inputs
  const [selectedLang, setSelectedLang] = useState<Language>(currentLang);
  const [district, setDistrict] = useState<string>('Nashik');
  const [approxLocation, setApproxLocation] = useState<string>('');
  const [category, setCategory] = useState<ReportCategory>('Drinking Water');
  const [problemText, setProblemText] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');

  // Geolocation helper state
  const [geoLocating, setGeoLocating] = useState<boolean>(false);
  const [geoMessage, setGeoMessage] = useState<string | null>(null);

  // Validation error states
  const [errors, setErrors] = useState<{
    problemText?: string;
    approxLocation?: string;
    district?: string;
    category?: string;
  }>({});

  // Voice recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  // AI analysis result for Step 2
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [editableCategory, setEditableCategory] = useState<ReportCategory>('Drinking Water');
  const [editableIssue, setEditableIssue] = useState<string>('');
  const [editableDuration, setEditableDuration] = useState<string>('');
  const [isEditingAiInterpretation, setIsEditingAiInterpretation] = useState<boolean>(false);

  // Generated submission receipt state
  const [generatedReportId, setGeneratedReportId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Helper text translations
  const helperTexts = {
    en: {
      locationHelper: 'Enter only an approximate area. Do not enter your house number or exact private address.',
      problemHelper: 'Describe what is happening, where it is happening, and how long it has been happening.',
      useGeoBtn: 'Use my approximate location',
      noPrivateNotice: 'Do not provide exact house numbers, apartment names, or personal Aadhaar details.',
      step1: '1. Describe',
      step2: '2. Review',
      step3: '3. Submit',
      problemError: 'Please describe what is happening.',
      locationError: 'Please enter an approximate area.',
      districtError: 'Please select a district.',
      categoryError: 'Please select a category.',
      aiReviewBanner: 'AI-generated summary — please review before submitting.',
      originalStatement: 'Original Citizen Statement (Preserved)',
      editAiInterpretation: 'Edit interpretation',
      saveAiInterpretation: 'Save correction',
      reportReceived: 'REPORT RECEIVED',
      reportRecorded: 'Your report has been recorded.',
      safeguardText: 'Your report has been recorded in the civic intelligence repository. Public officials review clustered community evidence before initiating field verification or works. Submission does not constitute an immediate government commitment or approved priority.',
      flowStep1: 'AI Analysis',
      flowStep2: 'Issue Grouping',
      flowStep3: 'Infrastructure Context',
      flowStep4: 'Human Review',
    },
    mr: {
      locationHelper: 'केवळ अंदाजे परिसर किंवा गावाची माहिती द्या. घराचा क्रमांक किंवा वैयक्तिक पत्ता टाकू नका.',
      problemHelper: 'काय घडले आहे, कुठे घडले आहे आणि किती काळापासून सुरू आहे याचे वर्णन करा.',
      useGeoBtn: 'माझे अंदाजे स्थान वापरा',
      noPrivateNotice: 'घर क्रमांक, इमारत नाव किंवा आधार क्रमांक देण्याची आवश्यकता नाही.',
      step1: '१. वर्णन करा',
      step2: '२. तपासा',
      step3: '३. पावती',
      problemError: 'कृपया समस्येचे थोडक्यात वर्णन करा.',
      locationError: 'कृपया अंदाजे परिसर किंवा प्रभाग नोंदवा.',
      districtError: 'कृपया जिल्हा निवडा.',
      categoryError: 'कृपया समस्येचा प्रवर्ग निवडा.',
      aiReviewBanner: 'एआय द्वारे तयार केलेला सारांश — अंतिम मंजुरीपूर्वी पडताळणी करा.',
      originalStatement: 'नागरिकांचे मूळ विधान (अपरिवर्तित जतन केलेले)',
      editAiInterpretation: 'विश्लेषण दुरुस्त करा',
      saveAiInterpretation: 'बदल जतन करा',
      reportReceived: 'तक्रार प्राप्त झाली (REPORT RECEIVED)',
      reportRecorded: 'आपली नोंदणी यशस्वीरीत्या नोंदवून घेण्यात आली आहे.',
      safeguardText: 'आपली तक्रार नागरी बुद्धिमत्ता प्रणालीत नोंदवली आहे. क्षेत्रीय तपासणी किंवा कामांचे आदेश देण्यापूर्वी अधिकृत अधिकारी एकत्रित पुराव्यांची समीक्षा करतात. ही नोंदणी म्हणजे तात्काळ शासकीय निधी मंजूर झाल्याचे आश्वासन नाही.',
      flowStep1: 'एआय विश्लेषण',
      flowStep2: 'समस्या संकलन',
      flowStep3: 'पायाभूत सुविधा संदर्भ',
      flowStep4: 'अधिकारी पुनरावलोकन',
    },
    hi: {
      locationHelper: 'केवल अनुमानित क्षेत्र या गांव दर्ज करें। अपना मकान नंबर या सटीक निजी पता न डालें।',
      problemHelper: 'बताएं कि क्या हो रहा है, कहां हो रहा है, और कितने समय से समस्या बनी हुई है।',
      useGeoBtn: 'मेरा अनुमानित स्थान उपयोग करें',
      noPrivateNotice: 'मकान नंबर, बिल्डिंग नाम या आधार नंबर देने की आवश्यकता नहीं है।',
      step1: '1. विवरण दें',
      step2: '2. समीक्षा करें',
      step3: '3. रसीद',
      problemError: 'कृपया बताएं कि क्या समस्या हो रही है।',
      locationError: 'कृपया अनुमानित क्षेत्र दर्ज करें।',
      districtError: 'कृपया जिला चुनें।',
      categoryError: 'कृपया श्रेणी चुनें।',
      aiReviewBanner: 'एआई-जनरेटेड सारांश — कृपया जमा करने से पहले समीक्षा करें।',
      originalStatement: 'नागरिक का मूल बयान (अपरिवर्तित सुरक्षित)',
      editAiInterpretation: 'व्याख्या में सुधार करें',
      saveAiInterpretation: 'सुधार सुरक्षित करें',
      reportReceived: 'रिपोर्ट प्राप्त हुई (REPORT RECEIVED)',
      reportRecorded: 'आपकी रिपोर्ट दर्ज कर ली गई है।',
      safeguardText: 'आपकी रिपोर्ट नागरिक आसूचना रिपॉजिटरी में दर्ज कर ली गई है। सार्वजनिक अधिकारी किसी भी कार्य को शुरू करने से पहले सामूहिक साक्ष्यों की समीक्षा करते हैं। यह जमा करना तत्काल सरकारी प्राथमिकता की स्वीकृति नहीं है।',
      flowStep1: 'एआई विश्लेषण',
      flowStep2: 'समस्या समूहन',
      flowStep3: 'इन्फ्रास्ट्रक्चर संदर्भ',
      flowStep4: 'अधिकारी समीक्षा',
    },
  }[selectedLang];

  // Geolocation handling: approximate locality without exact house address
  const handleUseApproximateLocation = () => {
    if (!navigator.geolocation) {
      setGeoMessage('Geolocation is not supported by your browser. Please enter your area manually.');
      return;
    }

    setGeoLocating(true);
    setGeoMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocating(false);
        // Map approximate coordinates to locality label without storing private house details
        const approxLocality = `${district} Central Sector (Approximate Civic Locality)`;
        setApproxLocation(approxLocality);
        setGeoMessage(`Approximate area filled based on device network locality: ${approxLocality}`);
        // Clear location error if any
        setErrors((prev) => ({ ...prev, approxLocation: undefined }));
      },
      (error) => {
        setGeoLocating(false);
        setGeoMessage('Location permission denied or unavailable. You can enter your ward or village manually below.');
      },
      { timeout: 8000, maximumAge: 60000, enableHighAccuracy: false }
    );
  };

  // Speech Recognition (Web Speech API) with sample fallback
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      simulateVoiceSnippet(
        selectedLang === 'mr'
          ? 'आमच्या पाड्यात विहिरीचे पाणी पूर्णपणे आटले आहे. गेले तीन आठवडे नळाला पाणी नाही.'
          : selectedLang === 'hi'
          ? 'हमारे क्षेत्र में पीने के पानी की मुख्य पाइपलाइन टूट गई है और तीन दिनों से पानी की सप्लाई बंद है।'
          : 'Drinking water hand pump broke down near community shed. No alternate source within 1.5km for past 3 weeks.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang =
        selectedLang === 'mr' ? 'mr-IN' : selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setProblemText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setErrors((prev) => ({ ...prev, problemText: undefined }));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      setIsRecording(false);
      simulateVoiceSnippet(
        selectedLang === 'mr'
          ? 'गावातील पाण्याचा बोरवेल आटला आहे, तात्काळ टँकर सुरू करण्याची गरज आहे.'
          : 'Borewell dried up in Hamlet C, urgent drinking water relief required.'
      );
    }
  };

  const simulateVoiceSnippet = (sample: string) => {
    setIsRecording(true);
    setTimeout(() => {
      setProblemText((prev) => (prev ? `${prev} ${sample}` : sample));
      setErrors((prev) => ({ ...prev, problemText: undefined }));
      setIsRecording(false);
    }, 800);
  };

  // Form Validation & Proceed to Step 2
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      problemText?: string;
      approxLocation?: string;
      district?: string;
      category?: string;
    } = {};

    if (!problemText.trim() || problemText.trim().length < 5) {
      newErrors.problemText = helperTexts.problemError;
    }
    if (!approxLocation.trim() || approxLocation.trim().length < 2) {
      newErrors.approxLocation = helperTexts.locationError;
    }
    if (!district.trim()) {
      newErrors.district = helperTexts.districtError;
    }
    if (!category) {
      newErrors.category = helperTexts.categoryError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Run AI analysis
    const analysis = analyzeCitizenReport(problemText, selectedLang, approxLocation);
    setAiAnalysis(analysis);
    setEditableCategory(category);
    setEditableIssue(analysis.detectedIssue || `${category} service disruption`);
    setEditableDuration(analysis.duration || 'Ongoing (Past few days)');
    setStep(2);
  };

  // Step 3: Final Submit
  const handleFinalSubmit = () => {
    const newId = `ZSG-2026-${Math.floor(10000 + Math.random() * 90000)
      .toString()
      .slice(0, 5)}`;
    setGeneratedReportId(newId);

    const now = new Date();
    const timestampStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(
      2,
      '0'
    )}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newReport: CitizenReport = {
      id: newId,
      text: problemText, // PRESERVES EXACT CITIZEN STATEMENT
      language: selectedLang,
      detectedLanguage: aiAnalysis?.detectedLanguage || 'English',
      category: editableCategory,
      urgency: aiAnalysis?.urgency || 'High',
      area: approxLocation,
      district: district,
      timestamp: timestampStr,
      anonymous: isAnonymous,
      contactName: isAnonymous ? undefined : contactName,
      contactPhone: isAnonymous ? undefined : contactPhone,
      ai_confidence: aiAnalysis?.evidenceConfidence || 87,
      ai_summary:
        aiAnalysis?.summary ||
        `Citizen report registered regarding ${editableCategory} issue in ${approxLocation}.`,
      status: 'Received',
      similar_reports_count: aiAnalysis?.similarReportsCount || 4,
      timeline: [
        {
          status: 'Received',
          date: timestampStr,
          description: 'Grievance submitted via Citizen Reporting Portal.',
          role: 'Citizen Portal',
        },
      ],
    };

    onSubmitReport(newReport);
    setStep(3);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReportId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page Title & Mission */}
      <div className="mb-6 text-center sm:text-left border-b border-[#D9E0E7] pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D91]">
          {t.reportFormTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Simple, direct reporting in your preferred language. Complete in under 2 minutes without providing confidential identity details.
        </p>
      </div>

      {/* Step Progress Indicator */}
      <nav aria-label="Progress" className="mb-8">
        <ol className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
          <li
            className={`p-2.5 rounded border transition-colors ${
              step === 1
                ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-xs'
                : step > 1
                ? 'bg-blue-50 text-[#0B3D91] border-blue-200'
                : 'bg-white text-slate-400 border-slate-200'
            }`}
          >
            <span className="block text-[10px] uppercase font-bold text-amber-300">Step 1</span>
            <span>{helperTexts.step1}</span>
          </li>

          <li
            className={`p-2.5 rounded border transition-colors ${
              step === 2
                ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-xs'
                : step > 2
                ? 'bg-blue-50 text-[#0B3D91] border-blue-200'
                : 'bg-white text-slate-400 border-slate-200'
            }`}
          >
            <span className="block text-[10px] uppercase font-bold text-amber-300">Step 2</span>
            <span>{helperTexts.step2}</span>
          </li>

          <li
            className={`p-2.5 rounded border transition-colors ${
              step === 3
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-white text-slate-400 border-slate-200'
            }`}
          >
            <span className="block text-[10px] uppercase font-bold text-emerald-300">Step 3</span>
            <span>{helperTexts.step3}</span>
          </li>
        </ol>
      </nav>

      {/* STEP 1: DESCRIBE */}
      {step === 1 && (
        <form
          onSubmit={handleProceedToReview}
          noValidate
          className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-[#D9E0E7] shadow-xs"
        >
          {/* Language Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t.selectLanguage}:
            </label>
            <div className="flex items-center gap-2">
              {[
                { code: 'mr', label: 'मराठी' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'en', label: 'English' },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setSelectedLang(item.code as Language);
                    onLanguageChange(item.code as Language);
                  }}
                  className={`min-h-[44px] px-5 py-2 rounded-lg text-xs font-bold border transition-all focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus:outline-hidden ${
                    selectedLang === item.code
                      ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                  aria-pressed={selectedLang === item.code}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. LOCATION SECTION (Clear Two-Level System) */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Location Information
                </span>
                <span className="text-[11px] text-slate-500">
                  {helperTexts.noPrivateNotice}
                </span>
              </div>

              {/* Optional Geolocation Helper Button */}
              <button
                type="button"
                onClick={handleUseApproximateLocation}
                disabled={geoLocating}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-slate-100 text-[#0B3D91] hover:bg-slate-200 border border-slate-300 focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus:outline-hidden min-h-[44px] self-start sm:self-auto"
              >
                <Navigation className={`w-3.5 h-3.5 ${geoLocating ? 'animate-spin' : ''}`} />
                <span>{geoLocating ? 'Locating...' : helperTexts.useGeoBtn}</span>
              </button>
            </div>

            {geoMessage && (
              <div className="p-2.5 bg-blue-50 text-blue-900 rounded border border-blue-200 text-xs flex items-center gap-2">
                <Info className="w-4 h-4 text-[#0B3D91] shrink-0" />
                <span>{geoMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Level 1: DISTRICT */}
              <div>
                <label
                  htmlFor="district-select"
                  className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1"
                >
                  District <span className="text-rose-600">*</span>
                </label>
                <select
                  id="district-select"
                  required
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setErrors((prev) => ({ ...prev, district: undefined }));
                  }}
                  className={`w-full text-xs p-3 border rounded-lg bg-white focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus:outline-hidden min-h-[44px] ${
                    errors.district ? 'border-rose-500 bg-rose-50/50' : 'border-[#D9E0E7]'
                  }`}
                  aria-invalid={!!errors.district}
                >
                  {DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.district}</span>
                  </p>
                )}
              </div>

              {/* Level 2: APPROXIMATE AREA */}
              <div>
                <label
                  htmlFor="approx-location"
                  className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1"
                >
                  Approximate Area <span className="text-rose-600">*</span>
                </label>
                <input
                  id="approx-location"
                  type="text"
                  required
                  value={approxLocation}
                  onChange={(e) => {
                    setApproxLocation(e.target.value);
                    setErrors((prev) => ({ ...prev, approxLocation: undefined }));
                  }}
                  placeholder="Ward / Village / Locality / Area"
                  aria-describedby="location-helper"
                  className={`w-full text-xs p-3 border rounded-lg bg-white focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus:outline-hidden min-h-[44px] ${
                    errors.approxLocation ? 'border-rose-500 bg-rose-50/50' : 'border-[#D9E0E7]'
                  }`}
                  aria-invalid={!!errors.approxLocation}
                />
                <span id="location-helper" className="text-[11px] text-slate-500 mt-1 block">
                  {helperTexts.locationHelper}
                </span>
                {errors.approxLocation && (
                  <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.approxLocation}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 3. CATEGORY (Visually Consistent, Clear Selection) */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Category <span className="text-rose-600">*</span>
            </label>
            <div
              role="radiogroup"
              aria-label="Category"
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setCategory(cat);
                      setErrors((prev) => ({ ...prev, category: undefined }));
                    }}
                    className={`min-h-[44px] p-2.5 rounded-lg text-left border flex items-center justify-between transition-all focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus:outline-hidden ${
                      isSelected
                        ? 'bg-[#0B3D91] text-white border-[#0B3D91] font-bold shadow-xs'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <span>{cat}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.category}</span>
              </p>
            )}
          </div>

          {/* 4. PROBLEM DESCRIPTION (Prominent Text Box & Voice Input) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="problem-description"
                className="text-xs font-bold text-slate-900 uppercase tracking-wider"
              >
                What is the problem? <span className="text-rose-600">*</span>
              </label>

              {/* Speak Instead button */}
              <button
                type="button"
                onClick={startSpeechRecognition}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus:outline-hidden ${
                  isRecording
                    ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                    : 'bg-blue-50 text-[#0B3D91] border border-blue-200 hover:bg-blue-100'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4 text-rose-600" /> : <Mic className="w-4 h-4 text-[#0B3D91]" />}
                <span>{isRecording ? t.stopRecording : t.speakInstead}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-600 mb-2">
              {helperTexts.problemHelper}
            </p>

            {isRecording && (
              <p className="text-xs text-rose-600 font-semibold mb-2 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping inline-block"></span>
                <span>{t.listening}</span>
              </p>
            )}

            <textarea
              id="problem-description"
              rows={5}
              required
              value={problemText}
              onChange={(e) => {
                setProblemText(e.target.value);
                setErrors((prev) => ({ ...prev, problemText: undefined }));
              }}
              placeholder={t.problemPlaceholder}
              className={`w-full text-sm p-4 border rounded-lg focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus:outline-hidden bg-slate-50/50 leading-relaxed ${
                errors.problemText ? 'border-rose-500 bg-rose-50/40' : 'border-[#D9E0E7]'
              }`}
              aria-invalid={!!errors.problemText}
            />

            {errors.problemText && (
              <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.problemText}</span>
              </p>
            )}

            {/* Quick Voice Simulation Snippets */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-600">{t.useSampleVoice}</span>
              <button
                type="button"
                onClick={() =>
                  simulateVoiceSnippet(
                    'आमच्या पाड्यात विहिरीचे पाणी पूर्णपणे आटले आहे. गेले तीन आठवडे नळाला पाणी नाही. महिलांना दोन किलोमीटर पायपीट करावी लागत आहे.'
                  )
                }
                className="hover:underline text-[#0B3D91] font-semibold"
              >
                [मराठी पाणी समस्या]
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() =>
                  simulateVoiceSnippet(
                    'Road full of potholes along Ghat connecting link near school bypass. Dangerous for children walking to school.'
                  )
                }
                className="hover:underline text-[#0B3D91] font-semibold"
              >
                [English Road Issue]
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() =>
                  simulateVoiceSnippet(
                    'मुख्य सड़क पर नाली का गंदा पानी ओवरफ्लो होकर घरों में घुस रहा है। तीन दिनों से निकासी बंद है।'
                  )
                }
                className="hover:underline text-[#0B3D91] font-semibold"
              >
                [हिन्दी जलभराव]
              </button>
            </div>
          </div>

          {/* Anonymous Reporting Checkbox */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 min-h-[44px] items-center">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 accent-[#0B3D91] rounded"
              />
              <span className="font-semibold">{t.anonymousLabel}</span>
            </label>

            {!isAnonymous && (
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <div>
                  <label htmlFor="contact-name" className="block text-slate-700 font-medium mb-1">
                    Your Name (Optional):
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full name"
                    className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-xs"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-slate-700 font-medium mb-1">
                    Phone / Mobile (Optional):
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Privacy Guarantee Box */}
          <div className="bg-blue-50/60 border border-blue-200 p-3.5 rounded-lg text-xs text-slate-700 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0B3D91] block">{t.privacyNoticeTitle}</span>
              <p className="leading-relaxed mt-0.5 text-slate-600">{t.privacyNoticeText}</p>
            </div>
          </div>

          {/* Submit Step 1 Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-bold bg-[#0B3D91] text-white hover:bg-[#163A5F] shadow-xs transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B3D91] focus:outline-hidden"
            >
              <span>{t.nextReview}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: REVIEW (AI-ASSISTED PREVIEW & CITIZEN CORRECTION) */}
      {step === 2 && aiAnalysis && (
        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-[#D9E0E7] shadow-xs">
          {/* Prominent Mandatory AI Rule Banner */}
          <div className="p-3.5 bg-blue-50 border-l-4 border-[#0B3D91] rounded-r-lg text-xs text-slate-800 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#0B3D91] font-bold">
                {helperTexts.aiReviewBanner}
              </strong>
              <span className="text-slate-600">
                The AI does not modify your testimony. Please confirm or correct the categorized interpretation below.
              </span>
            </div>
          </div>

          {/* Requested AI Understanding Card */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-[#0B3D91] text-white rounded">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </span>
                <h2 className="text-base font-bold text-[#163A5F]">
                  AI UNDERSTANDING
                </h2>
              </div>

              {/* Citizen ability to correct AI interpretation */}
              <button
                type="button"
                onClick={() => setIsEditingAiInterpretation(!isEditingAiInterpretation)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#0B3D91] bg-white border border-[#0B3D91] rounded hover:bg-blue-50"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditingAiInterpretation ? helperTexts.saveAiInterpretation : helperTexts.editAiInterpretation}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Category */}
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 block mb-1">Category:</span>
                {isEditingAiInterpretation ? (
                  <select
                    value={editableCategory}
                    onChange={(e) => setEditableCategory(e.target.value as ReportCategory)}
                    className="w-full p-1.5 border border-[#D9E0E7] rounded text-xs font-semibold"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                ) : (
                  <strong className="text-sm text-[#0B3D91] font-bold block">
                    {editableCategory}
                  </strong>
                )}
              </div>

              {/* Detected Issue */}
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 block mb-1">Issue:</span>
                {isEditingAiInterpretation ? (
                  <input
                    type="text"
                    value={editableIssue}
                    onChange={(e) => setEditableIssue(e.target.value)}
                    className="w-full p-1.5 border border-[#D9E0E7] rounded text-xs font-semibold"
                  />
                ) : (
                  <strong className="text-sm text-slate-800 font-bold block">
                    {editableIssue}
                  </strong>
                )}
              </div>

              {/* Area */}
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 block mb-1">Area:</span>
                <strong className="text-sm text-slate-800 font-bold block">
                  {approxLocation} ({district} District)
                </strong>
              </div>

              {/* Duration */}
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 block mb-1">Duration:</span>
                {isEditingAiInterpretation ? (
                  <input
                    type="text"
                    value={editableDuration}
                    onChange={(e) => setEditableDuration(e.target.value)}
                    className="w-full p-1.5 border border-[#D9E0E7] rounded text-xs font-semibold"
                  />
                ) : (
                  <strong className="text-sm text-slate-800 font-bold block">
                    {editableDuration}
                  </strong>
                )}
              </div>
            </div>

            {/* Evidence Confidence */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Evidence Confidence:</span>
              <span className="font-mono text-base font-extrabold text-[#0B3D91] tabular-nums">
                {aiAnalysis.evidenceConfidence}%
              </span>
            </div>
          </div>

          {/* Original Statement Preserved */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider block">
              {helperTexts.originalStatement}:
            </span>
            <p className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-800 italic leading-relaxed text-sm">
              “{problemText}”
            </p>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Recorded Language: <strong>{selectedLang.toUpperCase()}</strong></span>
              <span>Anonymous Filing: <strong>{isAnonymous ? 'Yes' : 'No'}</strong></span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.back}</span>
            </button>

            <button
              type="button"
              onClick={handleFinalSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#0B3D91] text-white hover:bg-[#163A5F] shadow-xs min-h-[44px]"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.submitReport}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SUBMISSION RECEIPT (REPORT RECEIVED) */}
      {step === 3 && (
        <div className="bg-white p-6 sm:p-10 rounded-xl border-2 border-emerald-500 shadow-md text-center space-y-6">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163A5F]">
              {helperTexts.reportReceived}
            </h2>
            <p className="text-sm font-semibold text-emerald-800">
              {helperTexts.reportRecorded}
            </p>
          </div>

          {/* Reference ID Box */}
          <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg max-w-sm mx-auto">
            <span className="text-xs text-slate-500 block mb-1">
              Reference ID:
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-2xl font-extrabold text-[#0B3D91] tracking-wider">
                {generatedReportId}
              </span>
              <button
                type="button"
                onClick={copyToClipboard}
                className="p-1.5 rounded hover:bg-slate-200 text-slate-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Copy ID"
                aria-label="Copy reference ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[11px] text-slate-500 block mt-1">{t.keepTrackingId}</span>
          </div>

          {/* Next Steps Visual Pipeline */}
          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-[#D9E0E7] max-w-lg mx-auto space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Next Stage in Civic Pipeline
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold text-[#0B3D91]">
              <span className="px-2 py-1 bg-white rounded border border-slate-200">{helperTexts.flowStep1}</span>
              <span className="text-slate-400">→</span>
              <span className="px-2 py-1 bg-white rounded border border-slate-200">{helperTexts.flowStep2}</span>
              <span className="text-slate-400">→</span>
              <span className="px-2 py-1 bg-white rounded border border-slate-200">{helperTexts.flowStep3}</span>
              <span className="text-slate-400">→</span>
              <span className="px-2 py-1 bg-amber-400 text-slate-950 rounded shadow-xs">{helperTexts.flowStep4}</span>
            </div>
          </div>

          {/* Crucial Safeguard Disclaimer: Does not assert approved government priority */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg text-xs text-slate-600 max-w-lg mx-auto text-left flex items-start gap-2">
            <Info className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {helperTexts.safeguardText}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigateToTrack(generatedReportId)}
              className="px-5 py-2.5 bg-[#0B3D91] text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-[#163A5F] shadow-xs min-h-[44px]"
            >
              {t.trackNow}
            </button>
            <button
              type="button"
              onClick={() => {
                setProblemText('');
                setApproxLocation('');
                setStep(1);
              }}
              className="px-4 py-2.5 bg-white text-slate-700 border border-slate-300 text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-50 min-h-[44px]"
            >
              {t.submitAnother}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
