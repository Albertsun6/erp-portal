"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { logout } from "@/app/login/actions";

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
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });
  }, []);

  const title =
    titles[pathname] ||
    Object.entries(titles).find(([k]) => k !== "/" && pathname.startsWith(k))?.[1] ||
    "ERP 管理平台";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur px-6">
      <h1 className="text-lg font-semibold pl-8 md:pl-0">{title}</h1>
      <div className="flex items-center gap-3">
        {userEmail && (
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {userEmail}
          </span>
        )}
        <ThemeToggle />
        <form action={logout}>
          <Button variant="ghost" size="icon" className="h-8 w-8" type="submit" title="登出">
            <LogOut className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  );
}
