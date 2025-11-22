'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
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

  { type: "paragraph", text: 'Starlight climbed upon her cheek, reflecting upon her short hair white as the first snow. She was the second maiden born beneath the starlight. Many "Dream Weavers" had walked this land named WentUrc before her.' },

  { type: "paragraph", text: 'Not long ago, the harmonious world woven from countless pure intentions welcomed its first note of "Dissonance." That note drew a boundary between tranquil Soul-Flow and violent grief. The sky of Spirit Winds had been lit up twice.' },

  { type: "paragraph", text: 'Two lives drifted from beyond the heavens, falling like meteors and piercing the veil of thoughts to arrive here. She seemed like the reverse side of a coin — the other face of the maiden who came before her. The sky was dotted with deep purple Aether.' },

  { type: "paragraph", text: 'There were no clouds or moon, only the silent silhouettes of floating islands. When she first woke, Xirayu could not see her surroundings clearly because tears blurred her vision. Consciousness and sensation had only just returned.' },

  { type: "paragraph", text: 'Grief then struck like an overwhelming sea, forcing her to cover her face in agony. Her large, soft animal ears drooped weakly, pressed almost flat against her hair. Tears flowed uncontrollably.' },

  { type: "paragraph", text: 'In this world where "Mind is Truth," her shattered soul triggered a collapse in the surrounding reality. Every visitor to WentUrc experiences a rebirth; having "nothing" does not exist here. As long as one has a "Heart," one possesses everything.' },

  { type: "paragraph", text: 'But WentUrc was too "perfect" for her. Since "The End of All Things," her heart had been riddled with holes and she had suffered irreversible damage. The Spirit Winds poured effort into soothing her scars, but those efforts proved futile.' },

  { type: "paragraph", text: 'In a world where many could "Manifest" happiness, she seemed only able to manifest despair. She did not truly reject the darkness; in a closed loop of dead silence she felt a strange comfort. The contrast made her misfortune more acute.' },

  { type: "paragraph", text: 'Occasional golden beams of light flashed through the darkness from nearby "Telepathic Conduit Arrays," the physical forms of others\' joy. To her, they were hideous and painful, stinging her eyes. Laughter from the "Phantom Art Gardens" and Spirit Songs from distant islands aggravated her.' },

  { type: "paragraph", text: 'Her sensitive, fluffy ears trembled as if pierced by a storm whenever sound intruded. If anything stole away the night and silence she loved, the cradle of memory would still hold her up. Even if she did not belong here, the World Will of WentUrc loved her incomparably.' },

  { type: "paragraph", text: 'This peculiar girl loved to sleep and cry; her petite frame and short pale hair made her look like a small lost beast. She wore a blue and white dress that seemed out of place with her sorrow. Pale yellow flower decorations at her waist swayed with her trembling.' },

  { type: "paragraph", text: 'WentUrc pitied her and tried to "Resonate" with her, but she did not much care for these kindnesses. She feared the glittering "Mind Crystals" and preferred the depth of endless night. Benevolent thoughts surged like a tide and she desperately needed a hiding place.' },

  { type: "paragraph", text: 'Those thoughts tried ceaselessly to heal her and she could not bear the disturbance. Amid Gothic shadows and ruined illusions, Xirayu sought quiet corners and familiar caves to insulate herself from "Resonance." She made a habit of finding places that refracted less light.' },

  { type: "paragraph", text: 'Even so, the omnipresent gentle magic was hard to block completely. She crossed mountains and rivers, climbed the highest floating islands, and trod into the deepest forests in search of absolute silence. She walked and walked until she stepped out of a dim passage of her subconscious.' },

  { type: "paragraph", text: 'Ahead she finally saw the boundary between reality and mental imagery and stopped. The sounds she heard were hysterical screams and the scenes before her were the culprits. Bright pillars of light descended from the heavens, tearing the earth apart.' },

  { type: "paragraph", text: 'Her old home had been destroyed and the images tortured her. She wished the pain would last only seconds, but the torture dragged on for hours and hurt unbearably. She recognized faces that should have been dead.' },

  { type: "paragraph", text: 'A voice once commanded her and froze her in place, but that voice soon dissipated. All her connections and bonds with that past world turned to nothingness during that slow, ruthless disaster. She lost everything and then woke in WentUrc, still alone.' },

  { type: "paragraph", text: 'The horizon that should have been a soft dawn was dyed crimson by her imagery, resembling a sea of fire. Tormented by auditory and visual hallucinations, Xirayu knelt at the passage exit. Sharp pain pierced her heart like a blade.' },

  { type: "paragraph", text: 'Her pain and grief were silent yet deafening, causing turbulence in the surrounding Spirit Winds. WentUrc heard and felt this violent "Negative Resonance." She sat at the edge between self-closure and the open world, with voices tearing at her eardrums.' },

  { type: "paragraph", text: 'Her deep eyes stared blankly into the distance, begging that she no longer needed to think or to "Manifest" anything. It was too late to undo the tragedy; time could not flow backward. Still, she wondered if anything could be done—could her tears be wiped away, her scars smoothed?' },

  { type: "paragraph", text: 'A "Plume of Will," condensed from pure benevolence, floated down and more plumes gathered like glowing drizzle. They formed a cocoon-like barrier by "Dream Weaving Arts," isolating her from the blinding light of hope. The plumes sought to calm, distract, or coax her, but her attention remained scattered.' },

  { type: "paragraph", text: 'To match her mood, the Plumes of Will darkened and folded like delicate, cloud-woven fabric until they wrapped her completely. Xirayu raised her head and saw within the barrier not others\' happiness but memories gently reconstructed. The protagonists in those memories were others carrying sadness and mistakes.' },

  { type: "paragraph", text: 'WentUrc had no memories of war, so it showed spiritual dilemmas its residents once faced. She watched quietly as lonely and helpless people wept in the "Clean Tea Dream Circle" and searched the "Memory Library." Even in a magical world, loneliness felt terminal and without cure.' },

  { type: "paragraph", text: 'She saw people of all kinds conversing with shadows in their hearts and clutching fading Mind Crystals representing things passed. The world seemed to tell her she might never be happy again and could give up, but why must it be so? The past is past, yet some brands you bear are shackles you placed upon yourself.' },

  { type: "paragraph", text: 'You are still alive, and in WentUrc where the heart beats, there is the world. A whisper—"Please... Stay."—answered another whisper, and this was the first time she had spoken since arriving. Her voice came through Mind-Sense, hoarse and barely audible.' },

  { type: "paragraph", text: 'She repeated part of the World Will\'s whisper, gritted her teeth, and her childish face twisted with pain. Although WentUrc had given her much love, her response was resentment. Her gaze sharpened and she glared at the barrier of Plumes of Will.' },

  { type: "paragraph", text: 'The Ocean of Mind rippled as scenes inside shifted with the flow of her energy. She watched inner struggles: a man reshaping his face only to see darkness, a woman standing by Silver Vines, and a child in black whose sister was rebuffed. Xirayu smiled silently, treating these attempts to resonate with her as pathetic.' },

  { type: "paragraph", text: 'Despite her disdain, those resonations did affect her and her broken heart shattered further. The pain the world perceived grew stronger and magical elements began to flip and gather. They showed how other people\'s inner worlds fell apart step by step.' },

  { type: "paragraph", text: 'Suffering, struggles, and failures flashed by, gripping her heart and letting out-of-control mental power climb her limbs like poisonous vines. The power bent and twisted around her like malicious chains until sharp branches pressed against her fragile neck. Yet she only sneered, convinced that the weak beating heart did not belong to her.' },

  { type: "paragraph", text: 'The air trembled as if the entire space shuddered and the light in the barrier extinguished. The chains tightened, squeezing her body, but a twisted cyclone of Spirit Wind then swept through. The magical shackles shattered into countless specks of light.' },

  { type: "paragraph", text: 'She fell to the ground with her blue and white skirt spreading, able to bathe again in the gentle morning glow of distant dawn—WentUrc\'s eternal light of healing. Xirayu looked up at the pitch-black sky and then down toward the bright cluster of floating islands, and finally closed her eyes.' },

  { type: "paragraph", text: 'Confusion, anger, and loss swirled within her as the warm light touched her shoulders and warmed her body; she clenched trembling fists. But soon the warmth faded and she opened her eyes again to look into surrounding darkness. WentUrc then formed a brand new high wall of Mind Intent.' },

  { type: "paragraph", text: 'At the end of that passage was scattered sunlight made of countless wishes. Xirayu propped herself up and looked half-risen toward that distant point of light where past memories no longer assaulted her mind. Behind her was the huge void she had just passed through — a reality gap born of inner collapse.' },

  { type: "paragraph", text: 'The void was darker and more bottomless than before, with faintly flickering unformed Mind Crystals within it. Caught between two choices, she had to think again: either let the void swallow her or embrace the terrifying, overly real "Soul-Flow." She knelt on both knees as the wind brushed past her furry ears.' },

  { type: "paragraph", text: 'Angrily she asked what she should do: face everything or give up. The world\'s resonance with her soul faintly answered by asking, "What do you want?" Previously she had answers like quieting thoughts, forgetting, disappearing, feeling pain, or becoming happy, but now she felt uncertain.' },

  { type: "paragraph", text: 'She remembered not only the "Ending" but everything she had experienced; that short life had been mostly happy, so the loss felt especially heavy. Guilt gnawed at her, the belief she had taken everything away and would be tortured forever. She considered the options: use "Manifestation Arts" for false happiness or accept judgment that terrified her.' },

  { type: "paragraph", text: 'In this dilemma she felt she had no right to choose, yet if a choice must be made and two clear paths lay before her, she wondered which to take. The era of uncertain paths was over; the field of view widened and clouds thinned. Starlight dimmed and sunlight lost brightness.' },

  { type: "paragraph", text: 'Her greatest wish to suffer on a cliff of despair would not come true, and paradoxically she now gained the right to choose. This was what WentUrc wanted to see: every soul playing its own movement, even if the tune is sorrow. She stood up as a high wall of Mind Intent dimmed and the mirror ceased to reflect other memories.' },

  { type: "paragraph", text: 'The mirror now reflected only her face: her short hair like moonlight, her tall animal ears, and the pale yellow flower on her chest. Winding paths extended to her left and right and the Spirit Wind brushed through her hair. She felt brand new, as if someone had finally noticed her and a steady hand rested gently on her back.' },

  { type: "paragraph", text: 'Wanting happiness was nothing to be ashamed of, and feeling sadness was not disgraceful either. ' },

  { type: "paragraph", text: 'Xirayu turned around and took the first step forward. '}
];

const HERO_TITLE = RAW_CONTENT[0].text;
const STORY_PARAGRAPHS = RAW_CONTENT.slice(1);

const SCROLL_PER_SECTION = 80;
const HERO_SCROLL_RANGE = 60;

const PARAGRAPHS_PER_SECTION = {
  mobile: 1,
  tablet: 1,
  desktop: 1,
};

function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 1) return arr.map((v) => [v]);
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export default function XirayuPage() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [saturation, setSaturation] = useState(0);
  const [titleState, setTitleState] = useState({ scale: 1, x: 0, y: 0, opacity: 1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile'|'tablet'|'desktop'>(() => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    if (w < 640) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  });

  const rafRef = useRef<number | null>(null);
  const initialMeasureRef = useRef<number | null>(null);

  const pageConfig = useMemo(() => ({
    ...baseConfig,
    glow: screenSize === 'mobile' ? 0.30 : 0.42,
  }), [screenSize]);

  const SECTIONS = useMemo(() => {
    const perSection = screenSize === 'mobile'
      ? PARAGRAPHS_PER_SECTION.mobile
      : screenSize === 'tablet'
        ? PARAGRAPHS_PER_SECTION.tablet
        : PARAGRAPHS_PER_SECTION.desktop;
    return chunkArray(STORY_PARAGRAPHS, perSection);
  }, [screenSize]);

  const totalHeight = useMemo(() => {
    return HERO_SCROLL_RANGE + (SECTIONS.length * SCROLL_PER_SECTION) + 30;
  }, [SECTIONS.length]);

  useEffect(() => {
    const checkScreen = () => {
      const w = window.innerWidth;
      setScreenSize(w < 640 ? 'mobile' : (w < 1024 ? 'tablet' : 'desktop'));
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const measure = useCallback(() => {
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
      currentIdx = Math.min(Math.max(idx, 0), Math.max(0, SECTIONS.length - 1));
    }
    setActiveIdx(currentIdx);

    const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
    const saturationValue = maxScroll > 0 ? (scrollY / maxScroll) * 2.5 : 0;
    setSaturation(saturationValue);
  }, [SECTIONS.length]);

  useEffect(() => {
    const root = document.documentElement;
    const originalScrollBehavior = root.style.scrollBehavior;
    const hasScrollRestoration = typeof window !== 'undefined' && 'scrollRestoration' in window.history;
    const historyObj = window.history as History & { scrollRestoration?: History['scrollRestoration'] };
    const originalScrollRestoration = hasScrollRestoration ? historyObj.scrollRestoration : null;

    root.style.scrollBehavior = 'auto';
    if (hasScrollRestoration && originalScrollRestoration) {
      historyObj.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    initialMeasureRef.current = requestAnimationFrame(() => {
      measure();
      initialMeasureRef.current = requestAnimationFrame(() => {
        setIsLoaded(true);
        initialMeasureRef.current = null;
      });
    });

    return () => {
      root.style.scrollBehavior = originalScrollBehavior;
      if (hasScrollRestoration) {
        historyObj.scrollRestoration = originalScrollRestoration ?? 'auto';
      }
      if (initialMeasureRef.current) {
        cancelAnimationFrame(initialMeasureRef.current);
        initialMeasureRef.current = null;
      }
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
    <main className="relative w-full bg-black text-white overflow-x-hidden">
      <Link
        href="/"
        className={`fixed top-6 left-5 md:top-8 md:left-10 lg:left-16 z-50 inline-flex items-center gap-2 text-xs md:text-sm font-light tracking-[0.45em] uppercase text-white/70 hover:text-white transition-all duration-500 group
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
        <span className="tracking-[0.55em]">BACK</span>
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

      <div className="fixed inset-0 z-10 flex flex-col px-5 md:px-10 lg:px-16 pointer-events-none">
        <div
          className="origin-bottom-left absolute left-5 md:left-10 lg:left-16 bottom-12 md:bottom-24 w-full max-w-4xl pr-4 pointer-events-none"
          style={{
            transform: `translate3d(${titleState.x}px, ${titleState.y}px, 0) scale(${titleState.scale})`,
            opacity: heroOpacity,
            transition: 'opacity 700ms ease-out, transform 600ms ease-out',
            willChange: 'transform, opacity'
          }}
        >
          <span className="block text-xs md:text-sm uppercase tracking-[0.4em] text-cyan-200/70 mb-2 md:mb-4 animate-pulse pointer-events-none">
            Realm of Xirayu
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 drop-shadow-lg pointer-events-none">
            {HERO_TITLE}
          </h1>
        </div>

        <div className="absolute left-0 bottom-0 w-full px-5 md:px-10 lg:px-16 pb-10 md:pb-20">
          <div className="relative max-w-2xl pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
            <div
              className="absolute bottom-0 left-0 h-[2px] w-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] origin-left"
              style={{
                transform: `scaleX(${isLoaded ? progressScale : 0})`,
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                willChange: 'transform, opacity'
              }}
            />

            {SECTIONS.map((section, index) => {
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
                    {section.map((block, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-slate-200 drop-shadow-md transition-all duration-700 ease-out"
                        style={{
                          transitionDelay: isActive ? `${120 + pIdx * 60}ms` : "0ms",
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(16px)",
                          marginBottom: '0.75rem'
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
    </main>
  );
}
