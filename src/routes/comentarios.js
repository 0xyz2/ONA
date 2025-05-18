const express = require("express");
const router = express.Router();
const Comentario = require("../models/comentario");
const Publicacion = require("../models/publicacion");


router.post("/comentarios", async (req, res) => {
  const { publicacionId, usuario, descripcion } = req.body;

  try {
    const publicacion = await Publicacion.findById(publicacionId);
    if (!publicacion) {
      return res.status(404).json({ mensaje: "Publicación no encontrada" });
    }

    const nuevoComentario = new Comentario({
      publicacionId,
      usuario,
      descripcion
    });

    await nuevoComentario.save();
    res.status(201).json(nuevoComentario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear comentario", error });
  }
});


router.get("/comentarios", async (req, res) => {
  try {
    const comentarios = await Comentario.find().populate("publicacionId");
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener comentarios", error });
  }
});


router.put("/comentarios/:id", async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;

  try {
    const comentarioActualizado = await Comentario.findByIdAndUpdate(
      id,
      { descripcion },
      { new: true }
    );
    if (!comentarioActualizado) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }
    res.json(comentarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar comentario", error });
  }
});


router.delete("/comentarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comentarioEliminado = await Comentario.findByIdAndDelete(id);
    if (!comentarioEliminado) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }
    res.json({ mensaje: "Comentario eliminado", comentario: comentarioEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar comentario", error });
  }
});

module.exports = router;
