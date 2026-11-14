import { Leaf, Mail } from 'lucide-react';
import type { OnboardingStep } from '../types/greenback';

interface HeaderProps {
  onboardingStep: OnboardingStep;
  isSweeping: boolean;
  onSetOnboardingStep: (step: OnboardingStep) => void;
  onTriggerSweep: () => void;
}

export function Header({
  onboardingStep,
  isSweeping,
  onSetOnboardingStep,
  onTriggerSweep,
}: HeaderProps) {
  return (
    <header className="border-b sticky top-0 z-30 backdrop-blur-xl bg-white/85 border-emerald-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-[#0B291E] flex items-center justify-center text-white shadow-md shadow-emerald-900/20 shrink-0">
            <Leaf className="w-5 h-5 text-emerald-400 stroke-[2.3]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight text-slate-900">
                Green<span className="text-emerald-600">Back</span>
              </h1>
              <span className="text-[11px] font-semibold text-emerald-800">
                Salt Lake City &middot; Clean Air &amp; Energy
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Connect your books. See the green money your business qualifies for. Get it.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onboardingStep !== 'dashboard' ? (
            <button
              type="button"
              onClick={() => onSetOnboardingStep('dashboard')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/90 shadow-xs transition whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Skip to Dashboard &rarr;
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onSetOnboardingStep('join')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200/80 transition whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Onboarding Flow
              </button>
              <button
                type="button"
                disabled={isSweeping}
                onClick={onTriggerSweep}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#0B291E] hover:bg-emerald-900 disabled:opacity-70 text-white shadow-sm transition whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                {isSweeping ? 'Sweeping Feeds...' : '6PM Email Sweep'}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
