import { MethodologyNode } from "@/types";

export const methodologyTree: MethodologyNode[] = [
  {
    id: "core-principles",
    label: "01 - 核心原则",
    status: "confirmed",
    docId: "m-01-core",
    children: [],
  },
  {
    id: "process",
    label: "02 - 过程方法论",
    status: "skeleton",
    docId: "m-02-process",
    children: [
      { id: "sdlc", label: "SDLC 阶段框架", status: "confirmed", docId: "m-02-sdlc" },
      { id: "togaf", label: "TOGAF ADM", status: "placeholder", docId: "m-02-togaf" },
      { id: "agile", label: "Agile / Scrum", status: "placeholder", docId: "m-02-agile" },
      { id: "devops", label: "DevOps", status: "placeholder", docId: "m-02-devops" },
      { id: "itil", label: "ITIL", status: "placeholder", docId: "m-02-itil" },
      { id: "lean", label: "Lean / Kanban", status: "placeholder", docId: "m-02-lean" },
    ],
  },
  {
    id: "modeling",
    label: "03 - 建模体系",
    status: "skeleton",
    docId: "m-03-modeling",
    children: [
      { id: "archimate", label: "ArchiMate", status: "placeholder", docId: "m-03-archimate" },
      { id: "bpmn", label: "BPMN 2.0", status: "placeholder", docId: "m-03-bpmn" },
      { id: "uml", label: "UML 2.5", status: "placeholder", docId: "m-03-uml" },
      { id: "c4", label: "C4 Model", status: "placeholder", docId: "m-03-c4" },
      { id: "mermaid", label: "Mermaid", status: "placeholder", docId: "m-03-mermaid" },
    ],
  },
  {
    id: "patterns",
    label: "04 - 设计模式与开发实践",
    status: "skeleton",
    docId: "m-04-patterns",
    children: [
      { id: "tdd", label: "TDD 测试驱动", status: "placeholder", docId: "m-04-tdd" },
      { id: "bdd", label: "BDD 行为驱动", status: "placeholder", docId: "m-04-bdd" },
      { id: "ddd", label: "DDD 领域驱动", status: "placeholder", docId: "m-04-ddd" },
      { id: "eda", label: "EDA 事件驱动", status: "placeholder", docId: "m-04-eda" },
      { id: "odoo-patterns", label: "Odoo 设计模式", status: "placeholder", docId: "m-04-odoo" },
    ],
  },
  {
    id: "quality",
    label: "05 - 质量框架",
    status: "confirmed",
    docId: "m-05-quality",
    children: [],
  },
  {
    id: "governance",
    label: "06 - 治理模型",
    status: "skeleton",
    docId: "m-06-governance",
    children: [],
  },
  {
    id: "ai-protocol",
    label: "07 - AI 协作协议",
    status: "confirmed",
    docId: "m-07-ai",
    children: [],
  },
];
