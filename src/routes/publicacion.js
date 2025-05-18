const express = require("express");
const router = express.Router();
const publicacionSchema = require("../models/publicacion");

router.post("/publicacion", (req, res) => {
    const publicacion = new publicacionSchema(req.body);
    publicacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error }));
});

router.get("/publicacion/categoria/:categoria", (req, res) => {
    const categoria = req.params.categoria;
    const categoriasValidas = ["moda", "salud", "estudio", "tecnología", "política"];
    if (!categoriasValidas.includes(categoria)) {
        return res.status(400).json({ message: "Categoría inválida" });
    }

    publicacionSchema.find({ categoria: categoria })
        .then((publicaciones) => {
            res.json(publicaciones);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});


router.get("/publicaciones", (req, res) => {
    publicacionSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/publicacion/:id", (req, res) => {
    const { id } = req.params;
    const { descripcion, categoria } = req.body;

    publicacionSchema
        .updateOne({ _id: id }, { $set: { descripcion, categoria } })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error }));
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
