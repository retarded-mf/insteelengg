import React, { useMemo, useState } from 'react';

const logoText = [
  'TATA',
  'L&T',
  'Godrej',
  'Adani',
  'TCS',
  'GMR',
  'DMRC',
  'NHAI',
];

const quotes = [
  {
    who: 'Project Director',
    org: 'Infrastructure EPC',
    quote:
      'A rare combination of engineering depth and disciplined execution. Insteel delivered with control, not just speed.',
  },
  {
    who: 'Head of Projects',
    org: 'Real Estate Developer',
    quote:
      'The detailing and fabrication accuracy reduced site surprises dramatically—assemblies were consistently “snap-fit”.',
  },
  {
    who: 'COO',
    org: 'Industrial Campus',
    quote:
      'Safety systems, checklists, and reporting were as strong as the structure itself. Timelines stayed predictable.',
  },
];

const ClientProof = () => {
  const [active, setActive] = useState(0);

  const activeQuote = useMemo(() => quotes[active % quotes.length], [active]);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 reveal-on-scroll">
          <div>
            <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              Social Proof
            </span>
            <h2 className="text-charcoal font-black text-5xl md:text-6xl uppercase tracking-tighter leading-none">
              Trusted by Partners
            </h2>
          </div>
          <div className="max-w-xl text-gray-500 font-bold italic">
            Select a partner to preview a representative client sentiment.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <div className="reveal-on-scroll">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {logoText.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`h-20 border text-sm font-black uppercase tracking-[0.25em] transition-all ${
                    active === i
                      ? 'border-primary-red text-primary-red bg-primary-red/5'
                      : 'border-gray-100 text-charcoal/60 hover:border-primary-red hover:text-primary-red'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="reveal-on-scroll">
            <div className="bg-charcoal text-white p-12 shadow-2xl h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-red/5 skew-y-3 translate-y-24 transform origin-right" />
              <div className="relative">
                <div className="text-primary-red text-6xl font-serif leading-none mb-8 opacity-40">“</div>
                <p className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-snug">
                  {activeQuote.quote}
                </p>
                <div className="mt-12 flex items-center gap-6">
                  <div className="w-16 h-[1px] bg-primary-red" />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em]">
                      {activeQuote.who}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mt-2">
                      {activeQuote.org}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientProof;

