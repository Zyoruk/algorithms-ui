'use client';

import NavLink from './NavLink';
import { navConfig } from '../navConfig';

export default function Index() {
  // flatten all sections into one list
  const links = navConfig.flatMap((section) => section.items);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="hidden lg:flex mx-auto max-w-5xl w-full"
    >
      <ul className="flex space-x-8">
        {links.map((item) => (
          <li key={item.href} >
            <NavLink href={item.href} label={item.label} className="text-gray-100 hover:text-gray-900"/>
          </li>
        ))}
      </ul>
    </nav>
  );
}