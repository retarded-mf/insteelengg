import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useLocation } from 'react-router-dom';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [contentCache, setContentCache] = useState({}); // id → url/value
  const [contentLoading, setContentLoading] = useState(true);

  // ── Auth: listen for session changes ─────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Content: fetch all published rows into cache on mount ─────
  useEffect(() => {
    const fetchContent = async () => {
      setContentLoading(true);
      const { data, error } = await supabase
        .from('content')
        .select('id, url, position')
        .eq('status', 'published');

      if (!error && data) {
        const cache = {};
        data.forEach(row => {
          cache[row.id] = row.url;
          if (row.position) cache[row.id + '_position'] = row.position;
        });
        setContentCache(cache);
      }
      setContentLoading(false);
    };

    fetchContent();
  }, []);

  // ── Derived: isAdminActive ────────────────────────────────────
  const location = useLocation();
  const isAdminActive = !!session && location.pathname.startsWith('/admin');

  // ── Auth Actions ──────────────────────────────────────────────
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return !error; // true = success
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  // ── Content Actions ───────────────────────────────────────────
  const getContent = useCallback((id, defaultValue) => {
    return contentCache[id] !== undefined ? contentCache[id] : defaultValue;
  }, [contentCache]);

  const setContent = useCallback(async (id, value) => {
    // 1. Update cache immediately (UI feels instant)
    setContentCache(prev => ({ ...prev, [id]: value }));

    // 2. Persist to Supabase in background
    const isPosition = id.endsWith('_position');
    const baseId = isPosition ? id.replace('_position', '') : id;

    if (isPosition) {
      await supabase.from('content').upsert({ id: baseId, position: value }, { onConflict: 'id' });
    } else {
      await supabase.from('content').upsert(
        { id, url: value, status: 'published' },
        { onConflict: 'id' }
      );
    }
  }, []);

  const resetAllContent = async () => {
    setContentCache({});
    // Soft reset: mark all as 'default' — or delete if preferred
    // For now we just clear the local cache; data stays in DB
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminActive,
        session,
        contentLoading,
        login,
        logout,
        getContent,
        setContent,
        resetAllContent,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
