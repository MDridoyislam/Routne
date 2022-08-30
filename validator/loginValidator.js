// post request 
// check disdruck data form (req.body req.cookies req.headers req.params req.query)



const { check,body, validationResult } = require("express-validator");

const userschem = require("../models/users");
// console.log( req.body.confirmpassword);


const loginValidation = [
check("useremail")
    .custom(async (value) => {
         const user = await userschem.findOne({ useremail: value });
            if (!user) {
                return Promise.reject("Invalide Email and Password !");

            }
            

      })
    .normalizeEmail()  , 

check("password") 
    .custom(async (value) => {
        const user = await userschem.findOne({ password: value });
        if (!user) {
            return Promise.reject("Invalide Email and Password !");
        }

    })

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
    loginValidation
  };