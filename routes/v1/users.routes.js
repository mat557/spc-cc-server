const express = require('express');
const router = express.Router();
const usersControllers = require('../../controllers/usersControllers.js');
const courseController = require('../../controllers/courseController.js');
const blogController = require('../../controllers/blogControllers.js');

// all get request

router.route('/').get(usersControllers.getAllUsers)
router.route('/:email').get(usersControllers.getSingleUser)


router.route('/courses/all').get(courseController.getAllCourses)
router.route('/course/find/:id').get(courseController.getSingleCourse)


router.route('/collection/blog').get(blogController.getAllBlogs)
router.route('/single/blog/:id').get(blogController.getSingleBlogs)

router.route('/response/react/:email/:id').put(blogController.getBlogReactResponse)


// all put request

router.route('/addUser').put(usersControllers.putSingleUser)
router.route('/addCourse').put(courseController.putSingleCourse)

router.route('/update/course/:id').put(courseController.updateSingleCourse)

// all delete request

router.route('/delete/post/:id').delete(courseController.deleteSingleCourse)

router.route('/delete/blog/:id').delete(blogController.deleteSingleBlog)

//all post request 

router.route('/course/enrole/:email').post(courseController.enroleCourse)
router.route('/blog/post').post(blogController.postSingleBlog)


router.route('/promote/blogger/:email').post(usersControllers.promoteUserBLog)

router.route('/update/blog/:id').patch(blogController.updateSingleBlog)


module.exports =  router;