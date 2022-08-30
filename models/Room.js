// const Schema = mongoose.Schema
// const roomSchema = new Schema(
//   {
//     roomnumber: String})
//     const roomschem = mongoose.model("Rm", roomSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema
const roomSchema = new Schema(
  {
    roomnumber: {
        type: String,
        // required: true,
        trim: true
      },
   
    columsnumber: {
      type: String,
      required: true,
      // trim: true
    },
    rowsnumber: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
                      // databaseTable name , schema name 
const roomschem = mongoose.model("Rm", roomSchema);

module.exports = roomschem;