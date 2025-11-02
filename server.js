const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // load env variables

app.use(express.json()); // body parser
app.use(cors()); // enable cors

// ROUTES
app.use("/app/users", require("./routes/users")); // user routes
app.use("/app/buoys", require("./routes/buoys")); // buoy routes

// connect database
mongoose
  .connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello to Searebbelers API");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("server is up and running"));
