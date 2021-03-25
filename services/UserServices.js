// Aquí estará todo lo que tenga que ver con la base de datos
const Users = require("../models/Users");

const createUser = async (user) => {
  if (!user) throw new Error("No hay usuario");

  return await Users.create(user);
};

const findUsers = () => Users.find({});

const findUserById = async (id) => {
  const user = await Users.findById(id);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
};

const updateUser = async (id, user) => {
  if (!user) throw new Error("Se necesita un objeto usuario");
  const userDB = await Users.upadateOne({ _id: id }, { $set: user }, { new: true });
  if (!userDB) throw new Error("Usuario no encotrado");
  return userDB;
};

const deleteUser = (id) => Users.deleteOne({ _id: id });

module.exports = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
