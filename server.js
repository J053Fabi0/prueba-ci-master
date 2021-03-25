const multer = require("multer");
const express = require("express");
const mongoose = require("mongoose");
const UsersController = require("./controllers/UserController");
const manageFiles = require("./middlewares/manageFiles");

const app = express();
const MONGO_URI =
  "mongodb+srv://josefabio:SFjpVqPBlVQ8yOHPSNg6Zu3TpKgtP6iCBjFVeTxB0uu9geoTC@cluster0.nxpoi.mongodb.net/apimongo?retryWrites=true&w=majority";
// const MONGO_URI = "mongodb://db:27017/" + process.env.MONGO_NAME;

const storage =
  process.env.NODE_ENV === "production"
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "uploads");
        },
        filename: function (req, file, cb) {
          cb(null, `${Date.now()}_${file.originalname}`);
        },
      });

const mult = multer({
  storage: multer.memoryStorage(), // Los archivos se quedarán en memora hasta que se puedan mandar
  limits: {
    fileSize: 5 * 1024 * 1024, // El límite son archivos de 5 MB.
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Aquí estamos haciendo la carpeta uploads pública para que el front end pueda acceder a ella.
// Ruta virtual: http://localhost:3000/uploads/
app.use("/uploads", express.static("uploads"));

// Conexión con mongo, solo si no estamos en test.
// NODE_ENV se hace "test" solito al comenzar Jest
if (process.env.NODE_ENV !== "test")
  mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); // La inica

const db = mongoose.connection; // El status de la conexión

db.on("error", function (err) {
  console.log(err);
});

// Esto se ejecuta solo cuando se haya completado la conexión
db.once("open", function () {
  console.log("Connected");
});

app.get("/users", UsersController.fetch);

app.post("/users", [mult.single("photo"), manageFiles], UsersController.create);

app.get("/users/:id", UsersController.findOne);

app.patch("/users/:id", [mult.single("photo"), manageFiles], UsersController.update);

app.delete("/users/:id", UsersController.remove);

if (process.env.NODE_ENV !== "test") app.listen(3000, () => console.log("Server on port 3000."));

module.exports = app;
