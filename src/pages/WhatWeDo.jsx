import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ServicePanel from '../components/ServicePanel';
import { engineeringServices, constructionServices } from '../data/services';
import { ExternalLink, Shield, Sun, Building2, HardHat, Ruler } from 'lucide-react';

const WhatWeDo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'engineering');

  const tabs = [
    { id: 'engineering', label: 'Engineering', icon: Ruler },
    { id: 'construction', label: 'Construction', icon: Building2 },
    { id: 'solar', label: 'Solar', icon: Sun },
    { id: 'barricading', label: 'Barricading', icon: Shield },
  ];

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setSearchParams({ tab: id });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-12 bg-blue-grey text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-charcoal mb-4 uppercase tracking-tighter">What We Do</h1>
          <p className="text-primary-red font-bold uppercase tracking-[0.3em] text-sm">Comprehensive Infrastructure Solutions</p>
        </div>
      </section>

      {/* Tabs Nav */}
      <section className="sticky top-20 bg-white z-40 border-b border-gray-100 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-1 sm:space-x-8 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-6 py-6 border-b-4 transition-all uppercase text-xs font-black tracking-widest ${
                  activeTab === tab.id
                    ? "border-primary-red text-primary-red"
                    : "border-transparent text-gray-400 hover:text-charcoal"
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Panel */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        {activeTab === 'engineering' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-12">
              <h2 className="text-4xl font-extrabold text-charcoal mb-4 uppercase">Engineering Excellence</h2>
              <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
                Our in-house design and detailing team utilizes world-class software like Tekla and REVIT to provide high-precision BIM models and connection designs. We ensure every bolt is accounted for before fabrication begins.
              </p>
            </div>
            <ServicePanel services={engineeringServices} initialService={searchParams.get('service')} />
          </div>
        )}

        {activeTab === 'construction' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-12">
              <h2 className="text-4xl font-extrabold text-charcoal mb-4 uppercase">Construction & Delivery</h2>
              <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
                From scalable fabrication facilities across India to high-rise erection up to 300 meters, our construction capabilities are designed for scale, speed, and safety.
              </p>
            </div>
            <ServicePanel services={constructionServices} initialService={searchParams.get('service')} />
          </div>
        )}

        {activeTab === 'solar' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-12">
              <h2 className="text-4xl font-extrabold text-charcoal mb-4 uppercase">Solar Solutions</h2>
              <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
                Insteel Solar provides integrated structural solutions for renewable energy projects, maximizing efficiency and structural integrity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "In-Roof Solar Buildings", desc: "Patented structural solar implementation for industrial warehouses.", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800", href: "https://insteelsolar.com/in-roof-solar/" },
                { title: "Solar Carports", desc: "Dual-utility structures for efficient parking and power generation.", img: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800", href: "https://insteelsolar.com/car-roof-solar/" },
                { title: "Rooftop Solar", desc: "Custom designed racking for maximum energy yield on industrial roofs.", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800", href: "https://insteelsolar.com/rooftop-solar/" },
                { title: "Ground-Mounted Solar", desc: "Scaleable structures for utility-scale solar farms.", img: "https://images.unsplash.com/photo-1466611653911-95281773ad90?auto=format&fit=crop&q=80&w=800", href: "https://insteelsolar.com/ground-mountaed-solar/" },
              ].map((solar, i) => (
                <a 
                  key={i} 
                  href={solar.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-blue-grey p-8 flex flex-col sm:flex-row items-center gap-8 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-primary-red"
                >
                  <div className="w-full sm:w-48 h-32 overflow-hidden flex-shrink-0">
                    <img src={solar.img} alt={solar.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal mb-2 flex items-center">
                      {solar.title} <ExternalLink size={16} className="ml-2 text-primary-red" />
                    </h3>
                    <p className="text-sm text-gray-500">{solar.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'barricading' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="h-[400px] bg-charcoal">
                  <img src="https://images.unsplash.com/photo-1517646281694-8ec8d091e3dc?auto=format&fit=crop&q=80&w=800" alt="Barricading" className="w-full h-full object-cover opacity-60" />
               </div>
               <div>
                  <h2 className="text-4xl font-extrabold text-charcoal mb-6 uppercase">Compliance Barricading</h2>
                  <p className="text-lg text-gray-500 mb-4 leading-relaxed">
                    Mandate-compliant 35 ft and 25 ft steel barricades—engineered, fabricated, and installed by an integrated EPC. Reduce stop-work risk before execution begins.
                  </p>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-8">
                    ₹1–100 Cr. project scale · BMC / MMRDA aligned
                  </p>
                  <Link to="/products/barricading" className="btn-red inline-flex items-center">
                    Explore Barricading <ExternalLink size={20} className="ml-2" />
                  </Link>
               </div>
             </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default WhatWeDo;
