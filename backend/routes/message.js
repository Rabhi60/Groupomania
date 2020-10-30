const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express

router.post('/messages/new/', messagesCtrl.createMessage);
router.get('/messages/', messagesCtrl.listMessages);
router.put('/messages/modify/', messagesCtrl.modifyMessage);
router.delete('/messages/delete', messagesCtrl.deleteMessages);

