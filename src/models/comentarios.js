const mongoose = require("mongoose");

const ComentarioSchema = mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
  },
  fecha: {
    type: Date,
    required: true
  },
  descripcion: {
    type: String,
    required: true,
  },
  
});
module.exports = mongoose.model("Comentarios", ComentarioSchema);