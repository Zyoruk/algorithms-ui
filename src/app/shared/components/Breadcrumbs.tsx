'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navConfig } from '../navConfig';

export default function Breadcrumbs() {
  const pathname = usePathname();               // e.g. "/algorithms/sorting/quick-sort"
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; href: string }[] = [
    { label: 'Home', href: '/' }
  ];

  // if we're on /algorithms/{section}/*
  if (segments[0] === 'algorithms' && segments[1]) {
    const sectionKey = segments[1];             // "sorting" or "searching"
    const section = navConfig.find(s =>
      s.title.toLowerCase() === sectionKey
    );
    if (section) {
      const sectionHref = `/${segments[0]}/${sectionKey}`;
      crumbs.push({ label: section.title, href: sectionHref });
    }

    // if there's a third segment, it's the specific algorithm
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
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center">
            {i > 0 && <span className="px-1">/</span>}
            <Link
              href={c.href}
              className={i === crumbs.length - 1
                ? 'text-gray-900'
                : 'hover:underline'}
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}