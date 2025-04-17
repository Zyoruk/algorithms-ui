'use client';
import React from 'react';

import { useNav } from '../context/NavContext';
import { navConfig } from '../navConfig';

import NavLink from './NavLink';

export default function Sidebar() {
  const { mobileOpen, closeMobile } = useNav();
  return (
    <nav
      role="navigation"
      className={`
        fixed inset-0 z-20 bg-gray-100 p-4 space-y-6 overflow-y-auto
        md:relative md:inset-auto md:z-auto md:flex md:flex-col md:w-64
        ${mobileOpen ? 'block' : 'hidden md:block'}
      `}
      aria-hidden={!mobileOpen}
    >
      {navConfig.map((section) => (
        <div key={section.title}>
          <h2 className="text-gray-500 uppercase tracking-wide text-xs font-semibold mb-2">
            {section.title}
          </h2>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  className="block"
                  onClick={closeMobile} // auto-close on mobile
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}