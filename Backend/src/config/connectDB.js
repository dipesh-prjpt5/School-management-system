const mongoose = require("mongoose");
const serverConfig = require("./serverConfig.js");

const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(serverConfig.MONGODB_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;
