const express = require("express");
const app = express();
const cors = require('cors')

const userRoute = require('./routes/userRoute')
app.use(express.json());
app.use(cors());


// imports route
const product = require("./controllers/product");
const categories = require("./controllers/categories");

app.use("/api", userRoute)
app.use("/api/product", product);
app.use("/api/categories", categories);

module.exports = app;
