import {
  Bookmark,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type {
  ApplicationFormState,
  ApplicationStep,
  CompanyProfile,
  GrantItem,
} from '../types/greenback';

interface ApplicationWorkflowProps {
  company: CompanyProfile;
  grant: GrantItem;
  step: ApplicationStep;
  form: ApplicationFormState;
  reviewConfirmed: boolean;
  onBackToWorkspace: () => void;
  onSetStep: (step: ApplicationStep) => void;
  onChangeForm: (form: ApplicationFormState) => void;
  onToggleReviewConfirmed: (confirmed: boolean) => void;
  onSaveDraft: () => void;
  onSubmitApplication: () => void;
  onViewSubmittedGrants: () => void;
}

export function ApplicationWorkflow({
  company,
  grant,
  step,
  form,
  reviewConfirmed,
  onBackToWorkspace,
  onSetStep,
  onChangeForm,
  onToggleReviewConfirmed,
  onSaveDraft,
  onSubmitApplication,
  onViewSubmittedGrants,
}: ApplicationWorkflowProps) {
  return (
    <main className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6 pb-28">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToWorkspace}
          className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-xs"
        >
          &larr; Back to Grants Workspace
        </button>
      </div>

      {step === 'heads-up' && (
        <div className="bg-white border border-emerald-200/90 rounded-[32px] p-10 md:p-14 shadow-[0_20px_50px_rgba(16,185,129,0.08)] text-center max-w-2xl mx-auto space-y-6 my-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 text-balance">
              We filled everything out for you!
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Your application for the{' '}
              <strong className="text-slate-900">{grant.title}</strong> is ready. Please
              give your numbers a quick 1-minute look before submitting—applications that
              are personally reviewed have a much higher chance of winning the grant!
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBackToWorkspace}
              className="px-5 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSetStep('form')}
              className="px-8 py-3.5 rounded-2xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 'submitted-summary' && (
        <div className="bg-white border border-emerald-200 rounded-[32px] p-8 md:p-12 shadow-sm max-w-2xl mx-auto space-y-6 my-4">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Application Submitted &amp; Emailed
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                You&apos;re in! Here is what to expect next:
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500">Estimated Review Time</div>
              <div className="text-lg font-extrabold text-slate-900 mt-1">
                {grant.estimatedReviewTime || '3–4 weeks'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">By {grant.agency}</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-xs text-emerald-800">AI Approval Prediction</div>
              <div className="text-lg font-extrabold text-emerald-700 mt-1 tabular-nums">
                {grant.matchScore}% Likely
              </div>
              <div className="text-[11px] text-emerald-800 mt-0.5">
                Verified ledger boosts priority
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500">Expected Decision &amp; Funds</div>
              <div className="text-lg font-extrabold text-slate-900 mt-1">
                {grant.expectedPayoutDate || 'January 2027'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 tabular-nums">
                Award: ${grant.award.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
            <strong>Why your prediction is strong:</strong>{' '}
            {grant.approvalPrediction ||
              'Applications backed by direct QuickBooks/Xero expense line-items pass state financial audit checks 2x faster.'}{' '}
            We will email <strong>{company.email}</strong> the moment the agency updates
            your status.
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onViewSubmittedGrants}
              className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
            >
              View in Submitted Grants Tab &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 'form' && (
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-10 shadow-sm space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Auto-Populated from {company.accountingSource}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1.5">
                {grant.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                {grant.agency} &bull; Award Amount:{' '}
                <strong className="text-emerald-700">
                  ${grant.award.toLocaleString()}
                </strong>{' '}
                &bull; Deadline: {grant.deadline}
              </p>
            </div>

            <a
              href={grant.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1.5 text-xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Official Grant Website ({grant.statuteOrAln})
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-5 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Legal Business Name
                </label>
                <input
                  type="text"
                  value={form.legalName}
                  onChange={(e) => onChangeForm({ ...form, legalName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Applicant Notification Email
                </label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    onChangeForm({ ...form, contactEmail: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Federal EIN &amp; Registered Utah County
                </label>
                <input
                  type="text"
                  value={`${form.ein} • ${form.county}`}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Verified Ledger Citation (Source of Truth)
                </label>
                <input
                  type="text"
                  value={grant.ledgerCitation}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Annual Gross Revenue ($)
                </label>
                <input
                  type="number"
                  value={form.annualRevenue}
                  onChange={(e) =>
                    onChangeForm({ ...form, annualRevenue: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Annual Fuel &amp; Utility Spend ($)
                </label>
                <input
                  type="number"
                  value={form.verifiedEnergySpend}
                  onChange={(e) =>
                    onChangeForm({
                      ...form,
                      verifiedEnergySpend: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-amber-700 font-bold tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Committed Cost-Share Match ($)
                </label>
                <input
                  type="number"
                  value={form.committedCashMatch}
                  onChange={(e) =>
                    onChangeForm({
                      ...form,
                      committedCashMatch: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-emerald-700 font-bold tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Project Impact &amp; Financial Justification Narrative (Editable)
              </label>
              <textarea
                rows={5}
                value={form.narrative}
                onChange={(e) => onChangeForm({ ...form, narrative: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed focus:outline-none focus:border-emerald-500"
              />
            </div>

            <label className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 cursor-pointer">
              <input
                type="checkbox"
                checked={reviewConfirmed}
                onChange={(e) => onToggleReviewConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-800 leading-relaxed">
                <strong>Applicant Review Confirmation:</strong> I have carefully reviewed
                the pre-filled financial figures from{' '}
                <strong>{company.accountingSource}</strong> and the project narrative
                above, and I confirm everything is accurate for submission.
              </span>
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onSetStep('heads-up')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={onSaveDraft}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5"
              >
                <Bookmark className="w-4 h-4" /> Save in Drafts (With Official Grant Link)
              </button>
            </div>

            <button
              type="button"
              disabled={!reviewConfirmed}
              onClick={onSubmitApplication}
              className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                reviewConfirmed
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" /> Confirm &amp; Submit Application
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
