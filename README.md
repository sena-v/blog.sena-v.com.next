# blog.sena-v.com

https://sena-v.com/

## Stack

Next / TypeScript / Recoil / netlify

## branch

---

## main

production
リリース ok の場合、PR で main にマージする

リリースは Acitions にてビルドして Deploy
https://qiita.com/nwtgck/items/e9a355c2ccb03d8e8eb0
※netlify-build の環境依存エラーを無視・ビルド時間節約できるため

## custom_blog

デザイン変更・設定追加・機能追加等

## post/date(yyyy-mm-dd)

記事追加用。更新前に master に対して PR → マージする

---

### develop cmd

```
# start server
npm run dev

# dev server
open http://localhost:3000

# lint & typechek & buildcheck
npm run ci

```

### deploy

以下テスト終了後、main ブランチマージ時自動デプロイ

- netlify 側 Deploy Check

---

### other

参考
https://tamalog.szmd.jp/next-markdown-blog/

next/image の LightHouse 指摘は LightHouse のバグのため issue 監視すること(2022-08-17 release Staged)
https://github.com/GoogleChrome/lighthouse/issues/11631#issuecomment-1217146090
