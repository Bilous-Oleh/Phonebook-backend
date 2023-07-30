const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  const currentUser = await User.findOne({ email });
  if (currentUser) {
    res.status(409).json({ message: "You already have an email address" });
    return;
  }

  const newUser = new User({
    name,
    email,
    password,
  });
  await newUser.hashPassword(password);
  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name,
      email,
    },
  });
};

module.exports = {
  signupController,
};
