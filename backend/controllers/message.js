const db = require('../models/index');
const fs = require('fs');// on importe file system de node pour avoir accès aux différentes opérations liées fichiers
//constants
const titleRegex = /^[a-zÀ-ÿ\d\-.'!\s]{2,30}$/i;
const contentRegex = /^[a-zÀ-ÿ\d\-.'!\s]{0,250}$/i;
const ITEMS_LIMIT   = 50;


// Logique métier

// Création d'un message
exports.createMessage = (req, res, next) => {
    // Permet de voir le corps de la requête 
    console.log(req.body);

    if (!titleRegex.test(req.body.title)) {
      return res.status(400).json({ 'error': 'Votre titre doit faire entre 2 et 30 caractères' });
    }

    if (!contentRegex.test(req.body.content)) {
      return res.status(400).json({ 'error': 'Votre contenu ne peut contenir plus de 250 caractères' });
    }
          
    db.User.findOne({
      where: { id: req.body.userId }})
    .then(user => {
      if(req.body.image == 'undefined' ){
        return db.Message.create({
            UserId: user.id,
            title: req.body.title,
            attachment:  null,
            content: req.body.content,
            likes: req.body.likes
            })
            .then(message =>  res.status(201).json(message))
            .catch(error => res.status(404).json({ 'error': 'contenu invalide' }));
        } else{
            return db.Message.create({
            UserId: user.id,
            title: req.body.title,
            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` ,
            content: req.body.content,
            likes: req.body.likes
            })
            .then(message =>  res.status(201).json(message))
            .catch(error => res.status(404).json({ 'error': 'contenu invalide' }));
        }
    })
    .catch(error =>  res.status(500).json({ 'error': 'Problème serveur' }));
  };



exports.getAllMessages = (req, res, next ) => {
    let fields  = req.query.fields;
    let limit   = parseInt(req.query.limit);
    let offset  = parseInt(req.query.offset);
    let order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }
    
    db.Message.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: db.User,
        attributes: ['username']
      }]})
      .then(message => { return res.status(200).json(message)})
      .catch(() => {res.status(404).json({ "error": "Il n'y a pas de message" })});
  };
   
  

   exports.getOneMessage = (req, res, next) => {
     db.Message.findOne({
      where: {id: req.params.id},
      include: [{
        model: db.User,
        attributes: ['id','username']
      }]}).then(message => { return res.status(200).json(message)})
     .catch(() => {res.status(404).json({ "error": "Ce message n'existe pas" })});
  
   };

exports.modifyMessage = (req, res, next) => {
  console.log(req.body);
  db.Message.findOne({
    where: {id: req.params.id},
   }).then(message => { 
    if(req.body.image == 'undefined'){
      return db.Message.update({
        ...req.body,
          attachment:  null,
          },
          {where: { id: req.params.id }
        })
          .then(() =>  res.status(200).json('message modifié'))
          .catch(() => res.status(400).json({ 'error': 'contenu invalide' }));
      } else{
          return db.Message.update({
            ...req.body,
          attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` ,
 
          },
          {where: { id: req.params.id }
        })
          .then(() =>  res.status(200).json('message modifié'))
          .catch(() => res.status(400).json({ 'error': 'contenu invalide' }));
      }
   })

   .catch(() => {res.status(500).json({ "error": "Problème serveur" })});
  
};

  exports.deleteMessage =  (req, res, next) => {
    db.Message.findOne({where: { id: req.params.id }})
    .then(message => {
      const filename = message.attachment.split('/images/')[1];// on extrait le nom du fichier à supprimer
           fs.unlink(`images/${filename}`, () => {// fs.unlink permet de supprimer le fichier, après on a le chemin du fichier entre paranthèse
            db.Message.destroy({
                where: { id: req.params.id }
                
              }).then(() => res.status(200).json({message: 'Message supprimé!'}))
                .catch(error => res.status(400).json({error}));
            });
          })
          .catch(error => res.status(500).json({ error }));// erreur serveur 500
  };
