const { body, param } = require("express-validator");

const createCourseValidation = [
  body("title")
    .notEmpty().withMessage("Title is required"),

  body("description")
    .notEmpty().withMessage("Description is required"),

  body("price")
    .notEmpty().withMessage("Price is required"),

  body("startDate").optional().isISO8601().withMessage("Invalid start date"),
  body("endDate").optional().isISO8601().withMessage("Invalid end date"),
];

const courseIdParamValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid course ID"),
];

module.exports = {
  createCourseValidation,
  courseIdParamValidation,
};
