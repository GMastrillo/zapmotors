"use client";

import React from "react";

interface ZapStripeProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export function BigaStripe({ size = "md", className = "" }: ZapStripeProps) {
  const sizeClasses = {
    xs: "h-2.5 gap-[2px]",
    sm: "h-3.5 gap-[2px]",
    md: "h-5 gap-[3px]",
    lg: "h-7 gap-1",
  };

  const barClass = {
    xs: "h-2.5 w-1",
    sm: "h-3.5 w-1.5",
    md: "h-5 w-2",
    lg: "h-7 w-2.5",
  };

  return (
    <div
      className={`inline-flex items-center -skew-x-12 select-none ${className}`}
      aria-hidden="true"
    >
      <div className={`flex items-center ${sizeClasses[size]}`}>
        {/* Faixa 1: Vermelho Zap Racing */}
        <span className={`${barClass[size]} bg-[#DC2626] rounded-[0.5px]`} />
        {/* Faixa 2: Vermelho Escuro */}
        <span className={`${barClass[size]} bg-[#991B1B] rounded-[0.5px]`} />
        {/* Faixa 3: Prata Metálico / Cromado */}
        <span className={`${barClass[size]} bg-neutral-900 dark:bg-zinc-200 rounded-[0.5px]`} />
      </div>
    </div>
  );
}

export const ZapStripe = BigaStripe;

export function BigaGradientLine({
  className = "",
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <div
        className={`w-[2px] bg-gradient-to-b from-[#DC2626] via-[#EF4444] to-zinc-300 dark:to-zinc-700 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`h-[2px] w-full bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-zinc-300 dark:to-zinc-700 ${className}`}
      aria-hidden="true"
    />
  );
}

export const ZapGradientLine = BigaGradientLine;

export function BigaBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 bg-zinc-900/95 text-zinc-100 border border-zinc-700/70 text-[10px] font-mono tracking-widest uppercase shadow-sm ${className}`}
    >
      <BigaStripe size="xs" />
      <span>{children}</span>
    </div>
  );
}

export const ZapBadge = BigaBadge;
