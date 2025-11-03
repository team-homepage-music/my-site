"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Music", href: "/music" },
  { label: "Shows", href: "/shows" },
  { label: "Connect", href: "/connect" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-6 pb-4 pt-6 sm:px-10 lg:px-12">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/15 bg-black/40 px-4 py-3 backdrop-blur">
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 p-2 text-white transition hover:border-white/50 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
          >
            <span className="sr-only">Toggle navigation</span>
            <span
              className={`block h-0.5 w-7 bg-white transition-transform duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`mt-1 block h-0.5 w-7 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`mt-1 block h-0.5 w-7 bg-white transition-transform duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
          <nav className="hidden items-center gap-4 text-sm font-semibold text-white/80 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full border px-4 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isActive(link.href)
                    ? "border-white/60 bg-white/20 text-white"
                    : "border-transparent hover:border-white/30 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          role="dialog"
          aria-modal="true"
          onClick={closeMenu}
        >
          <nav
            id="mobile-nav"
            className="absolute left-6 right-6 top-28 rounded-3xl border border-white/20 bg-zinc-950/95 p-6 shadow-2xl shadow-black/60"
            onClick={(event) => event.stopPropagation()}
          >
            <ul className="space-y-3 text-lg font-semibold text-white/90">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between rounded-2xl border bg-white/5 px-5 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isActive(link.href)
                        ? "border-white/40 text-white"
                        : "border-white/15 text-white/80 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-sm text-white/60">-&gt;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
