import express from 'express';
import { saveMessage , getMessages } from '../controllers/messages.js';
const router = express.Router();

router.post('/message', saveMessage)
router.post('/getmessages', getMessages)


export default router;
