import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { CATEGORY_ICONS, LeafIcon } from "@/components/Icons";
import HeroSlider from "@/components/HeroSlider";
import { ArrowRight, Sparkles, Leaf, ShieldCheck, Truck as TruckIcon, Award } from "lucide-react";
import { getSettings } from "@/lib/settings";
export const dynamic = "force-dynamic";

async function getData() {
  await connectDB();
  const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
  const bestSelling = await Product.find({ isActive: true, isFeatured: true })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean();
  return {
    categories: JSON.parse(JSON.stringify(categories)),
    bestSelling: JSON.parse(JSON.stringify(bestSelling)),
  };
}

const WHY_CHOOSE = [
  { title: "100% Handmade", desc: "Crafted by skilled artisans", icon: Leaf },
  { title: "Eco-Friendly", desc: "Natural & sustainable materials", icon: ShieldCheck },
  { title: "Premium Quality", desc: "Carefully crafted with perfection", icon: Award },
  { title: "Pan India Delivery", desc: "Safe & timely, everywhere", icon: TruckIcon },
];
const CATEGORY_IMAGES = {
  "Handmade Wire Bags": "/categroy/wire-bags.png",
  "Organic Fertilizers & Soil Enhancers": "/categroy/organic-fertilizers.png",
  "Clay Products": "/categroy/clay-products.png",
  "Wooden Products": "/categroy/wooden-products.png",
  "Handmade Wooden Toys & Miniatures": "/categroy/wooden-toys.png",
  "Herbal Products": "/categroy/herbal-products.png",
};

export default async function HomePage() {
  const { categories, bestSelling } = await getData();
  const settings = await getSettings();

  return (
    <>
      <Navbar settings={settings} />

      <HeroSlider />

  

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-champagne/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
            <Sparkles className="h-3 w-3" />
            Curated Collections
          </span>
          <h2 className="font-display text-3xl font-bold text-ink md:text-5xl">
            Shop by Category
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted md:text-base">
            Every category, thoughtfully sourced and rooted in tradition.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-muted">
            Categories will appear here once added from the admin panel.
          </p>
        ) : (
          <div className="grid grid-cols-3 justify-items-center gap-x-4 gap-y-10 sm:grid-cols-4 md:grid-cols-6 md:gap-x-6">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat._id}`}
                className="group flex flex-col items-center"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-gold/25 via-gold/10 to-transparent p-[3px] transition duration-300 group-hover:from-forest/40 group-hover:via-gold/30 md:h-28 md:w-28">
                  <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition duration-300 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
                    <Image
                      src={cat.image?.url || CATEGORY_IMAGES[cat.name] || "/categroy/default.png"}
                      alt={cat.name}
                      fill
                      sizes="(max-width:768px) 80px, 112px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                <h3 className="mt-3 w-20 text-center text-xs font-medium text-ink/80 transition group-hover:text-forest md:w-28 md:text-sm">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Best Selling products */}
      {bestSelling.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-b from-champagne/50 via-champagne/30 to-ivory py-16 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-forest/10 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-12 flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
              <div>
                <p className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark md:justify-start">
                  <Sparkles className="h-3.5 w-3.5" />
                  Customer Favorites
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-ink md:text-5xl">
                  Best Selling Products
                </h2>
                <div className="mx-auto mt-4 h-px w-16 bg-gold/50 md:mx-0" />
              </div>
              <Link
                href="/products"
                className="group hidden items-center gap-1.5 text-sm font-semibold text-forest md:flex"
              >
                View all
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {bestSelling.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>

            {/* Shop Now CTA */}
            <div className="mt-14 flex justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-forest px-9 py-3.5 text-sm font-semibold tracking-wide text-ivory shadow-[0_8px_24px_rgba(27,67,50,0.25)] transition duration-300 hover:bg-ink hover:shadow-[0_10px_30px_rgba(27,67,50,0.35)]"
              >
                Explore Full Collection
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-champagne/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Our Promise
          </span>
          <h2 className="font-display text-3xl font-bold text-ink md:text-5xl">
            Why Choose Us?
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {WHY_CHOOSE.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex flex-col items-center rounded-2xl border border-gold/15 bg-white/60 px-4 py-8 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-ivory shadow-[0_6px_16px_rgba(27,67,50,0.3)] transition duration-300 group-hover:scale-110 group-hover:bg-ink">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <p className="mt-5 font-display text-sm font-bold text-ink md:text-base">
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs text-muted md:text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ayurvedic promise banner */}
      <section className="relative mx-5 mb-16 overflow-hidden rounded-3xl bg-forest px-6 py-14 text-center md:mx-8 md:mb-24 md:px-12 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_60%)]"
        />
        <LeafIcon className="relative mx-auto h-9 w-9 text-gold" />
        <h3 className="relative mt-4 font-display text-2xl font-bold text-ivory md:text-4xl">
          Rooted in Tradition, Made for Today
        </h3>
        <p className="relative mx-auto mt-4 max-w-xl text-sm text-ivory/75 md:text-base">
          Every product is a promise — of purity, of craftsmanship, and of centuries-old
          wellness wisdom brought into your everyday life.
        </p>
        <Link
          href="/products"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-gold bg-ivory px-8 py-3 text-sm font-semibold text-forest transition hover:bg-gold hover:text-ivory hover:border-gold"
        >
          Discover the Collection
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <Footer />
    </>
  );
}