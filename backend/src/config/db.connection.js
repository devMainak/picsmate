const mongoose = require("mongoose");

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB);
    if (connection) {
      console.log("Database connected successfully.");
    }
  } catch (error) {
    console.log("Database Connection Failed", error);
  }
};

module.exports = { initializeDatabase };
