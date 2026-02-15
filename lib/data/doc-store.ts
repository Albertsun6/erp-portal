// Client-side document store with version history.
// In production this would be backed by Supabase.
// For now uses in-memory state with localStorage persistence.

import { DocVersion } from "@/types";
import { docContents } from "./doc-contents";

export interface DocState {
  content: string;
  currentVersion: number;
  versions: DocVersion[];
}

const STORAGE_KEY = "erp-portal-docs";

function loadFromStorage(): Record<string, DocState> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToStorage(state: Record<string, DocState>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

let storeCache: Record<string, DocState> | null = null;

export function getDocStore(): Record<string, DocState> {
  if (storeCache) return storeCache;

  const stored = loadFromStorage();
  if (stored) {
    storeCache = stored;
    return stored;
  }

  // Initialize from static doc contents
  const initial: Record<string, DocState> = {};
  for (const [id, content] of Object.entries(docContents)) {
    initial[id] = {
      content,
      currentVersion: 1,
      versions: [
        {
          id: `${id}-v1`,
          documentId: id,
          versionNum: 1,
          contentMd: content,
          changeSummary: "初始版本",
          createdAt: "2026-02-15T17:00:00Z",
        },
      ],
    };
  }
  storeCache = initial;
  saveToStorage(initial);
  return initial;
}

export function getDocContent(docId: string): string {
  const store = getDocStore();
  return store[docId]?.content ?? docContents[docId] ?? "";
}

export function getDocVersions(docId: string): DocVersion[] {
  const store = getDocStore();
  return store[docId]?.versions ?? [];
}

export function saveDocContent(docId: string, content: string, summary: string): DocVersion {
  const store = getDocStore();
  const current = store[docId];
  const newVersion = (current?.currentVersion ?? 0) + 1;

  const version: DocVersion = {
    id: `${docId}-v${newVersion}`,
    documentId: docId,
    versionNum: newVersion,
    contentMd: content,
    changeSummary: summary,
    createdAt: new Date().toISOString(),
  };

  store[docId] = {
    content,
    currentVersion: newVersion,
    versions: [...(current?.versions ?? []), version],
  };

  storeCache = store;
  saveToStorage(store);
  return version;
}
