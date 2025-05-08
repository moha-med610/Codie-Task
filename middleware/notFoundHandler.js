const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404, 
        statusMessage: "Not Found",
        message: `This path ${req.path} Is Not Found`,
        data: null
    })
}

module.exports = notFoundHandler;
