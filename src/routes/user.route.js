const router = require("express").Router();
const validate = require("../middleware/validate").validateBody;
const authValidation = require("../inputValidations/auth.validations");
const verifyToken = require("../middleware/verifyToken").verifyToken;
const userController = require("../controllers/index").userController;
const userValidations = require("../inputValidations/user.validations");


router.put(
  "/update-user",
  validate(userValidations.updateUser),
  verifyToken,
  userController.updateUser,
);

module.exports = router;