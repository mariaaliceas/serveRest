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

  it("Should create a new product with success", () => {
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

  it("Should not allow creating a product with duplicated name", () => {
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

  it("Should edit a product", () => {
    cy.loginAPI().then((token) => {
      const uniqueName = `Produto Editável ${Date.now()}`;
      const newName = `Produto Editado ${Date.now()}`;

      cy.request({
        method: "POST",
        url: `${apiUrl}/produtos`,
        headers: { Authorization: token },
        body: {
          nome: uniqueName,
          preco: 80,
          descricao: "Para edição",
          quantidade: 4,
        },
      }).then((res) => {
        const produtoId = res.body._id;

        cy.request({
          method: "PUT",
          url: `${apiUrl}/produtos/${produtoId}`,
          headers: { Authorization: token },
          body: {
            nome: newName,
            preco: 120,
            descricao: "Editado via Cypress",
            quantidade: 8,
          },
        }).then((editRes) => {
          expect(editRes.status).to.eq(200);
          expect(editRes.body.message).to.eq("Registro alterado com sucesso");
        });
      });
    });
  });

  it("Should create a new product if editing with invalid ID", () => {
    cy.loginAPI().then((token) => {
      const uniqueName = `Produto Inexistente ${Date.now()}`;

      const produtoEdit = {
        nome: uniqueName,
        preco: 50,
        descricao: "Tentativa de edição com ID inválido",
        quantidade: 2,
      };

      const idInvalido = "1234567890abcdef";

      cy.request({
        method: "PUT",
        url: `${apiUrl}/produtos/${idInvalido}`,
        headers: { Authorization: token },
        body: produtoEdit,
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq("Cadastro realizado com sucesso");
        expect(res.body).to.have.property("_id").and.to.not.equal(idInvalido);
      });
    });
  });

  it("Should delete a product with success", () => {
    cy.loginAPI().then((token) => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/produtos`,
        headers: { Authorization: token },
        body: {
          nome: "Produto a ser excluído",
          preco: 200,
          descricao: "Será excluído",
          quantidade: 1,
        },
      }).then((res) => {
        const id = res.body._id;

        cy.request({
          method: "DELETE",
          url: `${apiUrl}/produtos/${id}`,
          headers: { Authorization: token },
        }).then((deleteRes) => {
          expect(deleteRes.status).to.eq(200);
          expect(deleteRes.body.message).to.eq("Registro excluído com sucesso");
        });
      });
    });
  });
});
