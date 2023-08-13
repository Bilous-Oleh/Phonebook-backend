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

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const currentUser = await User.findOne({ email });
  if (!currentUser) {
    res.status(401).json({
      message: "Email or password is incorrect",
    });
  }

  const { _id: id } = currentUser;

  const comparedPswrd = await currentUser.comparePassword(password);
  if (!comparedPswrd) {
    res.status(401).json({
      message: "Email or password is incorrect",
    });
  }

  const payload = {
    id: id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const { name } = await User.findById(id);

  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({
    token,
    user: {
      name,
      email,
    },
  });
};

const logOutController = async (req, res) => {
  const {_id} = req.user
  await User.findByIdAndUpdate(_id, {token:""});
  res.status(204).json({
    message: `User is logout`
  })
}

const currentController = (req, res) => {
  const {name, email} = req.user
  res.json({name, email})
}

module.exports = {
  signupController,
  loginController,
  logOutController,
  currentController
};
