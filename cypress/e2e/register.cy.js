import { baseUrl } from "../consts/appSettings";

describe("New user registration", () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/cadastrarusuarios`);
    cy.wait(1000);
  });

  it("Should create a new adm user with success", () => {
    const randomUser = Date.now();
    const randomEmail = `user.${randomUser}@mail.com`;

    cy.get('[data-testid="nome"]').type("John Doe");
    cy.get('[data-testid="email"]').type(randomEmail);
    cy.get('[data-testid="password"]').type("qwe123");
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrar"]').click();

    cy.get(".alert").should("contain", "Cadastro realizado com sucesso");
    cy.screenshot();
  });

  it("Should display an error when user already exists", () => {
    cy.get('[data-testid="nome"]').type("test0007");
    cy.get('[data-testid="email"]').type("test0007@qa.com");
    cy.get('[data-testid="password"]').type("test0007");
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrar"]').click();

    cy.get(".alert").should("contain", "Este email já está sendo usado");
    cy.screenshot();
  });

  it("Should display an error if you try to register without filling in the required fields", () => {
    cy.get('[data-testid="cadastrar"]').click();
    cy.get(".alert").should("exist");
    cy.screenshot();
  });
});
