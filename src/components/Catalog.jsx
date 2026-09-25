import { ProductCard } from './ProductCard';
import { CATEGORIES, MOODS, PRODUCTS } from '../data';

export function Catalog({ category, setCategory, mood, setMood, onOpen }) {
  // Filter products matching category and mood
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchCategory = category === 'todos' || item.category === category;
    const matchMood =
      mood === 'todos' ||
      item.mood === mood ||
      (item.moods && item.moods.includes(mood));
    return matchCategory && matchMood;
  });

  // Category counts
  const getCategoryCount = (slug) => {
    if (slug === 'todos') return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.category === slug).length;
  };

  // Mood counts
  const getMoodCount = (m) => {
    if (m === 'todos') {
      return category === 'todos'
        ? PRODUCTS.length
        : PRODUCTS.filter((p) => p.category === category).length;
    }
    return PRODUCTS.filter((p) => {
      const matchCat = category === 'todos' || p.category === category;
      const matchM = p.mood === m || (p.moods && p.moods.includes(m));
      return matchCat && matchM;
    }).length;
  };

  const categoryFilters = [
    ['todos', 'Todas as peças'],
    ...CATEGORIES.map((cat) => [cat.slug, cat.name]),
  ];

  const handleCategoryClick = (catSlug) => {
    setCategory(catSlug);
    setMood('todos'); // Always reset mood when switching category to show all items
  };

  const handleMoodClick = (m) => {
    // If the selected mood has 0 items in current category, reset category to 'todos'
    const matchingInCurrent = PRODUCTS.filter((p) => {
      const matchCat = category === 'todos' || p.category === category;
      const matchM = m === 'todos' || p.mood === m || (p.moods && p.moods.includes(m));
      return matchCat && matchM;
    });

    if (matchingInCurrent.length === 0) {
      setCategory('todos');
    }
    setMood(m);
  };

  const isFiltered = category !== 'todos' || mood !== 'todos';

  return (
    <section
      id="colecoes"
      className="bg-[#F2EFEA] px-5 md:px-10 lg:px-16 py-20 md:py-32 scroll-mt-4 transition-colors duration-500"
      aria-labelledby="catalog-heading"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Title and subtitle */}
        <div className="md:flex justify-between items-end border-b border-[#C9C2BA] pb-8 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <p className="eyebrow text-[#9B7C55]">
                O acervo · {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'peça' : 'peças'}
              </p>
              {isFiltered && (
                <button
                  type="button"
                  onClick={() => {
                    setCategory('todos');
                    setMood('todos');
                  }}
                  className="text-[10px] uppercase tracking-wider text-[#71665D] hover:text-[#231D18] underline underline-offset-2 cursor-pointer transition-colors"
                >
                  (Ver todas)
                </button>
              )}
            </div>
            <h2
              id="catalog-heading"
              className="font-display text-5xl md:text-[6.5rem] leading-none mt-3 font-light text-[#231D18]"
            >
              Peças para <em className="font-light italic text-[#7C6751]">sentir</em>
            </h2>
          </div>
          <p className="max-w-xs text-[#6C6259] text-sm leading-relaxed mt-5 md:mt-0 font-light">
            Escolha pelo objeto que deseja ter por perto. Ou pelo clima que deseja criar.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="pt-8 flex flex-col gap-6">
          {/* Category Tabs */}
          <div
            className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none"
            role="group"
            aria-label="Filtrar por categoria"
          >
            {categoryFilters.map(([catSlug, catName]) => {
              const count = getCategoryCount(catSlug);
              const isActive = category === catSlug;
              return (
                <button
                  key={catSlug}
                  type="button"
                  onClick={() => handleCategoryClick(catSlug)}
                  aria-pressed={isActive}
                  className={`whitespace-nowrap min-h-12 px-5 md:px-6 border text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#231D18] text-white border-[#231D18] shadow-sm'
                      : 'border-[#C9C2BA] text-[#71665D] bg-transparent hover:border-[#231D18] hover:text-[#231D18]'
                  }`}
                >
                  <span>{catName}</span>
                  <span
                    className={`text-[10px] font-mono ${
                      isActive ? 'text-[#C5A880]' : 'text-[#8A7E73]'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mood filters */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none"
            role="group"
            aria-label="Filtrar por clima"
          >
            <span className="eyebrow whitespace-nowrap mr-2 text-[#9B7C55]">
              Por clima:
            </span>
            {['todos', ...MOODS].map((m) => {
              const count = getMoodCount(m);
              const isActive = mood === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleMoodClick(m)}
                  aria-pressed={isActive}
                  className={`min-h-11 whitespace-nowrap px-3.5 text-xs border-b transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'border-[#9B7C55] text-[#6C5033] font-medium'
                      : 'border-transparent text-[#71665D] hover:text-[#231D18] hover:border-[#DFDCDA]'
                  }`}
                >
                  <span>{m === 'todos' ? 'Todos' : m}</span>
                  <span className="text-[10px] font-mono opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Responsive Products Grid */}
        <div className="mt-10">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-[#FAF8F5]/60 rounded-sm border border-[#DFDCDA] p-8">
              <p className="font-display text-3xl md:text-4xl text-[#231D18]">
                Nenhuma peça neste encontro de filtros.
              </p>
              <p className="text-sm text-[#71665D] mt-2 font-light">
                Experimente selecionar outro clima ou visualizar todo o acervo.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('todos');
                  setMood('todos');
                }}
                className="mt-6 min-h-12 px-7 bg-[#231D18] text-white text-xs uppercase tracking-widest hover:bg-[#9B7C55] transition-all cursor-pointer shadow-sm"
              >
                Ver todas as peças ({PRODUCTS.length})
              </button>
            </div>
          ) : filteredProducts.length === 1 ? (
            /* Single item featured layout - centered and balanced on desktop & mobile */
            <div className="max-w-md mx-auto py-4">
              <ProductCard
                key={filteredProducts[0].id}
                product={filteredProducts[0]}
                onOpen={onOpen}
                isOffset={false}
              />
            </div>
          ) : filteredProducts.length === 2 ? (
            /* Two items layout - centered 2 columns, aligned at top */
            <div className="grid sm:grid-cols-2 max-w-3xl mx-auto gap-6 md:gap-10 py-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={onOpen}
                  isOffset={false}
                />
              ))}
            </div>
          ) : (
            /* Standard 3-column responsive grid */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={onOpen}
                  isOffset={category === 'todos' && idx % 3 === 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
