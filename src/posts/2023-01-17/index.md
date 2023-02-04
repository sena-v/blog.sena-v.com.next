---
title: "Wowza API v1.6->v1.9で認証方法を変更する"
tags: ["node", "wowza"]
slug: wowza-authorization-to-jwt
coverImage: "2023-01-17.png"
---

配信関連のタスクとして、wowzaのAPIアップデートを実施した際に記事がなかったため記録。

## wowzaとは？
![](/images/posts-image/2023-01-17.png)

[Wowza](https://wowza.dpsj.co.jp/)

WebRTCを使用しストリーミング配信を実施できるソフトウェア  
cloud・Streaming Engineを利用し自鯖での運用が可能。

## wowza videoAPI v1.6が非推奨に
[Wowza REST API LyfeCycle](https://www.wowza.com/docs/wowza-video-rest-api-lifecycle-management)

2020年末からの運用バージョンとなっていたv1.6が2023/3/15を持って非推奨となるため、  
これからのアップデートをできるだけ抑えるためにはv1.6から最新のv1.9への更新が必要となりました。

公式のMigrationGuideを確認したところ、破壊的な変更がなかったためv1.6->v1.9に直接更新したところ  
wowza側より`"No Access Token Error"`のresponse...

## Wowza Video APIの認証方法が変わった
v1.9から認証方法が変更になり通常のAPIキーからJWT形式のキーに変更された対応が必要になりました。  
JWTはJSONに署名を足して暗号化した物で、複合にキーが必要となるためよりセキュアになっている感じです。

JWT(JSON Web Token) - [Qiita](https://qiita.com/knaot0/items/8427918564400968bd2b)

## APIにJWTを含める
```
const endpoint = https://api.video.wowza.com/api/v1.9/endpointName

// headerを生成
const jwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6....`
const postHeader = { 
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
    }

// body(リクエストに使用するデータを生成)
const postdata = {...[任意のデータ]}

await fetch(endpoint,  {
        method: 'POST',
        headers: postHeader
        body: JSON.stringify(postData)
    })

```

postHeaderに送信するjwtTokenを入れる際、環境変数から直取得するとダブルクオートが入って  
Invalid_Tokenでエラーになるためpostされる前のheaderが正確に生成できているか注意する必要があります。  
(サーバー側では半角スペースでsplitされてるっぽい？)

検証のためv1.6->v1.7,v1.7->v1.8を実施したところ問題なくアップデートできたため、  
環境的な理由でJWTが利用できない場合はv1,8を利用することで2024/3月までの延命が可能です。  
(v1.8までで乗り換え検討してる場合や、コンソール管理者がすぐにわからないがv1.6を利用してる場合など)

Lifecycle scheduleを見るとマイナーアップデートについては半年程となるため、  
v1.9の2024年9月には再度対応が必要になるかもしれないので注視したいと思います。


