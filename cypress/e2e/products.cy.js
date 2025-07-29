import { baseUrl } from "../consts/appSettings";

beforeEach(() => {
  cy.session("login", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('[data-testid="email"]').type("testing5938@qa.com");
    cy.get('[data-testid="senha"]').type("Testing12345$");
    cy.get('[data-testid="entrar"]').click();
    cy.wait(1000);
  });

  cy.visit(`${baseUrl}/admin/home`);
});

it("Should display product register page", () => {
  cy.get("h5").should("contain", "Cadastrar");
});

it("Should register a new product", () => {
  cy.get('[data-testid="cadastrarProdutos"]').click();
  cy.get('[data-testid="nome"]').type("New product");
  cy.get('[data-testid="preco"]').type(20);
  cy.get('[data-testid="descricao"]').type("New product description");
  cy.get('[data-testid="quantity"]').type(1000);
});
