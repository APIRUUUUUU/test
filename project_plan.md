# しゅりプロ（Schritt Production）ライバー募集LP

## 1. Project Description
IRIAMで活動するVライバーを募集するための集客LP。訪問者に事務所の魅力を伝え、応募フォームへの送信をゴールとする。

ターゲット：
- 配信未経験でVライバーに興味がある10〜20代
- フリーで活動中でサポートを求めているライバー
- 副業・趣味として配信や収益化を考えている方
- スマホでの閲覧が多いため、モバイルファーストで設計

## 2. Page Structure
- `/` - ライバー募集LP（ホームページ）
  - HEADER（ナビゲーション）
  - SECTION 01：FIRST VIEW（ファーストビュー）
  - SECTION 02：CONCEPT（コンセプト）
  - SECTION 03：SUPPORT（サポート内容）
  - SECTION 04：REQUIREMENTS（応募条件）
  - SECTION 05：SELECTION FLOW（選考フロー）
  - SECTION 06：FAQ（よくある質問）
  - SECTION 07：CLOSING CTA（クロージング）
  - FOOTER

## 3. Core Features
- [ ] 固定ナビゲーションヘッダー（スムーズスクロールアンカーリンク）
- [ ] ファーストビュー（キャッチコピー + CTA）
- [ ] CONCEPTセクション
- [ ] SUPPORTカードグリッド（8項目）
- [ ] REQUIREMENTS（MUST/WELCOME条件）
- [ ] SELECTION FLOW（縦タイムライン）
- [ ] FAQアコーディオン（7項目）
- [ ] CLOSING CTA + 応募フォームリンク
- [ ] フッター
- [ ] モバイルハンバーガーメニュー
- [ ] アンカーリンクによるスムーズスクロール

## 4. Data Model Design
現時点では不要。応募フォームはGoogleフォーム外部リンクで対応予定。

## 5. Backend / Third-party Integration Plan
- Supabase: 不要（現時点では外部フォームを使用）
- Shopify: 不要
- Stripe: 不要
- Google Form: 応募フォームとして後で差し替え予定

## 6. Development Phase Plan

### Phase 1: LP制作（コアページ）
- Goal: 全セクションのレイアウトとスタイリング、応答性を持ったLP完成
- Deliverable: 
  - Tailwind設定（カラー、フォント）
  - ナビゲーションコンポーネント
  - 全7セクションのコンポーネント
  - FAQアコーディオン機能
  - スムーズスクロール
  - モバイル対応
  - フッター

### Phase 2: 微調整・応募フォーム連携
- Goal: GoogleフォームURLの差し替え、細かい調整
- Deliverable:
  - 応募フォームリンク設定
  - 画像差し替え
  - パフォーマンス最適化
  - アニメーション調整