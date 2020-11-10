const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express
const messagesCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/messages/new', auth, multer, messagesCtrl.createMessage);
router.get('/messages', auth,  messagesCtrl.getAllMessages);
router.get('/messages/:id', auth, messagesCtrl.getOneMessage);
router.put('/messages/modify/:id', auth, multer, messagesCtrl.modifyMessage);
router.delete('/messages/delete/:id', auth, messagesCtrl.deleteMessage);


module.exports = router;// on exporte notre router