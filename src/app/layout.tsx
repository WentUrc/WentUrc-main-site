import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wenturc.com"),
  title: {
    default: "WentUrc — 心念织梦之界",
    template: "%s | WentUrc",
  },
  description: "一个由心念共振所编织的世界：慢与温柔为节拍，爱可唤星辰。",
  openGraph: {
    title: "WentUrc — 心念织梦之界",
    description: "一个由心念共振所编织的世界：慢与温柔为节拍，爱可唤星辰。",
    url: "https://wenturc.com",
    siteName: "WentUrc",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WentUrc — 心念织梦之界",
    description: "一个由心念共振所编织的世界：慢与温柔为节拍，爱可唤星辰。",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-background text-foreground`}
        style={{ overscrollBehavior: 'none' }}
      >
        <Analytics/>
        <Navbar />
        <div className="contents">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
