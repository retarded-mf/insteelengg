import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Optional: stop observing once visible
          }
        });
      },
      { threshold: 0.1 }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.visible)');
      elements.forEach((el) => observer.observe(el));
    };

    // Initial observation
    observeElements();

    // Watch for dynamically added elements (like async fetches)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return containerRef;
};
