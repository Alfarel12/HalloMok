exports.success = (res, data, message = "success") => {
  res.status(200).json({
    status: "success",
    message,
    data
  });
};

exports.error = (res, message = "error", code = 500) => {
  res.status(code).json({
    status: "error",
    message
  });
};