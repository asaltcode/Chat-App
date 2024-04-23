const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    if (process.env.NODE_ENV === 'development') {
        return res.status(statusCode).json({
            success: false,
            message: message,
            stack: err.stack,
            error: err
        });
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(value => value.message).join(', ');
    }

    if (err.name === "CastError") {
        statusCode = 404;
        message = `Resource Not Found ${err.path}`;
    }

    if (err.code === 11000) {
        statusCode = 400;
        message = `Duplicate ${Object.keys(err.keyValue)} error`;
    }

    if (err.name === "JSONWebTokenError") {
        statusCode = 401;
        message = 'JSON Web Token is invalid. Try again';
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = 'JSON Web Token is expired. Try again';
    }

    res.status(statusCode).json({
        success: false,
        message: message
    });
}

export default errorHandler;
