import {
  CheckCircle2,
  Database,
  Leaf,
  ShieldCheck,
  Sparkles,
  Upload,
} from 'lucide-react';
import type { OnboardingData, OnboardingStep } from '../types/greenback';

interface OnboardingFlowProps {
  step: Exclude<OnboardingStep, 'dashboard'>;
  data: OnboardingData;
  onChangeData: (next: OnboardingData) => void;
  onSetStep: (step: OnboardingStep) => void;
  onFinishOnboarding: (selectedSource?: string, openCsvModal?: boolean) => void;
}

const STEPS: Exclude<OnboardingStep, 'dashboard'>[] = [
  'join',
  'simple-info',
  'business-info',
  'connect-books',
];

export function OnboardingFlow({
  step,
  data,
  onChangeData,
  onSetStep,
  onFinishOnboarding,
}: OnboardingFlowProps) {
  const activeIdx = STEPS.indexOf(step);

  return (
    <main className="relative z-10 max-w-xl mx-auto px-4 py-12">
      {/* Segmented Progress Bar */}
      <div className="flex items-center justify-center gap-2 mb-6" aria-label="Onboarding progress">
        {STEPS.map((s, idx) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx <= activeIdx ? 'w-10 bg-emerald-600' : 'w-3 bg-slate-200'
            }`}
          />
        ))}
      </div>

      {step === 'join' && (
        <div className="bg-white border border-slate-200/90 rounded-[32px] p-8 md:p-11 shadow-[0_20px_50px_rgba(15,23,42,0.06)] text-center space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/25">
            <Leaf className="w-8 h-8" />
          </div>

          <div className="space-y-2.5">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Autonomous Grant Engine for Utah SMBs
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight text-balance">
              Find &amp; win environmental grants automatically
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              GreenBack connects to your books, checks official Utah &amp; federal grant feeds twice a day, and pre-fills your applications in seconds.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-1 text-left">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="text-[10px] font-bold uppercase text-slate-400">Avg Match</div>
              <div className="text-sm font-extrabold text-emerald-700 mt-0.5 tabular-nums">
                $80,000
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="text-[10px] font-bold uppercase text-slate-400">Daily Sweeps</div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5 tabular-nums">
                6AM &amp; 6PM
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="text-[10px] font-bold uppercase text-slate-400">Paperwork</div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">Pre-Filled</div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onSetStep('simple-info')}
              className="w-full py-4 px-6 rounded-2xl text-base font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Join GreenBack &rarr;
            </button>
          </div>

          <div className="flex items-center justify-center gap-5 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Takes 60 seconds
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Official .gov &amp; Utility feeds
            </span>
          </div>
        </div>
      )}

      {step === 'simple-info' && (
        <div className="bg-white border border-slate-200/90 rounded-[32px] p-8 md:p-10 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Step 1 of 3 &bull; Welcome
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
              Let&apos;s start with some simple info
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Where should we send your 6:00 AM &amp; 6:00 PM MT grant match emails?
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={data.contactName}
                onChange={(e) => onChangeData({ ...data, contactName: e.target.value })}
                placeholder="e.g. Jordan Smith"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Work Email (For Grant Alerts)
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => onChangeData({ ...data, email: e.target.value })}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onSetStep('join')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
            >
              &larr; Back
            </button>
            <button
              type="button"
              onClick={() => onSetStep('business-info')}
              className="px-8 py-3.5 rounded-2xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/15 transition"
            >
              Start &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 'business-info' && (
        <div className="bg-white border border-slate-200/90 rounded-[32px] p-8 md:p-10 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Step 2 of 3 &bull; Your Business
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
              Tell us a little about your business
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              We use your business field and Utah county to filter out irrelevant grants.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => onChangeData({ ...data, businessName: e.target.value })}
                placeholder="e.g. Wasatch Peak Landscaping LLC"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Business Field / Industry
              </label>
              <select
                value={data.field}
                onChange={(e) => onChangeData({ ...data, field: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Landscaping & Commercial Fleet">
                  Landscaping &amp; Commercial Fleet
                </option>
                <option value="Manufacturing & HVAC">
                  Manufacturing &amp; Facility Operations
                </option>
                <option value="Logistics, Delivery & Shuttle">
                  Logistics, Delivery &amp; Shuttle
                </option>
                <option value="Agriculture & Rural Energy">
                  Agriculture &amp; Rural Operations
                </option>
                <option value="Retail, Food & Hospitality">
                  Retail, Food &amp; Hospitality
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Utah County Location
              </label>
              <select
                value={data.location}
                onChange={(e) => onChangeData({ ...data, location: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Salt Lake County, UT">Salt Lake County, UT</option>
                <option value="Utah County, UT">Utah County, UT</option>
                <option value="Grand County, UT (Rural)">
                  Grand County, UT (Rural Utah)
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onSetStep('simple-info')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
            >
              &larr; Back
            </button>
            <button
              type="button"
              onClick={() => onSetStep('connect-books')}
              className="px-8 py-3.5 rounded-2xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/15 transition"
            >
              Next: Connect the Books &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 'connect-books' && (
        <div className="bg-white border border-slate-200/90 rounded-[32px] p-8 md:p-10 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Step 3 of 3 &bull; Connect the Books
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
              Connect your accounting software
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              We scan your fuel, utility, and cash reserve lines to prove grant eligibility automatically.
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => onFinishOnboarding('QuickBooks Online')}
              className="w-full p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Connect QuickBooks Online
                  </div>
                  <div className="text-xs text-slate-500">
                    1-click read-only sync (Recommended)
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 whitespace-nowrap shrink-0">
                Connect &rarr;
              </span>
            </button>

            <button
              type="button"
              onClick={() => onFinishOnboarding('Xero Accounting')}
              className="w-full p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 bg-white flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Connect Xero Accounting
                  </div>
                  <div className="text-xs text-slate-500">
                    Sync P&amp;L and balance sheet
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 whitespace-nowrap shrink-0">
                Connect &rarr;
              </span>
            </button>

            <button
              type="button"
              onClick={() => onFinishOnboarding('Uploaded CSV Ledger', true)}
              className="w-full p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 bg-white flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 text-emerald-700 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Upload Accounting CSV
                  </div>
                  <div className="text-xs text-slate-500">
                    Upload or enter revenue, cash &amp; energy spend
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 whitespace-nowrap shrink-0">
                Upload &rarr;
              </span>
            </button>
          </div>

          <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer text-xs text-slate-700">
            <input
              type="checkbox"
              checked={data.crmConnected}
              onChange={(e) => onChangeData({ ...data, crmConnected: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>
              Also connect <strong>CRM (HubSpot)</strong> to include customer project impact data
            </span>
          </label>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onSetStep('business-info')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 transition"
            >
              &larr; Back
            </button>

            <button
              type="button"
              onClick={() => onFinishOnboarding('Not Connected Yet')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition"
            >
              Skip &amp; Connect Later &rarr;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
