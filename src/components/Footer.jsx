import { ArrowUpRight } from 'lucide-react';
import { getWhatsAppLink } from '../data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#EAE5DD] px-5 md:px-10 lg:px-16 pt-20 md:pt-32 pb-8 text-[#231D18]">
      <div className="max-w-[1600px] mx-auto">
        {/* Main Grid */}
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-14 border-b border-[#C9BFB3] pb-20 reveal-on-scroll">
          {/* Left Column */}
          <div>
            <p className="eyebrow text-[#9B7C55]">Uma conversa, um começo</p>
            <h2 className="font-display text-[clamp(2.1rem,10vw,3.5rem)] md:text-[clamp(3.5rem,7vw,7.8rem)] leading-[.94] mt-6 max-w-3xl font-light">
              Vamos criar seu
              <br />
              <em className="font-light italic text-[#7C6751]">próximo ritual?</em>
            </h2>
            <a
              href={getWhatsAppLink('Olá, Célli Maison! Gostaria de conversar pelo WhatsApp.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 mt-10 border-b border-[#231D18] pb-3 text-sm hover:text-[#9B7C55] hover:border-[#9B7C55] transition-all min-h-12 group"
            >
              <span>Fale conosco no WhatsApp</span>
              <ArrowUpRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          {/* Right Column Links */}
          <div className="md:pt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="eyebrow text-[#9B7C55] mb-5">Explore</h3>
              <nav className="flex flex-col items-start gap-4 text-sm font-light">
                <a href="#maison" className="hover:text-[#9B7C55] transition-colors">
                  A maison
                </a>
                <a href="#colecoes" className="hover:text-[#9B7C55] transition-colors">
                  Coleções
                </a>
                <a href="#ritual" className="hover:text-[#9B7C55] transition-colors">
                  O ritual
                </a>
                <a href="#lookbook" className="hover:text-[#9B7C55] transition-colors">
                  Lookbook
                </a>
              </nav>
            </div>

            <div>
              <h3 className="eyebrow text-[#9B7C55] mb-5">Encontre-nos</h3>
              <div className="flex flex-col items-start gap-4 text-sm font-light text-[#4A4036]">
                <a
                  href="https://wa.me/5519994727551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#231D18] transition-colors"
                >
                  +55 (19) 99472-7551
                </a>
                <a
                  href="https://instagram.com/cellimaison"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#231D18] transition-colors"
                >
                  @cellimaison ↗
                </a>
                <span>Seg a sáb · 9h às 19h</span>
                <span>Santa Bárbara d'Oeste · SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and back-to-top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-xs text-[#665B51] font-light">
          <span>© {currentYear} Célli Maison · Desde 2019</span>
          <span className="italic font-display text-sm text-[#7A6E63]">
            O luxo de vestir o silêncio.
          </span>
          <a
            href="#inicio"
            className="hover:text-[#231D18] underline underline-offset-4 transition-colors"
          >
            Voltar ao início ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
