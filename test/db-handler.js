const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// Se crea un nuevo servidor de mongo, en memoria
const mongod = new MongoMemoryServer();

const connect = async () => {
  const uri = await mongod.getUri();
  const mongooseOptions = {
    useNewUrlParser: true,
    autoReconnect: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOptions);
};

// Se borran las tablas, se mata la conexión, y luego el servidor
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

// Esto borra todos los datos de las colecciones
// Para que un test no afecte al siguiente
const clearDatabase = async () => {
  const { collections } = mongoose.connection;

  for (const key of Object.keys(collections)) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
};
