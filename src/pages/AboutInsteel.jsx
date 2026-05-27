import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TimelineShowcase from '../components/TimelineShowcase';
import { EditText } from '../components/Editable';

const AboutInsteel = () => {
  useScrollReveal();

  return (
    <div className="bg-white">

      {/* ── Page Header — pt-48 clears the fixed navbar and centers the title nicely ─────── */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="about_header_tagline" defaultValue="Who We Are" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            <EditText id="about_header_title" defaultValue="About Insteel" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            <EditText id="about_header_description" defaultValue="From BIM and detailing to the last erected bolt — one team, every stage, zero compromise." isTextArea={true} />
          </p>
        </div>
      </section>

      {/* ── Interactive Timeline Showcase ──────────────────────── */}
      <TimelineShowcase />

    </div>
  );
};

export default AboutInsteel;
