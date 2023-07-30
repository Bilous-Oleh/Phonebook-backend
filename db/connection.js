const mongoose = require("mongoose");

const { DB_HOST } = process.env;

const dbConnect = async () => {
  await mongoose.connect(DB_HOST);
};

module.exports = dbConnect;
