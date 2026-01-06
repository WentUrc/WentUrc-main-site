import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import Shell from "@/components/Shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. 单独导出 viewport 配置 (Next.js 14+ 推荐做法)
export const viewport: Viewport = {
  themeColor: "#4CABF7", // 比如天蓝色，手机浏览器顶栏会变色哦！
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://revaea.com"),
  
  title: {
    default: "Revaea — 心念织梦之界",
    template: "%s | Revaea",
  },
  
  description: "一个由心念共振所编织的世界：慢与温柔为节拍，爱可唤星辰。",
  
  // 2. 关键词 (Keywords)：虽然Google不太看重，但其他引擎还是会看的喵！
  keywords: ["Revaea", "世界观", "原创设定", "梦境", "Web开发", "心念"],
  
  // 3. 作者与创作者信息
  authors: [{ name: "IGCrystal", url: "https://IGCrystal.icu" }],
  creator: "IGCrystal",
  publisher: "Revaea",
  
  // 4. 规范链接 (Canonical)：告诉搜索引擎“我是正版”，防止重复内容降权
  alternates: {
    canonical: "./",
  },

  // 5. 爬虫控制 (Robots)：热情邀请 Google 进来玩！
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Revaea — 心念织梦之界",
    description: "一个由心念共振所编织的世界：慢与温柔为节拍，爱可唤星辰。",
    url: "https://revaea.com",
    siteName: "Revaea",
    locale: "zh_CN",
    type: "website",
    // 6. OG 图片：虽然 Next.js 支持文件路由，但显式声明更稳妥
    images: [
      {
        url: "/og-image.png", // 建议做一张 1200x630 的帅气封面图放在 public 里
        width: 505,
        height: 339,
        alt: "Revaea World Preview",
    }
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Revaea — 心念织梦之界",
    description: "一个由心念共振所编织的世界：慢与温柔为节拍，爱可唤星辰。",
    creator: "@Cedar2352", 
    images: ["/og-image.png"], 
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple.png", // 苹果设备专用图标
  },
  
  // 7. 应用程序名称 (如果别人把它添加到主屏幕)
  applicationName: "Revaea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" data-scroll-behavior="smooth">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-background text-foreground`}
        style={{ overscrollBehavior: 'none' }}
      >
        <Analytics/>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
