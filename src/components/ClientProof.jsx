import React, { useMemo, useState } from 'react';
import { EditText } from './Editable';
import { useAdmin } from '../context/AdminContext';

const logoTextDefaults = [
  'TATA',
  'L&T',
  'Godrej',
  'Adani',
  'TCS',
  'GMR',
  'DMRC',
  'NHAI',
];

const quotesDefaults = [
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
  const { getContent } = useAdmin();

  // Load content dynamically from contentCache or default to the static values
  const logos = useMemo(() => {
    return logoTextDefaults.map((label, i) => getContent(`home_clientproof_logo_${i}`, label));
  }, [getContent]);

  const quotes = useMemo(() => {
    return quotesDefaults.map((q, i) => ({
      quote: getContent(`home_clientproof_quote_${i}`, q.quote),
      who: getContent(`home_clientproof_quote_who_${i}`, q.who),
      org: getContent(`home_clientproof_quote_org_${i}`, q.org),
    }));
  }, [getContent]);

  const activeQuote = useMemo(() => quotes[active % quotes.length], [quotes, active]);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 reveal-on-scroll">
          <div>
            <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              <EditText id="home_clientproof_tag" defaultValue="Social Proof" />
            </span>
            <h1 className="text-charcoal font-black text-5xl md:text-6xl uppercase tracking-tighter leading-none">
              <EditText id="home_clientproof_title" defaultValue="Trusted by Partners" />
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <div className="reveal-on-scroll">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {logos.map((label, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`h-20 border text-sm font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center p-2 ${active === i
                    ? 'border-primary-red text-primary-red bg-primary-red/5'
                    : 'border-gray-100 text-charcoal/60 hover:border-primary-red hover:text-primary-red'
                    }`}
                >
                  <EditText id={`home_clientproof_logo_${i}`} defaultValue={logoTextDefaults[i]} />
                </button>
              ))}
            </div>
          </div>

          <div className="reveal-on-scroll">
            <div className="bg-charcoal text-white p-12 shadow-2xl h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-red/5 skew-y-3 translate-y-24 transform origin-right animate-pulse" />
              <div className="relative">
                <div className="text-primary-red text-6xl font-serif leading-none mb-8 opacity-40">“</div>
                <p className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-snug">
                  <EditText id={`home_clientproof_quote_${active % quotes.length}`} defaultValue={quotesDefaults[active % quotes.length].quote} isTextArea={true} />
                </p>
                <div className="mt-12 flex items-center gap-6">
                  <div className="w-16 h-[1px] bg-primary-red" />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em]">
                      <EditText id={`home_clientproof_quote_who_${active % quotes.length}`} defaultValue={quotesDefaults[active % quotes.length].who} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mt-2">
                      <EditText id={`home_clientproof_quote_org_${active % quotes.length}`} defaultValue={quotesDefaults[active % quotes.length].org} />
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
