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
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500">
      <div
        className={`mx-4 md:mx-6 lg:mx-8 flex items-center justify-between h-16 md:h-20 border-b transition-colors duration-500 bg-[#FAF8F5]/95 backdrop-blur-md ${
          isScrolled ? 'border-[#DFDCDA] shadow-sm' : 'border-transparent'
        }`}
      >
        <button
          className="md:hidden min-w-12 min-h-12 flex items-center justify-start text-[#231D18] hover:text-[#9B7C55] transition-colors"
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>

        <a
          href="#inicio"
          aria-label="Célli Maison — início"
          className="font-display text-xl md:text-2xl tracking-[.18em] uppercase whitespace-nowrap hover:opacity-90 transition-opacity text-[#231D18]"
        >
          Célli Maison
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 lg:gap-10"
        >
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[11px] tracking-[.2em] uppercase hover:text-[#9B7C55] transition-colors relative py-1 group text-[#231D18]"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#9B7C55] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          onClick={onCart}
          aria-label={`Abrir sacola, ${count} itens`}
          className="min-w-12 min-h-12 flex items-center justify-end gap-2 text-xs tracking-widest hover:text-[#9B7C55] transition-colors group cursor-pointer text-[#231D18]"
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

      {mobileMenuOpen && (
        <nav
          aria-label="Menu móvel"
          className="md:hidden bg-[#FAF8F5] border-b border-[#DFDCDA] px-6 py-6 flex flex-col gap-1 shadow-xl animate-fade-in"
        >
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-12 items-center justify-between text-sm uppercase tracking-[.15em] border-b border-[#DFDCDA] text-[#231D18]/90 hover:text-[#231D18]"
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