const { Router } = require("express");
const router = Router();
const Contacts = require("../controllers/contacts.controller");
const Validator = require("../validations/contacts");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const {
  paramsIDValidation,
  queryPageValidation,
} = require("../validations/commonReqValidators");
const rolePolice = require("../middlewares/rolePolice");
const { excelFileUpload } = require("../services/ExcelUpload");

router.get(
  "/",
  rolePolice("SUPER-ADMIN", "ADMIN", "OPERATOR"),
  [queryPageValidation, handleValidationErrors],
  Contacts.getAll
);

router.get(
  "/get/random-contact",
  rolePolice("SUPER-ADMIN", "ADMIN", "OPERATOR"),
  Contacts.getRandomContact
);

router.post(
  "/",
  rolePolice("SUPER-ADMIN", "ADMIN", "OPERATOR"),
  [Validator.contactCreateValidation, handleValidationErrors],
  Contacts.create
);

router.get(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Contacts.getByID
);

router.get(
  "/search/byUniqueId",
  rolePolice("SUPER-ADMIN"),
  [Validator.queryValidation, handleValidationErrors],
  Contacts.getByUniqueID
);

router.patch(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [
    paramsIDValidation,
    Validator.contactUpdateValidation,
    handleValidationErrors,
  ],
  Contacts.update
);

router.delete(
  "/:id",
  rolePolice("SUPER-ADMIN"),
  [paramsIDValidation, handleValidationErrors],
  Contacts.remove
);

router.post(
  "/upload/byexcel",
  rolePolice("SUPER-ADMIN", "ADMIN", "OPERATOR"),
  excelFileUpload.single("excelfile"),
  [Validator.checkStaffID, handleValidationErrors],
  Contacts.uploadFromFile
);

module.exports = router;
