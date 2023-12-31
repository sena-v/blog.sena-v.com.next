---
title: "2023年振り返り"
tags: ["振り返り", "技術"]
slug: log-202301-202312
coverImage: "nextjs.png"
---

# 技術関連

## フロントエンド

### Next.js v13からv14の進化適応、プロダクションコードへの反映

#### NextのPage RouterからApp Routerへの移行
途中からリーダーとなったプロダクトがNextのv12であったため、先ずv13.3へのアップデートを実施しました(年始)。  

その後[2023年4月にNextがv13.4がリリースされApp Routerがstableとなった](https://nextjs.org/blog/next-13-4)ため、  
- Nextの機能拡張予想として、Pages側の拡張は緩めでApp Router側の拡張が多く実施される可能性が高かった
- 当時の開発時点ではバックエンドでリファクタリング作業がメインであり、Web側の追加開発が少ない時期だった
- 今後機能拡張が進んでいった場合にライブラリ差し替えの手間が今以上に増える可能性が高い予想をした

といった状況でタイミングが良かったため、App Router対応を行うことに決めました。

対応に必要な作業はいくつかありましたが、公式で示されているような「とりあえず"use client"」方式での移行は、  
トップルートとなる"/app/page.tsx"でもやってしまうと今後の面倒臭さが残るため、トップルートはRSCとして  
それ以降のコンポーネントをクライアントコンポーネントとしてまずは進めることとしました。

それ以外に必要な作業として当時RSCに対応していなかったCSSライブラリ(Emotion)の差し替えと、  
依存するライブラリを追加でimportしないと使えないDIライブラリ(tsyringe)の差し替え対応が必要でした。

CSSライブラリについてはその時点でアップデートの影響を受けづらいとされていたCSS Modulesに移行しました。

チームで自分以外の開発者はそこまでCSS/Reactに詳しいわけではなくできるだけキャチアップが楽なことと、  
既存のEmotionの実装がCSS記述側での分岐が多く画面で表示されるものがイメージしづらいコードだったため、  
リファクタリングに合わせてReact側にコンポーネントの出しわけを移動するなど可読性を重視した構成としました。  

移行自体はほぼ一人で実施したためある程度時間がかかりましたが、App Router関連の知識が増えたことと  
作業の中で色々なライブラリを比較することができたためかなり勉強になったと思いました。


#### Server Actions化とRSCへの本格対応
上記で述べたメイン開発しているサービスと別に、メインサービス関連の商用サービスを並行開発することになりました。  

こちらはメインと異なり社内開発のため、同タイミングでNext14へのアップデート・Server Actionsのstable化が  
アナウンスされたため、Next14の最新構成と相性の良いライブラリを採用して開発することにしました。

現時点では基本要素の実装程度の段階ですが、RSCが9割、CCはクライアントからの入力値を受け取る場合のみ使用、  
クライアント側でのAPI実行はなくし、100%Server Actionsに寄せてServer Actions個々にユニットテストを実装、  
RTLがRSCに未対応のため、e2eテストを厚めに書くことで品質を担保するようにしています。

1割のCCについてはReact Hook Formとzodを使用し、状態をできるだけクライアントに持たせないようにした上で  
どうしても必要な状態についてはnext/headerのcookieを使用して管理する構成としています。

Serer Actionsについて詳細は公式解説があるためここでは書きませんが、Pages Router時点での実装と比べて  
- カスタムフックのように色々な書き方があるわけではなく個別の関数として見れること
- "use server"するのは基本ファイル分割して実装することでテストが書きやすいこと
- クライアント側に不要な情報+不要なライブラリのインスタンスを渡さなくて済むこと

などから使用感はいい感じで、画面の動きが多くないような商用サイト開発では非常に使いやすい印象です。

#### e2eテストの拡充
時期は前後しますが、Nextのv13.3アップデート対応に合わせてe2eの実装を行いました。  

当時そのプロジェクトを担当することになりリーダーになって直ぐコードを分析したところ、  
- 非同期処理のタイミングがうまく制御できていない
- anyが多すぎてTypeScriptを使っている意味がほぼない
- 中途半端にクリーンアークテクチャで実装されているが、DIができておらず相互依存しまくっている
- コンポーネントのpropsが50個くらい単体で渡されている
- 1000行くらいあるカスタムフック(テストなし)、useState20個、useCallBackの配列に10オブジェクトetc  

など色々とすごいことになっており、Webを触ってみても正常動作さえあまり安定しないコードになっていました。

※個別詳細は地味なため割愛しますが、当時のチームメンバーはReact的知識がとても薄かったため  
　個別にタスクを分割して貯めておき、合間に時間を作りながら一人で半年かけてコツコツリファクタリングしました。

非同期処理系・linter系など特に安定しない箇所は先行して直した上で、安定性を担保するためPlaywrightを使用して  
e2eテストを正常系だけNextアップデート前に実装し、デグレ可能性を下げ正常動作の安定性を担保するようにしました。

アップデート完了後は少しずつ拡張をしながら異常系もe2eで確認するようにし、手動テストが必要な範囲を減らした上で  
全体の品質を担保できるようになったため、結果としてかなりのテスト時間を削減できたと思います。

### DI関連(brandi)
前提としてフロントエンドの場合、DIはバックエンドほど重要度は低いです。

基本的にテスト戦略的にはできるだけバグに早く気付けるような構成にしたいところですが、  
現状RTLでServer Component(RSC)のテストは不可能なためe2eに寄せるか、他の手を考える必要があります。

その上でRSCの割合が全体で8-9割程度の場合、Server ActionsのFunction単位テストが重要になります。  

残りのClient Component(CC)のほとんどはユーザーからの入力を受ける箇所になるため、  
Server Actions(SA)側でテストが十分に書かれていればCC単位レベルのテストが存在しなくてもほとんど影響はありません。

入力値での際レンダリングチェックやバリデーションメッセージ等はe2eテストに含めることができるため、  
全体方針としては如何にRSCを増やしてサーバー側関数のユニットテストとe2eテストを充実させるかが肝になります。

ここでDBからの取得処理をRepositoryに閉じ込め、オブジェクトとして返す構造にするとオブジェクト単位のmockが  
やりやすくなり、SA側はRepositoryの実装を気にしなくても良いためユニットテストが書きやすくなります。

またRepository内部の実装が変わってもinputとoutputの型が一致していればSA側の実装の変更が不要なため、  
相対的に変更しなければいけない範囲が狭くなりリファクタリング・実装の効率も高くなります。

TypeScriptでDIのライブラリはいくつかあり、以前は[tsyringe](https://github.com/microsoft/tsyringe)を使用していましたが、RSC/App Routerで使う場合  
reflect-metadataをimportする必要があり面倒なこと、アップデート頻度がかなり遅いことが微妙な感じだったので、  
現在の業務開発では[brandi](https://github.com/vovaspace/brandi/)を使用しており、クセがないためいい感じに使えています。

#### その他(フロントエンド)
- デプロイ関連の調査でクラウド・キャッシュ知識(Fastly/Next/GCS)を増やせた
- App Router移行作業・CCをいかに減らせるかの検討調査でライブラリに関する知識が増えた
  - React関連(React Hook Form/zod/yup等)・CSS関連(Panda CSS/vanilla-extract/tailwind)

## バックエンド

#### リファクタリングに合わせたクリーンアーキテクチャ関連知識の増加
フロントエンドのリード業務に入る前はバックエンドのコードを触るタイミングがほとんどだったため、  
リファクタリングに合わせてドメインクラスを再構成したり、適正ではない依存を適正なレイヤーに移動するなど  
ある意味「いい練習になるな」という量のリファクタリング経験をすることができました。  

またフロント側でもレイヤー分離、DIなどの知識は有効なため同じくリファクタリング時に経験を積むことで  
よりレベルの高い実装ができるようになったと思いますが、その上でうまく体系化して伝えることや命名系などの  
弱い部分はあるため、この辺は今後も長く経験を積むことでレベルアップしていきたいと思っています。  
(この辺は業務知識系の内容が入るためほぼ書けることがない...)

TypeScriptでのドメイン駆動設計は現状フロント側でも思うことがあるため、別のタイミングでまとめようと思っています。

# 生活系・その他

## 開発関連
ブログ自体の更新は多くなかったですが、社内教育ドキュメントなどアウトプット系はかなり頑張ったと思います。  

インプットについてもQiita/Zennのようなものよりは最新知識を入れるためにPRやissueを読んだり、本を書いているような  
レベル帯の人のツイートを拾うなどでかなり新鮮な情報(特にNext14以降)をインプットし、開発に活かせたと思います。

記事数を見ると2022よりは多くなっていますが、できればもう少しプライペート記事の更新も増やしていきたいです。

## 健康系
コロナにかかり体調を崩すこともありましたが、外に出た時はできるだけ歩くようにする・用事がなくても外に出てみるなど  
ウォーキングをできるだけするようにしたため去年の平均歩数を上回ることができました。

また硬水を飲むようになってお腹の調子が良くなったり、代謝を上げるために入浴系の環境を整えたりすることで  
風邪を引く頻度が下がったりなどちょっとのことで生活の質が上がったような気がします。

## その他

昨年末の振り返りで掲げていた引越し目標の条件をほぼ満たせる形で引っ越しができました。  

昨今の賃貸事情を見る限りペット化の物件人気が非常に上がっており、特に都心だと+数万&敷金倍がほとんどで  
ペットを飼うのはもう少し後でもいいかな？ということもあり条件を外した上でかなり良いところに引っ越しができました。

引っ越して半年程度経ったため大体の家具系や便利ツール系は揃い、そこらのガジェット系YouTuberよりも使いやすい、  
自動化された家になったため、今後は必須系だけではなく遊びのあるものも加えてより面白い部屋にしたいと思っています。