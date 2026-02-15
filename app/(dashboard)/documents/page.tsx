import { getDocuments } from "@/lib/supabase/queries";
import { DocumentsClient } from "./documents-client";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const docs = await getDocuments();

  const mapped = docs.map((d: any) => ({
    id: d.id,
    title: d.title,
    domain: d.domain || d.title,
    status: d.status,
    contentMd: d.content_md,
  }));

  return <DocumentsClient docs={mapped} />;
}
