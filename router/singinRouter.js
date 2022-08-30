const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



// / internal imports
// const roomschem= require("../models/users"); 
const {singinpage,singin} = require("../controller/singinController");
const {singinValidators} = require("../validator/singinValidator");
// const Schema = mongoose.Schema

router.get('/',singinpage);
router.post('/',
            singinValidators,
            singin
);

// // add info and add  data show 
// router.post("/addroom",
//     addrooms
//    );


// router.post("/:id",editroom);

// // delete the data by id 
// router.get("/delete/:id",deleteroom);

module.exports = router;