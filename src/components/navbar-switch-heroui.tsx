import { translate } from "@/locale/translations";
import { Switch } from "@heroui/react";
import { useEffect, useState, type SVGProps } from "react";
import type { JSX } from "react/jsx-runtime";

export const MoonIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SunIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <g fill="currentColor">
        <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
        <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
      </g>
    </svg>
  );
};

export function SwitchHeroUI() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleMode}
      className={`
        relative inline-flex items-center h-8 w-16 rounded-full
        transition-all duration-200 ease-in-out
        
        ${isDarkMode
          ? 'bg-green-500 hover:bg-green-700'
          : 'bg-violet-200 hover:bg-violet-200'
        }
      `}
      role="switch"
      aria-checked={isDarkMode}
      aria-label="Toggle dark mode"
    >
      {/* Track icons */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <MoonIcon
          className={`w-4 h-4 transition-opacity duration-200 ${isDarkMode ? 'text-black opacity-100' : 'text-gray-500 opacity-50'
            }`}
        />
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <SunIcon
          className={`w-4 h-4 transition-opacity duration-200 ${!isDarkMode ? 'text-yellow-600 opacity-100' : 'text-gray-400 opacity-50'
            }`}
        />
      </div>

      {/* Thumb */}
      <div
        className={`
          absolute top-1 w-6 h-6 bg-white rounded-full shadow-md
          transform transition-transform duration-200 ease-in-out
          ${isDarkMode ? 'translate-x-9' : 'translate-x-1'}
        `}
      />
    </button>
  );
}
