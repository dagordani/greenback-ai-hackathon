import { Send, Sparkles, X } from 'lucide-react';
import type { ChatMessage } from '../types/greenback';

interface AiAdvisorWidgetProps {
  open: boolean;
  accountingSource: string;
  messages: ChatMessage[];
  input: string;
  isTyping: boolean;
  onToggleOpen: () => void;
  onChangeInput: (value: string) => void;
  onSendMessage: (customQuestion?: string) => void;
}

const QUICK_PROMPTS = [
  'Which grants do I qualify for?',
  'Do we have enough cash match?',
  'Why is USDA REAP not qualified?',
];

export function AiAdvisorWidget({
  open,
  accountingSource,
  messages,
  input,
  isTyping,
  onToggleOpen,
  onChangeInput,
  onSendMessage,
}: AiAdvisorWidgetProps) {
  return (
    <div className="fixed right-5 bottom-6 z-40 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-[92vw] sm:w-[420px] bg-white border border-emerald-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
          <div className="bg-emerald-600 text-white px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-emerald-500/60">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold">GreenBack AI Advisor</div>
                <div className="text-[11px] text-emerald-100">
                  Online 24/7 &bull; Connected to {accountingSource}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleOpen}
              aria-label="Close AI Advisor"
              className="text-emerald-100 hover:text-white p-1.5 rounded-lg hover:bg-emerald-500/40"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 py-2.5 bg-emerald-50/70 border-b border-emerald-100 flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onSendMessage(q)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-xs text-slate-500 italic px-2">
                GreenBack AI is checking your ledger and grant rules...
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => onChangeInput(e.target.value)}
              placeholder="Ask about a grant or qualification..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={onToggleOpen}
        className="group flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl border-2 border-white transition-all"
        title="Open GreenBack AI Advisor Conversation"
      >
        <Sparkles className="w-4 h-4" />
        <div className="text-left">
          <div className="text-xs font-bold leading-none">
            {open ? 'Hide AI Chat' : 'Ask AI Grant Agent'}
          </div>
          <div className="text-[10px] text-emerald-100 leading-tight mt-0.5">
            Online &bull; View Full Chat
          </div>
        </div>
      </button>
    </div>
  );
}
