const express = require("express");
const { check, validationResult } = require("express-validator");

const {
  signup,
  signout,
  signin,
  
} = require("../controllers/userController");

const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Validation rules
const validateSignup = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  check("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
];

const validateSignin = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
];

// Routes
router.post("/user/signup",validateSignup, handleValidationErrors, signup);
router.post("/user/signin", validateSignin, handleValidationErrors, signin);
router.get("/user/signout", signout);


module.exports = router;
   