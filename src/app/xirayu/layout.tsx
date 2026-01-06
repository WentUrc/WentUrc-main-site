import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Xirayu — The Rain of Oblivion | Revaea", 
  },

  description: "If IGCrystal looks toward the future, Xirayu lingers in the past. Explore a realm of nostalgia where memories refuse to fade.", 

  openGraph: {
    title: "Xirayu — The Rain of Oblivion",
    description: "Time settles like dust in the fading light. Old fragments float like stars beneath the water, shimmering yet unreachable. A quiet frost on old scars, where time has no echo.",
    locale: "en_US", 
    url: "https://revaea.com/xirayu",
    siteName: "Revaea", 
    images: [
      {
        url: "https://revaea.com/revaea-2.png", 
        width: 2816,          
        height: 1536,
        alt: "Xirayu - The Rain of Oblivion Character Art",
      },
    ],
    type: "article",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Xirayu — The Rain of Oblivion",
    description: "Time settles like dust in the fading light. Old fragments float like stars beneath the water, shimmering yet unreachable. A quiet frost on old scars, where time has no echo.",
    images: ["https://revaea.com/revaea-2.png"], 
  },

  alternates: {
    canonical: "https://revaea.com/xirayu",
  },
};

export default function XirayuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}