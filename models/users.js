// username ,useremail,password,confirmpassword

const mongoose = require("mongoose");
const Schema = mongoose.Schema
const usersSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        minlength:2,
        maxlength:30,
        trim: true
      },
   
    useremail: {
      type: String,
      required: true,
      // trim: true
    },
    password: {
      type: String,
      minlength:3,
      maxlength:15,
      required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);
                      // databaseTable name , schema name 
const userschem = mongoose.model("User", usersSchema);

module.exports = userschem;