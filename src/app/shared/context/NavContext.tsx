'use client';
import React, { createContext, useContext, useState } from 'react';

interface NavContextValue {
  mobileOpen: boolean;
  toggleMobile(): void;
  closeMobile(): void;
}

const NavContext = createContext<NavContextValue | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(o => !o);
  const closeMobile  = () => setMobileOpen(false);

  return (
    <NavContext.Provider value={{ mobileOpen, toggleMobile, closeMobile }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within NavProvider');
  return ctx;
}