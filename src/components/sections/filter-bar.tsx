"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { t } from "@/config/i18n";
import { ZapStripe } from "@/components/ui/biga-stripe";

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  totalResults: number;
}

const BRANDS = [
  "CHEVROLET",
  "HYUNDAI",
  "JEEP",
  "VOLKSWAGEN",
  "CAOA CHERY",
  "TOYOTA",
  "NISSAN",
  "CITROËN",
];

const QUICK_BRANDS = [
  "CHEVROLET",
  "HYUNDAI",
  "JEEP",
  "VOLKSWAGEN",
  "CAOA CHERY",
  "CITROËN",
];

export function FilterBar({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  searchTerm,
  onSearchChange,
  totalResults,
}: FilterBarProps) {
  const categories = [
    { key: "TODOS", label: t.filters.all },
    { key: "SUVS", label: "SUVS" },
    { key: "HATCHES & SEDANS", label: "HATCHES & SEDANS" },
    { key: "CLÁSSICOS", label: "CLÁSSICOS" },
    { key: "TURBO", label: "MOTORES TURBO" },
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 -mt-6">
      <div className="bg-white/95 dark:bg-[#0E0E12]/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-colors relative overflow-hidden">
        {/* Top Crimson & Silver Hairline */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-300 dark:to-zinc-600" />

        {/* Top: Category Tabs */}
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-black/10 dark:border-zinc-800 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isActive =
                cat.key === "TODOS"
                  ? selectedCategory === "TODOS"
                  : selectedCategory.toLowerCase() === cat.key.toLowerCase();

              return (
                <button
                  key={cat.key}
                  onClick={() => onSelectCategory(cat.key)}
                  className={`px-4 py-2 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? "bg-neutral-950 text-white dark:bg-zinc-900 dark:text-white font-bold shadow-sm border-b-2 border-[#DC2626]"
                      : "bg-zinc-100 dark:bg-zinc-900/40 text-neutral-600 dark:text-zinc-400 hover:text-[#DC2626] dark:hover:text-red-400 hover:bg-zinc-200 dark:hover:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-800/60"
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 bg-[#DC2626] rounded-full inline-block" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-neutral-500 dark:text-zinc-400 uppercase">
            <ZapStripe size="xs" />
            <span>
              {totalResults} {totalResults === 1 ? t.filters.countSingular : t.filters.countPlural}
            </span>
          </div>
        </div>

        {/* Bottom: Search Input & Brand Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-5 items-center">
          <div className="md:col-span-7 relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-zinc-500"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.filters.searchPlaceholder}
              className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-zinc-500 pl-11 pr-4 py-3 text-xs tracking-wider font-mono focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/25 shadow-inner transition-all"
            />
          </div>

          <div className="md:col-span-5 relative">
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => onSelectBrand(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-neutral-900 dark:text-white pl-4 pr-10 py-3 text-xs tracking-[0.2em] font-mono uppercase appearance-none focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/25 cursor-pointer transition-all"
              >
                <option value="TODAS AS MARCAS" className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white">
                  {t.filters.allBrands}
                </option>
                {BRANDS.map((brand) => (
                  <option key={brand} value={brand} className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white">
                    {brand}
                  </option>
                ))}
              </select>
              <SlidersHorizontal
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-zinc-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Quick Brand Telemetry Pills */}
        <div className="flex items-center gap-2 pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800/80 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-zinc-500 whitespace-nowrap">
            Filtro Rápido:
          </span>
          {QUICK_BRANDS.map((brand) => {
            const isBrandActive = selectedBrand.toUpperCase() === brand;
            return (
              <button
                key={brand}
                onClick={() => onSelectBrand(isBrandActive ? "TODAS AS MARCAS" : brand)}
                className={`px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase transition-all duration-200 whitespace-nowrap border ${
                  isBrandActive
                    ? "bg-[#DC2626] text-white border-[#DC2626] font-bold"
                    : "bg-zinc-50 dark:bg-zinc-900/50 text-neutral-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-[#DC2626] hover:text-[#DC2626] dark:hover:border-red-400 dark:hover:text-red-400"
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
