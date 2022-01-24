const express = require('express'); // on importe express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://admin:admin@fullstack.taag4.mongodb.net/exo?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // on appelle la methode express ce qui permet de créer une appli express

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app; // on exporte pour que l on puisse y acceder depuis les autres fichiers de notre projet notament notre server node

