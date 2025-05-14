const express = require("express");
const router = express.Router();
const userSchema = require("../models/publicacion");

router.post("/publicacion", (req, res) => {
  const user = new userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
});
module.exports = router;
