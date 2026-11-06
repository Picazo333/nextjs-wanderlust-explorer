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
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight text-ink">
          Wanderlust
        </Link>
        <nav aria-label="Primary" className="flex gap-1 overflow-x-auto">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : "text-ink hover:bg-sand"
                }`}
              >
                {link.label}
                {link.href === "/favorites" && favoriteCount > 0 ? (
                  <span
                    className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs ${
                      active ? "bg-paper text-ink" : "bg-terracotta text-paper"
                    }`}
                  >
                    {favoriteCount}
                  </span>
                ) : null}
              </Link>
            );
          })}
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
