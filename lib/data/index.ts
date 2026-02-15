export { methodologyTree } from "./methodology-tree";
export { phases, milestones } from "./phases";
export { qualityGates } from "./quality-gates";
export { chatlogEntries } from "./chatlog";

import { methodologyTree } from "./methodology-tree";
import { DocStatus, MethodologyNode } from "@/types";

function countStatuses(nodes: MethodologyNode[]): Record<DocStatus, number> {
  const counts: Record<DocStatus, number> = { confirmed: 0, skeleton: 0, placeholder: 0 };
  for (const node of nodes) {
    counts[node.status]++;
    if (node.children) {
      const childCounts = countStatuses(node.children);
      counts.confirmed += childCounts.confirmed;
      counts.skeleton += childCounts.skeleton;
      counts.placeholder += childCounts.placeholder;
    }
  }
  return counts;
}

export function getDocStats() {
  const counts = countStatuses(methodologyTree);
  const total = counts.confirmed + counts.skeleton + counts.placeholder;
  return { ...counts, total };
}
