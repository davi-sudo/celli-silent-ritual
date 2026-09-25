import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data';

export function ConciergeButton() {
  return (
    <a
      href={getWhatsAppLink('Olá, Célli Maison! Gostaria de conversar pelo WhatsApp.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Célli Maison pelo WhatsApp"
        className="fixed z-40 bottom-5 right-5 md:bottom-8 md:right-8 mb-[env(safe-area-inset-bottom)] flex items-center gap-3 min-h-14 bg-[#231D18] text-white rounded-full pl-5 pr-4 shadow-xl concierge-pulse hover:bg-[#9B7C55] hover:scale-105 transition-all duration-300 group cursor-pointer"
    >
      <span className="hidden sm:block text-[11px] uppercase tracking-[.18em] font-medium">
        WhatsApp
      </span>
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:scale-110">
        <MessageCircle size={20} strokeWidth={1.5} />
      </div>
    </a>
  );
}
