// app.js
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { initializeDatabase } = require("./config/db.connection");

// applying middlewares
const corsOptions = {
  origin: `http://localhost:5173`,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// db connection
initializeDatabase();

app.use("/auth", require("./routes/auth.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/albums", require("./routes/album.routes"));

module.exports = app;
