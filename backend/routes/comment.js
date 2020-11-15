const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express
const auth = require('../middleware/auth');// on importe notre middleware d'authentification 
const commentCtrl = require('../controllers/comment');// on importe notre controllers pour les commentaires

//logique de routine
router.post('/:messageId/newComment', auth, commentCtrl.createComment);// route pour créé un commentaire
router.get('/comment/:commentId/:userId', auth, commentCtrl.oneComment);// route pour récuperer un commentaire
router.delete('/comment/:commentId/:userId', auth, commentCtrl.deleteComment);//route pour supprimer un commentaire

module.exports = router;// on exporte notre router