const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const homeRouter = require("./Routes/router");
mongoose.connect(process.env.mongoose);
app.use(express.json());
app.use("/", homeRouter);

app.listen(3000, () => {
  console.log("Server running port on http::localhost:3000");
});
