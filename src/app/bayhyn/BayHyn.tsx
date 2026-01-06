"use client";

import { createContext, useContext, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Whirlpool from "@/components/ui/Whirlpool"; 
import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { MENU_ITEMS, SOCIAL_ITEMS } from "@/config/menu";

type BayHynBackgroundContextValue = {
  setScrollRatio: (ratio01: number) => void;
};

const BayHynBackgroundContext = createContext<BayHynBackgroundContextValue | null>(null);

export function useBayHynBackground() {
  const ctx = useContext(BayHynBackgroundContext);
  if (!ctx) {
    throw new Error("useBayHynBackground must be used within BayHynShell");
  }
  return ctx;
}

export default function BayHynShell({ children }: { children: React.ReactNode }) {
  const [scrollRatio, setScrollRatio] = useState(0);
  const saturation = useMemo(() => {
    const r = Math.min(1, Math.max(0, scrollRatio));
    return 0 + 0.6 * r;
  }, [scrollRatio]);

  return (
    <BayHynBackgroundContext.Provider value={{ setScrollRatio }}>
      <main className="relative w-full min-h-screen overflow-x-hidden bg-[#020617]">
      
      <Link
        href="/"
        className="fixed top-6 left-5 md:top-8 md:left-10 lg:left-16 z-50 inline-flex items-center gap-2 text-xs md:text-sm font-light tracking-[0.45em] uppercase text-white/70 hover:text-white transition-all duration-500 group mix-blend-difference"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
        <span className="tracking-[0.55em]">BACK</span>
      </Link>

      <StaggeredMenu
        position="right"
        items={MENU_ITEMS}
        socialItems={SOCIAL_ITEMS}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="rgba(255, 255, 255, 0.7)"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={["#9eb6efff", "#2788ffff"]} 
        accentColor="#38bdf8"
        isFixed={true}
        displayLogo={false}
        toggleClassName="fixed top-6 right-5 md:top-8 md:right-10 lg:right-16 z-50 text-xs md:text-sm font-light tracking-[0.45em] uppercase transition-all duration-500 hover:text-white mix-blend-difference"
        toggleStyle={{ fontFamily: "var(--font-geist-mono)" }}
      />

      <div className="fixed inset-0 z-0 h-dvh w-screen">
        <Whirlpool 
            className="h-full w-full" 
            blur={0} 
            particleCount={100} 
            spread={600}
            enablePointerTracking={false}
            attractionStrength={0}
            saturation={saturation}
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/70" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,theme(colors.sky.400/0.10),transparent_55%),radial-gradient(circle_at_70%_75%,theme(colors.indigo.400/0.10),transparent_50%)]" />
        </Whirlpool>
      </div>

      <div className="relative z-10">
        {children}
      </div>
      
      </main>
    </BayHynBackgroundContext.Provider>
  );
}