
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';

import React, { useState, useRef, useMemo, useLayoutEffect, useCallback } from 'react';
import GooeyNav from '../GooeyNav';
import { gsap } from 'gsap';
import '../CardNav.css';
import { GoArrowUpRight } from 'react-icons/go';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  links?: NavLink[];
  textColor?: string;
  backgroundColor?: string;
}

interface LamphomeProps {
  title?: string;
  description?: string;
  logoSrc?: string;
  logoAlt?: string;
  ease?: string;
  navItems?: NavItem[];
  navSubItems?: NavItem[];
  children?: React.ReactNode;
  className?: string;
}

// ─── Sub-components (defined outside to avoid re-creation on each render) ─────

interface BurgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  isExpanded: boolean;
}

function BurgerMenu({ isOpen, onToggle, isExpanded }: BurgerMenuProps) {
  return (
    <div
      className={`hamburger-menu h-full  ${isOpen ? 'open' : ''}`}
      onClick={onToggle}
      role="button"
      aria-label={isExpanded ? 'Close menu' : 'Open menu'}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      style={{ color: '#fff' }}
    >
      <div className="flex flex-col gap-y-2 py-3 px-2 cursor-target">
        <div className="hamburger-line bg-gradient-to-r from-emerald-800 to-violet-600 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-violet-400" />
        <div className="hamburger-line bg-gradient-to-l from-emerald-800 to-violet-600 dark:bg-gradient-to-l dark:from-indigo-600 dark:to-violet-400" />
      </div>
    </div>
  );
}

interface NavbarSubitemsProps {
  navSubItems: NavItem[];
  isExpanded: boolean;
  cardRefs: React.MutableRefObject<HTMLDivElement[]>;
}

function NavbarSubitems({ navSubItems, isExpanded, cardRefs }: NavbarSubitemsProps) {
  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardRefs.current[i] = el;
  };

  return (
    <div className="card-nav-content mt-3" aria-hidden={!isExpanded}>
      {navSubItems.slice(0, 3).map((item, idx) => (
        <div
          key={`${item.label}-${idx}`}
          className={`${item.links?.length ? 'nav-card cursor-target flex justify-center items-start' : 'nav-card cursor-target flex justify-center items-center'}`}
          ref={setCardRef(idx)}
          style={{ backgroundColor: item.backgroundColor || '#0D0716', color: 'white' }}
        >
          <a href={item.href} className={`${item.links?.length ? 'text-2xl' : 'text-5xl font-base hover:underline transition duration-300 ease-in-out'} `}>
            {item.label}
          </a>

          {item.links?.length && (
            <div className="nav-card-links">
              {item.links?.map((lnk, i) => (
                <a
                  key={`${lnk.label}-${i}`}
                  className="nav-card-link"
                  href={lnk.href}
                  aria-label={lnk.ariaLabel}
                >
                  <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                  {lnk.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Lamphome({
  title,
  description,
  logoSrc,
  logoAlt,
  ease = 'power3.out',
  navItems = [],
  navSubItems = [],
  children,
  className = '',
}: LamphomeProps) {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const chainPulled = useMemo(() => isDarkMode, [isDarkMode]);
  const chainLength = useMemo(() => (isDarkMode ? 72 : 48), [isDarkMode]);
  const showGlow = true;
  const glowPosition = useMemo<'above' | 'below'>(
    () => (isDarkMode ? 'above' : 'below'),
    [isDarkMode],
  );

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dynamicGlowPosition, setDynamicGlowPosition] = useState<'above' | 'below'>('below');

  const titleRef = useRef<HTMLHeadingElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  // ── Lamp helpers ────────────────────────────────────────────────────────────

  const calculateGlowPosition = useCallback(
    (currentDragY: number): 'above' | 'below' => {
      if (!titleRef.current || !navBarRef.current) return 'below';
      const navBarRect = navBarRef.current.getBoundingClientRect();
      const titleRect = titleRef.current.getBoundingClientRect();
      const chainEndY = navBarRect.bottom + chainLength + currentDragY;
      const titleCenterY = titleRect.top + titleRect.height / 2;
      return chainEndY < titleCenterY ? 'above' : 'below';
    },
    [chainLength],
  );

  const handleDragStart = useCallback(() => setIsDragging(true), []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const finalDragY = Math.max(0, info.offset.y);
      if (finalDragY > 8) {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }
      setTimeout(() => setDragY(0), 100);
    },
    [theme, setTheme],
  );

  const currentGlowPosition = isDragging ? dynamicGlowPosition : glowPosition;

  // ── Burger / hamburger ──────────────────────────────────────────────────────

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    if (window.matchMedia('(max-width: 768px)').matches) {
      const contentEl = navEl.querySelector<HTMLElement>('.card-nav-content');
      if (contentEl) {
        // Temporarily make content measurable without affecting layout visually
        const prev = {
          visibility: contentEl.style.visibility,
          pointerEvents: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        };
        Object.assign(contentEl.style, {
          visibility: 'visible',
          pointerEvents: 'auto',
          position: 'static',
          height: 'auto',
        });
        // Force reflow
        void contentEl.offsetHeight;
        const contentHeight = contentEl.scrollHeight;
        Object.assign(contentEl.style, prev);
        return 60 + 16 + contentHeight; // topBar + padding + content
      }
    }
    return 260;
  }, []);

  // Build (or rebuild) the GSAP timeline. Uses `ease` prop for both tweens.
  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease, // 'power3.out' (GSAP recognises this string natively)
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      '-=0.1',
    );

    return tl;
  }, [ease, calculateHeight]);

  // Initialise timeline on mount / when dependencies change
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline]);

  // Rebuild timeline on resize to recalculate height
  useLayoutEffect(() => {
    const handleResize = () => {
      const current = tlRef.current;
      if (!current) return;

      current.kill();
      const newTl = createTimeline();
      if (!newTl) return;

      if (isExpanded) {
        newTl.progress(1);
      }
      tlRef.current = newTl;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded, createTimeline]);

  const toggleMenu = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  }, [isExpanded]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      className={`min-h-full w-full flex flex-col items-center justify-start pt-2 [@media(min-width:480px)]:pt-4 [@media(min-width:768px)]:pt-6 [@media(min-width:1024px)]:pt-8 transition-all duration-500 text-gray-900 dark:text-white ${className}`}
    >
      <motion.div
        ref={navBarRef}
        initial={{ width: '95%' }}
        animate={{ width: '95%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="shadow-[0_0_12px_4px_rgba(99,102,241,0.7)] shadow-neutral-700/50 relative flex flex-row items-center justify-between max-w-5xl backdrop-blur-xs border border-slate-200 dark:border-x-violet-800 dark:border-y-indigo-800 rounded-2xl transition-all duration-300"
      >
        {logoSrc && (
          <div className="shrink-0">
            <img
              src={logoSrc}
              alt={logoAlt || 'Logo'}
              width={28}
              height={28}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          </div>
        )}

        {/* ── Hamburger nav ── */}
        <nav
          ref={navRef}
          className={`dark:bg-neutral-900/50 bg-white/50 flex flex-col justify-between items-stretch w-full card-nav ${isExpanded ? 'open' : ''}`}

        >
          {/* Top bar — always visible */}
          <div className="pl-5 flex items-center justify-between h-[60px]">
            <BurgerMenu
              isOpen={isHamburgerOpen}
              isExpanded={isExpanded}
              onToggle={toggleMenu}
            />
            <div className="px-4 py-2 border-indigo-500 border-[2px] rounded-full">J</div>
            <GooeyNav items={navItems} />
          </div>

          {/* Expanded content — animated by GSAP */}
          <NavbarSubitems
            navSubItems={navSubItems}
            isExpanded={isExpanded}
            cardRefs={cardsRef}
          />
        </nav>

        {/* ── Lamp chain & toggle ── */}
        <div className="absolute right-3 top-full mt-2 flex flex-col items-center group z-10">
          {/* Chain */}
          <motion.div
            className="w-1 bg-gradient-to-b from-indigo-400 to-indigo-600 dark:from-violet-300/60 dark:to-indigo-500/80 rounded-full shadow-xl relative"
            animate={{ height: chainLength + dragY, scaleY: 1 }}
            transition={{
              duration: isDragging ? 0.05 : 0.6,
              ease: isDragging ? 'linear' : 'easeOut',
              type: isDragging ? 'tween' : 'spring',
              stiffness: isDragging ? undefined : 200,
              damping: isDragging ? undefined : 20,
            }}
            style={{ height: `${chainLength + dragY}px`, transformOrigin: 'top center' }}
          >
            {dragY > 4 && (
              <div className="absolute inset-0 flex flex-col justify-evenly">
                {Array.from({ length: Math.floor((chainLength + dragY) / 8) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-0.5 bg-indigo-500 dark:bg-indigo-400 rounded-full opacity-40"
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Pull handle */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 12 }}
            dragElastic={0}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
              const newDragY = Math.max(0, info.offset.y);
              setDragY(newDragY);
              if (newDragY > 4) {
                setDynamicGlowPosition(calculateGlowPosition(newDragY));
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileDrag={{
              scale: 1.12,
              boxShadow: `0 ${6 + dragY * 0.3}px ${14 + dragY * 0.3}px rgba(0,0,0,0.3)`,
            }}
            className="w-6 h-6 bg-linear-to-br from-indigo-400 to-indigo-600
              dark:from-indigo-300 dark:to-indigo-500
              rounded-full border-2 border-indigo-900
              shadow-[0_0_12px_4px_rgba(99,102,241,0.7)]
              cursor-grab active:cursor-grabbing"
            animate={{ rotateZ: chainPulled ? 360 : 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ position: 'relative', top: -20, y: 0 }}
          >
            <div className="w-full h-full rounded-full bg-linear-to-br from-indigo-300 to-transparent opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center bg-indigo-500/90  rounded-full backdrop-blur-xs">
              <Moon className="w-4 h-4 text-indigo-50" />
            </div>
            {isDarkMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-indigo-300/90 dark:bg-indigo-700/90 border border-indigo-900 rounded-full backdrop-blur-xs"
              >
                <Sun className="w-4 h-4 text-indigo-200" />
              </motion.div>
            )}

            {/* "Pull to toggle" hint */}
            {isDragging && !chainPulled && (
              <motion.div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap pointer-events-none bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded-full"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: [0, 1, 1, 0], y: [0, -2, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              >
                Pull to toggle theme!
              </motion.div>
            )}

            {/* Drag feedback 
            {isDragging && dragY > 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: dragY > 8 ? 1 : 0.7,
                  scale: dragY > 8 ? 1.1 : 1,
                }}
                className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs text-white px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none font-medium transition-all duration-200 ${currentGlowPosition === 'above' ? 'bg-purple-600' : 'bg-amber-600'
                  } ${isDarkMode ? 'rotate-180' : ''}`}
              >
                {dragY > 8
                  ? `🌟 Release for ${currentGlowPosition === 'above' ? 'Dark' : 'Light'} Mode!`
                  : `Pull ${Math.round(8 - dragY)}px more`}
              </motion.div>
            )}
*/}
            {/* Release ripple */}
            {!isDragging && dragY > 0 && (
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-300 opacity-30"
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Dark-mode glow bar ── */}
      {isDarkMode && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: showGlow ? '80%' : 0, opacity: showGlow ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-3xl mt-6 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          style={{
            boxShadow: showGlow
              ? '0 0 20px #A855F7, 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)'
              : 'none',
          }}
        >
          {/* Tight cone — bright just below the line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showGlow ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-2/3 h-40 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(168,85,247,0.28) 0%, rgba(168,85,247,0.08) 55%, transparent 100%)',
              filter: 'blur(40px)',
            }}
          />
          {/* Wide ambient spread — diffuse glow further down */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showGlow ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-full h-52 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(139,92,246,0.12) 50%, rgba(109,40,217,0.04) 70%, transparent 100%)',
              filter: 'blur(80px)',
            }}
          />
        </motion.div>
      )}


      {/* ── Light-mode glow bar ── */}
      {!isDarkMode && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: showGlow ? '80%' : 0, opacity: showGlow ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-3xl mt-6 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
          style={{
            boxShadow: showGlow
              ? '0 0 20px #818CF8, 0 0 40px rgba(129,140,248,0.6), 0 0 60px rgba(129,140,248,0.4)'
              : 'none',
          }}
        >
          {/* Tight cone — bright just below the line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showGlow ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-2/3 h-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(129,140,248,0.28) 0%, rgba(129,140,248,0.08) 55%, transparent 100%)',
              filter: 'blur(40px)',
            }}
          />
          {/* Wide ambient spread — diffuse glow further down */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showGlow ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-full h-52 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(147,197,253,0.12) 50%, rgba(99,102,241,0.04) 70%, transparent 100%)',
              filter: 'blur(80px)',
            }}
          />
        </motion.div>
      )}
      {/* ── Title ── */}
      {title && (
        <motion.h1
          ref={titleRef}
          className="mt-6 [@media(min-width:480px)]:mt-8 text-xl [@media(min-width:480px)]:text-2xl [@media(min-width:640px)]:text-3xl [@media(min-width:768px)]:text-4xl [@media(min-width:1024px)]:text-5xl [@media(min-width:1280px)]:text-6xl font-bold bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent text-center px-4 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {title}
        </motion.h1>
      )}

      {/* ── Description ── */}
      {description && (
        <motion.p
          className="mt-4 [@media(min-width:480px)]:mt-6 text-center text-xs [@media(min-width:480px)]:text-sm [@media(min-width:640px)]:text-base [@media(min-width:768px)]:text-lg text-gray-600 dark:text-gray-300 max-w-xs [@media(min-width:480px)]:max-w-md [@media(min-width:768px)]:max-w-2xl px-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {description}
        </motion.p>
      )}

      {/* ── Children ── */}
      {children && (
        <motion.div
          className="mt-6 [@media(min-width:480px)]:mt-8 w-full flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
