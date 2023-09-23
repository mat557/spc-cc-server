const express = require('express');
const router = express.Router();
const usersControllers = require('../../controllers/usersControllers.js');
const courseController = require('../../controllers/courseController.js');
const blogController = require('../../controllers/blogControllers.js');

// all get request

router.route('/').get(usersControllers.getAllUsers)
router.route('/:email').get(usersControllers.getSingleUser)
router.route('/student/enrolled/:id').get(usersControllers.getEnrolledStudentByCourse)


router.route('/courses/all').get(courseController.getAllCourses)
router.route('/course/find/:id').get(courseController.getSingleCourse)


router.route('/collection/blog').get(blogController.getAllBlogs)
router.route('/single/blog/:id').get(blogController.getSingleBlogs)


router.route('/count/feed').get(blogController.getCountPageItem)  //for feed
router.route('/count/comment/:id').get(blogController.getCommnetCount)  //for feed
router.route('/question/feed').get(blogController.getFeedItem)  //for feed
router.route('/reply/question/:id').get(blogController.getFeedReply)  //for feed

router.route('/comment/getcomment/:page').get(usersControllers.getUserComments)
router.route('/comment/count').get(usersControllers.countCommentNumber)


// all put request

router.route('/addUser').put(usersControllers.putSingleUser)
router.route('/addCourse').put(courseController.putSingleCourse)

router.route('/update/course/:id').put(courseController.updateSingleCourse)

router.route('/response/react/:email/:id').put(blogController.getBlogReactResponse)



// all delete request

router.route('/delete/post/:id').delete(courseController.deleteSingleCourse)//course

router.route('/delete/blog/:id').delete(blogController.deleteSingleBlog) //blog

//all post request 

router.route('/course/enrole/:email').post(courseController.enroleCourse)
router.route('/blog/post').post(blogController.postSingleBlog)


router.route('/feed/question').post(blogController.postSinglequestion) //for feed
router.route('/feed/answer/:id').post(blogController.postSingleReply) //for feed
router.route('/feed/answer/:id').post(blogController.likeSingleQuestion) //for feed


router.route('/promote/blogger/:email').post(usersControllers.promoteUserBLog)
router.route('/insert/course/mark/:id/:length').post(usersControllers.postStudentExamsMarks)


router.route('/comment').post(usersControllers.addUserComment)

//all patch request 

router.route('/update/blog/:id').patch(blogController.updateSingleBlog)


module.exports =  router;