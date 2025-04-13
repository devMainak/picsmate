// server.js
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
});

const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("Server encountered an error:", error);
  process.exit(1);
});
