import { QualityGate } from "@/types";

export const qualityGates: QualityGate[] = [
  // Phase 0 → Phase 1
  { id: "g0-1", phaseTransition: "Phase 0 → Phase 1", checkItem: "Docker 开发环境", verifyMethod: "执行 docker-compose up -d", passCriteria: "所有容器正常运行，无报错", isPassed: false },
  { id: "g0-2", phaseTransition: "Phase 0 → Phase 1", checkItem: "Odoo 可访问", verifyMethod: "浏览器访问 http://localhost:8069", passCriteria: "能看到 Odoo 登录页面", isPassed: false },
  { id: "g0-3", phaseTransition: "Phase 0 → Phase 1", checkItem: "数据库连接", verifyMethod: "Odoo 登录后操作", passCriteria: "能创建/查看记录", isPassed: false },
  { id: "g0-4", phaseTransition: "Phase 0 → Phase 1", checkItem: "Cursor Rules", verifyMethod: "检查 .cursor/rules/ 目录", passCriteria: "6 个规则文件存在且内容完整", isPassed: false },
  { id: "g0-5", phaseTransition: "Phase 0 → Phase 1", checkItem: "Git + CI", verifyMethod: "push 到 GitHub 触发 Actions", passCriteria: "流水线运行通过", isPassed: false },
  { id: "g0-6", phaseTransition: "Phase 0 → Phase 1", checkItem: "测试模块", verifyMethod: "安装测试模块到 Odoo", passCriteria: "模块安装成功，测试通过", isPassed: false },
  { id: "g0-7", phaseTransition: "Phase 0 → Phase 1", checkItem: "项目文档", verifyMethod: "检查 docs/ 目录", passCriteria: "README、Chatlog 规范在用", isPassed: false },

  // Phase 1 → Phase 2
  { id: "g1-1", phaseTransition: "Phase 1 → Phase 2", checkItem: "erp_base 模块", verifyMethod: "安装并测试", passCriteria: "组织架构/权限/审计日志功能可用", isPassed: false },
  { id: "g1-2", phaseTransition: "Phase 1 → Phase 2", checkItem: "权限体系", verifyMethod: "角色测试", passCriteria: "RBAC 权限组配置完成，记录规则生效", isPassed: false },
  { id: "g1-3", phaseTransition: "Phase 1 → Phase 2", checkItem: "测试覆盖", verifyMethod: "pytest --cov", passCriteria: "erp_base 测试覆盖率 ≥ 80%", isPassed: false },
  { id: "g1-4", phaseTransition: "Phase 1 → Phase 2", checkItem: "文档完整", verifyMethod: "检查文档目录", passCriteria: "模块设计文档 + 流程图存在", isPassed: false },
  { id: "g1-5", phaseTransition: "Phase 1 → Phase 2", checkItem: "需求分析", verifyMethod: "评审", passCriteria: "核心模块需求清单和 Gap-Fit 分析完成", isPassed: false },

  // Phase 2 → Phase 3
  { id: "g2-1", phaseTransition: "Phase 2 → Phase 3", checkItem: "核心模块", verifyMethod: "安装测试", passCriteria: "采购/销售/库存/财务模块安装成功", isPassed: false },
  { id: "g2-2", phaseTransition: "Phase 2 → Phase 3", checkItem: "端到端流程", verifyMethod: "流程走通测试", passCriteria: "至少 1 条完整业务流程可走通", isPassed: false },
  { id: "g2-3", phaseTransition: "Phase 2 → Phase 3", checkItem: "测试覆盖", verifyMethod: "pytest --cov", passCriteria: "所有模块测试覆盖率 ≥ 80%", isPassed: false },
  { id: "g2-4", phaseTransition: "Phase 2 → Phase 3", checkItem: "性能基线", verifyMethod: "性能测试", passCriteria: "核心页面响应时间 < 2s", isPassed: false },
  { id: "g2-5", phaseTransition: "Phase 2 → Phase 3", checkItem: "安全评审", verifyMethod: "安全审查", passCriteria: "所有模块权限配置完整，无安全漏洞", isPassed: false },

  // Sprint 完成门禁
  { id: "gs-1", phaseTransition: "Sprint 完成门禁", checkItem: "代码审查", verifyMethod: "Review 记录", passCriteria: "本 Sprint 所有代码已通过审查", isPassed: false },
  { id: "gs-2", phaseTransition: "Sprint 完成门禁", checkItem: "测试通过", verifyMethod: "CI 报告", passCriteria: "所有测试通过，覆盖率 ≥ 80%", isPassed: false },
  { id: "gs-3", phaseTransition: "Sprint 完成门禁", checkItem: "功能演示", verifyMethod: "Sprint Review", passCriteria: "成功演示了计划的功能", isPassed: false },
  { id: "gs-4", phaseTransition: "Sprint 完成门禁", checkItem: "文档更新", verifyMethod: "检查文档", passCriteria: "涉及的模块文档/流程图已更新", isPassed: false },
  { id: "gs-5", phaseTransition: "Sprint 完成门禁", checkItem: "无 P0/P1 缺陷", verifyMethod: "缺陷列表", passCriteria: "本 Sprint 引入的 P0/P1 缺陷已修复", isPassed: false },
  { id: "gs-6", phaseTransition: "Sprint 完成门禁", checkItem: "Chatlog 记录", verifyMethod: "检查 Chatlog", passCriteria: "本 Sprint 关键决策已记录", isPassed: false },
];
