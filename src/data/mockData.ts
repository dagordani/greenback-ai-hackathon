import type { CompanyProfile, GrantItem } from '../types/greenback';

export const INITIAL_COMPANY: CompanyProfile = {
  contactName: 'Jordan Smith',
  name: 'Wasatch Peak Landscaping LLC',
  field: 'Landscaping & Commercial Fleet',
  email: 'finance@wasatchpeakutah.com',
  ein: '87-0492811',
  location: 'Salt Lake County, UT',
  employees: 18,
  revenue: 1420000,
  cashReserves: 54000,
  fuelAndEnergySpend: 24600,
  accountingSource: 'QuickBooks Online',
  crmConnected: false,
  crmName: 'None',
};

export const INITIAL_GRANTS: GrantItem[] = [
  {
    id: 'UT-DEQ-CLEAN-AIR',
    title: 'Utah Clean Air Commercial Equipment Grant',
    agency: 'Utah Dept. of Environmental Quality (DEQ)',
    officialUrl: 'https://deq.utah.gov/air-quality/clean-air-grants',
    statuteOrAln: 'Utah Code § 19-2-104 | DEQ-2026-CA',
    verifiedDate: 'Verified today at 6:00 AM MT',
    award: 35000,
    matchRequired: 8750,
    deadline: 'Dec 15, 2026',
    matchScore: 96,
    eligible: true,
    estimatedReviewTime: '3–4 weeks',
    expectedPayoutDate: 'Mid-January 2027',
    approvalPrediction:
      'High (Top 10% of Utah SMB applicants with verified QuickBooks ledger proof)',
    ledgerCitation:
      'QuickBooks Acct #6140 (Fleet Fuel: $24,600) & Acct #1010 (Operating Cash: $54,000)',
    reason:
      'Qualifies based on Salt Lake County location, $24.6k fuel/energy spend, and $54k cash reserves covering the $8,750 required match.',
  },
  {
    id: 'RMP-WATTSMART-UT',
    title: 'Wattsmart Business Energy & HVAC Retrofit Grant',
    agency: 'Rocky Mountain Power & Utah OED',
    officialUrl:
      'https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives.html',
    statuteOrAln: 'Utah PSC Tariff Schedule 140',
    verifiedDate: 'Verified today at 6:00 AM MT',
    award: 45000,
    matchRequired: 13500,
    deadline: 'Jan 30, 2027',
    matchScore: 91,
    eligible: true,
    estimatedReviewTime: '2–3 weeks',
    expectedPayoutDate: 'Early February 2027',
    approvalPrediction:
      'Very Strong (89% historical approval rate for Utah commercial utility customers)',
    ledgerCitation:
      'QuickBooks Acct #6210 (Commercial Utilities) & Payroll Headcount (18 FTE)',
    reason:
      'Qualifies based on Utah commercial utility spend and small business headcount (18 employees).',
  },
  {
    id: 'USDA-REAP-RURAL',
    title: 'USDA Rural Energy for America (REAP) Solar Grant',
    agency: 'USDA Rural Development Utah',
    officialUrl:
      'https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans/ut',
    statuteOrAln: 'Federal ALN / CFDA #10.868',
    verifiedDate: 'Verified today at 6:00 AM MT',
    award: 80000,
    matchRequired: 40000,
    deadline: 'Mar 31, 2027',
    matchScore: 42,
    eligible: false,
    estimatedReviewTime: '6–8 weeks',
    expectedPayoutDate: 'May 2027',
    approvalPrediction: 'Moderate (Competitive rural scoring pool)',
    ledgerCitation: 'Company Address Profile: Salt Lake County (Non-Rural Classification)',
    reason:
      'Requires a Rural Utah county designation (e.g., Grand or Iron County). Salt Lake County is classified as urban.',
  },
  {
    id: 'UT-FLEET-IDLE-DEMO',
    title: 'Utah Idle-Free & Electric Auxiliary Power Grant',
    agency: 'Utah Division of Air Quality (DAQ)',
    officialUrl: 'https://deq.utah.gov/air-quality/clean-diesel-program',
    statuteOrAln: 'Utah DAQ Clean Fleet #2026-09',
    verifiedDate: 'Submitted Nov 2, 2026',
    award: 18500,
    matchRequired: 3700,
    deadline: 'Nov 15, 2026',
    matchScore: 98,
    eligible: true,
    estimatedReviewTime: '2–3 weeks',
    expectedPayoutDate: 'Late November 2026',
    approvalPrediction: 'Very High (98% match — currently in final agency review)',
    ledgerCitation: 'QuickBooks Acct #6140 (Fleet Fuel) & Vehicle Asset Register',
    reason:
      'Pre-submitted demo application for idle-reduction and electric auxiliary fleet units.',
  },
];
