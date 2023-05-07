const { Router } = require("express");
const router = Router();
const Products = require("../controllers/products.controller");
const Validator = require("../validations/products");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const {
  paramsIDValidation,
  queryPageValidation,
} = require("../validations/commonReqValidators");
const { fileUpload } = require("../services/FileService");
const rolePolice = require("../middlewares/rolePolice");

router.get(
  "/",
  [queryPageValidation, Validator.sortValidation, handleValidationErrors],
  Products.getAll
);

router.post(
  "/",
  rolePolice("SUPER-ADMIN", "ADMIN"),
  fileUpload.array("images"),
  [Validator.productCreateValidation, handleValidationErrors],
  Products.create
);

router.get(
  "/:id",
  [paramsIDValidation, handleValidationErrors],
  Products.getByID
);

router.patch(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [
    paramsIDValidation,
    Validator.productUpdateValidation,
    handleValidationErrors,
  ],
  Products.update
);

router.delete(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Products.remove
);

module.exports = router;
