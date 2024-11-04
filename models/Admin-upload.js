const mongoose = require("mongoose")

const adminuploadschema= new mongoose.Schema({
    image: {type:String, required:true},
    title: {type:String, required:true},
    price: {type:String, required:true},
    link: {type:String, required:true},
    category: {type:String, required:true},
},{ timestamps: true });

const adminuploadmodel = mongoose.model('adminupload',adminuploadschema)

module.exports =  adminuploadmodel;