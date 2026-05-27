import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">Get In Touch</h1>
          <p className="text-xl text-primary-red font-bold uppercase tracking-[0.3em]">Let's Build Something Landmark Together</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Form */}
          <div className="bg-charcoal p-10 md:p-16 shadow-2xl">
            <h2 className="text-3xl font-extrabold text-white mb-10 uppercase tracking-tight">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-primary-red transition-colors" placeholder="Enter your name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-primary-red transition-colors" placeholder="+91" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-primary-red transition-colors" placeholder="email@company.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Message</label>
                <textarea rows={6} className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-primary-red transition-colors" placeholder="How can we help you?"></textarea>
              </div>
              <button className="btn-red w-full py-5 text-lg !rounded-none">
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-charcoal mb-10 uppercase tracking-tight">Contact Information</h2>
              <div className="space-y-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-grey flex items-center justify-center text-primary-red flex-shrink-0 mr-6">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal uppercase mb-2">Registered Office</h4>
                    <p className="text-gray-500 leading-relaxed font-medium">
                      804, The Ambience Court, Sector 19-D, Vashi,<br />
                      Navi Mumbai 400703, Maharashtra, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-grey flex items-center justify-center text-primary-red flex-shrink-0 mr-6">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal uppercase mb-2">Call Us</h4>
                    <p className="text-gray-500 font-bold text-xl">+91 22 41112000</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-grey flex items-center justify-center text-primary-red flex-shrink-0 mr-6">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal uppercase mb-2">Email Us</h4>
                    <p className="text-gray-500 font-medium hover:text-primary-red cursor-pointer transition-colors">sales@insteelengg.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Follow Our Progress</h4>
                <div className="flex space-x-6">
                  <a href="https://www.linkedin.com/company/insteel-engineers-pvt-ltd/posts/?feedView=images" target="_blank" rel="noreferrer" className="text-charcoal hover:text-primary-red transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/insteel_engineers_limited/" target="_blank" rel="noreferrer" className="text-charcoal hover:text-primary-red transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/insteeleng" target="_blank" rel="noreferrer" className="text-charcoal hover:text-primary-red transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-16 h-64 bg-blue-grey relative border border-gray-100 flex items-center justify-center overflow-hidden">
                <div className="text-gray-400 font-black uppercase text-xs tracking-widest">Google Maps Integration Placeholder</div>
                <div className="absolute inset-0 grayscale opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover"></div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;