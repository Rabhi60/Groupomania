const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express
const likesCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

router.post('/messages/:messageId/vote/like', auth, likesCtrl.likePost);
router.post('/messages/:messageId/vote/dislike', auth, likesCtrl.dislikePost);

module.exports = router;// on exporte notre router