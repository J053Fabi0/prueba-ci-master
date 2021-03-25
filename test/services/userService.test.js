const mongoose = require("mongoose");
const dbHandler = require("../db-handler");
const userService = require("../../services/UserServices");
const userModel = require("../../models/Users");

// antes de los test ejecuta esto
beforeAll(() => dbHandler.connect());

// después de cada test
afterEach(() => dbHandler.clearDatabase());

// después de todos los test
afterAll(() => dbHandler.closeDatabase());

// hay beforeEach y más en https://jestjs.io/docs/api

// Poner todo lo que quiero testear, que son los userServices
describe("User services", () => {
  it("Crear un usuario", async () => {
    const mockUser = {
      name: "TestUser",
      email: "testuser@gmail.com",
      password: "holaAmigos",
    };

    const userDb = await userService.createUser(mockUser);

    // Tiene que ser el mismo email
    expect(mockUser.email).toBe(userDb?.email);
    // Tiene que tener un _id
    expect(userDb).toHaveProperty("_id");
  });

  it("No crear usuario que todo", async () => {
    expect(async () => await userService.createUser()).rejects.toThrow();
  });

  it("Devolver arreglo de usuarios", async () => {
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

    await userService.createUser(mockUser1);
    await userService.createUser(mockUser2);

    const users = await userService.findUsers();

    expect(users).toHaveLength(2);
    expect(users[0]).toHaveProperty("_id");
  });
});
