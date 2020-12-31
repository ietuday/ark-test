const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers');

// Retrieve all users
router.get('/', userController.findAll);

// Create a new user
router.post('/', userController.create);

// Retrieve a single user with id
router.post('/user-by-id', userController.findOne);

// Update a user with id
router.put('/', userController.update);

// Delete a user with id
router.delete('/', userController.delete);

module.exports = router