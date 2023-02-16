const express = require('express');
const router = express.Router();
const usersControllers = require('../../controllers/usersControllers');

// all get request
router.route('/').get(usersControllers.getAllUsers)
router.route('/:email').get(usersControllers.getSingleUser)

// all put request

router.route('/addUser').put(usersControllers.putSingleUser)

module.exports =  router;