const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const errorController = require('./controllers/error');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configuración CORS con el paquete cors
app.use(cors({
  origin: 'https://social-app-frontend-delta.vercel.app', // Cambia esto a la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'X-Custom-Header', 'Authorization']
}));

app.use('/auth', authRoutes);
app.use('/post', postsRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));
