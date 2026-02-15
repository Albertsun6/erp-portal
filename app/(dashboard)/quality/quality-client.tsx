"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, ShieldAlert } from "lucide-react";

interface Gate {
  id: string;
  phaseTransition: string;
  checkItem: string;
  verifyMethod: string;
  passCriteria: string;
  isPassed: boolean;
  checkedAt?: string;
}

export function QualityClient({ initialGates }: { initialGates: Gate[] }) {
  const [gates, setGates] = useState(initialGates);
  const transitions = Array.from(new Set(gates.map((g) => g.phaseTransition)));

  async function toggleGate(id: string) {
    const gate = gates.find((g) => g.id === id);
    if (!gate) return;

    const newPassed = !gate.isPassed;

    // Optimistic update
    setGates((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, isPassed: newPassed, checkedAt: newPassed ? new Date().toISOString() : undefined }
          : g
      )
    );

    // Persist to Supabase
    try {
      const res = await fetch(`/api/quality-gates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_passed: newPassed }),
      });
      if (!res.ok) {
        // Revert on error
        setGates((prev) =>
          prev.map((g) => (g.id === id ? { ...g, isPassed: !newPassed } : g))
        );
      }
    } catch {
      setGates((prev) =>
        prev.map((g) => (g.id === id ? { ...g, isPassed: !newPassed } : g))
      );
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue={transitions[0]}>
        <TabsList className="flex-wrap h-auto gap-1">
          {transitions.map((t) => {
            const tGates = gates.filter((g) => g.phaseTransition === t);
            const passed = tGates.filter((g) => g.isPassed).length;
            return (
              <TabsTrigger key={t} value={t} className="text-xs">
                {t}
                <Badge variant="outline" className="ml-1.5 text-[10px] px-1.5">{passed}/{tGates.length}</Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {transitions.map((t) => {
          const tGates = gates.filter((g) => g.phaseTransition === t);
          const passed = tGates.filter((g) => g.isPassed).length;
          const percentage = Math.round((passed / tGates.length) * 100);
          const allPassed = passed === tGates.length;

          return (
            <TabsContent key={t} value={t}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {allPassed ? <ShieldCheck className="h-5 w-5 text-green-500" /> : <ShieldAlert className="h-5 w-5 text-yellow-500" />}
                      <CardTitle className="text-base">{t}</CardTitle>
                    </div>
                    <Badge variant={allPassed ? "default" : "secondary"} className={allPassed ? "bg-green-600" : ""}>
                      {allPassed ? "全部通过" : `${passed}/${tGates.length} 通过`}
                    </Badge>
                  </div>
                  <Progress value={percentage} className="mt-3 h-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-0 divide-y">
                    {tGates.map((gate) => (
                      <div key={gate.id} className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
                        <Checkbox id={gate.id} checked={gate.isPassed} onCheckedChange={() => toggleGate(gate.id)} className="mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <label htmlFor={gate.id} className="text-sm font-medium cursor-pointer">{gate.checkItem}</label>
                          <div className="grid gap-x-6 gap-y-1 mt-1 sm:grid-cols-2">
                            <p className="text-xs text-muted-foreground"><span className="font-medium">验证方式：</span>{gate.verifyMethod}</p>
                            <p className="text-xs text-muted-foreground"><span className="font-medium">通过标准：</span>{gate.passCriteria}</p>
                          </div>
                        </div>
                        {gate.isPassed && gate.checkedAt && (
                          <span className="text-[10px] text-muted-foreground shrink-0">{new Date(gate.checkedAt).toLocaleDateString("zh-CN")}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
