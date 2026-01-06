'use client';

import { useState } from "react";
import StoryScroller from "@/components/ui/StoryScroller";
import XirayuShell from "./Xirayu";

const RAW_CONTENT = [
  { type: "heading", text: "The Rain of Oblivion" },

  {
    type: "paragraph",
    text: "Time settles slowly in the air—like a layer of dust-light, stroked again and again, resting upon a past that has not yet fully cooled.",
  },
  {
    type: "paragraph",
    text: "Fragments of old days drift in the deep of memory, like star-reflections beneath the surface of water: gently wavering, yet refusing to go out.",
  },
  {
    type: "paragraph",
    text: "When the wind passes, it takes away the sharp outlines, leaving only texture and residual warmth, echoing again and again through blankness.",
  },
  {
    type: "paragraph",
    text: "Moments once bright are folded into soft pleats and tucked into the dark pocket of years; now and then, a quiet glimmer seeps out, reminding me they never truly left.",
  },
  {
    type: "paragraph",
    text: "Dusk is always the best hour for remembrance.",
  },
  {
    type: "paragraph",
    text: "Light becomes hesitant, shadows stretch long, and even meaning itself begins to blur.",
  },
  {
    type: "paragraph",
    text: "Unfinished emotions, like a stalled tide, keep testing the edge of the heart-lake—never spilling over, only leaving a low, lingering reverberation.",
  },
  {
    type: "paragraph",
    text: "When night covers everything, memory turns clearer instead.",
  },
  {
    type: "paragraph",
    text: "It is like frost settling on old marks—cold and transparent, impossible to ignore.",
  },
  {
    type: "paragraph",
    text: "Remembrance is not a return, but a kind of stillness: letting what is gone slowly develop in time, recovering its original shape in undisturbed darkness.",
  },
  {
    type: "paragraph",
    text: "When all sounds sink to the bottom and only a breath-like rhythm remains, the past is placed gently, as if properly put away. At the end of silence, remembrance becomes a faint yet enduring light, illuminating the last instant before forgetting.",
  },
  {
    type: "paragraph",
    text: "If Bingganjing faces the future, then Xiwangyu pauses within memory.",
  },
  {
    type: "paragraph",
    text: "Everything in the past once felt so beautiful.",
  },
  {
    type: "paragraph",
    text: "Yellowed photographs hang quietly on the wall, yet thoughts come rushing like a tide, battering every nerve in my mind.",
  },
  {
    type: "paragraph",
    text: "The warmth in my mother's arms feels as if it still lingers; those first unsteady steps gradually became sure.",
  },
  {
    type: "paragraph",
    text: "Days spent with family, one after another, quietly paved themselves into a warm road.",
  },
  {
    type: "paragraph",
    text: "Do you remember the time we camped in the mountains with friends? The campfire flickered, lighting not only the night but also our clumsy, sincere friendship.",
  },
  {
    type: "paragraph",
    text: "Standing by great rivers, staring at the far bank, laughter from catching fish and shrimp mingled with the sound of water.",
  },
  {
    type: "paragraph",
    text: "And that first time crossing by steam ferry—the excitement that nearly overflowed—still trembles softly, deep in my chest.",
  },
  {
    type: "paragraph",
    text: "But none of it can be reached again.",
  },
  {
    type: "paragraph",
    text: "The past did not suddenly abandon me. It simply retreated without a sound, leaving me no time to say goodbye.",
  },
  {
    type: "paragraph",
    text: "Those beautiful memories faded little by little in time; I reached out to grasp them, and caught only blankness.",
  },
  {
    type: "paragraph",
    text: "Whenever I think of this, grief rises like a tide until it is hard to breathe.",
  },
  {
    type: "paragraph",
    text: "If only I could live it once more.",
  },
  {
    type: "paragraph",
    text: "Even if only to walk that old road again, to stand once more by that riverbank, to feel once more the present that I did not know was precious.",
  },
  {
    type: "paragraph",
    text: "But time has no echo.",
  },
  {
    type: "paragraph",
    text: "It leaves only memory, teaching us—through loss—to learn, slowly, how to cherish.",
  },
  {
    type: "paragraph",
    text: "I stood before those photographs for a long time without moving.",
  },
  {
    type: "paragraph",
    text: "The paper has grown tiny ripples; the corners curl slightly, as if resisting time's final erosion.",
  },
  {
    type: "paragraph",
    text: "I know that one day they will fade completely—like so many faces whose features I can no longer recall.",
  },
  {
    type: "paragraph",
    text: "Yet in this moment, they still exist with stubborn insistence.",
  },
  {
    type: "paragraph",
    text: "They exist where I have not yet let go.",
  },
  {
    type: "paragraph",
    text: "Memory does not always arrive as images.",
  },
  {
    type: "paragraph",
    text: "More often, it is a feeling: a chest that suddenly tightens, a pause with no reason, a sourness that rises in the quietest hours of night.",
  },
  {
    type: "paragraph",
    text: "I do not look back on purpose; when the world slows down, the past simply walks out on its own.",
  },
  {
    type: "paragraph",
    text: "I once believed the pain of remembering was caused by loss.",
  },
  {
    type: "paragraph",
    text: "Only later did I understand what is truly unbearable: the happiness I did not recognize at the time.",
  },
  {
    type: "paragraph",
    text: "It was too light.",
  },
  {
    type: "paragraph",
    text: "So light that, while it was in my hands, it had no weight at all; so light that, once it was gone, it could never be carried again.",
  },
  {
    type: "paragraph",
    text: "Night deepened.",
  },
  {
    type: "paragraph",
    text: "Outside the window, wind stirred the shadows of trees, making a sound almost like breathing.",
  },
  {
    type: "paragraph",
    text: "I closed my eyes and let those images sink one by one into the dark.",
  },
  {
    type: "paragraph",
    text: "They were no longer sharp, no longer forcing me back to the past—only resting there quietly, like a river that has been marked, reminding me I once walked along its banks.",
  },
  {
    type: "paragraph",
    text: "Perhaps Xiwangyu lingers in memory not because it refuses to move forward.",
  },
  {
    type: "paragraph",
    text: "But because—someone must remember those moments that have already gone far away, and remember how real they once were.",
  },
  {
    type: "paragraph",
    text: "At last I turned and walked away from that wall.",
  },
  {
    type: "paragraph",
    text: "Not as a farewell.",
  },
  {
    type: "paragraph",
    text: "But to carry them away gently.",
  },
  {
    type: "paragraph",
    text: "Time will not turn back, but I can.",
  },
  {
    type: "paragraph",
    text: "Not to return to the past, but to carry it forward.",
  },
];

const HERO_TITLE = RAW_CONTENT[0].text;
const STORY_PARAGRAPHS = RAW_CONTENT.slice(1);

export default function XirayuPage() {
  const [saturation, setSaturation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile'|'tablet'|'desktop'>(() => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    if (w < 640) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  });
  return (
    <XirayuShell isLoaded={isLoaded} saturation={saturation} screenSize={screenSize}>
      <StoryScroller
        title={HERO_TITLE}
        blocks={STORY_PARAGRAPHS}
        label="Realm of Xirayu"
        onLoadedChange={setIsLoaded}
        onScrollRatioChange={(r) => setSaturation(r * 2.5)}
        onScreenSizeChange={(s) => setScreenSize(s)}
      />
    </XirayuShell>
  );
}