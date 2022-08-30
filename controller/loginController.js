const express = require("express");
const app = express();


const {  validationResult } = require("express-validator");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// internal imports
const userschem = require("../models/users"); 
const roomschema = require("../models/Room"); 
// console.log("now");


loginpage = (req,res)=>{
    console.log("sec" , req.session.user)
    console.log("sec log" , req.session.isLoggedIn)
  

    res.render("login",{errr:"",value: " "})

}

login = async (req,res,next)=>{
    // console.log(req.body);
    const {useremail, password} =req.body;
    // console.log(useremail);
    // console.log(password);

    let error = validationResult(req);
    // console.log(error)

    // formate errors ;only show the error msg
    const formateter = (error) =>error.msg
    const er = error.formatWith(formateter) ;
    if(!er.isEmpty()){
     res.render("login",{errr:er.mapped(),value: {useremail,password}})
    }else{


    // try{
    // const email = await userschem.findOne({useremail});
    // const pwd = await userschem.find({password});
    // console.log(email)
    // console.log(pwd)
    // }catch(error){
    //     console.log(error);
    //     next(error);
    //     // res.json({
    //     //     massage:"eor"})
    // }
    // let nam=req.params;
    // console.log(nam)

    const userinfo =new userschem({
        ...req.body
    })
    const user = await userschem.findOne({ useremail: useremail });     
    if(!user){
        res.render("login",{errr:er.mapped(),value: {useremail,password}}) 
    }
    const rooms = await roomschema.find()
    res.setHeader("set-Cookie","isLoggedIn=true");
    // req.session.isLoggedIn=true;
    // req.session.user = user
    res.render("addroom",{error:"",rooms})
    
}
// userschem.find({useremail})

//         .then(user=>{
//             console.log(useremail)
//                 // res.json(rooms);
//                 res.render("login",{errr:"",value: " "})
//                 console.log(useremail)
//             })
//             .catch(err=>{
//                 console.log(err);
//                 console.log(user);
//                 res.json({
//                     massage:"eoor"
//                 })
//             })
}


// // add room 
// addrooms = (req, res ,next)=>  {

//     let {roomnumber,columsnumber,rowsnumber} = req.body;
//     console.log(req.body)
//     let test;
//      test = new roomschema({
//         // roomnumber,
//         // columsnumber,
//         // rowsnumber
//         ...req.body
//      });


//     //  erroehandel submit
//    let error ={}
//    if(!roomnumber) {
//     error.roomnumber="fil up the roomnumber";
//    }   if(!columsnumber) {
//     error.columsnumber= "fil up the columsnumber";
//    }   if(!rowsnumber) {
//     error.rowsnumber= "fil up the rowsnumber";
//    }
 
//    let isError = Object.keys(error).length>0;
//   if(isError){
//     roomschema.find()
//     .then(rooms=>{
//         // res.json(rooms);
//         res.render("addroom" ,{rooms,error})
//         // console.log(rooms)
//     })
//     .catch(err=>{
//         console.log(err);
        
//         res.json({
//             massage:"eoor"
//         })
//     })
//   }
//   else{
//      test.save()
//         .then(rooms=>{
//             roomschema.find()
//             .then(rooms=>{
//                 // res.json(rooms);
//                 res.render("addroom" ,{rooms,error:{}})
//                 // console.log(rooms)
//             })
//             .catch(err=>{
//                 console.log(err);
//                 console.log("addrooms")
//                 res.json({
//                     massage:"eoor"
//                 })
//             })
//             // res.render("addroom",{rooms} );
//             // console.log(rooms)
//         })
//         .catch(err =>{
//             console.log(err)
//             // res.status(500).json()
//             res.json({message:"error add room now"});
//         });
//         // console.log(test);
//   }
// }



// editroom = (req,res)=>{
//     let {roomnumber,columsnumber,rowsnumber} = req.body;
//     let {id} =req.params;

//     roomschema.findByIdAndUpdate({_id:id},{$set:{...req.body}})
//     .then(newEdiRroomInfo=>{
//         res.json(newEdiRroomInfo)
//     })
//     .catch(err =>{
//         console.log(err)
//         // res.status(500).json()
//         res.json({message:"error edit"});
//     });
//     // console.log(test);
// }

// deleteroom = (req,res)=>{
//     let {id} = req.params;
//     roomschema.findByIdAndDelete({_id:id})
//     .then(rooms=>{
//         roomschema.find()
//         .then(rooms=>{
//             // res.json(rooms);
//             res.render("addroom" ,{rooms,error:{}})
//             console.log(rooms)
//         })
//         .catch(err=>{
//             console.log(err);
//             res.json({
//                 massage:"eoor"
//             })
//         })
//     });
// }
  module.exports = {
    loginpage,
    login
  };