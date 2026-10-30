import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BottomNav from "@/components/BottomNav";
import { getSettings } from "@/lib/settings";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: settings.seoTitle || "Ivalin Naturals | Natural Beauty, Naturally You",
    description:
      settings.seoDescription ||
      "Ivalin Naturals: natural skin care, hair care and beauty products from Singanallur, Coimbatore. Natural Beauty, Naturally You.",
    icons: {
      icon: "/images/logos.jpeg",
      shortcut: "/images/logos.jpeg",
      apple: "/images/logos.jpeg",
    },
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSettings();

  if (settings.maintenanceMode) {
    return (
      <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
        <body className="font-body antialiased flex min-h-screen items-center justify-center bg-champagne px-5 text-center">
          <div>
            <h1 className="font-display text-3xl font-bold text-forest">We&apos;ll be back soon</h1>
            <p className="mt-3 text-muted">{settings.storeName || "Ivalin Naturals"} is currently undergoing maintenance.</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased pb-16 md:pb-0">
        <CartProvider>
          {children}
          <FloatingWhatsApp whatsapp={settings.whatsapp} />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}