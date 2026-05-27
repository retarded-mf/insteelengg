import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Shield, Key, User, ArrowRight, AlertTriangle } from 'lucide-react';
import Logo from '../components/Logo';

// Import all sub-pages for state-based rendering under /admin URL
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

const AdminLogin = () => {
  const { login, isAdminActive } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Parse tab search query parameter e.g., ?tab=about
  const query = new URLSearchParams(location.search);
  const currentTab = query.get('tab') || 'home';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    // Simulate minor premium network delay
    setTimeout(() => {
      const success = login(username, password);
      setLoading(false);
      if (success) {
        // Stay exactly on /admin, URL query resets to clean tab=home
        navigate('/admin?tab=home');
      } else {
        setError(true);
        setPassword('');
      }
    }, 1000);
  };

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
      default:
        return <Home />;
    }
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Architectural Vignette overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl flex flex-col items-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center space-y-3">
          <Logo className="scale-125 select-none" />
          <div className="text-center pt-2">
            <span className="text-[10px] text-primary-red font-black uppercase tracking-[0.4em] mb-1 block">
              Control Portal
            </span>
            <h2 className="text-white font-black text-xl uppercase tracking-tighter">
              Admin CMS Console
            </h2>
          </div>
        </div>

        {/* Error alert banner */}
        {error && (
          <div className="w-full flex items-center gap-3.5 bg-primary-red/10 border border-primary-red/35 px-4 py-3 rounded text-[13px] text-red-200 animate-bounce">
            <AlertTriangle className="text-primary-red shrink-0" size={18} />
            <span className="font-bold">Invalid username or password.</span>
          </div>
        )}

        {/* Form Block */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest">
              Administrator ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/30">
                <User size={16} />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-white/5 border border-white/10 focus:border-primary-red/60 focus:ring-1 focus:ring-primary-red/30 px-11 py-3.5 text-white placeholder-white/20 text-sm rounded transition-all focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest">
              Secure Credentials
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/30">
                <Key size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 focus:border-primary-red/60 focus:ring-1 focus:ring-primary-red/30 px-11 py-3.5 text-white placeholder-white/20 text-sm rounded transition-all focus:outline-none"
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
              className="w-full inline-flex items-center justify-center gap-3 py-3.5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white font-black uppercase text-xs tracking-[0.3em] rounded transition-all duration-300 shadow-md active:scale-[0.98] focus:outline-none"
            >
              <span>Return to Site</span>
            </Link>
          </div>
        </form>

        {/* Demo hints */}
        <div className="w-full text-center border-t border-white/5 pt-5">
          <div className="text-[9px] font-black uppercase tracking-[0.25em] text-white/20 mb-2">
            Development Demo Access
          </div>
          <div className="inline-flex gap-4 text-[10px] text-white/40 font-bold bg-white/[0.02] border border-white/5 px-4 py-2 rounded">
            <span>ID: <code className="text-white/60">admin</code></span>
            <span className="w-[1px] h-3.5 bg-white/10 self-center" />
            <span>Key: <code className="text-white/60">insteel2026</code></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
