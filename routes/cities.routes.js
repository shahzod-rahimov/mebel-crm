const { Router } = require("express");
const router = Router();
const Cities = require("../controllers/cities.controller");
const Validator = require("../validations/city");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const { paramsIDValidation } = require("../validations/commonReqValidators");
const rolePolice = require("../middlewares/rolePolice");

router.get(
  "/",
  [Validator.queryValidation, handleValidationErrors],
  Cities.getAll
);
router.post(
  "/",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [Validator.cityCreateValidation, handleValidationErrors],
  Cities.create
);
router.get(
  "/:id",
  [paramsIDValidation, handleValidationErrors],
  Cities.getByID
);
router.patch(
  "/:id",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [paramsIDValidation, Validator.cityUpdateValidation, handleValidationErrors],
  Cities.update
);
router.delete(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Cities.remove
);

module.exports = router;
