import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const megaServices = [
  {
    title: "Engineering",
    id: "engineering",
    subs: [
      { title: "Structural Steel Design & Detailing", image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200" },
      { title: "RCC Design", image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1200" },
      { title: "Rebar Detailing & BBS", image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ec3?auto=format&fit=crop&q=80&w=1200" },
      { title: "BIM & Digital Twin", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200" },
      { title: "Connection Design", image: "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&q=80&w=1200" }
    ]
  },
  {
    title: "Construction",
    id: "construction",
    subs: [
      { title: "Precision Fabrication", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200" },
      { title: "High-Rise Erection", image: "https://images.unsplash.com/photo-1531834357241-0322ba66024d?auto=format&fit=crop&q=80&w=1200" },
      { title: "Fire Proofing (Passive)", image: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=1200" },
      { title: "Roofing & Cladding", image: "https://images.unsplash.com/photo-1513344605008-0133c948408f?auto=format&fit=crop&q=80&w=1200" },
      { title: "Civil Composite Works", image: "https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=1200" }
    ]
  },
  {
    title: "Solar",
    id: "solar",
    subs: [
      { title: "In-Roof Solar Solutions", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200" },
      { title: "Solar Carports", image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1200" },
      { title: "Ground Mounted Solar", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200" },
      { title: "Commercial Rooftop", image: "https://images.unsplash.com/photo-1466611653911-95281773ad90?auto=format&fit=crop&q=80&w=1200" }
    ]
  },
  {
    title: "Barricading",
    id: "barricading",
    subs: [
      { title: "Site Barricading", image: "https://images.unsplash.com/photo-1517646281694-8ec8d091e3dc?auto=format&fit=crop&q=80&w=1200" },
      { title: "Permanent Crash Barriers", image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=1200" },
      { title: "High-Visibility Signage", image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200" }
    ]
  }
];

const MegaServiceGrid = () => {
  const [activeImage, setActiveImage] = useState(megaServices[0].subs[0].image);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative w-full bg-charcoal min-h-[700px] flex flex-col items-center">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-charcoal/40 z-10 bg-gradient-to-r from-charcoal via-transparent to-charcoal" />
        <img
          src={activeImage}
          alt="Service Preview"
          className="w-full h-full object-cover transition-opacity duration-300 ease-out opacity-60"
        />
      </div>

      <div className="relative z-20 max-w-[1440px] w-full px-6 py-32 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {megaServices.map((section) => (
            <div key={section.id} className="group/col">
              <h3 className="text-white font-extrabold text-2xl lg:text-3xl uppercase tracking-tighter mb-8 group-hover/col:text-primary-red transition-colors border-b border-white/10 pb-4">
                {section.title}
              </h3>
              
              <ul className="space-y-4">
                {section.subs.map((sub, i) => (
                  <li key={i}>
                    <button
                      onMouseEnter={() => setActiveImage(sub.image)}
                      className="group flex items-start text-left"
                    >
                      <ChevronRight className="w-4 h-4 mt-1 text-primary-red opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      <span className="text-gray-400 group-hover:text-white font-bold text-sm lg:text-base uppercase tracking-wider transition-colors">
                        {sub.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  to={`/what-we-do?tab=${section.id}`}
                  className="inline-flex items-center text-primary-red font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                >
                  View Full Detail <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sub Heading Instructions */}
      <div className="relative z-20 pb-12 w-full text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Hover over services to explore our capabilities</p>
      </div>
    </div>
  );
};

export default MegaServiceGrid;
