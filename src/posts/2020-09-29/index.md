---
title: "Firebaseプロジェクトのデプロイ先変更を行う"
tags: ["Firebase"]
slug: "firebase-deploy"
---

既存のプロジェクトと同じ構成(自分は vue)の開発を進めたい時、  
clone してきたプロジェクトのデプロイ先は以前設定していた箇所となっているため、  
firebase init した後 firebase deploy を実施してもデプロイ先は動的に変更されない。  

※clone してきたディレクトリ名や main.js 等で指定した Firebase SDK snippet 等の  
　認証を勝手に読んでデプロイ先を変更してくれる等の機能はなく、デプロイ先変更コマンドとして  
　明示的に変更して上げる必要がある(SDK はあくまで認証時にのみ使用されるため)  

結論： firebase use (ProjectID) を使用することでデプロイ先を変更する  

```
git clone https://github.com/xxxxxxxx/yyyyyyyy.git

// 任意の方法で新規プロジェクト名：zzzzzzzにリネームを実施

firebase use zzzzzz
firebase deploy  // zzzzzzにデプロイが実施される
```

実行結果

![a](../images/posts-image/2020-09-29-01.png)

注意：firebase のデプロイ先を変更しても FirebaseSDK の設定は動的に変わらないため、  
認証等を使用する場合新しく作成したプロジェクトの情報を新しく登録する必要あり。  
(※で書いている内容の逆：Firebase 機能が使えるかは別途確認すること)  
