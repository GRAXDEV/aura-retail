import React, { useState } from 'react';
import { ArrowRight, Check, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#18181B] text-zinc-400 py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-zinc-800">
          {/* Brand Info & Newsletter (5 cols) */}
          <div className="lg:col-span-5">
            <span className="text-xl font-serif tracking-widest uppercase font-semibold text-white block mb-4">
              Aura Retail
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-6">
              A modern luxury storefront engineered for enduring longevity. Small-batch apparel,
              vegetable-tanned leather goods, and hand-lasted footwear.
            </p>

            <div className="max-w-md">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-2">
                Private Dispatch & Releases
              </span>
              <p className="text-[11px] text-zinc-500 mb-3">
                Subscribe for private capsule previews. Receive 10% code{' '}
                <strong className="text-zinc-300 font-mono">WELCOME10</strong> for your first order.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-3.5 py-2.5 text-xs bg-zinc-900 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-md text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Welcome to Aura Dispatch. Use code <strong>WELCOME10</strong> at checkout.</span>
                </div>
              )}
            </div>
          </div>

          {/* Catalog Links (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-zinc-300 block mb-4">
              Collections
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#featured-catalog" className="hover:text-white transition-colors">
                  Merino Overshirts
                </a>
              </li>
              <li>
                <a href="#featured-catalog" className="hover:text-white transition-colors">
                  Tuscan Leather Bags
                </a>
              </li>
              <li>
                <a href="#featured-catalog" className="hover:text-white transition-colors">
                  Atelier Footwear
                </a>
              </li>
              <li>
                <a href="#featured-catalog" className="hover:text-white transition-colors">
                  Cashmere Scarves
                </a>
              </li>
              <li>
                <a href="#featured-catalog" className="hover:text-white transition-colors">
                  Leather Objects & Wallets
                </a>
              </li>
            </ul>
          </div>

          {/* Client Concierge (3 cols) */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase font-semibold tracking-wider text-zinc-300 block mb-4">
              Client Concierge
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-zinc-400">Complimentary 30-Day Returns</span>
              </li>
              <li>
                <span className="text-zinc-400">Lifetime Repair Program</span>
              </li>
              <li>
                <span className="text-zinc-400">Tailoring & Sizing Consultations</span>
              </li>
              <li>
                <span className="text-zinc-400">Carbon-Neutral Shipping Policy</span>
              </li>
              <li>
                <a
                  href="mailto:concierge@auraretail.com"
                  className="hover:text-white transition-colors underline"
                >
                  concierge@auraretail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Provenance & Standards (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-zinc-300 block mb-4">
              Atelier Standards
            </span>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>Biella, Italy</li>
              <li>Santa Croce sull’Arno, Italy</li>
              <li>Porto, Portugal</li>
              <li>Elgin, Scotland</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with payment badges and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-6">
            <p>© {new Date().getFullYear()} Aura Retail Inc. All rights reserved.</p>
            <a
              href="./aura-retail-project.zip"
              download="aura-retail-project.zip"
              className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 underline decoration-zinc-600 underline-offset-4 cursor-pointer font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project (.ZIP)</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
            <span>VISA</span>
            <span>·</span>
            <span>MASTERCARD</span>
            <span>·</span>
            <span>AMEX</span>
            <span>·</span>
            <span>APPLE PAY</span>
            <span>·</span>
            <span>KLARNA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
