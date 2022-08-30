const express = require("express");
const app = express();
const { validationResult } = require("express-validator");


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// internal imports
const userschem = require("../models/users"); 
// console.log("now");

singinpage = (req,res)=>{
    // res.setHeader("Set-Cookie","idLoggdIn=true");
    res.render("singin",{errr:"",value:""})

}
singin =async (req,res)=>{
    const {username,useremail, password} =req.body;
    const userinfo =new userschem({
        ...req.body
    })


        // find the all error 
    let error = validationResult(req);
    console.log(error)

    // formate errors ;only show the error msg
    const formateter = (error) =>error.msg
    const er = error.formatWith(formateter) ;
    // console.log("!is" + !er.isEmpty())
    // console.log("is" + er.isEmpty())
    console.log("!er" + !er)
    console.log("er" + !er.isEmpty())
    if(!er.isEmpty()){
     res.render("singin",{errr:er.mapped(),value: {username, useremail, password}})
    }else{
        const user = await userinfo.save(); 
        res.render("login",{errr:"",value: ""})
        // userinfo.save()    
        // .then(rooms=>{
        //     // console.log(req.body.password);
        //         // res.json(rooms);
        //         res.render("login",{errr:"",value: ""})
        //         // console.log(rooms)
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //         // console.log(user);
        //         res.json({
        //             massage:"eoor"
        //         })
        //     })
    }
       

    
    

}

// add room 
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
    singinpage,
    singin
  };