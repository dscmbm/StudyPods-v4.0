// import moment from 'moment';
import users from '../models/auth.js'
import messages from '../models/message.js';
export const saveMessage = async (req, res) => {
    let { userName, roomName, message,formattedTime} = req.body;

    try {
        // const existinguser = await users.findOne({ userName ,roomName});
        // if (existinguser) {
        const newMessage = await messages.create({ userName, roomName, message, formattedTime})
        res.status(200).json({ result: newMessage })
        // }
    } catch (error) {
        res.status(500).json("something went wrong...")
    }
}

export const getMessages = async (req, res) => {
    const { userName, roomName } = req.body;
    try {
        const existinguser = await users.find({userName });
        if (existinguser) {
            const Messages = await messages.find({roomName});
      res.status(200).json({ result: Messages })
        }
    } catch (error) {
        res.status(500).json("something went wrong...")
    }
}


