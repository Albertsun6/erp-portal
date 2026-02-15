-- ERP Portal Schema
-- Run this in Supabase SQL Editor

-- 1. Documents table (methodology docs + project docs)
create table if not exists documents (
  id text primary key,
  title text not null,
  domain text,
  level text not null check (level in ('L0','L1','L2','project')),
  status text not null default 'placeholder' check (status in ('confirmed','skeleton','placeholder')),
  content_md text not null default '',
  current_version int not null default 1,
  fill_timeline text,
  current_ref text,
  parent_id text references documents(id),
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- 2. Document versions
create table if not exists doc_versions (
  id uuid primary key default gen_random_uuid(),
  document_id text not null references documents(id) on delete cascade,
  version_num int not null,
  content_md text not null,
  change_summary text not null default '',
  author_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index idx_doc_versions_doc on doc_versions(document_id, version_num desc);

-- 3. Phases
create table if not exists phases (
  id text primary key,
  name text not null,
  phase_num int not null,
  status text not null default 'not-started' check (status in ('not-started','in-progress','completed')),
  description text not null default '',
  start_date date,
  end_date date,
  progress int not null default 0,
  activities jsonb not null default '[]'::jsonb,
  deliverables jsonb not null default '[]'::jsonb
);

-- 4. Milestones
create table if not exists milestones (
  id text primary key,
  phase_id text not null references phases(id) on delete cascade,
  name text not null,
  code text not null,
  status text not null default 'not-started' check (status in ('not-started','in-progress','completed')),
  target_date date
);

-- 5. Quality gates
create table if not exists quality_gates (
  id text primary key,
  phase_transition text not null,
  check_item text not null,
  verify_method text not null default '',
  pass_criteria text not null default '',
  is_passed boolean not null default false,
  checked_by uuid references auth.users(id),
  checked_at timestamptz
);

-- 6. Chatlog entries
create table if not exists chatlog_entries (
  id text primary key,
  chat_time timestamptz not null,
  title text not null,
  user_need text not null default '',
  solution text not null default '',
  code_changes text not null default '',
  key_decisions text,
  status_tag text not null default 'completed' check (status_tag in ('completed','in-progress','unresolved'))
);

-- ============ Row Level Security ============

alter table documents enable row level security;
alter table doc_versions enable row level security;
alter table phases enable row level security;
alter table milestones enable row level security;
alter table quality_gates enable row level security;
alter table chatlog_entries enable row level security;

-- Authenticated users can read and write all data
create policy "Authenticated read documents" on documents for select to authenticated using (true);
create policy "Authenticated write documents" on documents for all to authenticated using (true) with check (true);

create policy "Authenticated read doc_versions" on doc_versions for select to authenticated using (true);
create policy "Authenticated write doc_versions" on doc_versions for all to authenticated using (true) with check (true);

create policy "Authenticated read phases" on phases for select to authenticated using (true);
create policy "Authenticated write phases" on phases for all to authenticated using (true) with check (true);

create policy "Authenticated read milestones" on milestones for select to authenticated using (true);
create policy "Authenticated write milestones" on milestones for all to authenticated using (true) with check (true);

create policy "Authenticated read quality_gates" on quality_gates for select to authenticated using (true);
create policy "Authenticated write quality_gates" on quality_gates for all to authenticated using (true) with check (true);

create policy "Authenticated read chatlog_entries" on chatlog_entries for select to authenticated using (true);
create policy "Authenticated write chatlog_entries" on chatlog_entries for all to authenticated using (true) with check (true);
