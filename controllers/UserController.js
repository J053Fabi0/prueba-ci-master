const UserService = require("../services/UserServices");

const handleErr = (err, res) => res.status(400).send(err);

const create = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    handleErr(err, res);
  }
};

const fetch = async (_, res) => {
  try {
    const users = await UserService.findUsers();
    res.status(200).send(users);
  } catch (err) {
    handleErr(err, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.findUserById(id);
    res.status(200).send(user);
  } catch (err) {
    handleErr(err, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);
    res.status(200).send(user);
  } catch (err) {
    handleErr(err, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.status(204);
  } catch (err) {
    handleErr(err, res);
  }
};

module.exports = {
  create,
  fetch,
  findOne,
  update,
  remove,
};
