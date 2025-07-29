import { baseUrl } from "../../consts/appSettings";

describe("Registration page", () => {
  let users;
  beforeEach(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
    cy.visit(`${baseUrl}/cadastrarusuarios`);
    cy.wait(1000);
  });

  it("Should successfully create a new admin user", () => {
    const randomUser = Math.floor(Date.now() / 1000);
    const randomEmail = `user.${randomUser}@mail.com`;

    cy.get('[data-testid="nome"]').type("John Doe");
    cy.get('[data-testid="email"]').type(randomEmail);
    cy.get('[data-testid="password"]').type("qwe123");
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrar"]').click();

    cy.get(".alert").should("contain", "Cadastro realizado com sucesso");
    cy.screenshot();
  });

  it("Should display an error when the user already exists", () => {
    cy.get('[data-testid="nome"]').type(users.existingUser.nome);
    cy.get('[data-testid="email"]').type(users.existingUser.email);
    cy.get('[data-testid="password"]').type(users.existingUser.password);
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
