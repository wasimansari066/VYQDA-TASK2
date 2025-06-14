const express = require("express");
require("dotenv").config();
require("./db_connect");
const app = express();

const Router = require("./routes/index");

app.use(express.json());
app.use("/api", Router);

app.listen(3000, console.log(`Server is running at http://localhost:3000`));
