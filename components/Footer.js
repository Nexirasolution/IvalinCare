import Link from "next/link";
import { PhoneIcon, WhatsappIcon, LocationIcon } from "./Icons";
import Image from "next/image";
import { FaInstagram, FaEnvelope } from "react-icons/fa6";

// Wraps a real brand glyph (from react-icons) in a correctly colored circle badge.
function BrandBadge({ children, background, className }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full text-white ${className}`}
      style={{ background }}
    >
      {children}
    </span>
  );
}

function InstagramIcon({ className }) {
  return (
    <BrandBadge
      background="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
      className={className}
    >
      <FaInstagram className="w-[62%] h-[62%]" />
    </BrandBadge>
  );
}

export default function Footer({ settings }) {
  const storeName = settings?.storeName || "Ivalin Naturals";
  const phone = settings?.phone || "+91 75503 99314";
  const whatsapp = settings?.whatsapp || "917550399314";
  const email = settings?.email || "ivalincare@gmail.com";
  const address =
    settings?.address ||
    "14, Dhamothira Swamy Layout, Neelikonam Palayam, ESI Hospital (opp), Singanallur, Coimbatore - 641033";

  const instagram =
    settings?.instagram ||
    "https://www.instagram.com/ivalin_naturals?rpxt=MWNoODZqYmM4Yzc3cQ==";

  const youtube = settings?.youtube;

  const socialLinks = [
    { href: instagram, label: "Instagram", Icon: InstagramIcon },
    { href: youtube, label: "YouTube", Icon: null },
  ].filter((s) => s.href);

  return (
    <footer className="bg-rose text-ivory py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Column 1 - Brand & Contact */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <Image
              src="/images/logo.png"
              alt={`${storeName} Logo`}
              width={80}
              height={80}
              className="rounded-full object-contain"
            />

            <h2 className="text-2xl font-semibold">{storeName}</h2>
          </div>

          <p className="text-ivory/80 leading-relaxed max-w-md">
            Fresh and natural products made with care.
            Healthy living with traditional, chemical-free methods.
          </p>

          <div className="mt-6 space-y-3 text-ivory/80">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-gold-light transition"
              >
                <PhoneIcon className="w-5 h-5" />
                {phone}
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-gold-light transition"
              >
                <FaEnvelope className="w-5 h-5" />
                {email}
              </a>
            )}

            {address && (
              <p className="flex items-start gap-2">
                <LocationIcon className="w-5 h-5 mt-0.5 shrink-0" />
                <span>{address}</span>
              </p>
            )}

            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-light transition"
              >
                <WhatsappIcon className="w-5 h-5" />
                WhatsApp Us
              </a>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-6 flex items-center gap-5">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="flex flex-col items-center gap-1 text-ivory/80 hover:text-gold-light hover:-translate-y-0.5 transition-transform text-xs font-medium"
                >
                  {Icon ? (
                    <Icon className="w-12 h-12 drop-shadow-md" />
                  ) : (
                    <span className="w-11 h-11 flex items-center justify-center rounded-full bg-rose text-white text-[10px] font-bold">
                      YT
                    </span>
                  )}
                  <span>{label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gold/20 mt-10 pt-5 text-center text-sm text-ivory/70">
        <p>
          © {new Date().getFullYear()} {storeName}. All rights reserved.
        </p>

        <p className="mt-2">
          Developed &amp; Designed by{" "}
          <a
            href="https://www.nexirasolution.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-light hover:text-white hover:underline transition"
          >
            Nexira Solution
          </a>
        </p>
      </div>
    </footer>
  );
}