export type OnboardingStep =
  | 'join'
  | 'simple-info'
  | 'business-info'
  | 'connect-books'
  | 'dashboard';

export type GrantStatus = 'draft' | 'submitted';

export type GrantsTab = 'available' | 'submitted' | 'ineligible';

export type ApplicationStep = 'heads-up' | 'form' | 'submitted-summary';

export interface CompanyProfile {
  contactName: string;
  name: string;
  field: string;
  email: string;
  ein: string;
  location: string;
  employees: number;
  revenue: number;
  cashReserves: number;
  fuelAndEnergySpend: number;
  accountingSource: string;
  crmConnected: boolean;
  crmName: string;
}

export interface GrantItem {
  id: string;
  title: string;
  agency: string;
  officialUrl: string;
  statuteOrAln: string;
  verifiedDate: string;
  award: number;
  matchRequired: number;
  deadline: string;
  matchScore: number;
  eligible: boolean;
  estimatedReviewTime?: string;
  expectedPayoutDate?: string;
  approvalPrediction?: string;
  ledgerCitation: string;
  reason: string;
}

export interface OnboardingData {
  contactName: string;
  email: string;
  businessName: string;
  field: string;
  location: string;
  accountingSource: string;
  crmConnected: boolean;
}

export interface ApplicationFormState {
  legalName: string;
  ein: string;
  contactEmail: string;
  county: string;
  annualRevenue: number;
  verifiedEnergySpend: number;
  committedCashMatch: number;
  narrative: string;
}

export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  timestamp: string;
}

export interface ChatMessage {
  role: 'agent' | 'user';
  text: string;
}

export interface CsvFormState {
  name: string;
  email: string;
  location: string;
  revenue: number | string;
  cashReserves: number | string;
  fuelAndEnergySpend: number | string;
}
