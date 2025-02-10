import React, { useState, useEffect, useRef, type ReactNode } from 'react';

interface GlowySpotlightWrapperProps {
  children: ReactNode;
  className?: string;
  gridGap?: number;
  glowColor?: string;
  glowSize?: number;
}

export const GlowySpotlightWrapper: React.FC<GlowySpotlightWrapperProps> = ({
  children,
  className = '',
  gridGap = 16,
  glowColor = '100, 200, 255',
  glowSize = 100
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const gridItems = wrapper.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const distance = Math.sqrt(
        Math.pow(mousePosition.x - itemCenter.x, 2) +
        Math.pow(mousePosition.y - itemCenter.y, 2)
      );

      const maxDistance = Math.sqrt(
        Math.pow(rect.width / 2 + gridGap, 2) +
        Math.pow(rect.height / 2 + gridGap, 2)
      );

      const intensity = Math.max(0, 1 - distance / maxDistance);

      (item as HTMLElement).style.setProperty('--glow-intensity', intensity.toString());
    });
  }, [mousePosition, gridGap]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={wrapperRef}
        className="relative z-10"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, 0.1) 0%, rgba(${glowColor}, 0) 50%)`,
          '--glow-color': glowColor,
        } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, 0.1) 0%, rgba(${glowColor}, 0) 15%)`,
        }}
      />
    </div>
  );
};
