let mongoose = require('mongoose'),
    Schema = mongoose.Schema

let UserSchema = new Schema({ // Create user schema
  user: { type: String, required: true, unique: true},
  email: { type: String, required: true },
  password: { type: String, required: true},
  })

let UsuarioModel = mongoose.model('Usuario', UserSchema) // Define user model

module.exports = UsuarioModel
