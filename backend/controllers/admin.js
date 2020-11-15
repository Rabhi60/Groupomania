const db = require('../models/index');



// GET All USERS // récuperer tout les utilisateurs
exports.getAllUsers =  (req, res, next) => {
   
    db.User.findOne({
        where: {id: req.params.userId}
    }).then(user => {
        if(user.isAdmin === true){
            db.User.findAll({
                attributes: ['username', 'firstname', 'lastname', 'id']
            }).then(users => res.status(200).json({users}))
            .catch(() => res.status(500).json({message: 'Il y a un problème serveur'}));
        } else{
            return res.status(401).json({message:'accès non autorisée'});
        }
        
    }).catch(() => res.status(500).json('problème serveur'))
     
};

// Delete one user // supprimer un compte utilisateur
exports.deleteUserProfile = (req, res, next) => {
    db.User.findOne({
        where: {id: req.params.userId}
    }).then(user => {
        if(user.isAdmin === true){
            db.User.destroy({
                where: { id: req.params.id }
              }).then(() => res.status(200).json({message: 'User supprimée!'}))
                .catch(error => res.status(401).json({error}));
        } else{
            return res.status(401).json('accès non autorisée');
        }
        
    }).catch(() => res.status(500).json('problème serveur'));
};


// Update One User // changer un utilisatuer en admin ou le mettre non admin
exports.updateOneUser =  (req, res, next) => {
    db.User.findOne({
        where: {id: req.body.userId}
    }).then(user => {
        if(user.isAdmin === true){
            db.User.update({
                where: {id: req.params.id},
                isAdmin: req.body.isAdmin

            }).then(() => res.status(200).json({message: 'User modifiée!'}))
            .catch(error => res.status(401).json({error}));
           
        } else{
            return res.status(401).json('accès non autorisée');
        }
        
    }).catch(() => res.status(500).json('problème serveur'));
    
};

