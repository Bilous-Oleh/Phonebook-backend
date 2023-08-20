const express = require("express");
const authentificate = require("../middlewares/authentificate");

const { validateBody } = require("../middlewares/validateBody");

const {
  signupController,
  loginController,
  currentController,
  logOutController,
  updateAvatar,
} = require("../controllers/userControllers");

const { signUpSchema, loginSchema } = require("../schemas/userSchema");
const upload = require("../middlewares/upload");
const checkFile = require("../middlewares/checkFile");

const userRouter = express.Router();

userRouter.post("/signup", validateBody(signUpSchema), signupController);

userRouter.post("/login", validateBody(loginSchema), loginController);

userRouter.post("/logout", authentificate, logOutController);

userRouter.get("/current", authentificate, currentController);

userRouter.patch(
  "/avatar",
  authentificate,
  upload.single("avatar"),
  checkFile,
  updateAvatar
);

module.exports = userRouter;
