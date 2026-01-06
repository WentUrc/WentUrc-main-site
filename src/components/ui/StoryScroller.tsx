"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type StoryScrollerBlock = {
  text: string;
};

export type StoryScrollerScreenSize = "mobile" | "tablet" | "desktop";

export interface StoryScrollerProps {
  title: string;
  blocks: StoryScrollerBlock[];
  label?: string;

  titleTopAddon?: React.ReactNode;
  renderTitle?: (title: string) => React.ReactNode;

  scrollPerSectionVh?: number;
  heroScrollRangeVh?: number;
  paragraphsPerSection?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };

  containerClassName?: string;
  labelClassName?: string;
  heroTitleClassName?: string;
  paragraphClassName?: string;

  inactiveBlurPx?: number;

  progressTrackClassName?: string;
  progressBarClassName?: string;

  onLoadedChange?: (loaded: boolean) => void;
  onScrollRatioChange?: (ratio01: number) => void;
  onScreenSizeChange?: (size: StoryScrollerScreenSize) => void;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 1) return arr.map((v) => [v]);
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export default function StoryScroller({
  title,
  blocks,
  label,
  titleTopAddon,
  renderTitle,
  scrollPerSectionVh = 80,
  heroScrollRangeVh = 60,
  paragraphsPerSection = { mobile: 1, tablet: 1, desktop: 1 },
  containerClassName = "fixed inset-0 z-10 flex flex-col px-5 md:px-10 lg:px-16 pointer-events-none",
  labelClassName =
    "block text-xs md:text-sm uppercase tracking-[0.4em] text-cyan-200/70 mb-2 md:mb-4 animate-pulse pointer-events-none",
  heroTitleClassName =
    "text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 drop-shadow-lg pointer-events-none",
  paragraphClassName =
    "text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-slate-200 drop-shadow-md transition-all duration-700 ease-out",
  inactiveBlurPx = 6,
  progressTrackClassName = "absolute bottom-0 left-0 w-full h-[1px] bg-white/10",
  progressBarClassName =
    "absolute bottom-0 left-0 h-[2px] w-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] origin-left",
  onLoadedChange,
  onScrollRatioChange,
  onScreenSizeChange,
}: StoryScrollerProps) {
  const onLoadedChangeRef = useRef(onLoadedChange);
  const onScrollRatioChangeRef = useRef(onScrollRatioChange);
  const onScreenSizeChangeRef = useRef(onScreenSizeChange);

  useEffect(() => {
    onLoadedChangeRef.current = onLoadedChange;
  }, [onLoadedChange]);
  useEffect(() => {
    onScrollRatioChangeRef.current = onScrollRatioChange;
  }, [onScrollRatioChange]);
  useEffect(() => {
    onScreenSizeChangeRef.current = onScreenSizeChange;
  }, [onScreenSizeChange]);

  const [activeIdx, setActiveIdx] = useState(-1);
  const [titleState, setTitleState] = useState({ scale: 1, x: 0, y: 0, opacity: 1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState<StoryScrollerScreenSize>(() => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  });

  const rafRef = useRef<number | null>(null);
  const initialMeasureRef = useRef<number | null>(null);

  const SECTIONS = useMemo(() => {
    const perSection =
      screenSize === "mobile"
        ? paragraphsPerSection.mobile
        : screenSize === "tablet"
          ? paragraphsPerSection.tablet
          : paragraphsPerSection.desktop;
    return chunkArray(blocks, perSection);
  }, [blocks, paragraphsPerSection.desktop, paragraphsPerSection.mobile, paragraphsPerSection.tablet, screenSize]);

  const totalHeight = useMemo(() => {
    return heroScrollRangeVh + SECTIONS.length * scrollPerSectionVh + 30;
  }, [SECTIONS.length, heroScrollRangeVh, scrollPerSectionVh]);

  useEffect(() => {
    const checkScreen = () => {
      const w = window.innerWidth;
      const next: StoryScrollerScreenSize = w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";
      setScreenSize(next);
      onScreenSizeChangeRef.current?.(next);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const measure = useCallback(() => {
    const scrollElement = document.scrollingElement || document.documentElement;
    const scrollY = typeof window !== "undefined" && typeof window.scrollY === "number" ? window.scrollY : scrollElement.scrollTop;
    const vh = window.innerHeight;

    const heroProgress = Math.min(Math.max(scrollY / (vh * (heroScrollRangeVh / 100)), 0), 1);

    setTitleState({
      scale: 1 - heroProgress * 0.4,
      y: -heroProgress * (vh * 0.45),
      x: 0,
      opacity: 1,
    });

    let currentIdx = -1;
    if (heroProgress >= 1) {
      const storyScroll = scrollY - vh * (heroScrollRangeVh / 100);
      const idx = Math.floor(storyScroll / (vh * (scrollPerSectionVh / 100)));
      currentIdx = Math.min(Math.max(idx, 0), Math.max(0, SECTIONS.length - 1));
    }
    setActiveIdx(currentIdx);

    const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
    const ratio01 = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
    onScrollRatioChangeRef.current?.(ratio01);
  }, [SECTIONS.length, heroScrollRangeVh, scrollPerSectionVh]);

  useEffect(() => {
    const root = document.documentElement;
    const originalScrollBehavior = root.style.scrollBehavior;
    const hasScrollRestoration = typeof window !== "undefined" && "scrollRestoration" in window.history;
    const historyObj = window.history as History & { scrollRestoration?: History["scrollRestoration"] };
    const originalScrollRestoration = hasScrollRestoration ? historyObj.scrollRestoration : null;

    root.style.scrollBehavior = "auto";
    if (hasScrollRestoration && originalScrollRestoration) {
      historyObj.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    initialMeasureRef.current = requestAnimationFrame(() => {
      measure();
      initialMeasureRef.current = requestAnimationFrame(() => {
        setIsLoaded(true);
        onLoadedChangeRef.current?.(true);
        initialMeasureRef.current = null;
      });
    });

    return () => {
      root.style.scrollBehavior = originalScrollBehavior;
      if (hasScrollRestoration) {
        historyObj.scrollRestoration = originalScrollRestoration ?? "auto";
      }
      if (initialMeasureRef.current) {
        cancelAnimationFrame(initialMeasureRef.current);
        initialMeasureRef.current = null;
      }
      onLoadedChangeRef.current?.(false);
    };
  }, [measure]);

  useEffect(() => {
    const scheduleMeasurement = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        measure();
        rafRef.current = null;
      });
    };

    scheduleMeasurement();

    window.addEventListener("scroll", scheduleMeasurement, { passive: true });
    document.addEventListener("scroll", scheduleMeasurement, { passive: true, capture: true });
    window.addEventListener("resize", scheduleMeasurement);

    return () => {
      window.removeEventListener("scroll", scheduleMeasurement);
      document.removeEventListener("scroll", scheduleMeasurement, true);
      window.removeEventListener("resize", scheduleMeasurement);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [measure]);

  const progressPercentage = Math.max(0, ((activeIdx + 1) / Math.max(1, SECTIONS.length)) * 100);
  const progressScale = Math.min(Math.max(progressPercentage / 100, 0), 1);
  const heroOpacity = isLoaded ? (activeIdx >= 0 ? 0.8 : 1) : 0;

  return (
    <>
      <div style={{ height: `${totalHeight}vh` }} className="pointer-events-none w-px opacity-0" />

      <div className={containerClassName}>
        <div
          className="origin-bottom-left absolute left-5 md:left-10 lg:left-16 bottom-12 md:bottom-24 w-full max-w-4xl pr-4 pointer-events-none"
          style={{
            transform: `translate3d(${titleState.x}px, ${titleState.y}px, 0) scale(${titleState.scale})`,
            opacity: heroOpacity,
            transition: "opacity 700ms ease-out, transform 600ms ease-out",
            willChange: "transform, opacity",
          }}
        >
          {titleTopAddon ? <div className="mb-2 md:mb-4">{titleTopAddon}</div> : null}
          {label ? <span className={labelClassName}>{label}</span> : null}
          <h1 className={heroTitleClassName}>{renderTitle ? renderTitle(title) : title}</h1>
        </div>

        <div className="absolute left-0 bottom-0 w-full px-5 md:px-10 lg:px-16 pb-10 md:pb-20">
          <div className="relative max-w-2xl pointer-events-none">
            <div className={progressTrackClassName} />
            <div
              className={progressBarClassName}
              style={{
                transform: `scaleX(${isLoaded ? progressScale : 0})`,
                opacity: isLoaded ? Math.max(0.4, progressScale) : 0,
                transition: "opacity 700ms ease-out, transform 700ms ease-out, filter 700ms ease-out",
                filter: `saturate(${1 + progressScale})`,
                willChange: "transform, opacity",
              }}
            />

            {SECTIONS.map((section, index) => {
              const isActive = index === activeIdx;
              return (
                <div
                  key={index}
                  className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 translate-y-12 scale-95 pointer-events-none"
                  }`}
                  style={{
                    filter: isActive ? "blur(0px)" : inactiveBlurPx > 0 ? `blur(${inactiveBlurPx}px)` : "none",
                    transition: inactiveBlurPx > 0 ? "filter 700ms ease-out" : undefined,
                  }}
                >
                  <div className="relative pb-6 md:pb-8">
                    {section.map((block, pIdx) => (
                      <p
                        key={pIdx}
                        className={paragraphClassName}
                        style={{
                          transitionDelay: isActive ? `${120 + pIdx * 60}ms` : "0ms",
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(16px)",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {block.text}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
