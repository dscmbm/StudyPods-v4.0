import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName:{type:String , required:true},
    roomName:{type:String , required:true},
    // password:{type:String , required:true},
  joinedOn:{type:Date , default: Date.now }
  
})

export default mongoose.model("User", userSchema)