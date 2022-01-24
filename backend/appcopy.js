const express = require('express'); // on importe express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Thing = require('./models/Thing');

// app.use(express.json()); // intercepte toutes les req qui continne du json et met a dispo ds rec.body comme body.parser



mongoose.connect('mongodb+srv://admin:admin@fullstack.taag4.mongodb.net/exo?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express(); // on appelle la methode express ce qui permet de créer une appli express


//Middleware
// app.use((req, res, next) => {
//     console.log('Requete reçue !');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Votre requête a bien été reçue !' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Réponse envoyée avec succès !');
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

// commenté pour enregistrement des things
  // app.post('/api/stuff', (req, res, next) => {
  //   console.log(req.body);
  //   res.status(201).json({
  //     message: 'Objet créé !'
  //   });
// });
// commenté pour enregistrement des things

// ajouté pour enregistrement des things
  app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });

    /* Enregistrement des Things dans la base de donnée */
    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
  });

  /* Modification d'un Thing enregistré */
  app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  /* Suppression d'un objet enregistré */
  app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

// mis en commentaire car on va aller chercher la liste things en vente
//---------------------------------------------------------------
// app.use('/api/stuff', (req, res, next) => {
//     const stuff = [
//       {
    //     _id: 'oeihfzeoi',
    //     title: 'Mon premier objet',
    //     description: 'Les infos de mon premier objet',
    //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //     price: 4900,
    //     userId: 'qsomihvqios',
    //   },
    //   {
    //     _id: 'oeihfzeomoihi',
    //     title: 'Mon deuxième objet',
    //     description: 'Les infos de mon deuxième objet',
    //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //     price: 2900,
    //     userId: 'qsomihvqios',
    //   },
    // ];
    // res.status(200).json(stuff);
    //});
    //----------------------------------------------------------

    /* Récupération d'un Things spécifique */
    app.get('/api/stuff/:id', (req, res, next) => {
      Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
    });

    /* Récupération de la liste Things en vente */
    app.use('/api/stuff', (req, res, next) => {
      Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
    });

  



  

module.exports = app; // on exporte pour que l on puisse y acceder depuis les autres fichiers de notre projet notament notre server node

