const express = require("express");
const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// internal imports
const roomschema= require("../models/Room"); 
console.log("now");


getall = (req,res)=>{
    roomschema.find()
        .then(rooms=>{
            // res.json(rooms);
            res.render("addroom" ,{rooms,error :{}})
            console.log(rooms)
        })
        .catch(err=>{
            console.log(err);
            res.json({
                massage:"eoor get all"
            })
        })
}
// add room 
addrooms = (req, res ,next)=>  {

    let {roomnumber,columsnumber,rowsnumber} = req.body;
    // console.log(req.body)
    let test;
     test = new roomschema({
        // roomnumber,
        // columsnumber,
        // rowsnumber
        ...req.body
     });


    //  erroehandel submit
   let error ={}
   if(!roomnumber) {
    error.roomnumber="fil up the roomnumber";
   }   if(!columsnumber) {
    error.columsnumber= "fil up the columsnumber";
   }   if(!rowsnumber) {
    error.rowsnumber= "fil up the rowsnumber";
   }
 
   let isError = Object.keys(error).length>0;
  if(isError){
    roomschema.find()
    .then(rooms=>{
        // res.json(rooms);
        res.render("addroom" ,{rooms,error:{}})
        // console.log(rooms)
    })
    .catch(err=>{
        console.log(err);
        
        res.json({
            massage:"eoor"
        })
    })
  }
  else{
     test.save()
        .then(rooms=>{
            roomschema.find()
            .then(rooms=>{
                // res.json(rooms);
                res.render("addroom" ,{rooms,error:{}})
                // console.log(rooms)
            })
            .catch(err=>{
                // console.log(err);
                // console.log("addrooms")
                res.json({
                    massage:"eoor"
                })
            })
            // res.render("addroom",{rooms} );
            // console.log(rooms)
        })
        .catch(err =>{
            console.log(err)
            // res.status(500).json()
            res.json({message:"error add room now"});
        });
  }
}



editroom = (req,res)=>{
    let {roomnumber,columsnumber,rowsnumber} = req.body;
    let {id} =req.params;

    roomschema.findByIdAndUpdate({_id:id},{$set:{...req.body}})
    .then(newEdiRroomInfo=>{
        res.json(newEdiRroomInfo)
    })
    .catch(err =>{
        console.log(err)
        // res.status(500).json()
        res.json({message:"error edit"});
    });
    // console.log(test);
}

deleteroom = (req,res)=>{
    let {id} = req.params;
    roomschema.findByIdAndDelete({_id:id})
    .then(rooms=>{
        roomschema.find()
        .then(rooms=>{
            // res.json(rooms);
            res.render("addroom" ,{rooms,error:{}})
            // console.log(rooms)
        })
        .catch(err=>{
            // console.log(err);
            res.json({
                massage:"eoor"
            })
        })
    });
}
  module.exports = {
    addrooms,
    getall,
    editroom,
    deleteroom
  };