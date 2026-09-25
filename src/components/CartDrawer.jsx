import { useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2, ArrowUpRight } from 'lucide-react';
import { GIFT_THRESHOLD, formatPrice, getWhatsAppLink } from '../data';

export function CartDrawer({ items, onClose, onQuantity }) {
  const closeButtonRef = useRef(null);
  const total = items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const totalCount = items.reduce((acc, it) => acc + it.quantity, 0);

  const formattedWhatsAppMsg = `Olá, Célli Maison! Gostaria de solicitar atendimento para a seguinte seleção:\n\n${items
    .map(
      ({ product, size, quantity }) =>
        `• ${quantity}x ${product.name} (${size}) — R$ ${formatPrice(product.price * quantity)}`
    )
    .join('\n')}\n\nTotal estimado: R$ ${formatPrice(total)}\n\nPodemos combinar a entrega?`;

  useEffect(() => {
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
  }, [onClose]);

  const giftPercentage = Math.min(100, Math.round((total / GIFT_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-end" role="presentation">
      <button
        type="button"
        className="absolute inset-0 w-full h-full bg-[#231D18]/60 backdrop-blur-sm cursor-default transition-opacity"
        aria-label="Fechar sacola"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sua sacola"
        className="relative z-10 w-full max-h-[90vh] md:max-h-full bg-[#FAF8F5] flex flex-col shadow-2xl animate-panel md:max-w-[500px]"
      >
        <header className="flex items-center justify-between px-4 md:px-6 h-16 border-b border-[#DFDCDA] sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md z-10">
          <div>
            <p className="eyebrow text-[#9B7C55]">Sua seleção</p>
            <h2 className="font-display text-2xl md:text-3xl font-light text-[#231D18]">
              A sacola <span className="text-lg md:text-xl font-mono text-[#71665D]">({totalCount})</span>
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar sacola"
            className="min-w-12 min-h-12 flex items-center justify-center text-[#231D18] hover:text-[#9B7C55] transition-colors cursor-pointer"
          >
            <X size={22} strokeWidth={1.3} />
          </button>
        </header>

        <div className="px-4 md:px-6 py-4 border-b border-[#DFDCDA] bg-white/40 sticky top-16 z-10 bg-[#FAF8F5]/95 backdrop-blur-md">
          <div className="flex justify-between text-xs gap-3">
            <span className="text-[#231D18] font-medium">
              {total >= GIFT_THRESHOLD
                ? 'Seu presente cortesia está garantido.'
                : `Faltam R$ ${formatPrice(GIFT_THRESHOLD - total)} para o presente cortesia`}
            </span>
            <span className="font-mono text-[#9B7C55] font-semibold">{giftPercentage}%</span>
          </div>
          <div className="h-[3px] bg-[#DFDCDA] mt-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9B7C55] transition-all duration-700 ease-out"
              style={{ width: `${giftPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-[#766C63] mt-3 font-light">
            Embalagem para presente exclusiva em toda compra.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-20">
          {items.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center py-16">
              <h3 className="font-display text-3xl md:text-4xl text-[#231D18] font-light">
                Seu ritual começa aqui.
              </h3>
              <p className="text-sm text-[#6C6259] mt-3 font-light">
                Sua sacola ainda está vazia.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 min-h-12 px-6 border-b border-[#231D18] text-xs uppercase tracking-widest hover:text-[#9B7C55] hover:border-[#9B7C55] transition-colors cursor-pointer"
              >
                Explorar a coleção
              </button>
            </div>
          ) : (
            items.map(({ product, size, quantity }) => (
              <div
                key={`${product.id}:${size}`}
                className="py-4 border-b border-[#DFDCDA] flex gap-3 animate-fade-in"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-24 md:w-24 md:h-28 object-cover bg-[#DFDCDA] shrink-0 shadow-sm rounded-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="eyebrow text-[#9B7C55]">{product.mood}</p>
                  <h3 className="font-display text-xl md:text-2xl leading-tight mt-1 text-[#231D18] truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#756B63] mt-1 font-mono uppercase">
                    Tam/Formato: {size}
                  </p>

                  <div className="flex justify-between items-end gap-2 mt-3">
                    <div className="flex items-center border border-[#DFDCDA] bg-white rounded-sm overflow-hidden">
                      <button
                        type="button"
                        onClick={() => onQuantity(product.id, size, quantity - 1)}
                        aria-label={`Diminuir quantidade de ${product.name}`}
                        className="w-10 h-11 flex justify-center items-center text-[#231D18] hover:bg-[#F2EFEA] transition-colors cursor-pointer"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-10 text-center text-sm font-mono border-x border-[#DFDCDA]">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => onQuantity(product.id, size, quantity + 1)}
                        aria-label={`Aumentar quantidade de ${product.name}`}
                        className="w-10 h-11 flex justify-center items-center text-[#231D18] hover:bg-[#F2EFEA] transition-colors cursor-pointer"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span className="text-sm whitespace-nowrap font-mono font-medium text-[#231D18]">
                      R$ {formatPrice(product.price * quantity)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onQuantity(product.id, size, 0)}
                    className="mt-2 text-xs text-[#71665D] hover:text-red-700 underline underline-offset-4 inline-flex gap-1.5 items-center transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-4 md:px-6 py-4 border-t border-[#DFDCDA] bg-[#FAF8F5] shadow-lg sticky bottom-0 z-10">
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-display text-xl md:text-2xl font-light text-[#231D18]">
                Total estimado
              </span>
              <span className="font-mono text-lg md:text-xl font-semibold text-[#6C5033]">
                R$ {formatPrice(total)}
              </span>
            </div>
            <p className="text-xs text-[#766C63] mb-4 font-light">
              Entrega e pagamento combinados diretamente com a nossa equipe.
            </p>
            <a
              href={getWhatsAppLink(formattedWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enviar a seleção do pedido pelo WhatsApp"
              className="min-h-14 bg-[#9B7C55] text-white flex items-center justify-between px-6 text-xs tracking-[.15em] uppercase hover:bg-[#231D18] transition-all duration-300 shadow-md cursor-pointer group"
            >
              <span>Finalizar pelo WhatsApp</span>
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}