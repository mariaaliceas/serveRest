// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginAPI", () => {
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        email: "fulano@qa.com",
        password: "teste",
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.authorization;
      return token;
    });
});

Cypress.Commands.add("loginUI", () => {
  cy.visit("/login");
  cy.get('input[name="email"]').type("fulano@qa.com");
  cy.get('input[name="password"]').type("teste");
  cy.get('button[type="submit"]').click();

  // Pode fazer alguma validação que a página mudou ou token foi setado no localStorage
  cy.url().should("not.include", "/login");
});
