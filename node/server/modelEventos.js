let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Usuarios = require('./modelUsuarios'),
    autoIncrement = require('mongoose-auto-increment'),
    EventSchema = new Schema({ // Create event Schema
      title:{ type: String, required: true },
      start: { type: String, required: true },
      end: { type: String, required: false },
      user: { type: Schema.ObjectId, ref: "Usuario" }
    });

autoIncrement.initialize(connection) // Initialize autoIncrement module on connection
EventSchema.plugin(autoIncrement.plugin, {model: 'Evento', startAt: 1} ); // Assign autoIncrement plugin to event

let EventoModel = mongoose.model('Evento', EventSchema) // Define event model

module.exports = EventoModel
