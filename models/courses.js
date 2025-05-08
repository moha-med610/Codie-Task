const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title Is Required"],
    },
    description: {
        type: String,
        required: [true, "Description Is Required"],
    },
    image: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    price: {
        type: Number,
        required: [true, "Price Is Required"],
        min: [0, "Price must be positive"]
    }
}, { timestamps: true })

const Course = mongoose.model('Course', coursesSchema)
module.exports = Course;