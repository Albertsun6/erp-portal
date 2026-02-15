import { getDocuments, buildMethodologyTree } from "@/lib/supabase/queries";
import { MethodologyClient } from "./methodology-client";

export const dynamic = "force-dynamic";

export default async function MethodologyPage() {
  const docs = await getDocuments();
  const tree = buildMethodologyTree(docs);

  // Build a content map for initial render
  const contentMap: Record<string, string> = {};
  for (const doc of docs) {
    contentMap[doc.id] = doc.content_md;
  }

  return <MethodologyClient tree={tree} contentMap={contentMap} />;
}
