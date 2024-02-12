---
title: "JavaScriptバージョンを全部見返してみる"
tags: ["JavaScript", "技術"]
slug: javascript-version
coverImage: "javascript.png"
---

最終更新: 2024_02_11

※ 親記事にも記載  
この記事を書くにあたって、カジュアル面談やフロントエンジニアと話す際Next.jsのバージョンを強く意識することがあり、  
特定の言語やライブラリのバージョンを把握していると話の伝わりやすさ・相手のレベル感がわかることに気づいた。  

多くのフロントエンドエンジニアはNext v13.4が転換期であり、Next v14.0で<form>を積極的に使うようになるが  
このタイミングでライブラリのバージョンを強く意識している人としていない人ではとても大きな差がついてしまう。  

これだけでなくReactのバージョン・TypeScriptのバージョン・JavaScriptのバージョンと必須な範囲でも多岐に渡り、  
全部を記憶していなくても今の知識はどこのバージョンで止まっているか？だとか脳内でアップデートが必要な差分は  
バージョンいくつからいくつか？という意識を持っているだけでもキャッチアップに差が出てくるように思う。  

上記の理由から技術レイヤー毎に記事化して個々にコメントをつけておくことで、  
自分はどのバージョンまで学習済みか？差分としてどこからは脳内知識アップデートが必要かを理解できるようになる。  

記事についてはインクリメンタルにアップデート可能なため、アプデに合わせて追加した上でage対応する。  

# JavaScript仕様

参考: JavaScript って何？ - とほほのWWW入門  
https://www.tohoho-web.com/js/what.htm  

## 前提 自分がよく使っている知識はどのバージョンまでか？
findLast()等を業務で使ったタイミングはあったのでES2023のメソッドまでよく使うものは抑えている感じになっていた。  
実務で使う場合はバージョン意識よりも汎用処理を覚えがち(かつESNextを指定しがち)なので心配していたが安心した。  

## バージョン毎に追加メソッドを切り出して、活用有無を調べる
ここからは「JavaScript って何？」からアップデート内容一覧を引用しつつ、主に現在業務で使っていないメソッドに対し  
焦点を当てる意味で機能としてどれが活用できて、どれが活用できていないかを確認していく。  

### ES 5 + ES5.1 (2009年12月)
- ストリクトモード(strict)
- ゲッター(getter)とセッター(setter)
- オブジェクトの最後の属性の後ろにカンマ
- JSON文字列の変換
- trim()
- Object オブジェクトのメソッド強化
- Array オブジェクトのメソッド強化
- array.isArray()

JavaScriptの使い勝手が安定した"use strict"をはじめとした基礎的な部分が多いので、特に言及する部分はない。

### ES2015
* クラス (class)
* テンプレート文字列 (Hello ${name})
* モジュール (import, export)
* アロー関数 (=>)
* デフォルト引数 (function(x=0, y=0))
* 可変長引数 (function(x, y, ...arg))
* 定数 (const)・局所変数 (let)
* for of ループ (for item of items)
* Map オブジェクト
* Set オブジェクト
* 配列関数 (Array.from(), Array.of())
* 分割代入 ([x, y] = [10, 20])
* スプレッド構文 (...args)
* 型付き配列 (Uint8Array, ...)
* シンボルオブジェクト (Symbol)
* 8進数(0o)と2進数(0b)
* 言語依存フォーマット (NumberFormat())
* 非同期処理 (Promise)

ここもこれといって特殊なものなかった。分割代入+スプレッド構文で初見でなんだこれ？となってしまう  
`const [a, ...args] = [1, 2, 3, 4]`的なコードもこの辺から使用可能になったと考えられる。

### ES 2016
* array.includes()
* べき乗演算子(**)

べき乗したいことが特にないのでここもあまり知らなかった(++の亜種だと思えばあまり違和感ないが)が、  
ここについても特に問題なし。前段と比べてこの辺から便利なメソッドが増えるフェーズに入ってきたイメージがある。

### ES 2017
* オブジェクト参照 (Object.values(), Object.entries())
* 非同期処理(async, await)
* 関数末尾のカンマ (,)　※引数内
* パディング (string.padStart(), string.padEnd())
* プロパティ記述子参照 (object.getOwnPropertyDescriptors())

必須の`async/await`に加え、さらに便利メソッドがどんどん追加されている。  
`Object.values(), Object.entries()`については状況次第でかなり使えるため頻度は高くなっている。

また些細な部分で引数の最後にカンマが入ることが許容された(基本業務ではLinterでトリミングされると思うが)  
`const testFunc = (a, b, c,) => {...}`

下2種類はいまいちイメージがなかったため読んでみた

#### string.padStart(length[, str])、string.padEnd(length[, str])

```javascript
str = "123";
console.log(str.padStart(5, "0"));      // "00123"
console.log(str.padEnd(5, "_"));        // "123__"
```

文字列の指定箇所を指定桁まで指定文字で埋める処理。TypeScriptで仕様する場合number型だと00123も  
頭の数値が飛ぶ上に、他の記号を入れて有利な点がないのであまり使うイメージがわかなかった。

#### プロパティ記述子参照 (object.getOwnPropertyDescriptors())

```javascript
const obj = { a: 100 };
const props = Object.getOwnPropertyDescriptors(obj);
console.log(props);    // => {a: {value: 100, writable: true, ...}}
```

オブジェクトに設定されたプロパティを全て参照するための処理と思われる。  
こちらもTypeScriptを使う場合は型が明示されるためプロパティは視認可能なため、あまり用途がないイメージだった。

### ES2018
* オブジェクトのスプレッド構文とレスト構文 (...obj)
* Promiseのfinally構文
* Promiseのfor await (... of ...)構文
* テンプレート文字列の強化(\uの扱い)
* 正規表現のsフラグ (/.../s)
* 正規表現の名前付きキャプチャグループ (?<...>)
* 正規表現の前方マッチ条件検索 ((?<=...), (?<!...))
* 正規表現のUnicodeプロパティマッチ (\p{...})

ES2015時点では配列に対応していたスプレッド構文がオブジェクトにも対応した。  
あまり区別していなかったが分割で取る`{a, ...rest}`の形で書く場合はrest構文と呼ぶらしい。  
スプレッド構文に関しては`{...objA, ...objB}`として結合したりする場合を指す形になる。

Promise関連の2種については現状ほぼ必須で使用している、かつlinter等でも指摘が入るようにしている部分のため  
よく知っているが、タイミングとして非同期実装から2年経過しているのは意外だった。

下の4個については正規表現・文字コード系なのでここでは触れないが改善の部分が多くなっている。

### ES2019
* catch引数の不要化
* Symbol.description(Symbol型のprops追加)
* JSON superset(JSON型自体の規格関連改善)
* Well-formed JSON.stringify(JSON文字コード系改善)
* array.flat() と array.flatMap()
* function.toString() でコメントも文字列化 (関数ごとString化する場合、コメントも含めるようになった)
* string.trimStart()と string.trimEnd()
* Object.fromEntries()


さらに便利メソッドが追加された。またJSONに関する細かい改善(内容はあまり知らなくても問題ないような改善)があった。

`fromEntries()`は初めて見たのでコードを確認してみたところ、
```javascript
const obj = Object.fromEntries([["x", 100], ["y", 200]]);
console.log(obj);             // => {x: 100, y: 200}
```

配列をオブジェクトに変換するメソッド。Object.entriesの逆パターンのような形になるのでこれはかなり便利な気がする。

### ES2020
* for-in ループにおける順序保証
* ヌル合体(Nullish Coalescing)演算子(??)
* オプショナル連結(Optional Chaining)(?)
* globalThis
* ダイナミックインポート(Dynamic Import)
* export * as ns from module 構文
* string.matchAll()
* 任意精度整数(BigInt)
* import.meta (importしたライブラリのmeta情報を出力可能に)
* Promise.allSettled()

BigIntは以前バグがあって覚えたが、桁数の多い数値を扱う際にnumber型(JavaScriptだと動的だが)を使うと  
ある程度の桁数から下数桁が00000的な形で丸められてしまう現象があるため、  
とても多い桁の数値を扱う場合BigIntを使用する形となる。面倒なのはBigIntとnumber型は別の扱いになり  
混ぜた計算が不可なため、numberをBigIntに変換してから計算する必要がある。

`Promise.allSettled()`は非同期処理が全部終わったらという処理になり、`Promise.all()`はどれかが失敗すると即座にcatchされるため  
状況に応じて使い分けしていくとよい。実際は並列でリクエストをたくさん投げるとパフォーマンスが落ちることが多いため、  
設計レベルでなんとかするかバッチ処理で失敗時にロールバックするケースもあるため利用頻度は低いイメージ。

### ES2021
* 論理代入演算子 (||=, &&=, ??=)
* 数値セパレータ (1_000_000)
* string.replaceAll()
* Promise.any()
* 弱参照(WeakRefs) (ほぼ使わないので割愛)

`Promise.any()`は非同期処理が一つでも終了したら次の処理に移るため、`Promise.allSettled()`と同様特定条件下で  
使用を検討するイメージになる。この場合も意図しない動作が起こる可能性が増えるため設計には気をつけたい。

### ES2022
* トップレベル await
* クラスフィールド宣言
* プライベートフィールド・プライベートメソッド
* static イニシャライズブロック
* プライベートフィールドに対する in 演算子 (instanceof)
* 正規表現の d フラグによる開始・終了インデックス
* Error.cause によるエラーチェイン
* at(-n)で最後からN番目の要素を取得 (Array[i - 1]が可能に)
* hasOwn() によるプロパティ保持チェック

フロントで使うことは少ないが、privateはclassと合わせて使うとかなり強力に使えるためここでバックエンド的にも  
使いやすい言語となった。加えてstaticも使用可能となったためここからドメイン駆動設計に耐える仕様になってきた。

`Object.hasOwn(obj, prop)`はオブジェクトが指定したプロパティを持っているか検索することができ、以前は別の書き方もあったが  
想定と違う動きをすることがあったためこちらのショートハンド化により使いやすくなった形です。

```javascript
Object.prototype.prop2 = 1;
const obj = { prop1: 1, hasOwnProperty: () => true };

for (const prop in obj) {
  if (Object.hasOwn(obj, prop)) {
    console.log(prop); // "prop1", "hasOwnProperty" 
  }
}
```

とはいえTypeScriptの場合は型定義して使いたいプロパティはある程度特定が用意のためそこまで使わない印象です。

### ES2023
* findLast()/findLastIndex()
* Hashbang Grammar(コメントのLinux記法拡張)

findメソッドが先頭からの検索実施に対して、~Lastによる配列の末尾検索が追加されました。  
特に`findLast()`については`Array[Array.length - 1]`の代替にできるため使いやすくなった印象。

## JavaScript　振り返り総評
後半は便利関数の増加が目立つため知っているか知っていないかで差がついてくるものが多かったが、  
大枠で便利なものは大体業務でも使っていたため知識的にそこまでのビハインドは感じなかった。

一旦全部を見切ってまとめたことにより、微妙に知らなかった部分も知れたのでやって良かったと思った。