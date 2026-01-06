import type { Metadata } from "next";
import type { ReactNode } from "react";
import BayHynShell from "./BayHyn";

const title = "BayHyn - To Learn: A Gentle Response to the Unknown";
const description = "Responding to the unknown with gentleness through learning. A collection of thoughts on slow growth, patience, and finding trust in the world.";
const url = "https://revaea.com/bayhyn";

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: url,
  },

  openGraph: {
    title: title,
    description: description,
    siteName: "Revaea",
    locale: "en_US",
    type: "article",
    url: url,
    images: [
      {
        url: "https://revaea.com/og-image.png", 
        width: 505,
        height: 339,
        alt: "BayHyn - To Learn",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    creator: "@Cedar2352", 
    images: ["https://revaea.com/og-image.png"],
  },
  
  keywords: ["Revaea", "BayHyn", "Learning", "Philosophy", "Essays", "Mindfulness"],
};

export default function BayHynLayout({ children }: { children: ReactNode }) {
  return <BayHynShell>{children}</BayHynShell>;
}