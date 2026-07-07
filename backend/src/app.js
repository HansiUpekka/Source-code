const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const valuesRoutes = require("./routes/valuesRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/values", valuesRoutes);

module.exports = app;
