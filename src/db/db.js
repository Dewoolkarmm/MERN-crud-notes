const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection successful...");
  })
  .catch((error) => {
    console.log(error);
    console.log("connection unsuccessful...");
  });
