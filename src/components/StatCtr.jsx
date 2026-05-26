import React, { useEffect, useRef, useState } from 'react';
import { useCountUp, parseStatValue } from '../hooks/useCountUp';

const StatCounter = ({ value, label, className = '', valueClassName = '' }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const { target, suffix, isNumeric } = parseStatValue(value);
  const count = useCountUp(isNumeric ? target : 0, { active: active && isNumeric });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const display = isNumeric
    ? `${(target >= 1000 ? count.toLocaleString('en-IN') : count)}${suffix}`
    : value;

  return (
    <div ref={ref} className={className}>
      <div className={valueClassName}>{display}</div>
      {label && (
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">
          {label}
        </div>
      )}
    </div>
  );
};

export default StatCounter;
