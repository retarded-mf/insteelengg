import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  useScrollReveal();

  return (
    <div>
      {/* Hero */}
      <HeroCarousel />

      {/* Section 2: Who We Are */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-on-scroll order-2 lg:order-1">
              <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-6 block">Building Capabilities</span>
              <h2 className="text-charcoal font-black text-6xl md:text-8xl uppercase tracking-tighter leading-[0.9] mb-10">Who We Are</h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-10 font-bold italic border-l-4 border-gray-100 pl-10 max-w-xl">
                For over two decades, Insteel Engineers Ltd has delivered landmark steel structures across India — from high-rise composite buildings to railway stations. We are a one-window EPC solution.
              </p>
              
              <div className="grid grid-cols-2 gap-12 mb-16">
                {[
                  { label: "Years", val: "20+" },
                  { label: "Engineers", val: "150+" },
                  { label: "Projects", val: "500+" },
                  { label: "Clients", val: "200+" }
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <div className="text-6xl font-black text-charcoal group-hover:text-primary-red transition-colors duration-500 tracking-tighter">{stat.val}</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="group inline-flex items-center space-x-6">
                 <span className="text-charcoal font-black uppercase text-xs tracking-[0.4em]">Discover Our Journey</span>
                 <span className="w-16 h-[2px] bg-charcoal group-hover:w-24 group-hover:bg-primary-red transition-all duration-500" />
              </Link>
            </div>
            <div className="reveal-on-scroll order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary-red translate-x-6 translate-y-6 -z-10 opacity-5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                <img 
                  src="https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=1200" 
                  alt="Who We Are" 
                  className="w-full h-[700px] object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section (Testimonial Strip) */}
      <section className="py-40 bg-charcoal relative overflow-hidden flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0 opacity-10">
           <img src="https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="relative z-10 max-w-5xl">
          <span className="text-primary-red text-6xl font-serif mb-8 block opacity-50">“</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-12 italic">
            Insteel's engineering precision and commitment to delivery timelines have been instrumental in the success of our complex structural projects.
          </h2>
          <div className="flex flex-col items-center">
             <div className="w-20 h-[1px] bg-primary-red mb-6" />
             <div className="text-white font-black uppercase tracking-[0.4em] text-xs">Chief Operating Officer</div>
             <div className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px] mt-2">Leading Infrastructure Group</div>
          </div>
        </div>
      </section>

      {/* Section 6: Featured Projects */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-24 reveal-on-scroll">
            <div>
              <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">Archive</span>
              <h2 className="text-charcoal font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none">Our Work Speaks</h2>
            </div>
            <Link to="/projects" className="text-charcoal font-black uppercase text-xs tracking-[0.4em] hover:text-primary-red transition-colors hidden md:block">
               Explore Full Portfolio [→]
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: "Nyati Plaza", loc: "Pune", type: "High-Rise Buildings (Steel)", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
              { name: "TCS Sahyadri Park", loc: "Mumbai", type: "High-Rise Buildings (Steel)", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800" },
              { name: "Lucknow Airport", loc: "Lucknow", type: "Airports", img: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800" },
            ].map((proj, i) => (
              <div key={i} className="reveal-on-scroll group">
                <div className="h-[500px] overflow-hidden mb-10 relative">
                  <img src={proj.img} alt={proj.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-charcoal font-black text-3xl mb-2 uppercase tracking-tighter">{proj.name}</h3>
                <div className="text-primary-red text-[11px] font-black uppercase tracking-[0.3em] mb-4">{proj.type}</div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{proj.loc} — Site Archive</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Company Principles */}
      <section className="py-40 bg-blue-grey">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-40 reveal-on-scroll">
            <h2 className="text-primary-red font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">Insteel Principles</h2>
          </div>
          
          <div className="space-y-60">
            {[
              { 
                tag: "Manan", 
                title: "Thought", 
                body: "Constantly building capabilities of self and people to create lasting value. We believe in the power of deliberate reflection and foresight in engineering.", 
                img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
                rev: false 
              },
              { 
                tag: "Sadhana", 
                title: "Way", 
                body: "To provide an engineering and construction platform of innovative, simplified solutions to structural projects through dedicated practice and refinement.", 
                img: "https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=1200",
                rev: true 
              },
            ].map((prin, i) => (
              <div key={i} className={`flex flex-col ${prin.rev ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-32 reveal-on-scroll`}>
                <div className="w-full lg:w-3/5 relative group">
                  <div className="absolute inset-0 bg-primary-red translate-x-4 translate-y-4 -z-10 opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                  <img src={prin.img} alt={prin.title} className="w-full h-[600px] object-cover shadow-2xl" />
                </div>
                <div className="w-full lg:w-2/5">
                  <span className="text-primary-red font-black text-xs uppercase tracking-[0.6em] mb-8 block opacity-50">/{prin.tag}/</span>
                  <h3 className="text-6xl md:text-8xl font-black text-charcoal mb-10 uppercase tracking-tighter leading-none">{prin.title}</h3>
                  <p className="text-2xl text-gray-400 leading-relaxed font-bold italic border-l-2 border-gray-100 pl-10">{prin.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Testimonials Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="reveal-on-scroll group">
                <div className="text-primary-red text-6xl font-serif leading-none mb-8 opacity-20 group-hover:opacity-100 transition-opacity">“</div>
                <p className="text-charcoal text-xl leading-relaxed mb-12 font-medium italic">
                  "Insteel's engineering precision and commitment to delivery timelines have been instrumental in the success of our structural projects."
                </p>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-[1px] bg-primary-red" />
                  <div>
                    <div className="font-black text-charcoal uppercase tracking-widest text-[10px]">Head of Engineering</div>
                    <div className="text-[10px] text-gray-400 font-black uppercase mt-1 tracking-widest">Global Realty Group</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Pre-footer CTA */}
      <section className="py-32 bg-charcoal text-center reveal-on-scroll relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-red/5 skew-y-3 translate-y-32 transform origin-right" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-6xl md:text-[120px] font-black text-primary-red mb-10 tracking-tighter">+91 22 4111 2000</div>
          <h3 className="text-2xl text-white font-black mb-16 opacity-80 uppercase tracking-[0.5em]">Pioneering Structural Excellence</h3>
          <Link to="/contact" className="btn-red !px-20 !py-6 text-2xl tracking-[0.2em] font-black uppercase">
            Initiate Contact
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
