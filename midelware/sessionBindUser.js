//middleware function if has user session than bind Request session

// models import
const userschem = require('../models/users');

bindUserWithRequest = ()=>{
  return async (req,res,next)=>{
    // is middleware to use other middleware variable 
    // console.log("req.login2",res.session.isLoggedIn)
    console.log("!",!req.session.isLoggedIn)
    console.log("wit",req.session.isLoggedIn)
    console.log("section",req.session)
    console.log(req.session.cookie)
    
    if(!req.session.isLoggedIn){
        // console.log("islog")

        console.log("!",!req.session.isLoggedIn)
        console.log("wit",req.session.isLoggedIn)
        console.log("section",req.session)
        console.log(req.session.cookie)
        // console.log("user",req.session.user._id)
        console.log("islog")
       return next()
    }
        try {
        console.log("ilog")
            const user =await userschem.findById(req.session.user._id)
            console.log(user)
            req.user =user;
            next()

        } catch (error) {
            console.log(error);
            next(error)
            
        }

    

    }
}
module.exports=bindUserWithRequest;


