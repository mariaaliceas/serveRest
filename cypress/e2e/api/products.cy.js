describe("Validation on products", () => {
  const apiUrl = Cypress.env("apiUrl");

  it("Should list all products", () => {
    cy.loginAPI().then((token) => {
      cy.request({
        method: "GET",
        url: `${apiUrl}/produtos`,
        headers: { Authorization: token },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("quantidade").and.to.be.gte(0);
        expect(res.body).to.have.property("produtos").and.to.be.an("array");
      });
    });
  });

  it("Should successfully create a new product", () => {
    cy.loginAPI().then((token) => {
      const uniqueName = `Produto Teste ${Date.now()}`;

      cy.request({
        method: "POST",
        url: `${apiUrl}/produtos`,
        headers: { Authorization: token },
        body: {
          nome: uniqueName,
          preco: 100,
          descricao: "Produto criado via Cypress",
          quantidade: 10,
        },
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body).to.have.property(
          "message",
          "Cadastro realizado com sucesso"
        );
        expect(res.body).to.have.property("_id");
      });
    });
  });

  it("Should not allow creating a product with a duplicate name", () => {
    cy.loginAPI().then((token) => {
      const uniqueName = `Produto Duplicado ${Date.now()}`;

      const produto = {
        nome: uniqueName,
        preco: 150,
        descricao: "Teste duplicado",
        quantidade: 5,
      };

      cy.request({
        method: "POST",
        url: `${apiUrl}/produtos`,
        headers: { Authorization: token },
        body: produto,
      }).then(() => {
        cy.request({
          method: "POST",
          url: `${apiUrl}/produtos`,
          headers: { Authorization: token },
          body: produto,
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq("Já existe produto com esse nome");
        });
      });
    });
  });
});
