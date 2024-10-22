const express = require('express');
const router = express.Router();
const ParametresController = require('../controllers/parametresTravailController');

// Route pour obtenir les paramètres actuels
router.get('/', ParametresController.getParametres);

// Route pour mettre à jour les paramètres de travail
router.post('/', ParametresController.updateParametres);

module.exports = router;