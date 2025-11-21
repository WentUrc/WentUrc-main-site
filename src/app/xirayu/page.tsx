'use client';

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FlowingSphereBackground from "@/components/ui/FlowingSphere";

const baseConfig = {
  noise: 0.0, 
  bloom: 1.21, 
  hueShift: -0.03,
  satMin: 0.0, 
  satMax: 2.5, 
  satSpeed: 0.0,
  radius: 0.5, 
  scale: 1.0, 
  offsetY: 0.0,
} as const;

const RAW_CONTENT = [
  { type: "heading", text: "Another Story - Inspired by Maya from Arcaea" },
  { type: "paragraph", text: "Starlight climbed upon her cheek, reflecting upon her short hair, white as the first snow. She was the second maiden born beneath the starlight. Before her, many \"Dream Weavers\" had walked this land named WentUrc, and not long ago the harmonious world, woven from countless pure intentions, welcomed its first note of \"Dissonance,\" drawing a boundary between tranquil Soul-Flow and violent grief." },
  { type: "paragraph", text: "The eternally gentle sky of Spirit Winds had been lit up twice, two lives drifting from beyond the heavens like meteors piercing the veil of thoughts. When she first woke, Xirayu could not see her surroundings clearly—tears obscured her vision even as consciousness returned and grief crashed over her like an overwhelming sea." },
  { type: "paragraph", text: "Those large, soft animal ears drooped weakly, pressed almost flat against her hair as tears flowed uncontrollably, and in this world where 'Mind is Truth,' her shattered soul instantly collapsed the reality nearby. " },
  { type: "paragraph", text: "Every visitor to WentUrc welcomes their own rebirth—here, to have 'nothing' does not exist, for as long as one has a 'Heart' one possesses everything—yet that very perfection revealed how, since 'The End of All Things,' her heart had long been riddled with holes. Though the Spirit Winds poured their utmost effort into soothing her scars, it was ultimately to no avail." },
  { type: "paragraph", text: "She did not reject the darkness; within the closed loop of dead silence she felt at ease. Whenever laughter rose from the \"Phantom Art Gardens\" or Spirit Songs drifted from distant floating islands, her sensitive ears trembled as if a sharp storm were screaming in them." },
  { type: "paragraph", text: "If anything stole away the night and silence she loved, the cradle of memory held her even though she felt she did not belong, for the World Will of WentUrc loved her incomparably. She loved to sleep and cry—petite frame, short pale hair, unique ears, and a blue-and-white dress whose sky-light hem trembled with her sorrow." },
  { type: "paragraph", text: "WentUrc pitied her and tried to 'Resonate,' yet she feared the glittering 'Mind Crystals' because she preferred the tranquility and depth of endless night. To the girl who made the world her home, the high heavens became her dome, but benevolent thoughts surged like a tide toward any hiding place she found, and she could not bear the disturbance." },
  { type: "paragraph", text: "Amid shadows of Gothic towers and illusions of ruins, Xirayu memorized every quiet corner that could insulate her against 'Resonance,' turning the search for silence into habit. She crossed mountains and rivers, climbed floating islands, and ventured into the deepest forests until a dim passage born of her subconscious opened toward the boundary between reality and mental imagery—and there she stopped." },
  { type: "paragraph", text: "The sounds were hysterical screams and the pillars of light tearing the earth apart were the culprits that destroyed her old home. She recognized those on the other side, knowing they should be dead, heard a voice command her before it vanished, and watched every bond turn to nothingness in that slow, ruthless disaster." },
  { type: "paragraph", text: "She lost everything and woke in WentUrc still alone, the horizon that ought to be a soft dawn dyed crimson by her own mental imagery like sunset or a sea of fire. Tormented by countless hallucinations, she knelt at the passage exit as sharp pain pierced her heart, her fear manifesting as waves of black thorns that shattered the surrounding tranquility." },
  { type: "paragraph", text: "The pathetic fact that made her life worse than death reminded her again and again: 'I am still here,' and even the Spirit Winds felt the violence of that negative resonance. She sat at the junction of self-closure and the open world while voices tore at her ears and her eyes begged to stop manifesting anything, yet time could not flow backward and history would not change, leaving her to wonder whether anything could smooth such scars." },
  { type: "paragraph", text: "A 'Plume of Will' condensed from pure benevolence floated down, followed by more until they formed a cocoon-like barrier woven through Dream Weaving Arts that offered the dimness she desired. Attempts to calm or coax her seemed futile, so the plumes darkened to match her mind, folding like soft fabric until they wrapped her completely." },
  { type: "paragraph", text: "Her drooping ears twitched despite her flinch, and she eventually looked up to see the barrier reflecting memories gently reconstructed. The protagonists were others—those whose sadness, pain, and mistakes WentUrc remembered—and she watched quietly." },
  { type: "paragraph", text: "There were no rivers of blood or seas of fire, only lonely people weeping in the 'Clean Tea Dream Circle' or searching lost chapters in the 'Memory Library.' She pondered as she observed men, women, young, and old converse with their shadows, clutching fading Mind Crystals." },
  { type: "paragraph", text: "The world seemed to whisper: You feel you will never be happy again, you feel you might as well give up—but why must it be so? The past is indeed past and its brand remains, yet many brands are shackles you forged yourself; your heart still beats here, and in WentUrc, where the heart beats, there is the world." },
  { type: "paragraph", text: "'... Please... Stay.'—a whisper answered another whisper, her first words since arriving, carried through Mind-Sense despite her hoarse throat. She gritted her teeth, childish face twisting with pain, aware of how much love this gentle cradle offered even as she repaid it with resentment." },
  { type: "paragraph", text: "Her gaze sharpened toward the barrier of Plumes of Will while the scenes shifted with her mind, casting aside the gentle soothing emotions. The Ocean of Mind rippled as WentUrc revealed how others' inner worlds fractured step by step." },
  { type: "paragraph", text: "Xirayu smiled—a silent yet unrestrained mockery of attempts to resonate with her—and the more her heart shattered, the more magic gathered around her. Brighter and closer, it exposed the suffering, struggles, and failures of others, gripping her heart along with her own destroyed world as mental power coiled like poisonous vines around her limbs." },
  { type: "paragraph", text: "Yet she only sneered, convinced the weakly beating heart was not hers. The air trembled, the barrier's light extinguished, mental chains tightened, and then a violent cyclone of Spirit Wind shattered the shackles into countless specks of light." },
  { type: "paragraph", text: "She fell to the ground, blue-and-white skirt spreading as she bathed once more in WentUrc's gentle dawn. Looking up at the pitch-black sky and down at the glow of floating islands, she closed her eyes, felt warmth on her shoulders, then opened them to the surrounding darkness again." },
  { type: "paragraph", text: "WentUrc found her once more, shaping a new high wall—shadow and radiance forming a passage with scattered sunlight at its end. Propping herself up, she glanced back at the reality void she had left, a yawning maw where unformed Mind Crystals flickered within the darkness." },
  { type: "paragraph", text: "Caught between two choices, she understood a decision had to be made: let the comfortable void swallow her or embrace the terrifying, vividly real Soul-Flow. Kneeling as the wind brushed her ears, she demanded, 'What exactly do you want me to do? Face everything, or just give up?'" },
  { type: "paragraph", text: "A question answered her question—the resonance of the world with her soul whispered: What do you want? She once believed she knew, craving silence, forgetting, disappearance, pain, injury, even happiness, yet every desire now echoed hollowly." },
  { type: "paragraph", text: "Facing it anew, she sensed that one of her old answers might still be true. That short life had mostly been happy, which made the loss unbearably heavy, and the guilt of feeling responsible for everything lingered as endless torment." },
  { type: "paragraph", text: "She stayed silent but looked forward, recognizing that Manifestation Arts could fabricate joy she did not deserve and judgment still terrified her, leaving her feeling unworthy of any choice. Yet the era of uncertain paths had ended, the drifting clouds thinned, and even sorrow could compose its own movement." },
  { type: "paragraph", text: "On the contrary, she now held the right to choose—exactly what WentUrc hoped every soul could obtain. She stood before the high wall of Mind Intent as its light dimmed and the mirror reflected only her own face." },
  { type: "paragraph", text: "She studied her reflection—moonlit short hair, tall ears, the crimson petal on her chest that did not belong to this world—and noticed winding paths stretching to either side. Spirit Wind brushed through her hair as if a steady hand at last rested on her back." },
  { type: "paragraph", text: "Wanting happiness is nothing to be ashamed of, and feeling sadness is not either; look straight into your heart, face reality, then choose—that is enough. " },
  { type: "paragraph", text: "Xirayu turned around and took the first step forward." },
];

const HERO_TITLE = RAW_CONTENT[0].text; 
const STORY_PARAGRAPHS = RAW_CONTENT.slice(1); 

const SCROLL_PER_SECTION = 80; 
const HERO_SCROLL_RANGE = 60; 

export default function XirayuPage() {
  const [activeIdx, setActiveIdx] = useState(-1); 
  const [saturation, setSaturation] = useState(0);
  const [titleState, setTitleState] = useState({ scale: 1, x: 0, y: 0, opacity: 1 });
  const [isLoaded, setIsLoaded] = useState(false); 
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pageConfig = useMemo(() => ({
     ...baseConfig,
     glow: isSmallScreen ? 0.30 : 0.42, 
  }), [isSmallScreen]);

  const totalHeight = useMemo(() => {
    return HERO_SCROLL_RANGE + (STORY_PARAGRAPHS.length * SCROLL_PER_SECTION) + 30; 
  }, []);

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const originalScrollBehavior = root.style.scrollBehavior;
    const hasScrollRestoration = typeof window !== 'undefined' && 'scrollRestoration' in window.history;
    const originalScrollRestoration = hasScrollRestoration ? window.history.scrollRestoration : null;

    root.style.scrollBehavior = 'auto';
    if (hasScrollRestoration && originalScrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    const rafId = requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    return () => {
      root.style.scrollBehavior = originalScrollBehavior;
      if (hasScrollRestoration) {
        window.history.scrollRestoration = originalScrollRestoration ?? 'auto';
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const scrollElement = document.scrollingElement || document.documentElement;
      const scrollY = typeof window !== "undefined" && typeof window.scrollY === "number"
        ? window.scrollY
        : scrollElement.scrollTop;
      const vh = window.innerHeight;

      const heroProgress = Math.min(Math.max(scrollY / (vh * (HERO_SCROLL_RANGE / 100)), 0), 1);

      setTitleState({
        scale: 1 - heroProgress * 0.4,
        y: -heroProgress * (vh * 0.45),
        x: 0,
        opacity: 1,
      });

      let currentIdx = -1;
      if (heroProgress >= 1) {
        const storyScroll = scrollY - vh * (HERO_SCROLL_RANGE / 100);
        const idx = Math.floor(storyScroll / (vh * (SCROLL_PER_SECTION / 100)));
        currentIdx = Math.min(Math.max(idx, 0), STORY_PARAGRAPHS.length - 1);
      }
      setActiveIdx(currentIdx);

      const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
      const saturationValue = maxScroll > 0 ? (scrollY / maxScroll) * 2.5 : 0;
      setSaturation(saturationValue);
    };

    const scheduleMeasurement = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        measure();
        rafRef.current = null;
      });
    };

    const initialId = requestAnimationFrame(() => {
      measure();
    });

    window.addEventListener("scroll", scheduleMeasurement, { passive: true });
    document.addEventListener("scroll", scheduleMeasurement, { passive: true, capture: true });
    window.addEventListener("resize", scheduleMeasurement);

    scheduleMeasurement();

    return () => {
      cancelAnimationFrame(initialId);
      window.removeEventListener("scroll", scheduleMeasurement);
      document.removeEventListener("scroll", scheduleMeasurement, true);
      window.removeEventListener("resize", scheduleMeasurement);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const progressPercentage = Math.max(0, ((activeIdx + 1) / STORY_PARAGRAPHS.length) * 100);

  return (
    <main className="relative w-full bg-black text-white overflow-x-hidden">
      <Link 
        href="/" 
        className={`fixed top-6 left-6 md:top-8 md:left-8 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-500 group
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
      >
        <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white" />
      </Link>

      <FlowingSphereBackground
        className={`pointer-events-none select-none fixed inset-0 transition-opacity duration-[1200ms] ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ zIndex: 0 }}
        config={pageConfig}
        saturationOverride={saturation}
      />
      <div
        className={`fixed inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent lg:hidden transition-opacity duration-[1200ms] ease-out ${isLoaded ? "opacity-80" : "opacity-0"}`}
      />
      <div style={{ height: `${totalHeight}vh` }} className="pointer-events-none w-px opacity-0" />
      <div 
        className="fixed inset-0 z-10 flex flex-col px-5 md:px-10 lg:px-16 pointer-events-none"
      >
        <div 
          className={`origin-bottom-left absolute left-5 md:left-10 lg:left-16 bottom-12 md:bottom-24 w-full max-w-4xl transition-opacity duration-1000 ease-out pr-4
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
          style={{
            transform: `translate3d(${titleState.x}px, ${titleState.y}px, 0) scale(${titleState.scale})`,
            opacity: activeIdx >= 0 ? 0.8 : 1, 
            willChange: 'transform, opacity'
          }}
        >
            <span className="block text-xs md:text-sm uppercase tracking-[0.4em] text-cyan-200/70 mb-2 md:mb-4 animate-pulse">
              Realm of Xirayu
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 drop-shadow-lg">
              {HERO_TITLE}
            </h1>
        </div>
        <div className="absolute left-0 bottom-0 w-full px-5 md:px-10 lg:px-16 pb-10 md:pb-20">
            <div className="relative max-w-2xl">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
                <div 
                  className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-700 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{ width: activeIdx >= 0 ? `${progressPercentage}%` : '0%' }}
                />

                {STORY_PARAGRAPHS.map((block, index) => {
                  const isActive = index === activeIdx;
                  return (
                    <div
                      key={index}
                      className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out
                        ${isActive ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-12 scale-95 pointer-events-none"}`}
                      style={{
                        filter: isActive ? "blur(0px)" : "blur(6px)",
                        transition: "filter 700ms ease-out",
                      }}
                    >
                      <div className="relative pb-6 md:pb-8">
                        <p
                          className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-slate-200 drop-shadow-md transition-all duration-700 ease-out"
                          style={{
                            transitionDelay: isActive ? "120ms" : "0ms",
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? "translateY(0)" : "translateY(16px)",
                          }}
                        >
                          {block.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
        </div>
      </div>
    </main>
  );
}