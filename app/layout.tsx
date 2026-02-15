import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ERP 方法论管理平台",
  description: "ERP 项目方法论可视化管理平台 — 文档浏览、路线图、质量门禁、对话记录",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased`}>
        <TooltipProvider>
          <Sidebar />
          <div className="md:pl-56">
            <Header />
            <main className="p-6">{children}</main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
