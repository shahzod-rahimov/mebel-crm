const { Router } = require("express");
const router = Router();
const Staff = require("../controllers/staff.controller");
const Validator = require("../validations/staff");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const {
  paramsIDValidation,
  queryPageValidation,
} = require("../validations/commonReqValidators");
const rolePolice = require("../middlewares/rolePolice");

router.get(
  "/",
  [queryPageValidation, handleValidationErrors],
  rolePolice("SUPER-ADMIN"),
  Staff.getAll
);

router.get(
  "/search/deliveryman",
  rolePolice("SUPER-ADMIN", "ADMIN", "OPERATOR"),
  Staff.getAllDeliveries
);

router.post(
  "/auth/signup",
  [Validator.signupValidation, handleValidationErrors],
  Staff.create
);

router.post(
  "/auth/signin",
  [Validator.signinValidation, handleValidationErrors],
  Staff.signin
);

router.get("/:id", [paramsIDValidation, handleValidationErrors], Staff.getByID);

router.post(
  "/activate",
  rolePolice("SUPER-ADMIN"),
  [Validator.activateValidation, handleValidationErrors],
  Staff.activate
);

router.patch(
  "/:id",
  [paramsIDValidation, Validator.updateValidation, handleValidationErrors],
  Staff.update
);

router.delete(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Staff.remove
);

module.exports = router;
