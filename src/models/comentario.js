const mongoose = require("mongoose");

const ComentarioSchema = mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  descripcion: {
    type: String,
    required: true,
  },
  publicacionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publicacion",
    required: true
  }
});

module.exports = mongoose.model("Comentarios", ComentarioSchema);