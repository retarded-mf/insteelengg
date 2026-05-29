import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import ServiceDrawer from './ServiceDrawer';
import { EditText, EditImage } from './Editable';
import { useAdmin } from '../context/AdminContext';

const ServicePanel = ({ services: rawServices, initialService }) => {
  const { getContent, isAdminActive } = useAdmin();
  const [activeImage, setActiveImage] = useState(rawServices[0].image);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Map the static services array into dynamic ones loaded from database cache
  const activeServices = useMemo(() => {
    return rawServices.map(s => {
      const keyBase = `whatwedo_service_${s.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      return {
        ...s,
        title: getContent(`${keyBase}_title`, s.title),
        image: getContent(`${keyBase}_image`, s.image),
        description: getContent(`${keyBase}_desc`, s.description),
        deliverables: (s.deliverables || []).map((d, i) => getContent(`${keyBase}_deliv_${i}`, d)),
        techStack: (s.techStack || []).map((t, i) => getContent(`${keyBase}_tech_${i}`, t)),
        equipment: (s.equipment || []).map((e, i) => getContent(`${keyBase}_tech_${i}`, e)),
      };
    });
  }, [rawServices, getContent]);

  const handleServiceClick = (service) => {
    // Make sure we pass the fully resolved active version of the clicked service
    const resolved = activeServices.find(s => s.title === service.title) || service;
    setSelectedService(resolved);
    setIsDrawerOpen(true);
  };

  React.useEffect(() => {
    if (initialService) {
      const decoded = decodeURIComponent(initialService).toLowerCase();
      const matched = activeServices.find(
        (s) => s.title.toLowerCase() === decoded
      );
      if (matched) {
        setSelectedService(matched);
        setActiveImage(matched.image);
        setIsDrawerOpen(true);
      }
    }
  }, [initialService, activeServices]);

  return (
    <>
      <div className="flex flex-col lg:flex-row bg-white overflow-hidden shadow-xl min-h-[500px] border border-gray-100 rounded-lg">
        {/* Left List */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-8">
          {activeServices.map((service, index) => (
            <button
              key={index}
              onMouseEnter={() => setActiveImage(service.image)}
              onClick={() => handleServiceClick(service)}
              className="group flex items-center justify-between px-8 py-6 text-left border-b border-gray-100 last:border-b-0 hover:bg-blue-grey/40 transition-colors w-full focus:outline-none"
            >
              <span className="text-lg md:text-xl font-black text-charcoal group-hover:text-primary-red transition-colors uppercase tracking-tight">
                <EditText id={`whatwedo_service_${rawServices[index].title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_title`} defaultValue={rawServices[index].title} />
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
        <div className="w-full lg:w-1/2 relative bg-gray-100 h-[300px] lg:h-auto overflow-hidden cursor-pointer group" onClick={() => handleServiceClick(activeServices.find(s => s.image === activeImage))}>
          {activeServices.map((service, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                activeImage === service.image ? "opacity-100 scale-100 pointer-events-auto z-10" : "opacity-0 scale-105 pointer-events-none z-0"
              }`}
            >
              <EditImage
                id={`whatwedo_service_${rawServices[index].title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_image`}
                defaultUrl={rawServices[index].image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Dynamic Slide-Out Specification Drawer ── */}
      <ServiceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        service={selectedService}
        rawTitle={selectedService ? rawServices.find(s => s.image === selectedService.image || s.title === selectedService.title)?.title : ''}
      />
    </>
  );
};

export default ServicePanel;
