---
title: "macOS Ventureアップデート後gitでエラーが出る"
tags: ["macbook","環境構築"]
slug: macbook-update-git-error
coverImage:
---

macのOSアップデート時には結構発生するっぽい

1. git自体は過去インストールしており`/opt/bin`には入っている
2. バージョン確認のためgitコマンドを実行するとxcrun: errorが出る

おそらくOSのバージョンとxcodeが紐付いており、コア部分がアップデートされると  
パス情報とかが一旦リセットされているような感じのため、以下の順で試す
- `brew install git`で現在のOSバージョンに対応したgitを入れる
- 過去zsh/bashの環境ファイルでpathを通している場合、規定のシェルを該当シェルに変更
- OSアップデート後自動で開いたシェルウィンドウについては設定未反映の可能性があるため再起
- xcodeが古いバージョンだとgitが動作しないため`xcode-select --install`

次回以降社用PCや手元でアップデートしたときに発生しそうなため記録。