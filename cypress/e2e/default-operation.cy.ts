context("CI e2e testing", () => {
  beforeEach(() => {
    const rootUrl = process.env.NODE_ENV === "production" ? "https://sena-v.com/" : "http://localhost:3000/"
    cy.visit(rootUrl)
  })

  it.skip("ページの初期動作確認", () => {
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
    cy.reload()
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

    // // タグをクリックしただけだと検索総件数の数値が変わらない
    // cy.getByTestId("current-search-count").textContent()
    // const secondCount = cy.getByTestId("current-search-count").textContent()
    // expect(secondCount).toBe(firstCount)

    // // ボタンを再度押すと選択がリセットされる
    // cy.getByTestId("tag_1").click()
    // cy.getByTestId("year_1").click()
    // expect(cy.getByTestId("tag_1")).not.toBeChecked()
    // expect(cy.getByTestId("year_1")).not.toBeChecked()

    // // 条件を入れて検索ボタンをクリックすると検索総件数の数値が変わる(最初のstringと異なる)
    // cy.getByTestId("search-modal").getByText("TypeScript").click()
    // cy.getByTestId("search-modal").getByText("2023").click()
    // cy.getByText("Search articles").click()

    // const thirdCount = cy.getByTestId("current-search-count").textContent()
    // expect(thirdCount).not.toBe(firstCount)

    // // モーダルの選択初期化ボタンを押し、再度モーダルに戻ると選択リセットと検索総件数の数値が変わる
    // cy.getByRole("button", { name: "Init Filter" }).click()
    // cy.getByRole("button", { name: "Search Menu" }).click()
    // expect(cy.getByTestId("search-modal").getByText("TypeScript")).not.toBeChecked()
    // expect(cy.getByTestId("search-modal").getByText("2023")).not.toBeChecked()
    // const fourthCount = cy.getByTestId("current-search-count").textContent()
    // expect(fourthCount).toBe(firstCount)
  })
})
