const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// / internal imports
const roomschem= require("../models/Room"); 
const {addrooms, getall, editroom, deleteroom} = require("../controller/addroomController");
// const Schema = mongoose.Schema
// const roomSchema = new Schema(
//   {
//     roomnumber: String})
//     const roomschem = mongoose.model("Rm", roomSchema);

// users page decorateHtmlResponse("Users"), checkLogin,
// get all information
router.get('/',getall)

// add info and add  data show 
router.post("/addroom",
    addrooms
   );


router.post("/edit/:id",editroom);

// delete the data by id 
router.get("/delete/:id",deleteroom);

module.exports = router;