"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownRenderer } from "./markdown-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, X, Eye, Edit3 } from "lucide-react";

interface DocEditorProps {
  initialContent: string;
  onSave: (content: string, summary: string) => void;
  onCancel: () => void;
}

export function DocEditor({ initialContent, onSave, onCancel }: DocEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [summary, setSummary] = useState("");
  const [tab, setTab] = useState<string>("edit");

  const hasChanges = content !== initialContent;

  return (
    <div className="space-y-3">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="edit" className="text-xs">
              <Edit3 className="h-3 w-3 mr-1" />
              编辑
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              预览
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4 mr-1" />
              取消
            </Button>
            <Button
              size="sm"
              disabled={!hasChanges || !summary.trim()}
              onClick={() => onSave(content, summary)}
            >
              <Save className="h-4 w-4 mr-1" />
              保存
            </Button>
          </div>
        </div>

        <TabsContent value="edit" className="mt-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] font-mono text-sm"
            placeholder="输入 Markdown 内容..."
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-3">
          <div className="min-h-[500px] rounded-md border p-4">
            <MarkdownRenderer content={content} />
          </div>
        </TabsContent>
      </Tabs>

      {hasChanges && (
        <div className="flex items-center gap-2">
          <Input
            placeholder="修改摘要（必填）..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="text-sm"
          />
        </div>
      )}
    </div>
  );
}
