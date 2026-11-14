import type { FormEvent } from 'react';
import { X } from 'lucide-react';
import type { CsvFormState } from '../types/greenback';

interface CsvModalProps {
  open: boolean;
  formState: CsvFormState;
  onChangeForm: (next: CsvFormState) => void;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
}

export function CsvModal({
  open,
  formState,
  onChangeForm,
  onClose,
  onSubmit,
}: CsvModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="csv-modal-title"
        className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 id="csv-modal-title" className="text-sm font-bold text-slate-900">
            Upload or Edit Accounting CSV Summary
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-600 mb-1">Company Name</label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) => onChangeForm({ ...formState, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Notification Email Address</label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => onChangeForm({ ...formState, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Utah Location</label>
            <select
              value={formState.location}
              onChange={(e) => onChangeForm({ ...formState, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
            >
              <option value="Salt Lake County, UT">Salt Lake County, UT (Urban)</option>
              <option value="Utah County, UT">Utah County, UT (Urban)</option>
              <option value="Grand County, UT (Rural)">
                Grand County, UT (Rural - USDA Eligible)
              </option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-slate-600 mb-1">Revenue ($)</label>
              <input
                type="number"
                value={formState.revenue}
                onChange={(e) =>
                  onChangeForm({ ...formState, revenue: e.target.value })
                }
                className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 tabular-nums"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Cash ($)</label>
              <input
                type="number"
                value={formState.cashReserves}
                onChange={(e) =>
                  onChangeForm({ ...formState, cashReserves: e.target.value })
                }
                className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-emerald-700 font-semibold tabular-nums"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Energy/Fuel ($)</label>
              <input
                type="number"
                value={formState.fuelAndEnergySpend}
                onChange={(e) =>
                  onChangeForm({
                    ...formState,
                    fuelAndEnergySpend: e.target.value,
                  })
                }
                className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-amber-600 font-semibold tabular-nums"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Import &amp; Recalculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
