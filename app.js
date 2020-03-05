if (process.env.NODE_ENV === "development") require("dotenv").config();
const express = require("express");
const app = express();
const PORT = +process.env.PORT;
const routes = require("./routes");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, () => console.log("this app run in port:", PORT));
