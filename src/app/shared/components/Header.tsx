'use client';
import Link from 'next/link';
import React from 'react';

import { useNav } from '../context/NavContext';
import { navConfig } from '../navConfig';

import NavLink from './NavLink';


export default function Header() {
 const {mobileOpen, toggleMobile} = useNav();
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Algorithms UI
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6">
          {navConfig.map((section) => (
            <div key={section.title} className="relative group">
              <span className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-50">
                {section.title}
              </span>
              <div className="absolute left-0 mt-1 hidden group-hover:block bg-white shadow-lg rounded-md">
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    className="block px-4 py-2 whitespace-nowrap"
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobile}
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            {navConfig.map((section) => (
              <div key={section.title}>
                <h2 className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                  {section.title}
                </h2>
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    className="block px-2 py-1"
                  />
                ))}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}