module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  ignorePatterns: [
    "!**/*",
    ".next/**/*",
    "**/generated.ts",
    "jest.config.ts",
    "jest.setup.ts",
    "*.js",
    "postcss.config.cjs",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["react"],
  rules: {
    // 適さないルールを無効化
    "@typescript-eslint/explicit-function-return-type": "off", // 関数の戻り値の型を記述必須にする
    "@typescript-eslint/consistent-type-imports": "off", // import typeを使わない
    "@typescript-eslint/no-invalid-void-type": "off", // 型定義のvoidを許可しない
    "@typescript-eslint/no-confusing-void-expression": "off", // 関数のvoidを許可しない
    "@typescript-eslint/strict-boolean-expressions": "off", // booleanの条件式で厳密な判定を必須にする
    "@typescript-eslint/prefer-optional-chain": "off", // オプショナルチェイニングを使用不可にする
    "@typescript-eslint/restrict-template-expressions": "off",
    "react/react-in-jsx-scope": "off", // JSXファイルでReactをimport必須にする(v17以降import不要となった)
    "no-unneeded-ternary": "off", // 三項演算子を使用しない
    "no-new": "off", // new演算子を使用しない(変数代入しないnewは許可しないルールのためoff)

    // ルールを調整
    "@next/next/no-html-link-for-pages": ["error", "pages"], // Linkコンポーネントを使用しない
    "import/no-default-export": "error", // default exportを使用しない
    "@typescript-eslint/no-explicit-any": 1, //2, // any型を禁止 - 2が禁止のため修正完了まで警告レベルを指定

    // RSCのServerActions用にコンポーネントの引数にPromise<void>を渡した場合許可する
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
  overrides: [
    // Next.js needs default exports for pages and API points
    {
      files: ["pages/**/*", "app/**/*", "*.config.ts"],
      rules: {
        "import/no-default-export": 0,
      },
    },
  ],
}
