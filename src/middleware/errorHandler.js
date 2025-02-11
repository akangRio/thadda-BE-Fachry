function errorHandler(err, req, res, next) {
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "Invalid token",
    });
  }
  if (err.name) {
    if (err.code) {
      res.status(err.code).json({
        message: err.message,
      });
    } else {
      res.send(err.message);
    }
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = errorHandler;
