"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { t } from "@/config/i18n";
import { ZapStripe } from "@/components/ui/biga-stripe";

export function Footer() {
  return (
    <footer
      id="location"
      className="relative w-full bg-zinc-50 dark:bg-[#060608] border-t border-zinc-200 dark:border-zinc-800 pt-20 pb-12 overflow-hidden text-neutral-600 dark:text-zinc-400 transition-colors"
    >
      {/* Top Signature Red & Silver Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-300 dark:to-zinc-700" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-200 dark:border-zinc-800">
          {/* Brand & Concept */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                {siteConfig.brand.logoPath && (
                  <div className="relative">
                    <img
                      src={siteConfig.brand.logoPath}
                      alt={siteConfig.brand.name}
                      className="h-12 w-12 rounded-full object-cover border border-red-600/40 dark:border-zinc-700 shadow-sm bg-black"
                    />
                    <span className="absolute -bottom-1 -right-1 block">
                      <ZapStripe size="xs" />
                    </span>
                  </div>
                )}
                <div className="flex flex-col select-none py-1">
                  <span className="font-display font-black text-xl tracking-[0.18em] uppercase leading-none">
                    <span className="text-neutral-950 dark:text-white">ZAP</span>{" "}
                    <span className="text-[#DC2626]">MOTORS</span>
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-500 dark:text-zinc-400 uppercase mt-1">
                    {siteConfig.brand.cityState}
                  </span>
                </div>
              </div>
              <p className="text-[11px] font-mono tracking-wider text-neutral-500 dark:text-zinc-400 leading-relaxed mb-6">
                {siteConfig.brand.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-500 dark:text-zinc-500 uppercase">
              <ZapStripe size="xs" />
              <span>{siteConfig.brand.cityState}</span>
            </div>
          </div>

          {/* Showroom Address */}
          <div className="lg:col-span-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-950 dark:text-white block mb-4">
              {t.footer.showroom}
            </span>
            <div className="text-xs font-mono space-y-2 text-neutral-800 dark:text-zinc-300">
              {siteConfig.contact.addresses.map((address) => (
                <p key={address}>{address}</p>
              ))}
              <p className="text-neutral-500 dark:text-zinc-400 pt-1">{siteConfig.contact.neighborhood}</p>
              <p className="text-neutral-500 dark:text-zinc-400">{siteConfig.contact.cityStateZip}</p>
              <a
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 pt-2 text-[11px] text-[#DC2626] dark:text-red-400 hover:underline uppercase tracking-widest"
              >
                <MapPin size={12} strokeWidth={1.5} />
                <span>Ver no Mapa</span>
              </a>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-950 dark:text-white block mb-4">
              {t.footer.privateService}
            </span>
            <div className="text-xs font-mono space-y-2 text-neutral-800 dark:text-zinc-300">
              <p className="text-[#DC2626] dark:text-red-400 font-bold text-sm tracking-wider">
                WhatsApp {siteConfig.contact.displayPhone}
              </p>
              {siteConfig.contact.secondaryPhones && (
                <p className="text-neutral-700 dark:text-zinc-300">{siteConfig.contact.secondaryPhones}</p>
              )}
              <div className="pt-2 text-neutral-500 dark:text-zinc-400 space-y-1">
                <p>{siteConfig.contact.businessHours.weekdays}</p>
                <p>{siteConfig.contact.businessHours.saturdays}</p>
                <p>{siteConfig.contact.businessHours.sundays}</p>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="lg:col-span-2">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-950 dark:text-white block mb-4">
              {t.footer.officialChannels}
            </span>
            <div className="flex flex-col space-y-3 text-xs font-mono">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DC2626] dark:hover:text-red-400 transition-colors flex items-center justify-between group"
                >
                  <span>Instagram @zap_motors</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DC2626] dark:hover:text-red-400 transition-colors flex items-center justify-between group"
                >
                  <span>Facebook</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              <a
                href={siteConfig.seo.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DC2626] dark:hover:text-red-400 transition-colors flex items-center justify-between group"
              >
                <span>Site Oficial</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-neutral-500 dark:text-zinc-500">
          <span>
            © {new Date().getFullYear()} {siteConfig.brand.name}. {t.footer.rights}
          </span>
          <div className="flex items-center gap-2">
            <ZapStripe size="xs" />
            <span className="tracking-widest uppercase">Showroom Digital · Zap Motors Sorocaba</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
