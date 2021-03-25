const uploadImage = require("../utils/storage");

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    if (!req.file) return res.status(400).send({ message: "No se envió." });
    const url = uploadImage(req.file);
    req.body.photo = url;
  } else {
    if (!req.file) return next();
    req.body.photo = `${req.protocol}://${req.host}/${req.file.originalname}`;
  }
  next();
};
