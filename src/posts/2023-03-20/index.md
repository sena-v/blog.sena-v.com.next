---
title: "AsyncIteratorでデータを一括ではなく順次取得する"
tags: ["TypeScript","npm"]
slug: iterator-of-typescript
coverImage:
---

TypeScriptでAsyncIterableIteratorを使おうとしたら見たことない記述が多かったのでまとめた。

## AsyncIteratorとは？

AsyncIterableIteratorは、JavaScriptのイテレーターを非同期処理に対応したもので、  
非同期処理を行う場合に使用される。大量のデータを一度にメモリ展開することなく一定数ごとに分割して  
取得することができ、これによりパフォーマンスを維持しながら大量のデータを取得することができる。

Firestoreでは、イテレーターを使用して、クエリにマッチするドキュメントを順次取得することができる。  
クエリの条件に応じて取得するドキュメント数を設定することが可能である。Firestoreのイテレーターは非同期処理であるため、  
適切なエラーハンドリングを行うことも重要となる。また、AsyncIterableIteratorを使用する場合、Iteratorの概念について理解している必要がある。

例えばFirestoreを使用する場合、クエリを作成した上でイテレーターで読み取りを実行することができる。  
クエリにマッチするドキュメントを順次取得するには、以下のようなコードとなる。  

```
import { firestore } from 'firebase-admin';

// 最大10個のドキュメントを取得するクエリを作成する
const query = firestore().collection('users').limit(10);

// Firestoreのイテレーターを作成する
const iterator = query.get();

// ドキュメントを順次取得する
while (!(await iterator).done) {
  const documentSnapshot = (await iterator).value;
  const documentData = documentSnapshot.data();
  console.log(documentData);
}
```

Firestoreのイテレーターを使用した読み出しについてはデータベース側で使用可能になっている場合そのまま使用することができる。  
データベースがイテレーティブな読み出しに対応していない場合、サーバーサイド側で工夫して実装することが必要。  
膨大な配列データが入ってくる可能性があるAPIではページングを使用して処理を軽量化することが多く、  
よく触れるところではTwitterのタイムラインを取得するAPIでもページング機能が使用されている。

また、AsyncIterableIteratorを使用する場合、Iteratorの概念について理解している必要がある。  
Iteratorの難しいところは、「プログラミング初期に見ても理解できない」ところであると思われる。  
開発者になって第一言語をある程度理解するまではどの機能をよく使うのかわからず、難しい機能については  
その場で理解しても頭から消えてしまうこともあり、学習段階では記憶に残すことが難しいということがある。

## サーバーサイドでのイテレーター実装を行う

サーバーサイドでのイテレーター実装については、以下のような形で実装する。

```
// このスキーマを順次取得する
interface User {
  id: string;
  name: string;
  age: number;
}

import { User } from './types'; // データベースの型定義
import { getUserData } from './db'; // データベースからデータを取得する関数

class UserIterator implements AsyncIterableIterator<User[]> {
  private cursor = 0; // データベースから取得するカーソルの位置
  private readonly batchSize = 10; // 一度に取得するデータの数

  async next(): Promise<IteratorResult<User[]>> {
    // データベースからデータを取得する
    const users = await getUserData(this.cursor, this.batchSize);

    // 取得したデータがある場合
    if (users.length > 0) {
      // カーソルの位置を更新する
      this.cursor += users.length;

      // 取得したデータを返す
      return {
        done: false,
        value: users,
      };
    }

    // 取得したデータがない場合
    return {
      done: true,
      value: undefined,
    };
  }

  public [Symbol.asyncIterator](): AsyncIterableIterator<User[]> {
    return this;
  }
}

// 使用例
async function main() {
  const userIterator = new UserIterator();

  // データを順次取得する
  for await (const users of userIterator) {
    console.log(users);
  }
}
```

この例ではデータベースからデータを取得するための関数getUserDataを用意し、  
UserIteratorクラスでAsyncIterableIteratorを実装している。nextメソッドではカーソルの位置を更新しながら  
一定数ごとにデータを取得し、[Symbol.asyncIterator]メソッドでAsyncIterableIteratorを返す。

main関数では、UserIteratorクラスを使用してデータを順次取得している。  
for await...ofループを使用することで、AsyncIterableIteratorから取得したデータを順次処理することが可能となっている。

## まとめ

AsyncIterableIteratorは非同期処理において大量のデータを効率的に取得するための機能である。  
Iteratorの概念について理解した上で、Firestoreなどのイテレーティブな読み出しに対応しているAPIや、  
サーバーサイドでの実装に役立てることができる。開発者にとっては初めは難しい概念かもしれないが、  
理解すればパフォーマンスの向上や効率的な処理を行うことができるため、覚えておく価値がある。

※この記事はChatGPTくんに推敲してもらいました