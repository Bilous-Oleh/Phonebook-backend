const checkFile = (req, res, next) => {
  if (!req.file) {
    res.status(400).json({ message: "File not found" });
    return;
  }
  next();
};

module.exports = checkFile;
