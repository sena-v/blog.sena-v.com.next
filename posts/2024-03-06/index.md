---
title: "ZennのスクラップっぽくにXのスレッドを記事にする"
tags: ["振り返り", "技術"]
slug: thread-post-to-post
coverImage: "nextjs.png"
---

# 技術関連

# 準備したもの
- ブックマークレット: X(Twitter)のスレッド表示ページをhtmlに変換してクリップボード保存
- markdownのhtmlレンダリング処理: htmlタグ出力用の言語を指定してmdファイル内でもタグを使えるようにする

```htmlTag
<div className="x-post">
 <div className="x-post-name">せな<div>
 <div className="x-post-text">
 やっぱりセルフリプライ系のまとめはZennのスクラップブック形式？みたいなのが一番向いてる気がするけど気軽さがないからうまいことなんとかしたい
 </div>
</div>
<div className="x-post">
 <div className="x-post-name">せな<div>
 <div className="x-post-text">
 これなんとかしたいところではあるな、拡張とかで作ってみるか
 </div>
</div>
<div className="x-post">
 <div className="x-post-name">せな<div>
 <div className="x-post-text">
 やーっと成功した、表記揺れとかがあるのを見るとやっぱりここの開発してる(ローカライズしてる)エンジニアは全体見てやってんのか？ってマジで疑問が生まれてくる
 </div>
</div>
<div className="x-post">
 <div className="x-post-name">せな<div>
 <div className="x-post-text">
 ランダムサンプリングして試してみたけど、非公式RTしてコメント残してる時とリプライに別の人が入ってきた時が未テストだ
 </div>
</div>
<div className="x-post">
 <div className="x-post-name">せな<div>
 <div className="x-post-text">
 他人は問題なく取得できてそうだけど直近で投稿された時の秒とか分がまだ対応必要だな
 </div>
</div>
<div className="x-post">
 <div className="x-post-name">せな<div>
 <div className="x-post-text">
 埋め込み+html化は明日頑張ろう、公開レベルまでいきたい場合mdのままだとmdブログでしか使えないからhtml書き出しがいいかな
 </div>
</div>
```
