'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({
  href,
  label,
  className = '',
  onClick
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const base = 'px-3 py-2 rounded-md text-sm font-medium';
  const activeStyles = 'bg-blue-100 text-blue-700';
  const inactiveStyles = 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';

  return (
    <Link
      href={href}
      className={`${base} ${isActive ? activeStyles : inactiveStyles} ${className}`}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick} // Optional: close mobile menu or perform other actions
    >
      {label}
    </Link>
  );
}
