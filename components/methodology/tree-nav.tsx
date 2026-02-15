"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, FileText, FolderOpen } from "lucide-react";
import { MethodologyNode, DocStatus } from "@/types";

const statusVariant: Record<DocStatus, { label: string; className: string }> = {
  confirmed: { label: "已确认", className: "bg-green-600 text-white hover:bg-green-600" },
  skeleton: { label: "骨架", className: "bg-yellow-500 text-white hover:bg-yellow-500" },
  placeholder: { label: "占位", className: "bg-muted text-muted-foreground hover:bg-muted" },
};

interface TreeNavProps {
  nodes: MethodologyNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function TreeItem({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: MethodologyNode;
  depth: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const sv = statusVariant[node.status];

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          onSelect(node.id);
        }}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted",
          selectedId === node.id && "bg-muted font-medium"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          )
        ) : (
          <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        )}
        <span className="flex-1 text-left truncate">{node.label}</span>
        <Badge className={cn("text-[9px] px-1.5 py-0 h-4 shrink-0", sv.className)}>
          {sv.label}
        </Badge>
      </button>
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeNav({ nodes, selectedId, onSelect }: TreeNavProps) {
  return (
    <div className="space-y-0.5">
      {nodes.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          depth={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
