import { baseUrl } from "../consts/appSettings";

describe("Login and System Features", () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
    cy.wait(1000);
  });

  it("Should display an error on try to login with invalid creditials", () => {
    cy.get('[data-testid="email"]').type("usuario@invalido.com");
    cy.get('[data-testid="senha"]').type("senhaerrada");
    cy.get('[data-testid="entrar"]').click();

    cy.get(".alert").should("contain", "Email e/ou senha inválidos");
  });

  it("Should login with success and redirectly to a product list when user is not adm", () => {
    cy.get('[data-testid="email"]').type("teste@teste.com");
    cy.get('[data-testid="senha"]').type("teste12345");
    cy.get('[data-testid="entrar"]').click();

    cy.wait(1000);

    cy.get("h1").should("contain", "Serverest Store");
    cy.screenshot();
  });

  it("Should login with success and redirectly to a CRUD page when user is adm", () => {
    cy.get('[data-testid="email"]').type("johnDoe@email.com");
    cy.get('[data-testid="senha"]').type("qwe123");
    cy.get('[data-testid="entrar"]').click();

    cy.wait(1000);

    cy.get('[data-testid="cadastrarUsuarios"]').contains("Cadastrar");
    cy.screenshot();
  });
});
