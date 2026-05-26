import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const ServicePanel = ({ services }) => {
  const [activeImage, setActiveImage] = useState(services[0].image);

  return (
    <div className="flex flex-col lg:flex-row bg-white overflow-hidden shadow-xl min-h-[500px]">
      {/* Left List */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-8">
        {services.map((service, index) => (
          <button
            key={index}
            onMouseEnter={() => setActiveImage(service.image)}
            className="group flex items-center justify-between px-8 py-6 text-left border-b border-gray-100 last:border-b-0 hover:bg-blue-grey transition-colors w-full"
          >
            <span className="text-xl font-bold text-charcoal group-hover:text-primary-red transition-colors">
              {service.title}
            </span>
            <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-primary-red group-hover:translate-x-2 transition-all" />
          </button>
        ))}
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 relative bg-gray-100 h-[300px] lg:h-auto overflow-hidden">
        {services.map((service, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              activeImage === service.image ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePanel;
