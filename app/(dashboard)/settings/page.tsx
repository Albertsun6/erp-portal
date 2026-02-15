import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">系统信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">项目名称</span>
            <span className="font-medium">ERP 企业资源规划管理系统</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">技术基座</span>
            <span>Odoo 17 Community</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">开发模式</span>
            <span>1 人 + AI（Cursor IDE）</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">数据源</span>
            <Badge variant="default" className="bg-green-600">Supabase PostgreSQL</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">技术栈</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js 15", "TypeScript", "Tailwind CSS", "shadcn/ui",
              "Supabase", "Recharts", "react-markdown", "Vercel",
            ].map((tech) => (
              <Badge key={tech} variant="outline">{tech}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">后续计划</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>- ✅ Supabase 数据库已接入（持久化存储 + 版本管理）</p>
          <p>- ✅ Markdown 在线编辑器已实现</p>
          <p>- ✅ 用户认证已接入（Supabase Auth）</p>
          <p>- 接入 ERP 项目数据（Sprint 进度、缺陷统计）</p>
        </CardContent>
      </Card>
    </div>
  );
}
