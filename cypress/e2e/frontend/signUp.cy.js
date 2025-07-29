import { baseUrl } from "../../consts/appSettings";

describe("Login and System Features", () => {
  let users;
  beforeEach(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
    cy.visit(`${baseUrl}/login`);
    cy.wait(1000);
  });

  it("Should display an error when trying to log in with invalid credentials", () => {
    cy.get('[data-testid="email"]').type(users.invalidUser.email);
    cy.get('[data-testid="senha"]').type(users.invalidUser.password);
    cy.get('[data-testid="entrar"]').click();

    cy.get(".alert").should("contain", "Email e/ou senha inválidos");
  });

  it("Should log in successfully and redirect to the CRUD page when the user is admin", () => {
    cy.loginUI();
    cy.wait(1000);

    cy.get('[data-testid="cadastrarUsuarios"]').contains("Cadastrar");
    cy.screenshot();
  });
});
