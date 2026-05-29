import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Shield, Key, User, ArrowRight, AlertTriangle } from 'lucide-react';
import logoImg from '../assets/images/logo.png';



import Home from './Home';
import AboutInsteel from './AboutInsteel';
import TheTeam from './TheTeam';
import Awards from './Awards';
import OurClients from './OurClients';
import WhatWeDo from './WhatWeDo';
import ProjectsPage from './ProjectsPage';
import Blog from './Blog';
import Events from './Events';
import Contact from './Contact';
import Barricading from './Barricading';
import News from './News';
import Investor from './Investor';
import AnnualReport from './AnnualReport';
import Careers from './Careers';

const AdminLogin = () => {
  const { login, isAdminActive, session } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Parse tab search query parameter e.g., ?adminTab=about
  const query = new URLSearchParams(location.search);
  const currentTab = query.get('adminTab') || 'home';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/admin?adminTab=home');
    } else {
      setError(true);
      setPassword('');
    }
  };

  // Prevent flash while checking auth state
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary-red rounded-full animate-spin"></div>
      </div>
    );
  }

  // If Admin Session is active, render the corresponding sub-page directly within /admin route
  if (isAdminActive) {
    switch (currentTab) {
      case 'about':
        return <AboutInsteel />;
      case 'team':
        return <TheTeam />;
      case 'awards':
        return <Awards />;
      case 'clients':
        return <OurClients />;
      case 'what-we-do':
        return <WhatWeDo />;
      case 'projects':
        return <ProjectsPage />;
      case 'blog':
        return <Blog />;
      case 'events':
        return <Events />;
      case 'contact':
        return <Contact />;
      case 'barricading':
      case 'products/barricading':
        return <Barricading />;
      case 'news':
        return <News />;
      case 'investor':
        return <Investor />;
      case 'annual-report':
        return <AnnualReport />;
      case 'careers':
        return <Careers />;
      default:
        return <Home />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Architectural Vignette overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200/80 shadow-2xl p-8 sm:p-10 rounded-2xl flex flex-col items-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center space-y-3">
          <img src={logoImg} alt="Insteel Logo" className="h-16 w-auto object-contain select-none" />
          <div className="text-center pt-2">
            <span className="text-[10px] text-primary-red font-black uppercase tracking-[0.4em] mb-1 block">
              Control Portal
            </span>
            <h2 className="text-slate-950 font-black text-xl uppercase tracking-tighter">
              Admin CMS Console
            </h2>
          </div>
        </div>

        {/* Error alert banner */}
        {error && (
          <div className="w-full flex items-center gap-3.5 bg-red-50 border border-red-200 px-4 py-3 rounded text-[13px] text-red-700 animate-bounce">
            <AlertTriangle className="text-primary-red shrink-0" size={18} />
            <span className="font-bold">Invalid username or password.</span>
          </div>
        )}

        {/* Form Block */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Administrator Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <User size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@insteelengg.com"
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary-red/60 focus:ring-1 focus:ring-primary-red/30 px-11 py-3.5 text-slate-900 placeholder-slate-400/60 text-sm rounded transition-all focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Secure Credentials
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Key size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary-red/60 focus:ring-1 focus:ring-primary-red/30 px-11 py-3.5 text-slate-900 placeholder-slate-400/60 text-sm rounded transition-all focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 py-4 bg-primary-red hover:bg-red-700 disabled:bg-primary-red/50 text-white font-black uppercase text-xs tracking-[0.3em] rounded transition-all duration-300 shadow-md active:scale-[0.98] focus:outline-none"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Establish Session</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            {/* Go Back button (Return to site without /admin) */}
            <Link
              to="/"
              className="w-full inline-flex items-center justify-center gap-3 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-black uppercase text-xs tracking-[0.3em] rounded transition-all duration-300 shadow-sm active:scale-[0.98] focus:outline-none"
            >
              <span>Return to Site</span>
            </Link>
          </div>
        </form>



      </div>
    </div>
  );
};

export default AdminLogin;
