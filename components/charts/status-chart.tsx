"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS: Record<string, string> = {
  已确认: "hsl(142, 71%, 45%)",
  骨架: "hsl(45, 93%, 47%)",
  占位: "hsl(0, 0%, 70%)",
};

interface StatusChartProps {
  confirmed: number;
  skeleton: number;
  placeholder: number;
}

export function StatusChart({ confirmed, skeleton, placeholder }: StatusChartProps) {
  const data = [
    { name: "已确认", value: confirmed },
    { name: "骨架", value: skeleton },
    { name: "占位", value: placeholder },
  ].filter((d) => d.value > 0);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} 个`]}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={8}
          formatter={(value: string) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
