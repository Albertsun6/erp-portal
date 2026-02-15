"use client";

import { useState, useEffect } from "react";
import { methodologyTree } from "@/lib/data";
import { getDocContent, getDocVersions, saveDocContent } from "@/lib/data/doc-store";
import { TreeNav } from "@/components/methodology/tree-nav";
import { MarkdownRenderer } from "@/components/documents/markdown-renderer";
import { DocEditor } from "@/components/documents/doc-editor";
import { VersionHistory } from "@/components/documents/version-history";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MethodologyNode, DocVersion } from "@/types";
import { FileText, Edit3, History, X } from "lucide-react";

function findNode(nodes: MethodologyNode[], id: string): MethodologyNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export default function MethodologyPage() {
  const [selectedId, setSelectedId] = useState<string>("core-principles");
  const [editing, setEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [content, setContent] = useState("");
  const [versions, setVersions] = useState<DocVersion[]>([]);
  const [previewVersion, setPreviewVersion] = useState<DocVersion | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setContent(getDocContent(selectedId));
    setVersions(getDocVersions(selectedId));
    setEditing(false);
    setShowHistory(false);
    setPreviewVersion(null);
  }, [selectedId, mounted]);

  function handleSave(newContent: string, summary: string) {
    const version = saveDocContent(selectedId, newContent, summary);
    setContent(newContent);
    setVersions((prev) => [...prev, version]);
    setEditing(false);
  }

  const displayContent = previewVersion ? previewVersion.contentMd : content;

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Tree Navigation */}
      <Card className="w-72 shrink-0 overflow-hidden hidden md:block">
        <div className="p-3 border-b">
          <h2 className="text-sm font-semibold text-muted-foreground">方法论体系</h2>
        </div>
        <ScrollArea className="h-[calc(100%-3rem)]">
          <div className="p-2">
            <TreeNav
              nodes={methodologyTree}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </ScrollArea>
      </Card>

      {/* Document Content */}
      <Card className="flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2">
            {/* Mobile tree toggle for smaller screens */}
            <select
              className="md:hidden text-sm border rounded px-2 py-1"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {methodologyTree.map((n) => (
                <optgroup key={n.id} label={n.label}>
                  <option value={n.id}>{n.label}</option>
                  {n.children?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            {previewVersion && (
              <Button variant="ghost" size="sm" onClick={() => setPreviewVersion(null)}>
                <X className="h-4 w-4 mr-1" />
                退出预览
              </Button>
            )}
            {!editing && !previewVersion && (
              <>
                <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)}>
                  <History className="h-4 w-4 mr-1" />
                  历史 ({versions.length})
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                  <Edit3 className="h-4 w-4 mr-1" />
                  编辑
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex h-[calc(100%-3rem)]">
          {/* Main content area */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {previewVersion && (
                <div className="mb-4 rounded-md bg-muted p-3 text-sm">
                  正在预览 <strong>v{previewVersion.versionNum}</strong> — {previewVersion.changeSummary}
                </div>
              )}
              {editing ? (
                <DocEditor
                  initialContent={content}
                  onSave={handleSave}
                  onCancel={() => setEditing(false)}
                />
              ) : displayContent ? (
                <MarkdownRenderer content={displayContent} />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <FileText className="h-12 w-12 mb-3" />
                  <p>请从左侧选择一个文档</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Version history panel */}
          {showHistory && !editing && (
            <div className="w-64 shrink-0 border-l p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">版本历史</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowHistory(false)}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
              <VersionHistory
                versions={versions}
                selectedId={previewVersion?.id}
                onSelect={(v) => setPreviewVersion(v)}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
