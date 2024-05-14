
import jwt from 'jsonwebtoken'

import users from '../models/auth.js'

// for sign up
export const signup = async(req, res) => { 
const { userName , roomName } = req.body;
try{
const existinguser = await users.findOne({ userName});
if(existinguser){
    // return res.status(404).json({content:"please take unique room name and unique username"})
    return res.status(404).json({ message: "Please take unique username and chatroom name"})
}
// const hashedPassword = await bcrypt.hash(password, 12)
const newUser = await users.create({userName, roomName})
const token = jwt.sign({ userName: newUser.userName , id: newUser._id} , "test", {expiresIn:'1h'});
return res.status(200).json({ result:newUser})
} catch(error){ 
    res.status(500).json("something went wrong...")
} 
}
 

// for login 
export const login = async(req, res) => { 
     const {userName , roomName} = req.body;
     try{
const existinguser = await users.findOne({ userName,roomName});
if(!existinguser){
    return res.status(404).json({ message : "user don't Exist."});
}
        const token = jwt.sign({ userName: existinguser.userName , id: existinguser._id} , "test", {expiresIn:'24h'});
        res.status(200).json({ result:existinguser, token})           
     } catch(error) {
res.status(500).json({message : "Something went wrong..."});
     }
}

       
export const allUsers = async(req, res) => {
    const { userName , roomName} = req.body;
    
        try {
            const existinguser = await users.findOne({ userName, roomName });
            if (existinguser) {
            const AllUsers = await users.find({roomName});
                res.status(200).json({ result: AllUsers });}
            console.log(allUsers)
        }catch (error) {
            res.status(500).json("something went wrong...")
        }
    }

