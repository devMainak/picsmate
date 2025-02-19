// server.js
require("dotenv").config();

const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("Server encountered an error:", error);
  process.exit(1);
});
