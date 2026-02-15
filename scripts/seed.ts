/**
 * Seed script: imports existing static data into Supabase.
 * 
 * Prerequisites: Run supabase/migrations/001_initial_schema.sql in Supabase SQL Editor first.
 * 
 * Usage: npx tsx scripts/seed.ts
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jbuvjktibrhxgpklxhej.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!SUPABASE_KEY) {
  console.error("Error: Set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---- Import data from existing static files ----

import { methodologyTree } from "../lib/data/methodology-tree";
import { docContents } from "../lib/data/doc-contents";
import { phases, milestones } from "../lib/data/phases";
import { qualityGates } from "../lib/data/quality-gates";
import { chatlogEntries } from "../lib/data/chatlog";
import { MethodologyNode } from "../types";

function flattenTree(
  nodes: MethodologyNode[],
  parentId: string | null = null,
  domain: string = ""
): Array<{
  id: string;
  title: string;
  domain: string | null;
  level: string;
  status: string;
  content_md: string;
  current_version: number;
  parent_id: string | null;
  sort_order: number;
}> {
  const result: ReturnType<typeof flattenTree> = [];
  nodes.forEach((node, idx) => {
    const isL1 = !parentId;
    const doc = {
      id: node.id,
      title: node.label,
      domain: domain || (isL1 ? node.label : null),
      level: isL1 ? (node.children && node.children.length > 0 ? "L1" : "L1") : "L2",
      status: node.status,
      content_md: docContents[node.id] || "",
      current_version: 1,
      parent_id: parentId,
      sort_order: idx,
    };
    result.push(doc);
    if (node.children) {
      result.push(...flattenTree(node.children, node.id, node.label));
    }
  });
  return result;
}

async function seed() {
  console.log("🌱 Seeding database...\n");

  // 1. Documents
  const docs = flattenTree(methodologyTree);
  console.log(`📄 Inserting ${docs.length} documents...`);
  const { error: docErr } = await supabase.from("documents").upsert(docs);
  if (docErr) {
    console.error("  Error:", docErr.message);
  } else {
    console.log("  ✓ Documents inserted");
  }

  // 2. Doc versions (one initial version per doc)
  const versions = docs.map((d) => ({
    document_id: d.id,
    version_num: 1,
    content_md: d.content_md,
    change_summary: "初始版本",
    created_at: "2026-02-15T17:00:00Z",
  }));
  console.log(`📝 Inserting ${versions.length} doc versions...`);
  const { error: verErr } = await supabase.from("doc_versions").upsert(versions, { onConflict: "id" });
  if (verErr) {
    console.error("  Error:", verErr.message);
    // Try inserting without upsert
    const { error: verErr2 } = await supabase.from("doc_versions").insert(versions);
    if (verErr2) console.error("  Insert also failed:", verErr2.message);
    else console.log("  ✓ Doc versions inserted (via insert)");
  } else {
    console.log("  ✓ Doc versions inserted");
  }

  // 3. Phases
  const phaseRows = phases.map((p) => ({
    id: p.id,
    name: p.name,
    phase_num: p.phaseNum,
    status: p.status,
    description: p.description,
    start_date: p.startDate,
    end_date: p.endDate,
    progress: p.progress,
    activities: p.activities,
    deliverables: p.deliverables,
  }));
  console.log(`🗺️  Inserting ${phaseRows.length} phases...`);
  const { error: phaseErr } = await supabase.from("phases").upsert(phaseRows);
  if (phaseErr) console.error("  Error:", phaseErr.message);
  else console.log("  ✓ Phases inserted");

  // 4. Milestones
  const msRows = milestones.map((m) => ({
    id: m.id,
    phase_id: m.phaseId,
    name: m.name,
    code: m.code,
    status: m.status,
    target_date: m.targetDate,
  }));
  console.log(`🎯 Inserting ${msRows.length} milestones...`);
  const { error: msErr } = await supabase.from("milestones").upsert(msRows);
  if (msErr) console.error("  Error:", msErr.message);
  else console.log("  ✓ Milestones inserted");

  // 5. Quality gates
  const gateRows = qualityGates.map((g) => ({
    id: g.id,
    phase_transition: g.phaseTransition,
    check_item: g.checkItem,
    verify_method: g.verifyMethod,
    pass_criteria: g.passCriteria,
    is_passed: g.isPassed,
  }));
  console.log(`🛡️  Inserting ${gateRows.length} quality gates...`);
  const { error: gateErr } = await supabase.from("quality_gates").upsert(gateRows);
  if (gateErr) console.error("  Error:", gateErr.message);
  else console.log("  ✓ Quality gates inserted");

  // 6. Chatlog entries
  const chatRows = chatlogEntries.map((c) => ({
    id: c.id,
    chat_time: c.chatTime.replace(" ", "T") + ":00+08:00",
    title: c.title,
    user_need: c.userNeed,
    solution: c.solution,
    code_changes: c.codeChanges,
    key_decisions: c.keyDecisions || null,
    status_tag: c.statusTag,
  }));
  console.log(`💬 Inserting ${chatRows.length} chatlog entries...`);
  const { error: chatErr } = await supabase.from("chatlog_entries").upsert(chatRows);
  if (chatErr) console.error("  Error:", chatErr.message);
  else console.log("  ✓ Chatlog entries inserted");

  console.log("\n✅ Seed complete!");
}

seed().catch(console.error);
