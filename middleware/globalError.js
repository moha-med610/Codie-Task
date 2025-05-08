module.exports = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        success:false,
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || "Internal Server Error",
        message: error.message || "something Went Wrong",
        data: null
    })
}