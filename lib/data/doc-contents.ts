// Document contents keyed by methodology node id.
// In a production setup these would come from Supabase.
// For now we embed summary content for each document.

export const docContents: Record<string, string> = {
  "core-principles": `# 01 - 核心原则

> 状态: **已确认** | 版本: v0.2.0

## 定位

项目的 10 条不可违背的原则。所有决策、设计、代码和文档都必须符合这些原则。

| 编号 | 原则 | 一句话定义 |
|------|------|----------|
| P1 | 质量可控 | 每个工件都有验收标准，每个阶段都有质量门禁 |
| P2 | 全面透明 | 系统任何行为都可被相应角色理解和审查 |
| P3 | 结构化表达 | 用建模语言而非纯自然语言表达系统行为 |
| P4 | 全链路可追溯 | 需求→设计→代码→测试全程有迹可循 |
| P5 | 可验证 | 任何关于系统的声明都能通过测试或演示证明 |
| P6 | 可回退 | 每一步变更都可以撤销 |
| P7 | 渐进交付 | 小步快跑，每个增量是完整业务切片 |
| P8 | 知识沉淀 | 知识在项目中，不在人脑中 |
| P9 | AI 可信但必须被理解 | AI 产出是起点不是终点 |
| P10 | 安全内建 | 权限、审计、数据保护从设计开始 |

### P1 质量可控

**为什么**：ERP 是企业核心业务系统，质量缺陷直接导致财务数据错误、库存不准、订单丢失。

**怎么做**：
- 每个阶段转换必须通过质量门禁
- 代码提交前必须通过 pre-commit 检查
- 测试覆盖率 ≥ 80%，核心业务逻辑 100% 覆盖

### P2 全面透明

**为什么**：ERP 涉及财务审计和业务合规，系统中不可解释的行为会导致审计风险。

**怎么做**：
- AI 生成的代码必须标注并附设计决策说明
- Odoo 框架隐式行为在模块文档中显式说明
- 关键业务流程用 BPMN 或 Mermaid 图表达

*完整内容请查看源文件 docs/00-方法论/01-核心原则/README.md*`,

  process: `# 02 - 过程方法论

> 状态: **骨架** | 版本: v0.1.0

## 方法论清单

| 方法论 | 核心问题 | 状态 |
|-------|---------|------|
| TOGAF ADM | 做什么、整体长什么样 | 占位 |
| SDLC | 分几个阶段、进出标准 | **已确认** |
| Agile/Scrum | Sprint 怎么跑 | 占位 |
| DevOps | 怎么持续交付 | 占位 |
| ITIL | 怎么管理服务和变更 | 占位 |
| Lean/Kanban | 怎么减少浪费 | 占位 |

## 阶段映射矩阵

| 方法论 | Phase 0 | Phase 1 | Phase 2 | Phase 3 |
|-------|:---:|:---:|:---:|:---:|
| SDLC | 辅助 | **主导** | 框架 | **主导** |
| Agile/Scrum | - | - | **主导** | 辅助 |
| DevOps | **主导** | - | 辅助 | **主导** |
| ITIL | - | - | - | 辅助 |`,

  sdlc: `# SDLC 阶段框架

> 状态: **已确认** | 版本: v0.2.0

## 阶段总览

| 阶段 | 时间 | 目标 | 主导方法论 |
|------|------|------|----------|
| Phase 0 | 第 1~2 周 | 开发平台搭建 | DevOps + Lean |
| Phase 1 | 第 3~5 周 | 基础平台 + 需求分析 | SDLC + TOGAF |
| Phase 2 | 第 6~13 周 | 核心业务模块开发 | Agile/Scrum |
| Phase 3 | 第 14~17 周 | 集成测试 + 上线 | SDLC + DevOps + ITIL |

### Phase 0：开发平台搭建

**进入条件**：方法论核心文档已确认，开发机器可用

**交付物**：Docker 环境、Cursor Rules、Makefile、CI 配置、测试模块

**退出条件**：Docker 一键启动、Odoo 可访问、CI 通过、测试模块安装成功`,

  modeling: `# 03 - 建模体系

> 状态: **骨架** | 版本: v0.1.0

## 五层建模架构

| 层级 | 建模语言 | 工具 | 受众 |
|------|---------|------|------|
| Layer 1 | ArchiMate | Archi | 管理层 |
| Layer 2 | BPMN 2.0 | draw.io | 业务顾问 |
| Layer 3 | C4 Model | draw.io | 技术干系人 |
| Layer 4 | UML 2.5 | draw.io | 开发者 |
| Layer 5 | Mermaid | Markdown | 开发者 |

## 渐进式成熟度

| 等级 | 要求 | 适用时机 |
|------|------|---------|
| L1 初始 | 每种语言只用最核心元素 | Phase 0~1 |
| L2 成长 | 补充更多元素，提高精度 | Phase 2~3 |
| L3 成熟 | 符合各建模语言标准规范 | Phase 4+ |`,

  quality: `# 05 - 质量框架

> 状态: **已确认** | 版本: v0.2.0

## 五层质量防线

\`\`\`
L0 建模验证 → L1 AI 规则 → L2 人工审查 → L3 自动化测试 → L4 UAT 验收
\`\`\`

## 质量度量指标

| 指标 | 目标值 | 状态 |
|------|--------|------|
| 测试覆盖率 | ≥ 80% | 已确认 |
| 核心逻辑覆盖率 | 100% | 已确认 |
| 缺陷密度 | < 5 个 P2+/模块 | 已确认 |
| Sprint 完成率 | ≥ 85% | 已确认 |
| AI 代码采纳率 | ≥ 70% | 已确认 |

## 缺陷分级

| 级别 | 定义 | 处理要求 |
|------|------|---------|
| P0 | 系统崩溃/数据丢失 | 立即修复 |
| P1 | 核心流程阻断 | 24h 内修复 |
| P2 | 功能异常但有绕过 | Sprint 内修复 |
| P3 | 体验问题 | 放入 Backlog |`,

  "ai-protocol": `# 07 - AI 协作协议

> 状态: **已确认** | 版本: v0.2.0

## 代码注释四级规范

| 级别 | 位置 | 必须包含 |
|------|------|---------|
| 文件级 | 文件顶部 | 模块用途、依赖说明 |
| 类级 | class 下方 | 模型用途、业务规则摘要 |
| 方法级 | def 下方 | 功能、参数、返回值、副作用 |
| 行内 | 复杂逻辑旁 | 解释"为什么"而非"做了什么" |

## AI 审查清单

**快速审查**（所有提交必做）：功能完整性、Odoo 规范、安全基础、代码风格、注释完整、测试存在

**深度审查**（特定场景触发）：财务计算、权限安全、核心模型继承、外部服务通信、数据迁移

## 上下文恢复流程

1. 读 Chatlog → 2. 读项目路线图 → 3. 读核心原则 → 4. 按任务读相关文档 → 5. 确认后继续`,

  governance: `# 06 - 治理模型

> 状态: **骨架** | 版本: v0.1.0

## RACI 决策权矩阵

| 决策领域 | 开发者 | AI 助手 | 管理层 |
|---------|:---:|:---:|:---:|
| 架构决策 | RA | C | I |
| 代码质量 | RA | C | - |
| 上线决策 | C | - | RA |
| 技术选型 | RA | C | I |`,

  patterns: `# 04 - 设计模式与开发实践

> 状态: **骨架** | 版本: v0.1.0

## 实践清单

| 实践 | 核心理念 | 填充时机 |
|------|---------|---------|
| TDD | 先写测试再写代码 | Phase 2 前 |
| BDD | 用行为规格驱动开发 | Phase 2 前 |
| DDD | 领域模型驱动设计 | Phase 2 前 |
| EDA | 事件驱动解耦 | Phase 2 前 |
| Odoo Patterns | Odoo 框架专用模式 | Phase 1 前 |`,
};

// Generate placeholder content for L2 docs
const l2Placeholders: Record<string, { title: string; fillTime: string; ref: string }> = {
  togaf: { title: "TOGAF ADM", fillTime: "Phase 1 之前", ref: "04-系统架构设计" },
  agile: { title: "Agile / Scrum", fillTime: "Phase 2 之前", ref: "02-AI驱动开发方法论" },
  devops: { title: "DevOps", fillTime: "Phase 0 同步", ref: "03-开发平台规划" },
  itil: { title: "ITIL", fillTime: "Phase 3 之前", ref: "06-治理模型" },
  lean: { title: "Lean / Kanban", fillTime: "按需填充", ref: "06-治理模型" },
  archimate: { title: "ArchiMate", fillTime: "Phase 1 之前", ref: "04-系统架构设计" },
  bpmn: { title: "BPMN 2.0", fillTime: "Phase 1 之前", ref: "03-建模体系 README" },
  uml: { title: "UML 2.5", fillTime: "Phase 2 之前", ref: "04-系统架构设计" },
  c4: { title: "C4 Model", fillTime: "Phase 2 之前", ref: "04-系统架构设计" },
  mermaid: { title: "Mermaid", fillTime: "Phase 2 之前", ref: "07-AI协作协议" },
  tdd: { title: "TDD 测试驱动开发", fillTime: "Phase 2 之前", ref: "03-开发平台规划" },
  bdd: { title: "BDD 行为驱动开发", fillTime: "Phase 2 之前", ref: "05-质量框架" },
  ddd: { title: "DDD 领域驱动设计", fillTime: "Phase 2 之前", ref: "04-系统架构设计" },
  eda: { title: "EDA 事件驱动架构", fillTime: "Phase 2 之前", ref: "04-系统架构设计" },
  "odoo-patterns": { title: "Odoo 设计模式", fillTime: "Phase 1 之前", ref: "03-开发平台规划" },
};

for (const [id, info] of Object.entries(l2Placeholders)) {
  docContents[id] = `# ${info.title}

> 状态: **占位** | 计划填充: ${info.fillTime}

> 当前参考：${info.ref}

此文档尚未填充详细内容。按照方法论演进路径，将在 **${info.fillTime}** 完善。

在此之前，请参考 **${info.ref}** 中的相关内容。`;
}
