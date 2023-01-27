---
title: "npmモジュールの更新チェックを自動化する"
tags: ["TypeScript", "node", "npm"]
slug: npm-module-auto-update-check
---
開発を実施している中でnpmを使用していると、依存しているモジュールの更新が発生した場合  
多くのプロジェクトでははGitHub上でdependabotAlertが出てから対応することになります。  

加えて現在ではクラウドを使用しない開発は稀であり、クラウドの仕様変更も同時に行われた場合  
問題の切り分けが難しくなることから、できるだけモジュール更新は随時行っていく必要があります。  

いままで期間が決まった開発が中心であったため問題に直面することが少なかったのですが、  
今回依存している箇所の更新が非常に多くかなり辛みがあったため以降で対策を取れるように  
定期的に更新状況を把握できるよう`npm run dev`のローカル起動時にコマンドを追加しました。

## package.jsonを更新
```package.json
  "scripts": {
    "dev": "npm outdated; echo '\r'; next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "typecheck": "tsc",
    "ci": "next lint && npm run typecheck && npm run build"
  }
```

![](../images/posts-image/2023-01-26.png)  
  
起動前に1秒程度出力の時間はかかるようになったが、更新必要かどうかが定期的に目に入るため  
かなり効果的な対策ができ良かった。