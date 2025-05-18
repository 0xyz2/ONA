const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Importar rutas
const usuarioRoutes = require('./routes/usuario');
const reporteRoutes = require("./routes/reportes");

// Middlewares
app.use(express.json()); // Para leer JSON en las peticiones

// Usar las rutas
app.use('/api', usuarioRoutes);
app.use("/api/reportes", reporteRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conexión exitosa a MongoDB'))
  .catch((error) => console.log('❌ Error al conectar:', error.message));

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Foro de moda sostenible funcionando!');
});

// Escuchar puerto
app.listen(port, () => {
  console.log('La aplicación se está ejecutando por el puerto ' + port);
});

