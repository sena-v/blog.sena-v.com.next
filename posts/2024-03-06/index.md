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

```threadToPost
せな@
vanilla-extractで吐き出されるclassNameがハッシュ値付与されるせいでmd側で固定名称のclassName使った時にバインドされないのめんどくさい、globalCssをこのためだけに生やすのも管理怠くなるからなんとかしたいなぁ,
せな@
マークダウンからstringをとった後でhtmlにするときに人力でゴリゴリ回すことにした,
せな@
強いて言うならこれ配布がめんどくさくなるんだよな、まぁ別に配布する必要なから妥協すればいいんだけど,
```
