const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/affiliate`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB; // Correct export for CommonJS