const db = require('../models/index');
const jwt = require('jsonwebtoken');// on importe jwt pour vérifier nos tokens


// GET All USERS // récuperer tout les utilisateurs
exports.getAllUsers =  (req, res, next) => {
   
    //constante pour controler notre userId
    const token = req.headers.authorization.split(' ')[1];// on va recuperer notre token qui est en deuxième élèment du tableau donc 1 et le bearer en 0
    const decodedToken = jwt.verify(token, 'XyJ__L9_VU2qMq8E7r_d__428_JRz9_vv7Uz4wVX_V__5eqE__s6829_tzB');// on va décoder le token, donc on verifie le token et en deuximème argument la clé secrète
    const userId = decodedToken.userId;// on souhaite récuperer l'userId qu'on a encodé 

    console.log(userId)
    db.User.findOne({
        where: {id: userId}
    }).then(user => {
        if(user.isAdmin === true){
            db.User.findAll({
                attributes: ['username', 'firstname', 'lastname', 'id']
            }).then(users => res.status(200).json({users}))
            .catch(() => res.status(500).json({message: 'Il y a un problème serveur'}));
        } else{
            return res.status(403).json({message:'accès non autorisée'});
        }
        
    }).catch(() => res.status(500).json('problème serveur'))
     
};

// Delete one user // supprimer un compte utilisateur
exports.deleteUserProfile = (req, res, next) => {
    
    //constante pour controler notre userId
    const token = req.headers.authorization.split(' ')[1];// on va recuperer notre token qui est en deuxième élèment du tableau donc 1 et le bearer en 0
    const decodedToken = jwt.verify(token, 'XyJ__L9_VU2qMq8E7r_d__428_JRz9_vv7Uz4wVX_V__5eqE__s6829_tzB');// on va décoder le token, donc on verifie le token et en deuximème argument la clé secrète
    const userId = decodedToken.userId;// on souhaite récuperer l'userId qu'on a encodé 

    db.User.findOne({
        where: {id: userId}
    }).then(user => {
        if(user.isAdmin === true && user.id != req.params.id ){
            db.User.destroy({
                where: { id: req.params.id }
              }).then(() => res.status(200).json({message: 'User supprimée!'}))
                .catch(error => res.status(400).json({error}));
        } else{
            return res.status(403).json('accès non autorisée, si vous êtes l\'admin vous ne pouvez pas supprimez votre compte directement');
        }
        
    }).catch(() => res.status(500).json('problème serveur'));
};


// Update One User // changer un utilisatuer en admin ou le mettre non admin
exports.updateOneUser =  (req, res, next) => {

    //constante pour controler notre userId
    const token = req.headers.authorization.split(' ')[1];// on va recuperer notre token qui est en deuxième élèment du tableau donc 1 et le bearer en 0
    const decodedToken = jwt.verify(token, 'XyJ__L9_VU2qMq8E7r_d__428_JRz9_vv7Uz4wVX_V__5eqE__s6829_tzB');// on va décoder le token, donc on verifie le token et en deuximème argument la clé secrète
    const userId = decodedToken.userId;// on souhaite récuperer l'userId qu'on a encodé 

    db.User.findOne({
        where: {id: userId}
    }).then(user => {
        if(user.isAdmin === true){
            db.User.update({
               
                isAdmin: req.body.isAdmin},
                {where: {id: req.params.id},

            }).then(() => res.status(200).json({message: 'User modifiée!'}))
            .catch(error => res.status(400).json({error}));
           
        } else{
            return res.status(403).json('accès non autorisée');
        }
        
    }).catch(() => res.status(500).json('problème serveur'));
    
};

