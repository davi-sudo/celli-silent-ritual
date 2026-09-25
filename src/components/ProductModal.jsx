import { useState, useEffect, useRef } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../data';
import { Carousel } from './Carousel';

export function ProductModal({ product, onClose, onAdd }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [hoveredNoteIndex, setHoveredNoteIndex] = useState(-1);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  const noteLabels = ['Saída', 'Coração', 'Fundo'];
  const noteColors = ['#F2E8C9', '#EADCD5', '#E4D8C8'];

  return (
    <div className="fixed inset-0 z-50 flex items-end" role="presentation">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar visualização"
        className="absolute inset-0 bg-[#231D18]/60 backdrop-blur-sm w-full h-full cursor-default transition-opacity duration-300"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Olhar rápido: ${product.name}`}
        className="relative z-10 w-full max-h-[90vh] md:max-h-full bg-[#FAF8F5] shadow-2xl overflow-hidden animate-panel flex flex-col md:flex-row md:h-full md:max-w-[860px]"
      >
        <div className="sticky top-0 z-20 flex justify-between items-center h-16 px-4 md:px-6 border-b border-[#DFDCDA] bg-[#FAF8F5]/95 backdrop-blur-md">
          <span className="eyebrow text-[#9B7C55]">
            Olhar rápido / Célli Maison
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar olhar rápido"
            className="min-w-12 min-h-12 flex justify-center items-center text-[#231D18] hover:text-[#9B7C55] transition-colors cursor-pointer"
          >
            <X size={22} strokeWidth={1.3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 md:grid md:grid-cols-[0.95fr_1fr] md:gap-8 md:gap-10 flex flex-col">
          <div className="md:sticky md:top-20 md:self-start mb-4 md:mb-0">
            <div className="aspect-[0.85] bg-[#EAE6E0] overflow-hidden shadow-sm rounded-sm">
              <Carousel items={product.images} alt={product.name} />
            </div>
          </div>

          <div className="py-2 flex flex-col justify-between">
            <div>
              <span className="eyebrow text-[#9B7C55]">
                {product.mood} / {product.category}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[0.95] mt-4 font-light text-[#231D18]">
                {product.name}
              </h2>
              <p className="mt-4 text-lg md:text-xl font-mono text-[#6C5033]">
                R$ {formatPrice(product.price)}
              </p>

              <div className="w-full h-px bg-[#DFDCDA] my-6" />

              <p className="text-[#62574D] leading-[1.8] text-sm md:text-base font-light">
                {product.description}
              </p>

              <div className="mt-8">
                <h3 className="eyebrow text-[#9B7C55] mb-3">
                  {product.category === 'pijamas' ? 'Escolha seu tamanho' : 'Apresentação'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      aria-pressed={selectedSize === s}
                      className={`min-w-12 min-h-12 px-5 text-xs tracking-wider uppercase border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#231D18] text-white border-[#231D18] shadow-sm'
                          : 'border-[#C8BFB4] text-[#71665D] hover:border-[#231D18] hover:text-[#231D18]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#DFDCDA] pt-6 mt-8">
                <h3 className="eyebrow text-[#9B7C55] mb-2">Composição & detalhes</h3>
                <p className="text-sm leading-relaxed text-[#635A52] font-light">
                  {product.composition}
                </p>
              </div>

              {product.notes && (
                <div className="border-t border-[#DFDCDA] pt-6 mt-7">
                  <h3 className="font-display text-2xl mb-3 text-[#231D18]">
                    Pirâmide olfativa
                  </h3>
                  <div
                    className="relative overflow-hidden border border-[#DFDCDA] transition-colors duration-500 rounded-sm"
                    style={{
                      backgroundColor:
                        hoveredNoteIndex < 0 ? '#FAF8F5' : noteColors[hoveredNoteIndex],
                    }}
                  >
                    {product.notes.map((note, idx) => (
                      <button
                        key={note}
                        type="button"
                        onMouseEnter={() => setHoveredNoteIndex(idx)}
                        onMouseLeave={() => setHoveredNoteIndex(-1)}
                        onFocus={() => setHoveredNoteIndex(idx)}
                        onBlur={() => setHoveredNoteIndex(-1)}
                        className="w-full min-h-14 px-5 flex items-center justify-between border-b last:border-b-0 border-[#DFDCDA] text-left transition-colors hover:bg-white/40 cursor-default"
                      >
                        <span className="eyebrow text-[#7C6751]">
                          {noteLabels[idx]}
                        </span>
                        <span className="font-display text-xl text-[#231D18]">
                          {note}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs mt-3 text-[#71665D] font-light italic">
                    Explore cada camada da fragrância.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-8 mt-auto">
              <button
                type="button"
                onClick={() => onAdd(product, selectedSize)}
                className="min-h-14 w-full px-6 bg-[#231D18] text-white flex items-center justify-between text-xs uppercase tracking-[.18em] hover:bg-[#9B7C55] transition-all duration-300 shadow-md cursor-pointer group"
              >
                <span>Adicionar à sacola</span>
                <ShoppingBag
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </button>
              <p className="text-xs text-[#756B63] mt-4 text-center font-light">
                Atendimento pessoal pelo WhatsApp · embalagem pronta para presentear
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}