
const setLocals = ()=>{
    return (req,res,next)=>{
        // req.user come another middleware
        res.locals.user = req.user
        console.log("req.user",req.user)
        // console.log("req.login",res.session.isLoggedIn)
        // res.locals.isLoggedIn = res.session.isLoggedIn
        next();
    }
}

module.exports=setLocals;


