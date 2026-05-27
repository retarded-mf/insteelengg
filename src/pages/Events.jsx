import React from 'react';

const Events = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-blue-grey border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            Milestones &amp; Presence
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-charcoal mb-6 uppercase tracking-tighter">
            Events
          </h1>
          <p className="text-lg text-gray-400 font-bold uppercase tracking-[0.3em]">
            Trade Shows, Conferences &amp; Industry Gatherings
          </p>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-gray-200">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            Coming Soon
          </span>
          <p className="text-charcoal font-black text-2xl uppercase tracking-tighter">
            Event gallery is being assembled
          </p>
          <p className="text-gray-400 text-sm mt-4 max-w-md">
            Photos and highlights from trade shows, industry conferences, and milestone events will appear here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Events;
