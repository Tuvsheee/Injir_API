const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("../middleware/asyncHandler");

// Middleware to protect routes that require authentication
exports.protect = asyncHandler(async (req, res, next) => {
  try {
    // Check if an authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        msg: "Authentication required. Please log in first.",
      });
    }
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token exists
    if (!token) {
      return res.status(400).json({
        success: false,
        msg: "Token is missing.",
      });
    }
    // Verify the token and extract user information
    const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenObj);
    req.userId = tokenObj.Id; // Change "Id" to "id" for consistency
    req.userRole = tokenObj.role;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Invalid token. Please log in again.",
    });
  }
});

// Middleware to authorize specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Check if the user role is included in the allowed roles
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        msg: `You do not have permission to perform this action. Your role is [${req.userRole}].`,
      });
    }
    next();
  };
};
