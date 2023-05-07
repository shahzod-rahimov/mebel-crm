const {Router} = require("express");
const router = Router();
const OrderDelivery = require("../controllers/orderDelivery.controller");
const Validator = require("../validations/orderDelivery");

const handleValidationErrors = require("../middlewares/handleValidationErrors");
const { paramsIDValidation } = require("../validations/commonReqValidators");
const rolePolice = require("../middlewares/rolePolice");

router.get(
  "/",
  [Validator.queryValidation, handleValidationErrors],
  OrderDelivery.getAll
);
router.post(
  "/",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [Validator.orderDeliveryCreateValidation, handleValidationErrors],
  OrderDelivery.create
);
router.get(
  "/:id",
  [paramsIDValidation, handleValidationErrors],
  OrderDelivery.getByID
);
router.patch(
  "/:id",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [paramsIDValidation, Validator.orderDeliveryUpdateValidation, handleValidationErrors],
  OrderDelivery.update
);
router.delete(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  OrderDelivery.remove
);

module.exports = router;
