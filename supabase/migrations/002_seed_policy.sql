-- Temporary: Allow anon role to insert for seeding.
-- After seeding, run 003_remove_seed_policy.sql to remove these.

create policy "Anon insert documents" on documents for insert to anon with check (true);
create policy "Anon insert doc_versions" on doc_versions for insert to anon with check (true);
create policy "Anon insert phases" on phases for insert to anon with check (true);
create policy "Anon insert milestones" on milestones for insert to anon with check (true);
create policy "Anon insert quality_gates" on quality_gates for insert to anon with check (true);
create policy "Anon insert chatlog_entries" on chatlog_entries for insert to anon with check (true);
