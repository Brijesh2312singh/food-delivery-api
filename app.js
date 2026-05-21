const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// ❌ NO DB CONNECT HERE

module.exports = app;