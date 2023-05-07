const { Router } = require("express");
const router = Router();
const Regions = require("../controllers/regions.controller");
const regionsValidation = require("../validations/region");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const { paramsIDValidation } = require("../validations/commonReqValidators");
const rolePolice = require("../middlewares/rolePolice");

router.get("/", Regions.getAll);

router.post(
  "/",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [regionsValidation, handleValidationErrors],
  Regions.create
);

router.get(
  "/:id",
  [paramsIDValidation, handleValidationErrors],
  Regions.getByID
);

router.patch(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, regionsValidation, handleValidationErrors],
  Regions.update
);

router.delete(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Regions.remove
);

module.exports = router;
