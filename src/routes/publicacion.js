const express = require("express");
const router = express.Router();
const publicacionSchema = require("../models/publicacion");

router.post("/publicacion", (req, res) => {
  const publicacion = new publicacionSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
});

router.get("/publicaciones/categoria/:categoria", (req, res) => {
    const { categoria } = req.query;

    const filtro = categoria ? { categoria } : {};

    publicacionSchema.find(filtro)
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

router.get("/publicaciones", (req, res) => {
    publicacionSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.delete("/publicacion/:id", (req, res) => {
    const { id } = req.params;
    publicacionSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

module.exports = router;
