const bcrypt = require('bcrypt');// on importe bcrypt qui va nous permettre de crypter nos mots de passe
const jwt = require('jsonwebtoken');// on importe jsonwebtoken
const emailValidator = require('email-validator');// validateur d'émail
const db = require('../models');