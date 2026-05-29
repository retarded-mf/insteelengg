import React, { useEffect } from 'react';
import { X, Check, Cpu, Hammer } from 'lucide-react';
import { EditText } from './Editable';

const ServiceDrawer = ({ isOpen, onClose, service, rawTitle }) => {
  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!service) return null;

  const isEngineering = service.techStack !== undefined;
  const keyBase = `whatwedo_service_${rawTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  return (
    <>
      {/* ── Dark Backdrop Overlay ── */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Slide-Out Drawer Panel (Light Theme) ── */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[480px] md:w-[520px] bg-white text-charcoal z-[60] shadow-2xl border-l border-gray-200 flex flex-col transition-transform duration-500 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Block — Sticky */}
        <div className="relative shrink-0 flex items-center justify-between px-10 py-8 border-b border-gray-100 bg-white/95 backdrop-blur-md z-10">
          <div>
            <span className="text-[9px] text-primary-red font-black uppercase tracking-[0.5em] mb-1.5 block">
              {isEngineering ? 'Engineering Spec' : 'Construction Capability'}
            </span>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none text-charcoal">
              <EditText id={`${keyBase}_title`} defaultValue={rawTitle} />
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="p-2 rounded-full border border-gray-200 hover:border-charcoal text-gray-400 hover:text-charcoal hover:bg-gray-50 transition-all duration-300 transform hover:rotate-90 focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto px-10 py-10 space-y-12 scrollbar-thin">
          
          {/* Overview Paragraph */}
          <div className="space-y-3">
            <h4 className="text-[11px] text-gray-400 font-black uppercase tracking-[0.4em] flex items-center gap-2">
              <Cpu size={12} className="text-primary-red" /> Operational Overview
            </h4>
            <p className="text-gray-600 text-[15px] md:text-[16px] leading-loose font-semibold tracking-wide">
              <EditText id={`${keyBase}_desc`} defaultValue={service.description} isTextArea={true} />
            </p>
          </div>

          {/* Key Deliverables List */}
          {service.deliverables && (
            <div className="space-y-4">
              <h4 className="text-[11px] text-gray-400 font-black uppercase tracking-[0.4em] flex items-center gap-2">
                <Check size={14} className="text-primary-red" /> Key Deliverables
              </h4>
              <ul className="space-y-4">
                {service.deliverables.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3.5 text-[14px] md:text-[15px] text-gray-700 font-bold leading-relaxed tracking-wide"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-red rounded-full mt-2.5 shrink-0 animate-pulse" />
                    <span>
                      <EditText id={`${keyBase}_deliv_${i}`} defaultValue={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology / Equipment Badges */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] text-gray-400 font-black uppercase tracking-[0.4em] flex items-center gap-2">
              <Hammer size={12} className="text-primary-red" /> {isEngineering ? 'Design Stack & Standards' : 'Execution & Fleet'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(isEngineering ? service.techStack : service.equipment).map((tech, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 bg-blue-grey text-charcoal border border-gray-200/40 text-[12px] font-black uppercase tracking-wider rounded transition-all duration-300 hover:border-primary-red hover:text-primary-red hover:bg-primary-red/5"
                >
                  <EditText id={`${keyBase}_tech_${i}`} defaultValue={tech} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Area — Sticky */}
        <div className="shrink-0 border-t border-gray-100 bg-gray-50/80 backdrop-blur-md px-10 py-6 z-10">
          <a
            href="/contact"
            className="w-full inline-flex items-center justify-center py-4 bg-primary-red hover:bg-red-700 text-white font-black uppercase text-xs tracking-[0.4em] rounded transition-all duration-300 focus:outline-none"
          >
            Request Specs
          </a>
        </div>
      </div>
    </>
  );
};

export default ServiceDrawer;
