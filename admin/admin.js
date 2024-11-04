
const jwt = require("jsonwebtoken") // For JWT token generation
require('dotenv').config();
const bcrypt = require("bcrypt") 

const express = require("express");
const AdminProfileModel  = require("../models/admin_model.js");
const adminuploadmodel = require("../models/Admin-upload.js");
const router = express.Router();

router.post("/admin-register",async (req,res)=>{
 const {email,password}=req.body;
 try {

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = new AdminProfileModel({
       
       email,
       password: hashedPassword, // Save the hashed password
   });

   await newAdmin.save();

   const token = jwt.sign(
       { userId: newAdmin._id, email: newAdmin.email },
       process.env.JWT_SECRET, // Ensure you have JWT_SECRET in your .env file
       { expiresIn: "1h" }
   );

   res.status(200).json({
       message: "Account registered successfully",
       data: {
           email
       },
       token
   });
   
} catch (error) {
   console.error("Error during admin registration:", error);
   res.status(500).json({ error: "admin registration failed!" });
}


})

router.post("/admin-login", async (req, res) => {
  

    try {
        const user = await AdminProfileModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "Incorrect Username/Password" });
        }

        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCorrect) {
            return res.status(404).json({ message: "Incorrect Username/Password" });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

router.post("/admin/uploads",async(req,res)=>{
const {image,title,price,link,category} = req.body;
try {
    const adminupload = new adminuploadmodel({
        image: image,
        title:title,
        price:price,
        link:link,
        category: category
    })
    await adminupload.save();

    res.status(200).json({message:"posted successfully", adminupload});

    
} catch (error) {
    console.error("Error during subject create:", error);
    res.status(500).json({ error: "subject create failed!" });
}
})

router.get("/admin/uploads", async (req, res) => {
    try {
        const response = await adminuploadmodel.find({}).sort({ "createdAt": -1 });
        // Send the response along with the success message
        res.status(200).json(response);
    } catch (error) {
        console.error("Error during subject fetching:", error);
        res.status(500).json({ error: "Subject fetching failed!" });
    }
});
router.delete("/admin/subject/:id", async (req, res) => {
    try {
        const response = await adminuploadmodel.findByIdAndDelete(req.params.id); 
        if (!response) {
            return res.status(404).json({ message: "Subject not found!" }); // Handle case where no subject is found
        }

        // Send the response along with the success message
        res.status(200).json({ message: "Subject deleted successfully!", data: response });
    } catch (error) {
        console.error("Error during subject deletion:", error);
        res.status(500).json({ error: "Subject deletion failed!" });
    }
});




module.exports = router;
