const request = require("supertest");
const app = require("../../server");
const userServices = require("../../services/UserServices");
const dbHandler = require("../db-handler");

// Simulando un servidor
const agent = request.agent(app);

// antes de los test ejecuta esto
beforeAll(() => dbHandler.connect());

// después de cada test
afterEach(() => dbHandler.clearDatabase());

// después de todos los test
afterAll(() => dbHandler.closeDatabase());

// hay beforeEach y más en https://jestjs.io/docs/api

describe("User controller", () => {
  it("Traer usuarios", async () => {
    const mockUser1 = {
      name: "TestUser",
      email: "testuser@gmail.com",
      password: "holaAmigos",
    };

    const mockUser2 = {
      name: "TestUser",
      email: "testusor@gmail.com",
      password: "holaAmigos",
    };

    await userServices.createUser(mockUser1);
    await userServices.createUser(mockUser2);

    // Si esto debe devolver usuarios, un 200 debe regresar
    const { body } = await agent.get("/users").expect(200);

    expect(body).toHaveLength(2);
    expect(body?.[0]._id).toBeTruthy();
  });

  it("Crear usuario", async () => {
    const { body } = await agent
      .post("/users")
      .field("email", "testuser@ao.com")
      .field("name", "test user")
      .field("password", "test");

    expect(body.email).toBe("testuser@ao.com");
    expect(body._id).toBeTruthy();
  });

  it("No crear usuario que no tiene correo", async () => {
    const { body } = await agent.post("/users").field("name", "test user").field("password", "test");

    expect(body.errors).toBeTruthy();
    expect(body.errors).toHaveProperty("email");
  });
});
