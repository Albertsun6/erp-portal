import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: doc, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", slug)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });

  const { data: versions } = await supabase
    .from("doc_versions")
    .select("*")
    .eq("document_id", slug)
    .order("version_num", { ascending: false });

  return NextResponse.json({ doc, versions: versions || [] });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content, summary } = await request.json();
  if (!content || !summary) {
    return NextResponse.json({ error: "content and summary required" }, { status: 400 });
  }

  // Get current version
  const { data: doc } = await supabase
    .from("documents")
    .select("current_version")
    .eq("id", slug)
    .single();

  const newVersion = (doc?.current_version ?? 0) + 1;

  // Insert version
  const { error: verErr } = await supabase.from("doc_versions").insert({
    document_id: slug,
    version_num: newVersion,
    content_md: content,
    change_summary: summary,
    author_id: user.id,
  });
  if (verErr) return NextResponse.json({ error: verErr.message }, { status: 500 });

  // Update document
  const { error: docErr } = await supabase
    .from("documents")
    .update({
      content_md: content,
      current_version: newVersion,
      updated_at: new Date().toISOString(),
    })
    .eq("id", slug);
  if (docErr) return NextResponse.json({ error: docErr.message }, { status: 500 });

  return NextResponse.json({ version: newVersion });
}
