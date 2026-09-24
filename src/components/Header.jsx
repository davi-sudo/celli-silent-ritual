import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

export function Header({ count, onCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    ['A maison', '#maison'],
    ['Coleções', '#colecoes'],
    ['O ritual', '#ritual'],
    ['Lookbook', '#lookbook'],
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-40 text-white transition-all duration-500">
      <div
        className={`mx-5 md:mx-10 lg:mx-16 flex items-center justify-between h-20 md:h-24 border-b transition-colors duration-500 ${
          isScrolled ? 'border-white/20' : 'border-white/30'
        }`}
      >
        {/* Mobile menu trigger */}
        <button
          className="md:hidden min-w-12 min-h-12 flex items-center justify-start text-white hover:text-[#E7CDA8] transition-colors"
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>

        {/* Brand Logo */}
        <a
          href="#inicio"
          aria-label="Célli Maison — início"
          className="font-display text-2xl md:text-3xl tracking-[.18em] uppercase whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Célli Maison
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 lg:gap-11"
        >
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[11px] tracking-[.2em] uppercase hover:text-[#E7CDA8] transition-colors relative py-1 group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#E7CDA8] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Cart Trigger */}
        <button
          onClick={onCart}
          aria-label={`Abrir sacola, ${count} itens`}
          className="min-w-12 min-h-12 flex items-center justify-end gap-2 text-xs tracking-widest hover:text-[#E7CDA8] transition-colors group cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag
              size={19}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#9B7C55] animate-ping" />
            )}
          </div>
          <span className="font-light tracking-wider font-mono">
            {count.toString().padStart(2, '0')}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav
          aria-label="Menu móvel"
          className="md:hidden bg-[#231D18]/95 backdrop-blur-md px-7 py-7 flex flex-col gap-1 shadow-2xl animate-fade-in border-b border-white/10"
        >
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-12 items-center justify-between text-sm uppercase tracking-[.15em] border-b border-white/10 text-white/90 hover:text-white"
            >
              <span>{label}</span>
              <ArrowUpRight size={17} className="text-[#9B7C55]" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
