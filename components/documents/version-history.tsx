"use client";

import { DocVersion } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VersionHistoryProps {
  versions: DocVersion[];
  onSelect?: (version: DocVersion) => void;
  selectedId?: string;
}

export function VersionHistory({ versions, onSelect, selectedId }: VersionHistoryProps) {
  const sorted = [...versions].sort((a, b) => b.versionNum - a.versionNum);

  return (
    <ScrollArea className="h-64">
      <div className="space-y-2">
        {sorted.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect?.(v)}
            className={`w-full text-left rounded-md border p-3 transition-colors hover:bg-muted ${
              selectedId === v.id ? "border-primary bg-muted" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-medium">v{v.versionNum}</span>
              </div>
              {v.versionNum === sorted[0]?.versionNum && (
                <Badge variant="default" className="text-[9px] h-4">最新</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1 truncate">{v.changeSummary}</p>
            <div className="flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {new Date(v.createdAt).toLocaleString("zh-CN")}
            </div>
          </button>
        ))}
        {sorted.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">暂无版本记录</p>
        )}
      </div>
    </ScrollArea>
  );
}
