import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null); // 'who-we-are', 'what-we-do', 'projects'
  const [activeImage, setActiveImage] = useState("https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=800");
  const location = useLocation();

  const navLinks = [
    { name: 'Who We Are', path: '/about', id: 'who-we-are' },
    { name: 'What We Do', path: '/what-we-do', id: 'what-we-do' },
    { name: 'Projects', path: '/projects', id: 'projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const whoWeAreMega = [
    { name: 'About Insteel', path: '/about', img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
    { name: 'Events & News', path: '/blog', img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
    { name: 'The Team', path: '/about#team', img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" },
    { name: 'Awards & Recognition', path: '/about#awards', img: "https://images.unsplash.com/photo-1531050171651-61afc0821d71?auto=format&fit=crop&q=80&w=800" },
    { name: 'Our Clients', path: '/about#clients', img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" },
  ];

  const servicesMega = {
    engineering: [
      { name: 'Structural Steel Design', path: '/what-we-do?tab=engineering', img: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800" },
      { name: 'RCC Design', path: '/what-we-do?tab=engineering', img: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=800" },
      { name: 'BIM & Digital Twin', path: '/what-we-do?tab=engineering', img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" },
      { name: 'Connection Design', path: '/what-we-do?tab=engineering', img: "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&q=80&w=800" },
    ],
    construction: [
      { name: 'Precision Fabrication', path: '/what-we-do?tab=construction', img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" },
      { name: 'High-Rise Erection', path: '/what-we-do?tab=construction', img: "https://images.unsplash.com/photo-1531834357241-0322ba66024d?auto=format&fit=crop&q=80&w=800" },
      { name: 'Fire Proofing', path: '/what-we-do?tab=construction', img: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=800" },
      { name: 'Roofing & Cladding', path: '/what-we-do?tab=construction', img: "https://images.unsplash.com/photo-1513344605008-0133c948408f?auto=format&fit=crop&q=80&w=800" },
    ],
    others: [
      { name: 'Solar', path: '/what-we-do?tab=solar', img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800" },
      { name: 'Barricading', path: '/what-we-do?tab=barricading', img: "https://images.unsplash.com/photo-1517646281694-8ec8d091e3dc?auto=format&fit=crop&q=80&w=800" },
    ]
  };

  const projectsMega = [
    { name: 'High-Rise Buildings (Steel)', path: '/projects?cat=High-Rise%20Buildings%20(Steel)', img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { name: 'Connecting Bridges', path: '/projects?cat=Connecting%20Bridges', img: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=800" },
    { name: 'Composite Buildings', path: '/projects?cat=Composite%20Buildings', img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800" },
    { name: 'Railway Stations', path: '/projects?cat=Railway%20Stations', img: "https://images.unsplash.com/photo-1474487548417-781fbc05477d?auto=format&fit=crop&q=80&w=800" },
    { name: 'Airport Terminals', path: '/projects?cat=Airports', img: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800" },
    { name: 'Special Structures', path: '/projects?cat=Special%20Structures', img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" },
  ];

  useEffect(() => {
    setIsOpen(false);
    setActiveMega(null);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-100" onMouseLeave={() => setActiveMega(null)}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative h-28 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0" onMouseEnter={() => setActiveMega(null)}>
          <Logo className="scale-125 origin-left" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12 h-full">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="h-full flex items-center"
              onMouseEnter={() => link.id && setActiveMega(link.id)}
            >
              <Link
                to={link.path}
                className={cn(
                  "text-xs font-black uppercase tracking-[0.2em] transition-colors flex items-center h-full",
                  location.pathname === link.path || (link.id === 'what-we-do' && location.pathname === '/what-we-do')
                    ? "text-primary-red" 
                    : "text-charcoal hover:text-primary-red"
                )}
              >
                {link.name}
                {link.id && <ChevronDown className={cn("ml-1 w-4 h-4 transition-transform", activeMega === link.id && "rotate-180")} />}
              </Link>
            </div>
          ))}
          <Link to="/contact" className="btn-red !py-3 !px-10">
            Get a Quote
          </Link>
        </div>

        {/* Global Mega Menu Container - Centered relative to Navbar Container */}
        {activeMega && (
          <div 
            className="absolute top-[112px] left-6 right-6 lg:left-12 lg:right-12 bg-charcoal shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 z-50 flex"
            onMouseEnter={() => setActiveMega(activeMega)}
          >
            {/* Nav Links Column */}
            <div className="flex-grow grid grid-cols-3 p-12 gap-x-12">
              {activeMega === 'who-we-are' ? (
                <div className="col-span-3">
                   <h4 className="text-[10px] text-primary-red font-black uppercase tracking-[0.4em] mb-8">Insteel Corporate Overview</h4>
                   <div className="grid grid-cols-2 gap-x-12">
                     {whoWeAreMega.map((s) => (
                       <Link
                         key={s.name}
                         to={s.path}
                         onMouseEnter={() => setActiveImage(s.img)}
                         className="block py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5"
                       >
                         {s.name}
                       </Link>
                     ))}
                   </div>
                </div>
              ) : activeMega === 'what-we-do' ? (
                <>
                  <div className="space-y-2 text-left">
                     <h4 className="text-[10px] text-primary-red font-black uppercase tracking-[0.4em] mb-6">Engineering</h4>
                     {servicesMega.engineering.map((s) => (
                       <Link key={s.name} to={s.path} onMouseEnter={() => setActiveImage(s.img)} className="block py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5">{s.name}</Link>
                     ))}
                  </div>
                  <div className="space-y-2 text-left">
                     <h4 className="text-[10px] text-primary-red font-black uppercase tracking-[0.4em] mb-6">Construction</h4>
                     {servicesMega.construction.map((s) => (
                       <Link key={s.name} to={s.path} onMouseEnter={() => setActiveImage(s.img)} className="block py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5">{s.name}</Link>
                     ))}
                  </div>
                  <div className="space-y-2 text-left">
                     <h4 className="text-[10px] text-primary-red font-black uppercase tracking-[0.4em] mb-6">Divisions</h4>
                     {servicesMega.others.map((s) => (
                       <Link key={s.name} to={s.path} onMouseEnter={() => setActiveImage(s.img)} className="block py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5">{s.name}</Link>
                     ))}
                  </div>
                </>
              ) : (
                <div className="col-span-3">
                   <h4 className="text-[10px] text-primary-red font-black uppercase tracking-[0.4em] mb-8">Landmark EPC Projects</h4>
                   <div className="grid grid-cols-2 gap-x-12">
                     {projectsMega.map((p) => (
                       <Link key={p.name} to={p.path} onMouseEnter={() => setActiveImage(p.img)} className="block py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5">{p.name}</Link>
                     ))}
                   </div>
                </div>
              )}
            </div>

            {/* Preview Image Column */}
            <div className="w-[450px] relative bg-black shrink-0">
              <img src={activeImage} alt="Category Preview" className="w-full h-full object-cover opacity-60 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-charcoal hover:text-primary-red p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 animate-in fade-in slide-in-from-top-4">
          <div className="px-6 pt-4 pb-12 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="block py-4 text-xs font-black uppercase tracking-widest text-charcoal" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="btn-red w-full block text-center mt-8" onClick={() => setIsOpen(false)}>Get a Quote</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
