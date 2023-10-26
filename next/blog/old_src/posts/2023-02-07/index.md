---
title: "カスタムフックの作り方を1から考える"
tags: ["TypeScript", "React", "カスタムフック"]
slug: react-custom-hooks-study
coverImage: "posts-image/2023-02-07.png"
---

# カスタムフックの作り方を１から考える

## カスタムフックとは?

- React Hooksを利用した共通関数
- 状態を閉じ込めて、更新後の状態だけ受け取れる
- APIによる初期値fetchを閉じ込めて、取得後の状態だけ受け取れる
- Reactの一部なので、状態だけでなくcomponentも返せる

基本はuseStateかuseEffectを使用して処理を切り出したものがカスタムフックとなる。  

カスタムフック自体は普通の関数と同じように関数から関数を呼べるため、useXxxxといった  
useから始まるパスカルケースで命名されているかどうかで見分けることができる。  
(カスタムフック自体のルールのため命名規則を守らない場合動作せず)

基本的には呼び出す→内部の状態が変化するの流れになる。カスタムフック外部で状態を参照したい場合、  
カスタムフックのbody部分から状態を外に渡すことにより外部からカスタムフック内部の状態参照が可能になる。

```tsx
const useComponentState = () => {
  const [stateAlpha, setStateAlpha] = usestate<string>('');
  const [stateBeta, setStateBeta] = usestate<number>(0);

  const componentState = () => {stateAlpha, stateBeta} // 注意①

	const changeAlpha = (state: string) => setStateAlpha(state)
	const changeBeta = (state: number) => setStateBeta(state)

	return {componentState, changeAlpha, ChangeBeta}　// 注意②
}
```

```tsx
import { useComponentState } from "割愛"

const App = () => {
	const {componentState, useChangeAlpha, useChangeBeta} = useComponentState()

  const useChangeA = (v: string) => useChangeAlpha(v)
  const useChangeB = () => useChangeBeta(!componentState.stateBeta)

	return(
		<>
			<input onChange={(e) => useChangeA(e.target.value)}/>
	    <button onClick={() => useChangeB()}/>
		</>
	)
}
```

### 注意① 個別stateの定義方法について

componentを外部で見れればいいのでは？ということで関数ではなくオブジェクト型で定義しreturn値に格納したところ、  
外部でエラーメッセージが出なかった。(状態更新がうまく動いていなかった。)

```tsx
 /* 省略 */
 const componentState = {stateAlpha, stateBeta} // いけそうだけど駄目だった
 const componentState = () => {stateAlpha, stateBeta} // いけた

 return {componentState}
　/* 省略 */
```

細かく値変化は見ていないが、下のようなイメージをしている

- stateを返す関数をreturnに入れるとコンポーネントが再レンダリングされる際に再取得が走る
- オブジェクトをreturnに入れると初回定義時の値がそのまま返る

### 注意② メソッドを含むオブジェクトの返却方法について

カスタムフックからの返却値自体は自由度が高いため、できる限りuseStateにあわせる形で  
第一引数はstateそのもの、それ以降はstateの更新系処理を色々書いていくと良い。

配列型・オブジェクト型どちらでも返却できる

- オブジェクト型
    - 必要なメソッドだけ呼び出し側で呼び出せるので、順番を気にしなくていい
    - 他hookと違い{state ,method}のような形で呼び出すためカスタムフックと判断しやすい
- 配列型
    - 順番が生まれるため、定義で0番目にstateを置く等のルール付けがしやすい
    - オブジェクト型と逆で、分割代入による順番を考慮して返却値を考える必要がある
    - useState等と分割代入が同じなため、初心者がカスタムフックと判断しづらい

  

## コレをやるな

- カスタムフック内部から受け取った状態を親側のsetStateで保持する
- カスタムフックから返却するメソッドを増やしすぎる
- 意図しないtsxファイルを作らない

### ✗: 受け取った状態をsetStateで保持する

setState自体は非同期で実施されるため、カスタムフック内部から返却された状態をsetStateで  
親にセットするような処理を書くと更新時のカスタムフックstateは更新前のものがセットされる可能性が高く、  
そこが解決できたとしてもカスタムフック化している意味がなくなる。

カスタムフック内に状態が定義されていれば親コンポーネント側ではuseStateは不要。

### ✗: カスタムフックから返却するメソッドを増やしすぎる

カスタムフックから返却するメソッドについては、外部から使用したいものだけに留める。  
複数のメソッドを組み合わせて使用したい場合(stateでAPIリクエストを送信してDB更新、  
使用したstateを削除など)についてはカスタムフックで個別にメソッドを定義し、  
privete関数のようなものを複数組み合わせて外部から呼ぶ必要がある関数のみ使う形にすると良い。

```tsx
/* 省略 以下ルール無効で構造イメージのみ */
const [state, setState] = useState<string>('')

// Postしたらステートをクリアしたい
const call = async() => await api.post(...)
const initState = () => setState('')

// 良くないカスタムフックの返却値
return { state, call, initState}

// 
const useCallAndInit = async() => {
	await call()
	initState()
}
```

### ✗:  意図しないtsxファイルを作らない

※詳細はカスタムフックからの返却値を最初に定め、ファイル名を決めるに記載

## コレをやれ

- カスタムフックからの返却値を最初に定め、ファイル名を決める
- プレゼンテーション層から呼ぶカスタムフックの定義だけ先に書く
- 呼び出す側では極力useStateを増やさないような設計を考える

### ◎: カスタムフックからの返却値を最初に定め、ファイル名を決める

カスタムフックについては一挙に処理を移植してフック化しようとするとわけわからない量のエラーに押しつぶされるため  
順番に作っていくのが良い。まず処理の結果としては状態が取得したいのか？状態をもとに  
レンダリングされたコンポーネントが取得したいのか？という部分を一番最初に考え、  
結果に応じてカスタムフックのファイル名を「.ts」にするか「.tsx」にするかを判断できる。

tsxファイルはJSXを記述可能な拡張子ということもあり、reactだから脳死で.tsxにするのはあまり良くないと思っている。  
ユニットテストを作成し始めたり、その他拡張子でなにかしら設定をわけたくなった場合この辺を適当にやっていると  
後々面倒であることやtsxでない＝react的な処理を書かないようにチーム開発で意識できるため、  
読み下しコストが減ることを期待している。

※ここについてはちゃんとしたソースがあればtsx賛成派になっても問題なく、  
&nbsp;&nbsp;何かしら理由があったほうがいいかなと思って理由づけしているだけではある

### ◎: プレゼンテーション層から呼ぶカスタムフックの定義だけ先に書く

返却値が決まった後はinputとoutputの部分を先に型定義だとかして書いてしまうと良い。

新しくカスタムフックを作る場合であれば参照箇所を先に決められるため宣言的UIがはじめから作りきってしまえるため、  
UIとかカスタムフックの作りを早めに改善できる。リファクタリングの切り出し時であればカスタムフックからの状態・  
コンポーネントを使用する箇所だけ先に書き換えてしまえば、コメントアウト等でのデバッグがかなり早くなり  
あとでoutputの数が違った等の問題が起きにくくなる。

基本的には以下2個が必須で、[方法はいくつかあるらしい](https://qiita.com/cheez921/items/af5878b0c6db376dbaf0#1-戻り値にルールを設ける)

1. 状態参照(or 状態を持つコンポーネント参照)
2. 内部状態を変更する関数(複数個)

```tsx

const App = () => {
// こんな感じで適当に先に書いてしまう
const {state, useFunctionA, useFunctionB} = useFunctions()

	return(
	  <span>{state.stateA}</span>　// useFunctionsの中身がわからなくてもここが書ける
	)
}
```

### ◎: 呼び出す側では極力useStateを増やさないような設計を考える

カスタムフックの定義だけ先に書けていれば良いが、考慮が足りていないと無駄なstateが定義されてしまう可能性が高い。  
そもそもuseStateの行数が増えると読みづらいし使えば使うほどリファクタリングが面倒になるため、  
stateを複数使いそうな画面についてはまずカスタムフック化できないか考えてプレゼンテーション層とかカスタムフックの  
out側だけ定義してしまうと不要stateの定義が残りにくい。