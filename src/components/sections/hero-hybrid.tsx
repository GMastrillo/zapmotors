"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { SHOWCASE_VEHICLES, Vehicle } from "@/data/inventory";
import { siteConfig } from "@/config/site";
import { buildVehicleWhatsAppLink } from "@/lib/whatsapp";
import { t } from "@/config/i18n";
import { ZapStripe, ZapGradientLine } from "@/components/ui/biga-stripe";

interface HeroHybridProps {
  onOpenVehicleDetail: (vehicle: Vehicle) => void;
  onVehicleChange?: (vehicle: Vehicle) => void;
}

export function HeroHybrid({ onOpenVehicleDetail, onVehicleChange }: HeroHybridProps) {
  const [introStage, setIntroStage] = useState<"brand_reveal" | "done">("brand_reveal");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const showcaseVehicles = SHOWCASE_VEHICLES.slice(0, 3);
  const currentVehicle = showcaseVehicles[currentIndex] || showcaseVehicles[0];

  useEffect(() => {
    if (onVehicleChange) {
      onVehicleChange(currentVehicle);
    }
  }, [currentIndex, currentVehicle, onVehicleChange]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyShown = sessionStorage.getItem("zap_intro_shown");
      if (alreadyShown === "true") {
        setIntroStage("done");
        document.documentElement.classList.remove("intro-pending");
        document.documentElement.classList.add("intro-done");
      } else {
        document.documentElement.classList.add("intro-pending");
        document.documentElement.classList.remove("intro-done");
      }
    }
  }, []);

  const finishIntro = () => {
    setIntroStage("done");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("zap_intro_shown", "true");
      document.documentElement.classList.remove("intro-pending");
      document.documentElement.classList.add("intro-done");
    }
  };

  useEffect(() => {
    if (introStage === "brand_reveal") {
      const timer = setTimeout(() => {
        finishIntro();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [introStage]);

  useEffect(() => {
    if (introStage !== "done" || isPaused) return;

    const interval = 60;
    const duration = 6000;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % showcaseVehicles.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [introStage, isPaused, currentIndex, showcaseVehicles.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? showcaseVehicles.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseVehicles.length);
    setProgress(0);
  };

  return (
    <section className="relative w-full min-h-screen bg-white dark:bg-[#09090B] transition-colors duration-500 overflow-hidden flex flex-col justify-between pt-24 pb-12">
      {/* Background Studio Architecture (Sem orbs neon borrados) */}
      <div className="absolute inset-0 pointer-events-none z-0 intro-hide transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-[#101014] dark:via-[#09090B] dark:to-black opacity-95" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
      </div>

      {/* INTRO EDITORIAL EM TEXTO (Executa uma única vez por sessão) */}
      <AnimatePresence>
        {introStage !== "done" && (
          <motion.div
            id="intro-overlay-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#09090B] flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center"
            >
              {siteConfig.brand.logoPath && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 relative p-1 rounded-full border border-red-600/60 bg-black shadow-lg"
                >
                  <img
                    src={siteConfig.brand.logoPath}
                    alt={siteConfig.brand.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1">
                    <ZapStripe size="sm" />
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-3"
              >
                <ZapStripe size="xs" />
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.4em] uppercase text-zinc-400">
                  {siteConfig.brand.cityState}
                </span>
                <ZapStripe size="xs" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.14em] uppercase mb-4"
              >
                <span className="text-white">ZAP</span>{" "}
                <span className="text-[#DC2626]">MOTORS</span>
              </motion.p>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-36 mb-5"
              >
                <ZapGradientLine />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-xs sm:text-sm font-mono tracking-[0.28em] uppercase text-zinc-400 max-w-lg"
              >
                {siteConfig.brand.tagline}
              </motion.p>
            </motion.div>

            <button
              onClick={finishIntro}
              className="absolute bottom-8 right-8 z-20 px-3.5 py-1.5 border border-zinc-700 bg-zinc-900/80 backdrop-blur-md text-zinc-300 hover:text-white text-[10px] font-mono tracking-[0.3em] uppercase transition-all hover:border-[#DC2626]"
            >
              [ PULAR ]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOWCASE INTERATIVO */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-between my-auto intro-hide transition-opacity duration-700"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-10">
          {/* Left Column: Brand, Title, Slogan and Telemetry */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVehicle.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-3 mb-2">
                  <ZapStripe size="xs" />
                  <span className="text-xs font-mono tracking-[0.35em] uppercase text-neutral-500 dark:text-zinc-400">
                    {currentVehicle.brand}
                  </span>
                  <div className="h-[1px] w-8 bg-neutral-300 dark:bg-zinc-700" />
                </div>

                <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-neutral-950 dark:text-white uppercase leading-none mb-3">
                  {currentVehicle.model}
                </h1>

                <p className="text-xs sm:text-sm font-mono tracking-[0.18em] text-neutral-600 dark:text-zinc-400 uppercase mb-6">
                  {currentVehicle.slogan}
                </p>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 p-5 bg-zinc-50/95 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md mb-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-300 dark:to-zinc-600" />

                  {/* Ano */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 dark:text-zinc-400 uppercase">
                        {t.hero.year}
                      </span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider block mt-0.5 tabular-nums">
                        {currentVehicle.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                      <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-500 dark:text-zinc-400 truncate">
                        {currentVehicle.tag || "Showroom Sorocaba"}
                      </span>
                    </div>
                  </div>

                  {/* Combustível / Cor */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 dark:text-zinc-400 uppercase">
                        {t.hero.mileage}
                      </span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider block mt-0.5 tabular-nums">
                        {currentVehicle.km}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                        Laudo Aprovado
                      </span>
                    </div>
                  </div>

                  {/* Motor / Transmissão */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 dark:text-zinc-400 uppercase">
                        {t.hero.power}
                      </span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider block mt-0.5 tabular-nums">
                        {currentVehicle.power}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mt-2.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-400 rounded-full"
                        style={{ width: "86%" }}
                      />
                    </div>
                  </div>

                  {/* Preço à Vista */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 dark:text-zinc-400 uppercase">
                        {t.hero.price}
                      </span>
                      <span className="text-base font-black text-[#DC2626] dark:text-red-400 tracking-wider block mt-0.5 tabular-nums">
                        {currentVehicle.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-600 dark:text-zinc-300 font-semibold">
                        Showroom Jardim Simus
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenVehicleDetail(currentVehicle)}
                    className="relative px-8 py-4 bg-neutral-950 text-white dark:bg-zinc-900 dark:text-white font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#DC2626] dark:hover:bg-[#DC2626] transition-all duration-300 flex items-center gap-2.5 group shadow-md border border-neutral-800 dark:border-zinc-700 overflow-hidden"
                  >
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-300 dark:to-zinc-500" />
                    <ZapStripe size="xs" />
                    <span>{t.hero.discover}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <a
                    href={buildVehicleWhatsAppLink(currentVehicle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 border border-zinc-300 dark:border-zinc-700 hover:border-[#DC2626] hover:bg-[#DC2626]/10 hover:text-[#DC2626] dark:hover:border-red-500 dark:hover:text-red-400 text-neutral-900 dark:text-white font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300"
                  >
                    {t.hero.negotiate}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Framed Real Showroom Photography */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[320px] sm:min-h-[460px] order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVehicle.id}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -15 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => onOpenVehicleDetail(currentVehicle)}
                className="relative w-full h-[320px] sm:h-[460px] flex items-center justify-center cursor-pointer group"
              >
                <div className="relative w-full h-full max-w-[680px] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.22)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-300 dark:to-zinc-600 z-20" />
                  <Image
                    src={currentVehicle.image}
                    alt={`${currentVehicle.brand} ${currentVehicle.model}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 680px"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-200 pointer-events-none">
                    <span>{currentVehicle.brand} · {currentVehicle.year}</span>
                    <span className="text-red-400 font-semibold">@ZAP_MOTORS</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation: Linear Progress Bars & Arrows */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 pb-14 sm:pb-0 sm:pr-64 border-t border-black/10 dark:border-zinc-800">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {showcaseVehicles.map((vehicle, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={vehicle.id}
                  onClick={() => goToSlide(idx)}
                  className={`group flex flex-col gap-1.5 flex-1 sm:w-44 text-left py-1.5 px-2 transition-all duration-300 ${
                    isActive
                      ? "bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-700/80"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-900/30 border border-transparent"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between text-[10px] font-mono tracking-widest transition-colors ${
                      isActive
                        ? "text-[#DC2626] dark:text-red-400 font-bold"
                        : "text-neutral-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />}
                      <span>0{idx + 1}</span>
                    </span>
                    <span className="uppercase">{vehicle.brand}</span>
                  </div>

                  <div className="w-full h-[3px] bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-[#DC2626] via-red-500 to-zinc-300 dark:to-zinc-500 transition-all duration-75"
                      style={{
                        width: isActive ? `${progress}%` : idx < currentIndex ? "100%" : "0%",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 border border-black/15 dark:border-zinc-800 text-neutral-600 dark:text-zinc-400 hover:text-[#DC2626] dark:hover:text-red-400 hover:border-[#DC2626] dark:hover:border-red-400 transition-all active:scale-95"
              aria-label="Veículo Anterior"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 border border-black/15 dark:border-zinc-800 text-neutral-600 dark:text-zinc-400 hover:text-[#DC2626] dark:hover:text-red-400 hover:border-[#DC2626] dark:hover:border-red-400 transition-all active:scale-95"
              aria-label="Próximo Veículo"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
