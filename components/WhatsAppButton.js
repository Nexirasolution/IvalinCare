import { FaWhatsapp } from "react-icons/fa6";

// Floating WhatsApp chat button, fixed to the bottom-right corner.
// On mobile it sits 5rem above the bottom edge so it never covers a bottom nav bar;
// on desktop (md+) it drops to the corner.
// Number must include the country code, with no "+" or spaces (91 = India).
export default function WhatsAppButton({
  phone,
  message = "Hi! I'd like to know more about your products.",
}) {
  const number = (phone || "918428404011").replace(/\D/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5b] md:bottom-6 md:right-6"
    >
      {/* Soft pulse ring to draw attention (disabled when reduced motion is on) */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping" aria-hidden="true" />
      <FaWhatsapp className="relative h-8 w-8" />
    </a>
  );
}