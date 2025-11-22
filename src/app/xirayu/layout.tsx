import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xirayu | WentUrc - 心念织梦之界",
};

export default function XirayuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}