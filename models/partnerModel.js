const mongoose = require("mongoose");
const {Schema} = mongoose ; 

const partnerSchema = new Schema({
    name:{
        type :String,
        required:true,
    },
    description:{
        type :String,
        required:true,
    },
    logo:String,
    createdAt: {
        type: Date,
        default: Date.now(),
      },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Partner", partnerSchema);