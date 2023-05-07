const { Router } = require("express");
const router = Router();
const Category = require("../controllers/category.controller");
const CategoryValidation = require("../validations/category");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const { paramsIDValidation } = require("../validations/commonReqValidators");
const rolePolice = require("../middlewares/rolePolice");

router.get("/", Category.getAll);

router.post(
  "/",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [CategoryValidation, handleValidationErrors],
  Category.create
);

router.get(
  "/:id",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Category.getByID
);

router.patch(
  "/:id",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  [paramsIDValidation, CategoryValidation, handleValidationErrors],
  Category.update
);

router.delete(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Category.remove
);

module.exports = router;
