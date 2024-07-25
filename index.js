require("dotenv").config();
const express = require("express");
const blogRoutes = require("./routes/blogs.routes");
const mongoose = require("mongoose");

const app = express();
const PORT = 8082;

const DB_URI = "mongodb://127.0.0.1:27017/";

mongoose
  .connect(`${DB_URI}`)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((e) => console.log("Failed to connect to DB", e));

app.use(express.json());
app.use("/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log("Listening at", PORT);
});
