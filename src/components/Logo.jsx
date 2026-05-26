import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex font-black text-3xl tracking-tighter leading-none italic">
        <span className="text-primary-red">IN</span>
        <span className="text-charcoal uppercase ml-[-2px]">Steel</span>
      </div>
      <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 mt-1 leading-none">
        Building Capabilities
      </span>
    </div>
  );
};

export default Logo;
