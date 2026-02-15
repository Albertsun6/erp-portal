# ERP 方法论管理平台

ERP 项目方法论可视化管理平台，将 Markdown 文档体系转化为可交互的 Web 应用。

## 功能

- **仪表盘** — 项目概览、方法论状态、里程碑进度
- **方法论浏览器** — 树形导航 + Markdown 渲染 + 在线编辑 + 版本历史
- **项目路线图** — Phase 0~3 时间线、活动、交付物、里程碑
- **质量门禁** — 可交互的检查清单，阶段门禁和 Sprint 门禁
- **文档管理** — 搜索、浏览、查看所有方法论文档
- **对话记录** — 时间线视图，关键决策追踪

## 技术栈

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** + **shadcn/ui**
- **Recharts** — 仪表盘图表
- **react-markdown** — Markdown 渲染
- **Vercel** — 部署

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 部署

推送到 GitHub 后在 Vercel 中导入即可自动部署。

## 与 ERP 项目的关系

本项目是 ERP 主项目（`erp/`）的配套管理工具：
- 数据来源于 ERP 项目的 `docs/` 目录
- 后续将接入 Supabase 实现持久化和多人协作
