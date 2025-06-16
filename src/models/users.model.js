const { Schema, model } = require("mongoose");

// User Schema Models
const usersRegisterModels = new Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
}, { versionKey: false, timestamps: true });


const UserRegister = model("Users", usersRegisterModels);


module.exports = UserRegister;