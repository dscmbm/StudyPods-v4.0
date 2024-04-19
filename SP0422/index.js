import express from "express";
import mongoose from "mongoose";
// import cors from 'cors'
import axios from 'axios';

const app = express();
app.set('view engine', 'ejs')

import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server)

// routes handling
import userRoutes from './routes/users.js'
import messageRoutes from './routes/messages.js'

// time handling package
import moment from "moment";
// import { saveMessage } from "./controllers/messages.js";
//sockets handling
io.on("connection", (socket) => {
    console.log("new user connected", socket.id);
    
    socket.on('message', async(data) => {
        const messageData = {data, time:moment().format('h:mm a')}
        // console.log(data);
        socket.to(messageData.data.roomName).emit('receive-message', messageData);   
    } )
    
    
    socket.on('join-room', (roomName) => {
        console.log(`user joined room ${roomName}`);
socket.join(roomName);
    } )
   
    // socket.on("disconnect",() =>{
    //     console.log("user desiconnected", socket.id);
    // })
    
});
    app.use(express.static("./public"))
    app.use(express.json({ limit: "30mb", extended: true }))
    app.use(express.urlencoded({ limit: "30mb", extended: true }))
// app.use(cors())

app.get('/chat/', (req, res) => {
    res.render('index.ejs')
})


app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.use('/user', userRoutes)
app.use('/msg',messageRoutes)

 
const CONNECTION_URL = "mongodb://localhost:27017/chat-room"
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => { console.log(`server is running on PORT ${PORT}`) }))
    .catch((err) => console.log(err.message))


const PORT = process.env.PORT || 5000
