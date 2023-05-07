const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index.routes");
const staffPolice = require("./middlewares/staffPolice");
const response = require("./routes/responses.routes");
const helmet = require("helmet");

const PORT = config.get("port") || 8808;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use(response);
app.use(staffPolice);
app.use("/api", routes);

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(PORT, () => {
      console.log(`Server has been running at ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

module.exports = app;
