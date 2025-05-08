const Courses = require("../models/courses");
const AppError = require("../utils/appError");
const asyncWrapper = require("../middleware/asyncWrapper");
const mongoose = require("mongoose");
const uploadImage = require("./uploadImage");
const Course = require("../models/courses");

const getAllCourses = asyncWrapper(async (req, res, next) => {
  const courses = await Courses.find();

  res.status(200).json({
    success: true,
    statusCode: 200,
    statusMessage: "success",
    message: "courses Fetches Successfully",
    data: courses,
  });
});

const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(AppError.error(400, "Bad Request", "Invalid Course Id"));
  }

  const course = await Courses.findById(id);

  if (!course) {
    return next(
      AppError.error(404, "Not Found", "Sorry. Course Was Not Found")
    );
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    statusMessage: "Success",
    message: "course Fetches Successfully",
    data: course,
  });
});

const createCourse = asyncWrapper(async (req, res, next) => {
  const { title, description, price, image, startDate, endDate } = req.body;

  if (!title || !description || !price) {
    return next(
      AppError.error(400, "Bad Request", "Please Provide All Required Fields")
    );
  }

  const result = await uploadImage(req.file.buffer);


  const newCourse = await Courses.create({
    title,
    description,
    price,
    image: result.secure_url,
    startDate,
    endDate,
  });

  res.status(201).json({
    success: true,
    statusCode: 201,
    statusMessage: "Created",
    message: "course Created Successfully",
    data: newCourse,
  });
});

const editCourseById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, image, startDate, endDate } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(AppError.error(400, "Bad Request", "Invalid Course Id"));
    }
  
    if (!title || !description || !price) {
      return next(
        AppError.error(400, "Bad Request", "Please Provide All Required Fields")
      );
    }
  
    let imageUrl = image;
    if (req.file && req.file.buffer) {
      const result = await uploadImage(req.file.buffer);
      imageUrl = result.secure_url;
    }
  
    const course = await Courses.findByIdAndUpdate(
      id,
      { title, description, price, image: imageUrl, startDate, endDate },
      { new: true }
    );
  
    if (!course) {
      return next(AppError.error(404, "Not Found", "Sorry. Course was Not Found"));
    }
  
    res.status(200).json({
      success: true,
      statusCode: 200,
      statusMessage: "Success",
      message: "Course Updated Successfully",
      data: course,
    });
  });
  

const deleteCourseById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(AppError.error(400, "Bad Request", "Invalid Course Id"));
  }

  const course = await Course.findByIdAndDelete(id)

  if(!course){
    return next(AppError.error(404, "Not Found", "Sorry. Course Was Not Found"))
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    statusMessage: "Success",
    message: "course Deleted Successfully",
    data: null,
  })
});

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  editCourseById,
  deleteCourseById,
};
