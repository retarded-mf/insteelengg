import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const clients = [
  'TATA', 'L&T', 'Godrej', 'Adani', 'TCS', 'GMR', 'DMRC', 'NHAI',
];

const OurClients = () => {
  useScrollReveal();

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">Social Proof</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">Our Clients</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Trusted by India's most respected infrastructure and industrial brands.
          </p>
        </div>
      </section>

      {/* Client Logo Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 reveal-on-scroll">
            {clients.map((label) => (
              <div
                key={label}
                className="h-28 border border-gray-100 flex items-center justify-center text-xl font-black uppercase tracking-[0.25em] text-charcoal/50 hover:border-primary-red hover:text-primary-red transition-all duration-300"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurClients;
