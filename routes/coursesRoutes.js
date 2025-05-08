const express = require('express');
const coursesController = require('../controllers/corsesController');
const upload = require('../config/multer')

const router = express.Router()

router.route('/')
    .get(coursesController.getAllCourses)
    .post(upload.single("image"), coursesController.createCourse)

router.route('/:id')
    .get(coursesController.getSingleCourse)
    .put(upload.single("image"), coursesController.editCourseById)
    .delete(coursesController.deleteCourseById)

module.exports = router;