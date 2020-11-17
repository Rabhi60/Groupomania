const express = require('express');// on importe express pour pouvoir créer notre Router
const router = express.Router();// on va utiliser la methode Router d'express
const auth = require('../middleware/auth');// middleware d'authentification
const adminCtrl = require('../controllers/admin');// controllers Admin


// logique de routine
router.get('/allUsers', auth, adminCtrl.getAllUsers);// route permettant de récuperer tout les comptes utilisateurs
router.put('/updateUser/:id', auth, adminCtrl.updateOneUser);// route permettant de modifier le compte d'utilisateur pour le rendre admin ou non
router.delete('/deleteUser/:id', auth, adminCtrl.deleteUserProfile);// route qui va permettre de supprimer un compte utilisateur

module.exports = router;// on exporte notre router