import { baseUrl } from "../consts/appSettings";

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
  cy.visit(`${baseUrl}/login`);
  cy.get('input[name="email"]').type("fulano@qa.com");
  cy.get('input[name="password"]').type("teste");
  cy.get('button[type="submit"]').click();
  console.log(baseUrl);

  cy.url().should("not.include", "/login");
});
