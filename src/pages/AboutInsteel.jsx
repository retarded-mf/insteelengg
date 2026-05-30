import React from 'react';
import TimelineShowcase from '../components/TimelineShowcase';
import { EditText, EditImage } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';
import { useAdmin } from '../context/AdminContext';

const defaultStatements = [
  { title: "Our Mission", text: "To provide innovative, simplified structural steel solutions that exceed expectations." },
  { title: "Our Vision", text: "To be India's premier one-window EPC partner for complex architectural steel designs." },
  { title: "Our Promise", text: "Zero compromises on engineering precision, on-time delivery, and absolute structural safety." }
];

const AboutInsteel = () => {
  const { items: statements, refetch } = useSectionData('about', 'about_statement', defaultStatements);
  const { isAdminActive } = useAdmin();

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
          <div className="text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed space-y-4">
            <EditText id="about_header_description" defaultValue="From BIM and detailing to the last erected bolt — one team, every stage, zero compromise." isTextArea={true} />
          </div>
        </div>
      </section>



      {/* ── Interactive Timeline Showcase ──────────────────────── */}
      <TimelineShowcase />

      {/* ── Dynamic MD Speech Section ── */}
      <section className="py-24 bg-charcoal text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Speech Text */}
            <div className="text-left space-y-6">
              <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] block">
                Leader's Perspective
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                <EditText id="about_md_speech_title" defaultValue="MD's Message to the Ecosystem" />
              </h2>
              <div className="w-16 h-1.5 bg-primary-red mt-2 mb-6"></div>
              <div className="text-gray-300 text-base leading-relaxed italic space-y-4">
                <EditText id="about_md_speech_body" defaultValue="For over two decades, Insteel has stood for quality, speed, and safety in steel structures. We believe in building capabilities not just in materials, but in our engineering minds. Our ecosystem of partners, designers, and clients is built on absolute trust." isTextArea={true} />
              </div>
            </div>

            {/* Right Column: MD Big Image */}
            <div className="w-full h-[550px] relative overflow-hidden rounded-xl shadow-2xl border-4 border-white/5">
              <EditImage
                id="about_md_speech_image"
                defaultUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                alt="MD Raju Jagtap"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutInsteel;
