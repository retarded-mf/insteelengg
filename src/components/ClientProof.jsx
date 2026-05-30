import React, { useMemo, useState } from 'react';
import { EditText, EditImage } from './Editable';
import { useAdmin } from '../context/AdminContext';

const logoDefaults = Array(16).fill('/src/assets/images/placeholder-logo.png'); // Will use a missing image fallback or can be overwritten by admin

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
    return logoDefaults.map((defaultUrl, i) => getContent(`home_clientproof_logo_img_${i}`, defaultUrl));
  }, [getContent]);

  const quotes = useMemo(() => {
    return quotesDefaults.map((q, i) => ({
      quote: getContent(`home_clientproof_quote_${i}`, q.quote),
      who: getContent(`home_clientproof_quote_who_${i}`, q.who),
      org: getContent(`home_clientproof_quote_org_${i}`, q.org),
    }));
  }, [getContent]);

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
            <div className="grid grid-cols-4 grid-rows-4 gap-2 h-full">
              {logos.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`h-full border transition-all flex items-center justify-center p-2 relative group overflow-hidden ${active === i
                    ? 'border-primary-red bg-primary-red/5'
                    : 'border-gray-100 hover:border-primary-red'
                    }`}
                >
                  <EditImage 
                    id={`home_clientproof_logo_img_${i}`} 
                    defaultUrl="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=150" 
                    alt={`Client Logo ${i+1}`} 
                    className={`w-full h-full object-contain filter ${active === i ? 'opacity-100 scale-110' : 'opacity-70 group-hover:opacity-100'} transition-all duration-300`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="reveal-on-scroll">
            <div className="bg-charcoal text-white p-12 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[450px] lg:min-h-[500px]">
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
