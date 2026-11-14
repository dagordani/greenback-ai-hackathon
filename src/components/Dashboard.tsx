import {
  ArrowUpRight,
  Bookmark,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Database,
  DollarSign,
  FileText,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  X,
  Zap,
} from 'lucide-react';
import type {
  CompanyProfile,
  EmailNotification,
  GrantItem,
  GrantsTab,
  GrantStatus,
} from '../types/greenback';

interface DashboardProps {
  company: CompanyProfile;
  grants: GrantItem[];
  grantStatuses: Record<string, GrantStatus>;
  grantsTab: GrantsTab;
  emailNotification: EmailNotification | null;
  onDismissEmailNotification: () => void;
  onSetGrantsTab: (tab: GrantsTab) => void;
  onToggleAccountingProvider: () => void;
  onOpenCsvModal: () => void;
  onToggleCrm: () => void;
  onOpenApplication: (grant: GrantItem) => void;
  onAskAiAboutGrant: (grant: GrantItem) => void;
}

export function Dashboard({
  company,
  grants,
  grantStatuses,
  grantsTab,
  emailNotification,
  onDismissEmailNotification,
  onSetGrantsTab,
  onToggleAccountingProvider,
  onOpenCsvModal,
  onToggleCrm,
  onOpenApplication,
  onAskAiAboutGrant,
}: DashboardProps) {
  const eligibleGrants = grants.filter(
    (g) => g.eligible && grantStatuses[g.id] !== 'submitted',
  );
  const submittedGrants = grants.filter((g) => grantStatuses[g.id] === 'submitted');
  const ineligibleGrants = grants.filter(
    (g) => !g.eligible && grantStatuses[g.id] !== 'submitted',
  );
  const totalAvailableAward = eligibleGrants.reduce((sum, g) => sum + g.award, 0);

  const visibleGrants = grants.filter((grant) => {
    if (grantsTab === 'submitted') return grantStatuses[grant.id] === 'submitted';
    if (grantsTab === 'ineligible')
      return !grant.eligible && grantStatuses[grant.id] !== 'submitted';
    return grant.eligible && grantStatuses[grant.id] !== 'submitted';
  });

  return (
    <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-7 space-y-7 pb-28">
      {/* 1. Email Dispatch Notification Banner */}
      {emailNotification && (
        <div className="bg-white/90 backdrop-blur-md border border-emerald-200/90 rounded-2xl px-4 py-3 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="font-extrabold uppercase tracking-wider text-emerald-700">
                  Email Alert Dispatched
                </span>
                <span className="text-slate-300">&middot;</span>
                <span className="font-medium text-slate-600">{emailNotification.to}</span>
                <span className="text-slate-300">&middot;</span>
                <span className="text-slate-400">{emailNotification.timestamp}</span>
              </div>
              <p className="text-xs text-slate-700 truncate mt-0.5">
                <strong className="text-slate-900">{emailNotification.subject}:</strong>{' '}
                {emailNotification.body}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onDismissEmailNotification}
            aria-label="Dismiss notification"
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Hero Unlock Banner + Accounting Summary */}
      <div className="space-y-5">
        <div className="w-full p-6 md:px-9 md:py-8 flex flex-col justify-between relative overflow-hidden bg-[#0B291E] text-white rounded-3xl shadow-lg border border-emerald-800/40">
          <div className="pointer-events-none absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
              <span className="text-emerald-400">
                Salt Lake City &middot; Clean Air &amp; Energy
              </span>
              <span className="text-emerald-200 tracking-wider">{company.location}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-300/90 mb-1">
                  Green<span className="text-emerald-400">Back</span> &bull; Live Green Money Unlocked
                </div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-[#F4F3EF] tabular-nums">
                  ${totalAvailableAward.toLocaleString()}
                </div>
                <p className="text-sm text-slate-200/95 mt-2">
                  Connect your books. See the green money your business qualifies for. Get it.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-emerald-100">
                Pre-verified across{' '}
                <strong className="text-emerald-400 tabular-nums">
                  {eligibleGrants.length} open grants
                </strong>{' '}
                for{' '}
                <span className="underline decoration-emerald-400/60 font-semibold text-white">
                  {company.name}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-emerald-200/75 block text-[10px] uppercase font-semibold tracking-wider">
                Ledger Source
              </span>
              <span className="font-bold text-white flex items-center gap-1.5 mt-0.5 text-sm">
                <Database className="w-3.5 h-3.5 text-emerald-300" />
                {company.accountingSource}
                {company.crmConnected && ` + ${company.crmName}`}
              </span>
            </div>

            <div className="text-right">
              <span className="text-emerald-200/75 block text-[10px] uppercase font-semibold tracking-wider">
                Daily Auto-Sweep
              </span>
              <span className="font-bold text-emerald-300 mt-0.5 block text-sm tabular-nums">
                6:00 AM &amp; 6:00 PM MT
              </span>
            </div>
          </div>
        </div>

        {/* Accounting Summary + Connection CTA Bar */}
        <div className="w-full p-6 flex flex-col justify-between space-y-5 bg-white border border-slate-200/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-extrabold text-slate-900">{company.name}</h2>
                  {company.field && (
                    <>
                      <span className="text-slate-300">&middot;</span>
                      <span className="text-xs font-medium text-slate-500">{company.field}</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Alerts sent strictly via email to{' '}
                  <strong className="text-slate-700">{company.email}</strong>
                </p>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Read-Only Ledger Sync
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Annual Revenue</span>
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-lg font-extrabold text-slate-900 mt-1 tabular-nums">
                ${company.revenue.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                SMB Size Cap Verified
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90">
              <div className="flex items-center justify-between text-[11px] text-emerald-800 font-medium">
                <span>Cash Reserves</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-lg font-extrabold text-emerald-700 mt-1 tabular-nums">
                ${company.cashReserves.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">
                Covers 25% Cost-Share
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <div className="flex items-center justify-between text-[11px] text-amber-900 font-medium">
                <span>Fuel &amp; Utility Spend</span>
                <Zap className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div className="text-lg font-extrabold text-amber-700 mt-1 tabular-nums">
                ${company.fuelAndEnergySpend.toLocaleString()}/yr
              </div>
              <div className="text-[10px] text-amber-800 font-semibold mt-0.5">
                Primary Grant Trigger
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Connect your books. See the green money your business qualifies for. Get it.
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Switch accounting provider, upload a fresh CSV, or link your CRM anytime.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onToggleAccountingProvider}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-xs whitespace-nowrap"
              >
                <Database className="w-3 h-3" />
                Connect QuickBooks / Xero
              </button>

              <button
                type="button"
                onClick={onOpenCsvModal}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition whitespace-nowrap"
              >
                <Upload className="w-3 h-3 text-emerald-600" />
                Upload Accounting CSV
              </button>

              <button
                type="button"
                onClick={onToggleCrm}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border transition whitespace-nowrap ${
                  company.crmConnected
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Users className="w-3 h-3 text-emerald-600" />
                {company.crmConnected ? 'CRM Connected' : 'Connect CRM (Optional)'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Grants Workspace with Segmented Tabs */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex flex-wrap p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs gap-1">
            <button
              type="button"
              onClick={() => onSetGrantsTab('available')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 whitespace-nowrap ${
                grantsTab === 'available'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Potential Grants to Apply
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] tabular-nums ${
                  grantsTab === 'available'
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {eligibleGrants.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSetGrantsTab('submitted')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 whitespace-nowrap ${
                grantsTab === 'submitted'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Submitted Applications
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] tabular-nums ${
                  grantsTab === 'submitted'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {submittedGrants.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSetGrantsTab('ineligible')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 whitespace-nowrap ${
                grantsTab === 'ineligible'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Not Qualified
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] tabular-nums ${
                  grantsTab === 'ineligible'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {ineligibleGrants.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified .gov &amp; Utility Portals Only
          </div>
        </div>

        {/* Grant Cards */}
        {visibleGrants.length === 0 ? (
          <div className="p-10 text-center bg-white border border-slate-200/80 rounded-3xl space-y-3">
            <p className="text-sm font-bold text-slate-900">No grants in this view</p>
            <p className="text-xs text-slate-500">
              {grantsTab === 'ineligible'
                ? 'All discovered grants currently match your business profile.'
                : 'Switch tabs or update your accounting CSV to re-evaluate grant matches.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {visibleGrants.map((grant) => {
              const status = grantStatuses[grant.id];
              const netBenefit = grant.award - grant.matchRequired;
              return (
                <div
                  key={grant.id}
                  className={`p-6 transition-all duration-200 flex flex-col justify-between group bg-white border border-slate-200/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] ${
                    grant.eligible
                      ? 'hover:border-emerald-400 hover:-translate-y-0.5'
                      : 'bg-slate-100/70 opacity-90'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-13 h-13 rounded-2xl flex flex-col items-center justify-center shrink-0 border ${
                            grant.eligible
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-slate-100 border-slate-300 text-slate-500'
                          }`}
                        >
                          <span className="text-sm font-black leading-none tabular-nums">
                            {grant.matchScore}%
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
                            Match
                          </span>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                            <span className="font-bold">{grant.agency}</span>
                            <span className="text-slate-300">&bull;</span>
                            <span className="font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Due {grant.deadline}
                            </span>
                            {status === 'draft' && (
                              <>
                                <span className="text-slate-300">&bull;</span>
                                <span className="font-bold text-amber-700">Draft Saved</span>
                              </>
                            )}
                            {status === 'submitted' && (
                              <>
                                <span className="text-slate-300">&bull;</span>
                                <span className="font-bold text-emerald-700">Submitted</span>
                              </>
                            )}
                          </div>

                          <h3 className="text-lg font-extrabold text-slate-900 mt-1 group-hover:text-emerald-800 transition-colors">
                            {grant.title}
                          </h3>
                        </div>
                      </div>

                      <div className="text-right bg-emerald-50/70 border border-emerald-200/80 px-4 py-2 rounded-2xl">
                        <div className="text-2xl font-black text-emerald-700 leading-none tabular-nums">
                          ${grant.award.toLocaleString()}
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500 mt-1 tabular-nums">
                          Cost-Share: ${grant.matchRequired.toLocaleString()} &bull; Net +$
                          {netBenefit.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200/70">
                      {grant.reason}
                    </p>

                    {status === 'submitted' && (
                      <div className="px-4 py-3 rounded-2xl bg-emerald-100/70 border border-emerald-300 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-2">
                        <span>
                          <strong>Est. Review Time:</strong>{' '}
                          {grant.estimatedReviewTime || '3–4 weeks'} &bull;{' '}
                          <strong>Expected Decision:</strong>{' '}
                          {grant.expectedPayoutDate || 'Jan 2027'}
                        </span>
                        <span className="font-extrabold text-emerald-800 tabular-nums">
                          AI Prediction: {grant.matchScore}% Approval Odds
                        </span>
                      </div>
                    )}

                    <div className="px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-700">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          <strong className="text-slate-900">{grant.statuteOrAln}</strong> &bull;
                          Verified via{' '}
                          <span className="font-medium text-emerald-800">
                            {grant.ledgerCitation}
                          </span>
                        </span>
                      </div>
                      <a
                        href={grant.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 shrink-0"
                      >
                        Official Portal <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onAskAiAboutGrant(grant)}
                      className="text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-emerald-50 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      Ask AI Agent about this grant
                    </button>

                    {grant.eligible && (
                      <button
                        type="button"
                        onClick={() => onOpenApplication(grant)}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap ${
                          status === 'submitted'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : status === 'draft'
                              ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20'
                        }`}
                      >
                        {status === 'submitted' ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> View Submitted Application
                          </>
                        ) : status === 'draft' ? (
                          <>
                            <Bookmark className="w-3.5 h-3.5" /> Resume Draft Application
                          </>
                        ) : (
                          <>
                            <FileText className="w-3.5 h-3.5" /> Apply Now (Review Form) &rarr;
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
