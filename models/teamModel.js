const mongoose = require("mongoose");
const {Schema} = mongoose ; 

const teamSchema = new Schema({
    name:{
        type :String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    facebook: String,
    instagram: String,
    telagram:String,
    viber:String,
    profile:String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
    type: Date,
    default: Date.now(),
    },
});

module.exports = mongoose.model("Team", teamSchema);