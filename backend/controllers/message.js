const models = require('../models');

//constants
const nameRegex = /^[a-zÀ-ÿ\d\-.'\s]{4,30}$/i;
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

// Routes

  exports.createMessage = (req, res, next) => {
    // Getting auth header
    const token = req.headers.authorization.split(' ')[1];// on va recuperer notre token qui est en deuxième élèment du tableau donc 1 et le bearer en 0
    const decodedToken = jwt.verify(token, 'TEST_TOKEN_SECRET');// on va décoder le token, donc on verifie le token et en deuximème argument la clé secrète
    const userId = decodedToken.userId;

    // Params
    var title   = req.body.title;
    var content = req.body.content;

    if (title == null || content == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          models.Message.create({
            title  : title,
            content: content,
            likes  : 0,
            UserId : userFound.id
          })
          .then(function(newMessage) {
            done(newMessage);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newMessage) {
      if (newMessage) {
        return res.status(201).json(newMessage);
      } else {
        return res.status(500).json({ 'error': 'cannot post message' });
      }
    });
  };



  exports.getAllMessages = (req, res, next) => {
    var fields  = req.query.fields;
    var limit   = parseInt(req.query.limit);
    var offset  = parseInt(req.query.offset);
    var order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: [ 'username' ]
      }]
    }).then(function(messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ "error": "no messages found" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  };

//   exports.getOneMessage = (req, res, next) => {
  
//   };

//   exports.modifyMessage = (req, res, next) => {
  
// };

//   exports.deleteMessage = (req, res, next) => {
  
//   };

//   exports.likeMessage = (req, res, next) => {
  
//   };