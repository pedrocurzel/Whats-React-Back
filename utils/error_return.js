function returnError(res, error) {
    console.log(error);
    return res.status(500).json({
        message: error.message,
        error: true
    });
}

module.exports = returnError;