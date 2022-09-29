const userRouter = require('express').Router();
const UserController = require("../controllers/userController")

// User
userRouter.post("/login", UserController.login)
userRouter.post("/register", UserController.register)

// Group
userRouter.get("/group",UserController.getGroup)
userRouter.post("/group",UserController.addGroup)
userRouter.put("/group/:id",UserController.editGroup)
userRouter.delete("/group/:id", UserController.deleteGroup)

module.exports = userRouter