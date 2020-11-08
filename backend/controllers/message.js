const models = require('../models');
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
          
    models.User.findOne({
      where: { id: req.body.userId }})
    .then(user => {
      if(req.body.image == 'undefined' ){
        return models.Message.create({
            UserId: user.id,
            title: req.body.title,
            attachment:  null,
            content: req.body.content,
            likes: req.body.likes,
            })
            .then(message =>  res.status(201).json(message))
            .catch(error => res.status(404).json({ 'error': 'contenu invalide' }));
        } else{
            return models.Message.create({
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
    
    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: {
        model: models.User,
        attributes: ['id','username']
      }})
      .then(messages => { return res.status(200).json(messages)})
      .catch(() => {res.status(404).json({ "error": "Il n'y a pas de message" })});
  };
   
  

  //  exports.getOneMessage = (req, res, next) => {
  
  //  };

//   exports.modifyMessage = (req, res, next) => {
  
// };

//   exports.deleteMessage = (req, res, next) => {
  
//   };

//   exports.likeMessage = (req, res, next) => {
  
//   };