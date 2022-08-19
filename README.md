# blog.sena-v.com

https://sena-v.com/

## Stack

Next / TypeScript / Recoil / netlify

## branch

---

## main

production
リリース ok の場合、PR で main にマージする

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
