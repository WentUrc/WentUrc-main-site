import Link from "next/link";
import Image from "next/image";
import { Feather, Sparkles, Heart, Users, Wand2, Music, Coffee, BookOpen, Palette, Share2, MoonStar, Gem, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BlurText from "@/components/ui/BlurText";
import BackgroundWithMask from "@/components/ui/BackgroundWithMask";
import GlassReveal from "@/components/ui/GlassReveal";

export default function Home() {
  return (
    <main className="relative">
      {/* 全屏背景 */}
      <BackgroundWithMask 
        magnetLinesProps={{
          rows: 18,
          columns: 18,
          lineColor: '#94a3b8',
          lineWidth: '0.6vmin',
          lineHeight: '3vmin',
          baseAngle: -8
        }}
        maskOpacity={0.85}
        enableBlur={false}
      />
      
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center z-20">
  <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-4 items-center">
            <div className="max-w-3xl lg:text-right w-full lg:w-auto mt-6 lg:mt-0 lg:ml-auto lg:mr-16 lg:pr-4">
                <h1 className="font-sans text-4xl/tight sm:text-5xl/tight md:text-6xl/tight lg:text-7xl/tight font-semibold tracking-tight text-center lg:text-right">
                  <BlurText as="span" text="WentUrc" animateBy="letters" />
                  <BlurText as="span" className="block text-brand" text="理解, 包容, 友善" animateBy="words" />
                </h1>
                <BlurText
                  as="p"
                  className="mt-6 text-xl leading-8 text-muted text-center lg:text-right"
                  text="风来碎花去 雨飘长虹显 聚散无常 但为新生"
                  animateBy="words"
                  delay={100}
                />
                <div className="mt-8 flex items-center gap-6">
                  <GlassReveal delayMs={100}>
                    <Link href="https://status.wenturc.com/status/all" className="inline-flex h-11 items-center px-6 text-sm font-medium text-brand-foreground bg-brand rounded-md shadow hover:opacity-90 transition-all">
                      当前状态
                    </Link>
                  </GlassReveal>
                  <GlassReveal delayMs={250}>
                    <Link href="https://github.com/wenturc" className="inline-flex h-11 items-center px-6 text-sm font-medium border rounded-md hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-all">
                      当前存档
                    </Link>
                  </GlassReveal>
                </div>
                <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground">
                  <div><BlurText as="span" text="白湖婲" animateBy="letters" stepDuration={0.25} /></div>
                  <div><BlurText as="span" text="溪忘雨" animateBy="letters" stepDuration={0.25} /></div>
                  <div><BlurText as="span" text="甜则塔" animateBy="letters" stepDuration={0.25} /></div>
                  <div>
                    <Link
                      href="https://IGCrystal.icu"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="冰苷晶" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            <div className="flex justify-start relative lg:-ml-8">
              <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand/20 dark:bg-brand/10 rounded-full blur-3xl opacity-30" />
              </div>
              <GlassReveal className="relative z-10 flex items-center" delayMs={200}>
                <Image 
                  src="/WentUrc-2.png"
                  alt="WentUrc" 
                  width={500}
                  height={500}
                  className="w-auto h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] object-contain select-none"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdQIvw4B6jQAAAABJRU5ErkJggg=="
                />
              </GlassReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Overview + Title */}
      <Reveal>
        <section id="overview" className="py-12 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2"><Feather className="h-5 w-5 text-brand" />心念织梦之界</h2>
          </div>
        </section>
      </Reveal>

      {/* 世界概述 */}
      <Reveal delayMs={80}>
        <section className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand" />世界概述</h3>
            <div className="mt-3 space-y-3 text-[15px] leading-7 text-muted">
              <p>一个由心念共振所编织的世界。现实不再受物理法则单向定义，而由个体与群体的意志同频成形；想象、愿望与梦境皆可投影为真实。</p>
              <p>表面是中世纪风貌——高塔、浮岛、石街与村庄；本质是以「心流共振」为内核的高阶魔导科技：以“念感传导阵”心灵通话，以“灵风石”自由翱翔。</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 世界主旨 */}
      <Reveal delayMs={120}>
        <section className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Heart className="h-5 w-5 text-brand" />世界主旨</h3>
            <div className="mt-3 space-y-3 text-[15px] leading-7 text-muted">
              <p>不设仇恨与战争，这里是一间关于“精神和谐”的实验室。每个生命被鼓励在冥想、创作与交流中与世界共振，活出自己的原初形。</p>
              <p>唯心即真。情感越纯净、越真诚，对世界底层的影响越深：怒可起风暴，爱能唤星辰。</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 社会构成 */}
      <Reveal delayMs={160}>
        <section id="cases" className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Users className="h-5 w-5 text-brand" />社会构成</h3>
            <p className="mt-3 text-[15px] leading-7 text-muted">以“梦环”（Dream Circles）为基本单位的自治共同体：由理念相近、心念共鸣的成员自发组成。各梦环互不干涉、彼此协作。</p>
            <div className="mt-4 space-y-2 text-[15px] leading-7">
              <div>比如——</div>
              <ul className="space-y-2 text-muted">
                <li className="flex items-start gap-2"><Coffee className="h-4 w-4 mt-1 text-brand" /><span><span className="font-medium">净茶梦环</span>：以茶与呼吸疗愈心绪，修复心流。</span></li>
                <li className="flex items-start gap-2"><BookOpen className="h-4 w-4 mt-1 text-brand" /><span><span className="font-medium">记忆图书馆</span>：收藏并检索居民的心象书页与回响。</span></li>
                <li className="flex items-start gap-2"><Palette className="h-4 w-4 mt-1 text-brand" /><span><span className="font-medium">幻绘园</span>：以念力作画，生成可步入的半现实空间。</span></li>
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 魔法系统 */}
      <Reveal delayMs={200}>
        <section id="faq" className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Wand2 className="h-5 w-5 text-brand" />魔法系统：意念架构（Mindcraft）</h3>
            <p className="mt-3 text-[15px] leading-7 text-muted">魔法是自我精神的结构化表达。</p>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-muted">
              <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 mt-1 text-brand" />显相术：以情绪为参数，将构思聚合为实体。</li>
              <li className="flex items-start gap-2"><Share2 className="h-4 w-4 mt-1 text-brand" />念环术：构建共享思维回路，实现多脑协作。</li>
              <li className="flex items-start gap-2"><MoonStar className="h-4 w-4 mt-1 text-brand" />梦织术：在梦境建构空间，并以星力锚定于现实。</li>
              <li className="flex items-start gap-2"><Gem className="h-4 w-4 mt-1 text-brand" />温序魔具：由心晶驱动的魔械，兼具仪式感与实用性。</li>
            </ul>
          </div>
        </section>
      </Reveal>

      {/* 风格基调 */}
      <Reveal delayMs={240}>
        <section id="style" className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2"><Music className="h-5 w-5 text-brand" />风格基调</h3>
            <p className="mt-3 text-[15px] leading-7 text-muted">慢与温柔是默认节拍：晨雾里的浮空温泉、星夜中的灵歌会、银藤花街的旅人……</p>
            <p className="mt-3 text-[15px] leading-7 text-muted">当冲突谢幕，只剩世界在自我修复与治愈中缓慢呼吸，温柔回应每一次迷失。</p>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
