const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



// / internal imports
// const roomschem= require("../models/users"); 
const {loginpage, login} = require("../controller/loginController");
const {loginValidation} = require("../validator/loginValidator");
// const Schema = mongoose.Schema
// const roomSchema = new Schema(
//   {
//     roomnumber: String})
//     const roomschem = mongoose.model("Rm", roomSchema);

// users page decorateHtmlResponse("Users"), checkLogin,
// get all information
router.get('/',loginpage
)
router.post('/',
        loginValidation,
        login
)

// // add info and add  data show 
// router.post("/addroom",
//     addrooms
//    );


// router.post("/:id",editroom);

// // delete the data by id 
// router.get("/delete/:id",deleteroom);

module.exports = router;