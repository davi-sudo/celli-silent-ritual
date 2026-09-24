import { ProductCard } from './ProductCard';
import { CATEGORIES, MOODS, PRODUCTS } from '../data';

export function Catalog({ category, setCategory, mood, setMood, onOpen }) {
  const filteredProducts = PRODUCTS.filter(
    (item) =>
      (category === 'todos' || item.category === category) &&
      (mood === 'todos' || item.mood === mood)
  );

  const categoryFilters = [
    ['todos', 'Todas as peças'],
    ...CATEGORIES.map((cat) => [cat.slug, cat.name]),
  ];

  return (
    <section
      id="colecoes"
      className="bg-[#F2EFEA] px-5 md:px-10 lg:px-16 py-24 md:py-36 scroll-mt-4 transition-colors duration-700"
      aria-labelledby="catalog-heading"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Title and subtitle */}
        <div className="md:flex justify-between items-end border-b border-[#C9C2BA] pb-8 gap-10 reveal-on-scroll">
          <div>
            <p className="eyebrow text-[#9B7C55]">
              O acervo · {filteredProducts.length} {filteredProducts.length === 1 ? 'peça' : 'peças'}
            </p>
            <h2 id="catalog-heading" className="font-display text-6xl md:text-[7rem] leading-none mt-4 font-light">
              Peças para <em className="font-light italic text-[#7C6751]">sentir</em>
            </h2>
          </div>
          <p className="max-w-xs text-[#6C6259] text-sm leading-relaxed mt-5 md:mt-0 font-light">
            Escolha pelo objeto que deseja ter por perto. Ou pelo clima que deseja criar.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="pt-8 flex flex-col gap-6 reveal-on-scroll">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" role="group" aria-label="Filtrar por categoria">
            {categoryFilters.map(([catSlug, catName]) => (
              <button
                key={catSlug}
                type="button"
                onClick={() => setCategory(catSlug)}
                aria-pressed={category === catSlug}
                className={`whitespace-nowrap min-h-12 px-6 border text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  category === catSlug
                    ? 'bg-[#231D18] text-white border-[#231D18] shadow-sm'
                    : 'border-[#C9C2BA] text-[#71665D] hover:border-[#231D18] hover:text-[#231D18]'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>

          {/* Mood filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none" role="group" aria-label="Filtrar por clima">
            <span className="eyebrow whitespace-nowrap mr-3 text-[#9B7C55]">
              Por clima:
            </span>
            {['todos', ...MOODS].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                aria-pressed={mood === m}
                className={`min-h-12 whitespace-nowrap px-4 text-xs border-b transition-all duration-300 cursor-pointer ${
                  mood === m
                    ? 'border-[#9B7C55] text-[#6C5033] font-medium'
                    : 'border-transparent text-[#71665D] hover:text-[#231D18] hover:border-[#DFDCDA]'
                }`}
              >
                {m === 'todos' ? 'Todos os climas' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-12 lg:gap-y-20 mt-10">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={onOpen}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center reveal-on-scroll">
            <p className="font-display text-4xl text-[#231D18]">
              Nenhuma peça neste encontro de filtros.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('todos');
                setMood('todos');
              }}
              className="mt-6 min-h-12 px-6 border border-[#231D18] text-xs uppercase tracking-widest hover:bg-[#231D18] hover:text-white transition-all cursor-pointer"
            >
              Ver todas as peças
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
