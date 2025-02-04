const errorHandler = (err, req, res, next) => {
  if (err.stack) {
    console.log(err.stack.cyan?.underline);
  } else {
    console.error(err);
  }

  const error = { ...err };

  error.message = err.message;

  if (error.name === "CastError") {
    error.message = "Энэ ID буруу бүтэцтэй ID байна!";
    error.statusCode = 400;
  }

  if (error.code === 11000) {
    error.message = "Энэ талбарын утгыг давхардуулж өгч болохгүй!";
    error.statusCode = 400;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error
  });
};

module.exports = errorHandler;
