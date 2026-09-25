import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function Carousel({ items, alt = 'Carrossel', className = '', fill = false }) {
  const hasMultiple = items.length > 1;

  return (
    <div className={`relative ${className} ${fill ? 'h-full' : ''}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={fill ? 0 : 8}
        slidesPerView={fill ? 1 : 1.15}
        centeredSlides={false}
        navigation={hasMultiple ? { prevEl: '.carousel-prev', nextEl: '.carousel-next' } : false}
        pagination={hasMultiple ? { clickable: true } : false}
        autoplay={!fill && hasMultiple ? { delay: 4000, disableOnInteraction: true } : false}
        breakpoints={
          fill
            ? undefined
            : {
                320: { slidesPerView: 1.15, spaceBetween: 6 },
                640: { slidesPerView: 1.3, spaceBetween: 8 },
                768: { slidesPerView: 2, spaceBetween: 10 },
                1024: { slidesPerView: 3, spaceBetween: 12 },
              }
        }
        // IMPORTANT: never force width via className (e.g. w-auto) on
        // SwiperSlide — it overrides the width Swiper calculates from
        // slidesPerView and breaks sizing on mobile (slides fall back to
        // the image's natural pixel width, causing overflow/cropping).
        className={`w-full overflow-hidden ${fill ? 'h-full' : ''}`}
      >
        {items.map((src, idx) =>
          fill ? (
            <SwiperSlide key={idx} className="h-full">
              <img
                src={src}
                alt={`${alt} ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={idx}>
              <a
                href="https://instagram.com/cellimaison"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${alt} — foto ${idx + 1}`}
                className="block w-full overflow-hidden rounded-sm shadow-sm"
              >
                <img
                  src={src}
                  alt={`${alt} ${idx + 1}`}
                  loading="lazy"
                  className="w-full aspect-[0.75] object-cover hover:scale-105 transition-transform duration-500"
                />
              </a>
            </SwiperSlide>
          )
        )}
      </Swiper>

      {hasMultiple && (
        <>
          <button
            type="button"
            className="carousel-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#231D18]/80 text-white flex items-center justify-center shadow-lg hover:bg-[#9B7C55] transition-colors opacity-70"
            aria-label="Anterior"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="carousel-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#231D18]/80 text-white flex items-center justify-center shadow-lg hover:bg-[#9B7C55] transition-colors opacity-70"
            aria-label="Próximo"
          >
            <ArrowRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}
