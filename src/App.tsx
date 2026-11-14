import { type FormEvent, useState } from 'react';
import { AiAdvisorWidget } from './components/AiAdvisorWidget';
import { ApplicationWorkflow } from './components/ApplicationWorkflow';
import { CsvModal } from './components/CsvModal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { OnboardingFlow } from './components/OnboardingFlow';
import { INITIAL_COMPANY, INITIAL_GRANTS } from './data/mockData';
import type {
  ApplicationFormState,
  ApplicationStep,
  ChatMessage,
  CompanyProfile,
  CsvFormState,
  EmailNotification,
  GrantItem,
  GrantsTab,
  GrantStatus,
  OnboardingData,
  OnboardingStep,
} from './types/greenback';

export default function App() {
  const [company, setCompany] = useState<CompanyProfile>(INITIAL_COMPANY);
  const [grants, setGrants] = useState<GrantItem[]>(INITIAL_GRANTS);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('join');
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    contactName: 'Jordan Smith',
    email: 'finance@wasatchpeakutah.com',
    businessName: 'Wasatch Peak Landscaping LLC',
    field: 'Landscaping & Commercial Fleet',
    location: 'Salt Lake County, UT',
    accountingSource: 'QuickBooks Online',
    crmConnected: false,
  });

  const [grantStatuses, setGrantStatuses] = useState<Record<string, GrantStatus>>({
    'UT-FLEET-IDLE-DEMO': 'submitted',
  });
  const [grantsTab, setGrantsTab] = useState<GrantsTab>('available');
  const [activeApplication, setActiveApplication] = useState<GrantItem | null>(null);
  const [applicationStep, setApplicationStep] = useState<ApplicationStep>('heads-up');
  const [applicationForm, setApplicationForm] = useState<ApplicationFormState | null>(
    null,
  );
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);

  const [emailNotification, setEmailNotification] = useState<EmailNotification | null>({
    to: INITIAL_COMPANY.email,
    subject: 'GreenBack Alert: 2 Verified Utah Grants Matched (6:00 AM MT Digest)',
    body: 'We cross-checked your QuickBooks ledger against official Utah DEQ & Rocky Mountain Power feeds. Utah Clean Air Commercial Equipment Grant ($35,000) is a 96% match.',
    timestamp: 'Sent today at 6:00 AM MT',
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'agent',
      text: 'Hi! I am your GreenBack AI Agent. Ask me anything about your grant matches, Utah eligibility rules, or how much cash match you need.',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [floatingAiOpen, setFloatingAiOpen] = useState(false);

  const [formState, setFormState] = useState<CsvFormState>({
    name: company.name,
    email: company.email,
    location: company.location,
    revenue: company.revenue,
    cashReserves: company.cashReserves,
    fuelAndEnergySpend: company.fuelAndEnergySpend,
  });

  const handleFinishOnboarding = (selectedSource?: string, openCsvModal = false) => {
    const finalSource = selectedSource || onboardingData.accountingSource;
    const isRural =
      onboardingData.location.toLowerCase().includes('rural') ||
      onboardingData.location.toLowerCase().includes('grand');

    const updatedCompany: CompanyProfile = {
      ...company,
      contactName: onboardingData.contactName || 'Founder',
      name: onboardingData.businessName || company.name,
      field: onboardingData.field || 'Small Business',
      email: onboardingData.email || company.email,
      location: onboardingData.location || company.location,
      accountingSource: finalSource,
      crmConnected: onboardingData.crmConnected,
      crmName: onboardingData.crmConnected ? 'HubSpot CRM' : 'None',
    };

    setCompany(updatedCompany);
    setFormState((prev) => ({
      ...prev,
      name: updatedCompany.name,
      email: updatedCompany.email,
      location: updatedCompany.location,
    }));

    setGrants((prev) =>
      prev.map((g) => {
        if (g.id === 'USDA-REAP-RURAL') {
          return {
            ...g,
            eligible: isRural,
            matchScore: isRural ? 95 : 42,
            reason: isRural
              ? 'Qualifies! Your rural Utah location and energy spend meet USDA REAP rules.'
              : 'Requires a Rural Utah county designation (e.g., Grand County).',
          };
        }
        return g;
      }),
    );

    const skippedBooks = finalSource === 'Not Connected Yet';
    setEmailNotification({
      to: updatedCompany.email,
      subject: `Welcome to GreenBack, ${updatedCompany.name}! 2 Verified Grants Found`,
      body: skippedBooks
        ? `We matched 2 Utah grants for your ${updatedCompany.field} business in ${updatedCompany.location}. Connect your accounting software anytime to verify expenses and auto-fill applications.`
        : `Connected to ${finalSource} for your ${updatedCompany.field} business. We found $80,000 in eligible Utah grants ready for review.`,
      timestamp: 'Welcome email sent just now',
    });

    setOnboardingStep('dashboard');
    if (openCsvModal) {
      setCsvModalOpen(true);
    }
  };

  const handleOpenApplication = (grant: GrantItem) => {
    setActiveApplication(grant);
    setApplicationStep('heads-up');
    setReviewConfirmed(false);
    setApplicationForm({
      legalName: company.name,
      ein: company.ein,
      contactEmail: company.email,
      county: company.location,
      annualRevenue: company.revenue,
      verifiedEnergySpend: company.fuelAndEnergySpend,
      committedCashMatch: grant.matchRequired,
      narrative: `Applicant (${company.name}) operates in ${company.location} with ${company.employees} employees and $${company.fuelAndEnergySpend.toLocaleString()}/yr in verified fuel and utility expenses (${grant.ledgerCitation}). Requesting $${grant.award.toLocaleString()} to transition to low-emission commercial equipment, backed by $${company.cashReserves.toLocaleString()} in verified cash reserves to cover the $${grant.matchRequired.toLocaleString()} match.`,
    });
  };

  const triggerProactiveCheck = async () => {
    setIsSweeping(true);
    try {
      const res = await fetch('/api/grants/sweep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        const hit = data?.hit;
        if (hit && !grants.some((g) => g.id === (hit.number || 'FED-GRANT-LIVE'))) {
          setGrants((prev) => [
            ...prev,
            {
              id: hit.number || 'FED-GRANT-LIVE',
              title: hit.title || 'Federal Small Business Energy Grant',
              agency: hit.agencyName || 'Grants.gov Live Feed',
              officialUrl: `https://www.grants.gov/search-results-detail/${hit.id || ''}`,
              statuteOrAln: `Grants.gov Opp #${hit.number || 'LIVE'}`,
              verifiedDate: 'Verified just now via Grants.gov API',
              award: 50000,
              matchRequired: 10000,
              deadline: hit.closeDate || '2027',
              matchScore: 88,
              eligible: true,
              ledgerCitation: 'QuickBooks P&L Utility & Fleet Spend',
              reason:
                'Live federal grant fetched from Grants.gov matching small business energy criteria.',
            },
          ]);
        }
      }
    } catch {
      // Proceed with digest confirmation if upstream Grants.gov feed is unreachable
    } finally {
      setIsSweeping(false);
    }

    setEmailNotification({
      to: company.email,
      subject: `GreenBack 6:00 PM MT Email Digest: Verified Grants for ${company.name}`,
      body: `Email dispatched to ${company.email}: Verified $${company.revenue.toLocaleString()} revenue from ${company.accountingSource}. Open official grants are pre-filled and ready for your review.`,
      timestamp: 'Email sent just now',
    });
  };

  const handleSaveCsv = (e: FormEvent) => {
    e.preventDefault();
    const isRural =
      formState.location.toLowerCase().includes('rural') ||
      formState.location.toLowerCase().includes('grand');
    const updated: CompanyProfile = {
      ...company,
      name: formState.name,
      email: formState.email,
      location: formState.location,
      revenue: Number(formState.revenue),
      cashReserves: Number(formState.cashReserves),
      fuelAndEnergySpend: Number(formState.fuelAndEnergySpend),
      accountingSource: 'Uploaded CSV Ledger',
    };
    setCompany(updated);

    setGrants((prev) =>
      prev.map((g) => {
        if (g.id === 'USDA-REAP-RURAL') {
          return {
            ...g,
            eligible: isRural,
            matchScore: isRural ? 95 : 42,
            reason: isRural
              ? 'Qualifies! Your rural Utah location and energy spend meet USDA REAP rules.'
              : 'Requires a Rural Utah county designation (e.g., Grand County).',
          };
        }
        return g;
      }),
    );

    setCsvModalOpen(false);
    setEmailNotification({
      to: formState.email,
      subject: 'GreenBack Email Alert: Accounting CSV Imported & Grants Re-Verified',
      body: `Updated revenue ($${Number(formState.revenue).toLocaleString()}) and sent updated grant eligibility links to ${formState.email}.`,
      timestamp: 'Email sent just now',
    });
  };

  const handleSendMessage = async (customQuestion?: string) => {
    const question = (customQuestion || chatInput).trim();
    if (!question) return;

    const updatedMessages: ChatMessage[] = [
      ...chatMessages,
      { role: 'user', text: question },
    ];
    setChatMessages(updatedMessages);
    setChatInput('');
    setIsAiTyping(true);

    try {
      const systemContext = `You are GreenBack's helpful internal AI Grant Agent. Keep answers short (2-4 sentences), clear, and friendly.
Company Profile:
- Name: ${company.name} (${company.location})
- Revenue: $${company.revenue.toLocaleString()}
- Cash Reserves: $${company.cashReserves.toLocaleString()}
- Annual Fuel & Energy Spend: $${company.fuelAndEnergySpend.toLocaleString()}
- Accounting Source: ${company.accountingSource}
- CRM Connected: ${company.crmConnected ? company.crmName : 'No'}

Available Grants:
${grants
  .map(
    (g) =>
      `- ${g.title}: $${g.award.toLocaleString()} award, $${g.matchRequired.toLocaleString()} match required, Score: ${g.matchScore}%, Eligible: ${g.eligible}. Reason: ${g.reason}`,
  )
  .join('\n')}`;

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, systemContext }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.reply) {
          setChatMessages([...updatedMessages, { role: 'agent', text: data.reply }]);
          setIsAiTyping(false);
          return;
        }
      }
      throw new Error('Fallback to deterministic advisor response');
    } catch {
      const q = question.toLowerCase();
      let reply = `Based on your ${company.accountingSource} summary ($${company.revenue.toLocaleString()} revenue and $${company.cashReserves.toLocaleString()} cash reserves), you qualify for the Utah Clean Air Grant ($35,000) and the Wattsmart Energy Grant ($45,000).`;

      if (
        q.includes('usda') ||
        q.includes('rural') ||
        q.includes('ineligible') ||
        q.includes('why')
      ) {
        reply = `You currently match at 96% for the Utah Clean Air Grant because you are in ${company.location} with $${company.fuelAndEnergySpend.toLocaleString()}/yr in fuel & energy spend. The USDA REAP grant is marked ineligible unless your business operates in a rural Utah county like Grand County.`;
      } else if (q.includes('match') || q.includes('cash') || q.includes('cost')) {
        reply = `For the $35,000 Utah Clean Air Grant, you need an $8,750 (25%) cost-share match. Since your ledger shows $${company.cashReserves.toLocaleString()} in cash reserves, you easily meet the financial qualification.`;
      } else if (q.includes('apply') || q.includes('document')) {
        reply = `You can click "Apply Now" on any eligible grant card. I will automatically pre-fill your revenue, fuel/utility spend from ${company.accountingSource}${company.crmConnected ? `, and customer fleet data from ${company.crmName}` : ''}.`;
      }

      setChatMessages([...updatedMessages, { role: 'agent', text: reply }]);
      setIsAiTyping(false);
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-emerald-600 selection:text-white transition-colors duration-300 bg-[#F6F9F7] text-slate-900">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-64 bg-gradient-to-b from-emerald-500/[0.06] to-transparent z-0" />

      <Header
        onboardingStep={onboardingStep}
        isSweeping={isSweeping}
        onSetOnboardingStep={setOnboardingStep}
        onTriggerSweep={triggerProactiveCheck}
      />

      {onboardingStep !== 'dashboard' ? (
        <OnboardingFlow
          step={onboardingStep}
          data={onboardingData}
          onChangeData={setOnboardingData}
          onSetStep={setOnboardingStep}
          onFinishOnboarding={handleFinishOnboarding}
        />
      ) : activeApplication && applicationForm ? (
        <ApplicationWorkflow
          company={company}
          grant={activeApplication}
          step={applicationStep}
          form={applicationForm}
          reviewConfirmed={reviewConfirmed}
          onBackToWorkspace={() => setActiveApplication(null)}
          onSetStep={setApplicationStep}
          onChangeForm={setApplicationForm}
          onToggleReviewConfirmed={setReviewConfirmed}
          onSaveDraft={() => {
            setGrantStatuses({ ...grantStatuses, [activeApplication.id]: 'draft' });
            setEmailNotification({
              to: company.email,
              subject: `Saved in Drafts: ${activeApplication.title}`,
              body: `Your application is saved in Drafts. Direct official grant link (${activeApplication.officialUrl}) has been emailed to ${company.email}.`,
              timestamp: 'Email sent just now',
            });
            setActiveApplication(null);
          }}
          onSubmitApplication={() => {
            setGrantStatuses({ ...grantStatuses, [activeApplication.id]: 'submitted' });
            setEmailNotification({
              to: company.email,
              subject: `Application Submitted: ${activeApplication.title}`,
              body: `Confirmation emailed to ${company.email}. Estimated agency review time is ${activeApplication.estimatedReviewTime || '3–4 weeks'} with a ${activeApplication.matchScore}% approval prediction.`,
              timestamp: 'Email sent just now',
            });
            setApplicationStep('submitted-summary');
          }}
          onViewSubmittedGrants={() => {
            setActiveApplication(null);
            setGrantsTab('submitted');
          }}
        />
      ) : (
        <Dashboard
          company={company}
          grants={grants}
          grantStatuses={grantStatuses}
          grantsTab={grantsTab}
          emailNotification={emailNotification}
          onDismissEmailNotification={() => setEmailNotification(null)}
          onSetGrantsTab={setGrantsTab}
          onToggleAccountingProvider={() => {
            const nextSource =
              company.accountingSource === 'QuickBooks Online'
                ? 'Xero Accounting'
                : 'QuickBooks Online';
            setCompany({ ...company, accountingSource: nextSource });
            setEmailNotification({
              to: company.email,
              subject: `GreenBack Email Confirmation: Connected to ${nextSource}`,
              body: `Your ${nextSource} read-only ledger is synced. You will receive email-only notifications at 6:00 AM and 6:00 PM MT when new grants match.`,
              timestamp: 'Email sent just now',
            });
          }}
          onOpenCsvModal={() => setCsvModalOpen(true)}
          onToggleCrm={() => {
            const nextState = !company.crmConnected;
            setCompany({
              ...company,
              crmConnected: nextState,
              crmName: nextState ? 'HubSpot CRM' : 'None',
            });
            setEmailNotification({
              to: company.email,
              subject: nextState
                ? 'GreenBack Email Alert: HubSpot CRM Connected'
                : 'GreenBack Email Alert: CRM Disconnected',
              body: nextState
                ? 'Synced client projects & service locations to strengthen grant impact applications.'
                : 'CRM disconnected from grant profile.',
              timestamp: 'Email sent just now',
            });
          }}
          onOpenApplication={handleOpenApplication}
          onAskAiAboutGrant={(grant) => {
            setFloatingAiOpen(true);
            handleSendMessage(
              `What are the qualifications for the ${grant.title} and why did we score ${grant.matchScore}%?`,
            );
          }}
        />
      )}

      <AiAdvisorWidget
        open={floatingAiOpen}
        accountingSource={company.accountingSource}
        messages={chatMessages}
        input={chatInput}
        isTyping={isAiTyping}
        onToggleOpen={() => setFloatingAiOpen(!floatingAiOpen)}
        onChangeInput={setChatInput}
        onSendMessage={handleSendMessage}
      />

      <CsvModal
        open={csvModalOpen}
        formState={formState}
        onChangeForm={setFormState}
        onClose={() => setCsvModalOpen(false)}
        onSubmit={handleSaveCsv}
      />
    </div>
  );
}
