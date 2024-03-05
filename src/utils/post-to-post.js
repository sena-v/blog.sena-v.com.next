import clipboardy from "clipboardy";

const postToPost = function () {
  if (!document.URL.includes("https://twitter.com/")) {
    throw new Error("X(Twitter)のページで実行してください");
  }

  const posts = Object.values(document.querySelectorAll('[data-testid="cellInnerDiv"]')).slice(0, -1);

  const texts = posts.map((post, index) => {
    const text = post.innerText.split(/\r\n|\n/);

    // 一個目は構造が違うため別で処理する
    if (index === 0) {
      return {
        text: text[4],
        name: text.shift(),
      };
    }

    return {
      text: text[2],
      name: text.shift(),
    };
  });

  // 一度整形したobjectをhtml変換してクリップボードへコピー
  const html = texts
    .map((text) => {
      return `$name$ ${text.name}  \r\n$text$ ${text.text}  \r\n`;
    })
    .join("");

  navigator.clipboard
    .writeText(html)
    .then(() => alert(`処理成功！ \r\n${html}`))
    .catch((e) => alert("エラー！ " + e.message));
};

const text = postToPost.toString().replace(/\r?\n/g, "");

clipboardy.writeSync(`javascript:(${text})();`);
console.log("クリップボードにコピーしました");
