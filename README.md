# 黄白レモ Official Website

黄色と白を基調にした黄白レモ公式サイトです。React + Viteで構築し、Vercelへそのまま公開できます。

## ローカル起動

```bash
npm install
npm run dev
```

## Vercelで公開

1. このプロジェクトをGitHubなどのGitリポジトリへ追加します。
2. Vercelの「Add New Project」からリポジトリを選択します。
3. Framework Presetが`Vite`、Build Commandが`npm run build`、Output Directoryが`dist`であることを確認します。
4. Deployを実行します。

`vercel.json`でSPA用のフォールバックを設定しているため、`/profile/`と`/guideline/`へ直接アクセスしても表示されます。

## FAN ART GALLERYへの作品追加

受け取ったファンアートは`src/fan-art.ts`の一覧へ追加します。Xの画像URLを利用するか、画像を`public/images/fan-art/`へ保存して登録できます。掲載数に上限はなく、作品が増えるとギャラリーの段も自動で増えます。作者名と元投稿URLは作品ごとに設定できます。

## 検索・SNS表示

公開前の標準設定は次のとおりです。

- サイト名: `黄白レモ オフィシャルサイト`
- 検索説明文: `アイドル見習いVTuber`
- favicon: `public/favicon.png`
- SNS共有画像: `public/images/hero-final.jpg`
- Webアプリ情報: `public/site.webmanifest`
- クローラー設定: `public/robots.txt`

トップページの検索説明文・OGP・Twitterカードは`index.html`で変更できます。プロフィールとガイドラインの個別タイトル・説明文は`src/site.config.ts`の`seo`で変更できます。

本番ドメインが決まったら、canonical URL、`og:url`、サイトマップのURLを追加します。

## 主な画像

- ヘッダーロゴ: `public/images/header-logo.webp`
- キービジュアル背景: `public/images/hero-background.jpg`
- キービジュアル人物: `public/images/hero-character.png`
- キービジュアル完成画像: `public/images/hero-final.jpg`
- CONTACTマスコット: `public/images/contact-mascot.webp`
- フッターイラスト: `public/images/header-contact-icon.webp`
- ギャラリー: `public/images/gallery/`
- グッズ画像: `public/images/goods/`

サイト内の名称・リンク・プロフィール・楽曲・実績・ガイドラインなどは`src/site.config.ts`にまとめています。
