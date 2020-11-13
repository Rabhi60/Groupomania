const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express
const bouncer = require('express-bouncer')(1000,900000,3);//60000 on importe express-bouncer qui permet de bloquer le nombre de tentative ex: anti force brute, on a 3 paramètres entre parenthèse (temps d'attente minimum pour réésayer, temps d'attente max, et le nombre de tentative)
const userCtrl = require('../controllers/user');// controllers user
const auth = require('../middleware/auth');// middleware d'authentification


//logique de routine
router.post('/signup/', userCtrl.signup);// route pour s'inscrire
router.post('/login/', bouncer.block, userCtrl.login);// la route pour s'authentifier
router.get('/me/:id', auth, userCtrl.getUserProfile);// route pour récuperer soncompte
router.put('/me/', auth, userCtrl.updateUserProfile);// route pour modifier son compte
router.delete('/me/:id', auth, userCtrl.deleteUserProfile);// route pour supprimer son compte

module.exports = router;// on exporte notre router

