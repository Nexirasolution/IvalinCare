"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    fetch("/api/banners?activeOnly=true")
      .then((r) => r.json())
      .then((data) => setSlides((data.banners || []).filter((b) => b.image?.url)))
      .catch(() => setSlides([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="relative aspect-[16/9] w-full animate-pulse bg-champagne md:aspect-[1920/700]" />
    );
  }

  if (!slides.length) return null;

  return (
    <section className="hero-slider relative w-full overflow-hidden bg-champagne">
      <Swiper
        className="w-full"
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        // Slider height follows each banner's real height, so nothing is cropped
        autoHeight
        onSwiper={setSwiper}
        navigation={false}
        breakpoints={{
          768: {
            navigation: true,
          },
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={slides.length > 1}
      >
        {slides.map((slide, index) => {
          const hasText = Boolean(slide.title || slide.subtitle || slide.ctaText);

          return (
            <SwiperSlide key={slide._id || index}>
              <div className="relative w-full">
                {/* Full image at its natural ratio: no crop, no gaps, full width */}
                <Image
                  src={slide.image.url}
                  alt={slide.title || "Banner"}
                  width={1920}
                  height={1080}
                  priority={index === 0}
                  quality={90}
                  sizes="100vw"
                  onLoad={() => swiper?.updateAutoHeight?.(0)}
                  className="block h-auto w-full"
                />

                {/* Overlay + content only when there is text to show */}
                {hasText && (
                  <>
                    <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/70 md:via-black/35 md:to-transparent" />

                    <div className="absolute inset-0 flex items-center">
                      <div className="mx-auto w-full max-w-7xl px-4 pb-5 sm:px-6 md:px-8 md:pb-0">
                        <div className="max-w-[85%] sm:max-w-md md:max-w-xl">
                          {slide.title && (
                            <h1 className="line-clamp-2 font-display text-xl font-medium leading-tight text-white sm:text-3xl md:text-5xl lg:text-6xl">
                              {slide.title}
                            </h1>
                          )}

                          {slide.subtitle && (
                            <p className="mt-1.5 line-clamp-2 text-xs text-white/90 sm:mt-3 sm:text-base md:text-lg">
                              {slide.subtitle}
                            </p>
                          )}

                          {slide.ctaText && (
                            <div className="mt-3 flex flex-wrap gap-3 sm:mt-6">
                              <Link
                                href={slide.ctaLink || "/products"}
                                className="rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-ivory transition hover:bg-forest-light sm:px-5 sm:py-2.5 sm:text-sm md:px-8 md:py-3"
                              >
                                {slide.ctaText}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* If there's a link but no button text, make the whole banner clickable */}
                {slide.ctaLink && !slide.ctaText && (
                  <Link
                    href={slide.ctaLink}
                    aria-label={slide.title || "Open banner link"}
                    className="absolute inset-0 z-10"
                  />
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .hero-slider .swiper-pagination {
          bottom: 6px !important;
        }
        .hero-slider .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.6;
          width: 7px;
          height: 7px;
        }
        .hero-slider .swiper-pagination-bullet-active {
          background: #c9a227; /* gold */
          opacity: 1;
        }
        .hero-slider .swiper-button-next,
        .hero-slider .swiper-button-prev {
          color: #c9a227; /* gold */
        }
        .hero-slider .swiper-button-next::after,
        .hero-slider .swiper-button-prev::after {
          font-size: 22px;
          font-weight: 700;
        }
        @media (min-width: 768px) {
          .hero-slider .swiper-pagination {
            bottom: 16px !important;
          }
          .hero-slider .swiper-pagination-bullet {
            width: 9px;
            height: 9px;
          }
        }
      `}</style>
    </section>
  );
}