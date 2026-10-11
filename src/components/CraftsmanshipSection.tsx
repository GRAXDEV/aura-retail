import React from 'react';
import { PRODUCTS } from '../data/products';

export const CraftsmanshipSection: React.FC = () => {
  const ateliers = [
    {
      index: '01',
      title: 'Biella Wool Mills, Northern Italy',
      detail:
        'Nestled in the foothills of the Italian Alps, our spinning partner utilizes soft, glacial mountain runoff to wash virgin merino fleece without harsh detergents, yielding an unmatched 480 GSM double-faced drape.',
    },
    {
      index: '02',
      title: 'Santa Croce Tanneries, Tuscany',
      detail:
        'Certified by the Genuine Italian Vegetable-Tanned Leather Consortium. Hides are conditioned over 60 days using natural chestnut and mimosa tannins, developing a personal patina that deepens with every year of use.',
    },
    {
      index: '03',
      title: 'Porto Atelier, Northern Portugal',
      detail:
        'Every sneaker is lasted by hand and attached to an authentic Margom rubber cupsole with 360-degree perimeter lock-stitching, allowing complete welt resoling rather than planned obsolescence.',
    },
  ];

  return (
    <section className="bg-zinc-950 text-white py-20 lg:py-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400 block mb-3">
            Provenance & Material Integrity
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white leading-tight mb-6 [text-wrap:balance]">
            Tactile permanence over seasonal novelty.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Every garment and leather good in the Aura Retail catalog is manufactured in batch sizes
            under 300 pieces. We collaborate exclusively with generational artisans who set the
            benchmark for fair compensation, regenerative raw materials, and repairable construction.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pt-8 border-t border-zinc-800">
          {ateliers.map((item) => (
            <div key={item.index} className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-500 font-semibold mb-4 block">
                  {item.index}.
                </span>
                <h3 className="text-lg font-serif text-white mb-3">{item.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Promise Callout */}
        <div className="mt-16 pt-10 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-6">
            <span>OEKO-TEX® Standard 100</span>
            <span aria-hidden="true">·</span>
            <span>Consorzio Vera Pelle Italiana</span>
            <span aria-hidden="true">·</span>
            <span>Responsible Wool Standard (RWS)</span>
          </div>
          <span className="text-zinc-300 font-mono">100% Traceable Raw Origin</span>
        </div>
      </div>
    </section>
  );
};
