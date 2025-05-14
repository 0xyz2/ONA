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
module.exports = router;
