import { phases, milestones } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Clock, Target, Calendar, ListChecks, Package } from "lucide-react";

const statusConfig = {
  "not-started": { label: "未开始", icon: Circle, color: "text-muted-foreground", bg: "bg-muted" },
  "in-progress": { label: "进行中", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  completed: { label: "已完成", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
};

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      {/* Timeline Header */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4">
        {phases.map((phase, i) => {
          const sc = statusConfig[phase.status];
          const Icon = sc.icon;
          return (
            <div key={phase.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${sc.bg}`}>
                  <Icon className={`h-5 w-5 ${sc.color}`} />
                </div>
                <span className="mt-1 text-xs font-medium">{phase.name}</span>
                <span className="text-[10px] text-muted-foreground">{phase.description}</span>
              </div>
              {i < phases.length - 1 && (
                <div className="mx-3 h-0.5 w-16 bg-border" />
              )}
            </div>
          );
        })}
      </div>

      {/* Phase Cards */}
      <div className="space-y-6">
        {phases.map((phase) => {
          const sc = statusConfig[phase.status];
          const phaseMilestones = milestones.filter((m) => m.phaseId === phase.id);

          return (
            <Card key={phase.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{phase.name}: {phase.description}</CardTitle>
                    <Badge variant={phase.status === "completed" ? "default" : "outline"} className="text-xs">
                      {sc.label}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {phase.startDate} ~ {phase.endDate}
                  </div>
                </div>
                <Progress value={phase.progress} className="mt-3 h-2" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Activities */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                      <ListChecks className="h-4 w-4" />
                      主要活动
                    </h4>
                    <ul className="space-y-2">
                      {phase.activities.map((a, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-muted-foreground/50 shrink-0">{i + 1}.</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                      <Package className="h-4 w-4" />
                      交付物
                    </h4>
                    <ul className="space-y-2">
                      {phase.deliverables.map((d, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <Circle className="h-3 w-3 mt-1 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                      <Target className="h-4 w-4" />
                      里程碑
                    </h4>
                    {phaseMilestones.length > 0 ? (
                      <div className="space-y-3">
                        {phaseMilestones.map((ms) => {
                          const msc = statusConfig[ms.status];
                          const MsIcon = msc.icon;
                          return (
                            <div key={ms.id} className="flex items-center gap-3">
                              <MsIcon className={`h-4 w-4 shrink-0 ${msc.color}`} />
                              <div>
                                <p className="text-sm font-medium">{ms.code}: {ms.name}</p>
                                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {ms.targetDate}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">无独立里程碑</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
