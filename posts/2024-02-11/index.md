---
title: "2023年振り返り"
tags: ["振り返り", "技術"]
slug: log-202301-202312
coverImage: "nextjs.png"
---

# JavaScript仕様

参考: JavaScript って何？ - とほほのWWW入門
https://www.tohoho-web.com/js/what.htm

## 前提 自分がよく使っている知識はどのバージョンまでか？

findLast()等を使ったタイミングはあったのでES2023のメソッドまでよく使うものは抑えている感じになっていた。
実務で使う場合はバージョン意識よりも汎用メソッドを覚えがちなので(かつESNextを指定しがち)、心配していたが安心した。

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
* テンプレート文字列 (`Hello ${name}`)
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

オブジェクトに設定されたプロパティを全て参照するための処理と思われる。例として動的型付けの場合に型が違って
使いたいメソッドを使用できないタイミングで使うことはあり得そうだが、こちらもTypeScriptを使う場合は型が明示されるため
間違いに気付きやすく、あまり用途がないイメージだった。

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

BigIntは以前LeetCodeで引っかかった問題があり、桁数の多い数値を扱う際にデフォルトのnumber型(JavaScriptだと動的だが)を使うと
ある程度の桁数から下数桁が00000的な形で丸められてしまう現象があるため、とても多い桁の数値を扱う場合BigIntを使用する形となる。
面倒なのはBigIntとnumber型は別の扱いになり混ぜた計算が不可なため、numberをBigIntに変換してから計算する必要がある。

`Promise.allSettled()`は非同期処理が全部終わったらという処理になり、`Promise.all()`はどれかが失敗すると即座にcatchされるため
状況に応じて使い分けしていくとよい。実際は並列でリクエストをたくさん投げるとパフォーマンスが落ちることが多いため、
設計レベルでなんとかするかバッチ処理で失敗時にトランザクションロールバックするケースもあるため利用頻度は低いイメージ。

### ES2021
* 論理代入演算子 (||=, &&=, ??=)
* 数値セパレータ (1_000_000)
* string.replaceAll()
* Promise.any()
* 弱参照(WeakRefs) (ほぼ使わないので割愛)

`Promise.any()`は非同期処理が一つでも終了したら次の処理に移るため、`Promise.allSettled()`と同様特定条件下で
使用を検討するイメージになる。この場合も意図しない動作が起こる可能性が増えるため設計には気をつけたい。