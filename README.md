# blog.sena-v.com

https://sena-v.com/

## Stack

- Next.js App Router with TypeScript
- React Server Components (RSCs)
- 100% Server Actions
- Using Next.js's Metadata
- Styling with vanilla-extract, Google Fonts
- Auto Check Code intelligence with Prettier, Eslint
- Integration Testing with Playwright
- Build and hosting to Vercel

## Requirements

- Node.js 22.x

## branch


### main

production
リリース ok の場合、PR で main にマージする

### layout / customize_blog

デザイン変更・設定追加・機能追加等

### post/post_date

記事追加用。

---

## develop cmd

```
# start server
npm run dev

# dev server
open http://localhost:3000

# lint & typechek & buildcheck
npm run ci

# run e2e locally
npm run build && npm run e2e

```

### deploy

テストはPR時にGitHub Actionsで実施、vercel側でビルド・デプロイを実行
本番環境にはデプロイ後e2eが走るため、デプロイ時のみ発生する問題はここでキャッチ可能

---

### other
