const { Router } = require("express");
const router = Router();
const Order = require("../controllers/order.controller");
const Validator = require("../validations/order");

const handleValidationErrors = require("../middlewares/handleValidationErrors");
const { paramsIDValidation } = require("../validations/commonReqValidators");
const rolePolice = require("../middlewares/rolePolice");

router.get(
  "/",
  [Validator.queryValidation, handleValidationErrors],
  Order.getAll
);
router.post(
  "/",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [Validator.cityCreateValidation, handleValidationErrors],
  Order.create
);
router.get("/:id", [paramsIDValidation, handleValidationErrors], Order.getByID);
router.patch(
  "/:id",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [paramsIDValidation, Validator.cityUpdateValidation, handleValidationErrors],
  Order.update
);
router.delete(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Order.remove
);

module.exports = router;
