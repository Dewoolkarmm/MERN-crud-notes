const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config({ path: ".env" });

//database connection
require("./db/db");
const userRoutes = require("../src/routes/userRoutes");
const noteRoutes = require("../src/routes/noteRoutes");

const app = express();

//
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));
//app.use(helmet());

//Ennpoints

app.use("/api", userRoutes);
app.use("/api/notes", noteRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Server Listen on port ${process.env.PORT}`);
});
