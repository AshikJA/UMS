const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

const db = async () => {
  try {
    const conn = await mongoose.connect(MONGOURL);
    console.log("Database is Connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = db;
