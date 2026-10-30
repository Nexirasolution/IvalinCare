"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_SCROLL_MS = 4000;
const SWIPE_THRESHOLD = 50; // px

// Main image: sharp. Thumbnails: tiny, so low quality is invisible and loads fast.
const MAIN_QUALITY = 90;
const MAIN_SIZES = "(max-width: 1024px) 100vw, 50vw";

export default function ProductGallery({ media, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const thumbRefs = useRef([]);

  const active = media[activeIndex];
  const isVideo = (active?.type || active?.mediaType) === "video";
  const hasMultiple = media.length > 1;

  // The upcoming image is rendered invisibly so it is already loaded when shown
  const nextItem = hasMultiple ? media[(activeIndex + 1) % media.length] : null;
  const nextIsVideo = (nextItem?.type || nextItem?.mediaType) === "video";

  const goTo = useCallback(
    (index) => {
      const next = ((index % media.length) + media.length) % media.length;
      setActiveIndex(next);
    },
    [media.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    if (!hasMultiple || isPaused || isVideo) return;
    const timer = setInterval(goNext, AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [hasMultiple, isPaused, isVideo, goNext]);

  // Keep active thumbnail in view
  useEffect(() => {
    thumbRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD) goPrev();
    else if (deltaX < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
    setIsPaused(false);
  }

  return (
    <div>
      <div
        className="group relative aspect-square touch-pan-y select-none overflow-hidden bg-champagne"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isVideo ? (
          <video
            key={active.url}
            src={active.url}
            className="h-full w-full object-cover"
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            key={active.url}
            src={active.url}
            alt={productName}
            fill
            sizes={MAIN_SIZES}
            quality={MAIN_QUALITY}
            priority={activeIndex === 0}
            className="object-cover"
          />
        )}

        {/* Invisible preload of the next image for instant switching */}
        {nextItem && !nextIsVideo && (
          <div className="pointer-events-none absolute inset-0 opacity-0" aria-hidden="true">
            <Image
              src={nextItem.url}
              alt=""
              fill
              sizes={MAIN_SIZES}
              quality={MAIN_QUALITY}
              loading="eager"
              className="object-cover"
            />
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/80 text-forest opacity-0 backdrop-blur transition hover:bg-white group-hover:opacity-100 md:opacity-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/80 text-forest opacity-0 backdrop-blur transition hover:bg-white group-hover:opacity-100 md:opacity-0"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots (visible on mobile where hover arrows don't apply) */}
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 md:hidden">
              {media.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 w-1.5 transition ${
                    index === activeIndex ? "bg-forest" : "bg-white/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-4 flex flex-wrap gap-3">
          {media.map((item, index) => {
            const itemIsVideo = (item.type || item.mediaType) === "video";
            return (
              <button
                key={item.publicId || index}
                ref={(el) => (thumbRefs.current[index] = el)}
                onClick={() => goTo(index)}
                aria-label={`Show image ${index + 1}`}
                className={`relative h-16 w-16 shrink-0 overflow-hidden border-2 transition ${
                  index === activeIndex ? "border-forest" : "border-transparent"
                }`}
              >
                {itemIsVideo ? (
                  <video
                    src={item.url}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={item.url}
                    alt={`${productName} ${index + 1}`}
                    fill
                    sizes="64px"
                    quality={60}
                    className="object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}