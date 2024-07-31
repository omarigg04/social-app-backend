const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define la ruta para obtener el usuario por ID
router.get('/:id', userController.getUserById);

module.exports = router;