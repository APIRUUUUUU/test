# Vplus 企業ダッシュボード

VTuberとの広告案件マッチングプラットフォーム「Vplus」の企業向けダッシュボード。

## 機能

- 🔐 企業IDでログイン
- 📊 ダッシュボード（全案件のKPI・トレンド表示）
- 🎯 案件の作成・編集・削除
- 🔗 VTuber専用URLの発行・管理（コピペ可）
- 📈 案件詳細・VTuber詳細の分析
- 🖱️ クリックの自動トラッキング & リダイレクト

## 技術スタック

| 役割 | 使うもの |
|------|---------|
| フロントエンド | React 18 + Vite |
| DB & 認証 | Supabase（PostgreSQL） |
| クリックトラッキング | Vercel Serverless Function |
| グラフ | Recharts |
| ホスティング | Vercel |

---

## 🚀 セットアップ手順（30分でデプロイまで）

### 1. Supabaseでプロジェクト作成

1. https://supabase.com にアクセスし、サインアップ
2. **New Project** をクリック
3. プロジェクト名・パスワードを入力（リージョンは Tokyo がおすすめ）
4. プロジェクト作成完了まで2〜3分待つ

### 2. データベース構築

1. Supabaseダッシュボードの左メニューから **SQL Editor** を開く
2. **New query** をクリック
3. このリポジトリの `supabase/schema.sql` の中身を全てコピー＆ペースト
4. **Run** をクリック
5. サンプルデータが投入されます（企業ID: `corp-001`, `corp-002`）

### 3. 環境変数を取得

1. Supabaseダッシュボードの左下 **Project Settings** → **API** を開く
2. **Project URL** と **anon public** キーをメモ

### 4. ローカル起動

```bash
# リポジトリをクローン
git clone <あなたのリポジトリURL>
cd vplus-dashboard

# 環境変数を設定
cp .env.example .env
# .envを編集してSupabaseのURLとANON_KEYを記入

# 起動
npm install
npm run dev
```

http://localhost:5173 を開いて `corp-001` でログイン！

### 5. Vercelデプロイ

1. GitHubにpush
2. https://vercel.com → **Add New Project** → リポジトリをImport
3. **Environment Variables** に追加：
   - `VITE_SUPABASE_URL` = `https://xxxxx.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGc...`
4. **Deploy** をクリック

数十秒で URL が発行されます 🎉

---

## 🖱️ クリックトラッキングの仕組み

```
VTuber専用URL: https://your-domain.vercel.app/r/abc12345
   ↓ クリック
[Vercel Serverless Function]
   1. short_code から URL情報を取得
   2. clicks テーブルにレコード追加
   3. 案件の target_url にリダイレクト
   ↓
[視聴者は案件のランディングページへ]
```

ダッシュボードはこの `clicks` テーブルを集計してリアルタイム表示します。

---

## 📦 ファイル構成

```
vplus-dashboard/
├── api/
│   └── r.js                          # クリックトラッキング & リダイレクト
├── src/
│   ├── App.jsx                       # ルーティング
│   ├── main.jsx
│   ├── index.css
│   ├── lib/
│   │   ├── supabase.js               # Supabaseクライアント
│   │   └── api.js                    # DB操作の関数群
│   ├── components/
│   │   ├── MetricCard.jsx
│   │   ├── PeriodSelector.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatusBadge.jsx
│   └── pages/
│       ├── LoginScreen.jsx           # ログイン
│       ├── DashboardScreen.jsx       # ダッシュボード
│       ├── CampaignCreateScreen.jsx  # 案件作成
│       ├── CampaignDetailScreen.jsx  # 案件詳細
│       ├── VtuberManageScreen.jsx    # VTuber URL管理
│       └── VtuberDetailScreen.jsx    # VTuber詳細
├── supabase/
│   └── schema.sql                    # DBスキーマ + サンプルデータ
├── vercel.json                       # Vercelルーティング設定
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

---

## 🗄️ データベース構造

| テーブル | 用途 |
|---------|------|
| `companies` | 企業情報（ログインIDの管理） |
| `campaigns` | 広告案件 |
| `vtuber_urls` | VTuber専用の短縮URL（short_codeで識別） |
| `clicks` | クリックログ（個別レコード） |

クリック数は `clicks` テーブルから集計（リアルタイム）。

---

## 🔐 新しい企業を追加する

SupabaseのSQL Editorで実行：

```sql
insert into companies (company_id, company_name) values
  ('your-corp-id', '貴社の名前');
```

---

## ⚠️ セキュリティについて

現在は **企業IDのみで認証**（パスワードなし）です。社内利用・デモ用途を想定しています。
本番運用の前に：

- Supabase Authでパスワード認証を実装
- Row Level Security（RLS）を企業ごとに分離
- `vercel.json` でレート制限を追加

---

## 📝 Phase 2 候補

- パスワード認証 / Google OAuth
- VTuber側の案件選択機能
- CSV エクスポート
- メール通知（週次レポート）
- 複数担当者の権限管理
- A/Bテスト用の複数target_url
