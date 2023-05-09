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
  [Validator.orderCreateValidation, handleValidationErrors],
  Order.create
);
router.get("/:id", [paramsIDValidation, handleValidationErrors], Order.getByID);
router.get("/success",rolePolice("SUPER-ADMIN","ADMIN"),Order.getOrderWithSuccess);
router.get("/failure",rolePolice("SUPER-ADMIN","ADMIN"),Order.getOrderWithFailure);
router.post("/region",rolePolice("SUPER-ADMIN","ADMIN",Order.filterOrderRegions));
router.put("/set-stuff",rolePolice("SUPER-ADMIN","ADMIN"),[Validator.queryValidation],Order.setStaffToOrder)
router.patch(
  "/:id",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [paramsIDValidation, Validator.orderUpdateValidation, handleValidationErrors],
  Order.update
);
router.delete(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Order.remove
);

module.exports = router;
