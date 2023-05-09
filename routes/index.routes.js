const { Router } = require("express");
const regionsRouter = require("./regions.routes");
const CitiesRouter = require("./cities.routes");
const CategoryRouter = require("./category.routes");
const ContactsRouter = require("./contacts.routes");
const StaffRouter = require("./staff.routes");
const ProductsRouter = require("./product.routes");
const OrdersRouter = require("./order.routes");

const router = Router();

router.use("/regions", regionsRouter);
router.use("/cities", CitiesRouter);
router.use("/categories", CategoryRouter);
router.use("/contacts", ContactsRouter);
router.use("/staff", StaffRouter);
router.use("/products", ProductsRouter);
router.use("/orders", OrdersRouter);

module.exports = router;
