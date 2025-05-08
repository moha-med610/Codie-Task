// libraries
const express = require('express');
const cors = require('cors');

// import error handler
const notFoundHandler = require('./middleware/notFoundHandler');
const globalError = require('./middleware/globalError')

// import routes
const coursesRoutes = require('./routes/coursesRoutes')

// app
const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// routes
app.use('/api/courses', coursesRoutes)

// error Handler
app.use(notFoundHandler)
app.use(globalError)


module.exports = app;
