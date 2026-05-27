import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const team = [
  { name: "Raju Jagtap", role: "Founder & MD", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Akshay Mhatre", role: "Contracts & Procurement Head", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
  { name: "Suyog Jadhav", role: "Business Development & Operations", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
];

const TheTeam = () => {
  useScrollReveal();

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-32 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">People</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">The Team</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Driven by expertise. United by the goal of engineering excellence.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-blue-grey">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading-red text-center mb-16">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={i} className="reveal-on-scroll text-center group">
                <div className="h-96 overflow-hidden mb-6 shadow-xl">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-charcoal uppercase">{member.name}</h2>
                <div className="text-primary-red font-bold text-xs uppercase tracking-widest mt-2">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheTeam;
