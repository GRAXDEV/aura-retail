import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Gem } from 'lucide-react';

export const ValuePropositionBar: React.FC = () => {
  const pillars = [
    {
      icon: Truck,
      title: 'Global Express Dispatch',
      desc: 'Complimentary on orders over $150. Dispatched in 24 hours.',
    },
    {
      icon: RotateCcw,
      title: '30-Day In-Home Trial',
      desc: 'Prepaid insured return label included in every parcel.',
    },
    {
      icon: Gem,
      title: 'Small-Batch Provenance',
      desc: '100% trace-verified Italian wools and Tuscan calfskins.',
    },
    {
      icon: ShieldCheck,
      title: 'Lifetime Craft Guarantee',
      desc: 'Complimentary hardware, seam, and sole restoration.',
    },
  ];

  return (
    <section className="border-b border-zinc-200/80 bg-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 lg:pr-4 lg:border-r last:border-r-0 border-zinc-100"
              >
                <div className="p-2.5 rounded-md bg-zinc-100/80 text-zinc-800 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
