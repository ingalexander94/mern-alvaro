const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const dbConecction = require("./database/Connection");
require("dotenv").config({
  path: `src/.env.${process.env.NODE_ENV}`,
});

const { PORT } = process.env;

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);

app.use(
  fileUpload({
    abortOnLimit: true,
    limits: {
      fileSize: 1000000,
    },
    responseOnLimit: "MU1104",
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/roles", require("./routes/role.routes"));
app.use("/api/uploads", require("./routes/upload.routes"));

dbConecction();

app.listen(PORT);
