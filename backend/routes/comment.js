const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');


router.post('/messages/:messageId/newComment', auth, commentCtrl.createComment);
// router.delete('messages/:messageId/:id' auth, commentCtrl.deleteComment);

module.exports = router;// on exporte notre router