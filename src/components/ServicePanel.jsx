import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ServiceDrawer from './ServiceDrawer';

const ServicePanel = ({ services, initialService }) => {
  const [activeImage, setActiveImage] = useState(services[0].image);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  };

  React.useEffect(() => {
    if (initialService) {
      const decoded = decodeURIComponent(initialService).toLowerCase();
      const matched = services.find(
        (s) => s.title.toLowerCase() === decoded
      );
      if (matched) {
        setSelectedService(matched);
        setActiveImage(matched.image);
        setIsDrawerOpen(true);
      }
    }
  }, [initialService, services]);

  return (
    <>
      <div className="flex flex-col lg:flex-row bg-white overflow-hidden shadow-xl min-h-[500px] border border-gray-100 rounded-lg">
        {/* Left List */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-8">
          {services.map((service, index) => (
            <button
              key={index}
              onMouseEnter={() => setActiveImage(service.image)}
              onClick={() => handleServiceClick(service)}
              className="group flex items-center justify-between px-8 py-6 text-left border-b border-gray-100 last:border-b-0 hover:bg-blue-grey/40 transition-colors w-full focus:outline-none"
            >
              <span className="text-lg md:text-xl font-black text-charcoal group-hover:text-primary-red transition-colors uppercase tracking-tight">
                {service.title}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-primary-red font-black uppercase tracking-[0.2em] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0">
                  View Specs
                </span>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-red group-hover:translate-x-1.5 transition-all duration-300 shrink-0" />
              </div>
            </button>
          ))}
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 relative bg-gray-100 h-[300px] lg:h-auto overflow-hidden cursor-pointer group" onClick={() => handleServiceClick(services.find(s => s.image === activeImage))}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                activeImage === service.image ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Dynamic Slide-Out Specification Drawer ── */}
      <ServiceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        service={selectedService}
      />
    </>
  );
};

export default ServicePanel;
