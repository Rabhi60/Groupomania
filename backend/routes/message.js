const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express
const messagesCtrl = require('../controllers/message');// controllers message
const auth = require('../middleware/auth');// middleware d'authentification
const multer = require('../middleware/multer-config');// middleware multer-config qui permet de gerer les images

//logique de routine
router.post('/new', auth, multer, messagesCtrl.createMessage);// route pour créé un message
router.get('/', auth,  messagesCtrl.getAllMessages);// route pour récuperer tout les messages
router.get('/:messageId', auth, messagesCtrl.getOneMessage);// route pour récuperer un message
router.put('/modify/:messageId', auth, multer, messagesCtrl.modifyMessage);// route pour modifier un message
router.delete('/delete/:messageId/', auth, messagesCtrl.deleteMessage);// route pour supprimer un message


module.exports = router;// on exporte notre router