import { useEffect, useState, useRef } from 'react';

/**
 * Animates a number when `active` becomes true (typically via IntersectionObserver).
 */
export function useCountUp(target, { duration = 1600, active = false } = {}) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    let frameId;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
      else setValue(target);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target, duration]);

  return value;
}

export function parseStatValue(raw) {
  const str = String(raw).trim();
  const match = str.match(/^([\d,]+)(.*)$/);
  if (!match) return { target: null, suffix: str, isNumeric: false };
  return {
    target: parseInt(match[1].replace(/,/g, ''), 10),
    suffix: match[2] || '',
    isNumeric: true,
  };
}
