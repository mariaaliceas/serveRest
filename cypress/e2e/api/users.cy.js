describe("Get users from backend", () => {
  const apiUrl = Cypress.env("apiUrl");
  let users;
  before(() => {
    cy.loginAPI().then((token) => {
      cy.request({
        method: "GET",
        url: `${apiUrl}/usuarios`,
        headers: { Authorization: token },
      }).then((res) => {
        users = res.body.usuarios;
      });
    });
  });

  it("Should filter admin users and ensure they all have a non-empty email", () => {
    const hasAdmins = users.some((user) => user.administrador === "true");
    expect(hasAdmins).to.be.true;

    const adminUsers = users.filter((user) => user.administrador === "true");
    adminUsers.forEach((adminUser) => {
      expect(adminUser.administrador).to.eq("true");
      expect(adminUser).to.have.property("email").and.to.not.be.empty;
    });
  });

  it("Should return 400 for a non-existent user", () => {
    const fakeId = Date.now();
    cy.request({
      method: "GET",
      url: `${apiUrl}/usuarios/${fakeId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});
