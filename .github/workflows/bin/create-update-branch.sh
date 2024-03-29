# CI上で対象のgit操作を許可する
git config --global --add safe.directory /__w/blog.sena-v.com.next/blog.sena-v.com.next

# ブランチ名称を定義
BRANCH_NAME="update/$(date "+%Y%m%d")"

# 当日日付で新規ブランチを作成
git switch -c $BRANCH_NAME

# package.json の依存関係を最新に更新
npm i -g npm-check-updates
ncu -u

# package.jsonの差分がない場合はブランチを削除して終了する
if [ -z "$(git diff --name-only)" ]; then
  git switch -
  git branch -D update/$(date "+%Y%m%d")
  exit 0
fi

# package.jsonの差分があった場合、package-lock.json を更新
npm install

# 更新内容をコミット
git add package.json package-lock.json

# 環境変数で更新結果を通知
export UPDATE_RESULT=True
export BRANCH_NAME=$BRANCH_NAME
