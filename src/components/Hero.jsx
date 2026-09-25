import { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../data';

export function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const animFrame = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      targetScroll.current = Math.min(
        window.scrollY / Math.max(window.innerHeight, 1),
        1
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scroll interpolation (Lerp) for fluid hero shrink effect
    const smoothLoop = () => {
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.12;
      setScrollProgress(currentScroll.current);
      animFrame.current = requestAnimationFrame(smoothLoop);
    };
    animFrame.current = requestAnimationFrame(smoothLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <section id="inicio" className="relative bg-[#FAF8F5] pb-10 md:pb-20 overflow-hidden">
      {/* Container with dynamic scroll scale and rounded bottom corners */}
      <div
        className="h-[94svh] min-h-0 sm:min-h-[640px] relative overflow-hidden bg-[#231D18] transition-transform duration-75 will-change-transform"
        style={{
          transform: `scale(${1 - scrollProgress * 0.055})`,
          transformOrigin: 'center top',
          borderRadius: `0 0 ${scrollProgress * 26}px ${scrollProgress * 26}px`,
        }}
      >
        {/* Authentic Célli Maison signature hero image (Model in champagne silk robe on sofa) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={IMAGES.heroModel}
            alt="Robe de cetim e seda da Célli Maison em composição editorial"
            className="w-full h-full object-cover object-[center_12%] md:object-[center_10%] lg:object-[center_12%] transition-transform duration-1000 ease-out hover:scale-105 min-w-full"
            style={{
              transform: `scale(${1 + scrollProgress * 0.02})`,
            }}
          />
        </div>

        {/* Sophisticated dual-layer vignette and atmospheric lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#17100b]/75 via-[#17100b]/30 to-[#17100b]/75" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#17100b]/70 via-[#17100b]/20 to-transparent" />

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-6 pt-10 md:pt-20 text-white z-10">
          {/* Eyebrow */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
            <p className="eyebrow text-[#EAD9C2] tracking-[.25em] drop-shadow-sm">
              Santa Bárbara d'Oeste · Desde 2019
            </p>
          </div>

          {/* Main Title */}
          <h1
            className="font-display text-[clamp(3.8rem,9vw,10.2rem)] leading-[.85] tracking-[-.045em] font-light mt-7 max-w-6xl drop-shadow-md animate-fade-in opacity-0"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            O luxo de vestir{' '}
            <br />
            <em className="font-light italic tracking-tight font-display text-[#FAF8F5]">
              o silêncio
            </em>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-8 md:mt-12 text-sm md:text-base leading-relaxed font-light tracking-wide max-w-md text-[#EAE5DD] animate-fade-in opacity-0"
            style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
          >
            Pijamas premium, velas artesanais e perfumaria italiana
          </p>

          {/* CTA Button */}
          <div
            className="animate-fade-in opacity-0 mt-8 md:mt-10"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            <a
              href="#colecoes"
              data-cursor="Explorar"
              className="group relative border border-white/70 px-9 min-h-12 inline-flex items-center justify-center text-[11px] tracking-[.2em] uppercase overflow-hidden transition-all duration-500 hover:border-white hover:shadow-2xl"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#231D18] flex items-center gap-2">
                Explorar a maison
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#maison"
          aria-label="Descer para conhecer a maison"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/90 hover:text-white flex flex-col items-center gap-2 text-[10px] tracking-[.25em] uppercase transition-all duration-300 group z-10"
        >
          <span className="group-hover:tracking-[.3em] transition-all">Descubra</span>
          <ArrowDown
            size={16}
            className="animate-bounce text-[#EAD9C2] transition-transform group-hover:translate-y-1"
          />
        </a>

        {/* Desktop Vertical Motto Badge */}
        <span className="hidden md:block absolute bottom-12 left-16 text-white/70 text-[10px] uppercase tracking-[.25em] rotate-[-90deg] origin-left pointer-events-none">
          O cotidiano como ritual
        </span>

        {/* Desktop Corner Accent */}
        <span className="hidden md:block absolute bottom-12 right-16 text-white/50 text-[10px] uppercase tracking-[.25em] pointer-events-none">
          Acervo Exclusivo 2026
        </span>
      </div>
    </section>
  );
}
