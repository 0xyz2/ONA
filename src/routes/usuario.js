const express = require("express");
const router = express.Router();
const userSchema = require("../models/usuario");

router.post("/usuarios", (req, res) => {
  const user = new userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
});

router.get("/usuarios", (req, res) => {
    userSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;

    userSchema
        .updateOne({ _id: id }, {
            $set: { nombre, correo }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});





module.exports = router;
