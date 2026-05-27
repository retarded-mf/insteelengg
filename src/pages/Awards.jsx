import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award } from 'lucide-react';

const Awards = () => {
  useScrollReveal();

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-32 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">Recognition</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">Awards &amp; Recognition</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Accreditations and honours that validate our commitment to engineering excellence.
          </p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="reveal-on-scroll break-inside-avoid shadow-lg relative group">
                <img
                  src={`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600&h=${400 + (i % 3) * 100}`}
                  alt="Award"
                  className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-primary-red/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <div className="text-center text-white">
                    <Award size={48} className="mx-auto mb-4" />
                    <div className="font-bold uppercase tracking-widest text-sm">Excellence in Structural Steel</div>
                    <div className="text-xs mt-2 font-medium opacity-80">2023 - Infrastructure Summit</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;
