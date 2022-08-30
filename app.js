// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bindUserWithRequest = require('./midelware/sessionBindUser');
const setLocals = require('./midelware/setLocals');



// router
const teacherRouter = require("./router/teacherRouter");
const loginRouter = require("./router/loginRouter");
const singinRouter = require("./router/singinRouter");
// const inboxRouter = require("./router/inboxRouter");

// internal imports
// const {
//   notFoundHandler,
//   errorHandler,
// } = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();
// session store in DB
var store = new MongoDBStore({
      // my mongidb url
      uri: 'mongodb://localhost/test',
      //   our collection name 
      collection: 'mySessions',
      // how many time active (sec)
      expires:1000* 60 * 60 * 2,
});

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));


 // create section
  app.use(session({
      //session id create 
          secret: process.env.SECRET_KEY || "SECRET_KEY",
      //  SAVE EVERY TIME tree other wise false
          resave:false,
      // importent save than tree
          saveUninitialized : false,
      // set cookie
          cookie:{
              // how many time active (sec)
              maxAge: 1000*60*60*2
          },
          store: store,
      
  })) 
  // bind user midelware
  app.use(bindUserWithRequest());
  app.use(setLocals());
// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/singin", singinRouter);
app.use("/login", loginRouter);
// app.use("/admin", adminRouter);
app.use("/teacher", teacherRouter);
// app.use("/viewer", viewerRouter);
// app.use("/user", userRouter);

// 404 not found handler
// app.use(notFoundHandler);

// common error handler
// app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listening to port `);
});
