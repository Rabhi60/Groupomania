const bcrypt = require('bcrypt');// on importe bcrypt qui va nous permettre de crypter nos mots de passe
const jwt = require('jsonwebtoken');// on importe jsonwebtoken
const emailValidator = require('email-validator');// validateur d'émail
const db = require('../models/index');

// Constants
const emailRegex    = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator  = require('../middleware/passwordValidator');// middleware pour contrôler le mot de passe
const nameRegex = /^[a-zÀ-ÿ\d\-.'\s]{2,30}$/i;
const urlRegex = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;

//SIGNUP

  exports.signup = async (req, res, next) => {
    console.log(req.body);
    if(!nameRegex.test(req.body.username)|| !nameRegex.test(req.body.firstname) || !nameRegex.test(req.body.lastname)) {
      return res.status(400).json({ 'error': 'the content is not valid' });
    }
    if (!emailRegex.test(req.body.email) || !emailValidator.validate(req.body.email)) {
      return res.status(400).json({ 'error': 'email is not valid' });
    }
    if (!passwordValidator.validate(req.body.password)) {
      return res.status(400).json({ 'error': 'password invalid (must length 8 - 100 and include 2 number at least)' });
    }
    const user = await models.User.create(req.body)
      .catch(error => res.status(500).json({ error: 'Internal Server Error' }));//erreur 500

    user.password = await bcrypt.hash(user.password, 10);
    await user.save()
      .then(() => res.status(201).json({userId: user.id, token: jwt.sign({ userId: user.id }, 'TEST_TOKEN_SECRET', {expiresIn: '24h'})}))// 201 créé et modifiée 
      .catch(error => res.status(400).json({ error: 'Bad Request !' }));//erreur 400 mauvaise requête
  };

// LOGIN
exports.login = function(req, res, next) {

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ 'error': 'Your email is invalid' });
  }
  if (!passwordValidator.validate(req.body.password)) {
    return res.status(400).json({ 'error': 'password invalid (must length 8 - 100 and include 2 number at least)' });
  }

  db.User.findOne({  where: { email: req.body.email } })// on va chercher l'email de l'utilsateur dans la base de donnée
    .then(user => {
        if (!user){// si on ne trouve pas d'email correspondant on renvoie l'erreur ci-dessous
            return res.status(401).json({ message: 'this account is not valid' });// erreur 401 non autorisé
        }
        bcrypt.compare(req.body.password, user.password)// si l'email correspond on utilie la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données 
        .then(valid => {
            if (!valid){// si le mot de passe ne correspond pas on renvoie une erreur 401
                return res.status(401).json({ message: 'Your password is invalid!' });// erreur 401 non autorisé
            }
            res.status(200).json({// on envoie response 200 pour une requête correct qui contient l'ID de l'utilisateur et un token
                userId: user.id,
                token: jwt.sign(// on utilise la fonction sign dejsonwebtoken pour encoder un nouveau token 
                    { userId: user.id},//ce token contient l'ID de l'utilisateur en tant que payload
                    'TEST_TOKEN_SECRET',// on utilise une chaîne secrète
                    { expiresIn: '24h'}// on définit la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures ;
                )
            });
        })
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }));// erreur serveur 500
    })
    .catch(error => res.status(500).json({ error: 'Internal Server Error' }));// erreur serveur 500 
};

  // Get Profil
  exports.getUserProfile =  (req, res, next) => {
    // if (userId < 0)
    //   return res.status(400).json({ 'error': 'wrong token' });

    db.User.findOne({
      attributes: [ 'id', 'email','username', 'firstname', 'lastname'],
      where: {id: req.params.id}
    }).then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({error}));
  };

  // Modify Profil 
  exports.updateUserProfile = async (req, res, next) => {
    if(!nameRegex.test(req.body.username)|| !nameRegex.test(req.body.firstname) || !nameRegex.test(req.body.lastname)) {
      return res.status(400).json({ 'error': 'the content is not valid' });
    }
    if (!emailRegex.test(req.body.email) || !emailValidator.validate(req.body.email)) {
      return res.status(400).json({ 'error': 'email is not valid' });
    }
    if (!passwordValidator.validate(req.body.password)) {
      return res.status(400).json({ 'error': 'password invalid (must length 8 - 100 and include 2 number at least)' });
    }

    const user =  req.body;
    user.password = await bcrypt.hash(user.password, 10);
    await db.User.update(
        req.body, 
      {where: { id: req.body.id }
    }).then(() => res.status(200).json({message: 'User modifiée!'}))
    .catch(error => res.status(500).json({error}));
  };

  exports.deleteUserProfile = async (req, res, next) => {
      await db.User.destroy({
        where: { id: req.params.id }
        
      }).then(() => res.status(200).json({message: 'User supprimée!'}))
        .catch(error => res.status(401).json({error}));
  };