console.log("iShop E-Commerce Backend");

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import menuApi from "./routes/menu-api";
import adminApi from "./routes/admin-api";

dotenv.config()

const app = express();
const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

app.use(cors());
app.use(express.json());
app.use("/menu", menuApi);
app.use("/admin", adminApi);
app.get('/', (req, res) => {
  res.send('<h1>Day - 88</h1>')
})

app.listen(PORT, () => {
  mongoose
    .connect(MONGODB_CONNECTION_STRING)
    .then(console.log("Database successfully connected"))
    .catch((error) => console.error(error));

  console.log(
    `iSHop E-Commerce application is running on http://localhost:${PORT}`
  );
});
