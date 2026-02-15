import { chatlogEntries } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, MessageSquare, Code, Lightbulb, FileText } from "lucide-react";

const statusConfig = {
  completed: { label: "完成", icon: CheckCircle2, color: "text-green-500", badgeClass: "bg-green-600 text-white hover:bg-green-600" },
  "in-progress": { label: "进行中", icon: Clock, color: "text-yellow-500", badgeClass: "bg-yellow-500 text-white hover:bg-yellow-500" },
  unresolved: { label: "未解决", icon: AlertCircle, color: "text-red-500", badgeClass: "bg-red-500 text-white hover:bg-red-500" },
};

export default function ChatlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MessageSquare className="h-4 w-4" />
        共 {chatlogEntries.length} 条对话记录
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-6">
          {[...chatlogEntries].reverse().map((entry, idx) => {
            const sc = statusConfig[entry.statusTag];
            const Icon = sc.icon;

            return (
              <div key={entry.id} className="relative pl-12">
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-3">
                  <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 border-background bg-border">
                    <div className={`h-2 w-2 rounded-full ${
                      entry.statusTag === "completed" ? "bg-green-500" :
                      entry.statusTag === "in-progress" ? "bg-yellow-500" : "bg-red-500"
                    }`} />
                  </div>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base">{entry.title}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">{entry.chatTime}</p>
                      </div>
                      <Badge className={`shrink-0 text-[10px] ${sc.badgeClass}`}>
                        {sc.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1">
                        <MessageSquare className="h-3 w-3" />
                        用户需求
                      </div>
                      <p className="text-sm">{entry.userNeed}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1">
                        <Lightbulb className="h-3 w-3" />
                        解决方案
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.solution}</p>
                    </div>

                    {entry.codeChanges && entry.codeChanges !== "无" && (
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1">
                          <Code className="h-3 w-3" />
                          代码改动
                        </div>
                        <p className="text-sm text-muted-foreground">{entry.codeChanges}</p>
                      </div>
                    )}

                    {entry.keyDecisions && (
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1">
                          <FileText className="h-3 w-3" />
                          关键决策
                        </div>
                        <p className="text-sm text-muted-foreground">{entry.keyDecisions}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
