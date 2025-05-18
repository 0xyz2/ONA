const express = require("express");
const router = express.Router();
const Reporte = require("../models/reporte");
const Publicacion = require("../models/publicacion");

// Ruta para crear un reporte 
router.post("/reportar", async (req, res) => {
  const { publicacionId, motivo, reportadoPor } = req.body;

  try {
    const publicacion = await Publicacion.findById(publicacionId);
    if (!publicacion) {
      return res.status(404).json({ mensaje: "Publicación no encontrada" });
    }

    const nuevoReporte = new Reporte({
      publicacionId,
      motivo,
      reportadoPor
    });

    await nuevoReporte.save();
    res.status(201).json({ mensaje: "Reporte creado correctamente", reporte: nuevoReporte });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el reporte", error });
  }
});

module.exports = router;