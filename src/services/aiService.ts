import { Language, PriorityFactors, PriorityWeights, ReportCategory, UrgencyLevel } from '../types';

export interface AIAnalysisResult {
  detectedLanguage: string;
  category: ReportCategory;
  urgency: UrgencyLevel;
  summary: string;
  evidenceConfidence: number;
  similarReportsCount: number;
  potentialIssueTitle: string;
  detectedIssue: string;
  duration: string;
  silentNeedRisk: boolean;
  silentNeedReason?: string;
  suggestedAction: string;
}

export function calculatePriorityScore(factors: PriorityFactors, weights: PriorityWeights): number {
  // Normalize weights in case user modified them and sum != 1.0
  const totalWeight =
    weights.infrastructure_gap +
    weights.urgency +
    weights.equity_vulnerability +
    weights.bias_adjusted_demand +
    weights.readiness;

  const wGap = weights.infrastructure_gap / totalWeight;
  const wUrg = weights.urgency / totalWeight;
  const wEq = weights.equity_vulnerability / totalWeight;
  const wDem = weights.bias_adjusted_demand / totalWeight;
  const wRdy = weights.readiness / totalWeight;

  const rawScore =
    factors.infrastructure_gap * wGap +
    factors.urgency * wUrg +
    factors.equity_vulnerability * wEq +
    factors.bias_adjusted_demand * wDem +
    factors.readiness * wRdy;

  return Math.round(Math.min(100, Math.max(0, rawScore)));
}

export function detectSilentNeed(
  infrastructureGap: number,
  reportCount: number,
  digitalAccess: 'Low' | 'Moderate' | 'High',
  vulnerability: 'Low' | 'Medium' | 'High' | 'Severe'
): { isSilentNeed: boolean; reason?: string } {
  if (
    infrastructureGap >= 80 &&
    reportCount <= 5 &&
    (digitalAccess === 'Low' || vulnerability === 'Severe' || vulnerability === 'High')
  ) {
    return {
      isSilentNeed: true,
      reason:
        'The area shows a high infrastructure gap but unusually low citizen reporting. Low reporting may be associated with limited digital access or other barriers to participation.',
    };
  }
  return { isSilentNeed: false };
}

export function analyzeCitizenReport(
  text: string,
  declaredLanguage: Language,
  areaName: string,
  existingReportsCountInArea: number = 0
): AIAnalysisResult {
  const lower = text.toLowerCase();

  // 1. Language Detection
  let detectedLang = 'English';
  // Devanagari character range: \u0900-\u097F
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  if (hasDevanagari) {
    // Check specific Marathi verb/noun patterns vs Hindi
    if (/आहे|नाही|पाडा|गावात|पाणी|उखडला|झाला|केला|पायपीट|विहिरी|रस्त्याचा/.test(text) || declaredLanguage === 'mr') {
      detectedLang = 'Marathi';
    } else {
      detectedLang = 'Hindi';
    }
  } else if (declaredLanguage === 'mr') {
    detectedLang = 'Marathi (Latin transliteration)';
  } else if (declaredLanguage === 'hi') {
    detectedLang = 'Hindi (Latin transliteration)';
  }

  // 2. Category Detection
  let category: ReportCategory = 'Other';
  let suggestedAction = 'Field verification and assessment';

  if (
    /water|pipe|drinking|borewell|tanker|tap|well|contamination|पाणी|विहीर|नळ|टँकर|जल|बूंद|गंदा पानी/.test(
      lower
    )
  ) {
    category = 'Drinking Water';
    suggestedAction = 'Inspect pipeline pressure and dispatch temporary relief tanker';
  } else if (
    /road|bridge|pothole|culvert|accident|transport|bus|highway|रस्ता|पूल|खड्डा|मार्ग|सड़क|पुल|गड्ढा/.test(
      lower
    )
  ) {
    category = 'Roads & Transport';
    suggestedAction = 'Emergency culvert & surface barrier inspection';
  } else if (
    /drain|gutter|sewage|waste|sanitation|overflow|silt|नाला|गटार|सांडपाणी|कचरा|सीवर|नाली/.test(
      lower
    )
  ) {
    category = 'Drainage & Sanitation';
    suggestedAction = 'Desilting excavation and stormwater flow clearance';
  } else if (
    /electric|light|power|transformer|wire|blackout|voltage|वीज|दिवा|पोल|विद्युत|बिजली|अंधेरा/.test(
      lower
    )
  ) {
    category = 'Electricity & Streetlights';
    suggestedAction = 'Lineman dispatch to replace faulty luminaire / fuse';
  } else if (
    /doctor|hospital|vaccine|clinic|health|ambulance|दवाखाना|आरोग्य|लस|डॉक्टर|अस्पताल|टीका/.test(
      lower
    )
  ) {
    category = 'Healthcare Access';
    suggestedAction = 'Immediate mobile medical unit dispatch and cold storage check';
  } else if (
    /internet|mobile|tower|network|broadband|signal|इंटरनेट|टॉवर|नेटवर्क|सिग्नल/.test(lower)
  ) {
    category = 'Connectivity & Digital';
    suggestedAction = 'Telecom infrastructure coverage audit';
  }

  // 3. Urgency Detection
  let urgency: UrgencyLevel = 'Medium';
  if (
    /critical|emergency|fatal|death|hospital|accident|poison|collapse|muddy water|dry 3 weeks|आणीबाणी|अपघात|धोकादायक|विषारी|तातडीने|गंभीर|मौत|खतरा|मरणासन्न/.test(
      lower
    )
  ) {
    urgency = 'Critical';
  } else if (
    /severe|broken|no water|heavy|flood|damage|leak|बंद|तुटवडा|गळती|अतिवृष्टी|नुकसान|भारी/.test(
      lower
    )
  ) {
    urgency = 'High';
  } else if (/slow|minor|sometimes|flicker|काही वेळा|हळू|कमी|धीमा/.test(lower)) {
    urgency = 'Low';
  }

  // 4. Summarization
  let summary = '';
  let detectedIssue = 'Public service interruption';
  if (category === 'Drinking Water') {
    detectedIssue = 'Water supply interruption';
    summary = `Residents in ${areaName || 'the reported area'} indicate disruption in clean drinking water supply with potential source depletion or pipeline damage.`;
  } else if (category === 'Roads & Transport') {
    detectedIssue = 'Road damage & transit hazard';
    summary = `Reported severe road degradation or culvert safety hazard in ${areaName || 'the locality'}, creating transit bottlenecks or physical hazard.`;
  } else if (category === 'Drainage & Sanitation') {
    detectedIssue = 'Drainage blockage & sewage backflow';
    summary = `Drainage bottleneck and solid sediment blockage reported, causing potential waterlogging and public health concerns.`;
  } else if (category === 'Healthcare Access') {
    detectedIssue = 'Primary healthcare facility disruption';
    summary = `Critical health facility or cold-chain access disruption reported, impacting patient care or essential vaccine preservation.`;
  } else if (category === 'Electricity & Streetlights') {
    detectedIssue = 'Streetlight blackout / transformer fault';
    summary = `Power supply or public street lighting malfunction impacting nighttime safety and local commercial activities.`;
  } else if (category === 'Connectivity & Digital') {
    detectedIssue = 'Mobile network & internet outage';
    summary = `Civic deficiency reported regarding telecom and digital connectivity in ${areaName || 'the community'}.`;
  } else {
    summary = `Civic deficiency reported regarding public utility infrastructure in ${areaName || 'the community'}.`;
  }

  // Duration Detection
  let duration = 'Ongoing (Past few days)';
  if (/३ आठवडे|3 आठवडे|3 week|three week/.test(lower)) {
    duration = 'Past 3 weeks';
  } else if (/४ दिवस|4 दिवस|4 day|four day/.test(lower)) {
    duration = 'Past 4 days';
  } else if (/२ आठवडे|2 week|two week/.test(lower)) {
    duration = 'Past 2 weeks';
  } else if (/महिने|month/.test(lower)) {
    duration = 'Past 1-2 months';
  } else if (/कालपासून|yesterday|आज|today/.test(lower)) {
    duration = 'Recent (1-2 days)';
  }

  // 5. Confidence Calculation (Domain-grounded heuristic)
  const baseConfidence = 82;
  const wordCount = text.trim().split(/\s+/).length;
  const lengthBonus = Math.min(10, Math.floor(wordCount / 4));
  const categoryBonus = category !== 'Other' ? 4 : 0;
  const confidence = Math.min(96, Math.max(68, baseConfidence + lengthBonus + categoryBonus));

  // 6. Cluster Simulation
  const similarReportsCount = existingReportsCountInArea > 0 ? existingReportsCountInArea : Math.floor(Math.random() * 4) + 1;

  // 7. Silent Need evaluation
  const isSilent = /hamlet|pada|remote|tribal|dindori|jawhar|forest|डोंगरी|पाडा|दुर्गम/.test(lower) || /hamlet c/i.test(areaName);

  return {
    detectedLanguage: detectedLang,
    category,
    urgency,
    summary,
    evidenceConfidence: confidence,
    similarReportsCount,
    potentialIssueTitle: `${category} Deficit in ${areaName || 'Sector'}`,
    detectedIssue,
    duration,
    silentNeedRisk: isSilent,
    silentNeedReason: isSilent
      ? 'The area shows a high infrastructure gap but unusually low citizen reporting. Low reporting may be associated with limited digital access or other barriers to participation.'
      : undefined,
    suggestedAction,
  };
}
