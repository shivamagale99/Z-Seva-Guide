import React from 'react';
import { HelpCircle, Phone, Mail, MapPin, X, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, currentLang }) => {
  const t = translations[currentLang];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-[#D9E0E7] overflow-hidden">
        <div className="bg-[#0B3D91] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">Help & Citizen Guidance</h3>
          </div>
          <button type="button" onClick={onClose} className="text-white hover:text-amber-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[80vh] overflow-y-auto">
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">How do I report a problem?</h4>
            <p className="leading-relaxed">
              Navigate to <strong>Report a Problem</strong>. Choose Marathi, Hindi, or English. You can type or tap the microphone to speak. Provide an approximate ward, village, or locality (never an exact house address).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">What is a Silent Need?</h4>
            <p className="leading-relaxed">
              A Silent Need is an area where physical infrastructure is heavily lacking (e.g. 90%+ water deficit), but where few online complaints have been filed due to limited digital access. Z Seva Guide alerts officials to send field surveyors.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">How do I track my report?</h4>
            <p className="leading-relaxed">
              Use your 12-character Reference ID (e.g., <code className="font-mono text-[#0B3D91]">ZSG-2026-00124</code>) on the <strong>Track Request</strong> page to monitor the official workflow from receipt to completed verification.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Is my identity confidential?</h4>
            <p className="leading-relaxed">
              Yes. All submissions can be made anonymously. We do not publish citizen names or telephone numbers on public dashboards.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 px-5 py-3 border-t border-[#D9E0E7] text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-[#0B3D91] text-white rounded hover:bg-[#163A5F]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, currentLang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-[#D9E0E7] overflow-hidden">
        <div className="bg-[#163A5F] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">Public Contact & Civic Desk</h3>
          </div>
          <button type="button" onClick={onClose} className="text-white hover:text-amber-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-700">
          <div className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded border border-[#D9E0E7]">
            <Phone className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Civic Assistance Toll-Free</span>
              <span className="font-mono text-sm text-[#0B3D91] font-bold">1800-2026-SEVA</span>
              <span className="text-[11px] text-slate-500 block">Operating Hours: 08:00 AM – 08:00 PM IST</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded border border-[#D9E0E7]">
            <Mail className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Official Support Email</span>
              <span className="font-mono text-[#0B3D91]">contact@zsevaguide.org</span>
              <span className="text-[11px] text-slate-500 block">For public queries and municipal grievance coordination</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded border border-[#D9E0E7]">
            <MapPin className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">District Civic Intelligence Cell</span>
              <span>District Planning & Collectorate Infrastructure Wing</span>
              <span className="text-[11px] text-slate-500 block">Maharashtra, India</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-5 py-3 border-t border-[#D9E0E7] text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-[#163A5F] text-white rounded hover:bg-[#0B3D91]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
