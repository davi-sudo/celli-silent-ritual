import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function Carousel({ items, alt = 'Carrossel', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={8}
        slidesPerView={1.2}
        centeredSlides={false}
        navigation={{
          prevEl: '.carousel-prev',
          nextEl: '.carousel-next',
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1.1, spaceBetween: 6 },
          640: { slidesPerView: 1.2, spaceBetween: 8 },
          768: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 3, spaceBetween: 12 },
        }}
        className="w-full overflow-hidden"
      >
        {items.map((src, idx) => (
          <SwiperSlide key={idx} className="!w-auto">
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
        ))}
      </Swiper>

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
    </div>
  );
}
