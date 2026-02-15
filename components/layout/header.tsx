"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const titles: Record<string, string> = {
  "/": "仪表盘",
  "/methodology": "方法论浏览器",
  "/roadmap": "项目路线图",
  "/quality": "质量门禁",
  "/documents": "文档管理",
  "/chatlog": "对话记录",
  "/settings": "系统设置",
};

export function Header() {
  const pathname = usePathname();
  const title =
    titles[pathname] ||
    Object.entries(titles).find(([k]) => k !== "/" && pathname.startsWith(k))?.[1] ||
    "ERP 管理平台";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur px-6">
      <h1 className="text-lg font-semibold pl-8 md:pl-0">{title}</h1>
      <ThemeToggle />
    </header>
  );
}
