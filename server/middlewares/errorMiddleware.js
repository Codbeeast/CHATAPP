const ErrorHandler = (err, req, res, next) => {
    // console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        errMessage: errMsg,
        
    })
}

export default ErrorHandler