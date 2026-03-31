create table if not exists public.zuvvy_survey (
  id bigint generated always as identity primary key,
  userType text,
  phoneBehavior text,
  biggestProblem text,
  wouldUse text,
  excitesMost text,
  suggestions text,
  email text,
  answers jsonb not null,
  "timestamp" timestamptz not null default now()
);

alter table public.zuvvy_survey enable row level security;

create policy "Allow inserts for anon users"
on public.zuvvy_survey
for insert
to anon
with check (true);
