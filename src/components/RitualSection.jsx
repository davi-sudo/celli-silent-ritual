import { IMAGES, PILLARS } from '../data';

export function RitualSection() {
  return (
    <section id="ritual" className="bg-[#231D18] text-[#FAF8F5] overflow-hidden scroll-mt-4">
      <div className="grid lg:grid-cols-2">
        {/* Left Column Image with subtle slow zoom */}
        <div className="relative min-h-[480px] lg:min-h-[850px] overflow-hidden group">
          <img
            src={IMAGES.fig}
            alt="Vela artesanal da Célli Maison, parte do ritual de casa"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Right Column Brand Manifesto & Pillars */}
        <div className="px-7 md:px-16 lg:px-20 py-20 md:py-28 flex flex-col justify-center reveal-on-scroll">
          <p className="eyebrow text-[#C5A880]">O que nos move</p>

          <h2 className="font-display text-[clamp(3.5rem,6vw,7rem)] leading-[.95] mt-7 font-light">
            A beleza de
            <br />
            <em className="font-light italic text-[#EAD9C2]">estar presente.</em>
          </h2>

          <p className="text-[#D1C7BC] leading-[1.9] text-base md:text-lg mt-9 max-w-xl font-light">
            A Célli Maison nasceu do desejo de trazer para Santa Bárbara o que há de mais
            sensorial na vida italiana: o peso da seda ao acordar, a luz de uma vela ao anoitecer,
            o rastro de um perfume que fica na memória. Aqui, escolher é parte do prazer.
          </p>

          {/* Pillars List */}
          <div className="mt-14 space-y-2">
            {PILLARS.map((p) => (
              <div
                key={p.number}
                className="border-t border-white/20 py-6 grid grid-cols-[36px_1fr] gap-4 transition-colors duration-300 hover:border-[#C5A880]/50"
              >
                <span className="text-xs text-[#C5A880] pt-2 font-mono">{p.number}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-white font-normal">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#BDB3A9] mt-2 leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
