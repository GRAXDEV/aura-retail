import React, { useState } from 'react';
import { useStore, CURRENCIES } from '../context/StoreContext';
import { CurrencyConfig } from '../types';
import { X, ChevronDown } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const { amountUntilFreeShipping, currency, setCurrency } = useStore();

  if (dismissed) return null;

  return (
    <div className="relative bg-[#18181B] text-[#E4E4E7] text-[12px] font-medium tracking-wide py-2 px-4 border-b border-white/10 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Region / Currency Switcher */}
        <div className="relative hidden sm:block shrink-0">
          <button
            onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Select currency"
          >
            <span>{currency.code} ({currency.symbol})</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>

          {showCurrencyMenu && (
            <div className="absolute top-full left-0 mt-1.5 w-36 bg-[#27272A] border border-white/10 rounded-md shadow-xl py-1 z-50">
              {Object.values(CURRENCIES).map((c: CurrencyConfig) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c);
                    setShowCurrencyMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-[11px] flex items-center justify-between hover:bg-zinc-700/60 transition-colors ${
                    currency.code === c.code ? 'text-white font-semibold' : 'text-zinc-300'
                  }`}
                >
                  <span>{c.code}</span>
                  <span className="text-zinc-400">{c.symbol}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Conversion Benefit Statement */}
        <div className="flex-1 text-center truncate">
          {amountUntilFreeShipping === 0 ? (
            <span className="text-emerald-400 font-medium">
              You unlocked complimentary worldwide express delivery
            </span>
          ) : (
            <span>
              Complimentary express shipping on orders over $150 · Same-day fulfillment before 2 PM
            </span>
          )}
        </div>

        {/* Right: Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="text-zinc-400 hover:text-white transition-colors shrink-0 p-0.5 cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
