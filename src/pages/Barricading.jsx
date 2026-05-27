import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { EditText, EditImage } from '../components/Editable';
import {
  regulatoryPoints,
  delayStats,
  keyFeatures,
  systemSteps,
  services,
  proofOfScale,
  comparisonRows,
  productSizes,
} from '../data/barricading';

const Barricading = () => {
  useScrollReveal();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-charcoal overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <EditImage
            id="barricading_hero_bg"
            defaultUrl="/src/assets/images/barricading/barricade5.png"
            alt="Steel barricade at construction site"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40 z-10" />
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)] z-10" />
        </div>

        <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — Text */}
            <div>
              <span className="inline-flex items-center gap-2 text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-8 block">
                <span className="w-2 h-2 rounded-full bg-primary-red inline-block" />
                <EditText id="barricading_hero_tag" defaultValue="For Developers & EPC Contractors" />
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
                <EditText id="barricading_hero_h1_main" defaultValue="Barricading is 0.1% of your project cost." />
                <span className="block text-primary-red mt-3">
                  <EditText id="barricading_hero_h1_sub" defaultValue="Non-compliance can stop 100% of your project." />
                </span>
              </h1>

              {/* Product sizes line */}
              <p className="text-white font-black text-lg uppercase tracking-tight mb-6">
                We provide{' '}
                <span className="text-primary-red">
                  <EditText id="barricading_hero_size_1" defaultValue="35 ft. (10.6m)" />
                </span>
                {' '}and{' '}
                <span className="text-primary-red">
                  <EditText id="barricading_hero_size_2" defaultValue="25 ft. (7.6m)" />
                </span>
                {' '}Steel Barricades.
              </p>

              <p className="text-white/60 font-bold italic max-w-lg mb-12 border-l-4 border-primary-red pl-6 leading-relaxed">
                <EditText id="barricading_hero_body" defaultValue="Plan compliant barricading before execution begins—avoid delays, penalties, and disruption." isTextArea={true} />
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-red !px-12 !py-4">
                  Request Site Assessment
                </Link>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center border-2 border-white/30 text-white px-10 py-4 font-black uppercase text-xs tracking-[0.2em] hover:border-primary-red hover:text-primary-red transition-colors"
                >
                  View Specifications
                </a>
              </div>
            </div>

            {/* Right — Floating image card */}
            <div className="hidden lg:flex justify-end">
              <div className="relative w-[500px] h-[650px] rounded-2xl overflow-hidden shadow-2xl">
                <EditImage
                  id="barricading_hero_side_img"
                  defaultUrl="/src/assets/images/barricading/barricade6.png"
                  alt="Insteel barricading on site"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Product sizes */}
      <section id="products" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-on-scroll">
              <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
                Products
              </span>
              <h2 className="text-charcoal font-black text-5xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
                Steel Barricades
              </h2>
              <p className="text-gray-500 text-lg font-bold italic leading-relaxed max-w-lg">
                Barricading designed to meet compliance and reduce site risk—engineered, fabricated, and installed by an integrated EPC.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-on-scroll">
              {productSizes.map((p) => (
                <div key={p.size} className="bg-charcoal text-white p-10 group hover:bg-primary-red transition-colors duration-500">
                  <div className="text-5xl font-black tracking-tighter">{p.size}</div>
                  <div className="text-primary-red group-hover:text-white text-sm font-black uppercase tracking-[0.3em] mt-1 transition-colors">
                    {p.metric}
                  </div>
                  <p className="mt-6 text-[11px] font-black uppercase tracking-widest text-white/50 group-hover:text-white/80">
                    {p.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Spotlight */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-primary-red font-black text-2xl uppercase tracking-[0.4em] mb-8">
            Products Spotlight:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={`/src/assets/images/barricading/barricade${i}.png`}
                  alt={`Barricading project ${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory landscape */}
      <section className="py-32 bg-blue-grey">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="reveal-on-scroll mb-20">
            <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              The Landscape
            </span>
            <h2 className="text-charcoal font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              Regulatory pressure is increasing.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {regulatoryPoints.map((item) => (
              <div key={item.title} className="reveal-on-scroll bg-white p-10 shadow-sm border border-white">
                <h3 className="text-charcoal font-black text-xl uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="reveal-on-scroll text-center mb-16">
            <h3 className="text-charcoal font-black text-3xl md:text-4xl uppercase tracking-tighter">
              The real cost is delay, not fines.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {delayStats.map((stat) => (
              <div key={stat.value} className="reveal-on-scroll bg-charcoal text-white p-12 text-center">
                <div className="text-5xl md:text-6xl font-black text-primary-red tracking-tighter">{stat.value}</div>
                <p className="mt-4 text-[11px] font-black uppercase tracking-[0.25em] text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EPC engineered */}
      <section className="py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="reveal-on-scroll">
              <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                EPC Advantage
              </span>
              <h2 className="text-charcoal font-black text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95] mb-8">
                It&apos;s not just fabricated. It&apos;s engineered by an EPC.
              </h2>
              <p className="text-gray-500 text-lg font-bold italic leading-relaxed border-l-4 border-gray-100 pl-8">
                As an integrated EPC with our own fabrication facility, we deliver mandate-compliant barricades at scale—with cost leadership. We bundle design, fabrication, erection and cloth covering into one complete package.
              </p>
            </div>

            <div className="reveal-on-scroll bg-blue-grey p-10 md:p-12">
              <h3 className="text-charcoal font-black text-sm uppercase tracking-[0.3em] mb-8">Key features</h3>
              <ul className="space-y-5">
                {keyFeatures.map((f) => (
                  <li key={f} className="flex gap-4">
                    <Check className="w-5 h-5 text-primary-red shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-charcoal/80 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* System */}
      <section className="py-32 bg-charcoal text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 reveal-on-scroll">
            <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              Our System
            </span>
            <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              A compliance-first barricading system.
            </h2>
            <p className="mt-8 text-white/50 font-bold italic max-w-2xl mx-auto">
              Designed to align with applicable BMC, MMRDA, and environmental compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {systemSteps.map((s, i) => (
              <div key={s.step} className="reveal-on-scroll relative">
                {i < systemSteps.length - 1 && (
                  <span className="hidden md:block absolute top-8 -right-6 text-primary-red text-2xl font-black">→</span>
                )}
                <div className="text-primary-red font-black text-4xl tracking-tighter mb-4">{s.step}</div>
                <h3 className="font-black text-2xl uppercase tracking-tight mb-4">{s.title}</h3>
                <p className="text-white/50 font-bold text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="reveal-on-scroll mb-20">
            <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              Services
            </span>
            <h2 className="text-charcoal font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              Structured for project-scale execution.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div key={svc.title} className="reveal-on-scroll group border border-gray-100 p-10 hover:border-primary-red hover:shadow-xl transition-all duration-500">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-red">{svc.tag}</span>
                <h3 className="text-charcoal font-black text-2xl uppercase tracking-tight mt-6 mb-4 group-hover:text-primary-red transition-colors">
                  {svc.title}
                </h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed">{svc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of scale */}
      <section className="py-32 bg-blue-grey">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="reveal-on-scroll mb-16">
            <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              Proof of Scale
            </span>
            <h2 className="text-charcoal font-black text-5xl md:text-6xl uppercase tracking-tighter leading-none">
              Delivered at developer scale.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {proofOfScale.map((p) => (
              <div key={p.value + p.project} className="reveal-on-scroll bg-white p-10 shadow-sm">
                <div className="text-4xl font-black text-primary-red tracking-tighter">{p.value}</div>
                <div className="text-charcoal font-black uppercase text-xs tracking-widest mt-4">{p.project}</div>
                <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mt-2">{p.detail}</p>
              </div>
            ))}
          </div>

          <div className="reveal-on-scroll text-center">
            <span className="inline-block bg-charcoal text-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.35em]">
              Execution Capability — ₹1–100 Cr. project scale
            </span>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="reveal-on-scroll mb-16">
            <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              Why Insteel
            </span>
            <h2 className="text-charcoal font-black text-5xl md:text-6xl uppercase tracking-tighter leading-none">
              Engineered partner vs. unorganised vendor.
            </h2>
          </div>

          <div className="reveal-on-scroll overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-charcoal text-white">
                  <th className="text-left p-6 text-[11px] font-black uppercase tracking-[0.3em]">Dimension</th>
                  <th className="text-left p-6 text-[11px] font-black uppercase tracking-[0.3em] text-primary-red">Insteel</th>
                  <th className="text-left p-6 text-[11px] font-black uppercase tracking-[0.3em] text-white/40">Unorganised Vendors</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.dimension} className={i % 2 === 0 ? 'bg-blue-grey/50' : 'bg-white'}>
                    <td className="p-6 font-black text-charcoal uppercase text-xs tracking-widest">{row.dimension}</td>
                    <td className="p-6">
                      <div className="flex gap-3 items-start">
                        <Check className="w-4 h-4 text-primary-red shrink-0 mt-0.5" />
                        <span className="text-sm font-bold text-charcoal">{row.insteel}</span>
                      </div>
                    </td>
                    <td className="p-6 text-sm font-bold text-gray-400">{row.vendor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-red/5 skew-y-3 translate-y-32 transform origin-right" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-on-scroll">
              <Shield className="w-12 h-12 text-primary-red mb-8" />
              <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
                Get Started
              </span>
              <h2 className="text-white font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
                Request a site compliance assessment.
              </h2>
              <p className="text-white/60 font-bold italic leading-relaxed max-w-lg">
                We review your site, scope and execution timeline, then return a compliance-aligned barricading plan. Best suited for projects above ₹1–100 Cr.
              </p>
            </div>

            <div className="reveal-on-scroll bg-white/5 border border-white/10 p-10 md:p-12">
              <h3 className="text-white font-black uppercase tracking-widest text-sm mb-8">Direct contact</h3>
              <div className="space-y-6 text-white/80">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Email</div>
                  <a href="mailto:sales@insteelengg.com" className="font-bold hover:text-primary-red transition-colors">
                    sales@insteelengg.com
                  </a>
                  <span className="text-white/30 mx-2">/</span>
                  <a href="mailto:aparnak@insteelengg.in" className="font-bold hover:text-primary-red transition-colors">
                    aparnak@insteelengg.in
                  </a>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Call</div>
                  <a href="tel:+918655795491" className="font-bold hover:text-primary-red transition-colors">
                    Miss Aparna — +91 86557 95491
                  </a>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Office</div>
                  <p className="font-bold text-sm leading-relaxed">
                    804, The Ambience Court, Opp RTO Office, Sector 19-D, Vashi, Navi Mumbai — 400703
                  </p>
                </div>
              </div>
              <Link
                to="/contact"
                className="btn-red mt-10 inline-flex items-center gap-3 !px-10"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Barricading;