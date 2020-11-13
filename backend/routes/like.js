const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express
const likesCtrl = require('../controllers/like');// controllers like
const auth = require('../middleware/auth');// middleware d'authentification

//logique de routine
router.post('/:messageId/like', auth,  likesCtrl.likeMessage);// route pour liké ou retier son like
router.post('/:messageId/dislike', auth,  likesCtrl.dislikeMessage);// route pour disliké ou retier son dislike

module.exports = router;// on exporte notre router