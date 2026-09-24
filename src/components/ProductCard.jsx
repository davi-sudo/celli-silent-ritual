import { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '../data';

export function ProductCard({ product, onOpen, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
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
      className={`group text-left w-full block cursor-pointer reveal-on-scroll ${
        index % 3 === 1 ? 'md:pt-20' : ''
      }`}
      aria-label={`Olhar rápido: ${product.name}`}
    >
      {/* Image container with 3D perspective */}
      <div
        className={`relative overflow-hidden bg-[#EAE6E0] shadow-sm ${
          index % 4 === 0 ? 'aspect-[0.78]' : 'aspect-[0.86]'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Secondary Image cross-fade */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`Outro ângulo de ${product.name}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
          />
        )}

        {/* Featured Tag */}
        {product.featured && (
          <span className="absolute left-4 top-4 bg-[#FAF8F5]/90 backdrop-blur-sm px-3 py-2 text-[10px] uppercase tracking-[.16em] font-medium text-[#231D18] shadow-sm">
            Escolha da maison
          </span>
        )}

        {/* Floating Quick Action Button */}
        <span className="absolute right-4 bottom-4 bg-[#FAF8F5] text-[#231D18] w-11 h-11 flex items-center justify-center rounded-full translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out shadow-md group-hover:bg-[#231D18] group-hover:text-white">
          <ArrowUpRight size={18} />
        </span>
      </div>

      {/* Product metadata */}
      <div className="pt-4 flex justify-between items-start gap-3">
        <div>
          <span className="eyebrow text-[#9B7C55] font-medium">{product.mood}</span>
          <h3 className="font-display text-[1.7rem] md:text-[2rem] leading-tight mt-1 text-[#231D18] transition-colors duration-300 group-hover:text-[#9B7C55]">
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
