import React from 'react';
import StatCounter from './StatCtr';
import { EditText } from './Editable';
import { SectionManager } from './SectionManager';
import { useSectionData } from '../hooks/useSectionData';

const boldClaims = [
  {
    headline: 'No. 1 EPC Contractor',
    sub: 'In India & Abroad',
  },
  {
    headline: 'Construction Leadership',
    sub: 'Fabrication · Design · Erection',
  },
  {
    headline: 'Solar & Barricading',
    sub: 'Compliant Design · Before-Time Delivery',
  },
  {
    headline: 'On-Time Execution',
    sub: 'Engineered delivery—from labour to lift',
  },
];

const WhyInsteel = () => {
  const { items: claims, refetch } = useSectionData('home', 'why_insteel_claims', boldClaims);

  return (
    <section className="py-32 bg-blue-grey relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionManager
          pageName="home"
          type="why_insteel_claims"
          items={claims}
          label="Manage Bold Claims"
          renderItemLabel={(item) => item.headline || 'New Claim'}
          onUpdate={refetch}
          wrapperClassName="flex justify-end mb-6"
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <div className="lg:col-span-4 reveal-on-scroll">
            <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-6 block">
              <EditText id="whyinsteel_tagline" defaultValue="Why Trust Insteel" />
            </span>
            <h2 className="text-charcoal font-black text-6xl md:text-7xl uppercase tracking-tighter leading-[0.95]">
              <EditText id="whyinsteel_header" defaultValue="Built to Deliver" />
            </h2>
            <p className="mt-8 text-xl text-gray-500 leading-relaxed font-bold italic border-l-4 border-white/60 pl-10 max-w-xl">
              <EditText id="whyinsteel_body" defaultValue="Not bullet points—commitments we stake our reputation on across construction, solar, and barricading." isTextArea={true} />
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 reveal-on-scroll">
            {claims.map((claim, idx) => (
              <div
                key={claim.dbId || idx}
                className="bg-charcoal text-white p-8 md:p-10 group hover:bg-primary-red transition-colors duration-500"
              >
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-white">
                  <EditText id={`${claim.baseId || 'whyinsteel_claim_'+idx}_headline`} defaultValue={claim.headline} />
                </h3>
                <p className="mt-4 text-[11px] md:text-xs font-black uppercase tracking-[0.25em] text-white/50 group-hover:text-white/80 transition-colors">
                  <EditText id={`${claim.baseId || 'whyinsteel_claim_'+idx}_sub`} defaultValue={claim.sub} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 reveal-on-scroll">
          {[
            { value: '150+', label: 'Engineers' },
            { value: '38+', label: 'Partner Facilities' },
            { value: 'PAN India', label: 'Presence' },
            { value: '24×7', label: 'Operations' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-white/80 shadow-sm p-6 md:p-8">
              <StatCounter
                value={s.value}
                label={s.label}
                valueClassName="text-3xl md:text-4xl font-black text-charcoal tracking-tighter"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyInsteel;
