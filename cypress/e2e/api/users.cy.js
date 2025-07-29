import { apiUrl } from "../../consts/appSettings";

describe("Get users from backend", () => {
  before(() => {
    cy.request(`${apiUrl}/usuarios`).then((res) => {
      const users = res.body.usuarios;
      cy.wrap(users).as("users");
    });
  });

  it("Should validate filtering of admin users and ensure they have a non-empty email", function () {
    cy.get("@users").then((users) => {
      const hasAdmins = users.some((user) => user.administrador === "true");
      expect(hasAdmins).to.be.true;

      const adminUsers = users.filter((user) => user.administrador === "true");

      adminUsers.forEach((adminUser) => {
        expect(adminUser.administrador).to.eq("true");
        expect(adminUser).to.have.property("email").and.to.not.be.empty;
      });
    });
  });

  it("Should get a user by id", () => {
    const userId = "1CGC5FrysRpOLnO9";
    cy.request(`${apiUrl}/usuarios/${userId}`).then((res) => {
      const user = res.body;
      expect(user).to.have.property("administrador").and.to.not.be.empty;
    });
  });

  it("Should return 400 for a non-existent user", () => {
    const userId = "1CGsfsfsfC5FrysLnO9";
    cy.request({
      method: "GET",
      url: `${apiUrl}/usuarios/${userId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it("Should edit a user that is not an admin", () => {
    cy.request("GET", "https://serverest.dev/usuarios").then((res) => {
      const nonAdminUser = res.body.usuarios.find(
        (u) => u.administrador === "false"
      );

      expect(nonAdminUser).to.exist;

      const updatedUserData = {
        nome: "Usuário Atualizado",
        email: nonAdminUser.email,
        password: "novaSenha123",
        administrador: "false",
      };

      cy.request({
        method: "PUT",
        url: `https://serverest.dev/usuarios/${nonAdminUser._id}`,
        body: updatedUserData,
        failOnStatusCode: false,
      }).then((editRes) => {
        expect(editRes.status).to.eq(200);
        expect(editRes.body.message).to.eq("Registro alterado com sucesso");
      });
    });
  });
});
