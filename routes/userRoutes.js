const express = require("express");
const authentificate = require("../middlewares/authentificate");


const { 
  validateBody,  
} = require("../middlewares/validateBody");

const {
  signupController,
  loginController,
  currentController,
  logOutController,
} = require("../controllers/userControllers");

const {
  signUpSchema,
    loginSchema
} = require("../schemas/userSchema")


const userRouter = express.Router();

userRouter.post("/signup", validateBody(signUpSchema), signupController);

userRouter.post("/login", validateBody(loginSchema), loginController);

userRouter.post("/logout", authentificate, logOutController);

userRouter.get("/current", authentificate, currentController);

module.exports = userRouter;
