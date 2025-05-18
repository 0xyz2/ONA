const express = require("express");
const router = express.Router();
const Reporte = require("../models/reportes");
const Publicacion = require("../models/publicacion");

router.post("/reportar", async (req, res) => {
  const { publicacionId, motivoReporte, reportadoPor } = req.body;

  try {
    const publicacion = await Publicacion.findById(publicacionId);
    if (!publicacion) {
      return res.status(404).json({ mensaje: "Publicación no encontrada" });
    }

    const nuevoReporte = new Reporte({
      publicacionId,
      motivoReporte,
      reportadoPor
    });

    await nuevoReporte.save();
    res.status(201).json({ mensaje: "Reporte creado correctamente", reporte: nuevoReporte });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el reporte", error });
  }
});


router.get("/reportes", async (req, res) => {
  try {
    const reportes = await Reporte.find().populate("publicacionId");
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener reportes", error });
  }
});

router.put("/reportes/:id", async (req, res) => {
  const { id } = req.params;
  const { motivoReporte } = req.body;

  try {
    const reporteActualizado = await Reporte.findByIdAndUpdate(
      id,
      { motivoReporte },
      { new: true }
    );

    if (!reporteActualizado) {
      return res.status(404).json({ mensaje: "Reporte no encontrado" });
    }

    res.json({ mensaje: "Reporte actualizado", reporte: reporteActualizado });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar reporte", error });
  }
});


router.delete("/reportes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reporteEliminado = await Reporte.findByIdAndDelete(id);
    if (!reporteEliminado) {
      return res.status(404).json({ mensaje: "Reporte no encontrado" });
    }

    res.json({ mensaje: "Reporte eliminado correctamente", reporte: reporteEliminado });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar reporte", error });
  }
});

module.exports = router;
