import React, { useEffect, useState } from 'react';
import { X, Check, Cpu, Hammer, Plus, Save } from 'lucide-react';
import { EditText } from './Editable';
import { useAdmin } from '../context/AdminContext';

const AddBadgeButton = ({ keyBase, existingCount }) => {
  const { setContent, getContent } = useAdmin();
  const [adding, setAdding] = useState(false);
  const [newValue, setNewValue] = useState('');

  const getNextIndex = () => {
    let i = existingCount;
    while (getContent(`${keyBase}_tech_${i}`) !== undefined) {
      i++;
    }
    return i;
  };

  const handleAdd = () => {
    if (!newValue.trim()) return;
    const nextIdx = getNextIndex();
    setContent(`${keyBase}_tech_${nextIdx}`, newValue.trim());
    setNewValue('');
    setAdding(false);
  };

  if (!adding) {
    return (
      <button
        onClick={() => setAdding(true)}
        className="px-3.5 py-1.5 border border-dashed border-primary-red/40 text-primary-red text-[12px] font-black uppercase tracking-wider rounded hover:border-primary-red hover:bg-primary-red/5 transition-all flex items-center gap-1.5"
        title="Add new item"
      >
        <Plus size={12} /> Add
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAdd();
          if (e.key === 'Escape') setAdding(false);
        }}
        placeholder="New item..."
        className="px-3 py-1.5 border border-primary-red/50 text-[12px] font-bold rounded focus:outline-none focus:border-primary-red w-32"
        autoFocus
      />
      <button onClick={handleAdd} className="p-1.5 bg-primary-red text-white rounded hover:bg-red-700 transition-colors">
        <Save size={12} />
      </button>
      <button onClick={() => setAdding(false)} className="p-1.5 border border-gray-200 text-gray-400 rounded hover:text-charcoal transition-colors">
        <X size={12} />
      </button>
    </div>
  );
};

const ServiceDrawer = ({ isOpen, onClose, service, rawTitle }) => {
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

  const { isAdminActive, getContent, setContent } = useAdmin();
  const isEngineering = service.techStack !== undefined;
  const keyBase = `whatwedo_service_${rawTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  const baseList = isEngineering ? service.techStack : service.equipment;
  const extendedList = (() => {
    const extended = [...baseList];
    let i = baseList.length;
    while (true) {
      const cached = getContent(`${keyBase}_tech_${i}`);
      if (!cached) break;
      extended.push(cached);
      i++;
    }
    return extended;
  })();

  const removeBadge = (idx) => {
    if (!window.confirm('Remove this badge?')) return;
    const updated = [...extendedList];
    updated.splice(idx, 1);
    updated.forEach((val, i) => {
      setContent(`${keyBase}_tech_${i}`, val);
    });
    setContent(`${keyBase}_tech_${updated.length}`, '');
  };

  return (
    <>
      {/* Dark Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* Slide-Out Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[480px] md:w-[520px] bg-white text-charcoal z-[60] shadow-2xl border-l border-gray-200 flex flex-col transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Header */}
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-10 py-10 space-y-12 scrollbar-thin">

          {/* Overview */}
          <div className="space-y-3">
            <h4 className="text-[11px] text-gray-400 font-black uppercase tracking-[0.4em] flex items-center gap-2">
              <Cpu size={12} className="text-primary-red" /> Operational Overview
            </h4>
            <p className="text-gray-600 text-[15px] md:text-[16px] leading-loose font-semibold tracking-wide">
              <EditText id={`${keyBase}_desc`} defaultValue={service.description} isTextArea={true} />
            </p>
          </div>

          {/* Key Deliverables */}
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
              <Hammer size={12} className="text-primary-red" />
              {isEngineering ? 'Design Stack & Standards' : 'Execution & Fleet'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {extendedList.map((tech, i) => (
                <span
                  key={i}
                  className="relative group/badge px-3.5 py-1.5 bg-blue-grey text-charcoal border border-gray-200/40 text-[12px] font-black uppercase tracking-wider rounded transition-all duration-300 hover:border-primary-red hover:text-primary-red hover:bg-primary-red/5 flex items-center gap-1.5"
                >
                  <EditText id={`${keyBase}_tech_${i}`} defaultValue={tech} />
                  {isAdminActive && (
                    <button
                      onClick={() => removeBadge(i)}
                      className="opacity-0 group-hover/badge:opacity-100 ml-1 text-primary-red hover:text-red-700 transition-all"
                      title="Remove badge"
                    >
                      <X size={10} />
                    </button>
                  )}
                </span>
              ))}

              {isAdminActive && (
                <AddBadgeButton keyBase={keyBase} existingCount={baseList.length} />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
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