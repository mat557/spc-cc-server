const express = require('express');
const router = express.Router();
const usersControllers = require('../../controllers/usersControllers.js');
const courseController = require('../../controllers/courseController.js');

// all get request

router.route('/').get(usersControllers.getAllUsers)
router.route('/:email').get(usersControllers.getSingleUser)
router.route('/courses/all').get(courseController.getAllCourses)
router.route('/course/find/:id').get(courseController.getSingleCourse)



// all put request

router.route('/addUser').put(usersControllers.putSingleUser)
router.route('/addCourse').put(courseController.putSingleCourse)
router.route('/update/course/:id').put(courseController.updateSingleCourse)


// all delete request

router.route('/delete/post/:id').delete(courseController.deleteSingleCourse)

// all delete request


module.exports =  router;