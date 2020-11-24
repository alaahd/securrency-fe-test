import express from "express";
import path from "path";
import cors from "cors";

require("dotenv").config();

var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const { Client } = require("pg");

// include all required routes
var indexRouter = require("./routes/index");

var app = express();

// include all required midddlwears
app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);

module.exports = app;
