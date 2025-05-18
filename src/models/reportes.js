const mongoose = require("mongoose");

const reporteSchema = mongoose.Schema({
    
    publicacionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publicacion",
    required: true
  },

  motivoReporte: {
    type: String,
    required: true
  },

  reportadoPor: {
    type: String,
    required: true
  },

   fecha: {
    type: Date,
    default: Date.now
  },


});

module.exports = mongoose.model("Reporte", reporteSchema);