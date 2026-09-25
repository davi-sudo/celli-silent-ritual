import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '../data';

export function ProductCard({ product, onOpen, isOffset = false }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(product)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="Descobrir"
      className={`group text-left w-full block cursor-pointer transition-all duration-500 opacity-100 ${
        isOffset ? 'lg:pt-16' : ''
      }`}
      aria-label={`Olhar rápido: ${product.name}`}
    >
      <div
        className="relative overflow-hidden bg-[#E8E3DC] shadow-sm aspect-[0.82] w-full rounded-sm"
        style={{
          transform: isTouchDevice ? 'none' : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#E0D9D0] animate-pulse" />
        )}

        <img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {product.images[1] && !isTouchDevice && (
          <img
            src={product.images[1]}
            alt={`Outro ângulo de ${product.name}`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
          />
        )}

        {product.featured && (
          <span className="absolute left-3 top-3 bg-[#FAF8F5]/95 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[.18em] font-medium text-[#231D18] shadow-sm rounded-xs">
            Escolha da maison
          </span>
        )}

        <span className="absolute right-3 bottom-3 bg-[#FAF8F5] text-[#231D18] w-10 h-10 flex items-center justify-center rounded-full translate-y-16 group-hover:translate-y-0 transition-transform duration-300 ease-out shadow-md group-hover:bg-[#231D18] group-hover:text-white">
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div className="pt-3 flex justify-between items-start gap-3">
        <div className="min-w-0 flex-1">
          <span className="eyebrow text-[#9B7C55] font-medium block truncate">
            {product.mood}
          </span>
          <h3 className="font-display text-[1.5rem] md:text-[1.75rem] leading-tight mt-1 text-[#231D18] transition-colors duration-300 group-hover:text-[#9B7C55] truncate">
            {product.name}
          </h3>
        </div>
        <span className="text-xs whitespace-nowrap pt-1 font-mono tracking-wider text-[#6C6259]">
          R$ {formatPrice(product.price)}
        </span>
      </div>
    </button>
  );
}