import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xirayu | Revaea - 心念织梦之界",
};

export default function XirayuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}