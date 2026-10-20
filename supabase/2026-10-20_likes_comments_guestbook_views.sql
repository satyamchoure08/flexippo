-- flexippo.com: real likes, comments, guestbook and page views for personal pages.
--
-- How to run: Supabase dashboard -> SQL Editor -> New query -> paste all of this -> Run.
-- Safe to run more than once. It only ADDS new tables; nothing that exists today is changed.
--
-- What it adds:
--   likes       one row per person per collection item they liked (login needed to like)
--   comments    comments on collection items (login needed to comment)
--   guestbook   messages on someone's page (login needed to sign)
--   page_stats  how many times each page was opened
-- Everyone can read these. People can only add/remove their own rows; a page's owner can also
-- delete comments and guestbook messages on their own page.

begin;

-- ---------------------------------------------------------------- likes
create table if not exists public.likes (
  page_id    uuid not null,
  item_id    text not null check (char_length(item_id) between 1 and 40),
  user_id    uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  primary key (page_id, item_id, user_id),
  constraint likes_page_fk foreign key (page_id) references public.profiles(id) on delete cascade,
  constraint likes_user_fk foreign key (user_id) references public.profiles(id) on delete cascade
);
create index if not exists likes_user_idx on public.likes (user_id);
alter table public.likes enable row level security;
drop policy if exists "likes are public" on public.likes;
create policy "likes are public" on public.likes for select to anon, authenticated using (true);
drop policy if exists "like as yourself" on public.likes;
create policy "like as yourself" on public.likes for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "remove your own like" on public.likes;
create policy "remove your own like" on public.likes for delete to authenticated using (user_id = (select auth.uid()));

-- ---------------------------------------------------------------- comments on collection items
create table if not exists public.comments (
  id         bigint generated always as identity primary key,
  page_id    uuid not null,
  item_id    text not null check (char_length(item_id) between 1 and 40),
  user_id    uuid not null default auth.uid(),
  body       text not null check (char_length(body) between 1 and 300),
  created_at timestamptz not null default now(),
  constraint comments_page_fk foreign key (page_id) references public.profiles(id) on delete cascade,
  constraint comments_user_fk foreign key (user_id) references public.profiles(id) on delete cascade
);
create index if not exists comments_item_idx on public.comments (page_id, item_id, created_at desc);
create index if not exists comments_user_idx on public.comments (user_id, created_at desc);
alter table public.comments enable row level security;
drop policy if exists "comments are public" on public.comments;
create policy "comments are public" on public.comments for select to anon, authenticated using (true);
drop policy if exists "comment as yourself" on public.comments;
create policy "comment as yourself" on public.comments for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "writer or page owner can delete" on public.comments;
create policy "writer or page owner can delete" on public.comments for delete to authenticated using ((select auth.uid()) in (user_id, page_id));

-- ---------------------------------------------------------------- guestbook
create table if not exists public.guestbook (
  id         bigint generated always as identity primary key,
  page_id    uuid not null,
  user_id    uuid not null default auth.uid(),
  body       text not null check (char_length(body) between 1 and 140),
  reply_to   bigint,
  item_id    text check (item_id is null or char_length(item_id) between 1 and 40),
  item_title text check (item_title is null or char_length(item_title) <= 80),
  created_at timestamptz not null default now(),
  constraint guestbook_page_fk foreign key (page_id) references public.profiles(id) on delete cascade,
  constraint guestbook_user_fk foreign key (user_id) references public.profiles(id) on delete cascade,
  constraint guestbook_reply_fk foreign key (reply_to) references public.guestbook(id) on delete cascade
);
create index if not exists guestbook_page_idx on public.guestbook (page_id, created_at desc);
create index if not exists guestbook_user_idx on public.guestbook (user_id, created_at desc);
create index if not exists guestbook_reply_idx on public.guestbook (reply_to);
alter table public.guestbook enable row level security;
drop policy if exists "guestbook is public" on public.guestbook;
create policy "guestbook is public" on public.guestbook for select to anon, authenticated using (true);
drop policy if exists "sign as yourself" on public.guestbook;
create policy "sign as yourself" on public.guestbook for insert to authenticated with check (
  user_id = (select auth.uid())
  and (guestbook.reply_to is null or exists (select 1 from public.guestbook g where g.id = guestbook.reply_to and g.page_id = guestbook.page_id))
);
drop policy if exists "writer or page owner can delete" on public.guestbook;
create policy "writer or page owner can delete" on public.guestbook for delete to authenticated using ((select auth.uid()) in (user_id, page_id));

-- the person posting is always the logged-in person, the time is always "now",
-- and nobody can post more than once every few seconds
create or replace function public.flexippo_check_post() returns trigger
language plpgsql set search_path = '' as $$
declare
  wait_for interval := coalesce(nullif(tg_argv[0], ''), '10 seconds')::interval;
  recent boolean;
begin
  new.user_id := (select auth.uid());
  new.created_at := now();
  if new.user_id is null then raise exception 'not_logged_in'; end if;
  new.body := btrim(new.body);
  execute format('select exists (select 1 from %I.%I where user_id = $1 and created_at > now() - $2)', tg_table_schema, tg_table_name)
    into recent using new.user_id, wait_for;
  if recent then raise exception 'slow_down'; end if;
  return new;
end $$;
drop trigger if exists comments_check_post on public.comments;
create trigger comments_check_post before insert on public.comments for each row execute function public.flexippo_check_post('8 seconds');
drop trigger if exists guestbook_check_post on public.guestbook;
create trigger guestbook_check_post before insert on public.guestbook for each row execute function public.flexippo_check_post('15 seconds');

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

-- everything a page needs in one call: views + like/comment counts per item + guestbook size
create or replace function public.page_summary(p_page uuid) returns json
language sql stable set search_path = '' as $$
  select json_build_object(
    'views', coalesce((select s.views from public.page_stats s where s.page_id = p_page), 0),
    'likes', coalesce((select json_object_agg(t.item_id, t.n) from (select l.item_id, count(*) as n from public.likes l where l.page_id = p_page group by l.item_id) t), '{}'::json),
    'comments', coalesce((select json_object_agg(t.item_id, t.n) from (select c.item_id, count(*) as n from public.comments c where c.page_id = p_page group by c.item_id) t), '{}'::json),
    'guestbook', (select count(*) from public.guestbook g where g.page_id = p_page)
  )
$$;

-- ---------------------------------------------------------------- who may do what through the website
revoke all on table public.likes, public.comments, public.guestbook, public.page_stats from anon, authenticated;
grant select on table public.likes, public.comments, public.guestbook, public.page_stats to anon, authenticated;
grant insert (page_id, item_id), delete on table public.likes to authenticated;
grant insert (page_id, item_id, body), delete on table public.comments to authenticated;
grant insert (page_id, body, reply_to, item_id, item_title), delete on table public.guestbook to authenticated;
grant insert (page_id), update (views) on table public.page_stats to anon, authenticated;

revoke all on function public.flexippo_check_post(), public.flexippo_count_view() from public, anon, authenticated;
revoke all on function public.add_view(uuid), public.page_summary(uuid) from public;
grant execute on function public.add_view(uuid), public.page_summary(uuid) to anon, authenticated;

commit;

-- reload the website's view of the database so the new tables work straight away
notify pgrst, 'reload schema';
