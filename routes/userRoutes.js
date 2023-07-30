const express = require("express");

const {
  signUpSchema,
  validateBody,
  loginSchema,
} = require("../middlewares/validate");

const {
  signupController,
  loginController,
} = require("../controllers/userControllers");

const authentificate = require("../middlewares/authentificate");

const userRouter = express.Router();

userRouter.post("/signup", validateBody(signUpSchema), signupController);

userRouter.post("/login", validateBody(loginSchema), loginController);

userRouter.post("/logout");

userRouter.get("/current");

module.exports = userRouter;
