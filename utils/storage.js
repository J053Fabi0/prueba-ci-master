const { Storage } = require("@google-cloud/storage");
const service = require("../service.json");

const storage = new Storage({
  projectId: "m4sterencoding",
  keyFilename: "service.json",
});

const bucket = storage.bucket("m4sterencoding.appspot.com");

module.exports = (file) =>
  new Promise((res, rej) => {
    if (!file) rej("No hay algún archivo.");

    // Renombra el archivo para que no se repita el nombre
    const newFileName = `${Date.now()}_${file.originalname}`;

    // Crear un nuevo archivo
    const fileUpload = bucket.file(newFileName);

    // Stream de datos donde se mandarán los pedacitos de archivo
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mime, // Qué tipo de archivo es el que le voy a mandar
      },
    });

    blobStream.on("error", (err) => rej(err));

    // Cuando termine, guarda la url resolviendo la promesa
    blobStream.on("finish", () =>
      res(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`)
    );

    // Se comienza la transmisión de datos del buffer
    blobStream.end(file.buffer);
  });
