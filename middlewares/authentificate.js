const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    res.status(401).json({
      message: "You're not authorizated",
    });
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user) {
      res.status(401).json({
        message: "You're not authorizated",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authentificate;
