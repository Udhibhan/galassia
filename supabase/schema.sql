-- Run once in Supabase → SQL Editor.
-- Applications are written only by the Next.js API route using the service-role key.
-- RLS is enabled with NO policies, so the public anon key can neither read nor write.

create table if not exists public.applications (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  full_name   text not null check (char_length(full_name) between 1 and 120),
  email       text not null unique
              check (email ~* '^[a-z0-9._%+-]+@(u\.nus\.edu|nus\.edu\.sg)$'),
  year        text not null check (char_length(year) <= 40),
  major       text not null check (char_length(major) between 1 and 120),
  teams       text[] not null default '{}',
  why         text not null check (char_length(why) between 20 and 3000),
  links       text check (char_length(links) <= 500),
  resume_path text not null,
  status      text not null default 'new'
              check (status in ('new', 'reviewing', 'interview', 'accepted', 'rejected'))
);

alter table public.applications enable row level security;

create index if not exists applications_created_at_idx on public.applications (created_at desc);

-- Private bucket for resumes: PDF only, 4 MB max.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resumes', 'resumes', false, 4194304, array['application/pdf'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
