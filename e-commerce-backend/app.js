console.log("iShop E-Commerce Backend");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const menuApi = require("./routes/menu-api");
const adminApi = require("./routes/admin-api");

const app = express();
const PORT = 8080;
const MONGODB_CONNECTION_STRING =
  "mongodb+srv://khangaikhuu_teacher:4dgZigRuS7evf3WG@mern-black.kosj6y7.mongodb.net/ishop";

app.use(cors());
app.use(express.json());
app.use("/menu", menuApi);
app.use("/admin", adminApi);

app.listen(PORT, () => {
  mongoose
    .connect(MONGODB_CONNECTION_STRING)
    .then(console.log("Database successfully connected"))
    .catch((error) => console.error(error));

  console.log(
    `iSHop E-Commerce application is running on http://localhost:${PORT}`
  );
});
