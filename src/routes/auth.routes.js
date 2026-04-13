const router = require("express").Router();
const validate = require("../middleware/validate").validateBody;
const authValidation = require("../inputValidations/auth.validations");
const authController = require("../controllers/index").authController;
const verifyToken = require("../middleware/verifyToken").verifyToken;


// Public routes, no need to verify token
router.post("/register", validate(authValidation.register), authController.registerController);
router.post("/login", validate(authValidation.login), authController.loginController);
router.post("/logout", verifyToken, validate(authValidation.logout), authController.logoutController);

module.exports = router;