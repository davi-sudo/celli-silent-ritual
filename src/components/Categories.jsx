import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data';

export function Categories({ onSelect }) {
  const handleClick = (e, slug) => {
    e.preventDefault();
    onSelect(slug);
    const target = document.getElementById('colecoes');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="px-5 md:px-10 lg:px-16 pb-24 md:pb-40 bg-[#FAF8F5]" aria-labelledby="categories-heading">
      <div className="max-w-[1600px] mx-auto">
        {/* Header row */}
        <div className="flex justify-between items-end border-b border-[#DFDCDA] pb-6 mb-9 reveal-on-scroll">
          <div>
            <p className="eyebrow text-[#9B7C55]">Uma curadoria para sentir</p>
            <h2 id="categories-heading" className="font-display text-5xl md:text-7xl mt-3 font-normal">
              Os universos
            </h2>
          </div>
          <span className="hidden md:block eyebrow text-[#83766B]">01 — 03</span>
        </div>

        {/* 3 Columns grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <a
              key={cat.slug}
              href="#colecoes"
              onClick={(e) => handleClick(e, cat.slug)}
              data-cursor="Explorar"
              className={`group block cursor-pointer reveal-on-scroll ${
                idx === 1 ? 'md:pt-20' : ''
              }`}
            >
              <div className="relative aspect-[0.8] overflow-hidden bg-[#DFDCDA] shadow-sm">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Number Badge */}
                <span className="absolute top-5 left-5 text-white/90 text-xs font-mono tracking-widest drop-shadow">
                  {cat.number} / 03
                </span>

                {/* Round Arrow Button */}
                <span className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#231D18] shadow-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#231D18] group-hover:text-white">
                  <ArrowUpRight size={19} />
                </span>
              </div>

              {/* Text Info */}
              <div className="pt-5 flex justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl text-[#231D18] transition-colors duration-300 group-hover:text-[#9B7C55]">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[#71665D] mt-2 leading-relaxed font-light">
                    {cat.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
