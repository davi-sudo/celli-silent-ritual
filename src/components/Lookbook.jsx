import { ArrowUpRight } from 'lucide-react';
import { LOOKBOOK_IMAGES } from '../data';
import { Carousel } from './Carousel';

export function Lookbook() {
  return (
    <section id="lookbook" className="py-24 md:py-36 bg-[#FAF8F5] overflow-hidden scroll-mt-16 md:scroll-mt-20">
      <div className="px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12 reveal-on-scroll">
        <div>
          <p className="eyebrow text-[#9B7C55]">Fragmentos do cotidiano</p>
          <h2 className="font-display text-6xl md:text-[7rem] leading-none mt-4 font-light">
            O nosso <em className="font-light italic text-[#7C6751]">olhar</em>
          </h2>
        </div>
        <a
          href="https://instagram.com/cellimaison"
          target="_blank"
          rel="noopener noreferrer"
          className="self-start md:self-auto min-h-12 flex items-center gap-2 border-b border-[#9B7C55] text-sm text-[#231D18] hover:text-[#9B7C55] transition-colors group"
        >
          <span>Acompanhe @cellimaison</span>
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <Carousel items={LOOKBOOK_IMAGES} alt="Editorial Célli Maison" />
    </section>
  );
}
