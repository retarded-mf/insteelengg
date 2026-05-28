import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Shield, RotateCcw, LogOut, CheckCircle2 } from 'lucide-react';

const AdminBar = () => {
  const { isAdminActive, logout, resetAllContent } = useAdmin();
  const [resetConfirm, setResetConfirm] = useState(false);

  if (!isAdminActive) return null;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to discard all page edits and restore the original brand defaults?')) {
      resetAllContent();
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 2000);
    }
  };

  const handleExit = async () => {
    await logout();
    window.location.href = '/admin';
  };

  return (
    <div className="w-full h-[52px] bg-[#1A1A1A] border-b border-primary-red text-white px-6 lg:px-12 flex items-center justify-between gap-4 z-[110] fixed top-0 left-0 shadow-[0_4px_16px_rgba(0,0,0,0.25)] select-none">
      {/* Left: Administrative Status + Dashboard nav */}
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-red opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-red"></span>
        </span>
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-primary-red" />
          <span className="font-black uppercase tracking-[0.25em] text-[10px] sm:text-xs">
            ADMIN CMS MODE ACTIVE
          </span>
          <span className="hidden sm:inline text-white/40 font-semibold text-[10px]">
            — Double-click text or hover images to edit live.
          </span>
        </div>
        <span className="w-[1px] h-4 bg-white/10 hidden sm:block" />
        <a
          href="/admin?tab=dashboard"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-primary-red/50 rounded text-[10px] font-black uppercase tracking-widest hover:bg-primary-red/10 transition-all duration-300 text-white/60 hover:text-white"
        >
          Dashboard
        </a>
      </div>

      {/* Right: Operations Control Panel */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-primary-red rounded text-[10px] font-black uppercase tracking-widest hover:bg-primary-red/10 transition-all duration-300 focus:outline-none"
        >
          {resetConfirm ? (
            <>
              <CheckCircle2 size={13} className="text-green-400" />
              <span className="text-green-400">Restored Defaults</span>
            </>
          ) : (
            <>
              <RotateCcw size={13} className="text-primary-red" />
              <span>Restore Brand Defaults</span>
            </>
          )}
        </button>

        {/* Separator */}
        <span className="w-[1px] h-4 bg-white/10 hidden sm:block" />

        {/* Exit Mode Button */}
        <button
          onClick={handleExit}
          className="flex items-center gap-2 px-4 py-2 bg-primary-red hover:bg-red-700 rounded text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-md focus:outline-none"
        >
          <LogOut size={13} />
          <span>Exit Admin Portal</span>
        </button>
      </div>
    </div>
  );
};

export default AdminBar;
