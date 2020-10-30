const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express
const bouncer = require('express-bouncer')(60000,900000,3);// on importe express-bouncer qui permet de bloquer le nombre de tentative ex: anti force brute, on a 3 paramètres entre parenthèse (temps d'attente minimum pour réésayer, temps d'attente max, et le nombre de tentative)
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/users/signup/', userCtrl.signup);
router.post('/users/login/', bouncer.block, userCtrl.login);// la route pour s'authentifier
router.get('/users/me/', auth, userCtrl.getUserProfile);
router.put('/users/me/', auth, userCtrl.updateUserProfile);
router.delete('/users/me/', auth, userCtrl.deleteUserProfile);

module.exports = router;// on exporte notre router

