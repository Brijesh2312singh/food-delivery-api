const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

// DB connect
connectDB();

module.exports = app;