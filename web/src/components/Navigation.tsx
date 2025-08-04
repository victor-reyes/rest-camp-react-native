'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { brand, navigation } from '@/content';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  console.log('Navigation rendered with pathname:', pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-md border-b border-border/20 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
              <path
                fill="#fff"
                d="M1.5.04h21c.79 0 1.46.67 1.46 1.47v20.98a1.5 1.5 0 0 1-1.47 1.47H1.51A1.49 1.49 0 0 1 .03 22.5v-21A1.5 1.5 0 0 1 1.5.04"
              ></path>
              <path
                fill="#155196"
                d="M1.5.8h21a.71.71 0 0 1 .7.7v21a.71.71 0 0 1-.7.7h-21a.75.75 0 0 1-.7-.7v-21a.71.71 0 0 1 .7-.7"
              ></path>
              <path fill="#fff" d="M4.51 19.48V4.52H19.5v14.97z"></path>
              <path
                fill="#231f20"
                d="M6.93 15.53h-1.5v-1.07h4.23v1.06H8.32v1.51h4.63v-3.72H9.23l2.22-2.22h-.95l2.21-2.22h-.95l1.87-3.2 1.82 3.2h-1l2.23 2.22h-.95l2.21 2.22h-3.76v3.72h3.68v1.15H5.43v-1.15h1.5z"
              ></path>
            </svg>
            <span className="font-bold text-lg text-foreground">
              {brand.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  pathname === link.href
                    ? 'text-foreground border-b-2 border-foreground pb-1'
                    : 'text-foreground/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-foreground hover:text-foreground/80 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-accent/10 border-t border-border/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col gap-4">
              {navigation.map((link, index) => (
                <>
                  {index != 0 && <div className="border-b border-white/30" />}
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors hover:text-foreground ${
                      pathname === link.href
                        ? 'text-foreground font-semibold'
                        : 'text-foreground/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
