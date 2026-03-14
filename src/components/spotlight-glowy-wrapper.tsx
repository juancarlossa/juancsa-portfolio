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
          x: event.clientX,
          y: event.clientY,
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
    let animationFrame: number;

    const update = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const gridItems = wrapper.querySelectorAll('.grid-item');

      gridItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        const distance = Math.hypot(
          mousePosition.x - itemCenterX,
          mousePosition.y - itemCenterY
        );

        const maxDistance = Math.hypot(
          rect.width / 2 + gridGap,
          rect.height / 2 + gridGap
        );

        const intensity = Math.max(0, 1 - distance / maxDistance);

        (item as HTMLElement).style.setProperty(
          '--glow-intensity',
          intensity.toString()
        );
      });
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, gridGap]);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 blur-[120px] opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(${glowColor}, 0.6) 0%,
            rgba(${glowColor}, 0) 70%
          )`,
        }}
      />

      {/* Glow principal suave */}
      <div
        className="pointer-events-none absolute inset-0 z-10 blur-2xl transition-opacity duration-200"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(${glowColor}, 0.4) 0%,
            rgba(${glowColor}, 0.2) 30%,
            rgba(${glowColor}, 0.1) 55%,
            rgba(${glowColor}, 0) 85%
          )`,
        }}
      />

      {/* Contenido */}
      <div className="relative z-20">
        {children}
      </div>
    </>
  );
};
