import { Language } from '../types';

export const translations = {
  en: {
    siteTitle: 'Z SEVA GUIDE',
    siteSubtitle: 'AI-powered Civic Intelligence & Infrastructure Planning',
    tagline: 'Better evidence. Better civic decisions.',
    heroDescription:
      'Z Seva Guide helps communities report local problems and helps public institutions understand where infrastructure needs may be under-reported.',
    philosophyQuote: '“Don’t just count complaints. Find the need behind them.”',
    aiAssistsNotice:
      'AI assists public decision-making. It does not autonomously make government decisions.',
    aiAssisted: 'AI-assisted',

    // Top Utility Bar
    skipToMain: 'Skip to Main Content',
    accessibility: 'Accessibility',
    screenReader: 'Screen Reader Friendly',
    textSize: 'Text Size',
    contrast: 'Contrast',
    normalContrast: 'Normal',
    highContrast: 'High Contrast',
    help: 'Help',
    contact: 'Contact',

    // Navigation
    navHome: 'Home',
    navReport: 'Report a Problem',
    navPriorities: 'Community Priorities',
    navIssueGraph: 'Issue Graph',
    navSilentNeed: 'Silent Need Intelligence',
    navPlanning: 'Planning Dashboard',
    navTrack: 'Track Request',
    navTransparency: 'Transparency',
    navAbout: 'About',
    navPrivacy: 'Privacy',

    // CTAs
    ctaReport: 'Report a Problem',
    ctaExplore: 'Explore Community Priorities',
    ctaTrack: 'Track My Request',
    ctaViewEvidence: 'Inspect Evidence',
    ctaViewDashboard: 'Open Planning Dashboard',

    // Process
    processHeading: 'From citizen voices to actionable evidence',
    step1Title: 'Citizen Voice',
    step1Desc: 'Citizens report problems using text or voice in their preferred language.',
    step2Title: 'AI Understanding',
    step2Desc: 'AI identifies the language, issue, category, urgency and related reports.',
    step3Title: 'Need Intelligence',
    step3Desc: 'Citizen evidence is considered alongside infrastructure gaps, access indicators and existing projects.',
    step4Title: 'Human Decision',
    step4Desc: 'Public officials receive explainable evidence and decide what action is appropriate.',

    // Signature Feature: What are we missing?
    whatAreWeMissing: 'What are we missing?',
    whatAreWeMissingSub:
      'Reported complaints do not always represent the full level of community need. Z Seva Guide looks for signals that may indicate under-reported needs.',
    silentNeedDisclaimer: 'A Silent Need signal is an indicator for verification, not proof of need.',
    fieldVerificationRec: 'Field verification recommended',
    whyWasThisFlagged: 'Why was this flagged?',
    silentNeedExplanation:
      'The area shows a high infrastructure gap but unusually low citizen reporting. Low reporting may be associated with limited digital access or other barriers to participation.',
    possibleSilentNeed: 'Possible Silent Need',
    unusuallyLow: 'Unusually low',

    // Issue Graph
    issueGraphTitle: 'Issue Graph: Connecting Citizen Voices',
    issueGraphSub:
      'The system does not treat every complaint as an isolated problem. It connects related reports into underlying community issues.',
    reportsToIssue: 'citizen reports → 1 underlying community issue',
    evidenceConfidence: 'Evidence Confidence',
    prioritySignal: 'Priority Signal',
    viewSupportingReports: 'View Supporting Reports',

    // Citizen Form
    reportFormTitle: 'Tell us about a problem in your area',
    reportStep1: 'Describe',
    reportStep2: 'Review',
    reportStep3: 'Submit',
    selectLanguage: 'Choose your language',
    problemPlaceholder: 'Describe what is happening in your area (e.g., tap dry for 3 weeks, road washed out)...',
    speakInstead: 'Speak instead',
    listening: 'Listening... please speak now',
    stopRecording: 'Stop recording',
    useSampleVoice: 'Or try voice sample:',
    approxLocation: 'Approximate Location',
    locationPlaceholder: 'e.g. Ward 4, Hamlet C, or Dindori Road',
    locationNote: 'Do not provide exact house numbers or private addresses.',
    categoryLabel: 'Category',
    anonymousLabel: 'Submit anonymously (do not share my name or phone with public)',
    privacyNoticeTitle: 'Citizen Privacy Notice',
    privacyNoticeText:
      'We only collect approximate location to prioritize civic repairs. Personal contact information is kept private and never published publicly.',
    nextReview: 'Review with AI Assistance',
    submitReport: 'Confirm & Submit Report',
    back: 'Back',

    // AI Review
    aiUnderstandingHeading: 'AI-assisted understanding',
    aiGeneratedNotice: 'AI-generated information · Review before submission',
    detectedLang: 'Language detected',
    identifiedIssue: 'Issue',
    summaryLabel: 'Summary',
    urgencyLabel: 'Urgency',
    similarReportsLabel: 'Similar reports in area',
    confidenceScore: 'Evidence confidence',

    // Submission Success
    submissionSuccessTitle: 'Problem Successfully Registered',
    trackingIdLabel: 'Your Official Request ID',
    keepTrackingId: 'Save this ID to check progress or provide follow-up feedback.',
    trackNow: 'Track This Request Now',
    submitAnother: 'Report Another Issue',

    // Tracking
    trackTitle: 'Track My Request',
    trackSubtitle: 'Enter your tracking ID to see the official review and repair progress.',
    trackInputPlaceholder: 'e.g. ZSG-2026-00124',
    trackBtn: 'Check Status',
    sampleIds: 'Quick demo IDs:',
    currentStatus: 'Current Status',
    timelineHeading: 'Official Action Timeline',
    wasIssueResolved: 'Was the issue resolved?',
    resolved: 'Resolved',
    partiallyResolved: 'Partially Resolved',
    stillExists: 'Still Exists',
    feedbackPrompt: 'Citizen Feedback on Resolution',
    feedbackPlaceholder: 'Help us verify the repair on the ground...',
    sendFeedback: 'Send Citizen Feedback',

    // Planning Dashboard
    planningTitle: 'Infrastructure Priority Dashboard',
    planningSub: 'Evidence-based civic planning for authorized municipal and district officials.',
    statReports: 'Citizen Reports',
    statIssues: 'Underlying Issues',
    statAreasReview: 'Areas Requiring Review',
    statSilentNeeds: 'Possible Silent Needs',
    priorityModelHeading: 'Configurable Priority Model',
    priorityModelNotice:
      'Planning model weights are configurable and should not be interpreted as objective truth.',
    adjustWeights: 'Adjust Weightings',
    existingProjectsHeading: 'Existing Project Intelligence',
    humanReviewHeading: 'Human Review & Decision',
    aiSuggestedAction: 'AI Suggested Action',
    saveDecision: 'Save Official Decision',
    decisionSaved: 'Decision recorded in official audit log.',

    // Roles
    roleCitizen: 'Citizen View',
    roleReviewer: 'Reviewer',
    rolePlanner: 'Planner / Official',
    roleAdmin: 'Administrator',
    activeRole: 'Current Role',

    // Filters
    filterAll: 'All',
    filterDistrict: 'District',
    filterCategory: 'Category',
    filterStatus: 'Status',
    filterSilentNeed: 'Silent Need Flagged Only',
    viewTable: 'Table View',
    viewGrid: 'Spatial Sector Grid',

    // Footer
    footerAbout: 'About Z Seva Guide',
    footerServices: 'Citizen Services',
    footerInformation: 'Information & Policies',
    footerContact: 'Public Contact & Help',
    copyright: '© Z Seva Guide. Indian Civic Intelligence & Infrastructure Planning Platform.',
    disclaimerFooter:
      'Z Seva Guide operates with human-in-the-loop governance under GIGW 3.0 standards. Algorithmic outputs are evidence syntheses, not autonomous executive orders.',
  },

  mr: {
    siteTitle: 'झेड सेवा गाईड',
    siteSubtitle: 'एआय-सक्षम नागरी बुद्धिमत्ता आणि पायाभूत सुविधा नियोजन',
    tagline: 'उत्तम पुरावे. अधिक प्रभावी नागरी निर्णय.',
    heroDescription:
      'झेड सेवा गाईड नागरिकांना स्थानिक समस्या नोंदवण्यास मदत करते आणि ज्या भागात गरजा कमी नोंदवल्या गेल्या असतील अशा ठिकाणच्या पायाभूत गरजा शोधून काढण्यास प्रशासनाला साहाय्य करते.',
    philosophyQuote: '“केवळ तक्रारी मोजू नका. त्यांच्यामागील खरी गरज शोधा.”',
    aiAssistsNotice:
      'एआय केवळ सार्वजनिक निर्णय प्रक्रियेस साहाय्य करते. ते स्वतः कोणतेही शासकीय निर्णय घेत नाही.',
    aiAssisted: 'एआय-साहाय्यित',

    // Top Utility Bar
    skipToMain: 'मुख्य मजकुरावर जा',
    accessibility: 'सुगम्यता (Accessibility)',
    screenReader: 'स्क्रीन रीडर सुसंगत',
    textSize: 'अक्षर आकार',
    contrast: 'कॉन्ट्रास्ट',
    normalContrast: 'सामान्य',
    highContrast: 'उच्च कॉन्ट्रास्ट',
    help: 'मदत',
    contact: 'संपर्क',

    // Navigation
    navHome: 'मुख्यपृष्ठ',
    navReport: 'समस्या नोंदवा',
    navPriorities: 'सामुदायिक प्राधान्यक्रम',
    navIssueGraph: 'समस्या आलेख (Issue Graph)',
    navSilentNeed: 'मूक गरज बुद्धिमत्ता',
    navPlanning: 'नियोजन डॅशबोर्ड',
    navTrack: 'मागणीचा मागोवा घ्या',
    navTransparency: 'पारदर्शकता',
    navAbout: 'माहिती',
    navPrivacy: 'गोपनीयता',

    // CTAs
    ctaReport: 'समस्या नोंदवा',
    ctaExplore: 'सामुदायिक प्राधान्यक्रम पहा',
    ctaTrack: 'माझ्या अर्जाचा मागोवा',
    ctaViewEvidence: 'पुरावे तपासा',
    ctaViewDashboard: 'नियोजन डॅशबोर्ड उघडा',

    // Process
    processHeading: 'नागरिकांच्या आवाजापासून ते ठोस पुराव्यांपर्यंत',
    step1Title: 'नागरिकांचा आवाज',
    step1Desc: 'नागरिक त्यांच्या पसंतीच्या भाषेत मजकूर किंवा आवाजाद्वारे समस्या नोंदवतात.',
    step2Title: 'एआय आकलन',
    step2Desc: 'एआय भाषा, समस्या, वर्ग, तातडी आणि संबंधित तक्रारी ओळखते.',
    step3Title: 'गरज बुद्धिमत्ता',
    step3Desc: 'नागरिक पुराव्यांची पायाभूत सुविधांमधील तूट, डिजिटल पोहोच आणि चालू प्रकल्पांशी पडताळणी केली जाते.',
    step4Title: 'मानवी निर्णय',
    step4Desc: 'शासकीय अधिकारी स्पष्ट पुराव्यांच्या आधारे योग्य कारवाईचा निर्णय घेतात.',

    // Signature Feature: What are we missing?
    whatAreWeMissing: 'आपल्या नजरेतून काय सुटत आहे?',
    whatAreWeMissingSub:
      'नोंदवलेल्या तक्रारी नेहमीच समुदायाच्या संपूर्ण गरजेची व्याप्ती दाखवत नाहीत. झेड सेवा गाईड कमी नोंदवल्या गेलेल्या गरजांचे संकेत शोधून काढते.',
    silentNeedDisclaimer: 'मूक गरज संकेत हा प्रत्यक्ष पडताळणीसाठीचा इशारा आहे, तो गरजेचा अंतिम पुरावा नाही.',
    fieldVerificationRec: 'क्षेत्रीय पडताळणीची (Field Verification) शिफारस',
    whyWasThisFlagged: 'हे का सूचित केले गेले?',
    silentNeedExplanation:
      'या भागात पायाभूत सुविधांची मोठी तूट आहे परंतु नागरिकांची नोंदणी अत्यंत कमी आहे. कमी तक्रारी हे मर्यादित डिजिटल प्रवेश किंवा इतर सामाजिक अडथळ्यांमुळे असू शकते.',
    possibleSilentNeed: 'संभाव्य मूक गरज (Possible Silent Need)',
    unusuallyLow: 'अपेक्षेपेक्षा अत्यंत कमी',

    // Issue Graph
    issueGraphTitle: 'समस्या आलेख (Issue Graph): नागरिक तक्रारींचे एकत्रीकरण',
    issueGraphSub:
      'प्रणाली प्रत्येक तक्रारीला स्वतंत्र समस्या मानत नाही. ती संबंधित अहवालांना एका मूळ नागरी समस्येशी जोडते.',
    reportsToIssue: 'नागरिक अहवाल → १ मूळ सामुदायिक समस्या',
    evidenceConfidence: 'पुरावा विश्वासार्हता',
    prioritySignal: 'प्राधान्यक्रम संकेत',
    viewSupportingReports: 'संबंधित मूळ अहवाल पहा',

    // Citizen Form
    reportFormTitle: 'आपल्या परिसरातील समस्येबद्दल माहिती द्या',
    reportStep1: 'वर्णन करा',
    reportStep2: 'तपासा',
    reportStep3: 'सादर करा',
    selectLanguage: 'भाषा निवडा',
    problemPlaceholder: 'आपल्या भागात काय अडचण आहे ते सांगा (उदा. ३ आठवड्यांपासून पिण्याचे पाणी नाही, रस्ता उखडला आहे)...',
    speakInstead: 'बोलून नोंदवा (मायक्रोफोन)',
    listening: 'ऐकत आहे... कृपया आता बोला',
    stopRecording: 'थांबवा',
    useSampleVoice: 'किंवा नमुना आवाज निवडा:',
    approxLocation: 'अंदाजे ठिकाण',
    locationPlaceholder: 'उदा. प्रभाग ४, पाडा सी, किंवा दिंडोरी रस्ता',
    locationNote: 'घराचा पूर्ण पत्ता किंवा वैयक्तिक माहिती देऊ नका.',
    categoryLabel: 'प्रवर्ग',
    anonymousLabel: 'नाव गोपनीय ठेवा (सार्वजनिक डॅशबोर्डवर नाव दिसणार नाही)',
    privacyNoticeTitle: 'नागरिक गोपनीयता हमी',
    privacyNoticeText:
      'आम्ही केवळ दुरुस्तीचे नियोजन करण्यासाठी अंदाजे ठिकाण गोळा करतो. वैयक्तिक संपर्क क्रमांक सार्वजनिक केला जात नाही.',
    nextReview: 'एआय तपासणीसाठी पुढे जा',
    submitReport: 'तक्रार निश्चित करून सादर करा',
    back: 'मागे',

    // AI Review
    aiUnderstandingHeading: 'एआय-साहाय्यित विश्लेषण',
    aiGeneratedNotice: 'एआय द्वारे तयार केलेला सारांश · अंतिम मंजुरीपूर्वी पडताळणी करा',
    detectedLang: 'ओळखलेली भाषा',
    identifiedIssue: 'समस्या',
    summaryLabel: 'सारांश',
    urgencyLabel: 'तातडीचे प्रमाण',
    similarReportsLabel: 'परिसरातील इतर समान तक्रारी',
    confidenceScore: 'पुरावा विश्वासार्हता',

    // Submission Success
    submissionSuccessTitle: 'तक्रार यशस्वीरित्या नोंदवली गेली आहे',
    trackingIdLabel: 'आपला अधिकृत संदर्भ क्रमांक (Tracking ID)',
    keepTrackingId: 'प्रगती तपासण्यासाठी किंवा अभिप्राय देण्यासाठी हा क्रमांक जपून ठेवा.',
    trackNow: 'सध्याची स्थिती तपासा',
    submitAnother: 'दुसरी तक्रार नोंदवा',

    // Tracking
    trackTitle: 'तक्रारीचा मागोवा घ्या',
    trackSubtitle: 'अधिकृत कार्यवाहीची स्थिती पाहण्यासाठी आपला संदर्भ क्रमांक टाका.',
    trackInputPlaceholder: 'उदा. ZSG-2026-00124',
    trackBtn: 'स्थिती पहा',
    sampleIds: 'चाचणीसाठी संदर्भ क्रमांक:',
    currentStatus: 'सद्य स्थिती',
    timelineHeading: 'कार्यवाहीचा घटनाक्रम',
    wasIssueResolved: 'समस्येचे निराकरण झाले का?',
    resolved: 'पूर्ण निराकरण झाले',
    partiallyResolved: 'अंशतः निराकरण झाले',
    stillExists: 'समस्या कायम आहे',
    feedbackPrompt: 'निराकरणावर नागरिकांचा अभिप्राय',
    feedbackPlaceholder: 'प्रत्यक्ष स्थितीबद्दल थोडक्यात नोंदवा...',
    sendFeedback: 'अभिप्राय पाठवा',

    // Planning Dashboard
    planningTitle: 'पायाभूत सुविधा प्राधान्य डॅशबोर्ड',
    planningSub: 'अधिकृत शासकीय व पालिका अधिकाऱ्यांसाठी पुराव्यांवर आधारित नियोजन कक्ष.',
    statReports: 'नागरिक तक्रारी',
    statIssues: 'मूळ समस्या',
    statAreasReview: 'पुनरावलोकन आवश्यक क्षेत्रे',
    statSilentNeeds: 'संभाव्य मूक गरजा',
    priorityModelHeading: 'समायोज्य प्राधान्यक्रम मॉडेल',
    priorityModelNotice:
      'नियोजन मॉडेलचे भारांकन लवचिक असून ते अंतिम वास्तव म्हणून गृहीत धरू नये.',
    adjustWeights: 'भारांकन (Weights) बदला',
    existingProjectsHeading: 'चालू योजनांची माहिती',
    humanReviewHeading: 'मानवी पुनरावलोकन आणि निर्णय',
    aiSuggestedAction: 'एआय सुचवलेली संभाव्य कारवाई',
    saveDecision: 'अधिकृत निर्णय जतन करा',
    decisionSaved: 'निर्णय अधिकृत ऑडिट लॉगमध्ये नोंदवला गेला आहे.',

    // Roles
    roleCitizen: 'नागरिक दृश्य',
    roleReviewer: 'पडताळणी अधिकारी (Reviewer)',
    rolePlanner: 'नियोजन अधिकारी (Planner)',
    roleAdmin: 'प्रशासक (Admin)',
    activeRole: 'सध्याची भूमिका',

    // Filters
    filterAll: 'सर्व',
    filterDistrict: 'जिल्हा',
    filterCategory: 'प्रवर्ग',
    filterStatus: 'स्थिती',
    filterSilentNeed: 'केवळ मूक गरजा दाखवा',
    viewTable: 'तक्ता दृश्य',
    viewGrid: 'भौगोलिक क्षेत्र ग्रीड',

    // Footer
    footerAbout: 'झेड सेवा गाईड विषयी',
    footerServices: 'नागरिक सेवा',
    footerInformation: 'धोरणे व पारदर्शकता',
    footerContact: 'संपर्क व साहाय्यता',
    copyright: '© झेड सेवा गाईड. भारतीय नागरी बुद्धिमत्ता आणि पायाभूत सुविधा नियोजन व्यासपीठ.',
    disclaimerFooter:
      'झेड सेवा गाईड GIGW 3.0 मानकांनुसार मानवी नियंत्रणाखाली कार्य करते. अल्गोरिदमचे निष्कर्ष हे पुराव्यांचे संकलन आहेत, तो थेट शासकीय आदेश नाही.',
  },

  hi: {
    siteTitle: 'ज़ेड सेवा गाइड',
    siteSubtitle: 'एआई-संचालित नागरिक आसूचना एवं अवसंरचना नियोजन',
    tagline: 'बेहतर साक्ष्य। बेहतर नागरिक निर्णय।',
    heroDescription:
      'ज़ेड सेवा गाइड समुदायों को स्थानीय समस्याओं की रिपोर्ट करने में मदद करता है और सार्वजनिक संस्थाओं को यह समझने में सहायता करता है कि बुनियादी ढांचे की ज़रूरतें कहाँ कम दर्ज हो सकती हैं।',
    philosophyQuote: '“सिर्फ़ शिकायतों की गिनती मत कीजिए। उनके पीछे की आवश्यकता को समझिए।”',
    aiAssistsNotice:
      'एआई सार्वजनिक निर्णय लेने में सहायता करता है। यह स्वायत्त रूप से सरकारी निर्णय नहीं लेता है।',
    aiAssisted: 'एआई-सहायता प्राप्त',

    // Top Utility Bar
    skipToMain: 'मुख्य विषयवस्तु पर जाएं',
    accessibility: 'सुलभता (Accessibility)',
    screenReader: 'स्क्रीन रीडर अनुकूल',
    textSize: 'फ़ॉन्ट आकार',
    contrast: 'कंट्रास्ट',
    normalContrast: 'सामान्य',
    highContrast: 'उच्च कंट्रास्ट',
    help: 'सहायता',
    contact: 'संपर्क',

    // Navigation
    navHome: 'होम',
    navReport: 'समस्या बताएं',
    navPriorities: 'सामुदायिक प्राथमिकताएं',
    navIssueGraph: 'इश्यू ग्राफ़ (Issue Graph)',
    navSilentNeed: 'मौन आवश्यकता आसूचना',
    navPlanning: 'नियोजन डैशबोर्ड',
    navTrack: 'अनुरोध ट्रैक करें',
    navTransparency: 'पारदर्शिता',
    navAbout: 'परिचय',
    navPrivacy: 'गोपनीयता',

    // CTAs
    ctaReport: 'समस्या की रिपोर्ट करें',
    ctaExplore: 'सामुदायिक प्राथमिकताएं देखें',
    ctaTrack: 'मेरा अनुरोध ट्रैक करें',
    ctaViewEvidence: 'साक्ष्य देखें',
    ctaViewDashboard: 'नियोजन डैशबोर्ड खोलें',

    // Process
    processHeading: 'नागरिक आवाज़ से कार्रवाई योग्य साक्ष्य तक',
    step1Title: 'नागरिक आवाज़',
    step1Desc: 'नागरिक अपनी पसंदीदा भाषा में टेक्स्ट या आवाज़ के माध्यम से समस्याओं की रिपोर्ट करते हैं।',
    step2Title: 'एआई समझ',
    step2Desc: 'एआई भाषा, समस्या, श्रेणी, तात्कालिकता और संबंधित रिपोर्टों की पहचान करता है।',
    step3Title: 'आवश्यकता आसूचना',
    step3Desc: 'नागरिक साक्ष्य को बुनियादी ढांचे के अंतर, पहुंच संकेतकों और मौजूदा परियोजनाओं के साथ परखा जाता है।',
    step4Title: 'मानवीय निर्णय',
    step4Desc: 'लोक अधिकारी पारदर्शी साक्ष्य प्राप्त करते हैं और तय करते हैं कि क्या कार्रवाई उचित है।',

    // Signature Feature: What are we missing?
    whatAreWeMissing: 'हमसे क्या छूट रहा है?',
    whatAreWeMissingSub:
      'दर्ज की गई शिकायतें हमेशा समुदाय की पूरी ज़रूरत का प्रतिनिधित्व नहीं करती हैं। ज़ेड सेवा गाइड उन संकेतों को देखता है जो कम रिपोर्ट की गई ज़रूरतों को दर्शाते हैं।',
    silentNeedDisclaimer: 'मौन आवश्यकता (Silent Need) सत्यापन का एक संकेतक है, आवश्यकता का अकाट्य प्रमाण नहीं।',
    fieldVerificationRec: 'मौके पर सत्यापन (Field Verification) की अनुशंसा',
    whyWasThisFlagged: 'इसे क्यों चिह्नित किया गया?',
    silentNeedExplanation:
      'इस क्षेत्र में बुनियादी ढांचे की भारी कमी है लेकिन नागरिकों की रिपोर्ट असामान्य रूप से कम है। कम रिपोर्टिंग सीमित डिजिटल पहुंच या अन्य बाधाओं से जुड़ी हो सकती है।',
    possibleSilentNeed: 'संभावित मौन आवश्यकता (Possible Silent Need)',
    unusuallyLow: 'असामान्य रूप से कम',

    // Issue Graph
    issueGraphTitle: 'इश्यू ग्राफ़: नागरिक आवाज़ों का एकत्रीकरण',
    issueGraphSub:
      'सिस्टम प्रत्येक शिकायत को अलग समस्या नहीं मानता। यह संबंधित रिपोर्टों को बुनियादी सामुदायिक मुद्दे से जोड़ता है।',
    reportsToIssue: 'नागरिक रिपोर्टें → १ मुख्य सामुदायिक समस्या',
    evidenceConfidence: 'साक्ष्य विश्वसनीयता',
    prioritySignal: 'प्राथमिकता संकेत',
    viewSupportingReports: 'संबंधित रिपोर्टें देखें',

    // Citizen Form
    reportFormTitle: 'अपने क्षेत्र की किसी समस्या के बारे में बताएं',
    reportStep1: 'विवरण दें',
    reportStep2: 'समीक्षा करें',
    reportStep3: 'जमा करें',
    selectLanguage: 'भाषा चुनें',
    problemPlaceholder: 'बताएं कि आपके क्षेत्र में क्या हो रहा है (उदा. 3 सप्ताह से पीने का पानी नहीं आ रहा, सड़क टूटी है)...',
    speakInstead: 'बोलकर बताएं',
    listening: 'सुन रहे हैं... कृपया अब बोलें',
    stopRecording: 'रोकें',
    useSampleVoice: 'या नमूना आवाज़ चुनें:',
    approxLocation: 'अनुमानित स्थान',
    locationPlaceholder: 'उदा. वार्ड 4, बस्ती सी, या डिंडोरी रोड',
    locationNote: 'मकान नंबर या सटीक व्यक्तिगत पता न दें।',
    categoryLabel: 'श्रेणी',
    anonymousLabel: 'गुमनाम रूप से रिपोर्ट करें (मेरा नाम या फ़ोन सार्वजनिक न करें)',
    privacyNoticeTitle: 'नागरिक गोपनीयता सूचना',
    privacyNoticeText:
      'हम केवल आवश्यक मरम्मत योजना के लिए अनुमानित स्थान एकत्र करते हैं। व्यक्तिगत संपर्क जानकारी सुरक्षित रखी जाती है।',
    nextReview: 'एआई समीक्षा के लिए आगे बढ़ें',
    submitReport: 'पुष्टि करें और रिपोर्ट जमा करें',
    back: 'पीछे',

    // AI Review
    aiUnderstandingHeading: 'एआई-सहायता प्राप्त विश्लेषण',
    aiGeneratedNotice: 'एआई-जनरेटेड सारांश · अंतिम जमा करने से पहले समीक्षा करें',
    detectedLang: 'पहचानी गई भाषा',
    identifiedIssue: 'समस्या',
    summaryLabel: 'सारांश',
    urgencyLabel: 'तात्कालिकता',
    similarReportsLabel: 'क्षेत्र में समान रिपोर्टें',
    confidenceScore: 'साक्ष्य विश्वसनीयता',

    // Submission Success
    submissionSuccessTitle: 'समस्या सफलतापूर्वक दर्ज कर ली गई है',
    trackingIdLabel: 'आपकी आधिकारिक ट्रैकिंग आईडी',
    keepTrackingId: 'प्रगति जांचने या प्रतिक्रिया देने के लिए इस आईडी को सुरक्षित रखें।',
    trackNow: 'स्थिति अभी जांचें',
    submitAnother: 'दूसरी समस्या रिपोर्ट करें',

    // Tracking
    trackTitle: 'मेरा अनुरोध ट्रैक करें',
    trackSubtitle: 'प्रशासनिक कार्रवाई की स्थिति देखने के लिए अपनी ट्रैकिंग आईडी दर्ज करें।',
    trackInputPlaceholder: 'उदा. ZSG-2026-00124',
    trackBtn: 'स्थिति जांचें',
    sampleIds: 'त्वरित डेमो आईडी:',
    currentStatus: 'वर्तमान स्थिति',
    timelineHeading: 'आधिकारिक कार्रवाई का विवरण',
    wasIssueResolved: 'क्या समस्या का समाधान हो गया?',
    resolved: 'पूर्ण समाधान हुआ',
    partiallyResolved: 'आंशिक समाधान हुआ',
    stillExists: 'समस्या अभी भी है',
    feedbackPrompt: 'समाधान पर नागरिक प्रतिक्रिया',
    feedbackPlaceholder: 'मरम्मत की स्थिति के बारे में बताएं...',
    sendFeedback: 'प्रतिक्रिया भेजें',

    // Planning Dashboard
    planningTitle: 'अवसंरचना प्राथमिकता डैशबोर्ड',
    planningSub: 'अधिकृत प्रशासनिक व नगर निगम अधिकारियों के लिए साक्ष्य-आधारित नियोजन।',
    statReports: 'नागरिक रिपोर्टें',
    statIssues: 'मुख्य समस्याएं',
    statAreasReview: 'समीक्षा हेतु क्षेत्र',
    statSilentNeeds: 'संभावित मौन आवश्यकताएं',
    priorityModelHeading: 'विन्यास योग्य प्राथमिकता मॉडल',
    priorityModelNotice:
      'नियोजन मॉडल के भार (Weights) विन्यास योग्य हैं और इन्हें वस्तुनिष्ठ सत्य नहीं माना जाना चाहिए।',
    adjustWeights: 'वेटिंग (Weights) बदलें',
    existingProjectsHeading: 'मौजूदा परियोजनाओं की स्थिति',
    humanReviewHeading: 'मानवीय समीक्षा एवं निर्णय',
    aiSuggestedAction: 'एआई अनुशंसित कार्रवाई',
    saveDecision: 'आधिकारिक निर्णय सुरक्षित करें',
    decisionSaved: 'निर्णय आधिकारिक ऑडिट लॉग में दर्ज हो गया है।',

    // Roles
    roleCitizen: 'नागरिक दृश्य',
    roleReviewer: 'समीक्षक (Reviewer)',
    rolePlanner: 'योजनाकार (Planner)',
    roleAdmin: 'प्रशासक (Admin)',
    activeRole: 'वर्तमान भूमिका',

    // Filters
    filterAll: 'सभी',
    filterDistrict: 'ज़िला',
    filterCategory: 'श्रेणी',
    filterStatus: 'स्थिति',
    filterSilentNeed: 'केवल मौन आवश्यकताएं दिखाएं',
    viewTable: 'तालिका दृश्य',
    viewGrid: 'स्थानिक सेक्टर ग्रिड',

    // Footer
    footerAbout: 'ज़ेड सेवा गाइड के बारे में',
    footerServices: 'नागरिक सेवाएं',
    footerInformation: 'सूचना एवं नीतियां',
    footerContact: 'जन संपर्क एवं सहायता',
    copyright: '© ज़ेड सेवा गाइड. भारतीय नागरिक आसूचना एवं अवसंरचना नियोजन मंच।',
    disclaimerFooter:
      'ज़ेड सेवा गाइड GIGW 3.0 मानकों के अंतर्गत मानवीय नियंत्रण में काम करता है। एआई केवल साक्ष्य प्रस्तुत करता है, अंतिम आदेश नहीं।',
  },
};
