const userService = require("../services/user");

const indexUsers = async (req, res, next) => {
  const users = await userService.getAllUsers();
  if (!users) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    Users: users,
  });
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.getAUser(id);
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
  return res.status(200).json({
    User: user,
  });
};

const create = async (req, res, next) => {
  let cookieData = null;
  let userToReturn = null;
  const body = req.body;
  const [userAlreadyExists, userData] = await userService.checkForExistingUser(body);
  if (userAlreadyExists) {
    userToReturn = userData;
    cookieData = userData._id;
  }else{
    userToReturn = await userService.create(body);
    cookieData = userToReturn._id;
  }
  res.cookie("session", `${cookieData}`, { maxAge: 7200000 });
  return res.status(200).json({
    User: userToReturn,
  });
};

const destroy = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.destroy(id);
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
  return res.status(200).json({
    User: user,
  });
};

const update = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const user = await userService.update(id, body);
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
  return res.status(200).json({
    User: user,
  });
};


module.exports = {
  indexUsers,
  getUser,
  create,
  destroy,
  update,
};
