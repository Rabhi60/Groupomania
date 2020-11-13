const db = require('../models/index');



// Logique métier

// Like // création d'un like ou le supprimer
exports.likeMessage = (req, res, next) => {

  const userId = req.body.userId;// constante qui contient l'userId
  const messageId = req.params.messageId;// constante qui contient le messageId

  if (messageId <= 0 ) {// on vérifie si le messageId est égal ou inférieur à 0 sinon on envoie un message d'erreur
    return res.status(400).json({ error: 'Paramètres du message sont érronées' });
  }
  if (userId <= 0 ) {// on vérifie si l'userId est égal ou inférieur à 0 sinon on envoie un message d'erreur
    return res.status(400).json({ error: 'Paramètres du message sont érronées' });
  }

  db.Message.findOne({ where: { id: messageId } })// on vérifie l'id du message
  .then(message => {
    if (message) {
      db.User.findOne({  where: {id: userId }})// on vérifie l'id de l'user 
        .then(user => {
          if (user) {// si l'user existe on continue sinon code 401 contenu dans le else
            db.Like.findOne({ where: { userId: userId, messageId: messageId }})// on cherche le like s'il existe 
              .then(like => {
                if (!like) {//s'il n'exsite pas, on créé un like pour ce message, on met 1 dans le likeType qui nous permettra de savoir que l'utilisateur a liké.
                  db.Like.create({
                    messageId: message.id, 
                    userId: user.id,
                    likeType: 1
                  })
                  .then(() => {
                    message.update({// on modifie la colonne likes dans le message correspondant en ajoutant +1
                        likes: message.likes + 1
                    })
                    .then(()=>  res.status(201).json(message));// on envoie la reponse contenant le message avec le likes modifié
                  })
                  .catch(error => res.status(500).json({ error }));// erreur serveur

                } else if (like && (like.likeType == 1)) {// si on souhaite retirer notre like on vérifie si liké et que le likeType est égal à 1 si oui on le modifie et on retire 1 au likes dans message.
                 like.update({ likeType: 0}, { where: { messageId: message.id, userId: user.id
                  }})
                    .then(() => {
                      message.update({
                          likes: message.likes - 1
                      })
                      .then(() => {
                        db.Like.destroy({// on détruit le like
                          where: {id: like.id}
                        }).then(() => res.status(200).json('like supprimé'))
                      });
                      })
                      .catch(error => { return res.status(500).json({ error })});
                    
                }  else if (like && (like.likeType === -1 )) {// si le like existe et qu'il est a -1 c'est qu'il est disliké donc on ne peut pas liké on envoie un code 409 conflit
                  return res.status(409).json({ 'message':'Le message est disliké' });
                }
              })
              .catch(error => { return res.status(500).json({ error })});
          }  else {
            return res.status(401).json({ message:'Utilisateur inconnu' });// si l'utilisateur n'existe pas on bloque
          }        
        })
    }       
  }) 
};
  
      
 
  

// DISLIKE// Création d'un dislikes ou suppression
exports.dislikeMessage = (req, res, next) => {
   

   // constante userId et messageId
   const userId = req.body.userId;// constante qui contient l'userId
   const messageId = req.params.messageId;// constante qui contient le messageId
 
   if (messageId <= 0 ) {// on vérifie si le messageId est égal ou inférieur à 0 sinon on envoie un message d'erreur
     return res.status(400).json({ 'error': 'Paramètres du message sont érronées' });
   }
   if (userId <= 0 ) {// on vérifie si le userId est égal ou inférieur à 0 sinon on envoie un message d'erreur
     return res.status(400).json({ 'error': 'Paramètres du message sont érronées' });
   }
  
   db.Message.findOne({ where: { id: messageId } })// on vérifie l'id du message 
   .then(message => {
     if (message) {
       db.User.findOne({  where: {id: userId }})// on vérifie l'id  de l'user
         .then(user => {
           if (user) {// si l'user existe on continue sinon code 401 contenu dans le else
             db.Like.findOne({ where: { userId: userId, messageId: messageId }})
               .then(like => {
                 if (!like) {// on met -1 dans le likeType pour dire que c'est disliké
                   db.Like.create({
                     messageId: message.id, 
                     userId: user.id,
                     likeType: -1
                   })
                   .then(() => {
                     message.update({// on ajoute 1 dans la colonne dislikes dans le message en question
                        dislikes: message.dislikes + 1
                     })
                     .then(()=>  res.status(201).json(message));
                   })
                   .catch(error => res.status(500).json({ error }));
 
                 } else if (like && (like.likeType == -1)) {// si on souhaite supprimer le dislikes on verifie si le like existe, si oui et qu'il est a -1 donc disliké on le modifie puis on le supprime et on change le dislikes dans la partie message
                  like.update({ likeType: 0}, { where: { messageId: message.id, userId: user.id
                   }})
                     .then(() => {
                       message.update({
                           dislikes: message.dislikes - 1
                       })
                       .then(() => {
                         db.Like.destroy({
                           where: { messageId: message.id, 
                            userId: user.id}
                         }).then(() => res.status(200).json('dislike supprimé'))
                       });
                       })
                       .catch(error => { return res.status(500).json({ error })});
                 }  else if (like && (like.likeType == 1) ) {
          
                  return res.status(409).json({ 'message':'Le message est disliké' });// si  like existe et qu'il est a 1 c'est qu'il est liké donc on ne peut pas disliké on envoie un code 409 conflit
                }
               })
               .catch(() => { return res.status(500).json({ 'error':  "Problème serveur, nous ne pouvons pas vérifier si l'utilisateur a !" })});
           } else {
            return res.status(401).json({'error': "Cet utilisateur n'existe pas !"});
           }             
        }).catch(() => res.status(500).json({'error': "Problème serveur, nous ne pouvons pas vérifier l'utilisateur éxiste !"}))
     } else {
      return res.status(400).json({'error': "Ce message n'existe pas !"});
     }       
   }).catch(() => res.status(500).json({'error': "Problème serveur, nous ne pouvons pas vérifier le message !"})) 
 };
