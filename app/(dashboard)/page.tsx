import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getDocStats, getPhases, getMilestones, getChatlogEntries, getQualityGates } from "@/lib/supabase/queries";
import { StatusChart } from "@/components/charts/status-chart";
import { GitBranch, Map, ShieldCheck, MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, phases, milestones, chatlog, gates] = await Promise.all([
    getDocStats(),
    getPhases(),
    getMilestones(),
    getChatlogEntries(),
    getQualityGates(),
  ]);

  const currentPhase = phases.find((p: any) => p.status === "in-progress") || phases[0];
  const phase0Gates = gates.filter((g: any) => g.phase_transition === "Phase 0 → Phase 1");
  const completedGates = phase0Gates.filter((g: any) => g.is_passed).length;
  const totalGatesPhase0 = phase0Gates.length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">当前阶段</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPhase?.name}</div>
            <p className="text-xs text-muted-foreground mt-1">{currentPhase?.description}</p>
            <Progress value={currentPhase?.progress ?? 0} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">方法论文档</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default" className="text-[10px] bg-green-600">{stats.confirmed} 已确认</Badge>
              <Badge variant="secondary" className="text-[10px]">{stats.skeleton} 骨架</Badge>
              <Badge variant="outline" className="text-[10px]">{stats.placeholder} 占位</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Phase 0 门禁</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedGates}/{totalGatesPhase0}</div>
            <p className="text-xs text-muted-foreground mt-1">检查项通过</p>
            <Progress value={totalGatesPhase0 > 0 ? (completedGates / totalGatesPhase0) * 100 : 0} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">对话记录</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chatlog.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              最近: {chatlog[chatlog.length - 1]?.title}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">方法论文档状态</CardTitle></CardHeader>
          <CardContent>
            <StatusChart confirmed={stats.confirmed} skeleton={stats.skeleton} placeholder={stats.placeholder} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">里程碑进度</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((ms: any) => (
                <div key={ms.id} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-muted text-xs font-bold text-muted-foreground">{ms.code}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{ms.name}</p>
                    <p className="text-xs text-muted-foreground">{ms.target_date}</p>
                  </div>
                  <Badge variant={ms.status === "completed" ? "default" : "outline"} className="text-[10px] shrink-0">
                    {ms.status === "completed" ? "完成" : ms.status === "in-progress" ? "进行中" : "未开始"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">最近活动</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chatlog.slice(-5).reverse().map((entry: any) => (
                <div key={entry.id} className="flex gap-3">
                  <div className="mt-0.5">
                    {entry.status_tag === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : entry.status_tag === "in-progress" ? (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{entry.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(entry.chat_time).toLocaleString("zh-CN")}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/methodology">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 pt-6">
              <GitBranch className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">方法论浏览器</p>
                <p className="text-sm text-muted-foreground">浏览 7 大方法论域和 {stats.total} 个文档</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/roadmap">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 pt-6">
              <Map className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">项目路线图</p>
                <p className="text-sm text-muted-foreground">Phase 0~3 时间线和里程碑</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/quality">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 pt-6">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">质量门禁</p>
                <p className="text-sm text-muted-foreground">阶段门禁检查和 Sprint 完成条件</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
