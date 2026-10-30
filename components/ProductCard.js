"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { BagIcon, LeafIcon } from "./Icons";

// Matches a typical grid: 2 columns on mobile, 3 on tablet, 4 on desktop
const CARD_SIZES = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

export default function ProductCard({ product, priority = false }) {
  const { addItem } = useCart();
  const media = product.media?.[0] || product.images?.[0];

  const image = media?.url;
  const mediaType = media?.type || media?.mediaType || "image";
  const outOfStock = product.stock <= 0;

  const hasDiscount = product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-champagne"
      >
        {image ? (
          mediaType === "video" ? (
            <video
              src={image}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes={CARD_SIZES}
              quality={85}
              priority={priority}
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center text-forest/30">
            <LeafIcon className="h-10 w-10" />
          </div>
        )}

        {outOfStock ? (
          <span className="absolute inset-x-0 bottom-0 bg-ink/70 py-1.5 text-center text-xs font-semibold text-ivory">
            Out of stock
          </span>
        ) : (
          hasDiscount && (
            <span className="absolute left-2 top-2 bg-terracotta px-2.5 py-0.5 text-xs font-semibold text-ivory">
              {discountPercent}% off
            </span>
          )
        )}
      </Link>

      {/* Details */}
      <div className="mt-3 flex flex-1 flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-ink hover:text-forest">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-base font-bold tabular-nums text-forest">
              ₹ {product.price}
            </span>
            {hasDiscount && (
              <span className="text-xs font-medium tabular-nums text-muted line-through">
                ₹{product.compareAtPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addItem(product, 1)}
            disabled={outOfStock}
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-forest text-ivory transition hover:bg-forest-light disabled:cursor-not-allowed disabled:bg-muted/40"
            aria-label="Add to cart"
          >
            <BagIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}