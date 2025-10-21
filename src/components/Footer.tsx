import Link from "next/link";
import Image from "next/image";
import { MessageSquare, NotebookText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 mt-20 relative z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3 text-sm text-muted">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <Image src="/logo.png" alt="WentUrc logo" width={24} height={24} />
            <span>WentUrc</span>
          </div>
          <p className="text-muted">路很长，梦还在</p>
        </div>
        <div>
          <div className="font-medium mb-2">导航</div>
          <ul className="space-y-1">
            <li><Link href="https://chat.wenturc.com" className="hover:text-brand flex items-center gap-1"><MessageSquare className="h-4 w-4" />聊天室</Link></li>
            <li><Link href="https://note.wenturc.com" className="hover:text-brand flex items-center gap-1"><NotebookText className="h-4 w-4" />笔记屋</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">联系</div>
          <p className="text-muted">IGCrystal@wenturc.com</p>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground pb-8">© {new Date().getFullYear()} WentUrc. All rights reserved.</div>
    </footer>
  );
}


