"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "アバウト", href: "/about" },
  { label: "ミュージック", href: "/music" },
  { label: "ショー", href: "/shows" },
  { label: "ブログ", href: "/blog" },
  { label: "コンタクト", href: "/connect" },
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
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-slate-200 bg-white/90 px-4 py-3 shadow-sm shadow-slate-200/60 backdrop-blur">
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white p-2 text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 lg:hidden"
          >
            <span className="sr-only">ナビゲーションを開閉</span>
            <span
              className={`block h-0.5 w-7 bg-slate-800 transition-transform duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`mt-1 block h-0.5 w-7 bg-slate-800 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`mt-1 block h-0.5 w-7 bg-slate-800 transition-transform duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
          <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-700 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full border px-4 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 ${
                  isActive(link.href)
                    ? "border-slate-400 bg-slate-100 text-slate-900"
                    : "border-transparent hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
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
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          role="dialog"
          aria-modal="true"
          onClick={closeMenu}
        >
          <nav
            id="mobile-nav"
            className="absolute left-6 right-6 top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-300/60"
            onClick={(event) => event.stopPropagation()}
          >
            <ul className="space-y-3 text-lg font-semibold text-slate-800">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between rounded-2xl border bg-white px-5 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 ${
                      isActive(link.href)
                        ? "border-slate-400 text-slate-950 shadow-sm"
                        : "border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-sm text-slate-400">-&gt;</span>
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
