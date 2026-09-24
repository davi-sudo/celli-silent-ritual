import { useState, useEffect, useRef } from 'react';

export function CustomCursor() {
  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);

  // Position targets and current lerped position
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only run on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target.closest('[data-cursor]');
      setCursorLabel(target ? target.dataset.cursor || '' : '');
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth Lerp loop
    const loop = () => {
      const ease = 0.16; // buttery fluid damping
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[60] hidden lg:flex items-center justify-center rounded-full bg-[#C5A880] text-[#231D18] font-medium text-[10px] tracking-widest uppercase transition-all duration-300 ease-out will-change-transform shadow-lg ${
        cursorLabel
          ? 'w-20 h-20 opacity-95 scale-100 backdrop-blur-[2px]'
          : 'w-2.5 h-2.5 opacity-60 scale-75'
      } ${!isVisible ? 'opacity-0' : ''}`}
    >
      <span className="truncate px-2">{cursorLabel}</span>
    </div>
  );
}
