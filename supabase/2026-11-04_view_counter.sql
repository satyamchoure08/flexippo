-- flexippo.com: the page view counter (the only database change the current site needs).
-- Checked 4 Nov 2026: table page_stats and function add_view did not exist yet, so view counts were off.
-- How to run: Supabase dashboard -> SQL Editor -> New query -> paste all of this -> Run.
-- Safe to run more than once. It only adds the view counter; nothing that exists today is changed.
-- This replaces the views part of 2026-10-20_likes_comments_guestbook_views.sql.
-- The likes, comments and guestbook parts of that file belonged to the old site and are NOT needed.

begin;

-- ---------------------------------------------------------------- page views
create table if not exists public.page_stats (
  page_id    uuid primary key references public.profiles(id) on delete cascade,
  views      bigint not null default 0 check (views >= 0),
  updated_at timestamptz not null default now()
);
alter table public.page_stats enable row level security;
drop policy if exists "views are public" on public.page_stats;
create policy "views are public" on public.page_stats for select to anon, authenticated using (true);
drop policy if exists "anyone can add a view" on public.page_stats;
create policy "anyone can add a view" on public.page_stats for insert to anon, authenticated with check (true);
drop policy if exists "anyone can add a view again" on public.page_stats;
create policy "anyone can add a view again" on public.page_stats for update to anon, authenticated using (true) with check (true);

-- visitors can only ever add exactly 1 view (they can't set the number)
create or replace function public.flexippo_count_view() returns trigger
language plpgsql set search_path = '' as $$
begin
  if current_user in ('anon', 'authenticated') then
    if tg_op = 'INSERT' then
      new.views := 1;
    else
      new.page_id := old.page_id;
      new.views := old.views + 1;
    end if;
  end if;
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists page_stats_count_view on public.page_stats;
create trigger page_stats_count_view before insert or update on public.page_stats for each row execute function public.flexippo_count_view();

create or replace function public.add_view(p_page uuid) returns bigint
language sql set search_path = '' as $$
  insert into public.page_stats as s (page_id) values (p_page)
  on conflict (page_id) do update set views = s.views + 1
  returning s.views
$$;

-- who may do what through the website
revoke all on table public.page_stats from anon, authenticated;
grant select on table public.page_stats to anon, authenticated;
grant insert (page_id), update (views) on table public.page_stats to anon, authenticated;
revoke all on function public.flexippo_count_view() from public, anon, authenticated;
revoke all on function public.add_view(uuid) from public;
grant execute on function public.add_view(uuid) to anon, authenticated;

commit;

-- reload the website's view of the database so the counter works straight away
notify pgrst, 'reload schema';
