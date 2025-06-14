const UserRoutes = require("express").Router();
const {
  AddUsers,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/UserControllers");

UserRoutes.post("", AddUsers);
UserRoutes.get("", getAllUsers);
UserRoutes.get("/:id", getUserById);
UserRoutes.delete("/:id", deleteUser);
UserRoutes.put("/:id", updateUser);

module.exports = UserRoutes;
