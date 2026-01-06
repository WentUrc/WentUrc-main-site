import type { Metadata } from "next";
import type { ReactNode } from "react";
import BayHynShell from "./BayHyn";

export const metadata: Metadata = {
  title: "BayHyn - To Learn: A Gentle Response to the Unknown",
  description:
    "Responding to the Unknown with Gentleness through Learning",
  alternates: {
    canonical: "/bayhyn",
  },
  openGraph: {
    title: "BayHyn - To Learn: A Gentle Response to the Unknown",
    description:
      "Responding to the Unknown with Gentleness through Learning",
    siteName: "Revaea",
    locale: "en_US",
    type: "article",
    url: "https://revaea.com/bayhyn",
  },
  twitter: {
    card: "summary",
    title: "To Learn: A Gentle Response to the Unknown",
    description:
      "Responding to the Unknown with Gentleness through Learning",
  },
};

export default function BayHynLayout({ children }: { children: ReactNode }) {
  return <BayHynShell>{children}</BayHynShell>;
}
