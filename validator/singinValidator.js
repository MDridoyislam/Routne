// post request 
// check disdruck data form (req.body req.cookies req.headers req.params req.query)


const express = require("express");
const router = express.Router();
const app = express();


const { check,body, validationResult } = require("express-validator");

const userschem = require("../models/users");
// console.log("cp"+ req.body.confirmpassword);


const singinValidators = [
check("username")
    .isLength({ min: 2,max:15 })
    .withMessage("Name is required")
    .custom(async (value) => {
          const user = await userschem.findOne({username:value} );
          if (user) {
            return Promise.reject("Username already is use!");
          }

      })
    .trim()  ,
check("useremail")
    .isEmail()
    .withMessage("email is required")
    .custom(async (value) => {
         const user = await userschem.findOne({ useremail: value });
            if (user) {
                return Promise.reject("Email already is use!");
            }

      })
    .normalizeEmail()  , 

check("password")
   
    .isLength({min:3})
    .withMessage("Put strong password ") ,
check("confirmpassword")
    .isLength({min:1 ,max:30})
    .withMessage("Not match confirm password ")
    .custom((confirmpassword,{req})=>{
        // console.log("user c "+req.body.confirmpassword);
        // console.log("bodr" + req.body.password);
        if(confirmpassword !== req.body.password){
            // throw new errors("Password do not match")
            // console.log("ridoy")
            return Promise.reject("Not match  confirmpassword ");
        }

        return true
    }
    )
];

// error msg show work
// error.isEmty() ->find error is empty or not
// error.array() ->show value,msg,param ,location in array
// error.mapped() -> show value,msg,param ,location in object
// (req,res,next)=>{
//     // find the all error 
//     let error = validationResult(req);

//     // formate errors ;only show the error msg
//     const formateter = (error) =>error.msg
//     const er = error.formatWith(formateter).mapped() ;
//     console.log(er)
// } 

module.exports = {
    singinValidators
  };