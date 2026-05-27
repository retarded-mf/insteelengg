import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [isAdminActive, setIsAdminActive] = useState(() => {
    return sessionStorage.getItem('isAdminActive') === 'true';
  });

  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('insteelSiteContent');
    return saved ? JSON.parse(saved) : {};
  });

  // Sync site content edits to localStorage
  useEffect(() => {
    localStorage.setItem('insteelSiteContent', JSON.stringify(siteContent));
  }, [siteContent]);

  const login = (username, password) => {
    if (username === 'admin' && password === 'insteel2026') {
      setIsAdminActive(true);
      sessionStorage.setItem('isAdminActive', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminActive(false);
    sessionStorage.removeItem('isAdminActive');
  };

  const getContent = (key, defaultValue) => {
    return siteContent[key] !== undefined ? siteContent[key] : defaultValue;
  };

  const setContent = (key, value) => {
    setSiteContent((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetAllContent = () => {
    setSiteContent({});
    localStorage.removeItem('insteelSiteContent');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminActive,
        siteContent,
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
