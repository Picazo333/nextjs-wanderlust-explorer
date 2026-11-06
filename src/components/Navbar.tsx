"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Explore" },
  { href: "/favorites", label: "Favorites" },
  { href: "/profile", label: "Profile" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarView({
  pathname,
  favoriteCount,
}: {
  pathname: string;
  favoriteCount: number;
}) {
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <Link href="/" className="wordmark">
          Wanderlust
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-list">
            {LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className="nav-link"
                  >
                    {link.label}
                    {link.href === "/favorites" && favoriteCount > 0 ? (
                      <span className="count">{favoriteCount}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function Navbar({ favoriteCount }: { favoriteCount: number }) {
  const pathname = usePathname();
  return <NavbarView pathname={pathname} favoriteCount={favoriteCount} />;
}

export function NavbarFallback({ favoriteCount }: { favoriteCount: number }) {
  return <NavbarView pathname="" favoriteCount={favoriteCount} />;
}
