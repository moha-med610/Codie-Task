const express = require("express");
const coursesController = require("../controllers/corsesController");
const upload = require("../config/multer");
const validate = require("../middleware/validate");
const {
  createCourseValidation,
  courseIdParamValidation,
} = require("../validators/courseValidator");

const router = express.Router();

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    upload.single("image"),
    createCourseValidation,
    validate,
    coursesController.createCourse
  );

router
  .route("/:id")
  .get(courseIdParamValidation, validate, coursesController.getSingleCourse)
  .put(
    upload.single("image"),
    courseIdParamValidation,
    createCourseValidation,
    validate,
    coursesController.editCourseById
  )
  .delete(courseIdParamValidation, validate, coursesController.deleteCourseById);

module.exports = router;
