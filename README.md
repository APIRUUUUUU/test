# Vplus 企業ダッシュボード

VTuberとの広告案件マッチングプラットフォーム「Vplus」の企業向けダッシュボード（Phase 1）です。

## 技術スタック

- **React 18** + **Vite 5**
- **Recharts** — グラフ描画
- スタイリング：インラインスタイル（CSS-in-JS）

## セットアップ

### 必要環境
- Node.js 18 以上

### インストールと起動

```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173 を開いてください。

### ビルド（本番用）

```bash
npm run build
npm run preview
```

## ログイン

Phase 1 はパスワード認証未実装です。
企業IDに任意の文字列（例：`corp-001`）を入力してログインできます。

## 画面構成

```
ログイン
  └── ダッシュボード（全体KPI・グラフ・案件一覧）
        └── 案件詳細（VTuber別クリック数・グラフ）
              └── VTuber詳細（案件別クリック数・シェア）
```

## ファイル構成

```
src/
  App.jsx                       # ルーティング・状態管理
  main.jsx                      # エントリーポイント
  index.css                     # グローバルスタイル
  components/
    MetricCard.jsx              # KPIカード
    PeriodSelector.jsx          # 期間選択ボタン
    Sidebar.jsx                 # サイドバーナビゲーション
    StatusBadge.jsx             # ステータスバッジ
  pages/
    LoginScreen.jsx             # ログイン画面
    DashboardScreen.jsx         # ダッシュボード
    CampaignDetailScreen.jsx    # 案件詳細
    VtuberDetailScreen.jsx      # VTuber詳細
  data/
    mockData.js                 # モックデータ（APIに置き換え予定）
```

## API接続（Phase 2 以降）

`src/data/mockData.js` を以下のAPI呼び出しに置き換えてください：

| 画面 | API |
|------|-----|
| ログイン | `POST /api/v1/auth/login` |
| ダッシュボード | `GET /api/v1/dashboard` |
| 案件詳細 | `GET /api/v1/campaigns/{campaign_id}` |
| クリック時系列 | `GET /api/v1/analytics/timeseries` |
