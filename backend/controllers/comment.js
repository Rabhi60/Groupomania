const models = require('../models');


exports.createComment = (req, res, next) => {
    // Permet de voir le corps de la requête 
    console.log(req.body);
    if (!contentRegex.test(req.body.content)) {
      return res.status(400).json({ 'error': 'Votre contenu ne peut contenir plus de 250 caractères' });
    }
          
    db.Message.findOne({where: { id: req.params.id }})
    .then(message => {
        db.Comment.create({
            UserId: user.id,
            MessageId: req.body.messageId,
            content: req.body.content,
        })
        .then(() =>  res.status(201).json('commentaire créé'))
        .catch(() => res.status(404).json({ 'error': 'contenu invalide' }));
    })
    .catch(error =>  res.status(500).json({ 'error': 'Problème serveur' }));
};


exports.deleteMessage = async (req, res, next) => {
    await db.Comment.destroy({
        where: { id: req.params.id }
    })
    .then(() => res.status(200).json({message: 'Commentaire supprimé!'}))
    .catch(error => res.status(400).json({error}));
};