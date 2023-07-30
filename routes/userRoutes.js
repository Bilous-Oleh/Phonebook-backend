const express = require("express");
const { signupController } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/signup", signupController);

userRouter.post("/login");

userRouter.post("/logout");

userRouter.get("/current");

module.exports = userRouter;
