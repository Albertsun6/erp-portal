-- Remove temporary seed policies after data is imported.

drop policy if exists "Anon insert documents" on documents;
drop policy if exists "Anon insert doc_versions" on doc_versions;
drop policy if exists "Anon insert phases" on phases;
drop policy if exists "Anon insert milestones" on milestones;
drop policy if exists "Anon insert quality_gates" on quality_gates;
drop policy if exists "Anon insert chatlog_entries" on chatlog_entries;
