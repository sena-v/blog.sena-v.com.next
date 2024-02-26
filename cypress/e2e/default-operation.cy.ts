context("CI e2e testing", () => {
  beforeEach(() => {
    const rootUrl = process.env.NODE_ENV === "production" ? "https://sena-v.com/" : "http://localhost:3000/"
    cy.visit(rootUrl)
  })

  it("ページの初期動作確認", () => {
    // サイトタイトルが正しく表示されることを確認
    cy.get("title").should("have.text", "sena-v.com")

    let firstPostTitle = ""

    // トップページの記事タイトルを取得
    cy.get("h1").then((el) => {
      // h1が複数存在する可能性があるため先頭を取得
      firstPostTitle = el[0].innerText
    })

    // 遷移して次の記事のタイトルが現在のタイトルと違うことを確認
    cy.get('[data-testid="paging-plus"]').click({ force: true })
    cy.get("h1").then((el) => {
      // h1が複数存在する可能性があるため先頭を取得
      expect(el[0].innerText).not.to.equal(firstPostTitle)
    })

    // 前の記事に戻ってタイトルが一致することを確認
    cy.get('[data-testid="paging-minus"]').click({ force: true })

    // タイトルが変化することを確認
    cy.get("h1").then((el) => {
      // h1が複数存在する可能性があるため先頭を取得
      expect(el[0].innerText).to.equal(firstPostTitle)
    })
  })

  it("モーダルの動作確認", () => {
    // モーダルを開いた時、要素が表示されている
    cy.get('[data-testid="open-search-menu"]').click({ force: true })
    cy.get('[data-testid="search-menu"]').should("be.visible")

    // モーダルを閉じた時、要素が非表示になる
    cy.get('[data-testid="close-search-menu"]').click({ force: true })
    cy.get('[data-testid="search-menu"]').should("not.be.visible")

    // モーダルを開いて、現在の検索総件数が表示される(文字が表示されている)
    cy.get('[data-testid="open-search-menu"]').click({ force: true })
    cy.get('[data-testid="current-search-count"]').should("not.have.text", "現在の総表示記事数：0")

    // input要素が初期状態falseであることを確認
    cy.get('[data-testid="tag_1"]').then((el) => {
      expect((el[0].children[0].children[0] as HTMLInputElement).checked).to.equal(false)
    })
    cy.get('[data-testid="year_1"]').then((el) => {
      expect((el[0].children[0].children[0] as HTMLInputElement).checked).to.equal(false)
    })

    // タグクリック前の検索総件数の数値を取得
    let postsCountString1 = ""
    cy.get('[data-testid="current-search-count"]').then((el) => {
      postsCountString1 = el[0].innerText
    })

    // モーダルからタグがクリックでき、選択状態になる
    cy.get('[data-testid="tag_1"]').click()
    cy.get('[data-testid="year_1"]').click()

    // input要素がtrueになることを確認
    cy.get('[data-testid="tag_1"]').then((el) => {
      expect((el[0].children[0].children[0] as HTMLInputElement).checked).to.equal(true)
    })
    cy.get('[data-testid="year_1"]').then((el) => {
      expect((el[0].children[0].children[0] as HTMLInputElement).checked).to.equal(true)
    })

    // タグクリック後の検索総件数の数値を取得し、クリックで数値が変わらないことを確認
    cy.get('[data-testid="current-search-count"]').then((el) => {
      const postsCountString2 = el[0].innerText
      expect(postsCountString1).to.equal(postsCountString2)
    })

    // // ボタンを再度押すと選択がリセットされる(falseになることを確認)
    cy.get('[data-testid="tag_1"]').click()
    cy.get('[data-testid="year_1"]').click()
    // input要素がtrueになることを確認
    cy.get('[data-testid="tag_1"]').then((el) => {
      expect((el[0].children[0].children[0] as HTMLInputElement).checked).to.equal(false)
    })
    cy.get('[data-testid="year_1"]').then((el) => {
      expect((el[0].children[0].children[0] as HTMLInputElement).checked).to.equal(false)
    })

    // // 条件を入れて検索ボタンをクリックすると検索総件数の数値が変わる(最初のstringと異なる)
    cy.get('[data-testid="tag_1"]').click()
    cy.get('[data-testid="search-articles"]').click({ force: true })
    cy.get('[data-testid="current-search-count"]').then((el) => {
      const postsCountString3 = el[0].innerText
      // 検索した後のtextに差分がある=結果が違うと判断
      expect(postsCountString1).not.to.equal(postsCountString3)
    })

    // モーダルの選択初期化ボタンを押し、再度モーダルに戻ると選択リセットと検索総件数の数値が変わる
    // cy.getByRole("button", { name: "Init Filter" }).click()
    cy.get('[data-testid="init-filter"]').click()
    cy.get('[data-testid="open-search-menu"]').click({ force: true })
    // cy.getByRole("button", { name: "Search Menu" }).click()

    // tag_1がinitialize後にfalseになっていることを確認
    cy.get('[data-testid="tag_1"]').then((el) => {
      expect((el[0].children[0].children[0] as HTMLInputElement).checked).to.equal(false)
    })

    // リセット後は最初のstringと同じになることを確認
    cy.get('[data-testid="current-search-count"]').then((el) => {
      const postsCountString4 = el[0].innerText
      // 検索した後のtextに差分がある=結果が違うと判断
      expect(postsCountString1).to.equal(postsCountString4)
    })
  })
})
