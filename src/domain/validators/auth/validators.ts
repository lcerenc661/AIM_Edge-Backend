import { body } from "express-validator";

export const userLoginValidator = [
  body("email", "Email should be a proper email value and is required")
    .exists()
    .notEmpty()
    .isEmail(),
  body("password", "Password length should have minimum 6 characters")
    .exists()
    .notEmpty()
    .isLength({ min: 6 }),
];

export const userRegisterValidator = [
  body("email", "Email should be a proper email value and is required")
    .exists()
    .notEmpty()
    .isEmail(),
  body("password", "Password length should have minimum 6 characters")
    .exists()
    .notEmpty()
    .isLength({ min: 6 }),
  body("password2").custom((value, { req }) => {
    // Check if password2 matches password
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];
