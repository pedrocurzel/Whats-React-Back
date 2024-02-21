function returnError(res, error) {
    return res.status(500).json({
        message: error.message,
        error: true
    });
}

module.exports = returnError;