import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Col 1: Logo & Info */}
          <div>
            <Logo className="mb-6" />
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-red mr-3 mt-0.5 flex-shrink-0" />
                <span>804, The Ambience Court, Sector 19-D, Vashi, Navi Mumbai 400703</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary-red mr-3 flex-shrink-0" />
                <span>+91 22 41112000</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary-red mr-3 flex-shrink-0" />
                <span>sales@insteelengg.com</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.linkedin.com/company/insteel-engineers-pvt-ltd/posts/?feedView=images" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-charcoal hover:bg-primary-red hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/insteel_engineers_limited/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-charcoal hover:bg-primary-red hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/insteeleng" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-charcoal hover:bg-primary-red hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-charcoal font-bold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-primary-red text-sm font-medium">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary-red text-sm font-medium">About Us</Link></li>
              <li><Link to="/projects" className="text-gray-600 hover:text-primary-red text-sm font-medium">Projects</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-primary-red text-sm font-medium">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary-red text-sm font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: What We Do */}
          <div>
            <h4 className="text-charcoal font-bold uppercase tracking-wider mb-6">What We Do</h4>
            <ul className="space-y-3">
              <li><Link to="/what-we-do?tab=engineering" className="text-gray-600 hover:text-primary-red text-sm font-medium">Engineering</Link></li>
              <li><Link to="/what-we-do?tab=construction" className="text-gray-600 hover:text-primary-red text-sm font-medium">Construction</Link></li>
              <li><Link to="/what-we-do?tab=solar" className="text-gray-600 hover:text-primary-red text-sm font-medium">Solar</Link></li>
              <li><Link to="/products/barricading" className="text-gray-600 hover:text-primary-red text-sm font-medium">Barricading</Link></li>
            </ul>
          </div>

          {/* Col 4: Certifications */}
          <div>
            <h4 className="text-charcoal font-bold uppercase tracking-wider mb-6">Certifications</h4>
            <div className="grid grid-cols-2 gap-3">
              {['ISO 9001:2015', 'AIS', 'CRISIL', 'NIS'].map((cert) => (
                <div key={cert} className="h-16 bg-blue-grey border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400 text-center px-2 uppercase">
                  {cert}
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">© 2026 Insteel Engineers Ltd. All Rights Reserved.</p>
          <div className="flex space-x-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-primary-red transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-red transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;