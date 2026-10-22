# Next.jsの探索処理の互換層

Next.jsのESLintルールを維持しながら、未修正の開発依存の脆弱性を除去する。
`@next/eslint-plugin-next@16.4.2`が使用する`fast-glob`のうち、
`globSync(pattern, { onlyDirectories: true })`だけを提供する。
汎用の`fast-glob`代替としては使用しない。

元の依存経路は`@next/eslint-plugin-next → fast-glob → micromatch → braces@3.0.3`。
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)の公式修正版がないため、
既存の推移依存でもあるtinyglobbyとpicomatchへ探索処理を置き換える。
監査の除外・閾値変更、非公式braces forkは使用しない。

tinyglobbyの[移行ガイド](https://superchupu.dev/tinyglobby/migration)に従ってディレクトリの暗黙展開を無効にする。
さらに絶対パスの出力を維持し、末尾スラッシュを正規化し、厳密なパターン照合でglobstarの親ディレクトリ混入を防ぐ。
返却順序と相対パスの先頭`./`の表記は保証しない。Next.jsの呼び出し元は各結果を`path.join`で使用する。

ローカル依存はnpmがリンクするため、Node.js 24のTypeScript直接実行機能で読み込む。
インストール後スクリプトやnode_modulesの直接編集は不要。
`npm run test:unit`で探索結果、深い入力、実際のNext.js内部リンク検査を確認する。

Next.js更新時は`get-root-dirs`以外のfast-glob利用が追加されていないか確認する。
上流でbraces依存が除去されたら、package.jsonのローカルfast-glob依存・override・型依存、
このディレクトリと単体テストの登録を削除し、通常の依存へ戻す。
