const express = require('express');// on importe express
const bodyParser = require('body-parser');// on importe body-parser
const helmet = require('helmet');// on importe helmet
const path = require('path');// on importe path qui nous donne accès au chemin de notre système de fichier
const toobusy = require('toobusy-js');// on importe toobusy
toobusy.maxLag(40);
const dotenv = require('dotenv');// on importe dotenv pour masquer l'url/mdp/nom d'hôte
dotenv.config();

const commentRoutes = require('./routes/comment');// la routes qui correspond a nos comments (POST/DELETE)
const likeRoutes = require('./routes/like');// la routes qui correspond a nos likes (POST)
const adminRoutes = require('./routes/admin');// la routes qui correspond a nos messages (GET/DELETE)
const messageRoutes = require('./routes/message');// la routes qui correspond a nos messages (GET/POST/PUT/DELETE)
const userRoutes = require('./routes/user');// la routes qui correspond a l'authentification (GET/POST/PUT/DELETE)



const app = express();// on créé notre application express

app.use((req, res, next) => {// partie cors

    res.setHeader('Access-Control-Allow-Origin', '*');// origin permet de voir qui peut utiliser l'API, l'étoile permet de dire que tout le monde peut accéder
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');// on donne l'autorisation d'utiliser certains en-tête
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');// on donne l'autorisation d'utiliser certaines méthodes les verbes de requête GET, POST...
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());//Pour toutes les routes de notre application, c'est ce qui va transformer le corps de la requête en objet JavaScript utilisable, ce middleware sera global pour l'application

app.use('/images', express.static(path.join(__dirname, 'images')));// pour les requêtes a /images, express.static est utilisé pour servir un dossier static, on utilise la methode path.joint que l'on va lui passer dirname qui est le nom dossier dans lequel on va se trouver et on lui ajoute images qui est le dossier static

app.use(helmet());// permet de contrer les attaques xss(grace a xss-filter qui par défaut)

app.use(function(req, res, next) {// toobusy permet de contrer les attaques type déni de service (DoS, Deny of Service)
  if (toobusy()) {
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  } 
});



app.use('/api/messages', commentRoutes);// on utilse cette base pour toutes nos comments
app.use('/api/messages', likeRoutes);// on utilse cette base pour toutes nos routes likes
app.use('/api/admin', adminRoutes);// on utilse cette base pour toutes nos routes admin
app.use('/api/messages', messageRoutes);// on utilse cette base pour toutes nos routes message
app.use('/api/users', userRoutes);// on utilse cette base pour toutes nos authentification

module.exports = app;// on va exporter cette application (const app), pour pouvoir l'utilser sur nos autres fichiers du projet