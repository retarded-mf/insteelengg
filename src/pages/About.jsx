import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, Briefcase, GraduationCap, Users } from 'lucide-react';

const About = () => {
  useScrollReveal();

  const timeline = [
    { year: "2006", event: "Founded as an Engineering Consultancy with a focus on specialized steel design." },
    { year: "2010", event: "Expanded services to include BIM and Technical Manpower Deputation." },
    { year: "2015", event: "Transitioned to a full-service EPC company, delivering complete steel structures." },
    { year: "2020", event: "Achieved ISO 9001:2015 certification; landmark success in airport infrastructure." },
    { year: "2024", event: "Leading PAN India presence with 150+ engineers and 500+ projects completed." },
  ];

  const team = [
    { name: "Raju Jagtap", role: "Founder & MD", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
    { name: "Akshay Mhatre", role: "Contracts & Procurement Head", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
    { name: "Suyog Jadhav", role: "Business Development & Operations", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">Our Journey</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">Building India's infrastructure with precision engineering and unwavering commitment for over 20 years.</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative border-l-4 border-blue-grey ml-4 md:ml-0 md:left-1/2">
            {timeline.map((item, i) => (
              <div key={i} className={`mb-16 relative ${i % 2 === 0 ? 'md:pr-12 md:text-right md:-left-[354px]' : 'md:pl-12 md:left-1'}`}>
                <div className="absolute top-0 w-8 h-8 bg-primary-red border-4 border-white rounded-full -left-[18px] md:left-auto md:right-[-20px] shadow-lg" style={i % 2 !== 0 ? { left: '-20px', right: 'auto' } : {}}></div>
                <div className="bg-blue-grey p-8 inline-block max-w-sm">
                  <span className="text-primary-red font-black text-3xl block mb-2">{item.year}</span>
                  <p className="font-bold text-gray-600 leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-blue-grey">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading-red text-center mb-16">The Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="h-96 overflow-hidden mb-6 shadow-xl">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-extrabold text-charcoal uppercase">{member.name}</h3>
                <div className="text-primary-red font-bold text-xs uppercase tracking-widest mt-2">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Masonry */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading-red text-center mb-16 uppercase">Accreditations & Awards</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="break-inside-avoid shadow-lg relative group">
                <img src={`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600&h=${400 + (i % 3) * 100}`} alt="Award" className="w-full h-auto transition-opacity" />
                <div className="absolute inset-0 bg-primary-red/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <div className="text-center text-white">
                    <Award size={48} className="mx-auto mb-4" />
                    <div className="font-bold uppercase tracking-widest text-sm">Excellence in Structural Steel</div>
                    <div className="text-xs mt-2 font-medium opacity-80">2023 - Infrastructure Summit</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h2 className="section-heading-white mb-12 uppercase tracking-widest">Industry Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {[
              { title: "The Future of Composite Steel Buildings in Urban India", date: "May 12, 2025" },
              { title: "BIM Level 3: Revolutionizing Infrastructure Project Timelines", date: "April 28, 2025" }
            ].map((post, i) => (
              <div key={i} className="bg-white/5 p-8 border border-white/10 hover:border-primary-red transition-colors group cursor-pointer">
                <div className="text-primary-red font-bold text-xs uppercase mb-4 tracking-widest">{post.date}</div>
                <h3 className="text-white text-xl font-bold mb-6 leading-snug group-hover:text-primary-red transition-colors">{post.title}</h3>
                <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Read Article →</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
