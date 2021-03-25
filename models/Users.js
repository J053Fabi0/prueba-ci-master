const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    age: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
    },
    birth_date: Date,
    photo: {
      type: String,
    },
  },
  { timestamps: true } // Agrega created_at y updated_at
);

// Vincular la colección en mongo con el shema de arriba.
const users = mongoose.model("users", UserSchema);
module.exports = users;
