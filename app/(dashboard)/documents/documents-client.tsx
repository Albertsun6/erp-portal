"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MarkdownRenderer } from "@/components/documents/markdown-renderer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FileText, X } from "lucide-react";
import { DocStatus } from "@/types";
import { Button } from "@/components/ui/button";

interface Doc {
  id: string;
  title: string;
  domain: string;
  status: DocStatus;
  contentMd: string;
}

const statusBadge: Record<DocStatus, { label: string; className: string }> = {
  confirmed: { label: "已确认", className: "bg-green-600 text-white hover:bg-green-600" },
  skeleton: { label: "骨架", className: "bg-yellow-500 text-white hover:bg-yellow-500" },
  placeholder: { label: "占位", className: "" },
};

export function DocumentsClient({ docs }: { docs: Doc[] }) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = search
    ? docs.filter((d) => d.title.toLowerCase().includes(search.toLowerCase()) || d.domain.toLowerCase().includes(search.toLowerCase()))
    : docs;

  const selectedDoc = selectedId ? docs.find((d) => d.id === selectedId) : null;

  if (selectedDoc) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)}>
          <X className="h-4 w-4 mr-1" /> 返回列表
        </Button>
        <Card>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="p-6">
              <MarkdownRenderer content={selectedDoc.contentMd} />
            </div>
          </ScrollArea>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="搜索文档..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc) => {
          const sb = statusBadge[doc.status];
          return (
            <Card key={doc.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setSelectedId(doc.id)}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 min-w-0">
                    <FileText className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{doc.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{doc.domain}</p>
                    </div>
                  </div>
                  <Badge variant={doc.status === "placeholder" ? "outline" : "default"} className={`shrink-0 text-[10px] ${sb.className}`}>{sb.label}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-12 text-muted-foreground">
          <Search className="h-8 w-8 mb-2" /><p>没有找到匹配的文档</p>
        </div>
      )}
    </div>
  );
}
