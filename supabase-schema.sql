-- Supabase SQL Editor에서 이 파일 내용을 먼저 실행하세요.
-- anon key로 브라우저에서 저장/검색/삭제할 수 있도록 데모용 RLS 정책을 포함했습니다.

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  patient_no text not null unique,
  unknown_patient text default 'N',
  first_visit_date date,
  prefix text,
  last_name text not null,
  first_name text not null,
  middle_name text,
  middle_prefix text,
  full_name text,
  personal_id_type text,
  personal_id text,
  birth_date date,
  age int,
  birth_place text,
  blood_type text,
  gender text,
  civil_status text,
  maiden_last_name text,
  maiden_middle_name text,
  nationality text,
  ethnic_group text,
  country text,
  region text,
  district text,
  city text,
  street text,
  address_detail text,
  education text,
  landline text,
  mother_last_name text,
  mother_first_name text,
  mother_middle_name text,
  mother_birth_date date,
  senior_number text,
  mobile text,
  email text,
  vip text default 'N',
  pcb text default 'N',
  remarks text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.patients enable row level security;

drop policy if exists "patients demo select" on public.patients;
drop policy if exists "patients demo insert" on public.patients;
drop policy if exists "patients demo update" on public.patients;
drop policy if exists "patients demo delete" on public.patients;

create policy "patients demo select"
on public.patients for select
to anon
using (true);

create policy "patients demo insert"
on public.patients for insert
to anon
with check (true);

create policy "patients demo update"
on public.patients for update
to anon
using (true)
with check (true);

create policy "patients demo delete"
on public.patients for delete
to anon
using (true);
