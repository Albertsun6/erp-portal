"use client";

import { useState, useEffect, useCallback } from "react";
import { MethodologyTreeNode } from "@/lib/supabase/queries";
import { TreeNav } from "@/components/methodology/tree-nav";
import { MarkdownRenderer } from "@/components/documents/markdown-renderer";
import { DocEditor } from "@/components/documents/doc-editor";
import { VersionHistory } from "@/components/documents/version-history";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocVersion } from "@/types";
import { FileText, Edit3, History, X } from "lucide-react";

// Adapt MethodologyTreeNode to the MethodologyNode type expected by TreeNav
function adaptTree(nodes: MethodologyTreeNode[]): any[] {
  return nodes.map((n) => ({
    id: n.id,
    label: n.label,
    status: n.status,
    children: n.children ? adaptTree(n.children) : undefined,
  }));
}

interface Props {
  tree: MethodologyTreeNode[];
  contentMap: Record<string, string>;
}

export function MethodologyClient({ tree, contentMap }: Props) {
  const [selectedId, setSelectedId] = useState<string>(tree[0]?.id || "");
  const [editing, setEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [content, setContent] = useState(contentMap[tree[0]?.id] || "");
  const [versions, setVersions] = useState<DocVersion[]>([]);
  const [previewVersion, setPreviewVersion] = useState<DocVersion | null>(null);

  const loadDoc = useCallback(async (id: string) => {
    // Use contentMap for initial content
    setContent(contentMap[id] || "");

    // Fetch versions from API
    try {
      const res = await fetch(`/api/documents/${id}`);
      if (res.ok) {
        const data = await res.json();
        setContent(data.doc.content_md);
        setVersions(
          data.versions.map((v: any) => ({
            id: v.id,
            documentId: v.document_id,
            versionNum: v.version_num,
            contentMd: v.content_md,
            changeSummary: v.change_summary,
            createdAt: v.created_at,
          }))
        );
      }
    } catch {
      // Fall back to contentMap
    }
  }, [contentMap]);

  useEffect(() => {
    if (selectedId) {
      setEditing(false);
      setShowHistory(false);
      setPreviewVersion(null);
      loadDoc(selectedId);
    }
  }, [selectedId, loadDoc]);

  async function handleSave(newContent: string, summary: string) {
    try {
      const res = await fetch(`/api/documents/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent, summary }),
      });
      if (res.ok) {
        const data = await res.json();
        setContent(newContent);
        setEditing(false);
        // Reload versions
        loadDoc(selectedId);
      } else {
        const err = await res.json();
        alert("保存失败: " + (err.error || "未知错误"));
      }
    } catch (e: any) {
      alert("保存失败: " + e.message);
    }
  }

  const displayContent = previewVersion ? previewVersion.contentMd : content;
  const treeNodes = adaptTree(tree);

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      <Card className="w-72 shrink-0 overflow-hidden hidden md:block">
        <div className="p-3 border-b">
          <h2 className="text-sm font-semibold text-muted-foreground">方法论体系</h2>
        </div>
        <ScrollArea className="h-[calc(100%-3rem)]">
          <div className="p-2">
            <TreeNav nodes={treeNodes} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </ScrollArea>
      </Card>

      <Card className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <select
            className="md:hidden text-sm border rounded px-2 py-1"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {tree.map((n) => (
              <optgroup key={n.id} label={n.label}>
                <option value={n.id}>{n.label}</option>
                {n.children?.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="flex items-center gap-1 ml-auto">
            {previewVersion && (
              <Button variant="ghost" size="sm" onClick={() => setPreviewVersion(null)}>
                <X className="h-4 w-4 mr-1" />退出预览
              </Button>
            )}
            {!editing && !previewVersion && (
              <>
                <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)}>
                  <History className="h-4 w-4 mr-1" />历史 ({versions.length})
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                  <Edit3 className="h-4 w-4 mr-1" />编辑
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex h-[calc(100%-3rem)]">
          <ScrollArea className="flex-1">
            <div className="p-6">
              {previewVersion && (
                <div className="mb-4 rounded-md bg-muted p-3 text-sm">
                  正在预览 <strong>v{previewVersion.versionNum}</strong> — {previewVersion.changeSummary}
                </div>
              )}
              {editing ? (
                <DocEditor initialContent={content} onSave={handleSave} onCancel={() => setEditing(false)} />
              ) : displayContent ? (
                <MarkdownRenderer content={displayContent} />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <FileText className="h-12 w-12 mb-3" /><p>请从左侧选择一个文档</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {showHistory && !editing && (
            <div className="w-64 shrink-0 border-l p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">版本历史</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowHistory(false)}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
              <VersionHistory versions={versions} selectedId={previewVersion?.id} onSelect={(v) => setPreviewVersion(v)} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
