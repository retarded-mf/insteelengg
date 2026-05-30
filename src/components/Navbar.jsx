import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAdmin } from '../context/AdminContext';
import { EditImage } from './Editable';
import { supabase } from '../lib/supabase';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MEGA_PREVIEW_IMAGE = 'w-[400px] min-h-[300px]';

const defaultCareersFallback = [
  { baseId: 'job_0', title: 'Senior Structural Engineer' },
  { baseId: 'job_1', title: 'Tekla Detailing Lead' },
  { baseId: 'job_2', title: 'Site Erection Supervisor' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [hoveredMegaItem, setHoveredMegaItem] = useState({
    name: 'About Insteel',
    defaultUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
  });
  const location = useLocation();

  const [careersList, setCareersList] = useState(defaultCareersFallback);

  useEffect(() => {
    const fetchNavbarCareers = async () => {
      try {
        const { data } = await supabase
          .from('content')
          .select('element, url')
          .eq('pagename', 'careers')
          .eq('type', 'job');
        if (data && data.length > 0) {
          const imgBases = data.map(r => r.element.replace('_img', ''));
          const titleElements = imgBases.map(b => `${b}_title`);
          const { data: textData } = await supabase
            .from('content')
            .select('element, url')
            .in('element', titleElements);
          const textMap = {};
          (textData || []).forEach(r => { textMap[r.element] = r.url; });
          setCareersList(imgBases.map(base => ({
            baseId: base,
            title: textMap[`${base}_title`] || 'Position'
          })));
        }
      } catch (err) {
        console.error('Failed to query careers:', err);
      }
    };
    fetchNavbarCareers();
  }, []);

  const navLinks = [
    { name: 'Who We Are', path: '/about', id: 'who-we-are' },
    { name: 'What We Do', path: '/what-we-do', id: 'what-we-do' },
    { name: 'Projects', path: '/projects', id: 'projects' },
    { name: 'Company', path: '#', id: 'company' },
    { name: 'Blog', path: '/blog' },
  ];

  const whoWeAreMega = [
    { name: 'About Insteel', path: '/about', img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
    { name: 'Events', path: '/events', img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
    { name: 'The Team', path: '/team', img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" },
    { name: 'Awards & Recognition', path: '/awards', img: "https://images.unsplash.com/photo-1531050171651-61afc0821d71?auto=format&fit=crop&q=80&w=800" },
    { name: 'Our Clients', path: '/clients', img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" },
  ];

  const companyMega = [
    { name: 'News', path: '/news' },
    { name: 'Investor', path: '/investor' },
    { name: 'Annual Report', path: '/annual-report' },
  ];

  const servicesMega = {
    engineering: [
      { name: 'Structural Steel Design & Detailing', path: '/what-we-do?tab=engineering&service=Structural Steel Design %26 Detailing', img: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800" },
      { name: 'RCC Design', path: '/what-we-do?tab=engineering&service=RCC Design', img: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=800" },
      { name: 'Rebar Detailing & BBS', path: '/what-we-do?tab=engineering&service=Rebar Detailing %26 BBS', img: "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&q=80&w=800" },
      { name: 'Building Information Modelling (BIM)', path: '/what-we-do?tab=engineering&service=Building Information Modelling (BIM)', img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" },
      { name: 'Connection Design', path: '/what-we-do?tab=engineering&service=Connection Design', img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
      { name: 'MEP Services', path: '/what-we-do?tab=engineering&service=MEP Services', img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800" },
      { name: 'Shop Drawing Generation', path: '/what-we-do?tab=engineering&service=Shop Drawing Generation', img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" },
    ],
    construction: [
      { name: 'Fabrication', path: '/what-we-do?tab=construction&service=Fabrication', img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" },
      { name: 'Erection', path: '/what-we-do?tab=construction&service=Erection', img: "https://images.unsplash.com/photo-1531834357241-0322ba66024d?auto=format&fit=crop&q=80&w=800" },
      { name: 'Painting & Fire Proofing', path: '/what-we-do?tab=construction&service=Painting %26 Fire Proofing', img: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=800" },
      { name: 'Roofing & Cladding', path: '/what-we-do?tab=construction&service=Roofing %26 Cladding', img: "https://images.unsplash.com/photo-1513344605008-0133c948408f?auto=format&fit=crop&q=80&w=800" },
      { name: 'Civil Works for Composite Structures', path: '/what-we-do?tab=construction&service=Civil Works for Composite Structures', img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800" },
      { name: 'Solar System Installation', path: '/what-we-do?tab=construction&service=Solar System Installation', img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800" },
      { name: 'Technical Manpower Deputation', path: '/what-we-do?tab=construction&service=Technical Manpower Deputation', img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" },
    ],
    others: [
      { name: 'Solar', path: '/what-we-do?tab=solar', img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800" },
      { name: 'Barricading', path: '/products/barricading', img: "https://images.unsplash.com/photo-1517646281694-8ec8d091e3dc?auto=format&fit=crop&q=80&w=800" },
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

  const { isAdminActive, logout, getContent } = useAdmin();
  const navigate = useNavigate();

  const activePreviewUrl = hoveredMegaItem
    ? getContent(`mega_${hoveredMegaItem.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_img`, hoveredMegaItem.defaultUrl)
    : 'https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=800';

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  const getNavPath = (originalPath) => {
    if (!isAdminActive) return originalPath;
    if (originalPath === '/') return '/admin?adminTab=home';

    if (originalPath.startsWith('/what-we-do')) {
      const parts = originalPath.split('?');
      const search = parts[1] ? `&${parts[1]}` : '';
      return `/admin?adminTab=what-we-do${search}`;
    }
    if (originalPath.startsWith('/projects')) {
      const parts = originalPath.split('?');
      const search = parts[1] ? `&${parts[1]}` : '';
      return `/admin?adminTab=projects${search}`;
    }
    if (originalPath.startsWith('/products/barricading')) {
      return '/admin?adminTab=barricading';
    }
    const cleanPath = originalPath.startsWith('/') ? originalPath.slice(1) : originalPath;
    return `/admin?adminTab=${cleanPath}`;
  };

  // Highlighting active state logic for navbar links & sub-sections
  const isLinkActive = (link) => {
    const curPath = location.pathname;
    if (link.id === 'who-we-are') {
      return ['/about', '/events', '/team', '/awards', '/clients'].includes(curPath);
    }
    if (link.id === 'what-we-do') {
      return curPath === '/what-we-do' || curPath.startsWith('/products/');
    }
    if (link.id === 'projects') {
      return curPath === '/projects';
    }
    if (link.id === 'company') {
      return ['/news', '/investor', '/annual-report'].includes(curPath);
    }
    return curPath === link.path;
  };

  useEffect(() => {
    setIsOpen(false);
    setActiveMega(null);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed left-0 w-full bg-white z-50 border-b border-gray-100 transition-all duration-300",
        isAdminActive ? "top-0 border-t-4 border-t-primary-red" : "top-0"
      )}
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className="w-full px-8 lg:px-16 relative h-32 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center" onMouseEnter={() => setActiveMega(null)}>
          <Link to={getNavPath("/")}>
            <img src={logoImg} alt="Insteel Logo" className="h-[70px] w-auto object-contain origin-left" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 h-full">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className={cn(
                "h-full flex items-center",
                (link.id === 'who-we-are' || link.id === 'what-we-do' || link.id === 'projects' || link.id === 'company') && "relative"
              )}
              onMouseEnter={() => link.id && setActiveMega(link.id)}
            >
              <Link
                to={getNavPath(link.path)}
                className={cn(
                  "text-[15px] font-black uppercase tracking-[0.1em] transition-colors flex items-center h-full",
                  isLinkActive(link)
                    ? "text-primary-red"
                    : "text-charcoal hover:text-primary-red"
                )}
              >
                {link.name}
                {link.id && <ChevronDown className={cn("ml-1 w-4 h-4 transition-transform", activeMega === link.id && "rotate-180")} />}
              </Link>

              {/* Who We Are dropdown */}
              {link.id === 'who-we-are' && activeMega === 'who-we-are' && (
                <div
                  className="absolute top-full left-0 w-[300px] bg-charcoal shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50 py-8 px-8"
                  onMouseEnter={() => setActiveMega('who-we-are')}
                >
                  <h4 className="text-[11px] text-primary-red font-black uppercase tracking-[0.4em] mb-4">
                    Insteel Corporate Overview
                  </h4>
                  <div className="space-y-0">
                    {whoWeAreMega.map((s) => (
                      <Link
                        key={s.name}
                        to={getNavPath(s.path)}
                        className="block py-3.5 text-[13px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* What We Do dropdown */}
              {link.id === 'what-we-do' && activeMega === 'what-we-do' && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 flex items-stretch w-max bg-charcoal shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50"
                  onMouseEnter={() => setActiveMega('what-we-do')}
                >
                  <div className="grid grid-cols-3 gap-x-8 py-8 px-8 shrink-0">
                    <div className="space-y-1 text-left w-[200px]">
                      <h4 className="text-[11px] text-primary-red font-black uppercase tracking-[0.4em] mb-5">Engineering</h4>
                      {servicesMega.engineering.map((s) => (
                        <Link key={s.name} to={getNavPath(s.path)} onMouseEnter={() => setHoveredMegaItem({ name: s.name, defaultUrl: s.img })} className="block py-3.5 text-[13px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5">{s.name}</Link>
                      ))}
                    </div>
                    <div className="space-y-1 text-left w-[200px]">
                      <h4 className="text-[11px] text-primary-red font-black uppercase tracking-[0.4em] mb-5">Construction</h4>
                      {servicesMega.construction.map((s) => (
                        <Link key={s.name} to={getNavPath(s.path)} onMouseEnter={() => setHoveredMegaItem({ name: s.name, defaultUrl: s.img })} className="block py-3.5 text-[13px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5">{s.name}</Link>
                      ))}
                    </div>
                    <div className="space-y-1 text-left w-[180px]">
                      <h4 className="text-[11px] text-primary-red font-black uppercase tracking-[0.4em] mb-5">Divisions</h4>
                      {servicesMega.others.map((s) => (
                        <Link key={s.name} to={getNavPath(s.path)} onMouseEnter={() => setHoveredMegaItem({ name: s.name, defaultUrl: s.img })} className="block py-3.5 text-[13px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5">{s.name}</Link>
                      ))}
                    </div>
                  </div>
                  <div className={cn('relative bg-charcoal shrink-0 self-stretch', MEGA_PREVIEW_IMAGE)}>
                    {isAdminActive ? (
                      <EditImage
                        id={`mega_${hoveredMegaItem.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_img`}
                        defaultUrl={hoveredMegaItem.defaultUrl}
                        alt="Category Preview"
                        className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-auto"
                      />
                    ) : (
                      <img src={activePreviewUrl} alt="Category Preview" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none" />
                    )}
                  </div>
                </div>
              )}

              {/* Projects dropdown */}
              {link.id === 'projects' && activeMega === 'projects' && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 flex items-stretch w-max bg-charcoal shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50"
                  onMouseEnter={() => setActiveMega('projects')}
                >
                  <div className="py-8 px-8 w-[280px] shrink-0">
                    <h4 className="text-[11px] text-primary-red font-black uppercase tracking-[0.4em] mb-5">Landmark EPC Projects</h4>
                    <div className="grid grid-cols-1">
                      {projectsMega.map((p) => (
                        <Link key={p.name} to={getNavPath(p.path)} onMouseEnter={() => setHoveredMegaItem({ name: p.name, defaultUrl: p.img })} className="block py-3.5 text-[13px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5">{p.name}</Link>
                      ))}
                    </div>
                  </div>
                  <div className={cn('relative bg-charcoal shrink-0', MEGA_PREVIEW_IMAGE)} style={{ height: '300px' }}>
                    {isAdminActive ? (
                      <EditImage
                        id={`mega_${hoveredMegaItem.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_img`}
                        defaultUrl={hoveredMegaItem.defaultUrl}
                        alt="Category Preview"
                        className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-auto"
                      />
                    ) : (
                      <img src={activePreviewUrl} alt="Category Preview" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none" />
                    )}
                  </div>
                </div>
              )}

              {/* Company dropdown */}
              {link.id === 'company' && activeMega === 'company' && (
                <div
                  className="absolute top-full left-0 w-[260px] bg-charcoal shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50 py-8 px-8"
                  onMouseEnter={() => setActiveMega('company')}
                >
                  <h4 className="text-[11px] text-primary-red font-black uppercase tracking-[0.4em] mb-4">
                    Company
                  </h4>
                  <div className="space-y-0">
                    {companyMega.map((item) => (
                      <Link
                        key={item.name}
                        to={getNavPath(item.path)}
                        className="block py-3.5 text-[13px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Careers standalone link with hover dropdown */}
          <div
            className="h-full flex items-center relative"
            onMouseEnter={() => setActiveMega('careers')}
          >
            <Link
              to={getNavPath("/careers")}
              className={cn(
                "text-[15px] font-black uppercase tracking-[0.1em] transition-colors flex items-center h-full",
                location.pathname === '/careers' ? "text-primary-red" : "text-charcoal hover:text-primary-red"
              )}
            >
              Careers
              {careersList.length > 0 && <ChevronDown className={cn("ml-1 w-4 h-4 transition-transform", activeMega === 'careers' && "rotate-180")} />}
            </Link>

            {activeMega === 'careers' && careersList.length > 0 && (
              <div
                className="absolute top-full left-0 w-[300px] bg-charcoal shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50 py-8 px-8 animate-duration-300"
                onMouseEnter={() => setActiveMega('careers')}
              >
                <h4 className="text-[11px] text-primary-red font-black uppercase tracking-[0.4em] mb-4">
                  Active Openings
                </h4>
                <div className="space-y-0">
                  {careersList.map((job) => (
                    <Link
                      key={job.baseId}
                      to={getNavPath(`/careers#job-card-${job.baseId}`)}
                      onClick={(e) => {
                        setActiveMega(null);
                        if (location.pathname === '/careers') {
                          e.preventDefault();
                          const el = document.getElementById(`job-card-${job.baseId}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className="block py-3.5 text-[13px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all border-b border-white/5 truncate"
                    >
                      {job.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to={getNavPath("/brochure")} 
              className="px-6 py-3 font-black uppercase text-[13px] tracking-widest text-charcoal border-2 border-charcoal hover:bg-gray-500 hover:border-gray-500 hover:text-white transition-all duration-300 rounded"
            >
              Brochure
            </Link>
            <Link to="/contact" className="btn-quote !text-[13px]">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        {/* Admin Controls - Moved to the far right in their own block */}
        {isAdminActive && (
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-primary-red">
              <span className="w-2 h-2 rounded-full bg-primary-red" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Admin Mode</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 hover:bg-red-50 text-red-600 rounded transition-colors"
              title="Exit Admin"
            >
              <LogOut size={16} />
            </button>
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
              <Link key={link.name} to={getNavPath(link.path)} className="block py-4 text-sm font-black uppercase tracking-widest text-charcoal" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link to={getNavPath("/careers")} className="block py-4 text-sm font-black uppercase tracking-widest text-charcoal" onClick={() => setIsOpen(false)}>
              Careers
            </Link>
            <Link to={getNavPath("/brochure")} className="block py-4 text-sm font-black uppercase tracking-widest text-charcoal border-2 border-charcoal text-center hover:bg-gray-500 hover:border-gray-500 hover:text-white transition-all duration-300 mt-4 rounded" onClick={() => setIsOpen(false)}>
              Brochure
            </Link>
            <Link to={getNavPath("/contact")} className="btn-quote w-full mt-4" onClick={() => setIsOpen(false)}>
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;