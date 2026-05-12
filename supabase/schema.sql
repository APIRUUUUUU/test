-- =========================================
-- Vplus 企業ダッシュボード スキーマ
-- =========================================
-- Supabaseのダッシュボード > SQL Editor で実行してください

-- 既存のテーブルを削除（再実行用）
drop table if exists clicks cascade;
drop table if exists vtuber_urls cascade;
drop table if exists campaigns cascade;
drop table if exists companies cascade;

-- 企業
create table companies (
  company_id   text primary key,
  company_name text not null,
  created_at   timestamptz default now()
);

-- 案件
create table campaigns (
  campaign_id     uuid primary key default gen_random_uuid(),
  company_id      text references companies(company_id) on delete cascade,
  campaign_name   text not null,
  description     text,
  target_url      text not null,
  start_date      date not null,
  end_date        date not null,
  status          text not null default 'active', -- 'active' | 'ended'
  created_at      timestamptz default now()
);

-- VTuber専用URL
create table vtuber_urls (
  url_id        uuid primary key default gen_random_uuid(),
  campaign_id   uuid references campaigns(campaign_id) on delete cascade,
  vtuber_id     text not null,
  vtuber_name   text not null,
  short_code    text unique not null,
  created_at    timestamptz default now()
);

-- クリックログ
create table clicks (
  click_id      bigserial primary key,
  url_id        uuid references vtuber_urls(url_id) on delete cascade,
  clicked_at    timestamptz default now(),
  user_agent    text,
  referer       text
);

-- インデックス（パフォーマンス向上）
create index idx_clicks_url_id_clicked_at on clicks(url_id, clicked_at);
create index idx_clicks_clicked_at on clicks(clicked_at);
create index idx_campaigns_company_id on campaigns(company_id);
create index idx_vtuber_urls_campaign_id on vtuber_urls(campaign_id);
create index idx_vtuber_urls_short_code on vtuber_urls(short_code);

-- =========================================
-- RLS（行レベルセキュリティ）
-- Phase 1: 認証なしで全アクセス可能（社内利用想定）
-- =========================================
alter table companies    enable row level security;
alter table campaigns    enable row level security;
alter table vtuber_urls  enable row level security;
alter table clicks       enable row level security;

create policy "allow all on companies"   on companies   for all using (true) with check (true);
create policy "allow all on campaigns"   on campaigns   for all using (true) with check (true);
create policy "allow all on vtuber_urls" on vtuber_urls for all using (true) with check (true);
create policy "allow all on clicks"      on clicks      for all using (true) with check (true);

-- =========================================
-- 日別クリック集計ビュー
-- =========================================
create or replace view daily_click_counts as
select
  vu.campaign_id,
  vu.url_id,
  vu.vtuber_id,
  vu.vtuber_name,
  date(c.clicked_at) as date,
  count(*) as click_count
from clicks c
join vtuber_urls vu on vu.url_id = c.url_id
group by vu.campaign_id, vu.url_id, vu.vtuber_id, vu.vtuber_name, date(c.clicked_at);

-- =========================================
-- サンプルデータ
-- =========================================
insert into companies (company_id, company_name) values
  ('corp-001', 'サンプル株式会社'),
  ('corp-002', 'デモ商事');

insert into campaigns (campaign_id, company_id, campaign_name, description, target_url, start_date, end_date, status) values
  ('11111111-1111-1111-1111-111111111111', 'corp-001', '新作ゲームローンチキャンペーン', 'RPG新作「クロニクル・ゼロ」リリース記念', 'https://example.com/game', '2025-04-13', '2025-05-12', 'active'),
  ('22222222-2222-2222-2222-222222222222', 'corp-001', '夏コレクション告知', '夏季新作アパレル PR', 'https://example.com/summer', '2025-03-01', '2025-04-30', 'ended');

insert into vtuber_urls (campaign_id, vtuber_id, vtuber_name, short_code) values
  ('11111111-1111-1111-1111-111111111111', 'v1', '星宮あかり', 'akari001'),
  ('11111111-1111-1111-1111-111111111111', 'v2', '夜空みこと', 'mikoto01'),
  ('11111111-1111-1111-1111-111111111111', 'v3', '蒼井ルナ',  'luna0001'),
  ('22222222-2222-2222-2222-222222222222', 'v2', '夜空みこと', 'mikoto02'),
  ('22222222-2222-2222-2222-222222222222', 'v4', '白雪ちとせ', 'chitose1');

-- サンプルクリック（過去30日分・ランダム）
insert into clicks (url_id, clicked_at)
select
  vu.url_id,
  now() - (random() * interval '30 days')
from vtuber_urls vu,
     generate_series(1, 50 + (random() * 200)::int);
