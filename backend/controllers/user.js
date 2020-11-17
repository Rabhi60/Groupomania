const bcrypt = require('bcrypt');// on importe bcrypt qui va nous permettre de crypter nos mots de passe
const jwt = require('jsonwebtoken');// on importe jsonwebtoken
const emailValidator = require('email-validator');// validateur d'émail
const db = require('../models/index');

// Constants
const emailRegex    = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator  = require('../middleware/passwordValidator');// middleware pour contrôler le mot de passe
const nameRegex = /^[a-zÀ-ÿ\d\-.'\s]{2,30}$/i;


// Logique métier

//SIGNUP // Incription, ouverture d'un compte utilisateur

  exports.signup = async (req, res, next) => {
    console.log(req.body);
    if(!nameRegex.test(req.body.username)|| !nameRegex.test(req.body.firstname) || !nameRegex.test(req.body.lastname)) {// nameRegex permet de vérifier les caractères utilisés
      return res.status(400).json({ 'error': 'the content is not valid' });
    }
    if (!emailRegex.test(req.body.email) || !emailValidator.validate(req.body.email)) {// email validator permet d'accepter un mail valide, idem pour le regex
      return res.status(400).json({ 'error': 'email is not valid' });
    }
    if (!passwordValidator.validate(req.body.password)) {
      return res.status(400).json({ 'error': 'password invalid (must length 8 - 100 and include 2 number at least)' });
    }
    const user = await db.User.create(req.body)//creation du compte utilisateur
      .catch(error => res.status(500).json({ error: 'Internal Server Error' }));//erreur 500

    user.password = await bcrypt.hash(user.password, 10);// bcrypt va permettre de masquer/crypter le password dans la base de donnée
    await user.save()// permet d'enregistrer l'utilisateur dans la base de donnée
      .then(() => res.status(201).json({userId: user.id, isAdmin: user.isAdmin, token: jwt.sign({ userId: user.id }, 'XyJ__L9_VU2qMq8E7r_d__428_JRz9_vv7Uz4wVX_V__5eqE__s6829_tzB', {expiresIn: '24h'})}))// 201 créé et modifiée 
      .catch(error => res.status(400).json({ error: 'Bad Request !' }));//erreur 400 mauvaise requête
  };

// LOGIN// Connexion de l'utilisateur
exports.login = function(req, res, next) {

  if (!emailRegex.test(req.body.email)) {// regex permet de vérifier l'input email
    return res.status(400).json({ 'error': 'Your email is invalid' });
  }
  if (!passwordValidator.validate(req.body.password)) {// passwordValidator permet de vérifier l'input du password pour plus de détail voir le middleware passwordValidator
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
                isAdmin: user.isAdmin,
                token: jwt.sign(// on utilise la fonction sign dejsonwebtoken pour encoder un nouveau token 
                    { userId: user.id,
                    },//ce token contient l'ID de l'utilisateur en tant que payload
                    'XyJ__L9_VU2qMq8E7r_d__428_JRz9_vv7Uz4wVX_V__5eqE__s6829_tzB',// on utilise une chaîne secrète
                    { expiresIn: '24h'}// on définit la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures ;
                )
            });
        })
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }));// erreur serveur 500
    })
    .catch(error => res.status(500).json({ error: 'Internal Server Error' }));// erreur serveur 500 
};

  // Get Profile // on récupère notre profil
  exports.getUserProfile =  (req, res, next) => {
  

    db.User.findOne({// on récupère les données de l'utisateur id, email, username, firstname et lastname.
      attributes: [ 'id', 'email','username', 'firstname', 'lastname'],
      where: {id: req.params.id}//on récupère le compte en question avec l'id correspondant
    }).then(user => res.status(200).json(user))// code 200 ok, on recupère les données de l'utilisateur en reponse
      .catch(error => res.status(400).json({error}));//mauvaise requête dû a un user qui n'éxiste pas
  };

  // Modify Profile // modifier son profil
  exports.updateUserProfile = async (req, res, next) => {
    if(!nameRegex.test(req.body.username)|| !nameRegex.test(req.body.firstname) || !nameRegex.test(req.body.lastname)) {// permet de vérifier les inputs lors de la modification du profil.
      return res.status(400).json({ 'error': 'the content is not valid' });
    }
    if (!emailRegex.test(req.body.email) || !emailValidator.validate(req.body.email)) {// utilisation de regex et email validator pour accepter un email valide
      return res.status(400).json({ 'error': 'email is not valid' });
    }
    if (!passwordValidator.validate(req.body.password)) {// passwordValidator permet de vérifier si un mot de passe correct a été utilisé
      return res.status(400).json({ 'error': 'password invalid (must length 8 - 100 and include 2 number at least)' });
    }

    const user =  req.body;
    user.password = await bcrypt.hash(user.password, 10);// bcrypt permet de crypter le mot de passe dans la base de donnée
    await db.User.update(// permet de modifier dans la base de donnée
        req.body, 
      {where: { id: req.body.id }
    }).then(() => res.status(200).json({message: 'User modifiée!'}))
    .catch(error => res.status(500).json({error}));
  };


  // Delete profile // suppression d'un compte utilisateur 
  exports.deleteUserProfile = (req, res, next) => {
    db.User.destroy({// permet de supprimer
        where: { id: req.params.id }
        
      }).then(() => res.status(200).json({message: 'User supprimée!'}))// code 200 nous indique que c'est ok, le compte a été supprimé
        .catch(() => res.status(400).json({message: 'Le compte n\'existe pas'}));// mauvaise requête 
  };