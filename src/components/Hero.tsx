import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, heroImg } from '../data/products';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveProductModal, formatPrice } = useStore();
  const heroProduct = PRODUCTS[0]; // Merino Architectural Overshirt

  const handleScrollToCatalog = () => {
    const el = document.getElementById('featured-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative border-b border-zinc-200/80 bg-[#FBFBFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Value Proposition & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              <span className="text-zinc-900 font-bold">Aura Retail</span>
              <span aria-hidden="true">·</span>
              <span>Autumn / Winter Capsule</span>
              <span aria-hidden="true">·</span>
              <span>Small-Batch Italian Craft</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-zinc-950 leading-[1.12] mb-6 [text-wrap:balance]">
              Architectural Precision. Everyday Longevity.
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mb-8">
              Engineered across family-owned workshops in Biella and Tuscany. Heavyweight 480 GSM
              double-faced merino wool, vegetable-tanned Tuscan calfskins, and stitched Margom cupsole footwear.
              Purified silhouettes constructed without seasonal compromises.
            </p>

            {/* Primary Action Zone */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={handleScrollToCatalog}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-zinc-950 text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-zinc-800 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveProductModal(heroProduct)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-zinc-900 border border-zinc-300 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-zinc-50 hover:border-zinc-400 transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <span>Quick View Overshirt</span>
                <span className="text-zinc-500 font-normal">({formatPrice(heroProduct.price)})</span>
              </button>
            </div>

            {/* Adjacent Proof: Critical Press Quotes */}
            <div className="pt-8 border-t border-zinc-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-zinc-600">
                <div>
                  <span className="font-serif font-bold text-zinc-900 tracking-wider block mb-1">
                    VOGUE
                  </span>
                  <p className="italic text-zinc-500">“A masterclass in reductive luxury tailoring.”</p>
                </div>
                <div>
                  <span className="font-serif font-bold text-zinc-900 tracking-wider block mb-1">
                    GQ
                  </span>
                  <p className="italic text-zinc-500">“Exceptional materials, pristine lines, zero noise.”</p>
                </div>
                <div>
                  <span className="font-serif font-bold text-zinc-900 tracking-wider block mb-1">
                    WALLPAPER*
                  </span>
                  <p className="italic text-zinc-500">“Engineered for decades of daily utility.”</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Campaign Focal Point (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative group overflow-hidden rounded-lg bg-zinc-200 aspect-[4/5] shadow-lg">
              <img
                src={heroImg}
                alt="Aura Retail Autumn Winter campaign lookbook tailored overcoat and leather carry"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* In-Hero Tactical Product Tag */}
              <div className="absolute bottom-5 inset-x-5 flex items-center justify-between p-3.5 bg-white/95 backdrop-blur-md rounded-md shadow-md border border-white/40">
                <div className="truncate pr-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 block">
                    Featured In Lookbook
                  </span>
                  <h4 className="text-xs font-semibold text-zinc-900 truncate">
                    Merino Architectural Overshirt
                  </h4>
                </div>
                <button
                  onClick={() => setActiveProductModal(heroProduct)}
                  className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white text-[11px] font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer shrink-0"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
