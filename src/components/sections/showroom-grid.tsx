"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Vehicle } from "@/data/inventory";
import { buildVehicleWhatsAppLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { t } from "@/config/i18n";
import { ZapStripe } from "@/components/ui/biga-stripe";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface ShowroomGridProps {
  vehicles: Vehicle[];
  totalAvailable?: number;
  onOpenVehicleDetail: (vehicle: Vehicle) => void;
}

export function ShowroomGrid({ vehicles, totalAvailable, onOpenVehicleDetail }: ShowroomGridProps) {
  const pathname = usePathname();

  if (vehicles.length === 0) {
    return (
      <section id="estoque" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center relative">
        <div id="showroom" className="absolute -top-24 left-0 pointer-events-none" />
        <div className="py-16 px-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 max-w-xl mx-auto">
          <p className="text-sm font-mono tracking-[0.25em] uppercase text-neutral-600 dark:text-zinc-400 mb-4">
            {t.grid.empty}
          </p>
          <Link
            href="/#sourcing"
            className="inline-block px-6 py-3 bg-[#DC2626] text-white text-xs font-mono tracking-[0.2em] uppercase"
          >
            {t.nav.sourcing}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="estoque" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 transition-colors relative">
      <div id="showroom" className="absolute -top-24 left-0 pointer-events-none" />
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-black/10 dark:border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ZapStripe size="xs" />
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-500 dark:text-zinc-400">
              {t.grid.sectionLabel}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white uppercase tracking-tight">
            {pathname === "/estoque" ? t.grid.sectionHeading : `${t.nav.inventory} ${siteConfig.brand.shortName}`}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="max-w-md text-xs sm:text-sm font-mono tracking-wider text-neutral-600 dark:text-zinc-400">
            {t.grid.sectionSub}
          </p>
          {pathname !== "/estoque" && (
            <Link
              href="/estoque"
              className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:border-[#DC2626] hover:text-[#DC2626] dark:hover:border-red-400 dark:hover:text-red-400 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-900 dark:text-white transition-colors whitespace-nowrap"
            >
              <span>{t.grid.viewAll}</span>
              <ArrowUpRight size={13} />
            </Link>
          )}
        </div>
      </div>

      {/* Grid of Vehicles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle, index) => {
          const isTurboOrTop =
            vehicle.tag?.includes("TURBO") ||
            vehicle.tag?.includes("PREMIER") ||
            vehicle.tag?.includes("LONGITUDE") ||
            vehicle.tag?.includes("DESTAQUE");
          const isClassic = vehicle.tag?.includes("COLEC") || vehicle.category === "CLÁSSICOS";

          return (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="h-full"
            >
              <SpotlightCard
                glowColor={isTurboOrTop ? "red" : "default"}
                className="group relative flex flex-col h-full bg-white dark:bg-[#0E0E12] border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden"
              >
                {/* Card Top Crimson Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-300 dark:to-zinc-600 opacity-75 group-hover:opacity-100 group-hover:h-[3px] transition-all duration-300 z-20" />

                {/* Card Image Container */}
                <div
                  onClick={() => onOpenVehicleDetail(vehicle)}
                  className="relative w-full h-[260px] bg-zinc-950 overflow-hidden cursor-pointer flex items-center justify-center transition-colors"
                >
                  {vehicle.armored && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#DC2626]/90 border border-red-400 text-white text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                      <ShieldCheck size={12} strokeWidth={1.5} />
                      <span>DESTAQUE</span>
                    </div>
                  )}

                  {vehicle.tag && !vehicle.armored && (
                    <div
                      className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-widest uppercase backdrop-blur-md shadow-sm border ${
                        isTurboOrTop
                          ? "bg-red-950/90 text-red-200 border-red-500/70"
                          : isClassic
                          ? "bg-zinc-900/90 text-zinc-100 border-zinc-500/70"
                          : "bg-black/90 text-zinc-100 border-zinc-600/80"
                      }`}
                    >
                      {isTurboOrTop ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
                      ) : (
                        <ZapStripe size="xs" />
                      )}
                      <span>{vehicle.tag}</span>
                    </div>
                  )}

                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/45 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="relative flex items-center gap-2 px-5 py-2.5 bg-neutral-950 text-white text-xs font-mono tracking-widest uppercase shadow-xl border border-zinc-700 overflow-hidden hover:border-[#DC2626] transition-colors">
                      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-400" />
                      <span>{t.grid.viewDetails}</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-white dark:bg-[#0E0E12] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ZapStripe size="xs" />
                      <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 dark:text-zinc-400 block">
                        {vehicle.brand}
                      </span>
                    </div>

                    <h3
                      onClick={() => onOpenVehicleDetail(vehicle)}
                      className="font-display text-xl font-bold text-neutral-950 dark:text-white uppercase tracking-tight group-hover:text-[#DC2626] dark:group-hover:text-red-400 transition-colors cursor-pointer"
                    >
                      {vehicle.model}
                    </h3>

                    <p className="text-[11px] font-mono tracking-wider text-neutral-500 dark:text-zinc-400 uppercase truncate mt-0.5 mb-5">
                      {vehicle.version}
                    </p>

                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-zinc-200 dark:border-zinc-800 mb-5">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500 block">
                          {t.grid.yearModel}
                        </span>
                        <span className="text-xs font-semibold text-neutral-900 dark:text-zinc-200 tracking-wider tabular-nums">
                          {vehicle.year}
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500 block">
                          {t.grid.mileage}
                        </span>
                        <span className="text-xs font-semibold text-neutral-900 dark:text-zinc-200 tracking-wider tabular-nums">
                          {vehicle.km}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500">
                        {t.grid.price}
                      </span>
                      <span className="text-lg font-black text-[#DC2626] dark:text-red-400 tracking-wider tabular-nums">
                        {vehicle.price}
                      </span>
                    </div>

                    <a
                      href={buildVehicleWhatsAppLink(vehicle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:border-[#DC2626] hover:bg-[#DC2626] hover:text-white dark:hover:bg-[#DC2626] dark:hover:border-[#DC2626] dark:hover:text-white text-neutral-900 dark:text-white text-[10px] font-mono tracking-widest uppercase transition-all duration-300"
                    >
                      {t.grid.proposal}
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      {pathname !== "/estoque" && (
        <div className="mt-14 pt-8 border-t border-black/10 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ZapStripe size="xs" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-600 dark:text-zinc-400">
              Exibindo {vehicles.length} de {totalAvailable ?? vehicles.length} veículos disponíveis no estoque
            </span>
          </div>

          <Link
            href="/estoque"
            className="relative px-8 py-4 bg-neutral-950 text-white dark:bg-zinc-900 hover:bg-[#DC2626] dark:hover:bg-[#DC2626] font-semibold text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-3 shadow-md border border-zinc-700 group"
          >
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-300 dark:to-zinc-500" />
            <ZapStripe size="xs" />
            <span>{t.grid.viewAll}</span>
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      )}
    </section>
  );
}
