const mongoose = require("mongoose");

const publicacionSchema = mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    enum: ["moda", "salud", "estudio", "tecnología", "política"]
  }
});
module.exports = mongoose.model("Publicacion", publicacionSchema);