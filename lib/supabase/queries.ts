import { createClient } from "./server";
import type { DocStatus } from "@/types";

// ---- Documents ----

export interface DbDocument {
  id: string;
  title: string;
  domain: string | null;
  level: string;
  status: DocStatus;
  content_md: string;
  current_version: number;
  fill_timeline: string | null;
  current_ref: string | null;
  parent_id: string | null;
  sort_order: number;
  updated_at: string;
}

export async function getDocuments() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data as DbDocument[];
}

export async function getDocContent(docId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("content_md")
    .eq("id", docId)
    .single();
  if (error) return "";
  return data.content_md as string;
}

export async function getDocVersions(docId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("doc_versions")
    .select("*")
    .eq("document_id", docId)
    .order("version_num", { ascending: false });
  if (error) return [];
  return data;
}

export async function saveDocContent(
  docId: string,
  content: string,
  summary: string,
  userId?: string
) {
  const supabase = await createClient();

  // Get current version
  const { data: doc } = await supabase
    .from("documents")
    .select("current_version")
    .eq("id", docId)
    .single();

  const newVersion = (doc?.current_version ?? 0) + 1;

  // Insert new version
  const { error: verErr } = await supabase.from("doc_versions").insert({
    document_id: docId,
    version_num: newVersion,
    content_md: content,
    change_summary: summary,
    author_id: userId || null,
  });
  if (verErr) throw verErr;

  // Update document
  const { error: docErr } = await supabase
    .from("documents")
    .update({
      content_md: content,
      current_version: newVersion,
      updated_at: new Date().toISOString(),
    })
    .eq("id", docId);
  if (docErr) throw docErr;

  return { versionNum: newVersion };
}

// ---- Phases & Milestones ----

export async function getPhases() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("phases")
    .select("*")
    .order("phase_num");
  if (error) throw error;
  return data;
}

export async function getMilestones() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("milestones")
    .select("*")
    .order("target_date");
  if (error) throw error;
  return data;
}

// ---- Quality Gates ----

export async function getQualityGates() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quality_gates")
    .select("*")
    .order("id");
  if (error) throw error;
  return data;
}

export async function toggleQualityGate(gateId: string, isPassed: boolean, userId?: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("quality_gates")
    .update({
      is_passed: isPassed,
      checked_by: userId || null,
      checked_at: isPassed ? new Date().toISOString() : null,
    })
    .eq("id", gateId);
  if (error) throw error;
}

// ---- Chatlog ----

export async function getChatlogEntries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chatlog_entries")
    .select("*")
    .order("chat_time");
  if (error) throw error;
  return data;
}

// ---- Stats ----

export async function getDocStats() {
  const docs = await getDocuments();
  const counts = { confirmed: 0, skeleton: 0, placeholder: 0 };
  for (const doc of docs) {
    if (doc.status in counts) {
      counts[doc.status as keyof typeof counts]++;
    }
  }
  const total = counts.confirmed + counts.skeleton + counts.placeholder;
  return { ...counts, total };
}

// ---- Helper: Build methodology tree from flat documents ----

export interface MethodologyTreeNode {
  id: string;
  label: string;
  status: DocStatus;
  children: MethodologyTreeNode[];
}

export function buildMethodologyTree(docs: DbDocument[]): MethodologyTreeNode[] {
  const roots = docs.filter((d) => !d.parent_id).sort((a, b) => a.sort_order - b.sort_order);
  return roots.map((root) => ({
    id: root.id,
    label: root.title,
    status: root.status,
    children: docs
      .filter((d) => d.parent_id === root.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((child) => ({
        id: child.id,
        label: child.title,
        status: child.status,
        children: [],
      })),
  }));
}
