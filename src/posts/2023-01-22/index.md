---
title: "SwiftUIのList型とArray型"
tags: ["SwiftUI", "学習"]
slug: swiftui-list-array
---

# SwiftUIのList型とArray型

### 配列型
TypeScript等と同じ形で定義できる配列は普通に存在する。  
forEachなどのメソッドも生えているため操作イメージはほぼ変わらず。  

### List型
RealmSwiftというライブラリで使用する特殊配列型。  
SwiftUIの中に()おそらく)入っており、チュートリアルで使用されているため分かりづらい  
(SwiftUIでJSONをdecodeとかした際のデフォルト型になってるかも？)  

直接List型を作るというよりは、RealmSwift系のメソッドを介したデータの返り値が  
List型で返るためそれをSwiftの配列型に変換したり、変換せずそのままforeach等で処理する。  

[List型公式ドキュメント](https://www.mongodb.com/docs/realm-sdks/swift/latest/Classes/List.html)  


## 変換
List型も基本的には配列型と同じ使い方が可能。

```
var data = [1,2,3,4,5,6]
var listData = decoder.decode(JSONData) // JSONデータをデコードしたものが入るイメージ

// 配列の文字を順番に表示させる
ForEach(data) { index in
  Text(index)
}

// List型もそのまま使える
ForEach(listData) { index in
  Text(index)
}

// List型から配列型に変換する
var dataArray = Array<Any>()
dataArray.append(contentsOf: Array(listData))

```

変換しなくてもあまり意識せず使えるが、型が合わないライブラリが使えないことがあるため注意したい