'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navConfig } from '../navConfig';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs: { label: string; href: string }[] = [
    { label: 'Home', href: '/' }
  ];

  if (segments[0] === 'algorithms' && segments[1]) {
    const sectionKey = segments[1];
    const section = navConfig.find(s => s.title.toLowerCase() === sectionKey);
    if (section) {
      crumbs.push({
        label: section.title,
        href: `/${segments[0]}/${sectionKey}`
      });
    }
    if (segments[2]) {
      const fullHref = `/${segments.join('/')}`;
      const item = section?.items.find(i => i.href === fullHref);
      if (item) {
        crumbs.push({ label: item.label, href: fullHref });
      }
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
      <ol className="flex items-center space-x-1">
        {crumbs.map((c, i) => {
          const isLeaf = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center">
              {i > 0 && <span className="px-1">/</span>}
              {isLeaf ? (
                <Link
                  href={c.href}
                  className="text-gray-400 font-semibold"
                  aria-current="page"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-gray-300">{c.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}