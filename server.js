const express = require("express");
const cors = require("cors");
const connectDB = require("./Database/mongodb.js"); // No .default
const admin = require("./admin/admin.js")
const app = express();

app.use(express.json());
app.use(cors(
    // {
    //     origin: "https://dhru-quizapp.netlify.app", // Replace with the actual URL you want to allow
    //     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    //     credentials: true // Allow credentials (e.g., cookies)
    //   }
));

connectDB(); // Connect to the database

app.use("/admin", admin); // Use the admin route
// app.use("/users", users);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});