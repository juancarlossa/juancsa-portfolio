import { SwitchHeroUI } from "./navbar-switch-heroui.tsx";
import { LanguageButtons } from "@/components/navbar-language-buttons.tsx";
import { NavItems } from "@/components/navbar-items";
import { useEffect, useState } from "react";


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen && e.target instanceof Element && !e.target.closest('#mobile-sidebar') && !e.target.closest('#burger-btn')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="w-[95vw] lg:w-[50vw] mx-auto relative z-50">
        {/* NAV DESKTOP */}
        <nav className="hidden lg:grid grid-cols-3 justify-between pt-8 pb-5 items-center w-full">
          {/* Logo */}
          <div className="flex justify-start font-extralight">
            <div className="flex border border-violet-500 px-1 rounded-full size-10 justify-center items-center hover:bg-violet-500 hover:text-white transition-colors cursor-pointer">
              <p className="font-semibold">J</p>
            </div>
          </div>

          {/* Items centro */}
          <div className="flex justify-center items-center">
            <NavItems />
          </div>

          {/* Botones derecha */}
          <div className="flex gap-x-5 justify-end items-center">
            <LanguageButtons />
            <SwitchHeroUI />
          </div>
        </nav>

        {/* NAV MOBILE */}
        <nav className="lg:hidden pt-4 pb-3 w-full">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex font-extralight">
              <div className="flex border border-violet-500 px-1 rounded-full size-10 justify-center items-center hover:bg-violet-500 hover:text-white transition-colors cursor-pointer">
                <p className="font-semibold">J</p>
              </div>
            </div>

            {/* Botón burger */}
            <button
              id="burger-btn"
              onClick={toggleMobileMenu}
              aria-controls="mobile-sidebar"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors"
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              </span>

              {/* Animated Hamburger/X Icon */}
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out my-1 ${isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="flex border border-violet-500 px-1 rounded-full size-10 justify-center items-center">
                <p className="font-semibold">J</p>
              </div>
              <span className="text-xl font-semibold">Menu</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 px-6 py-8 space-y-8">

            {/* Navigation Items */}

            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <NavItems />
            </div>

            {/* Language and Theme */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Language
                </h3>
                <LanguageButtons />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Theme
                </h3>
                <SwitchHeroUI />
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {new Date().getFullYear()} juancsa-portfolio © All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};